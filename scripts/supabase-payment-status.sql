alter table orders add column if not exists payment_status text not null default 'not_required';
alter table orders add column if not exists cf_order_id text;
create index if not exists orders_cf_order_id_idx on orders (cf_order_id);
