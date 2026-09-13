const STAGES = {
  bottomBun: 0.02,
  lettuce: 0.2,
  cheese: 0.38,
  patty: 0.56,
  topBun: 0.74,
  seeds: 0.9,
}

function layerStyle(progress, threshold) {
  if (progress === null) return undefined
  const built = progress >= threshold
  return {
    opacity: built ? 1 : 0,
    transform: built ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  }
}

export default function BurgerIllustration({ className, progress = null }) {
  return (
    <svg
      viewBox="0 0 320 260"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* bottom bun */}
      <g style={layerStyle(progress, STAGES.bottomBun)}>
        <path
          d="M30 210 Q30 235 60 235 H260 Q290 235 290 210 V200 H30 Z"
          fill="#e0a458"
        />
        <rect x="30" y="195" width="260" height="16" rx="8" fill="#d69644" />
      </g>

      {/* lettuce + tomato */}
      <g style={layerStyle(progress, STAGES.lettuce)}>
        <path
          d="M22 196 Q40 178 60 196 Q80 176 102 196 Q124 176 146 196 Q168 176 190 196 Q212 176 234 196 Q256 176 278 196 Q292 200 296 196 V204 H22 Z"
          fill="#7fb562"
        />
        <circle cx="66" cy="184" r="15" fill="#e2503b" />
        <circle cx="66" cy="184" r="8" fill="#f2795f" />
        <circle cx="248" cy="182" r="14" fill="#e2503b" />
        <circle cx="248" cy="182" r="7" fill="#f2795f" />
      </g>

      {/* cheese */}
      <g style={layerStyle(progress, STAGES.cheese)}>
        <path
          d="M18 176 L302 176 L292 150 Q270 168 250 150 Q230 168 210 150 Q190 168 170 150 Q150 168 130 150 Q110 168 90 150 Q70 168 50 150 Q30 168 18 150 Z"
          fill="#f4c542"
        />
      </g>

      {/* patty */}
      <g style={layerStyle(progress, STAGES.patty)}>
        <path
          d="M34 150 Q34 128 70 126 H250 Q286 128 286 150 Q286 164 260 166 H60 Q34 164 34 150 Z"
          fill="#7a4a30"
        />
      </g>

      {/* top bun */}
      <g style={layerStyle(progress, STAGES.topBun)}>
        <path d="M28 128 Q28 20 160 14 Q292 20 292 128 Z" fill="#e8ac5f" />
        <path
          d="M28 128 Q28 118 34 112 Q60 128 160 128 Q260 128 286 112 Q292 118 292 128 Z"
          fill="#d69644"
        />
      </g>

      {/* sesame seeds */}
      <g style={layerStyle(progress, STAGES.seeds)}>
        <ellipse cx="110" cy="52" rx="5" ry="8" fill="#fdf3df" transform="rotate(-18 110 52)" />
        <ellipse cx="150" cy="34" rx="5" ry="8" fill="#fdf3df" transform="rotate(6 150 34)" />
        <ellipse cx="190" cy="50" rx="5" ry="8" fill="#fdf3df" transform="rotate(20 190 50)" />
        <ellipse cx="130" cy="76" rx="5" ry="8" fill="#fdf3df" transform="rotate(-8 130 76)" />
        <ellipse cx="175" cy="80" rx="5" ry="8" fill="#fdf3df" transform="rotate(12 175 80)" />
        <ellipse cx="222" cy="72" rx="5" ry="8" fill="#fdf3df" transform="rotate(-14 222 72)" />
        <ellipse cx="85" cy="88" rx="5" ry="8" fill="#fdf3df" transform="rotate(24 85 88)" />
      </g>
    </svg>
  )
}
