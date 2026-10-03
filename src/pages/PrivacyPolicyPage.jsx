import logoBadge from '../assets/logo-badge-green.png'
import { PRIVACY_POLICY } from '../data/policies'

export default function PrivacyPolicyPage() {
  return (
    <div className="policy-page">
      <div className="policy-page-inner">
        <img src={logoBadge} alt="House of Buns" className="policy-page-logo" />
        <h1 className="display policy-page-title">Privacy Policy</h1>
        <p className="policy-page-updated">House of Buns · Indore</p>
        {PRIVACY_POLICY.map((para, i) => (
          <p className="policy-page-para" key={i}>
            {para}
          </p>
        ))}
        <a className="policy-page-back" href="/">
          ← Back to House of Buns
        </a>
      </div>
    </div>
  )
}
