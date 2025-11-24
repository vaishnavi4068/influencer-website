import Link from 'next/link'

const whyChoose = [
  'Smart campaign matching - Ripple AI pairs you with brands that align with your content.',
  'Clear, creator-friendly briefs - ready-to-create instructions that reduce back-and-forth.',
  'Opportunities your audience trusts - local and niche brands that fit your authentic community.',
  'Fast, predictable payouts - submit, get approval, and get paid quickly with no surprises.'
]

const howItWorks = [
  'Apply (free): Share your social handles, city, and niche.',
  'Get matched: Browse campaigns and tap Interested on the ones that fit.',
  'Create & submit: Make content in your own voice and upload deliverables.',
  'Get paid: Approval triggers a smooth payout - no chasing invoices.'
]

const whoFor = ['Nano, micro, and local creators.', 'Creators with authentic community engagement.']

const expectations = [
  'Creative freedom - your voice comes first.',
  'Clear, opt-in usage terms.',
  'Friendly support whenever you need it.'
]

export default function CreatorSection() {
  return (
    <section id="creators" className="relative overflow-hidden bg-[#1ECAD3] py-28 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-12 flex justify-center gap-8">
          <span className="w-16 h-16 border-t-4 border-[#FFD43B] rounded-full" />
          <span className="w-16 h-16 border-t-4 border-[#FFD43B] rounded-full" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mt-3 inline-flex items-center px-5 py-2 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-[0.4em]">
            Become a RippleMaker
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">Become a RippleMaker</h2>
          <p className="mt-2 text-lg text-white/80">Where every creator partnership starts a ripple.</p>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            RippleMakers are creators with authentic community influence. Our platform connects you with campaigns that match your voice, your
            audience, and your style - so you can create confidently and get paid without the struggle.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/30 bg-[#f1f8ff] text-[#0f1f32] p-8 shadow-[0_45px_90px_-45px_rgba(0,0,0,0.3)]">
            <h3 className="text-2xl font-semibold">Why Creators Choose RippleMaker</h3>
            <ul className="mt-6 space-y-4 text-[#0f1f32]/85">
              {whyChoose.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/30 bg-[#f1f8ff] text-[#0f1f32] p-8 shadow-[0_45px_90px_-45px_rgba(0,0,0,0.3)]">
            <h3 className="text-2xl font-semibold">How it works</h3>
            <ul className="mt-6 space-y-4 text-[#0f1f32]/85">
              {howItWorks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/30 bg-[#f1f8ff] text-[#0f1f32] p-8">
            <h3 className="text-xl font-semibold">Who it's for</h3>
            <ul className="mt-4 space-y-3 text-[#0f1f32]/85">
              {whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] border border-white/30 bg-[#f1f8ff] text-[#0f1f32] p-8">
            <h3 className="text-xl font-semibold">What to expect</h3>
            <ul className="mt-4 space-y-3 text-[#0f1f32]/85">
              {expectations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/try-free"
            className="inline-flex items-center justify-center rounded-full bg-white text-[#1ECAD3] px-12 py-4 text-lg font-semibold shadow-[0_30px_60px_-35px_rgba(0,0,0,0.4)] hover:translate-y-0.5 transition-transform"
          >
            Try GrowRipple AI
          </Link>
        </div>
      </div>
    </section>
  )
}
