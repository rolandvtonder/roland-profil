import { ArrowRightIcon } from '@phosphor-icons/react'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { previewCta, projects } from '../content'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative px-gutter pt-24 pb-28 md:pt-32 md:pb-36">
      <SectionHeading id="work-title" index="01" label="Selected Work" title="Recent work." subtitle="Sites that look sharp and work hard.">
        Client work and concept redesigns for businesses around South Africa, every one designed and built by me. Hover over a preview to scroll through the page, or click to explore the site.
      </SectionHeading>

      <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </ul>

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
