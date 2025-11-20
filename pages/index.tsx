import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import BrandMarquee from '../components/BrandMarquee'
import ProductShowcase from '../components/ProductShowcase'
import CreatorSection from '../components/CreatorSection'
import PricingSection from '../components/PricingSection'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>GrowRipple.Ai</title>
        <meta name="description" content="A modern influencer marketing platform built with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="relative min-h-screen">
          {/* Background with blurred image effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10">
            <Hero />
            <ProductShowcase />
            <BrandMarquee />
            <CreatorSection />
            <PricingSection />
            <Features />
            <Footer />
          </div>
        </div>
      </Layout>
    </>
  )
}
