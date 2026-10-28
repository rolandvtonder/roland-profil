import { motion } from 'framer-motion'
import { PlusIcon } from '@phosphor-icons/react'
import { easeOutSoft, revealViewport } from '../lib/motion'
import type { FaqItem } from '../pages'

/** The homepage FAQ accordion, reusable on sub-pages with their own questions. */
export default function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
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
          <details className="faq group/faq">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[1.2rem] leading-snug text-ink sm:text-[1.3rem]" style={{ fontWeight: 600 }}>
                {question}
              </h3>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-[transform,background-color,color] duration-300 group-open/faq:rotate-45 group-open/faq:border-accent/50 group-open/faq:bg-accent/10 group-open/faq:text-ink"
              >
                <PlusIcon size={16} />
              </span>
            </summary>
            <p className="max-w-[66ch] pr-12 pb-6 text-[15px] leading-relaxed text-ink-muted">{answer}</p>
          </details>
        </motion.li>
      ))}
    </ul>
  )
}
