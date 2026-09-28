import { useId } from 'react'

type LogoMarkProps = {
  /** `glyph`: white R with an electric-blue leg, for dark backgrounds. `tile`: app-icon style badge. */
  variant?: 'glyph' | 'tile'
  size?: number
  className?: string
}

// A geometric "R": stem + half-round bowl, with a detached leg that kicks forward.
const bowl = 'M11 23.5V8.5h5.25a4.5 4.5 0 0 1 0 9H11'
const leg = 'M18.6 20.2 22.4 24.6'

export default function LogoMark({ variant = 'glyph', size = 26, className }: LogoMarkProps) {
  const gradientId = useId()

  if (variant === 'tile') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
        <defs>
          <linearGradient id={gradientId} x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6FA2FF" />
            <stop offset="1" stopColor="#2457E6" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
        <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" stroke="#fff" strokeOpacity="0.22" />
        <g transform="translate(-0.7 -0.55)" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d={leg} />
          <path d={bowl} />
        </g>
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="6.2 6 21 21" fill="none" aria-hidden="true" className={className}>
      <path d={leg} stroke="#5B95FF" strokeWidth="3" strokeLinecap="round" />
      <path d={bowl} stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
