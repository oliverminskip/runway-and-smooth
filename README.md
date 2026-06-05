# Runway &amp; Smooth

A runway-management personal finance tool for freelancers, contractors, and solo
founders with irregular income. It throws out the calendar month and answers one
question loudly: **how many weeks am I financially safe for?**

Manual input only — no open banking, no bank credentials — to keep data and legal
liability minimal.

## How it works

1. **Baseline burn** — you set your bare-minimum survival cost (weekly or monthly).
2. **Cash influx** — you log an irregular payout (e.g. a £5,000 invoice).
3. **The tax chop** — a set percentage is shaved into a locked Tax Vault so you
   never spend your tax bill by accident.
4. **Runway** — the remaining net cash ÷ burn rate = your runway in weeks & days.

## Tech stack

- **React 18 + Vite 6**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/index.css`)
- **Firebase v11** — Auth (email/password) + Firestore (real-time `onSnapshot`)
- **lucide-react** icons

## Getting started

```bash
npm install
cp .env.example .env.local   # then paste in your Firebase web config
npm run dev
```

### Firebase setup

1. Create a Firebase project, add a **Web app**, and copy the config keys into
   `.env.local` (all prefixed `VITE_`).
2. Enable **Authentication → Email/Password**.
3. Create a **Firestore database**.
4. Publish the rules in `firestore.rules` (each user can only touch their own data).

## Architecture

```
src/
├── firebase/config.js        # env-driven Firebase init (app, auth, db)
├── context/AuthContext.jsx   # onAuthStateChanged + login/register/logout
├── hooks/useRunwayData.js    # real-time Firestore streams + write actions + derived state
├── lib/runway.js             # pure, testable finance math (no React/Firebase)
└── components/
    ├── Dashboard.jsx         # layout shell
    ├── RunwayGauge.jsx       # hero metric (SVG arc + reassurance copy)
    ├── QuickLogForm.jsx      # income + note + tax slider with live preview
    ├── SnapshotPanel.jsx     # net cash / tax vault / editable burn / spend logger
    ├── TransactionLedger.jsx # scannable history
    └── Login.jsx             # auth screen
```

All money math lives in `src/lib/runway.js` and is deliberately framework-free so
it can be unit-tested in isolation.

### Firestore data model (multi-tenant)

```
users/{uid}/meta/settings          { burnAmount, burnPeriod, defaultTaxRate, currency }
users/{uid}/transactions/{autoId}  income:  { type:'income', gross, taxRate, taxAmount, netAmount, note, createdAt }
                                   spend:   { type:'spend',  amount, note, createdAt }
```

## Note on filenames

The Phase 1 spec named the context file `AuthContext.js`. It contains JSX, and
Vite's esbuild only parses JSX from `.jsx` files by default, so it ships as
`AuthContext.jsx`. Same reasoning keeps all JSX components as `.jsx`.

## Next steps (Phase 2 ideas)

- Multiple tax vaults (income tax vs. NI vs. VAT).
- "What payout do I need to hit N weeks of runway?" target calculator.
- Recurring expense templates instead of manual spend logging.
- Code-split Firebase to trim the initial bundle.
