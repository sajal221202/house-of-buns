import {
  LOCATIONS,
  FLAGSHIP_HOURS,
  FLAGSHIP_ADDRESS,
  FLAGSHIP_MAPS_SHARE_LINK,
  FLAGSHIP_MAPS_EMBED_SRC,
} from '../data/menu'
import { waLink, RESTAURANT_WHATSAPP_NUMBER } from '../utils/whatsapp'

const CALL_HREF = RESTAURANT_WHATSAPP_NUMBER ? `tel:+${RESTAURANT_WHATSAPP_NUMBER}` : undefined
const DISPLAY_NUMBER = RESTAURANT_WHATSAPP_NUMBER
  ? `+${RESTAURANT_WHATSAPP_NUMBER.slice(0, 2)} ${RESTAURANT_WHATSAPP_NUMBER.slice(2)}`
  : 'Coming soon'

const flagship = LOCATIONS[0]

export default function Locations() {
  return (
    <section className="locations">
      <div className="wrap">
        <div className="flagship-card" data-reveal>
          <div className="flagship-left">
            <span className="flagship-eyebrow">✦ Flagship Destination</span>
            <h2 className="display flagship-title">
              One House.
              <br />
              One Table.
              <br />
              <span className="flagship-title-accent">Dine In.</span>
            </h2>
            <p className="flagship-copy">
              No delivery gimmicks — every order is built fresh right when you ask for it. Grab a token at the
              counter and it&rsquo;s yours in minutes.
            </p>

            <div className="flagship-pills">
              <div className="flagship-pill">
                <span className="flagship-pill-icon">📍</span>
                <div>
                  <span className="flagship-pill-label">Our Address</span>
                  <span className="flagship-pill-value">{FLAGSHIP_ADDRESS}</span>
                </div>
              </div>
              <div className="flagship-pill">
                <span className="flagship-pill-icon">🕐</span>
                <div>
                  <span className="flagship-pill-label">Open Daily</span>
                  <span className="flagship-pill-value">{FLAGSHIP_HOURS}</span>
                </div>
              </div>
            </div>

            <div className="flagship-actions">
              <a
                className="flagship-btn"
                href={FLAGSHIP_MAPS_SHARE_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                🧭 Get Directions
              </a>
              {CALL_HREF && (
                <a className="flagship-btn" href={CALL_HREF}>
                  📞 Call: {DISPLAY_NUMBER}
                </a>
              )}
            </div>
            <a
              className="flagship-btn flagship-btn-solid"
              href={waLink(RESTAURANT_WHATSAPP_NUMBER, "Hi! I'd like to know more about House of Buns.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp: {DISPLAY_NUMBER}
            </a>
          </div>

          <div className="flagship-photo">
            <img src={flagship.photo} alt={flagship.label} loading="lazy" />
            <div className="flagship-photo-caption">
              <span className="flagship-photo-zone">{flagship.zone}</span>
              <span className="flagship-photo-label">{flagship.label} Outlet</span>
            </div>
          </div>
        </div>

        <div className="flagship-map" data-reveal>
          <iframe
            title="House of Buns on Google Maps"
            src={FLAGSHIP_MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
