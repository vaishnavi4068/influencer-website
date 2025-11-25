import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import CTAButtons from '../components/CTAButtons'
import ManagerImage from '../Images/manager.webp'

const highlights = [
  'Signature strategy – Offers, messaging, and a campaign playbook tailored to your market.',
  'Creator sourcing & vetting – AI-matched, community-rooted talent that feels genuine.',
  'Briefs, contracts, approvals – Managed end to end for speed and clarity.',
  'Content to live – Reviews, revisions, and publishing handled for you.',
  'Performance that proves out – Clear KPIs, weekly insights, and next steps to scale.',
  'Payouts & support – Fast payments and responsive creator care.'
]

export default function RippleElitePage() {
  return (
    <>
      <Head>
        <title>RippleElite | GrowRipple</title>
      </Head>
      <Layout>
        <main className="min-h-[calc(100vh-11rem)] flex items-center justify-center bg-[#1ECAD3] text-white px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="bg-white/10 backdrop-blur rounded-[48px] border border-white/30 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.45)] p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs font-semibold">
                    RippleElite
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                    RippleElite — Signature Managed Creator Programs
                  </h1>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Set the goal; we’ll craft the program. RippleElite delivers authentic creators, on-brand content, and measurable community impact—without adding work to your plate.
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
                <div className="rounded-[32px] overflow-hidden border border-white/30 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)]">
                  <Image
                    src={ManagerImage}
                    alt="RippleElite managed services team at work"
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
