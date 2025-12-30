# Study App Skeleton (Anki + Brilliant style)

This repo scaffold provides:
- PostgreSQL schema (via Prisma) matching the provided SQL
- Backend: Express + TypeScript + Prisma with an SRS compute endpoint
- Frontend: Vite + React + TypeScript minimal UI to call the SRS endpoint

Prerequisites
- Node 18+
- PostgreSQL (local or remote)
- pnpm/npm/yarn

Quick start (development)

1. Create a Postgres database and set DATABASE_URL (example):
   - postgres://USER:PASSWORD@localhost:5432/studyapp

2. Backend
   - cd backend
   - copy `.env.example` to `.env` and update DATABASE_URL
   - pnpm install
   - npx prisma generate
   - npx prisma migrate dev --name init
   - pnpm dev

   Backend runs on http://localhost:4000

3. Frontend
   - cd frontend
   - pnpm install
   - pnpm dev

   Frontend runs on http://localhost:5173 and proxies API requests to backend.

What the minimal API provides
- GET /api/health
- POST /api/srs/compute
  - body: { prevInterval, prevReps, prevEf, result: { rating } }
  - returns: { interval, reps, ef, dueDays }

Notes
- This is intentionally minimal to give you a working foundation. After you verify it runs, I can add auth, deck/card CRUD, review logging, import/export, local-first sync, and a proper SRS review queue.

If you want I can:
- Scaffold full backend CRUD + auth
- Implement Anki .apkg import endpoint
- Add local IndexedDB store and a sync protocol stub
- Create issue backlog / GitHub Actions CI
