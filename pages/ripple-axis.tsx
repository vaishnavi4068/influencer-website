import Head from 'next/head'
import Layout from '../components/Layout'
import CTAButtons from '../components/CTAButtons'

const highlights = [
  'Everything in one place: Plan, review, approve, and post without the chaos.',
  'Stay on brand: Simple checks help creators hit the right tone before anything goes live.',
  'See what’s working: Watch results roll in and spot your top posts and creators.',
  'Do more of what wins: Clear, shareable insights to grow your community faster.'
]

export default function RippleAxisPage() {
  return (
    <>
      <Head>
        <title>RippleAxis | GrowRipple</title>
      </Head>
      <Layout>
        <main className="min-h-[calc(100vh-11rem)] flex items-center justify-center bg-[#1ECAD3] text-white px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="bg-white/10 backdrop-blur rounded-[48px] border border-white/30 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.45)] p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs font-semibold">
                    RippleAxis™
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                    RippleAxis™ — Where Content and KPIs Align
                  </h1>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Everything in one place: Plan, review, approve, and post without the chaos.
                  </p>
                  <ul className="space-y-4 text-white/90 text-sm">
                    {highlights.map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#FFD43B]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <CTAButtons />
                </div>
                <div className="rounded-[32px] overflow-hidden border border-white/30 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)] bg-black/30 w-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-auto object-contain"
                  >
                    <source src="/Images/dashboard.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
