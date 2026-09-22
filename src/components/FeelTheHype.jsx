import { HYPE_PHOTOS } from '../data/menu'
import useIsMobile from '../hooks/useIsMobile'
import CardCarousel from './shared/CardCarousel'

const HYPE_ITEMS = [
  {
    num: '01',
    icon: '🌱',
    title: 'Abundant Nutrition',
    copy: 'Each bite serves you with the healthiest local ingredients.',
    photo: HYPE_PHOTOS.nutrition,
    alt: 'House of Buns signature burger',
  },
  {
    num: '02',
    icon: '⭐',
    title: 'Higher Quality',
    copy: 'We only use farm-fresh, locally-sourced ingredients.',
    photo: HYPE_PHOTOS.quality,
    alt: 'Higher quality buns',
  },
  {
    num: '03',
    icon: '🏆',
    title: 'Award Winning Flavours',
    copy: 'Our buns have gained recognition for their unique flavors.',
    photo: HYPE_PHOTOS.flavours,
    alt: 'Award winning flavours',
  },
]

function StackCard({ item }) {
  return (
    <div className="hype-card hype-card-tall hype-stack-card" data-reveal>
      <span className="hype-card-num">{item.num}</span>
      <div className="hype-photo">
        <img src={item.photo} alt={item.alt} loading="lazy" />
      </div>
      <div className="hype-card-body">
        <span className="hype-card-icon">{item.icon}</span>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        <a href="#menu">Learn More →</a>
      </div>
    </div>
  )
}

export default function FeelTheHype() {
  const isMobile = useIsMobile(800)

  return (
    <section id="about" className="hype">
      <div className="wrap hype-inner">
        <p className="hype-eyebrow">
          <span className="hype-avatar">😋</span> Happiness in your hands
        </p>
        <h2 className="display hype-title" data-reveal>
          Feel the Hype
        </h2>

        {isMobile ? (
          <div className="stack-carousel">
            <CardCarousel
              items={HYPE_ITEMS}
              perView={1}
              autoPlayMs={3800}
              gridClassName="stack-carousel-slide"
              renderItem={(item) => <StackCard item={item} key={item.title} />}
            />
          </div>
        ) : (
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
        )}
      </div>
    </section>
  )
}
