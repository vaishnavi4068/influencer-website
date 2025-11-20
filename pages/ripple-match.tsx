import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import CTAButtons from '../components/CTAButtons'
import InstagramShowcase from '../Images/instagram.jpg'

const highlights = [
  'AI matching, community-first - Rank creators by local relevance, audience overlap, and trust signals (meaningful comments, saves, repeat viewers)',
  'Quality & safety, automated - AI flags fake followers, spammy engagement, risky content, and brand-safety issues',
  'Predictive performance - Model views, CTR, and footfall proxies using historical posts and audience patterns',
  'One-click AI outreach - Auto-personalized DMs/emails with your brief, rate capture, and scheduling links',
  'Frictionless onboarding - Collect deliverables, assets, disclosures, and usage/whitelisting terms in one flow',
  'Smart rosters - Save by city, niche, or campaign; AI suggests alternates and backups'
]

export default function RippleMatchPage() {
  return (
    <>
      <Head>
        <title>RippleMatch | GrowRipple</title>
      </Head>
      <Layout>
        <main className="min-h-[calc(100vh-11rem)] flex items-center justify-center bg-[#1ECAD3] text-white px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto px-0 sm:px-6 w-full">
            <div className="bg-white/10 backdrop-blur rounded-[48px] border border-white/30 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.45)] p-6 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs font-semibold">
                    RippleMatch
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                    RippleMatch: Creator Discovery &amp; Recruitment
                  </h1>
                  <p className="text-lg text-white/90 font-semibold">
                    AI-matched, community-rooted creators&mdash;fast.
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Find, vet, and book authentic creators who actually move your community&mdash;in a fraction of the time. RippleMatch uses AI to scan millions of profiles, score community trust, predict performance, and automate outreach so campaigns launch in days, not weeks.
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2 text-white/90 text-sm">
                    {highlights.map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#FFD43B]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <CTAButtons />
                </div>
                <div className="rounded-[32px] overflow-hidden border border-white/30 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)]">
                  <Image
                    src={InstagramShowcase}
                    alt="RippleMatch creator discovery workspace"
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
