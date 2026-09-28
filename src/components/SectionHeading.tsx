import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionHeadingProps = {
  id: string
  index: string
  label: string
  title: string
  subtitle: string
  children?: ReactNode
  /** `split` puts the intro beside the heading on large screens; `stack` puts it underneath. */
  layout?: 'split' | 'stack'
}

// Echoes the hero headline: a bright medium-weight line over a smaller, lighter one.
export default function SectionHeading({ id, index, label, title, subtitle, children, layout = 'split' }: SectionHeadingProps) {
  const split = layout === 'split'

  return (
    <div className={split ? 'grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16' : ''}>
      <Reveal>
        <p className="mb-6 flex items-center gap-3 text-sm">
          <span className="font-medium tabular-nums text-accent-soft">[{index}]</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span className="text-ink-muted">{label}</span>
        </p>
        <h2 id={id} className="font-display" style={{ letterSpacing: '-0.035em', textWrap: 'balance' }}>
          <span className="block text-ink" style={{ fontWeight: 800, fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)', lineHeight: 1.06 }}>
            {title}
          </span>
          <span className="block" style={{ fontWeight: 600, fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', lineHeight: 1.14, color: 'rgba(244,247,255,0.45)' }}>
            {subtitle}
          </span>
        </h2>
      </Reveal>
      {children && (
        <Reveal
          delay={0.1}
          className={`max-w-md text-[17px] leading-relaxed text-ink-muted ${split ? 'lg:justify-self-end lg:pb-2' : 'mt-7'}`}
        >
          <p>{children}</p>
        </Reveal>
      )}
    </div>
  )
}
