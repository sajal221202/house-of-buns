import { CURRENCY } from '../data/menu'

// Fill this in with the restaurant's real WhatsApp number (country code + number,
// digits only, e.g. '91XXXXXXXXXX') to target the counter's WhatsApp directly.
// Left blank, the "notify counter" link just opens WhatsApp's contact picker instead.
export const RESTAURANT_WHATSAPP_NUMBER = '919039035052'

export function waLink(phone, text) {
  const digits = (phone || '').replace(/\D/g, '')
  const target = digits ? (digits.length === 10 ? `91${digits}` : digits) : ''
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`
}

export function orderSummaryText(order) {
  const lines = order.items.map((item) => `- ${item.qty}x ${item.name} – ${CURRENCY}${item.qty * item.price}`)
  return [
    `🍔 House of Buns – Dine-In Order`,
    `Token: ${order.token}`,
    `Name: ${order.name}${order.phone ? ` (${order.phone})` : ''}`,
    '',
    'Items:',
    ...lines,
    '',
    `Total: ${CURRENCY}${order.total}`,
    `Payment: ${order.paymentMethod || '—'}`,
    `Counter: ${order.counter}`,
  ].join('\n')
}

export function orderReadyText(order) {
  return `🎉 House of Buns – your order ${order.token} is ready! Please collect it at ${order.counter}.`
}
