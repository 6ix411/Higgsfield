-- =============================================================================
-- LANDED AI — initial schema
--
-- Tables
--   profiles             one row per user (linked to Supabase's auth.users)
--   import_analyses      one saved import analysis (product, quantity, prices)
--   analysis_cost_items  the costs on an analysis (shipping, insurance, ...)
--   analysis_scenarios   "what if" variations of an analysis
--
-- Security: Row Level Security (RLS) is enabled on every table, so a user can
-- only ever read or change rows where user_id = their own id.
--
-- Money is stored as numeric (exact decimals), never float, to avoid rounding
-- errors. Every amount keeps its original currency plus the exchange rate used,
-- so a saved analysis can always be explained later.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Shared helper: keep updated_at current
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- profiles
-- -----------------------------------------------------------------------------
create table public.profiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  full_name      text,
  business_name  text,
  -- Default city for new analyses, e.g. 'Lagos'.
  default_city   text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create a profile automatically whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- import_analyses
-- -----------------------------------------------------------------------------
create table public.import_analyses (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references public.profiles (id) on delete cascade,

  -- What the user called this analysis (editable = "rename").
  name                    text not null check (char_length(name) between 1 and 120),

  product_name            text not null check (char_length(product_name) between 1 and 200),
  product_description     text,
  quantity                numeric(14, 3) not null check (quantity > 0),

  supplier_unit_price     numeric(18, 2) not null check (supplier_unit_price >= 0),
  supplier_currency       char(3) not null check (supplier_currency ~ '^[A-Z]{3}$'),
  -- Naira per 1 unit of supplier_currency, as used in the calculation.
  supplier_rate_to_ngn    numeric(18, 6) not null check (supplier_rate_to_ngn > 0),

  selling_price_per_unit  numeric(18, 2) not null check (selling_price_per_unit >= 0),
  selling_currency        char(3) not null check (selling_currency ~ '^[A-Z]{3}$'),
  selling_rate_to_ngn     numeric(18, 6) not null check (selling_rate_to_ngn > 0),

  -- Where the exchange rates came from and when (see src/lib/exchange-rates).
  rate_source             text not null default 'user_override'
                            check (rate_source in ('provider', 'user_override')),
  rate_provider_name      text,
  rates_as_of             timestamptz,

  destination_country     text not null default 'Nigeria',
  destination_city        text,

  -- Results snapshot in NGN, written by the app's calculation engine each time
  -- the analysis is saved. Stored so the dashboard can total them quickly.
  total_landed_cost_ngn   numeric(18, 2),
  cost_per_unit_ngn       numeric(18, 2),
  revenue_ngn             numeric(18, 2),
  gross_profit_ngn        numeric(18, 2),
  gross_margin_pct        numeric(7, 2),

  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  -- Lets child tables prove their row belongs to the same user (see below).
  unique (id, user_id)
);

create index import_analyses_user_recent_idx
  on public.import_analyses (user_id, updated_at desc);

create trigger import_analyses_set_updated_at
  before update on public.import_analyses
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- analysis_cost_items
--   Shipping, insurance and any other costs. Product purchase cost is NOT
--   stored here — it is always quantity x supplier_unit_price, so it stays
--   correct when a scenario changes the quantity.
-- -----------------------------------------------------------------------------
create table public.analysis_cost_items (
  id                   uuid primary key default gen_random_uuid(),
  analysis_id          uuid not null,
  user_id              uuid not null,

  category             text not null check (category in (
                         'shipping',
                         'insurance',
                         'customs_duty',     -- only ever user-entered or from a verified source
                         'clearing',
                         'local_transport',
                         'other'
                       )),
  label                text not null check (char_length(label) between 1 and 120),

  amount               numeric(18, 2) not null check (amount >= 0),
  currency             char(3) not null check (currency ~ '^[A-Z]{3}$'),
  rate_to_ngn          numeric(18, 6) not null check (rate_to_ngn > 0),

  -- 'per_shipment' = fixed total; 'per_unit' = multiplied by quantity.
  allocation           text not null default 'per_shipment'
                         check (allocation in ('per_shipment', 'per_unit')),

  -- Compliance: how trustworthy is this number?
  --   user_entered          the user's own figure (e.g. a freight quote)
  --   requires_verification an estimate that must be confirmed (e.g. a guessed duty)
  --   verified              from an authoritative source, see source_reference
  verification_status  text not null default 'user_entered'
                         check (verification_status in
                           ('user_entered', 'requires_verification', 'verified')),
  source_reference     text,

  sort_order           integer not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),

  -- Composite key: the cost item must belong to an analysis owned by the same user.
  foreign key (analysis_id, user_id)
    references public.import_analyses (id, user_id) on delete cascade,

  -- Customs duty can never be silently treated as plain "user_entered".
  check (category <> 'customs_duty' or verification_status <> 'user_entered')
);

