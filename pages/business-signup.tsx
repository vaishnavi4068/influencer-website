import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function BusinessSignupPage() {
  return (
    <>
      <Head>
        <title>Partner With Us • Microdrive.Ai</title>
      </Head>
      <Layout>
        <main className="min-h-screen bg-white pt-20 md:pt-28">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
            {/* Left: headline and copy */}
            <section className="flex items-start">
              <div className="w-full max-w-xl">
                <h1 className="text-[30px] md:text-[42px] leading-tight font-serif text-gray-900">
                  from the aisle to the algorithm, get seen where it counts.
                </h1>
                <p className="mt-5 text-gray-600">
                  Microdrive is built for creator-powered retail growth. We help CPG and consumer brands:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                  <li>activate everyday creators near your key retailers and cities</li>
                  <li>generate authentic, on-brand UGC that’s ready to use</li>
                  <li>drive momentum without draining your team’s bandwidth</li>
                </ul>
                <p className="mt-6 text-gray-700">
                  Book a call and see how everyday creators can fuel your next big retail moment.
                </p>

                <div className="mt-8">
                  <Link href="/try-free" className="text-purple-700 hover:text-purple-800 font-semibold underline underline-offset-4">
                    Back to getting started
                  </Link>
                </div>
              </div>
            </section>

            {/* Right: form */}
            <section>
              <div className="rounded-3xl border border-gray-100 bg-emerald-50/50 p-5 md:p-6 lg:p-8">
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name<span className="text-red-500">*</span></label>
                      <input type="text" className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input type="text" className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name<span className="text-red-500">*</span></label>
                      <input type="text" className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500" placeholder="Acme Brands" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Work Email<span className="text-red-500">*</span></label>
                      <input type="email" className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500" placeholder="jane@acme.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">What category are you in?<span className="text-red-500">*</span></label>
                    <select className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <option>Home / Consumer Electronics</option>
                      <option>Food & Beverage</option>
                      <option>Beauty & Personal Care</option>
                      <option>Health & Wellness</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">How are your products currently distributed?<span className="text-red-500">*</span></label>
                    <select className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <option>Select/Local Retailers</option>
                      <option>Regional Retailers</option>
                      <option>National Retailers</option>
                      <option>DTC / eCommerce Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upcoming expansion plans in the Midwest/Southern U.S.?<span className="text-red-500">*</span></label>
                    <textarea className="mt-1 w-full rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500" rows={3} placeholder="Tell us about your retail goals and timelines" />
                  </div>

                  <p className="text-xs text-gray-600">Please complete required fields. By submitting, you agree to receive information and updates from Microdrive. See our <a className="underline" href="#">Privacy Statement</a>.</p>

                  <div className="pt-2">
                    <button type="button" className="inline-flex items-center rounded-full bg-purple-600 text-white px-6 py-3 font-semibold hover:bg-purple-700 transition">
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  )
}


