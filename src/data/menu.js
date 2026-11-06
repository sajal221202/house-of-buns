import burgerPatty from '../assets/photos/burger-patty.jpg'
import burgerVeg2 from '../assets/photos/burger-veg-2.jpg'
import burgersTable from '../assets/photos/burgers-table.jpg'
import burgerAlooTikki from '../assets/photos/burger-aloo-tikki.jpg'
import burgerTandoori from '../assets/photos/burger-tandoori.jpg'
import burgerMakhani from '../assets/photos/burger-makhani.jpg'
import burgerChipotle from '../assets/photos/burger-chipotle.jpg'
import burgerChilliCheese from '../assets/photos/burger-chilli-cheese.jpg'
import burgerCheeseVeggie from '../assets/photos/burger-cheese-veggie.jpg'
import burgerTexMex from '../assets/photos/burger-tex-mex.jpg'
import sideCheeseCoins from '../assets/photos/side-cheese-coins.jpg'
import sideHerbSticks from '../assets/photos/side-herb-sticks.jpg'
import sideNachos from '../assets/photos/side-nachos.jpg'
import sidePlainNachos from '../assets/photos/side-plain-nachos.jpg'
import sideGarlicBread from '../assets/photos/side-garlic-bread.jpg'
import sideSaltedFries from '../assets/photos/side-salted-fries.jpg'
import sidePeriFries from '../assets/photos/side-peri-fries.jpg'
import sideCheesyFries from '../assets/photos/side-cheesy-fries.jpg'
import bevColaBottle from '../assets/photos/beverages/bev-cola-bottle.png'
import bevSpriteBottle from '../assets/photos/beverages/bev-sprite-bottle.png'
import bevFantaGlass from '../assets/photos/beverages/bev-fanta-glass.png'
import bevSpriteCan from '../assets/photos/beverages/bev-sprite-can.png'
import bevCokeCan from '../assets/photos/beverages/bev-coke-can.png'
import bevDietCokeCan from '../assets/photos/beverages/bev-diet-coke-can.png'
import bevColdCoffeePhoto from '../assets/photos/beverages/bev-cold-coffee-photo.jpg'
import bevClassicCoffee from '../assets/photos/beverages/bev-classic-coffee.jpg'
import bevHazelnutCoffee from '../assets/photos/beverages/bev-hazelnut-coffee.jpg'
import bevCaramelCoffee from '../assets/photos/beverages/bev-caramel-coffee.jpg'
import bevIcedTeaPhoto from '../assets/photos/beverages/bev-iced-tea-photo.jpg'
import heroBurger from '../assets/photos/hero-burger.png'
import outletCounter from '../assets/photos/outlet-counter.jpg'
import outletWall from '../assets/photos/outlet-wall.jpg'
import outletBooth from '../assets/photos/outlet-booth.jpg'

export const CURRENCY = '₹'

export function discountPercent(item) {
  if (!item.mrp || item.mrp <= item.price) return 0
  return Math.round(((item.mrp - item.price) / item.mrp) * 100)
}

// Prices below match the official printed menu exactly — no invented
// discounts/MRPs; if a future revision adds a real strikethrough price, set
// `mrp` on that item and the existing discount badge will pick it up.
export const FEATURED_BURGERS = [
  { name: 'Aloo Tikki', price: 59, prepTime: '8-10 mins', photo: burgerAlooTikki },
  { name: 'Tandoori', price: 69, prepTime: '10-12 mins', photo: burgerTandoori },
  { name: 'Makhani', price: 89, prepTime: '10-12 mins', photo: burgerMakhani },
  { name: 'Chipotle', price: 89, prepTime: '10-12 mins', photo: burgerChipotle },
  { name: 'Chilli Cheese', price: 119, prepTime: '10-12 mins', photo: burgerChilliCheese },
  { name: 'Cheese & Veggie', price: 159, prepTime: '10-12 mins', photo: burgerCheeseVeggie },
  { name: 'Tex Mex', price: 249, prepTime: '12-14 mins', photo: burgerTexMex },
]

export const SIDES = [
  { name: 'Salted Fries (Medium)', price: 59, prepTime: '6-8 mins', photo: sideSaltedFries },
  { name: 'Salted Fries (Large)', price: 79, prepTime: '6-8 mins', photo: sideSaltedFries },
  { name: 'Peri Peri Fries (Medium)', price: 79, prepTime: '6-8 mins', photo: sidePeriFries },
  { name: 'Peri Peri Fries (Large)', price: 99, prepTime: '6-8 mins', photo: sidePeriFries },
  { name: 'Cheesy Fries (Medium)', price: 129, prepTime: '8-10 mins', photo: sideCheesyFries },
  { name: 'Cheesy Fries (Large)', price: 159, prepTime: '8-10 mins', photo: sideCheesyFries },
  { name: 'Plain Nachos + Salsa', price: 99, prepTime: '8-10 mins', photo: sidePlainNachos },
  { name: 'Loaded Nachos', price: 129, prepTime: '10-12 mins', photo: sideNachos },
  { name: 'Garlic Bread Toasties', price: 149, prepTime: '8-10 mins', photo: sideGarlicBread },
  { name: 'Cheese Coins (5 pcs)', price: 129, prepTime: '8-10 mins', photo: sideCheeseCoins },
  { name: 'Cheese & Herb Sticks (5 pcs)', price: 129, prepTime: '8-10 mins', photo: sideHerbSticks },
]

