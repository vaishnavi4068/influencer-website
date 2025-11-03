import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4">
      <div className="bg-white rounded-full shadow-lg border border-gray-100">
        <div className="flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* <div className="flex flex-col space-y-1">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
              </div>
            </div> */}
            <Link href="/" className="text-xl font-bold text-gray-800">
              <span className="font-bold">Microdrive</span>
              <span className="font-normal text-gray-600">.Ai</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
              About Us
            </Link>
            <div className="relative group">
              <Link href="/who-we-serve" className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
                 Influencers
              </Link>
            </div>
            <div className="relative group">
              <Link href="/platform" className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
                Brands
              </Link>
            </div>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium">
              Resources
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/try-free"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm uppercase tracking-wide"
            >
              TRY FOR FREE
            </Link>
            <Link
              href="/book-demo"
              className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-sm uppercase tracking-wide"
            >
              BOOK A DEMO
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="text-gray-700 hover:text-gray-900">
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
