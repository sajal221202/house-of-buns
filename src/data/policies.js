import { FLAGSHIP_ADDRESS, FLAGSHIP_HOURS } from './menu'
import { RESTAURANT_WHATSAPP_NUMBER } from '../utils/whatsapp'

const DISPLAY_NUMBER = RESTAURANT_WHATSAPP_NUMBER
  ? `+${RESTAURANT_WHATSAPP_NUMBER.slice(0, 2)} ${RESTAURANT_WHATSAPP_NUMBER.slice(2)}`
  : 'our counter'

export const FAQ_ITEMS = [
  {
    q: 'Is House of Buns dine-in only, or do you deliver?',
    a: 'Dine-in only, right now. Every order is placed on this site or at the counter, cooked fresh, and handed to you at our Indore outlet — we don’t offer delivery or shipping.',
  },
  {
    q: 'How does ordering ahead work?',
    a: 'Tap "Order Now", log in with your name and phone number, build your order, and check out. You’ll get a token (like HB-014) with a live countdown — head to the counter and show your token when it’s ready.',
  },
  {
    q: 'How do I pay?',
    a: 'You can select UPI, Card, or Pay at Counter at checkout. Right now, payment is actually collected in person at the counter when you arrive — we don’t process online payments yet, so please carry your preferred payment method with you.',
  },
  {
    q: 'What are your hours?',
    a: `We're open ${FLAGSHIP_HOURS}.`,
  },
  {
    q: 'Where are you located?',
    a: FLAGSHIP_ADDRESS,
  },
  {
    q: 'How do promo codes work?',
    a: 'Check the "Promo Codes" button in the navigation for current offers. Show the code at the counter, or mention it when you check out, to get the discount applied.',
  },
  {
    q: 'I want to open a House of Buns franchise — who do I talk to?',
    a: `Use the "Franchise Enquiry" button in the navigation. Fill in your details and it opens a WhatsApp message straight to us at ${DISPLAY_NUMBER}.`,
  },
]

export const PRIVACY_POLICY = [
  'We collect only what we need to run your dine-in order: your name and phone number (when you log in to order), and the items in your order. This is stored securely and used to generate your token, estimate prep time, and let our counter staff match your order to you.',
  'Your phone number is also used so our team can send you an order-ready message on WhatsApp if you or our staff choose to use that option. We never sell or share your information with third parties.',
  'If you use "Franchise Enquiry" or "Chat on WhatsApp," the details you enter are sent directly to our business WhatsApp number and are not stored on our servers beyond what’s needed to open that chat.',
  'If you subscribe to our newsletter, we store your email address only to send you updates about House of Buns, and never share it externally. You can ask us to remove your email at any time by messaging us on WhatsApp.',
]

export const TERMS_CONDITIONS = [
  'House of Buns is a dine-in only concept. Orders placed through this website are for pickup at our counter — we do not offer home delivery or courier shipping of any kind.',
  'Prices shown are current at the time of ordering but may change without notice. The token and estimated ready-time shown after checkout are estimates, not guarantees — actual prep time can vary based on how busy the counter is.',
  'Promo codes are valid as displayed and may be limited to specific items, minimum order values, or time periods noted for that code. We reserve the right to modify or withdraw a promo code at any time.',
  'Payment method selection (UPI, Card, or Pay at Counter) at checkout does not process an online payment today — please be ready to pay our staff directly at the counter when you collect your order.',
]

export const REFUND_POLICY = [
  'Because every order is cooked fresh after you place it, we’re unable to offer refunds once preparation has started.',
  'If you need to cancel, message us on WhatsApp as soon as possible after ordering — if your order hasn’t started cooking yet, we’ll cancel your token with no charge.',
  'If something is wrong with your order when you collect it (missing item, wrong item, quality issue), let our counter staff know immediately and we’ll make it right on the spot.',
]
