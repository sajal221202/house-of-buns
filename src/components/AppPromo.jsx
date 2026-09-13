import { APP_PHOTO, FEATURED_BURGERS, CURRENCY } from '../data/menu'

const featured = FEATURED_BURGERS[3]

export default function AppPromo() {
  return (
    <section className="app">
      <div className="wrap app-inner">
        <div className="app-phone" data-reveal>
          <div className="app-phone-screen">
            <div className="app-phone-photo">
              <img src={APP_PHOTO} alt={featured.name} loading="lazy" />
            </div>
            <div className="app-phone-line">
              <span>{featured.name}</span>
              <span>
                {CURRENCY}
                {featured.price}
              </span>
            </div>
            <button className="app-phone-btn">
              Add {CURRENCY}
              {featured.price}
            </button>
          </div>
        </div>
        <div className="app-copy" data-reveal>
          <h2 className="display">
            Order Your
            <br />
            Favorite Buns With
            <br />
            Our Mobile App
          </h2>
          <div className="app-badges">
            <span className="btn btn-dark">🍎 Get on iPhone</span>
            <span className="btn btn-dark">▶ Get on Android</span>
          </div>
        </div>
      </div>
    </section>
  )
}
