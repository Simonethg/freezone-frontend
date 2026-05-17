# FreeZone Enterprise Matrix — Frontend

Institutional dashboard for cross-border operational trust, document anchoring on Avalanche Fuji, reputation scoring, and payment orchestration.

## Stack

- Next.js 14+ App Router (TypeScript strict)
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod
- Native `fetch` API client (`lib/api.ts`)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend base URL (default: `https://freezone-demo.vercel.app`) |

## Backend endpoints consumed

| Method | Path |
|--------|------|
| GET | `/api/health` |
| GET | `/api/demo/state` |
| GET | `/api/demo/state?stage=after` |
| POST | `/api/documents/upload` |
| POST | `/api/scores/calculate` |
| GET | `/api/scores/{companyId}` |
| POST | `/api/payments/initiate` |
| GET | `/api/payments/status/{paymentId}` |
| GET | `/api/documents/verify?hash={hash}` |

## Routes

- `/` — Landing
- `/dashboard` — Operational dashboard
- `/demo` — Argentina → Mexico demo flow
- `/upload` — Manual document upload
- `/payments` — Payment initiation and status
- `/verify` — Public hash verification

## Deploy frontend

```bash
npm run build
```

Deploy to Vercel or any Node host. Set `NEXT_PUBLIC_API_BASE_URL` to the live backend URL. A `vercel.json` is included for Vercel projects.

## License

Hackathon demo — Avalanche ecosystem.
