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
        <section id="creators" className="relative overflow-hidden bg-gradient-to-b from-[#e6f8ff] via-white to-[#fff5ec] py-28">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-36 left-12 h-64 w-64 rounded-full bg-[#7feefa]/40 blur-[160px]" />
                <div className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-[#ffe0ce]/50 blur-[200px]" />
                <div className="absolute inset-x-10 top-20 h-32 rounded-full bg-white/30 blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/70 border border-[#c7f5ff] text-xs font-semibold uppercase tracking-[0.4em] text-[#0eaecb]">
                        Become a RippleMaker
                    </div>
                    <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black text-[#091e33] leading-tight">
                        AI-Powered for Content Creators & Influencers
                    </h2>
                    <p className="mt-4 text-lg text-[#51637c] leading-relaxed">
                        RippleMakers are creators inside our community. GrowRipple’s AI matches you with campaigns that fit your voice—so you create authentically and get paid fast.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-[32px] border border-[#13c6d6]/25 bg-white/90 backdrop-blur shadow-[0_45px_90px_-55px_rgba(11,150,180,0.7)] p-8">
                        <h3 className="text-2xl font-semibold text-[#072c44]">Why join (AI does the heavy lifting)</h3>
                        <ul className="mt-6 space-y-4 text-[#4f5f77]">
                            {whyJoin.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#00b7ff] to-[#00d8a1]" aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[32px] border border-[#13c6d6]/25 bg-white/90 backdrop-blur shadow-[0_45px_90px_-55px_rgba(11,150,180,0.7)] p-8">
                        <h3 className="text-2xl font-semibold text-[#072c44]">How it works</h3>
                        <ol className="mt-6 space-y-4 text-[#4f5f77] list-decimal list-inside">
                            {howItWorks.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-[32px] border border-[#12bed0]/15 bg-white/85 p-8">
                        <h3 className="text-xl font-semibold text-[#08334e]">Who it’s for</h3>
                        <ul className="mt-4 space-y-3 text-[#536179] list-disc list-inside">
                            {whoFor.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[32px] border border-[#12bed0]/15 bg-white/85 p-8">
                        <h3 className="text-xl font-semibold text-[#08334e]">What to expect</h3>
                        <ul className="mt-4 space-y-3 text-[#536179] list-disc list-inside">
                            {expectations.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 text-center">
                    <a
                        href="/influencer-signup"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00b7ff] via-[#00c9d0] to-[#00d8a1] px-12 py-4 text-lg font-semibold text-white shadow-[0_30px_60px_-35px_rgba(0,169,201,0.95)] hover:translate-y-0.5 transition-transform"
                    >
                        Signup for Creators
                    </a>
                </div>
            </div>
        </section>
    )
}
