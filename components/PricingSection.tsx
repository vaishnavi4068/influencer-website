const plans = ['RippleStart', 'RippleGrow', 'RipplePro', 'RippleElite']

const rows = [
  { feature: 'Price', values: ['$149', '$399', '$799', 'Custom'], emphasis: true },
  { feature: 'Active Campaigns', values: ['1', '5', '10', 'Custom'] },
  { feature: 'RippleMakers per Campaign', values: ['1', '2', '5', 'Custom'] },
  { feature: 'Performance Reports', values: ['Basic Reports', 'Standard Reports', 'Advanced Reports', 'Full Custom Reporting'] },
  { feature: 'Support', values: ['Email', 'Priority Email', 'SLA + Chat', 'Dedicated CSM'] }
]

const planStyles = [
  'from-[#FFB347] via-[#FFCC33] to-[#FF5E7E]',
  'from-[#36F3C2] via-[#1ADBC1] to-[#00AEEF]',
  'from-[#9F8CFF] via-[#7A5CFF] to-[#5F2EEA]',
  'from-[#FF8BA7] via-[#FF5E7E] to-[#FF2E63]'
]

const planCards = plans.map((plan, index) => ({
  name: plan,
  price: rows[0].values[index],
  features: rows.slice(1).map((row) => ({
    label: row.feature,
    value: row.values[index]
  })),
  accent: planStyles[index]
}))

export default function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#1ECAD3] text-white py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-8 flex justify-center gap-8">
          <span className="w-14 h-14 border-t-4 border-[#FFD43B] rounded-full" />
          <span className="w-14 h-14 border-t-4 border-[#FFD43B] rounded-full" />
        </div>
        <div className="absolute -bottom-24 right-6 h-72 w-72 rounded-full bg-white/15 blur-[150px]" />
        <div className="absolute -top-24 left-4 h-72 w-72 rounded-full bg-[#00f1ff]/15 blur-[150px]" />
      </div>
      <div className="relative w-full max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/40 bg-white/10 uppercase tracking-[0.35em] text-xs font-semibold">
            Pricing Plans
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl font-black leading-tight">GrowRipple Plans at a Glance</h2>
          <p className="mt-4 text-lg text-white/85">Simple plans powered by Ripple products. Upgrade any time.</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {planCards.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-[40px] bg-[#031524] text-white shadow-[0_45px_90px_-55px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border border-white/10"
            >
              <div className="relative bg-gradient-to-b from-[#031524] to-[#02101b] px-6 pt-9 pb-16 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Per Month</p>
                <h3 className="mt-3 text-2xl font-black">{plan.name}</h3>
                <div className="mt-4 inline-flex items-center gap-1 text-4xl font-black">
                  <span>{plan.price}</span>
                </div>
                <div className="absolute inset-x-8 -bottom-8 h-16">
                  <div className={`absolute inset-0 rounded-b-[50px] bg-gradient-to-r ${plan.accent}`} />
                  <div className="absolute inset-x-4 bottom-0 h-6 bg-white rounded-t-full" />
                </div>
              </div>
              <div className="flex-1 px-6 pt-12 pb-8 text-left text-white">
                <ul className="space-y-4 text-sm">
                  {plan.features.map((feature) => (
                    <li key={`${plan.name}-${feature.label}`} className="flex items-start gap-3">
                      <span className={`mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r ${plan.accent}`} />
                      <div className="flex items-center gap-6 w-full">
                        <p className="font-semibold flex-1 text-sm leading-tight text-white/90">{feature.label}</p>
                        <p className="text-white/70 font-semibold whitespace-nowrap flex-shrink-0 min-w-[80px] text-right text-xs leading-tight">
                          {feature.value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <a
                  href="/book-demo"
                  className="block text-center rounded-full px-5 py-3 font-semibold text-[#031524] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)] bg-white"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
