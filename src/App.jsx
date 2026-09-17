import Nav from './components/Nav'
import Hero from './components/Hero'
import FeelTheHype from './components/FeelTheHype'
import ArtisanalStack from './components/ArtisanalStack'
import FeaturedBurgers from './components/FeaturedBurgers'
import Sides from './components/Sides'
import Checkerboard from './components/Checkerboard'
import Drinks from './components/Drinks'
import Testimonials from './components/Testimonials'
import QualityAssured from './components/QualityAssured'
import Locations from './components/Locations'
import Footer from './components/Footer'
import ScrollBurgerProgress from './components/ScrollBurgerProgress'
import CounterBoardPage from './components/counter/CounterBoardPage'
import useScrollReveal from './hooks/useScrollReveal'
import { OrderProvider } from './context/OrderContext'
import './App.css'
import './components/order/order.css'
import './components/menuBook/menuBook.css'
import './components/counter/counter.css'

const isCounterPage = typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/counter'

function MainSite() {
  useScrollReveal()

  return (
    <>
      <Nav />
      <Hero />
      <FeelTheHype />
      <FeaturedBurgers />
      <Sides />
      <Drinks />
      <Checkerboard />
      <ArtisanalStack />
      <Testimonials />
      <QualityAssured />
      <Locations />
      <Footer />
      <ScrollBurgerProgress />
    </>
  )
}

function App() {
  return <OrderProvider>{isCounterPage ? <CounterBoardPage /> : <MainSite />}</OrderProvider>
}

export default App
