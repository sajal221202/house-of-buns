import { TESTIMONIALS } from '../data/menu'
import useIsMobile from '../hooks/useIsMobile'
import CardCarousel from './shared/CardCarousel'

function ReviewCard({ t }) {
  return (
    <div className={`review-card ${t.featured ? 'review-card-featured' : ''}`} data-reveal>
      <div className="review-stars">
        {'★'.repeat(t.rating)}
        {'☆'.repeat(5 - t.rating)}
      </div>
      <span className="review-quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <h3>{t.title}</h3>
      <p>&ldquo;{t.quote}&rdquo;</p>
      <div className="review-person">
        <span>{t.avatar}</span>
        <span className="review-person-info">
          <span className="review-person-name">{t.name}</span>
          <span className="review-person-location">{t.location}, House of Buns</span>
        </span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const isMobile = useIsMobile(1000)

  return (
    <section className="reviews">
      <div className="reviews-bgword" aria-hidden="true">
        REVIEWS
      </div>
      <div className="wrap reviews-inner">
        <h2 className="display reviews-title" data-reveal>
          Hear The Hype
        </h2>
        <p className="reviews-sub">See what our customers have to say about us</p>

        {isMobile ? (
          <div className="stack-carousel">
            <CardCarousel
              items={TESTIMONIALS}
              perView={1}
              autoPlayMs={4200}
              gridClassName="stack-carousel-slide"
              renderItem={(t) => <ReviewCard t={t} key={t.name} />}
            />
          </div>
        ) : (
          <div className="reviews-row stagger">
            {TESTIMONIALS.map((t) => (
              <ReviewCard t={t} key={t.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
