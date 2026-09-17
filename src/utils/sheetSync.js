const WEBHOOK_URL = import.meta.env.VITE_ORDER_SHEET_WEBHOOK_URL

// Fire-and-forget: logs an order to the counter's Google Sheet. Never blocks
// or breaks the order flow — a failed sync just means the row didn't append.
export function syncOrderToSheet(order) {
  if (!WEBHOOK_URL) return

  fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(order),
  }).catch((error) => {
    console.error('Failed to sync order to Google Sheet', error)
  })
}
