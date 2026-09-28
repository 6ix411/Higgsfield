# LANDED AI — Architecture

This document explains **how LANDED AI is put together and why**. It is written
for a beginner, so each decision comes with the reason for it.

---

## 1. The big picture

```
 Browser (phone / laptop)
        │
        ▼
 ┌──────────────────────────── Next.js app (hosted on Vercel) ────────────────────────────┐
 │                                                                                        │
 │  src/proxy.ts ── runs before every page: refreshes login session, blocks logged-out    │
 │                  users from private pages                                              │
 │                                                                                        │
 │  Pages (src/app)          Server Actions / Route Handlers                              │
 │   /login /signup           save analysis, rename, delete, ask AI advisor               │
 │   /dashboard                     │                                                     │
 │   /analyzer                      ▼                                                     │
 │   /analyses/[id]      ┌────────────────────────── src/lib ──────────────────────────┐  │
 │   /profile            │ calculations/   pure maths: landed cost, margin, break-even │  │
 │                       │ exchange-rates/ swappable rate provider (interface)         │  │
 │                       │ tariffs/        swappable customs data source (interface)   │  │
 │                       │ ai/             Claude advisor + tools                      │  │
 │                       │ supabase/       database + auth clients                     │  │
 │                       └─────────────────────────────────────────────────────────────┘  │
 └───────────────┬──────────────────────────┬──────────────────────────┬──────────────────┘
                 ▼                          ▼                          ▼
          Supabase (Postgres          Claude API                Exchange-rate API
          + Auth + RLS)               (AI advisor)              (provider chosen later)
```

## 2. Key decisions and why

| Decision | Why |
|---|---|
| **One Next.js app** (no separate backend) | Pages and server code live together. Simplest thing to learn, run and deploy to Vercel. |
| **Supabase for auth + database** | Gives us sign-up/login, a Postgres database and security rules in one service, with a generous free tier. |
| **Row Level Security (RLS) on every table** | The database itself refuses to show one user another user's data, even if our app code has a bug. |
| **All money stored as exact decimals (`numeric`)**, never floats | Floats cause rounding errors (0.1 + 0.2 ≠ 0.3). Money must be exact. |
| **Everything is reported in Naira (NGN)** | Users think in Naira. Each cost keeps its original currency *and* the exchange rate used, so every total can be explained. |
| **User can always override the exchange rate** | Many Nigerian importers pay a different rate from official/API rates. Their real rate gives a more honest answer. |
| **Calculation engine = pure TypeScript functions** in `src/lib/calculations` | No database or network inside, so it is easy to test and is reused by the analyzer, dashboard, scenarios *and* the AI. |
| **The AI never does arithmetic itself** | Claude is given the calculation engine as a *tool*. For "what if I buy 500?", Claude calls the tool and explains the real result. Numbers are always ours, never guessed. |
| **Exchange rates and tariffs behind interfaces** (`ExchangeRateProvider`, `TariffProvider`) | Swap providers later by writing one new file. Nothing else changes. |
| **No invented customs data** | The default `TariffProvider` always returns *"requires verification"*. Any duty a user types in must be labelled as unverified (enforced by a database rule). |
| **Server-only secrets** | `ANTHROPIC_API_KEY` and exchange-rate keys are only read on the server (`import "server-only"`) and never reach the browser. |

## 3. Folder structure

```
landed-ai/
├── docs/ARCHITECTURE.md          ← this file
├── supabase/migrations/          ← database schema (SQL), applied to Supabase
├── .env.example                  ← list of required environment variables
└── src/
    ├── proxy.ts                  ← session refresh + route protection
    ├── app/                      ← pages (Next.js App Router)
    │   ├── layout.tsx
    │   └── page.tsx              ← home (currently a setup-status page)
    ├── components/               ← (next steps) reusable UI: cards, tables, forms
    └── lib/
        ├── env.ts                ← reads + checks environment variables
        ├── currency/             ← supported currencies, Naira formatting
        ├── supabase/
        │   ├── client.ts         ← Supabase in the browser
        │   ├── server.ts         ← Supabase on the server
        │   └── proxy.ts          ← Supabase inside proxy.ts
        ├── exchange-rates/       ← ExchangeRateProvider interface + factory
        ├── tariffs/              ← TariffProvider interface + "unverified" default
        ├── calculations/         ← (step 3) landed-cost engine + tests
        └── ai/                   ← (step 6) Claude advisor
```

