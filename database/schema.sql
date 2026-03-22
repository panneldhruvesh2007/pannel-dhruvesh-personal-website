-- ============================================================
-- PANNEL DHRUVESH — PORTFOLIO DATABASE SCHEMA
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ── CONTACTS TABLE ────────────────────────────────────────
create table if not exists contacts (
  id         bigint      generated always as identity primary key,
  name       text        not null check (char_length(name) >= 2),
  email      text        not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone      text        not null,
  purpose    text        not null,
  message    text        not null check (char_length(message) >= 10),
  created_at timestamptz not null default now()
);

create index if not exists contacts_email_idx      on contacts (email);
create index if not exists contacts_created_at_idx on contacts (created_at desc);

-- ── ROW LEVEL SECURITY ────────────────────────────────────
alter table contacts enable row level security;

create policy "Block public read"
  on contacts for select to anon using (false);

create policy "Block public insert"
  on contacts for insert to anon with check (false);

-- ── ADMIN SUMMARY VIEW ────────────────────────────────────
create or replace view contacts_summary as
  select
    id,
    name,
    email,
    purpose,
    left(message, 80) || case when char_length(message) > 80 then '...' else '' end as preview,
    created_at
  from contacts
  order by created_at desc;

-- ── VERIFY ────────────────────────────────────────────────
select column_name, data_type, is_nullable
from information_schema.columns
where table_name = 'contacts'
order by ordinal_position;
