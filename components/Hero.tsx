import Link from 'next/link'
import { useRouter } from 'next/router';

const ArrowIcon = () => (
    <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
    </svg>
);

const CalendarIcon = () => (
    <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export default function Hero() {
    const router = useRouter();

    const handleLaunchCampaign = () => {
        router.push(`${process.env.NEXT_PUBLIC_INFLUENCER_SIGNUP_URL}/login?next=/campaigns/create`);
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#e9fbff] via-[#faffff] to-[#fff4e7] text-slate-900 pt-32 pb-28">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-10 h-96 w-96 bg-[#7beef5]/30 rounded-full blur-[150px]" />
                <div className="absolute -bottom-32 -left-16 h-[22rem] w-[22rem] bg-[#ffe8d1]/50 rounded-full blur-[190px]" />
            </div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-[#12b5c9]">
                    AI-Powered Creator Marketing
                </p>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-tight font-black">
                    <span className="block text-[#0a1b33] lg:whitespace-nowrap">
                        Where Every Creator
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0082ff] via-[#00c7d9] to-[#00d1a5] lg:whitespace-nowrap">
                        Partnership Starts a Ripple
                    </span>
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-[#66758c] leading-relaxed max-w-3xl mx-auto">
                    Find real creators. Run smarter campaigns. See results that matter--with AI at every step.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                    <button
                        onClick={handleLaunchCampaign}
                        className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00b7ff] via-[#00c9d0] to-[#00d8a1] px-10 py-4 text-lg font-semibold text-white shadow-[0_25px_50px_-25px_rgba(0,169,201,0.95)] transition-transform hover:translate-y-0.5"
                    >
                        Launch Campaign
                        <span className="transition-transform group-hover:translate-x-1">
                            <ArrowIcon />
                        </span>
                    </button>
                    <Link
                        href="/book-demo"
                        className="inline-flex items-center gap-3 rounded-full border border-[#05c3cc] bg-white/80 px-10 py-4 text-lg font-semibold text-[#0a758a] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.45)] transition hover:bg-white"
                    >
                        <CalendarIcon />
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    )
}
