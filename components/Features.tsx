import DiscoverCard from './DiscoverCard'

export default function Features() {
    const features = [
        {
            title: 'Fast & Modern',
            description: 'Built with Next.js for optimal performance and modern web standards.',
            icon: '⚡'
        },
        {
            title: 'Responsive Design',
            description: 'Looks great on all devices with mobile-first responsive design.',
            icon: '📱'
        },
        {
            title: 'SEO Optimized',
            description: 'Static generation ensures fast loading and great SEO performance.',
            icon: '🔍'
        },
        {
            title: 'Easy to Deploy',
            description: 'Export as static files and deploy anywhere with ease.',
            icon: '🚀'
        }
    ]

    return (
        <>
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Microdrive?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience the power of modern web development with our carefully crafted features.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Discover Influencers Card */}
            <DiscoverCard />
        </>
    )
}
