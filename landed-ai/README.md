# LANDED AI

**Import profitability and landed-cost analysis for Nigerian importers.**

LANDED AI helps small importers, wholesalers and retailers estimate the full
cost of bringing a product into Nigeria, in Naira, and check whether the
resale numbers make sense before they pay a supplier.

> **Status: MVP, step 1 of 7 (project setup).** See
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

1. Create a free project at [supabase.com](https://supabase.com/dashboard).
2. **Create the database tables:** in your project, open **SQL Editor → New query**,
   paste the whole contents of
   [`supabase/migrations/20260928000000_initial_schema.sql`](supabase/migrations/20260928000000_initial_schema.sql),
   and click **Run**.
   *(If you use the Supabase CLI: `supabase link` then `supabase db push`.)*
3. **Get your keys:** go to **Project Settings → API Keys**. Copy the
   **Project URL** and the **publishable key** (starts with `sb_publishable_`).
4. **Auth URLs:** go to **Authentication → URL Configuration** and set
   **Site URL** to `http://localhost:3000` while developing (change it to your
   Vercel URL when you deploy).

## 3. Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Required? | Where it's used | What it is |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | browser + server | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | browser + server | Supabase publishable key. Safe to expose; RLS protects the data. |
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

Open <http://localhost:3000>. The home page shows a **Setup status** card that
turns green once Supabase is configured.

Other commands:

```bash
npm run lint     # check code style
npm run build    # production build (also type-checks)
npm start        # run the production build
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
   your Vercel URL (e.g. `https://landed-ai.vercel.app`) and add it to
   **Redirect URLs**.

---

## Project structure

```
src/
├── proxy.ts              Runs before each page: refreshes login, protects private pages
├── app/                  Pages
└── lib/
    ├── env.ts            Reads and checks environment variables
    ├── currency/         Supported currencies
    ├── supabase/         Database/auth clients (browser, server, proxy)
    ├── exchange-rates/   Swappable exchange-rate provider
    └── tariffs/          Swappable customs data source ("requires verification" by default)
supabase/migrations/      Database schema (SQL)
docs/ARCHITECTURE.md      Design decisions and build plan
```
