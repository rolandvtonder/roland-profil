import { motion } from 'framer-motion'
import { ArrowRightIcon, CheckIcon, ShieldCheckIcon } from '@phosphor-icons/react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { carePlan, packages, pricingNote } from '../content'
import { easeOutSoft, revealViewport } from '../lib/motion'

/** R7 500 rather than R7,500 — the local convention. */
const rand = (n: number) => `R${n.toLocaleString('en-ZA').replace(/,/g, ' ')}`

/** `heading={false}` hides the section heading, for the page that supplies its own. */
export default function Pricing({ heading = true }: { heading?: boolean } = {}) {
  return (
    <section id="pricing" aria-labelledby={heading ? 'pricing-title' : undefined} className="relative overflow-hidden px-gutter py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[700px] w-[1000px] -translate-x-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.10), transparent)' }}
      />
      <div className="relative">
        {heading && (
          <SectionHeading id="pricing-title" index="04" label="Pricing" title="What it costs." subtitle="Published, not hidden behind a form.">
            Every package starts with a free homepage design, so you see your new site before you pay anything.
          </SectionHeading>
        )}

        <ul className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${heading ? 'mt-16 lg:mt-20' : ''}`}>
          {packages.map((pkg, i) => (
            <motion.li
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.6, delay: 0.06 * i, ease: easeOutSoft }}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                pkg.popular ? 'border-accent/45 bg-accent/[0.06]' : 'border-line bg-surface/50'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent-strong px-3 py-1 text-[11.5px] font-medium tracking-[0.04em] text-white uppercase">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-[1.35rem] text-ink" style={{ fontWeight: 600 }}>
                {pkg.name}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{pkg.tagline}</p>

              <p className="mt-6 flex items-baseline gap-1.5">
                {pkg.price === null ? (
                  <span className="font-display text-[1.75rem] text-ink" style={{ fontWeight: 700 }}>
                    Personal quote
                  </span>
                ) : (
                  <>
                    <span className="text-[13px] text-ink-subtle">from</span>
                    <span className="font-display text-[2.1rem] leading-none tracking-[-0.02em] text-ink" style={{ fontWeight: 700 }}>
                      {rand(pkg.price)}
                    </span>
                  </>
                )}
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                    <CheckIcon size={15} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-soft" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={pkg.cta.href}
                className={`group/pkg mt-8 inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-[14.5px] font-medium no-underline transition-all duration-200 ${
                  pkg.popular
                    ? 'bg-accent-strong text-white shadow-[0_12px_32px_-12px_rgba(42,98,244,0.9)] hover:bg-accent-hover'
                    : 'border border-line-strong text-ink hover:border-accent/40'
                }`}
              >
                {pkg.cta.label}
                <ArrowRightIcon size={15} aria-hidden="true" className="transition-transform duration-200 group-hover/pkg:translate-x-0.5" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Care plan: the recurring half of the offer */}
        <Reveal className="mt-10 grid gap-8 rounded-3xl border border-line bg-surface/40 px-7 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-center lg:gap-14">
          <div>
            <h3 className="flex items-center gap-2.5 font-display text-[1.3rem] text-ink" style={{ fontWeight: 600 }}>
              <ShieldCheckIcon size={20} weight="light" aria-hidden="true" className="text-accent-soft" />
              {carePlan.name}
            </h3>
            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[13px] text-ink-subtle">from</span>
              <span className="font-display text-[1.9rem] leading-none tracking-[-0.02em] text-ink" style={{ fontWeight: 700 }}>
                {rand(carePlan.price)}
              </span>
              <span className="text-[14px] text-ink-subtle">/month</span>
            </p>
            <p className="mt-3 text-[14.5px] text-ink-muted">{carePlan.tagline}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {carePlan.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                <CheckIcon size={15} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-soft" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-[70ch] text-center text-[15px] leading-relaxed text-ink-muted">
          {pricingNote}
        </Reveal>
      </div>
    </section>
  )
}
