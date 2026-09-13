import logoFullWhite from '../assets/logo-full-white.png'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="wrap footer-top">
        <img src={logoFullWhite} alt="House of Buns" className="footer-logo" loading="lazy" />
      </div>
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i}>HOUSE OF BUNS</span>
          ))}
        </div>
      </div>
      <div className="wrap footer-inner">
        <div>
          <h3>Join our newsletter</h3>
          <p>Get updated on the freshest news!</p>
        </div>
        <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button type="submit" className="btn btn-green">
            Subscribe
          </button>
        </form>
      </div>
      <div className="footer-bottom">© House of Buns. All rights reserved.</div>
    </footer>
  )
}
