import Image from 'next/image'
import InstagramShowcase from '../Images/instagram.jpg'

const brands = [
    { label: 'Goldfish', sub: 'swim school', className: 'font-black text-white/80', subClass: 'uppercase text-[0.55rem] tracking-[0.3em]' },
    { label: 'Reynolds', className: 'font-semibold italic text-white/80' },
    { label: 'PeriACTIVE', className: 'tracking-[0.2em] text-white/80' },
    { label: 'LIFEBOOST', sub: 'coffee', className: 'font-semibold text-white/80', subClass: 'uppercase text-[0.6rem] tracking-[0.4em]' },
    { label: 'brother', className: 'font-black text-white/80' },
    { label: 'Dole', className: 'font-black text-white/80 tracking-[0.05em]' },
    { label: 'FRESCA', className: 'font-semibold tracking-[0.35em] text-white/80' },
    { label: 'NIKE', className: 'font-black italic text-white/80 text-3xl' },
    { label: 'logitech', className: 'font-semibold text-white/80' },
    { label: 'Quince', className: 'italic text-white/70 text-3xl' }
]

const brandBenefits = [
    'Right creators, fast – RippleMatch™ ranks local/nano/micro creators by audience fit & authenticity.',
    'Briefs in minutes – RippleBriefs™ turns your goals into clear, creator-ready instructions (fewer revisions).',
    'Calm campaign ops – RippleOrbit™ manages content, approvals, contracts, and payouts.',
    'See what works – RipplePulse™ shows live KPIs, benchmarks, and simple reports.',
    'Activate everywhere – RippleActivate™ pushes content to Meta/TikTok and your site.'
]

const brandSteps = [
    'Tell us your goal (traffic, leads, sales) + city/ZIP.',
    'Review your shortlist of AI-matched RippleMakers; pick favorites.',
    'Approve & launch with an AI brief—track results in real time.'
]

export default function BrandMarquee() {
    return (
        <section id="brands" className="relative overflow-hidden py-24 bg-[#1ECAD3] text-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-10 flex justify-center gap-8">
                    <span className="w-16 h-16 border-t-4 border-[#FFD43B] rounded-full" />
                    <span className="w-16 h-16 border-t-4 border-[#FFD43B] rounded-full" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center px-5 py-2 mb-4 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs text-white/70 font-semibold">
                        Trusted Partners
                    </div>
                    <h2 className="mt-8 text-3xl md:text-4xl font-black">
                        Brands Creating Ripples with Us
                    </h2>
                    <p className="mt-3 text-lg text-white/80">
                        Global leaders tap GrowRipple to run AI-powered creator programs end to end.
                    </p>
                </div>

               
                <div id="brand-details" className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
                    <div className="space-y-10">
                        <div className="rounded-[32px] border border-white/30 bg-white/10 backdrop-blur p-8 shadow-[0_35px_80px_-45px_rgba(0,0,0,0.35)]">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em]">
                                <span className="h-2 w-2 rounded-full bg-[#FFD43B]" />
                                Brands
                            </div>
                            <h3 className="mt-5 text-3xl md:text-4xl font-black leading-tight">Launch AI-Matched Creator Campaigns</h3>
                            <p className="mt-4 text-white/80 text-lg leading-relaxed">
                                Find authentic, community-rooted RippleMakers and go live in days—not weeks. GrowRipple’s AI handles the matching, briefs, ops, and measurement so every partnership starts a ripple.
                            </p>
                            <div className="mt-8 rounded-[28px] bg-white/10 border border-white/30 p-6">
                                <h4 className="text-xl font-semibold">Why brands choose GrowRipple</h4>
                                <ul className="mt-4 space-y-3 text-white/90">
                                    {brandBenefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="rounded-[32px] border border-white/30 bg-white/10 backdrop-blur p-6 shadow-[0_35px_90px_-50px_rgba(0,0,0,0.35)]">
                            <h4 className="text-xl font-semibold">How it works (3 steps)</h4>
                            <ol className="mt-5 list-decimal list-inside space-y-4 text-white/90">
                                {brandSteps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                            <div className="mt-8 flex flex-col gap-3">
                                <a
                                    href="/business-signup"
                                    className="inline-flex items-center justify-center rounded-full bg-white text-[#1ECAD3] px-10 py-3 text-sm font-semibold shadow-[0_30px_60px_-35px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-transform"
                                >
                                    Sign Up
                                </a>
                                <a
                                    href="/book-demo"
                                    className="inline-flex items-center justify-center rounded-full border border-white/50 text-white px-10 py-3 text-sm font-semibold hover:bg-white/10 transition"
                                >
                                    See a live demo
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[32px] overflow-hidden border border-white/30 shadow-[0_35px_80px_-45px_rgba(0,0,0,0.35)]">
                        <Image src={InstagramShowcase} alt="Creator collaboration" className="w-full h-full object-cover" priority />
                    </div>
                </div>
            </div>
        </section>
    )
}
