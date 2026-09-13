import burgerPatty from '../assets/photos/burger-patty.jpg'
import burgerVeg2 from '../assets/photos/burger-veg-2.jpg'
import burgersTable from '../assets/photos/burgers-table.jpg'
import sideCheeseCoins from '../assets/photos/side-cheese-coins.jpg'
import sideHerbSticks from '../assets/photos/side-herb-sticks.jpg'
import sideNachos from '../assets/photos/side-nachos.jpg'
import sideGarlicBread from '../assets/photos/side-garlic-bread.jpg'
import sideSaltedFries from '../assets/photos/side-salted-fries.jpg'
import sidePeriFries from '../assets/photos/side-peri-fries.jpg'
import sideCheesyFries from '../assets/photos/side-cheesy-fries.jpg'
import drinkCoffee from '../assets/photos/drink-coffee.jpg'
import drinkMint from '../assets/photos/drink-mint.jpg'
import drinkCola from '../assets/photos/drink-cola.jpg'
import restaurantInterior from '../assets/photos/restaurant-interior.jpg'
import heroBurger from '../assets/photos/hero-burger.png'

export const CURRENCY = '₹'

export function discountPercent(item) {
  if (!item.mrp || item.mrp <= item.price) return 0
  return Math.round(((item.mrp - item.price) / item.mrp) * 100)
}

export const FEATURED_BURGERS = [
  { name: 'Aloo Tikki', price: 99, mrp: 119, prepTime: '8-10 mins', photo: burgerPatty },
  { name: 'Cheese Chilli Aloo Tikki', price: 119, mrp: 139, prepTime: '10-12 mins', photo: burgerVeg2 },
  { name: 'Cheese N Veggies', price: 119, mrp: 139, prepTime: '10-12 mins', photo: burgersTable },
  { name: 'Chipotle Aloo Tikki', price: 109, mrp: 129, prepTime: '10-12 mins', photo: burgerVeg2 },
  { name: 'Tandoori Aloo Tikki', price: 109, mrp: 129, prepTime: '10-12 mins', photo: burgersTable },
  { name: 'Tex Mex', price: 129, mrp: 149, prepTime: '12-14 mins', photo: burgerPatty },
]

export const SIDES = [
  { name: 'Cheese Coins', price: 129, mrp: 155, prepTime: '8-10 mins', photo: sideCheeseCoins },
  { name: 'Herb Sticks', price: 129, mrp: 155, prepTime: '8-10 mins', photo: sideHerbSticks },
  { name: 'Loaded Nachos', price: 149, mrp: 179, prepTime: '10-12 mins', photo: sideNachos },
  { name: 'Garlic Bread Toasties', price: 129, mrp: 155, prepTime: '8-10 mins', photo: sideGarlicBread },
  { name: 'Salted Fries', price: 99, mrp: 119, prepTime: '6-8 mins', photo: sideSaltedFries },
  { name: 'Peri Peri Fries', price: 109, mrp: 129, prepTime: '6-8 mins', photo: sidePeriFries },
  { name: 'Cheesy Fries', price: 129, mrp: 149, prepTime: '8-10 mins', photo: sideCheesyFries },
]

export const DRINKS = [
  { name: 'Cold Coffee', price: 129, mrp: 149, prepTime: '4-5 mins', photo: drinkCoffee },
  { name: 'Iced Tea', price: 99, mrp: 119, prepTime: '3-4 mins', photo: drinkMint },
  { name: 'Colddrinks', price: 69, mrp: 79, prepTime: '2 mins', photo: drinkCola },
]

export const TESTIMONIALS = [
  { name: 'Darrell Steward', location: 'Downtown', title: 'Very Good!', quote: 'House of Buns is real, their fillings, hours in line, delicious.', rating: 4, avatar: '👩‍🦰' },
  { name: 'Jason Turner', location: 'Uptown', title: 'Worth The Wait', quote: 'The hype is real! It was worth the line, and totally worth it!', rating: 5, avatar: '👨' },
  { name: 'Michael Yonke', location: 'Downtown', title: 'Amazing', quote: 'That Tex Mex tikki almost gave me a triple bypass... it was so yummy, totally worth it!', rating: 5, avatar: '🧔', featured: true },
  { name: 'Adam Mura', location: 'Uptown', title: 'Turning Point', quote: 'This place is my inspiration for menu designs.', rating: 4, avatar: '👨‍🦱' },
  { name: 'Christy Nae', location: 'Downtown', title: 'Great Service', quote: 'Customer service is very experienced and satisfactory.', rating: 4, avatar: '👩' },
]

export const LOCATIONS = [
  { label: 'Downtown', zone: 'City Center Counter', photo: restaurantInterior },
  { label: 'Uptown', zone: 'Northside Counter', photo: burgersTable },
]

export const FLAGSHIP_HOURS = '11:00 AM – 11:00 PM · Daily'

export const FLAGSHIP_ADDRESS = 'G-3, HIG, Ravishankar Main Road, Near MIG Thana, Indore, Madhya Pradesh 452008'
export const FLAGSHIP_MAPS_SHARE_LINK = 'https://maps.app.goo.gl/wEfxpAN64wBpqwV58'
export const FLAGSHIP_MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('House of Buns, G-3, HIG, Ravishankar Main Road, Near MIG Thana, Indore, Madhya Pradesh 452008') +
  '&output=embed'

export const HYPE_PHOTOS = {
  nutrition: heroBurger,
  quality: burgersTable,
  flavours: burgerPatty,
}

export const APP_PHOTO = burgerVeg2

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
