import { useEffect, useState } from 'react'
import logoBadge from '../assets/logo-badge-green.png'
import burgerIcon from '../assets/burger-icon.png'
import heroBurger from '../assets/photos/hero-burger.png'
import mascotGreen from '../assets/mascot-green.png'
import { FEATURED_BURGERS, CURRENCY } from '../data/menu'

export default function Hero() {
  const [active, setActive] = useState(0)
  const item = FEATURED_BURGERS[active]

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % FEATURED_BURGERS.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  function prev() {
    setActive((i) => (i - 1 + FEATURED_BURGERS.length) % FEATURED_BURGERS.length)
  }

  function next() {
    setActive((i) => (i + 1) % FEATURED_BURGERS.length)
  }

  return (
    <section className="hero">
      <div className="hero-bgword" aria-hidden="true">
        {item.name.toUpperCase()}
      </div>
      <img src={logoBadge} alt="" aria-hidden="true" className="hero-stamp" />
      <img src={heroBurger} alt="" aria-hidden="true" className="hero-plate hero-plate-left" loading="eager" />
      <img src={heroBurger} alt="" aria-hidden="true" className="hero-plate hero-plate-right" loading="eager" />

      <button className="hero-arrow hero-arrow-left" onClick={prev} aria-label="Previous bun">
        ‹
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next bun">
        ›
      </button>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <div className="hero-badges">
            <span className="hero-badge">🌿 100% Pure Veg</span>
            <span className="hero-badge">🔥 Crispy &amp; Golden</span>
          </div>
          <h1 className="display hero-title">
            <img src={burgerIcon} alt="" aria-hidden="true" className="hero-title-burger" />
            Mind
            <br />
            Blowing
            <br />
            Bites
          </h1>
          <div className="hero-cta-row">
            <a href="#location" className="btn btn-green hero-cta">
              Find Location
            </a>
            <div className="hero-pick">
              <span className="hero-pick-label">Today&rsquo;s Pick</span>
              <span className="hero-pick-name">{item.name}</span>
              <span className="hero-pick-price">
                {CURRENCY}
                {item.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      <img src={mascotGreen} alt="House of Buns mascot" className="hero-mascot" />
    </section>
  )
}
