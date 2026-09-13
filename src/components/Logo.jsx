import logoMark from '../assets/logo-mark.jpg'

export default function Logo({ inverted = false }) {
  return (
    <a href="#top" className={`logo ${inverted ? 'logo-inverted' : ''}`}>
      <img src={logoMark} alt="House of Buns" className="logo-mark" />
      <span className="logo-word">HOUSE OF BUNS</span>
    </a>
  )
}
