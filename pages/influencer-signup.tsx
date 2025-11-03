import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function InfluencerSignupPage() {
  return (
    <>
      <Head>
        <title>Sign up • Influencers | Microdrive.Ai</title>
      </Head>
      <Layout hideHeader>
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Signup form */}
            <section className="flex items-center order-1">
              <div className="w-full">
                <Link href="/" className="inline-flex items-center text-gray-700 hover:text-gray-900">
                  <span className="text-xl font-bold">Microdrive</span>
                  <span className="ml-1 text-xl text-gray-600">.Ai</span>
                </Link>

                <h1 className="mt-8 text-[26px] md:text-[34px] font-serif text-gray-900">Create a Free Account</h1>

                <form className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <input type="text" placeholder="Last name" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <div className="flex items-center rounded-xl border border-gray-200 px-3">
                      <span className="text-sm">+91</span>
                    </div>
                    <input type="tel" placeholder="Phone number" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <input type="email" placeholder="Work email address" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />

                  <input type="password" placeholder="Password" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />

                  <label className="flex items-start space-x-3 text-sm text-gray-600">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span>
                      I Agree the{' '}
                      <Link href="#" className="underline">
                        terms and conditions
                      </Link>
                      .
                    </span>
                  </label>

                  <button type="button" className="w-full rounded-xl bg-purple-600 text-white px-6 py-3 font-semibold hover:bg-purple-700 transition">
                    Sign up for free today!
                  </button>
                </form>

                <p className="mt-6 text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="#" className="font-semibold underline">
                    Sign in
                  </Link>
                </p>

                <div className="mt-6 text-xs text-gray-500 space-x-4">
                  <Link href="#" className="underline">Privacy Policy</Link>
                  <Link href="#" className="underline">Terms of Service</Link>
                </div>
              </div>
            </section>

            {/* Right: Testimonials */}
            <section className="order-2 hidden lg:block">
              <div className="space-y-6">
                <article className="rounded-2xl border border-gray-200 p-6">
                  <p className="text-gray-700 leading-relaxed">
                    "IMAI has been an invaluable partner... Their platform streamlines our influencer discovery process, and the team is a joy to work with."
                  </p>
                  <div className="mt-4">
                    <div className="font-semibold text-gray-900">Jerome Mahilum</div>
                    <div className="text-sm text-gray-500">Influencer Marketing Manager</div>
                  </div>
                </article>
                <article className="rounded-2xl border border-gray-200 p-6">
                  <p className="text-gray-700 leading-relaxed">
                    "We were struggling to find the right influencers for our niche... the team was there to guide us when we got stuck."
                  </p>
                  <div className="mt-4">
                    <div className="font-semibold text-gray-900">Rebecca Dearsley</div>
                    <div className="text-sm text-gray-500">Senior Brand & Influencer Executive</div>
                  </div>
                </article>
                <article className="rounded-2xl border border-gray-200 p-6">
                  <p className="text-gray-700 leading-relaxed">
                    "The team is a joy to work with. They’re always responsive, collaborative, and invested in our success."
                  </p>
                  <div className="mt-4">
                    <div className="font-semibold text-gray-900">Crispin Marketing Team</div>
                    <div className="text-sm text-gray-500">Crispin.com</div>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  )
}


