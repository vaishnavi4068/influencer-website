const offerings = [
    {
        title: 'AI-Powered Campaign Briefs',
        description: 'AI-Powered Campaign Briefs',
        cta: 'See how it works'
    },
    {
        title: 'Creator Discovery & Recruitment',
        description: ' Creator Discovery & Recruitment AI-matched, community-rooted creators—fast.',
        cta: 'Browse creators'
    },
    {
        title: 'Campaign Management',
        description: 'Your Campaigns, Perfectly in Sync.',
        cta: 'Organize campaigns'
    },
    {
        title: 'Content Performance Analytics',
        description: 'See what is resonating by creator, platform, and asset in real time so you can optimize without guesswork.',
        cta: 'View insights'
    },
    {
        title: 'Managed Services',
        description: 'Tap our expert team for white-glove execution when you need extra hands across strategy, sourcing, and reporting.',
        cta: 'Talk to experts',
        highlight: true
    }
]

export default function ProductShowcase() {
    return (
        <section id="product" className="relative overflow-hidden bg-gradient-to-b from-[#f2fbff] via-white to-[#fff3fb] py-24">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 left-1/4 h-48 w-48 rounded-full bg-[#7cf5f5]/40 blur-[140px]" />
                <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-[#ffd0ef]/50 blur-[160px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="uppercase text-xs tracking-[0.35em] text-[#11b6c7]">Platform Capabilities</p>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#0a1b33]">
                        Every Tool You Need, Built Into One Ripple
                    </h2>
                    <p className="mt-4 text-lg text-[#5d6c85]">
                        From campaign briefs to analytics, GrowRipple keeps your creator marketing team in one vertically integrated workspace.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {offerings.map((item) => (
                        <div
                            key={item.title}
                            className={`rounded-3xl border border-[#1bbfdb]/20 bg-white/80 p-6 shadow-[0_35px_80px_-40px_rgba(15,170,200,0.5)] backdrop-blur ${
                                item.highlight ? 'sm:col-span-2 lg:col-span-1 ring-2 ring-[#00c4ea]/40' : ''
                            }`}
                        >
                            <h3 className="text-xl font-semibold text-[#0a243a]">{item.title}</h3>
                            <p className="mt-3 text-sm text-[#5c6c82] leading-relaxed">{item.description}</p>
                            <button className="mt-5 text-sm font-semibold text-[#02b8ce] inline-flex items-center gap-2 hover:text-[#0083ff]">
                                {item.cta}
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
