// Simple vertical bar chart, no chart library needed — just SVG.
export default function BarChart({ data, valueKey = 'value', labelKey = 'label', formatValue = (v) => v }) {
  const max = Math.max(1, ...data.map((d) => d[valueKey]))

  return (
    <div className="admin-barchart">
      {data.map((d, i) => {
        const pct = Math.round((d[valueKey] / max) * 100)
        return (
          <div className="admin-barchart-row" key={d[labelKey] + i}>
            <span className="admin-barchart-label">{d[labelKey]}</span>
            <div className="admin-barchart-track">
              <div className="admin-barchart-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="admin-barchart-value">{formatValue(d[valueKey])}</span>
          </div>
        )
      })}
    </div>
  )
}
