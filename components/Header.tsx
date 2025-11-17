import Link from 'next/link'
import Image from 'next/image'
import GrowRippleLogo from '../Images/GrowRipple_logo_with_bg-removebg-preview.png'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 bg-gradient-to-b from-white/95 via-white/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto rounded-full shadow-[0_25px_45px_-30px_rgba(0,156,196,0.9)] border border-white/20 bg-gradient-to-r from-[#00d5d7] via-[#00c4ea] to-[#00a9f1] text-white">
        <div className="flex justify-between items-center py-3.5 px-5">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <Image
                src={GrowRippleLogo}
                alt="GrowRipple logo"
                width={260}
                height={110}
                className="h-14 w-auto drop-shadow"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/#product" className="text-white/80 hover:text-white font-semibold tracking-wide outline-none">
              Product
            </Link>
            <div className="relative group">
              <Link href="/#creators" className="text-white/80 hover:text-white font-semibold flex items-center tracking-wide outline-none">
                 Creators
              </Link>
            </div>
            <div className="relative group">
              <Link href="/#brands" className="text-white/80 hover:text-white font-semibold flex items-center tracking-wide outline-none">
                Brands
              </Link>
            </div>
            <Link href="/#pricing" className="text-white/80 hover:text-white font-semibold tracking-wide outline-none">
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/try-free"
              className="bg-gradient-to-r from-[#00b7da] to-[#00e0b5] text-white px-6 py-2 rounded-full font-semibold shadow-[0_10px_25px_-12px_rgba(0,183,218,0.9)] hover:opacity-90 transition text-sm uppercase tracking-wide outline-none"
            >
              TRY FOR FREE
            </Link>
            <Link
              href="/book-demo"
              className="border-2 border-white/80 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm uppercase tracking-wide outline-none"
            >
              BOOK A DEMO
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="text-white">
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