export const DRINKS = [
  { name: 'Classic Cold Coffee', price: 69, prepTime: '4-5 mins', photo: bevClassicCoffee },
  { name: 'Hazelnut Cold Coffee', price: 119, prepTime: '4-5 mins', photo: bevHazelnutCoffee },
  { name: 'Caramel Cold Coffee', price: 119, prepTime: '4-5 mins', photo: bevCaramelCoffee },
  { name: 'Iced Tea', price: 69, prepTime: '3-4 mins', photo: bevIcedTeaPhoto },
]

// Every meal = 1 burger + Medium Salted Fries + a soft drink.
export const MEALS = [
  { name: 'Aloo Tikki Meal', price: 109, prepTime: '10-12 mins', photo: burgerAlooTikki, desc: '1 Aloo Tikki Burger + Medium Salted Fries + Soft Drink' },
  { name: 'Tandoori Meal', price: 119, prepTime: '10-12 mins', photo: burgerTandoori, desc: '1 Tandoori Burger + Medium Salted Fries + Soft Drink' },
  { name: 'Makhani Meal', price: 139, prepTime: '10-12 mins', photo: burgerMakhani, desc: '1 Makhani Burger + Medium Salted Fries + Soft Drink' },
  { name: 'Chipotle Meal', price: 139, prepTime: '10-12 mins', photo: burgerChipotle, desc: '1 Chipotle Burger + Medium Salted Fries + Soft Drink' },
  { name: 'Chilli Cheese Meal', price: 169, prepTime: '10-12 mins', photo: burgerChilliCheese, desc: '1 Chilli Cheese Burger + Medium Salted Fries + Soft Drink' },
  { name: 'Cheese & Veggie Meal', price: 209, prepTime: '10-12 mins', photo: burgerCheeseVeggie, desc: '1 Cheese & Veggie Burger + Medium Salted Fries + Soft Drink' },
  { name: 'Tex Mex Meal', price: 299, prepTime: '12-14 mins', photo: burgerTexMex, desc: '1 Tex Mex Burger + Medium Salted Fries + Soft Drink' },
]

export const VALUE_DEALS = [
  { name: 'House Value Meal', price: 99, prepTime: '10-12 mins', photo: burgerAlooTikki, desc: 'Aloo Tikki Burger + Medium Salted Fries + Soft Drink' },
  { name: '2 Buns Combo', price: 99, prepTime: '10-12 mins', photo: burgersTable, desc: '2 Burgers' },
  { name: 'Coffee Break', price: 99, prepTime: '6-8 mins', photo: bevClassicCoffee, desc: 'Classic Cold Coffee + Medium Salted Fries' },
]

export const SHAREABLES = [
  { name: 'Buns Duo', price: 219, prepTime: '14-16 mins', photo: burgersTable, desc: '2 Burgers + 2 Medium Fries + 2 Soft Drinks' },
  { name: 'Buns 4', price: 399, prepTime: '16-18 mins', photo: burgersTable, desc: '4 Burgers + 2 Large Fries + 4 Soft Drinks' },
  { name: 'Buns Party', price: 499, prepTime: '18-20 mins', photo: burgersTable, desc: '4 Burgers + 2 Large Peri Peri Fries + Loaded Nachos + 4 Soft Drinks' },
]

export const GLASS_BOTTLE_DRINKS = [
  { name: 'Coca-Cola (Glass Bottle)', price: 20, mrp: 60, photo: bevColaBottle, tint: 'red' },
  { name: 'Fanta (Glass Bottle)', price: 20, mrp: 60, photo: bevFantaGlass, tint: 'orange' },
  { name: 'Sprite (Glass Bottle)', price: 20, mrp: 60, photo: bevSpriteBottle, tint: 'green' },
]

export const CAN_DRINKS = [
  { name: 'Sprite Can', price: 50, mrp: 60, photo: bevSpriteCan, tint: 'green' },
  { name: 'Coca-Cola Can', price: 50, mrp: 60, photo: bevCokeCan, tint: 'red' },
  { name: 'Diet Coke Can', price: 50, mrp: 60, photo: bevDietCokeCan, tint: 'silver' },
]

