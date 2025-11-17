import Link from 'next/link'
import Image from 'next/image'
import GrowRippleLogo from '../Images/GrowRipple_logo_with_bg-removebg-preview.png'

const sections = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Creator Matching', href: '/#brands' },
      { label: 'RippleBriefs™', href: '/#product' },
      { label: 'RippleOrbit™ Workspaces', href: '/book-demo' },
      { label: 'RipplePulse™ Analytics', href: '/#pricing' },
      { label: 'RippleActivate™', href: '/#product' }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Managed Campaigns', href: '/book-demo' },
      { label: 'Creator Sourcing', href: '/#creators' },
      { label: 'Content Licensing', href: '/book-demo' },
      { label: 'Retail Syndication', href: '/#product' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Consumer Brands', href: '/#brands' },
      { label: 'Retail & CPG', href: '/#product' },
      { label: 'Agencies', href: '/#creators' },
      { label: 'Marketplace Sellers', href: '/book-demo' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Support', href: '/contact' }
    ]
  }
]

const socialIcons = [
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4l16 16m0-16L4 20" strokeLinecap="round" />
      </svg>
    )
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 4h-3a4 4 0 00-4 4v3H6v4h2v5h4v-5h3l1-4h-4V8a1 1 0 011-1h3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 9h3v9H6zM6 5h.01M10.5 9H14a3 3 0 013 3v6h-3v-5.2c0-.88-.72-1.8-1.6-1.8H10.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7.5a3 3 0 013-3h12a3 3 0 013 3v9a3 3 0 01-3 3H6a3 3 0 01-3-3z" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" />
      </svg>
    )
  }
]

export default function Footer() {
  return (
    <footer className="bg-[#1e1f27] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-10">
          <div>
            <Image
              src={GrowRippleLogo}
              alt="GrowRipple"
              width={340}
              height={120}
              className="h-14 w-auto drop-shadow"
              priority
            />
            <p className="mt-6 text-sm text-slate-300 max-w-xs leading-relaxed">
              AI-orchestrated creator partnerships that keep your brand authentic, measurable, and fast to market.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-base font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Contact us today</h4>
            <p className="text-sm text-slate-300">Interested in getting more from creator marketing?</p>
            <form className="flex items-center gap-2 bg-white rounded-full p-1 shadow-inner">
              <span className="pl-4 text-xs uppercase tracking-[0.35em] text-slate-500">●</span>
              <input
                type="email"
                placeholder="Input your email"
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-[#b86bff] to-[#5b68ff] text-sm font-semibold px-6 py-2 text-white shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p>© {new Date().getFullYear()} GrowRipple. All rights reserved.</p>
        <div className="flex items-center gap-3 text-white">
          {socialIcons.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label} className="hover:text-[#8f9bff] transition">
              <span className="sr-only">{social.label}</span>
              <div className="h-5 w-5">{social.icon}</div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
