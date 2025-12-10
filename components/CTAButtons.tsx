import Link from 'next/link'

type Tone = 'light' | 'dark'

interface CTAButtonsProps {
  className?: string
  tone?: Tone
}

const ctas = [
  { href: '/try-free', label: 'Launch a Campaign' },
  { href: '/book-demo', label: 'Book a Demo' }
]

const toneClasses: Record<Tone, { primaryBg: string; primaryText: string; secondaryBorder: string; secondaryText: string; secondaryHover: string }> = {
  light: {
    primaryBg: 'bg-white',
    primaryText: 'text-[#1ECAD3]',
    secondaryBorder: 'border-white',
    secondaryText: 'text-white',
    secondaryHover: 'hover:bg-white/10'
  },
  dark: {
    primaryBg: 'bg-[#1ECAD3]',
    primaryText: 'text-white',
    secondaryBorder: 'border-[#1ECAD3]',
    secondaryText: 'text-[#1ECAD3]',
    secondaryHover: 'hover:bg-[#1ECAD3]/10'
  }
}

export default function CTAButtons({ className = '', tone = 'light' }: CTAButtonsProps) {
  const styles = toneClasses[tone]

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <Link
        href={ctas[0].href}
        className={`inline-flex w-full sm:w-auto items-center justify-center rounded-full px-10 py-3 text-sm font-semibold shadow-[0_25px_60px_-30px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 ${styles.primaryBg} ${styles.primaryText}`}
      >
        {ctas[0].label}
      </Link>
      <Link
        href={ctas[1].href}
        className={`inline-flex w-full sm:w-auto items-center justify-center rounded-full border px-10 py-3 text-sm font-semibold transition ${styles.secondaryBorder} ${styles.secondaryText} ${styles.secondaryHover}`}
      >
        {ctas[1].label}
      </Link>
    </div>
  )
}
