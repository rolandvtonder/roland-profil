import { ArrowRightIcon } from '@phosphor-icons/react'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { previewCta, projects } from '../content'

type WorkProps = {
  /** 'preview' is the homepage cut: paying clients only, with a link to the full list. */
  variant?: 'preview' | 'full'
  /** The /work/ page has its own hero, so it turns the section heading off. */
  heading?: boolean
}

const clients = projects.filter((p) => p.status === 'client')
const concepts = projects.filter((p) => p.status === 'concept')

function Grid({ items, offset = 0 }: { items: typeof projects; offset?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
      {items.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i + offset} />
      ))}
    </ul>
  )
}

function GroupHeading({ index, title, children }: { index: string; title: string; children: string }) {
  return (
    <Reveal className="mb-12">
      <p className="mb-5 flex items-center gap-3 text-sm">
        <span className="font-medium tabular-nums text-accent-soft">[{index}]</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      </p>
      <h2 className="font-display text-[1.9rem] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[2.3rem]">{title}</h2>
      <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-muted">{children}</p>
    </Reveal>
  )
}

export default function Work({ variant = 'preview', heading = true }: WorkProps) {
  const preview = variant === 'preview'

  return (
    <section id="work" aria-labelledby={heading ? 'work-title' : undefined} className="relative px-gutter pt-24 pb-28 md:pt-32 md:pb-36">
      {heading && (
        <SectionHeading id="work-title" index="01" label="Selected Work" title="Recent work." subtitle="Sites that look sharp and work hard.">
          Live sites I designed and built for paying clients. Hover a preview to scroll through the page, or open the case study behind it.
        </SectionHeading>
      )}

      {preview ? (
        <>
          <div className={heading ? 'mt-16 lg:mt-20' : ''}>
            <Grid items={clients} />
          </div>
          <Reveal className="mt-16 flex justify-center">
            <a
              href="/work/"
              className="group/all inline-flex items-center gap-2 rounded-[12px] border border-line-strong px-6 py-3.5 text-[15px] font-medium text-ink no-underline transition-colors duration-200 hover:border-accent/40"
            >
              See all {projects.length} projects
              <ArrowRightIcon size={16} aria-hidden="true" className="text-accent-soft transition-transform duration-200 group-hover/all:translate-x-1" />
            </a>
          </Reveal>
        </>
      ) : (
        // Paid work first and clearly separated, so the speculative redesigns
        // read as range rather than padding the list out.
        <>
          <GroupHeading index="01" title="Client work">
            Paying clients, live on their own domains. Hover a preview to scroll through the whole page, or open the case study behind it.
          </GroupHeading>
          <Grid items={clients} />

          <div className="mt-28 border-t border-line pt-20 md:mt-32">
            <GroupHeading index="02" title="Concepts">
              Redesigns I designed and built unprompted, to show businesses what their site could be. Nobody commissioned these — they are my work and my decisions, and the case studies say so.
            </GroupHeading>
            <Grid items={concepts} offset={clients.length} />
          </div>
        </>
      )}

      <Reveal className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        <p className="text-[17px] text-ink-muted">Want to see what your business could look like? The first design is on me.</p>
        <a href={previewCta.href} className="group/link inline-flex shrink-0 items-center gap-2 py-2 text-[15px] text-ink no-underline">
          {previewCta.label}
          <ArrowRightIcon size={16} aria-hidden="true" className="text-accent-soft transition-transform duration-200 group-hover/link:translate-x-1" />
        </a>
      </Reveal>
    </section>
  )
}
