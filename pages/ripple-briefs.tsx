import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import CTAButtons from '../components/CTAButtons'
import SocialTexture from '../Images/social.webp'

export default function RippleBriefsPage() {
  return (
    <>
      <Head>
        <title>RippleBriefs | GrowRipple</title>
      </Head>
      <Layout>
        <main className="min-h-screen flex items-center justify-center bg-[#1ECAD3] text-white py-16 px-4">
          <div className="max-w-6xl mx-auto px-0 sm:px-6 w-full">
            <div className="bg-white/10 backdrop-blur rounded-[48px] border border-white/30 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.45)] p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs font-semibold">
                    RippleBriefs
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black">
                    No more generic briefs.
                  </h1>
                  <p className="text-lg text-white/90 leading-relaxed">
                    With RippleBriefs, create custom, creator-ready directions that mirror your brand voice, lock to your KPIs, and fit the right creator style—fast. Trained on thousands of campaigns, the system turns clarity into results while reducing back-and-forth.
                  </p>
                  <CTAButtons />
                </div>
                <div className="rounded-[32px] overflow-hidden border border-white/30 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)]">
                  <Image
                    src={SocialTexture}
                    alt="RippleBriefs workspace"
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
