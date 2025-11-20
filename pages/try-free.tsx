import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import GrowRippleLogo from '../Images/white-logo.png'

export default function TryFreePage() {
  return (
    <>
      <Head>
        <title>Try for Free | GrowRipple</title>
      </Head>
      <Layout hideHeader={true}>
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e7f9ff] via-white to-[#fff3ea]">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
            {/* Left: collage/mock grid */}
            <section className="order-2 lg:order-1">
              <div className="rounded-[36px] border border-[#bdeeff]/60 p-4 md:p-6 bg-gradient-to-br from-white via-[#f6fdff] to-white shadow-[0_45px_90px_-60px_rgba(0,144,180,0.6)]">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-28 sm:h-32 md:h-36 rounded-2xl bg-white overflow-hidden ring-1 ring-black/5 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#91dee8]/70 via-[#d4f9ff]/80 to-white" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Right: copy and actions */}
            <section className="order-1 lg:order-2 flex items-center">
              <div className="w-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={GrowRippleLogo}
                    alt="GrowRipple logo"
                    width={220}
                    height={90}
                    className="h-12 w-auto drop-shadow"
                    priority
                  />
                  <span className="text-sm font-semibold text-[#0ba2c4]">GrowRipple Access</span>
                </div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#0ba2c4] font-semibold">
                  Creator Access
                </p>
                <h1 className="mt-4 text-[30px] md:text-[44px] leading-tight font-black text-[#071d32]">
                  Home of the everyday creator
                </h1>
                <p className="mt-4 text-[#56647a] max-w-xl text-lg leading-relaxed">
                  Discover your next favorite brands, create content, and earn perks — grow with a
                  community of thousands of creators.
                </p>

                <div className="mt-10">
                  <div className="text-xs tracking-[0.5em] text-[#0aa2c5] font-semibold">GET STARTED</div>
                  <div className="mt-4 space-y-3 max-w-sm">
                    <a
                      href="https://influencer-dev.microdrivedrillo.com/login/?next=/home/"
                      className="w-full inline-flex items-center justify-center rounded-full border border-[#bdeeff] bg-white px-6 py-3 text-[#062f44] font-semibold shadow-[0_20px_45px_-30px_rgba(0,149,182,0.9)] hover:-translate-y-0.5 transition"
                    >
                      I'm an Influencer
                    </a>
                    <a
                      href="https://clientfrontend-dev.microdrivedrillo.com/login"
                      className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00b7ff] via-[#00c9d0] to-[#00d8a1] px-6 py-3 text-white font-semibold shadow-[0_25px_50px_-30px_rgba(0,169,201,0.95)] hover:translate-y-0.5 transition"
                    >
                      I'm with a Business
                    </a>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="text-xs tracking-[0.5em] text-[#0aa2c5] font-semibold">RETURNING USERS</div>
                  <div className="mt-4">
                    <Link
                      href="#"
                      className="inline-flex items-center text-[#086a83] hover:text-[#00a5c1] font-semibold underline underline-offset-4"
                    >
                      Sign in to your account
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  )
}


