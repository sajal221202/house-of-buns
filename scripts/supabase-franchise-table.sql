create table franchise_enquiries (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  city text not null,
  budget text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table franchise_enquiries enable row level security;

create policy "Allow public insert" on franchise_enquiries
  for insert to anon with check (true);

create policy "Allow public read" on franchise_enquiries
  for select to anon using (true);

create policy "Allow public update" on franchise_enquiries
  for update to anon using (true);
