import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@phosphor-icons/react'
import PillLink from './PillLink'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { previewCta, services } from '../content'
import { industryPages } from '../pages'
import { easeOutSoft, revealViewport } from '../lib/motion'

/** `heading={false}` hides the section heading, for pages that supply their own. */
export default function Services({ heading = true }: { heading?: boolean } = {}) {
  return (
    <section id="services" aria-labelledby={heading ? 'services-title' : undefined} className="relative overflow-hidden px-gutter py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -left-60 h-[720px] w-[720px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.10), transparent)' }}
      />
      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          {heading && (
            <SectionHeading layout="stack" id="services-title" index="03" label="Services" title="What I do." subtitle="Design, build and launch, all handled.">
              From a single landing page to a full online store, a mobile app or software built to order, I take care of design, build and launch, so you can get back to running your business.
            </SectionHeading>
          )}
          <Reveal delay={0.15} className="mt-10">
            <PillLink href={previewCta.href}>{previewCta.label}</PillLink>
          </Reveal>
        </div>

        <ul className="border-b border-line">
          {services.map(({ icon: Icon, title, description, tags, slug }, i) => (
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
                    {slug ? (
                      <a href={`/services/${slug}/`} className="text-ink no-underline transition-colors hover:text-accent-soft">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
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
                {slug && (
                  <a
                    href={`/services/${slug}/`}
                    className="group/more mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent-soft no-underline transition-colors hover:text-accent-bright"
                  >
                    More on {title}
                    <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/more:translate-x-0.5" />
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Industry pages: the homepage stays general, these do the narrow targeting */}
      <Reveal className="relative mt-20 border-t border-line pt-10">
        <p className="text-[12.5px] tracking-[0.1em] text-ink-subtle uppercase">Who I build for</p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {industryPages.map((industry) => (
            <li key={industry.slug}>
              <a
                href={`/industries/${industry.slug}/`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[14.5px] text-ink-muted no-underline transition-colors duration-200 hover:border-accent/40 hover:text-ink"
              >
                {industry.headingAccent.replace(/\.$/, '')}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
