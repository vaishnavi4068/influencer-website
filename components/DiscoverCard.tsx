import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'

type CardDef = {
  key: string
  bg: string
  iconBg: string
  bulletColor: string
  iconShape: string
  title: string
  bullets: string[]
  imageGradient: string
  accentColor: string
  isReversed: boolean
}

export default function DiscoverCard() {
  const features = [
    "Start for free, cancel anytime",
    "Unlimited guidance & support",
    "Cutting-edge AI features"
  ]

  const cards: CardDef[] = useMemo(() => ([
    {
      key: 'discover',
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-600',
      bulletColor: 'text-purple-600',
      iconShape: 'rounded-full',
      title: 'Discover Influencers',
      bullets: [
        "Use our award-winning AI to find the perfect influencer for your campaigns in minutes.",
        "Don't like relying solely on AI? You can use our in-depth data to make an even more informed decision."
      ],
      imageGradient: 'from-purple-200 to-purple-300',
      accentColor: 'purple-600',
      isReversed: false
    },
    {
      key: 'vet',
      bg: 'bg-pink-50',
      iconBg: 'bg-pink-500',
      bulletColor: 'text-pink-500',
      iconShape: 'rounded-lg',
      title: 'Vet & Recruit',
      bullets: [
        "Our unique AI will give you the right pricing for each influencer and send a personalized message with a brief created especially for them.",
        "It doesn't matter if you need one influencer or a thousand – with the help of our AI, you can also send personalized briefs in bulk."
      ],
      imageGradient: 'from-pink-200 to-pink-300',
      accentColor: 'pink-500',
      isReversed: true
    },
    {
      key: 'analyze',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-600',
      bulletColor: 'text-blue-600',
      iconShape: 'rounded-full',
      title: 'Analyze & Optimize',
      bullets: [
        "Track campaign performance with detailed analytics and ROI insights in real-time.",
        "Get AI-powered recommendations to optimize your influencer strategy and maximize results."
      ],
      imageGradient: 'from-blue-200 to-blue-300',
      accentColor: 'blue-600',
      isReversed: false
    }
  ]), [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Scroll-triggered stacked cards with per-card scroll tracking */}
        <div className="relative">
          {cards.map((card, index) => (
            <StackCard key={card.key} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StackCard({ card, index }: { card: CardDef, index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Track scroll progress for this card's section only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Animate in as the section enters, then keep pinned
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1])
  // Subtle upward translation to emphasize stacking
  const y = useTransform(scrollYProgress, [0, 1], [40, -10 * (index + 1)])

  return (
    <div ref={sectionRef} className={`relative `}>
      <motion.div
        className="sticky top-0 flex items-center justify-center px-4"
        style={{ zIndex: 10 + index, opacity, scale, y }}
      >
        <div className={`${card.bg} rounded-3xl p-8 md:p-12 overflow-hidden w-full max-w-6xl mx-auto shadow-2xl`}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${card.isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Visual Section */}
                    <div className={`relative ${card.isReversed ? 'order-2 lg:order-1' : ''}`}>
                      <div className="relative mb-6">
                        <div className="relative inline-block">
                          <div className={`w-48 h-48 md:w-64 md:h-64 rounded-xl bg-gradient-to-br ${card.imageGradient} relative overflow-hidden`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-32 h-32 text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg border-4 border-white">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-20 h-20 text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-20 h-20 md:w-24 md:h-24">
                              <div className={`absolute inset-0 ${card.iconBg} ${card.iconShape} shadow-lg`}></div>
                              <div className="absolute inset-0 flex items-center justify-center z-10">
                                <span className="text-white text-2xl md:text-3xl font-bold">#</span>
                              </div>
                              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <path id={`circle-text-path-${index}`} d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                                </defs>
                                <text className="fill-white font-bold text-[6px] uppercase">
                                  <textPath href={`#circle-text-path-${index}`} startOffset="0%">CONNECT EVERYTHING • CONNECT EVERYTHING •</textPath>
                                </text>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Text Section */}
                    <div className={`${card.isReversed ? 'lg:pr-8 order-1 lg:order-2' : 'lg:pl-8'}`}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 ${card.iconBg} ${card.iconShape} flex items-center justify-center`}>
                          <span className="text-white text-2xl font-bold">#</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{card.title}</h2>
                      </div>
                      <ul className="space-y-4 mb-8 text-gray-700 text-lg">
                        {card.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-3">
                            <span className={`${card.bulletColor} mt-1.5`}>•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/try-free" className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center">TRY FOR FREE</Link>
                        <Link href="/book-demo" className="inline-block border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-center">BOOK A DEMO</Link>
                      </div>
                    </div>
                  </div>
        </div>
      </motion.div>
    </div>
  )
}