import { DRINKS, GLASS_BOTTLE_DRINKS, CAN_DRINKS } from '../data/menu'
import { WishlistButton, PrepAndPrice } from './shared/ProductCardBits'
import CardCarousel from './shared/CardCarousel'

function BevPhotoTile({ item }) {
  return (
    <div className="bev-photo-tile" data-reveal>
      <div className="bev-photo-pedestal">
        <img src={item.photo} alt={item.name} loading="lazy" />
        <WishlistButton item={item} />
      </div>
      <h4>{item.name}</h4>
      <PrepAndPrice item={item} />
    </div>
  )
}

function BevTile({ item }) {
  return (
    <div className={`bev-tile bev-tint-${item.tint || 'green'}`} data-reveal>
      <div className="bev-tile-puck" aria-hidden="true" />
      <div className="bev-tile-photo">
        <img src={item.photo} alt={item.name} loading="lazy" />
        <WishlistButton item={item} className="bev-tile-heart" />
      </div>
      <h4>{item.name}</h4>
      <PrepAndPrice item={item} />
    </div>
  )
}

const DRINK_GROUPS = [
  {
    label: '☕ House Specials',
    items: DRINKS,
    gridClassName: 'bev-tiles',
    renderItem: (item) => <BevPhotoTile item={item} key={item.name} />,
  },
  {
    label: '🍾 Glass Bottles',
    items: GLASS_BOTTLE_DRINKS,
    gridClassName: 'bev-tiles',
    renderItem: (item) => <BevTile item={item} key={item.name} />,
  },
  {
    label: '🥤 Chilled Cans',
    items: CAN_DRINKS,
    gridClassName: 'bev-tiles',
    renderItem: (item) => <BevTile item={item} key={item.name} />,
  },
]

export default function Drinks() {
  return (
    <section className="drinks">
      <div className="drinks-drip" aria-hidden="true" />
      <div className="wrap drinks-inner">
        <h2 className="display drinks-title" data-reveal>
          Chug it down
        </h2>
        <p className="drinks-sub">with a variety of drinks</p>

        <CardCarousel groups={DRINK_GROUPS} autoPlayMs={4800} />
      </div>
    </section>
  )
}