## 4. Database

Four tables, all owned by a user. Full SQL: `supabase/migrations/20260928000000_initial_schema.sql`.

```
auth.users (managed by Supabase)
    │ 1:1
    ▼
profiles ─────────────── 1:many ──► import_analyses
                                        │
                        ┌───────────────┴───────────────┐
                        ▼ 1:many                         ▼ 1:many
               analysis_cost_items              analysis_scenarios
```

- **profiles** — name, business name, default city. Created automatically on sign-up.
- **import_analyses** — product, quantity, supplier price + currency, selling
  price + currency, exchange rates used, city. Also a *snapshot* of the results
  in NGN (landed cost, revenue, profit, margin) so the dashboard can add them up quickly.
- **analysis_cost_items** — shipping, insurance and other costs. Each row has its
  own currency, exchange rate, and whether it is *per shipment* or *per unit*
  (so "what if I buy 500?" scales per-unit costs correctly). Each row has a
  `verification_status`: `user_entered`, `requires_verification` or `verified`.
  Customs duty rows can never be plain `user_entered`.
- **analysis_scenarios** — saved "what ifs", stored as the changed inputs
  (e.g. `{"quantity": 500}`) plus the calculated results.

> **Why is product cost not a cost item?** It is always `quantity × unit price`.
> Keeping it on the analysis means it can never get out of sync when the quantity changes.

**Security.** Every child row stores `user_id`, and a composite foreign key
`(analysis_id, user_id)` guarantees it matches the parent analysis's owner. RLS
policies allow a user to read/write only rows where `user_id` is their own id.
These rules were tested against a real Postgres 16 database before being committed.

## 5. How a calculation works (step 3 preview)

```
product cost      = quantity × supplier unit price × supplier rate→NGN
each cost item    = amount × rate→NGN            (× quantity if "per unit")
landed cost       = product cost + all cost items
cost per unit     = landed cost ÷ quantity
revenue           = quantity × selling price × selling rate→NGN
gross profit      = revenue − landed cost
gross margin (%)  = gross profit ÷ revenue × 100
break-even price  = cost per unit          (price at which profit = 0)
```

Customs duty is **not** added automatically. The UI will show a clear
"Customs duties not included — requires verification" notice until a verified
tariff source is connected.

## 6. Exchange rates

`ExchangeRateProvider` has one method: `getRate(from, to)`. The app picks the
implementation from the `EXCHANGE_RATE_PROVIDER` env variable. The provider
will be chosen and added in step 3 — candidates include ExchangeRate-API
(free tier covers NGN) or a paid feed. Whichever is used, the user sees the
rate, its source and its date, and can override it.

## 7. Official tariff data (future)

`TariffProvider.lookup()` returns a result with `status: "verified"` **only**
when it comes from an authoritative source, with a citation (name, URL, date).
To add an official source later: write a class implementing `TariffProvider`,
register it in `src/lib/tariffs/index.ts`, and set `TARIFF_PROVIDER`.

## 8. AI Import Advisor (step 6 preview)

1. User asks a question on an analysis page.
2. Server loads that analysis from Supabase (RLS ensures it's theirs).
3. Server sends Claude: the analysis inputs, the calculated results, and
   *tools* such as `run_scenario(overrides)` and `break_even()` that call our
   calculation engine.
4. Claude answers in plain English using only those numbers, and follows a
   system prompt that forbids inventing duty rates, HS codes or regulations.

## 9. Build plan (incremental)

| Step | What | Status |
|---|---|---|
| 1 | Project setup, architecture, database schema, provider interfaces | ✅ done |
| 2 | Authentication: sign up, login, logout, profile | next |
| 3 | Calculation engine (+ tests), Import Analyzer page, exchange rates | |
| 4 | Saved analyses: save, rename, open, delete, scenarios | |
| 5 | Dashboard: totals, recent analyses, profit indicators | |
| 6 | AI Import Advisor (Claude) | |
| 7 | Polish, mobile QA, Vercel deployment | |

**Deliberately not in the MVP:** teams, payments, PDF export, supplier
directory, chat history storage, automatic customs duty.
