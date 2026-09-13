export function deriveStatus(order, now = Date.now()) {
  if (order.status === 'collected') return 'collected'
  return now >= order.readyAt ? 'ready' : 'preparing'
}
