import { waLink, RESTAURANT_WHATSAPP_NUMBER } from '../utils/whatsapp'

const DISPLAY_NUMBER = RESTAURANT_WHATSAPP_NUMBER
  ? `+${RESTAURANT_WHATSAPP_NUMBER.slice(0, 2)} ${RESTAURANT_WHATSAPP_NUMBER.slice(2)}`
  : null

export default function TopBar() {
  return (
    <div className="topbar">
      <span className="topbar-loc">🍽️ Dine-In Only</span>
      {DISPLAY_NUMBER && (
        <a
          className="topbar-contact"
          href={waLink(RESTAURANT_WHATSAPP_NUMBER, "Hi! I'd like to know more about House of Buns.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Call &amp; WhatsApp: <strong>{DISPLAY_NUMBER}</strong>
        </a>
      )}
    </div>
  )
}
