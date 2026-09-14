import { APP_PHOTO, FEATURED_BURGERS, CURRENCY } from '../data/menu'
import { useOrder } from '../context/OrderContext'

const featured = FEATURED_BURGERS[3]

export default function AppPromo() {
  const { addToCart, openOrderModal } = useOrder()

  function handleAdd() {
    addToCart(featured)
    openOrderModal()
  }

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
            <button className="app-phone-btn" onClick={handleAdd}>
              Add {CURRENCY}
              {featured.price}
            </button>
          </div>
        </div>
        <div className="app-copy" data-reveal>
          <h2 className="display">
            Order Ahead
            <br />
            Right From
            <br />
            Your Phone
          </h2>
          <p className="app-sub">
            No app to download — order straight from this website, get a token, and it&rsquo;s ready when you
            walk in.
          </p>
          <div className="app-badges">
            <button className="btn btn-dark" onClick={openOrderModal}>
              🍔 Order Now
            </button>
            <a className="btn btn-dark" href="#menu">
              📋 View Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
