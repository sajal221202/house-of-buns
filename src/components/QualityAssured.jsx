const PILLARS = [
  {
    icon: '🌿',
    title: 'Finest Ingredients',
    copy: 'Made from the finest quality ingredients, for a fresh, real taste in every single bite.',
  },
  {
    icon: '🥯',
    title: 'Fresh Baked Buns',
    copy: 'Our buns are baked fresh, so what reaches your plate is always soft, warm, and never stale.',
  },
  {
    icon: '✅',
    title: 'Safety & Hygiene',
    copy: 'Our kitchen follows strict hygiene and food-safety standards for a clean dining experience.',
  },
]

export default function QualityAssured() {
  return (
    <section className="quality">
      <div className="wrap">
        <div className="quality-card" data-reveal>
          <h2 className="display quality-title">Quality Assured</h2>
          <div className="quality-inner">
            {PILLARS.map((p) => (
              <div className="quality-pillar" key={p.title}>
                <span className="quality-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
