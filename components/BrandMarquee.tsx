export default function BrandMarquee() {
    const brands = [
        'ESTRID',
        'PRETTYLITTLETHING',
        'SAMSUNG',
        'catrice COSMETICS',
        'boohooMAN',
        'Budweiser',
        'Lufthansa',
        'NIKE',
        'ADIDAS',
        'COCA-COLA',
        'APPLE',
        'MICROSOFT'
    ]

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Background with blurred shapes */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200 rounded-full blur-2xl opacity-20"></div>
            </div>

            <div className="relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Meet Influencer Marketing AI
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Trusted by leading brands worldwide
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative">
                    <div className="flex overflow-hidden">
                        {/* First set of brands */}
                        <div className="flex animate-marquee whitespace-nowrap">
                            {brands.map((brand, index) => (
                                <div
                                    key={`first-${index}`}
                                    className="flex items-center mx-8 text-2xl font-bold text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    {brand}
                                </div>
                            ))}
                        </div>

                        {/* Second set of brands for seamless loop */}
                        <div className="flex animate-marquee whitespace-nowrap">
                            {brands.map((brand, index) => (
                                <div
                                    key={`second-${index}`}
                                    className="flex items-center mx-8 text-2xl font-bold text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
