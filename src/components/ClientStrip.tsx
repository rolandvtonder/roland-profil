import { ArrowUpRightIcon } from '@phosphor-icons/react'
import Reveal from './Reveal'
import { projects } from '../content'

const clients = projects.filter((p) => p.status === 'client')

/**
 * Named clients under the hero. Every portfolio guide puts social proof near
 * the top; until there are testimonials to quote, the honest version of that
 * is the businesses that actually paid, each linking to its case study.
 */
export default function ClientStrip() {
  if (clients.length === 0) return null

  return (
    <section aria-label="Recent clients" className="relative border-y border-line px-gutter py-8">
      <Reveal y={14} className="flex flex-col items-center gap-x-10 gap-y-5 sm:flex-row sm:justify-center">
        <p className="text-[12.5px] tracking-[0.1em] whitespace-nowrap text-ink-subtle uppercase">Trusted by</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {clients.map((project) => (
            <li key={project.title}>
              <a
                href={project.caseStudy ? `/work/${project.caseStudy}/` : project.url}
                className="group/client inline-flex items-center gap-1.5 font-display text-[1.05rem] text-ink-muted no-underline transition-colors duration-200 hover:text-ink sm:text-[1.15rem]"
                style={{ fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                {project.title}
                <ArrowUpRightIcon
                  size={13}
                  aria-hidden="true"
                  className="text-ink-subtle transition-[transform,color] duration-200 group-hover/client:translate-x-0.5 group-hover/client:-translate-y-0.5 group-hover/client:text-accent-soft"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
