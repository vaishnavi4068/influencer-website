import Link from 'next/link'
import Image from 'next/image'
import InstagramShowcase from '../Images/instagram.jpg'
import SocialTexture from '../Images/social.jpg'
import ThirdImage from '../Images/third.jpg'
import FourthImage from '../Images/fourth.jpg'
import ManagerImage from '../Images/manager.jpg'

const offerings = [
  {
    title: 'AI-Powered Campaign Briefs',
    description: 'Generate on-brand campaign instructions, moodboards, and deliverables with a single prompt.',
    cta: 'See how it works',
    href: '/ripple-briefs',
    image: SocialTexture
  },
  {
    title: 'Creator Discovery & Recruitment',
    description: 'AI-matched, community-rooted creators ranked by authenticity, location, and brand fit.',
    cta: 'Browse creators',
    href: '/ripple-match',
    image: InstagramShowcase
  },
  {
    title: 'Campaign Management',
    description: 'Coordinate briefs, contracts, content, and payouts inside one RippleOrbit workspace.',
    cta: 'Organize campaigns',
    href: '/ripple-orbit',
    image: ThirdImage
  },
  {
    title: 'Content Performance Analytics',
    description: 'See what is resonating by creator, platform, and post so you can scale the winners faster.',
    cta: 'View insights',
    href: '/ripple-axis',
    image: FourthImage
  },
  {
    title: 'Managed Services',
    description: 'Tap RippleElite for white-glove strategy, sourcing, and reporting when you need extra hands.',
    cta: 'Talk to experts',
    highlight: true,
    href: '/ripple-elite',
    image: ManagerImage
  }
]

export default function ProductShowcase() {
  return (
    <section id="product" className="relative overflow-hidden bg-[#1ECAD3] text-white py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-8 flex justify-center gap-8">
          <span className="w-14 h-14 border-t-4 border-[#FFD43B] rounded-full" />
          <span className="w-14 h-14 border-t-4 border-[#FFD43B] rounded-full" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-5 py-2 mb-4 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs text-white/70 font-semibold">
            Platform Capabilities
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl font-black">Every Tool You Need, Built Into One Ripple</h2>
          <p className="mt-4 text-lg text-white/90">
            From campaign briefs to analytics, GrowRipple keeps your creator marketing team in one vertically integrated workspace.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className={item.highlight ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <article
                className={`group h-full rounded-[36px] border border-white/30 bg-white/10 shadow-[0_45px_120px_-50px_rgba(0,0,0,0.4)] backdrop-blur flex flex-col overflow-hidden ${
                  item.highlight ? 'ring-2 ring-white/40' : ''
                }`}
              >
                <div className="relative h-72 overflow-hidden flex items-end">
                  <Image
                    src={item.image}
                    alt={`${item.title} promo`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="relative z-10 w-full p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h3 className="text-2xl font-black leading-tight whitespace-pre-line">{item.title}</h3>
                    {item.href ? (
                      <Link href={item.href} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FFD43B]">
                        Show details
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
