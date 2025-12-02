import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import GrowRippleLogo from '../Images/white-logo.png'

const splitSections = [
  {
    id: 'creator',
    label: 'Creator Access',
    headline: 'Where everyday creators grow &mdash; one ripple at a time',
    description:
      'Join a community of authentic creators discovering AI-matched brand campaigns built for their voice, style, and audience. Create content you love, earn rewards, and grow your influence with tools that simplify everything.',
    prompt: 'Ready to start making ripples?'
  },
  {
    id: 'brand',
    label: 'Brand Access',
    headline: 'Where every brand partnership starts a ripple',
    description:
      "Tap into a community of authentic creators matched to your goals, audience, and market &mdash; powered by GrowRipple's AI. Launch real, local creator campaigns, scale what works, and grow your brand with tools that make creator marketing simple.",
    prompt: 'Ready to start growing with creators?'
  }
]

export default function TryFreePage() {
  return (
    <>
      <Head>
        <title>Try for Free | GrowRipple</title>
      </Head>
      <Layout hideHeader={true}>
        <main className="min-h-screen bg-[#1ECAD3] text-[#0f1f32] flex items-center">
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="flex justify-center">
              <Image
                src={GrowRippleLogo}
                alt="GrowRipple logo"
                width={200}
                height={80}
                className="h-16 w-auto drop-shadow"
                priority
              />
            </div>
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#0f1f32]/15 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#0f1f32]/80 hover:bg-white transition"
              >
                Back
              </Link>
              <span className="hidden sm:inline-flex items-center rounded-full border border-[#0f1f32]/10 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#0f1f32]/60">
                GrowRipple Access
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {splitSections.map(section => (
                <section
                  key={section.id}
                  className="relative rounded-[36px] overflow-hidden border border-[#0f1f32]/10 shadow-[0_45px_120px_-60px_rgba(15,31,50,0.35)] min-h-[460px] flex bg-[#f1f8ff]"
                >
                  <div className="relative z-10 flex flex-col justify-center items-center text-center gap-5 p-10 w-full">
                    <div className="inline-flex items-center rounded-full border border-[#0f1f32]/15 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0f1f32]/70">
                      {section.label}
                    </div>
                    <h2
                      className="text-[26px] md:text-[34px] font-black leading-snug"
                      dangerouslySetInnerHTML={{ __html: section.headline }}
                    />
                    <p
                      className="text-base md:text-lg text-[#26394d] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f1f32]/70">{section.prompt}</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_INFLUENCER_SIGNUP_URL}/signup`}
                        className="inline-flex items-center justify-center rounded-full bg-[#0f1f32] text-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] shadow-[0_25px_60px_-30px_rgba(15,31,50,0.65)] hover:-translate-y-0.5 transition"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_INFLUENCER_SIGNUP_URL}/login`}
                        className="inline-flex items-center justify-center rounded-full border border-[#0f1f32] px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#0f1f32] hover:bg-[#0f1f32]/5 transition"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
