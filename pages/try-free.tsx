import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function TryFreePage() {
  return (
    <>
      <Head>
        <title>Try for Free • Microdrive.Ai</title>
      </Head>
      <Layout hideHeader>
        <main className="min-h-screen flex items-center justify-center bg-white">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
            {/* Left: collage/mock grid */}
            <section className="order-2 lg:order-1">
              <div className="rounded-3xl border border-gray-100 p-4 md:p-6 bg-gradient-to-br from-purple-50 via-emerald-50 to-yellow-50">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-28 sm:h-32 md:h-36 rounded-2xl bg-white overflow-hidden ring-1 ring-black/5 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-purple-200/60 via-yellow-200/60 to-emerald-200/60" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Right: copy and actions */}
            <section className="order-1 lg:order-2 flex items-center">
              <div className="w-full">
                <h1 className="text-[30px] md:text-[42px] leading-tight font-serif text-gray-900">
                  Home of the everyday creator
                </h1>
                <p className="mt-4 text-gray-600 max-w-xl">
                  Discover your next favorite brands, create content, and earn perks — grow with a
                  community of thousands of creators.
                </p>

                <div className="mt-10">
                  <div className="text-xs tracking-widest text-gray-500 font-semibold">GET STARTED</div>
                  <div className="mt-4 space-y-3 max-w-sm">
                    <a
                      href="https://influencer-dev.microdrivedrillo.com/login/?next=/home/"
                      className="w-full inline-flex items-center justify-center rounded-full border-2 border-gray-200 px-6 py-3 text-gray-900 font-semibold hover:bg-purple-600 hover:text-white active:bg-purple-700 transition"
                    >
                      I'm an Influencer
                    </a>
                    <a
                      href="https://clientfrontend-dev.microdrivedrillo.com/login"
                      className="w-full inline-flex items-center justify-center rounded-full border-2 border-gray-200 px-6 py-3 text-gray-900 font-semibold hover:bg-purple-600 hover:text-white active:bg-purple-700 transition"
                    >
                      I'm with a Business
                    </a>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="text-xs tracking-widest text-gray-500 font-semibold">RETURNING USERS</div>
                  <div className="mt-4">
                    <Link
                      href="#"
                      className="inline-flex items-center text-purple-700 hover:text-purple-800 font-semibold underline underline-offset-4"
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


