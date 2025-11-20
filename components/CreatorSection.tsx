const whyJoin = [
    'Smart matching: AI finds campaigns that fit your style, city, and community.',
    'Clear briefs in minutes: AI-generated pointers reduce back-and-forth.',
    'Real opportunities: Local + niche brands your audience already love.',
    'Fast, reliable payouts: Simple terms, no surprises.'
];

const howItWorks = [
    'Apply (free): Share your handles, city, and niche.',
    'Get matched: AI recommends campaigns—browse and tap Interested.',
    'Create & submit: Follow the brief, post in your style, upload deliverables.',
    'Get paid: Approvals → payout. Easy.'
];

const whoFor = [
    'Content creators & influencers of all sizes (nano, micro, local).',
    'Creators with real community engagement (meaningful comments, saves).'
];

const expectations = [
    'Your voice stays yours—no stiff scripts.',
    'Clear, opt-in usage terms.',
    'Friendly support when you need it.'
];

export default function CreatorSection() {
    return (
        <section id="creators" className="relative overflow-hidden bg-[#1ECAD3] py-28 text-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-12 flex justify-center gap-8">
                    <span className="w-16 h-16 border-t-4 border-[#FFD43B] rounded-full" />
                    <span className="w-16 h-16 border-t-4 border-[#FFD43B] rounded-full" />
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <div className=" mt-3 inline-flex items-center px-5 py-2 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-[0.4em]">
                        Become a RippleMaker
                    </div>
                    <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                        Become a RippleMaker
                    </h2>
                    <p className="mt-2 text-lg text-white/80">
                        AI-Powered for Content Creators & Influencers
                    </p>
                    <p className="mt-4 text-lg text-white/80 leading-relaxed">
                        RippleMakers are creators inside our community. GrowRipple’s AI matches you with campaigns that fit your voice—so you create authentically and get paid fast.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-[32px] border border-white/30 bg-white/10 backdrop-blur p-8 shadow-[0_45px_90px_-45px_rgba(0,0,0,0.3)]">
                        <h3 className="text-2xl font-semibold">Why join (AI does the heavy lifting)</h3>
                        <ul className="mt-6 space-y-4 text-white/90">
                            {whyJoin.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FFD43B]" aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[32px] border border-white/30 bg-white/10 backdrop-blur p-8 shadow-[0_45px_90px_-45px_rgba(0,0,0,0.3)]">
                        <h3 className="text-2xl font-semibold">How it works</h3>
                        <ol className="mt-6 space-y-4 text-white/90 list-decimal list-inside">
                            {howItWorks.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-[32px] border border-white/30 bg-white/10 backdrop-blur p-8">
                        <h3 className="text-xl font-semibold">Who it’s for</h3>
                        <ul className="mt-4 space-y-3 text-white/90 list-disc list-inside">
                            {whoFor.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[32px] border border-white/30 bg-white/10 backdrop-blur p-8">
                        <h3 className="text-xl font-semibold">What to expect</h3>
                        <ul className="mt-4 space-y-3 text-white/90 list-disc list-inside">
                            {expectations.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 text-center">
                    <a
                        href="/influencer-signup"
                        className="inline-flex items-center justify-center rounded-full bg-white text-[#1ECAD3] px-12 py-4 text-lg font-semibold shadow-[0_30px_60px_-35px_rgba(0,0,0,0.4)] hover:translate-y-0.5 transition-transform"
                    >
                        Try GrowRipple AI
                    </a>
                </div>
            </div>
        </section>
    )
}
