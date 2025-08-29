# Ricettario Cloud (PDF) – MVP

Stack: Next.js (App Router) + Supabase (DB + Storage).

## Env vars (Vercel)
- NEXT_PUBLIC_SUPABASE_URL=...
- NEXT_PUBLIC_SUPABASE_ANON_KEY=...
- SUPABASE_SERVICE_ROLE=...
- ADMIN_PASSWORD=...
- COOKIE_NAME=frade_admin
- COOKIE_SECRET=stringa-lunga-random

## Rotte
- `/` lista pubblica con filtri
- `/admin` login admin (password unica)
- `/admin/new` upload PDF + metadati
- `/api/recipes` GET list
- `/api/recipes/new` POST multipart (solo admin)
