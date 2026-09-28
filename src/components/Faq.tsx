import { motion } from 'framer-motion'
import { PlusIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import PillLink from './PillLink'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { faqs, whatsappUrl } from '../content'
import { easeOutSoft, revealViewport } from '../lib/motion'

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative px-gutter py-28 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading layout="stack" id="faq-title" index="05" label="FAQ" title="Questions?" subtitle="Here are the answers.">
            The things business owners ask me most. Can’t find yours? Send me a WhatsApp and I’ll get back to you.
          </SectionHeading>
          <Reveal delay={0.15} className="mt-10">
            <PillLink href={whatsappUrl} external>
              <WhatsappLogoIcon size={18} aria-hidden="true" />
              Ask me on WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </PillLink>
          </Reveal>
        </div>

        <ul className="border-b border-line">
          {faqs.map(({ question, answer }, i) => (
            <motion.li
              key={question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.55, delay: 0.04 * i, ease: easeOutSoft }}
              className="border-t border-line"
            >
              {/* Native <details> keeps the accordion keyboard- and screen-reader-friendly */}
              <details className="faq group/faq">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[1.25rem] leading-snug text-ink sm:text-[1.35rem]" style={{ fontWeight: 600 }}>
                    {question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-[transform,background-color,color] duration-300 group-open/faq:rotate-45 group-open/faq:border-accent/50 group-open/faq:bg-accent/10 group-open/faq:text-ink"
                  >
                    <PlusIcon size={16} />
                  </span>
                </summary>
                <p className="max-w-[62ch] pr-12 pb-6 text-[15px] leading-relaxed text-ink-muted">{answer}</p>
              </details>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
