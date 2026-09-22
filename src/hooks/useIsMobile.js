import { useEffect, useState } from 'react'

export default function useIsMobile(breakpoint = 800) {
  const query = `(max-width: ${breakpoint}px)`
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return isMobile
}
