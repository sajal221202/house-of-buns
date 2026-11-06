import { MEALS, VALUE_DEALS, SHAREABLES } from '../data/menu'
import { WishlistButton, PrepAndPrice } from './shared/ProductCardBits'
import CardCarousel from './shared/CardCarousel'

function ComboCard({ item }) {
  return (
    <div className="side-card" key={item.name} data-reveal>
      <div className="side-photo">
        <img src={item.photo} alt={item.name} loading="lazy" />
        <WishlistButton item={item} />
      </div>
      <h3>{item.name}</h3>
      {item.desc && <p className="combo-desc">{item.desc}</p>}
      <PrepAndPrice item={item} />
    </div>
  )
}

// Chunk each category into pages of 3 so every slide renders a single row —
// a category with more than 3 items (e.g. the 7 Meals) still gets its own
// label on each page, it just spans multiple pages instead of wrapping into
// extra rows on one page.
function chunkCategory(label, items, size = 3) {
  const pages = []
  for (let i = 0; i < items.length; i += size) {
    pages.push({ label, items: items.slice(i, i + size), gridClassName: 'sides-grid stagger', renderItem: (item) => <ComboCard item={item} /> })
  }
  return pages
}

const COMBO_GROUPS = [
  ...chunkCategory('🍱 Meals', MEALS),
  ...chunkCategory('💰 Value Deals', VALUE_DEALS),
  ...chunkCategory('🎉 Shareables', SHAREABLES),
]

export default function MealsAndCombos() {
  return (
    <section className="sides combos">
      <div className="wrap">
        <div className="sides-head">
          <h2 className="display sides-title" data-reveal>
            Meals &amp; Combos
          </h2>
          <span className="sides-badge" data-reveal>
            Bundled
            <br />
            &amp; better value!
          </span>
        </div>
        <CardCarousel groups={COMBO_GROUPS} autoPlayMs={5200} />
      </div>
    </section>
  )
}
