import useScrollProgress from '../hooks/useScrollProgress'
import BurgerIllustration from './BurgerIllustration'

export default function ScrollBurgerProgress() {
  const progress = useScrollProgress()
  const isDone = progress > 0.97

  return (
    <div className={`burger-progress ${progress > 0.01 ? 'is-active' : ''}`}>
      <div
        className="burger-progress-ring"
        style={{
          background: `conic-gradient(var(--green) ${progress * 360}deg, rgba(20, 32, 26, 0.12) 0deg)`,
        }}
      >
        <div className="burger-progress-inner">
          <BurgerIllustration className="burger-progress-svg" progress={progress} />
        </div>
      </div>
      <span className="burger-progress-label">{isDone ? 'Done!' : `${Math.round(progress * 100)}%`}</span>
    </div>
  )
}
