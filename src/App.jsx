import { lazy, Suspense } from 'react'
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
import useScrollReveal from './hooks/useScrollReveal'
import { OrderProvider } from './context/OrderContext'
import './App.css'
import './components/order/order.css'
import './components/menuBook/menuBook.css'

// Recharts (used only by the admin dashboard) is heavy — lazy-load the whole
// admin bundle so public-site visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp'))

const isAdminPage =
  typeof window !== 'undefined' &&
  (window.location.hostname.startsWith('admin.') ||
    ['/admin', '/counter'].includes(window.location.pathname.replace(/\/+$/, '')))

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
  return <OrderProvider>{isAdminPage ? <AdminApp /> : <MainSite />}</OrderProvider>
}

export default App