// Real customer reviews from our Google Business listing (lightly proofread for spelling/grammar only — no claims added or changed).
export const TESTIMONIALS = [
  {
    name: 'Birju',
    location: 'Indore',
    title: 'Amazing Flavour',
    quote:
      "Amazing flavour — very unique taste, and the burger patty is juicy inside. I'd also recommend the cold coffee, very strong with a smooth taste.",
    rating: 5,
    avatar: '🧑‍🦱',
  },
  {
    name: 'Gauri Mantri',
    location: 'Indore',
    title: 'Worth A Visit',
    quote: 'Great food, cozy ambience, and lovely service. Definitely worth a visit.',
    rating: 5,
    avatar: '🙂',
  },
  {
    name: 'Sumit Bais',
    location: 'Indore',
    title: 'Best In Town',
    quote:
      "Hands down one of the best cafe spots in town! The burgers here are super fresh, juicy, and the buns are incredibly soft. Amazing vibe, fast service, and worth every rupee.",
    rating: 5,
    avatar: '🧑',
    featured: true,
  },
  {
    name: 'Moksha Nayak',
    location: 'Indore',
    title: 'Must Try!',
    quote: "Excellent food, and you must try the cold coffee — it's amazing.",
    rating: 5,
    avatar: '🧑‍🦳',
  },
  {
    name: 'Preet Nagar',
    location: 'Indore',
    title: 'Best Burgers In Indore',
    quote: 'Best burgers in Indore — fast service and good quality buns.',
    rating: 5,
    avatar: '😊',
  },
]

export const OUTLET_PHOTOS = [
  { src: outletCounter, alt: 'House of Buns order counter and seating' },
  { src: outletWall, alt: 'House of Buns retro wall art corner' },
  { src: outletBooth, alt: 'House of Buns booth seating' },
]

export const FLAGSHIP_HOURS = '11:00 AM – 11:00 PM · Daily'

export const FLAGSHIP_ADDRESS = 'G-3, HIG, Ravishankar Main Road, Near MIG Thana, Indore, Madhya Pradesh 452008'
export const FLAGSHIP_MAPS_SHARE_LINK = 'https://maps.app.goo.gl/wEfxpAN64wBpqwV58'
export const FLAGSHIP_MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('House of Buns, G-3, HIG, Ravishankar Main Road, Near MIG Thana, Indore, Madhya Pradesh 452008') +
  '&output=embed'

export const PROMO_CODES = [
  { code: 'WELCOME10', tag: 'New Customers', desc: 'Flat 10% off your first dine-in order.' },
  { code: 'COMBO50', tag: 'Combos', desc: '₹50 off any combo above ₹299.' },
  { code: 'FEASTUP', tag: 'Weekday Special', desc: 'Free Peri Peri Fries with every Feast Combo.' },
]

export const HYPE_PHOTOS = {
  nutrition: heroBurger,
  quality: burgersTable,
  flavours: burgerPatty,
}

export const STACK_STEPS = [
  {
    key: 'bun',
    step: '01',
    tab: 'The Bun',
    eyebrow: 'The Foundation',
    kicker: '100% Eggless Dough',
    titlePlain: 'The Golden Cloud',
    titleAccent: 'brioche',
    titleEnd: 'Foundation.',
    copy: 'Before any patty gets near the griddle, our dough proofs low and slow for a soft, pillowy bun that compresses gently and springs right back.',
    tags: ['Slow-Proofed Dough', '100% Eggless', 'Toasted to Order'],
    photo: burgersTable,
  },
  {
    key: 'patty',
    step: '02',
    tab: 'The Patty',
    eyebrow: 'The High-Heat Smash',
    kicker: '100% Pure Veg · Smashed Aloo Tikki',
    titlePlain: 'The Cheese Chilli',
    titleAccent: 'smashed',
    titleEnd: 'Aloo Tikki.',
    copy: 'Spiced potato patty, smashed paper-thin on a screaming hot griddle for a crispy, lacy edge, then loaded with molten cheese and green chilli relish.',
    tags: ['Smashed Thin', 'Lacy Crispy Edge', 'Molten Cheese Core'],
    photo: burgerPatty,
  },
  {
    key: 'feast',
    step: '03',
    tab: 'The Feast',
    eyebrow: 'The Ultimate Feast',
    kicker: 'Dine-In Combo · 100% Pure Veg',
    titlePlain: 'The Pure Veg',
    titleAccent: 'artisanal',
    titleEnd: 'Feast Combo.',
    copy: 'Your burger, paired with hot Peri Peri fries and a chilled Cold Coffee. Grab a token at the counter and your feast is ready before you finish scrolling the menu.',
    tags: ['Burger + Fries + Drink', 'Dine-In Token System', '100% Pure Veg'],
    photo: burgerVeg2,
  },
]
