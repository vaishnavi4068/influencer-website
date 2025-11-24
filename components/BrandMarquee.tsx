import Image from 'next/image'
import Link from 'next/link'
import InstagramShowcase from '../Images/instagram.jpg'

const brandBenefits = [
  'Right creators, fast – RippleMatch ranks local/nano/micro creators by fit.',
  'Briefs in minutes – RippleBriefs turns goals into clear instructions.',
  'Calm campaign ops – RippleOrbit manages content, approvals, and payouts.',
  'See what works – RipplePulse shows live KPIs, benchmarks, and reports.',
  'Activate everywhere – RippleActivate pushes content to Meta, TikTok, and more.'
]

export default function BrandMarquee() {
  return (
    <section id="brands" className="relative overflow-hidden py-16 bg-[#1ECAD3] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-10 flex justify-center gap-8">
          <span className="w-16 mb-4 h-16 border-t-4 border-[#FFD43B] rounded-full" />
          <span className="w-16 mb-4  h-16 border-t-4 border-[#FFD43B] rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-5 py-2 mb-4 mt-6 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs text-white/70 font-semibold">
            Trusted Partners
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl font-black">Brands Creating Ripples with Us</h2>
          <p className="mt-3 text-base sm:text-lg text-white/80">
            Global leaders tap GrowRipple to run AI-powered creator programs end to end.
          </p>
        </div>

        <div className="rounded-[32px] bg-white/10 backdrop-blur border border-white/30 shadow-[0_35px_80px_-50px_rgba(0,0,0,0.35)] px-6 sm:px-8 py-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em]">
                <span className="h-2 w-2 rounded-full bg-[#FFD43B]" />
                Brands
              </div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight">Launch AI-Matched Creator Campaigns</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Find authentic, community-rooted RippleMakers and go live in days, not weeks.
                GrowRipple handles matching, briefs, ops, and measurement so every partnership stays on-brand.
              </p>
              <div>
                <h4 className="text-lg font-semibold">Why brands choose GrowRipple</h4>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-white/90">
                  {brandBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/coming-soon"
                  className="inline-flex flex-1 min-w-[160px] items-center justify-center rounded-full bg-white text-[#1ECAD3] px-8 py-3 text-sm font-semibold shadow-[0_25px_50px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-transform"
                >
                  Sign Up
                </Link>
                <a
                  href="/book-demo"
                  className="inline-flex flex-1 min-w-[160px] items-center justify-center rounded-full border border-white/60 text-white px-8 py-3 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            <div className="rounded-[24px] overflow-hidden border border-white/30 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.35)] h-full min-h-[260px] lg:min-h-[360px] flex">
              <Image src={InstagramShowcase} alt="Creator collaboration" className="w-full h-full object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
