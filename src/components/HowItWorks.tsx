import { motion } from 'framer-motion'
import PillLink from './PillLink'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { previewCta, processSteps } from '../content'
import { easeOutSoft, revealViewport } from '../lib/motion'

export default function HowItWorks() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden px-gutter py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[1000px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.09), transparent)' }}
      />
      <div className="relative">
        <SectionHeading id="process-title" index="02" label="How it works" title="How it works." subtitle="From free preview to live website.">
          No big upfront payment and no guesswork. You see your new homepage first, then decide.
        </SectionHeading>

        <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {/* Connecting line behind the step numbers on large screens */}
          <div aria-hidden="true" className="absolute top-[52px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 lg:block" />
          {processSteps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.65, delay: 0.08 * i, ease: easeOutSoft }}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                i === 0 ? 'border-accent/45 bg-[linear-gradient(180deg,rgba(61,126,255,0.14),rgba(61,126,255,0.02))]' : 'border-line bg-surface/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-lg tabular-nums ${
                    i === 0 ? 'bg-accent-strong text-white shadow-[0_8px_24px_-8px_rgba(42,98,244,0.9)]' : 'border border-line-strong bg-page text-ink'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step.badge && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-soft ring-1 ring-accent/35">{step.badge}</span>
                )}
              </div>
              <h3 className="mt-6 font-display text-[1.4rem] leading-tight text-ink" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{step.text}</p>
            </motion.li>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <PillLink href={previewCta.href} variant="primary" size="lg">
            {previewCta.label}
          </PillLink>
          <p className="text-sm text-ink-subtle">No cost, no obligation. Just tell me about your business.</p>
        </Reveal>
      </div>
    </section>
  )
}
