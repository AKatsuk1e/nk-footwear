create table if not exists public.nk_admin_products (
  id text primary key check (id ~ '^[a-z0-9-]{2,80}$'),
  product jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.nk_admin_products enable row level security;
revoke all on public.nk_admin_products from anon, authenticated;
-- Access is server-only through the Supabase service-role key stored in Vercel.
