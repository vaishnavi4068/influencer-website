import Link from 'next/link'
import Image from 'next/image'
import GrowRippleLogo from '../Images/black-logo.png'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 font-['Aero BC','Inter',sans-serif] bg-gradient-to-b from-[#1ECAD3] via-[#1ECAD3]/80 to-transparent">
      <div className="max-w-7xl mx-auto rounded-[38px] bg-white text-black border border-black/10 shadow-[0_35px_70px_-40px_rgba(0,0,0,0.45)]">
        <div className="flex justify-between items-center py-4 px-8">
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
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/#product" className="text-black/70 hover:text-black font-semibold tracking-[0.08em] focus-visible:outline-none">
              Product
            </Link>
            <div className="relative group">
              <Link href="/#creators" className="text-black/70 hover:text-black font-semibold flex items-center tracking-[0.08em] focus-visible:outline-none">
                Creators
              </Link>
            </div>
            <div className="relative group">
              <Link href="/#brands" className="text-black/70 hover:text-black font-semibold flex items-center tracking-[0.08em] focus-visible:outline-none">
                Brands
              </Link>
            </div>
            <Link href="/#pricing" className="text-black/70 hover:text-black font-semibold tracking-[0.08em] focus-visible:outline-none">
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
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
              BOOK A DEMO
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
