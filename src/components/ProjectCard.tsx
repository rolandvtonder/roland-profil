import { asset } from '../lib/asset'
import { motion } from 'framer-motion'
import { ArrowUpRightIcon, LockSimpleIcon, QuotesIcon, SealCheckIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Project } from '../content'
import { easeOutSoft, revealViewport } from '../lib/motion'

/** "rolandvtonder.github.io/FlexiTours-demo-web" style address for the browser bar */
function displayAddress(url: string) {
  try {
    const { hostname, pathname } = new URL(url)
    return (hostname + pathname).replace(/^www\./, '').replace(/\/(index\.html)?$/, '')
  } catch {
    return url
  }
}

function StatusBadge({ status }: { status: Project['status'] }) {
  if (status === 'client') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-soft ring-1 ring-accent/35">
        <SealCheckIcon size={13} weight="fill" aria-hidden="true" />
        Client project
      </span>
    )
  }
  return <span className="rounded-full px-2.5 py-0.5 text-xs text-ink-muted ring-1 ring-line-strong">Concept</span>
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, category, status, description, highlights, url, image, testimonial, featured } = project
  // Longer pages scroll for longer so every preview moves at a similar pace
  const [scrollSeconds, setScrollSeconds] = useState(7)

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.75, delay: featured ? 0 : (index % 2) * 0.1, ease: easeOutSoft }}
      className={`group relative ${featured ? 'md:col-span-2' : ''}`}
    >
      <article
        className={`rounded-3xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-accent-bright ${
          featured ? 'lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center lg:gap-14' : ''
        }`}
      >
        {/* Browser frame with a full-page screenshot that scrolls on hover */}
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-300 group-hover:border-line-strong group-hover:shadow-[0_40px_80px_-30px_rgba(61,126,255,0.35)]">
          <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-4 py-2.5">
            <div className="flex w-12 shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-xs text-ink-subtle">
              <LockSimpleIcon size={11} className="shrink-0" />
              <span className="truncate">{displayAddress(url)}</span>
            </div>
            <div className="w-12 shrink-0" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-page [container-type:size]">
            <img
              src={asset(image)}
              alt={`${title} website homepage`}
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget
                const travel = naturalHeight / naturalWidth - 10 / 16
                setScrollSeconds(Math.min(11, Math.max(3, travel * 2)))
              }}
              style={{ '--scroll-duration': `${scrollSeconds}s` } as CSSProperties}
              className="absolute inset-x-0 top-0 block h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.45,0,0.55,1)] motion-safe:group-focus-within:translate-y-[calc(-100%_+_100cqh)] motion-safe:group-focus-within:duration-(--scroll-duration) motion-safe:group-hover:translate-y-[calc(-100%_+_100cqh)] motion-safe:group-hover:duration-(--scroll-duration)"
            />
          </div>
        </div>

        <div className={`mt-6 px-1 ${featured ? 'lg:mt-0' : ''}`}>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <StatusBadge status={status} />
                <p className="text-sm text-accent-soft">{category}</p>
              </div>
              <h3
                className={`mt-2 font-display leading-tight text-ink ${featured ? 'text-[1.9rem] lg:text-[2.4rem]' : 'text-[1.6rem]'}`}
                style={{ fontWeight: 600, letterSpacing: '-0.015em' }}
              >
                {/* The link's overlay makes the whole card clickable with a single tab stop */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none"
                >
                  {title}
                  <span className="sr-only"> (opens the site in a new tab)</span>
                </a>
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:bg-accent/10 group-hover:text-ink"
            >
              <ArrowUpRightIcon size={17} />
            </span>
          </div>
          <p className={`mt-3 max-w-[58ch] leading-relaxed text-ink-muted ${featured ? 'text-base lg:text-[17px]' : 'text-[15px]'}`}>
            {description}
          </p>
          <ul aria-label="Highlights" className="mt-4 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted">
                {highlight}
              </li>
            ))}
          </ul>
          {testimonial && (
            <figure className="mt-6 rounded-2xl border border-line bg-white/[0.02] p-5">
              <QuotesIcon size={22} weight="fill" aria-hidden="true" className="text-accent-soft" />
              <blockquote className="mt-2 text-[15px] leading-relaxed text-ink">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-ink-muted">
                {testimonial.name}, {testimonial.role}
              </figcaption>
            </figure>
          )}
        </div>
      </article>
    </motion.li>
  )
}
