// 7-day trend as an SVG column chart with a smooth area line on top.
export default function TrendChart({ data, valueKey = 'value', labelKey = 'label', formatValue = (v) => v }) {
  const width = 100
  const height = 40
  const max = Math.max(1, ...data.map((d) => d[valueKey]))
  const stepX = width / Math.max(1, data.length - 1)

  const points = data.map((d, i) => {
    const x = data.length === 1 ? width / 2 : i * stepX
    const y = height - (d[valueKey] / max) * height
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${height} L ${points[0]?.x || 0} ${height} Z`

  return (
    <div className="admin-trendchart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="admin-trendchart-svg">
        <path d={areaPath} className="admin-trendchart-area" />
        <path d={linePath} className="admin-trendchart-line" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.4" className="admin-trendchart-dot" />
        ))}
      </svg>
      <div className="admin-trendchart-labels">
        {data.map((d, i) => (
          <div className="admin-trendchart-label-col" key={d[labelKey] + i}>
            <span className="admin-trendchart-label">{d[labelKey]}</span>
            <span className="admin-trendchart-value">{formatValue(d[valueKey])}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
