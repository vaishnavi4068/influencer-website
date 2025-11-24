import Head from 'next/head'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions | GrowRipple</title>
      </Head>
      <main className="min-h-screen bg-[#1ECAD3] text-white pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <article className="relative rounded-[36px] border border-white/25 bg-white/10 backdrop-blur shadow-[0_45px_90px_-55px_rgba(0,0,0,0.35)] p-8 sm:p-10 leading-relaxed">
            <Link
              href="/"
              className="absolute left-6 sm:left-8 top-6 sm:top-8 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 hover:bg-white/20 transition"
            >
              Back
            </Link>
            <header className="mb-10 text-center">
              <div className="inline-flex items-center px-5 py-2 mb-4 rounded-full border border-white/30 bg-white/10 uppercase tracking-[0.35em] text-xs text-white/80 font-semibold">
                Legal
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">Terms &amp; Conditions</h1>
              <p className="text-sm text-white/70 mt-2">Last Updated: [November, 2025]</p>
            </header>

            <section className="space-y-6 text-base text-white/90">
              <p>
                Welcome to GrowRipple, an AI-powered creator marketing platform that helps brands discover creators, manage campaigns, and run
                community-rooted influencer programs. By using our website and services (“Services”), you agree to these Terms &amp; Conditions
                (“Terms”). If you do not agree, please discontinue use.
              </p>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">1. Definitions</h2>
                <p>
                  <strong>“GrowRipple,” “we,” “us,” “our”</strong> refer to GrowRipple Inc.
                </p>
                <p>
                  <strong>“User”</strong> means anyone using the Services, including Brands and Creators.
                </p>
                <p>
                  <strong>“Brand”</strong> refers to businesses using GrowRipple for campaigns.
                </p>
                <p>
                  <strong>“Creator” or “RippleMaker”</strong> refers to individuals creating campaign content.
                </p>
                <p>
                  <strong>“Platform”</strong> refers to the GrowRipple dashboard and all Ripple products (RippleBriefs, RippleMatch, RippleOrbit,
                  RippleAxis, RipplePulse, RippleLibrary, RippleActivate, RippleElite).
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">2. Eligibility</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You must be at least 18 years old.</li>
                  <li>You must have legal authority to enter into contracts.</li>
                  <li>Creators must provide accurate personal and social profile information.</li>
                  <li>Brands must provide accurate business and payment details.</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">3. Use of the Services</h2>
                <p>GrowRipple grants you a limited, revocable license to use the platform. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the Services for unlawful or fraudulent activities.</li>
                  <li>Misrepresent identity, engagement, or audience metrics.</li>
                  <li>Avoid platform payment workflows.</li>
                  <li>Upload harmful, unsafe, or misleading content.</li>
                  <li>Violate community or platform-specific guidelines.</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">4. Account Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You must keep your login details confidential.</li>
                  <li>You are responsible for activities under your account.</li>
                  <li>You must notify us of unauthorized account use.</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">5. Creator Requirements</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Create original content per the brief.</li>
                  <li>Disclose sponsorships per legal requirements.</li>
                  <li>Deliver work within agreed usage terms.</li>
                  <li>Avoid fake engagement, bots, or manipulated metrics.</li>
                  <li>Maintain safe online conduct.</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">6. Brand Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate campaign details.</li>
                  <li>Pay creators through the platform.</li>
                  <li>Honor usage rights and legal guidelines.</li>
                  <li>Avoid harmful or misleading campaign content.</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">7. AI-Generated Content</h2>
                <p>
                  GrowRipple uses AI to produce briefs, insights, and recommendations. AI outputs may contain inaccuracies. You agree to review all
                  generated content and acknowledge that GrowRipple is not responsible for losses resulting from reliance on AI-generated
                  suggestions.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">8. Payments</h2>
                <h3 className="text-lg font-semibold mt-4">For Brands:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Subscription fees apply based on your chosen plan.</li>
                  <li>Fees are non-refundable unless required by law.</li>
                  <li>Plan upgrades or downgrades apply immediately.</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">For Creators:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Payments are released after brand approval.</li>
                  <li>Third-party payment processors may be used.</li>
                  <li>GrowRipple is not responsible for issues caused by incorrect payment info.</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">9. Service Plans &amp; Limits</h2>
                <p>
                  Available features depend on your plan (RippleStart, RippleGrow, RipplePro, RippleElite). GrowRipple may adjust plan features,
                  limits, or pricing with notice.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">10. Content Ownership</h2>
                <p>
                  <strong>Creators retain ownership</strong> of original content unless agreed otherwise.
                </p>
                <p>
                  <strong>Brands receive usage rights</strong> based on the brief (e.g., licensing, whitelisting, paid ads).
                </p>
                <p>
                  <strong>GrowRipple owns</strong> platform technology, AI systems, analytics, and aggregated metadata.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">11. Prohibited Content</h2>
                <p>You may not upload content containing:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Hate speech or discrimination</li>
                  <li>Nudity or adult material</li>
                  <li>Violence or harassment</li>
                  <li>Illegal activities</li>
                  <li>Misinformation or unsafe claims</li>
                  <li>Copyright or IP violations</li>
                </ul>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">12. Third-Party Links &amp; Integrations</h2>
                <p>
                  GrowRipple integrates with platforms like Meta, TikTok, and YouTube. You agree to comply with each platform’s policies. GrowRipple
                  is not responsible for actions taken by third-party services.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">13. Data &amp; Privacy</h2>
                <p>Use of the platform is governed by our Privacy Policy. We collect account data, social insights, analytics, and payment information.</p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">14. Disclaimers</h2>
                <p>
                  GrowRipple provides Services “as is” with no warranties. We do not guarantee creator performance, campaign results, platform
                  uptime, or accuracy of analytics.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">15. Limitation of Liability</h2>
                <p>
                  GrowRipple is not liable for lost profits, data loss, indirect damages, or business interruption. Total liability will not exceed
                  the amount paid to GrowRipple in the past six months.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">16. Termination</h2>
                <p>
                  GrowRipple may suspend or terminate accounts for violations, fraud, non-payment, or safety concerns. Users may terminate accounts
                  anytime. Subscription fees are non-refundable.
                </p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">17. Governing Law</h2>
                <p>These Terms are governed by the laws of the State of Delaware unless required otherwise by law.</p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">18. Changes to Terms</h2>
                <p>GrowRipple may update these Terms periodically. Your continued use constitutes acceptance of updates.</p>
              </article>

              <article>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mt-8">19. Contact Us</h2>
                <p>
                  <strong>GrowRipple Inc.</strong>
                  <br />
                  Email: support@growripple.ai
                  <br />
                  Website: https://www.growripple.ai
                </p>
              </article>
            </section>
          </article>
        </div>
      </main>
    </>
  )
}
