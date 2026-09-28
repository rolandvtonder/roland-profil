import { motion } from 'framer-motion'
import PillLink from './PillLink'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { previewCta, services } from '../content'
import { easeOutSoft, revealViewport } from '../lib/motion'

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden px-gutter py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -left-60 h-[720px] w-[720px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.10), transparent)' }}
      />
      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading layout="stack" id="services-title" index="03" label="Services" title="What I do." subtitle="Everything your site needs, handled.">
            From a single landing page to a full online store, I take care of design, build and launch, so you can get back to running your business.
          </SectionHeading>
          <Reveal delay={0.15} className="mt-10">
            <PillLink href={previewCta.href}>{previewCta.label}</PillLink>
          </Reveal>
        </div>

        <ul className="border-b border-line">
          {services.map(({ icon: Icon, title, description, tags }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.6, delay: 0.04 * i, ease: easeOutSoft }}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-line py-8 sm:gap-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent-soft">
                <Icon size={24} weight="light" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.55rem] leading-tight text-ink" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {title}
                  </h3>
                  <span aria-hidden="true" className="text-sm tabular-nums text-ink-subtle">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ink-muted">{description}</p>
                <ul aria-label={`${title} includes`} className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
