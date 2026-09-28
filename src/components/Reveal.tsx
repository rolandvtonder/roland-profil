import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOutSoft, revealViewport } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.7, delay, ease: easeOutSoft }}
    >
      {children}
    </motion.div>
  )
}
