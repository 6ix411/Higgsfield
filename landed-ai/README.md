# LANDED AI

**Import profitability and landed-cost analysis for Nigerian importers.**

LANDED AI helps small importers, wholesalers and retailers estimate the full
cost of bringing a product into Nigeria, in Naira, and check whether the
resale numbers make sense before they pay a supplier.

> **Status: MVP, step 2 of 7 (login, sign-up and profile done).** See
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design and build plan.

> ⚠️ **Customs notice.** LANDED AI does **not** provide Nigerian customs duty
> rates, taxes, HS codes, restrictions or permit requirements. Any such figure
> you enter is labelled *"requires verification"*. Always confirm with the
> Nigeria Customs Service or a licensed customs agent.

---

## Tech stack

| Part | Tool |
|---|---|
| Web framework | [Next.js 16](https://nextjs.org) (App Router) + TypeScript |
| Styling | Tailwind CSS 4 |
| Login + database | [Supabase](https://supabase.com) (Postgres, Auth, Row Level Security) |
| AI advisor | Claude API (Anthropic), added in step 6 |
| Exchange rates | Swappable provider, added in step 3 |
| Hosting | Vercel |

---

## 1. Install

You need **Node.js 20.9 or newer** (check with `node -v`) and npm.

```bash
cd landed-ai
npm install
```

## 2. Set up Supabase

You can use a **local Supabase** on your computer (Option A, best for
development) or a **hosted Supabase project** (Option B, needed to go live).

### Option A — local Supabase (recommended for development)

Needs [Docker Desktop](https://www.docker.com/products/docker-desktop/) running.

```bash
npm run db:start
```

The first run downloads Supabase's Docker images (a few minutes). It then
creates the tables from `supabase/migrations/` and prints your local keys:

- **API URL** → `NEXT_PUBLIC_SUPABASE_URL` (normally `http://127.0.0.1:54321`)
- **Publishable key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Mailpit URL** (`http://127.0.0.1:54324`) — a fake inbox. Sign-up
  confirmation emails land here, not in a real mailbox.
- **Studio URL** (`http://127.0.0.1:54323`) — a web UI to browse your tables.

Local auth settings (password rules, email template) live in
`supabase/config.toml` and `supabase/templates/`. Useful commands:

```bash
npm run db:stop    # stop local Supabase
npm run db:reset   # wipe local data and re-run all migrations
npm run db:types   # regenerate TypeScript types after changing the schema
```

### Option B — hosted Supabase project

1. Create a free project at [supabase.com](https://supabase.com/dashboard).
2. **Create the database tables:** in your project, open **SQL Editor → New query**,
   paste the whole contents of
   [`supabase/migrations/20260928000000_initial_schema.sql`](supabase/migrations/20260928000000_initial_schema.sql),
   and click **Run**.
   *(If you use the Supabase CLI: `supabase link` then `supabase db push`.)*
3. **Get your keys:** go to **Project Settings → API Keys**. Copy the
   **Project URL** and the **publishable key** (starts with `sb_publishable_`).
4. **Auth URLs:** go to **Authentication → URL Configuration**. Set
   **Site URL** to `http://localhost:3000` while developing (change it to your
   Vercel URL when you deploy), and add `http://localhost:3000/auth/confirm`
   to **Redirect URLs**.
5. **Password rules** (to match the app): in **Authentication**, open the **Email** provider settings and set
   minimum length **8** and require **letters and digits**.
6. **Confirmation email** (recommended): **Authentication → Emails → Confirm signup**.
   Replace the template body with the contents of
   [`supabase/templates/confirmation.html`](supabase/templates/confirmation.html).
   This makes the confirmation link work even when it's opened on a different
   device (e.g. sign up on a laptop, confirm on a phone). The default
   template also works, but only in the same browser that signed up.

## 3. Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Required? | Where it's used | What it is |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | browser + server | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | browser + server | Supabase publishable key. Safe to expose; RLS protects the data. |
| `NEXT_PUBLIC_SITE_URL` | In production | server | Your public URL, used in sign-up email links |
| `ANTHROPIC_API_KEY` | From step 6 | server only | Claude API key from [console.anthropic.com](https://console.anthropic.com) |
| `EXCHANGE_RATE_PROVIDER` | Optional | server only | Which exchange-rate provider to use. Empty = enter rates manually. |
| `EXCHANGE_RATE_API_KEY` | Optional | server only | Key for that provider, if it needs one |
| `TARIFF_PROVIDER` | No (future) | server only | Official tariff source. Leave empty. |

`.env.local` is ignored by git. **Never commit real keys.** Anything *without*
the `NEXT_PUBLIC_` prefix stays on the server and never reaches the browser.

## 4. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>, click **Start free analysis** and create an
account. With local Supabase, open the Mailpit inbox (<http://127.0.0.1:54324>)
and click the confirmation link. You'll land on your dashboard.

If Supabase keys are missing, the home page shows a "Setup needed" notice.

Other commands:

```bash
npm run lint       # check code style
npm run typecheck  # check TypeScript types
npm run build      # production build
npm start          # run the production build
```

---

## How the database works

There are four tables. Full explanation in
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#4-database).

| Table | Holds |
|---|---|
| `profiles` | One row per user: name, business name, default city. Created automatically when someone signs up. |
| `import_analyses` | One saved analysis: product, quantity, supplier price, selling price, exchange rates used, and a snapshot of the results in Naira. |
| `analysis_cost_items` | Shipping, insurance and other costs on an analysis, each with its own currency and exchange rate, and a verification label. |
| `analysis_scenarios` | Saved "what if" versions of an analysis (e.g. quantity = 500). |

**Row Level Security (RLS)** is switched on for every table. The database only
lets a logged-in user see or change rows that belong to them. Even if there
were a bug in the app, one user could not read another user's analyses.

**Money** is stored as exact decimals (`numeric`), never floating-point, and
every amount keeps its original currency plus the rate used to convert it to Naira.

---

## Deploy to Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), **Import** the repository.
3. Set **Root Directory** to `landed-ai` (the app lives in this sub-folder).
4. Add the same environment variables from your `.env.local` under
   **Settings → Environment Variables**.
5. Click **Deploy**.
6. In Supabase → **Authentication → URL Configuration**, set **Site URL** to
   your Vercel URL (e.g. `https://landed-ai.vercel.app`) and add
   `https://landed-ai.vercel.app/auth/confirm` to **Redirect URLs**.
   Also set `NEXT_PUBLIC_SITE_URL` in Vercel to the same address.
7. Use a real email provider (SMTP) for production: Supabase's built-in email
   is limited to a few messages per hour. Set up custom SMTP in the Supabase dashboard under **Authentication → Emails** (SMTP settings).

---

## Project structure

```
src/
├── proxy.ts              Runs before each page: refreshes login, protects private pages
├── app/
│   ├── page.tsx          Public home page
│   ├── (auth)/           /login, /signup and their server actions (login, signup, logout)
│   ├── (app)/            Logged-in pages: /dashboard, /profile (layout checks the user)
│   └── auth/confirm/     Where the email confirmation link lands
├── components/           Shared UI: buttons, form fields, alerts, cards, nav
└── lib/
    ├── env.ts            Reads and checks environment variables
    ├── auth/             Current-user helper, form validation, safe redirects
    ├── currency/         Supported currencies
    ├── supabase/         Database/auth clients + generated database types
    ├── exchange-rates/   Swappable exchange-rate provider
    └── tariffs/          Swappable customs data source ("requires verification" by default)
supabase/migrations/      Database schema (SQL)
supabase/config.toml      Local Supabase settings (auth rules, email template)
docs/ARCHITECTURE.md      Design decisions and build plan
```
