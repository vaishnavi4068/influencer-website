import Link from 'next/link'
import Image from 'next/image'
import InstagramShowcase from '../Images/instagram.jpg'
import SocialTexture from '../Images/social.jpg'
import ThirdImage from '../Images/third.jpg'
import FourthImage from '../Images/fourth.jpg'
import ManagerImage from '../Images/manager.jpg'

const offerings = [
    {
        title: 'AI-Powered Campaign Briefs',
        description: 'AI-Powered Campaign Briefs',
        cta: 'See how it works',
        href: '/ripple-briefs',
        image: SocialTexture
    },
    {
        title: 'Creator Discovery & Recruitment',
        description: ' Creator Discovery & Recruitment AI-matched, community-rooted creators—fast.',
        cta: 'Browse creators',
        href: '/ripple-match',
        image: InstagramShowcase
    },
    {
        title: 'Campaign Management',
        description: 'Your Campaigns, Perfectly in Sync.',
        cta: 'Organize campaigns',
        href: '/ripple-orbit',
        image: ThirdImage
    },
    {
        title: 'Content Performance Analytics',
        description: 'See what is resonating by creator, platform, and asset in real time so you can optimize without guesswork.',
        cta: 'View insights',
        image: FourthImage,
        href: '/ripple-axis'
    },
    {
        title: 'Managed Services',
        description: 'Tap our expert team for white-glove execution when you need extra hands across strategy, sourcing, and reporting.',
        cta: 'Talk to experts',
        highlight: true,
        image: ManagerImage,
        href: '/ripple-elite'
    }
]

export default function ProductShowcase() {
    return (
        <section id="product" className="relative overflow-hidden bg-[#1ECAD3] text-white py-24">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-8 flex justify-center gap-8">
                    <span className="w-14 h-14 border-t-4 border-[#FFD43B] rounded-full" />
                    <span className="w-14 h-14 border-t-4 border-[#FFD43B] rounded-full" />
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center px-5 py-2 mb-4 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs text-white/70 font-semibold">
                        Platform Capabilities
                    </div>
                    <h2 className="mt-6 text-3xl sm:text-4xl font-black">
                        Every Tool You Need, Built Into One Ripple
                    </h2>
                    <p className="mt-4 text-lg text-white/90">
                        From campaign briefs to analytics, GrowRipple keeps your creator marketing team in one vertically integrated workspace.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {offerings.map((item) => {
                        const isFlipCard = Boolean(item.image)
                        const wrapperClasses = item.highlight ? 'sm:col-span-2 lg:col-span-1' : ''

                        return (
                            <div key={item.title} className={wrapperClasses}>
                                {isFlipCard ? (
                                    <div className="group h-full [perspective:1200px]">
                                        <div className="relative h-full min-h-[320px] w-full rounded-[28px] border border-white/30 bg-white/10 shadow-[0_35px_80px_-45px_rgba(0,0,0,0.35)] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                            <div className="absolute inset-0 rounded-[28px] overflow-hidden [backface-visibility:hidden]">
                                                <Image
                                                    src={item.image!}
                                                    alt={`${item.title} inspiration`}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
                                                <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                                                    <h3 className="text-3xl font-black leading-tight whitespace-pre-line">
                                                        {item.title.replace(' & ', '\n')}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 rounded-[28px] border border-white/30 bg-gradient-to-br from-white via-[#f1f8ff] to-white backdrop-blur p-6 flex flex-col text-[#0c1a33] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                                <p className="mt-3 text-sm leading-relaxed flex-1 text-[#23354f]">{item.description}</p>
                                                {item.href ? (
                                                    <Link
                                                        href={item.href}
                                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a6a80] hover:text-[#0dc7e5]"
                                                    >
                                                        {item.cta}
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M5 12h14" />
                                                            <path d="M12 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                ) : (
                                                    <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a6a80] hover:text-[#0dc7e5]">
                                                        {item.cta}
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M5 12h14" />
                                                            <path d="M12 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`h-full rounded-[28px] border border-white/30 bg-white/10 p-6 shadow-[0_35px_80px_-45px_rgba(0,0,0,0.35)] backdrop-blur ${
                                            item.highlight ? 'ring-2 ring-white/40' : ''
                                        }`}
                                    >
                                        <h3 className="text-xl font-semibold">{item.title}</h3>
                                        <p className="mt-3 text-sm text-white/85 leading-relaxed">{item.description}</p>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FFD43B]"
                                            >
                                                {item.cta}
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14" />
                                                    <path d="M12 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ) : (
                                            <button className="mt-5 text-sm font-semibold text-white inline-flex items-center gap-2 hover:text-[#FFD43B]">
                                                {item.cta}
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14" />
                                                    <path d="M12 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
