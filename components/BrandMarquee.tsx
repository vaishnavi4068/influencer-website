const brands = [
    { label: 'Goldfish', sub: 'swim school', className: 'font-black text-[#9aa8b7]', subClass: 'uppercase text-[0.55rem] tracking-[0.3em]' },
    { label: 'Reynolds', className: 'font-semibold italic text-[#8a9aac]' },
    { label: 'PeriACTIVE', className: 'tracking-[0.2em] text-[#a4b0be]' },
    { label: 'LIFEBOOST', sub: 'coffee', className: 'font-semibold text-[#7f90a4]', subClass: 'uppercase text-[0.6rem] tracking-[0.4em]' },
    { label: 'brother', className: 'font-black text-[#5f6b78]' },
    { label: 'Dole', className: 'font-black text-[#5b6672] tracking-[0.05em]' },
    { label: 'FRESCA', className: 'font-semibold tracking-[0.35em] text-[#7b8796]' },
    { label: 'NIKE', className: 'font-black italic text-[#6d7887] text-3xl' },
    { label: 'logitech', className: 'font-semibold text-[#7c8794]' },
    { label: 'Quince', className: 'italic text-[#b8c0cb] text-3xl' }
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
        <section id="brands" className="relative overflow-hidden py-24 bg-gradient-to-b from-[#e3f7ff] via-white to-[#fff4ea]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 left-6 h-48 w-48 rounded-full bg-[#8ff1f8]/45 blur-[120px]" />
                <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#ffd9c7]/45 blur-[150px]" />
                <div className="absolute inset-x-0 top-24 h-32 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <p className="uppercase text-xs tracking-[0.35em] text-[#11b5c6]">
                        Trusted Partners
                    </p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-black text-[#0a1b33]">
                        Brands Creating Ripples with Us
                    </h2>
                    <p className="mt-3 text-lg text-[#63728b]">
                        Global leaders tap GrowRipple to run AI-powered creator programs end to end.
                    </p>
                </div>

                <div className="mt-10 rounded-[40px] border border-[#bdeeff]/50 bg-white/70 backdrop-blur">
                    <div className="flex overflow-hidden rounded-[40px]" id="brand-marquee">
                            {/* First set of brands */}
                            <div className="flex animate-marquee whitespace-nowrap gap-8 md:gap-12 px-6 py-6">
                                {brands.map((brand) => (
                                    <a
                                        key={`first-${brand.label}`}
                                        href="#brand-details"
                                        className="flex flex-col items-center justify-center mx-4 text-2xl text-[#0d4a62] hover:text-[#00a6c1] transition-colors cursor-pointer"
                                    >
                                        <span className={`leading-tight ${brand.className || ''}`}>{brand.label}</span>
                                        {brand.sub && (
                                            <span className={`mt-1 text-xs text-[#9aa7b8] ${brand.subClass || ''}`}>
                                                {brand.sub}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>

                            {/* Second set of brands for seamless loop */}
                            <div className="flex animate-marquee whitespace-nowrap gap-8 md:gap-12 px-6 py-6" aria-hidden="true">
                                {brands.map((brand) => (
                                    <a
                                        key={`second-${brand.label}`}
                                        href="#brand-details"
                                        className="flex flex-col items-center justify-center mx-4 text-2xl text-[#0d4a62] hover:text-[#00a6c1] transition-colors cursor-pointer"
                                    >
                                        <span className={`leading-tight ${brand.className || ''}`}>{brand.label}</span>
                                        {brand.sub && (
                                            <span className={`mt-1 text-xs text-[#9aa7b8] ${brand.subClass || ''}`}>
                                                {brand.sub}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>
                    </div>
                </div>

                <div id="brand-details" className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[32px] border border-[#0fc0d8]/20 bg-gradient-to-br from-white via-[#f4feff] to-white p-8 shadow-[0_35px_80px_-45px_rgba(15,170,200,0.5)]">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#e0faff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#0eaECB]">
                            <span className="h-2 w-2 rounded-full bg-[#00b9d9]" />
                            Brands
                        </div>
                        <h3 className="mt-5 text-3xl md:text-4xl font-black text-[#081f34] leading-tight">Launch AI-Matched Creator Campaigns</h3>
                        <p className="mt-4 text-[#4c5c75] text-lg leading-relaxed">
                            Find authentic, community-rooted RippleMakers and go live in days—not weeks. GrowRipple’s AI handles the matching, briefs, ops, and measurement so every partnership starts a ripple.
                        </p>
                        <div className="mt-8 rounded-[28px] bg-white/80 border border-[#dff7ff] p-6">
                            <h4 className="text-xl font-semibold text-[#083451]">Why brands choose GrowRipple</h4>
                            <ul className="mt-4 space-y-3 text-[#56647c]">
                                {brandBenefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#00b7ff] to-[#00d8a1]" aria-hidden="true" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="rounded-[32px] border border-[#10c0d8]/40 bg-gradient-to-br from-white via-[#fdfcff] to-[#f7fffb] p-6 shadow-[0_35px_90px_-50px_rgba(7,119,153,0.35)]">
                        <h4 className="text-xl font-semibold text-[#083451]">How it works (3 steps)</h4>
                        <ol className="mt-5 list-decimal list-inside space-y-4 text-[#56647c]">
                            {brandSteps.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                        <div className="mt-8 flex flex-col gap-3">
                            <a
                                href="/business-signup"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00b7ff] via-[#00c9d0] to-[#00d8a1] px-10 py-3 text-sm font-semibold text-white shadow-[0_30px_60px_-35px_rgba(0,169,201,0.95)] hover:translate-y-0.5 transition-transform"
                            >
                                Talk to our team
                            </a>
                            <a
                                href="/book-demo"
                                className="inline-flex items-center justify-center rounded-full border border-[#0cbcd4]/40 text-[#0b7a90] px-10 py-3 text-sm font-semibold hover:bg-white transition"
                            >
                                See a live demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
