import { CURRENCY } from '../data/menu'
import { useOrder } from '../context/OrderContext'

export default function AppPromo() {
  const { openOrderModal } = useOrder()

  return (
    <section className="app">
      <div className="wrap app-inner app-inner-centered">
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
