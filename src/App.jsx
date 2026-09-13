import TopBar from './components/TopBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import OpeningOffer from './components/OpeningOffer'
import FeelTheHype from './components/FeelTheHype'
import ArtisanalStack from './components/ArtisanalStack'
import FeaturedBurgers from './components/FeaturedBurgers'
import Sides from './components/Sides'
import Checkerboard from './components/Checkerboard'
import Drinks from './components/Drinks'
import Testimonials from './components/Testimonials'
import AppPromo from './components/AppPromo'
import Locations from './components/Locations'
import Footer from './components/Footer'
import ScrollBurgerProgress from './components/ScrollBurgerProgress'
import useScrollReveal from './hooks/useScrollReveal'
import { OrderProvider } from './context/OrderContext'
import './App.css'
import './components/order/order.css'
import './components/menuBook/menuBook.css'

function App() {
  useScrollReveal()

  return (
    <OrderProvider>
      <TopBar />
      <Nav />
      <Hero />
      <OpeningOffer />
      <FeelTheHype />
      <ArtisanalStack />
      <FeaturedBurgers />
      <Sides />
      <Checkerboard />
      <Drinks />
      <Testimonials />
      <AppPromo />
      <Locations />
      <Footer />
      <ScrollBurgerProgress />
    </OrderProvider>
  )
}

export default App