create index analysis_cost_items_analysis_idx
  on public.analysis_cost_items (analysis_id, sort_order);

create trigger analysis_cost_items_set_updated_at
  before update on public.analysis_cost_items
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- analysis_scenarios
--   A "what if" on top of an analysis, e.g. { "quantity": 500 } or
--   { "sellingPricePerUnit": 60000 }. Created by the user or the AI advisor.
-- -----------------------------------------------------------------------------
create table public.analysis_scenarios (
  id           uuid primary key default gen_random_uuid(),
  analysis_id  uuid not null,
  user_id      uuid not null,

  name         text not null check (char_length(name) between 1 and 120),
  overrides    jsonb not null default '{}'::jsonb check (jsonb_typeof(overrides) = 'object'),
  -- Results snapshot (NGN) computed by the app's calculation engine.
  results      jsonb,
  created_by   text not null default 'user' check (created_by in ('user', 'ai_advisor')),

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  foreign key (analysis_id, user_id)
    references public.import_analyses (id, user_id) on delete cascade
);

create index analysis_scenarios_analysis_idx
  on public.analysis_scenarios (analysis_id, created_at desc);

create trigger analysis_scenarios_set_updated_at
  before update on public.analysis_scenarios
  for each row execute function public.set_updated_at();

-- =============================================================================
-- Row Level Security
-- (select auth.uid()) is wrapped in a sub-select so Postgres evaluates it once
-- per query instead of once per row — a Supabase-recommended optimisation.
-- =============================================================================
alter table public.profiles            enable row level security;
alter table public.import_analyses     enable row level security;
alter table public.analysis_cost_items enable row level security;
alter table public.analysis_scenarios  enable row level security;

-- profiles: a user can see and edit only their own profile.
-- (Rows are created by the signup trigger; deleted when the auth user is deleted.)
create policy "profiles: read own"   on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles: update own" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- import_analyses, analysis_cost_items, analysis_scenarios:
-- full CRUD, but only on rows the user owns.
create policy "import_analyses: read own"   on public.import_analyses
  for select to authenticated using (user_id = (select auth.uid()));
create policy "import_analyses: insert own" on public.import_analyses
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "import_analyses: update own" on public.import_analyses
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "import_analyses: delete own" on public.import_analyses
  for delete to authenticated using (user_id = (select auth.uid()));

create policy "cost_items: read own"   on public.analysis_cost_items
  for select to authenticated using (user_id = (select auth.uid()));
create policy "cost_items: insert own" on public.analysis_cost_items
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "cost_items: update own" on public.analysis_cost_items
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "cost_items: delete own" on public.analysis_cost_items
  for delete to authenticated using (user_id = (select auth.uid()));

create policy "scenarios: read own"   on public.analysis_scenarios
  for select to authenticated using (user_id = (select auth.uid()));
create policy "scenarios: insert own" on public.analysis_scenarios
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "scenarios: update own" on public.analysis_scenarios
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "scenarios: delete own" on public.analysis_scenarios
  for delete to authenticated using (user_id = (select auth.uid()));
