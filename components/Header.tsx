import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GrowRippleLogo from '../Images/black-logo.png'

export default function Header() {
  const [isHidden, setIsHidden] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const lastScrollY = useRef(0)
  const revealTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const sectionIds = ['product', 'brands', 'creators', 'pricing']
    const handleScroll = () => {
      const current = window.scrollY
      if (current > lastScrollY.current && current > 120) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = current

      if (revealTimeout.current) {
        clearTimeout(revealTimeout.current)
      }
      revealTimeout.current = setTimeout(() => setIsHidden(false), 150)

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
      if (sections.length === 0) return

      const marker = window.innerHeight * 0.25
      let currentSection = ''

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const isAboveMarker = rect.top <= marker
        const isBelowMarker = rect.bottom >= marker

        if (isAboveMarker && isBelowMarker) {
          currentSection = section.id
          break
        }

        if (rect.bottom < marker) {
          currentSection = section.id
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClasses = (section: string) =>
    `relative flex flex-col items-center gap-1 pb-1 transition-colors font-semibold tracking-[0.08em] focus-visible:outline-none ${
      activeSection === section ? 'text-black' : 'text-black/70 hover:text-black'
    }`

  const navDotClasses = (section: string) =>
    `inline-block h-2 w-2 rounded-full transition-all duration-300 ${
      activeSection === section ? 'bg-[#FFD43B] opacity-100 translate-y-0' : 'bg-[#FFD43B] opacity-0 translate-y-1'
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-4 px-4 font-['Aero BC','Inter',sans-serif] bg-gradient-to-b from-[#1ECAD3] via-[#1ECAD3]/80 to-transparent transition-transform duration-500 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto rounded-[38px] bg-white text-black border border-black/10 shadow-[0_35px_70px_-40px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-6 py-4 px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <Image
                src={GrowRippleLogo}
                alt="GrowRipple logo"
                width={320}
                height={140}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex flex-1 min-w-[500px] items-center gap-8 px-8">
            <div className="flex flex-1 items-center justify-evenly gap-8">
              <Link href="/#product" className={navLinkClasses('product')}>
                <span>Product</span>
                <span className={navDotClasses('product')} />
              </Link>
              <div className="relative group">
                <Link href="/#brands" className={navLinkClasses('brands')}>
                  <span>Brands</span>
                  <span className={navDotClasses('brands')} />
                </Link>
              </div>
              <div className="relative group">
                <Link href="/#creators" className={navLinkClasses('creators')}>
                  <span>Creators</span>
                  <span className={navDotClasses('creators')} />
                </Link>
              </div>
              <Link href="/#pricing" className={navLinkClasses('pricing')}>
                <span>Pricing</span>
                <span className={navDotClasses('pricing')} />
              </Link>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <Link
                href="/try-free"
                className="bg-black text-white px-6 py-3 rounded-full font-semibold shadow-[0_20px_45px_-25px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 transition text-xs uppercase tracking-[0.35em] focus-visible:outline-none"
              >
                TRY FOR FREE
              </Link>
              <Link
                href="/book-demo"
                className="border-2 border-black/60 text-black px-6 py-3 rounded-full font-semibold hover:bg-black/5 transition-colors text-xs uppercase tracking-[0.35em] focus-visible:outline-none"
              >
                GET IN TOUCH
              </Link>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3 lg:hidden w-full justify-end">
            <Link
              href="/try-free"
              className="bg-black text-white px-7 py-3 rounded-full font-semibold shadow-[0_20px_45px_-25px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 transition text-xs uppercase tracking-[0.35em] focus-visible:outline-none"
            >
              TRY FOR FREE
            </Link>
            <Link
              href="/book-demo"
              className="border-2 border-black/60 text-black px-7 py-3 rounded-full font-semibold hover:bg-black/5 transition-colors text-xs uppercase tracking-[0.35em] focus-visible:outline-none"
            >
              GET IN TOUCH
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="text-black">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
