export default function InfoModal({ title, paragraphs, faq, onClose }) {
  return (
    <div className="order-modal-backdrop" role="dialog" aria-modal="true">
      <div className="order-modal">
        <button className="order-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="display order-step-title">{title}</h2>

        {paragraphs && (
          <div className="info-paragraphs">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {faq && (
          <div className="info-faq">
            {faq.map((item) => (
              <div className="info-faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
