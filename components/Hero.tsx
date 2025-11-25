import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import GrowRippleLogo from '../Images/white-logo.png'

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
        // router.push('/coming-soon');
    }

    return (
        <section className="relative overflow-hidden bg-[#1ECAD3] text-white pt-32 pb-28" style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif" }}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-12 flex justify-center gap-8">
                    <span className="w-20 h-20 border-t-4 border-[#FFD43B] rounded-full" />
                    <span className="w-20 h-20 border-t-4 border-[#FFD43B] rounded-full" />
                </div>
               
            </div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center mb-6">
                    <Image
                        src={GrowRippleLogo}
                        alt="GrowRipple logo"
                        width={320}
                        height={160}
                        className="h-32 w-auto drop-shadow"
                        priority
                    />
                </div>
                <div className="inline-flex items-center px-5 py-2 mb-4 mt-8 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs sm:text-sm text-white/80 font-semibold">
                    AI-Powered Creator Marketing
                </div>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-tight font-black drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]">
                    <span className="block lg:whitespace-nowrap text-white">
                        Where Every Creator
                    </span>
                    <span className="block lg:whitespace-nowrap text-white tracking-[0.05em]">
                        Partnership Starts a Ripple
                    </span>
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                    Find real creators. Run smarter campaigns. See results that matter— with AI at every step.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                    <button
                        onClick={handleLaunchCampaign}
                        className="group inline-flex items-center justify-center gap-3 rounded-full bg-white text-[#1ECAD3] px-10 py-4 text-lg font-semibold shadow-[0_25px_50px_-25px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
                    >
                        Launch Campaign
                        <span className="transition-transform group-hover:translate-x-1">
                            <ArrowIcon />
                        </span>
                    </button>
                    <Link
                        href="/book-demo"
                        className="inline-flex items-center gap-3 rounded-full bg-white text-[#1ECAD3] px-10 py-4 text-lg font-semibold shadow-[0_25px_50px_-25px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
                    >
                        <span className="text-[#1ECAD3]">
                            <CalendarIcon />
                        </span>
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    )
}
