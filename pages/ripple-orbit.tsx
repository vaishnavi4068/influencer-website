import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import CTAButtons from '../components/CTAButtons'
import OrbitWorkspace from '../Images/third.webp'

const highlights = [
  'Single orbit, zero chaos – One calm dashboard for briefs, rosters, timelines, and status',
  'AI guardrails – Spec checks, disclosure prompts, brand-safety flags, and deadline nudges',
  'Creator-friendly workflow – Clear deliverables, feedback threads, and fast payouts',
  'Live mission control – Track drafts, revisions, approvals, and go-live windows in real time',
  'Compliance that sticks – Usage rights, whitelisting, and audit logs—built in',
  'Team sync – Roles, comments, version history, and shareable links'
]

export default function RippleOrbitPage() {
  return (
    <>
      <Head>
        <title>RippleOrbit | GrowRipple</title>
      </Head>
      <Layout>
        <main className="min-h-[calc(100vh-11rem)] flex items-center justify-center bg-[#1ECAD3] text-white px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="bg-white/10 backdrop-blur rounded-[48px] border border-white/30 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.45)] p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs font-semibold">
                    RippleOrbit™
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                    RippleOrbit™ – Your Campaigns, Perfectly in Sync
                  </h1>
                  <p className="text-lg text-white/90 font-semibold">
                    AI-checked, community-safe creator campaigns—managed end to end.
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Bring every moving part into one steady orbit. RippleOrbit unifies briefs, creator coordination, contracts, content, approvals, and payments—with AI that keeps work on-spec, on-time, and authentically aligned to your community.
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
                    src={OrbitWorkspace}
                    alt="RippleOrbit campaign workspace"
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
