import PageShell from '../components/PageShell'
import SubPageHero from '../components/SubPageHero'
import CtaBand from '../components/CtaBand'
import Work from '../components/Work'
import HowItWorks from '../components/HowItWorks'
import Services from '../components/Services'
import About from '../components/About'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import { sectionPages } from '../pages'

/**
 * Renders one of the homepage's sections as a page of its own. The section
 * component supplies the body with its heading turned off, because the hero
 * here already provides the page's h1.
 */
export default function SectionPageView({ slug }: { slug: string }) {
  const page = sectionPages.find((p) => p.slug === slug)
  if (!page) throw new Error(`No section page for slug "${slug}"`)

  const body = {
    work: <Work variant="full" heading={false} />,
    'how-it-works': <HowItWorks heading={false} />,
    services: <Services heading={false} />,
    about: <About heading={false} />,
    faq: <Faq variant="full" heading={false} />,
    contact: <Contact heading={false} />,
  }[slug]

  // The contact page ends on its own form, so a second call to action
  // underneath would just be asking twice.
  const showCta = slug !== 'contact'

  return (
    <PageShell>
      <SubPageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: page.eyebrow }]}
        eyebrow={page.eyebrow}
        heading={page.heading}
        headingAccent={page.headingAccent}
        intro={page.intro}
        secondaryCta={slug === 'work' ? undefined : { label: 'See my recent work', href: '/work/' }}
      />
      {body}
      {showCta && (
        <CtaBand
          title="See it before you pay a cent."
          text="Tell me about your business and I'll design your new homepage for free. If you love it, we build the rest together."
        />
      )}
    </PageShell>
  )
}
