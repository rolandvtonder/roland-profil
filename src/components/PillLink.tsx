import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PillLinkProps = {
  href: string
  children: ReactNode
  variant?: 'frosted' | 'primary'
  size?: 'md' | 'lg'
  className?: string
  onClick?: () => void
  /** Opens in a new tab (e.g. a WhatsApp chat). */
  external?: boolean
}

const variants = {
  // The frosted outline pill from the hero reference
  frosted: 'border border-white/35 bg-white/[0.04] text-white backdrop-blur-[6px] hover:bg-white/[0.12]',
  primary:
    'bg-accent-strong text-white shadow-[0_12px_32px_-12px_rgba(42,98,244,0.9)] hover:bg-accent-hover hover:shadow-[0_16px_40px_-12px_rgba(61,126,255,0.95)]',
}

const sizes = {
  md: 'px-6 py-[11px]',
  lg: 'px-[30px] py-[14px]',
}

export default function PillLink({ href, children, variant = 'frosted', size = 'md', className = '', onClick, external }: PillLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-normal no-underline transition-[background-color,box-shadow] duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
