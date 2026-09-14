import { HYPE_PHOTOS } from '../data/menu'

export default function FeelTheHype() {
  return (
    <section id="about" className="hype">
      <div className="wrap hype-inner">
        <p className="hype-eyebrow">
          <span className="hype-avatar">😋</span> Happiness in your hands
        </p>
        <h2 className="display hype-title" data-reveal>
          Feel the Hype
        </h2>
        <div className="hype-grid">
          <div className="hype-card hype-card-tall hype-card-cutout" data-reveal>
            <span className="hype-card-num">01</span>
            <div className="hype-photo hype-photo-cutout">
              <img src={HYPE_PHOTOS.nutrition} alt="House of Buns signature burger" loading="lazy" />
            </div>
            <div className="hype-card-body">
              <span className="hype-card-icon">🌱</span>
              <h3>Abundant Nutrition</h3>
              <p>Each bite serves you with the healthiest local ingredients.</p>
              <a href="#menu">Learn More →</a>
            </div>
          </div>
          <div className="hype-col-wide">
            <div className="hype-card hype-card-wide" data-reveal>
              <span className="hype-card-num">02</span>
              <div className="hype-photo">
                <img src={HYPE_PHOTOS.quality} alt="Higher quality buns" loading="lazy" />
              </div>
              <div className="hype-card-body">
                <span className="hype-card-icon">⭐</span>
                <h3>Higher Quality</h3>
                <p>We only use farm-fresh, locally-sourced ingredients.</p>
                <a href="#menu">Learn More →</a>
              </div>
            </div>
            <div className="hype-card hype-card-wide hype-card-wide-reverse" data-reveal>
              <span className="hype-card-num">03</span>
              <div className="hype-card-body">
                <span className="hype-card-icon">🏆</span>
                <h3>Award Winning Flavours</h3>
                <p>Our buns have gained recognition for their unique flavors.</p>
                <a href="#menu">Learn More →</a>
              </div>
              <div className="hype-photo">
                <img src={HYPE_PHOTOS.flavours} alt="Award winning flavours" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        className="hype-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,110 480,10 720,45 C960,80 1200,25 1440,65 L1440,120 L0,120 Z"
          style={{ fill: 'var(--cream)' }}
        />
      </svg>
    </section>
  )
}
