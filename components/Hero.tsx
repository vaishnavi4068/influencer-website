import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative text-white pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Turn Influencers into a
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-yellow-400 to-purple-400">
                            Revenue Machine
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed">
                        Harness the power of AI to identify, connect, and collaborate with the right influencers
                        to amplify your brand and drive measurable results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/try-free"
                            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/book-demo"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-lg"
                        >
                            Watch Demo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
