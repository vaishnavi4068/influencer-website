const plans = ['RippleStart', 'RippleGrow', 'RipplePro', 'RippleElite'];

const rows = [
    { feature: 'Price (Monthly / Annual)', values: ['$149 / $119', '$399 / $319', '$799 / $639', 'Custom'], emphasis: true },
    { feature: 'RippleBriefs™ — AI Briefs / mo', values: ['5', '20', '60', 'Unlimited*'] },
    { feature: 'RippleMatch™ — AI Creator Profiles / mo', values: ['25', '150', '500', 'Unlimited*'] },
    { feature: 'Active Shortlists (via RippleMatch™)', values: ['2', '6', '15', 'Unlimited'] },
    { feature: 'RippleOrbit™ — Workspaces', values: ['1', '3', '8', 'Custom'] },
    { feature: 'RippleOrbit™ — Approvals & Roles', values: ['Basic', 'Advanced', 'Role-based + SSO', 'Enterprise controls'] },
    { feature: 'RippleAxis™ — Unified Content & KPIs', values: ['Core (create/approve/publish)', 'Standard (benchmarks)', 'Advanced (governance & SSO)', 'Enterprise (custom policies)'] },
    { feature: 'RipplePulse™ — Analytics', values: ['Core KPIs', 'Benchmarks + exports', 'Advanced + UTM/Redemptions†', 'Custom + API'] },
    { feature: 'RippleLibrary™ — Assets & Rights', values: ['—', '✓', '✓', '✓'] },
    { feature: 'RippleActivate™ — Channel Push (Meta/TikTok, site)', values: ['—', '—', '✓', '✓'] },
    { feature: 'Contracts & Payouts (in RippleOrbit™)', values: ['✓', '✓', '✓', '✓'] },
    { feature: 'Support', values: ['Email', 'Priority Email', 'SLA + Chat', 'Dedicated CSM'] },
    { feature: 'Who it’s for', values: ['First campaigns, local tests', 'Multi-location & steady content', 'High volume & deep reporting', 'Governance, scale, security'] },
    { feature: 'Typical use', values: ['3-creator pilot', '6-creator monthly', '10+ creators, multi-market', 'Multi-brand/global'] },
    { feature: 'Time to launch', values: ['7–10 days', '7–10 days', '7–10 days (rush avail.)', 'Tailored SLAs'] },
    { feature: 'Data access', values: ['CSV exports', 'CSV / PDF exports', 'Exports + UTM data', 'API + custom dashboards'] }
];

const planStyles = [
    { bg: 'bg-[#e9fbff]/70', text: 'text-[#073554]' },
    { bg: 'bg-[#ecfffa]/70', text: 'text-[#064d43]' },
    { bg: 'bg-[#f3f8ff]/70', text: 'text-[#0b3354]' },
    { bg: 'bg-[#fdf7ff]/70', text: 'text-[#3a2659]' }
];

export default function PricingSection() {
    return (
        <section id="pricing" className="relative overflow-hidden bg-gradient-to-b from-[#e6faff] via-white to-[#fff4e6] py-24">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 right-10 h-64 w-64 rounded-full bg-[#8debf3]/50 blur-[150px]" />
                <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#ffe4ce]/45 blur-[200px]" />
            </div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="uppercase text-xs tracking-[0.35em] text-[#11b5c8]">Pricing</p>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#071d32]">GrowRipple Plans at a Glance</h2>
                    <p className="mt-4 text-lg text-[#5f6d85]">
                        Simple plans powered by Ripple products. Upgrade any time.
                    </p>
                </div>

                <div className="mt-12 rounded-[40px] border border-[#8feeff]/40 bg-gradient-to-b from-white via-[#f9feff] to-white shadow-[0_45px_90px_-55px_rgba(11,150,180,0.7)] overflow-hidden relative">
                    <div className="absolute inset-x-10 -top-4 h-12 rounded-full bg-gradient-to-r from-[#00b7ff] via-[#00c9d0] to-[#00d8a1] blur-lg opacity-50 pointer-events-none" />
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-sm text-[#344356] font-medium">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#e9fbff] to-[#f6fdff] text-[#08283f]">
                                    <th scope="col" className="py-5 px-5 text-left font-semibold text-sm uppercase tracking-wide">Feature / Differentiator</th>
                                    {plans.map((plan) => (
                                        <th key={plan} scope="col" className="py-5 px-5 text-right font-black text-[#071d32] text-base">
                                            {plan}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={row.feature} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#f9fbfd]'}`}>
                                        <th scope="row" className="py-3.5 px-5 text-left font-semibold text-[#10253b] align-top">
                                            {row.feature}
                                        </th>
                                        {row.values.map((value, index) => (
                                            <td
                                                key={`${row.feature}-${plans[index]}`}
                                                className="py-3.5 px-5 text-right align-top"
                                            >
                                                <span
                                                    className={`inline-flex min-w-[110px] justify-end rounded-2xl px-3 py-2 ring-1 ring-transparent shadow-sm ${planStyles[index].bg} ${
                                                        row.emphasis ? 'font-semibold text-[#071d32]' : `${planStyles[index].text}`
                                                    }`}
                                                >
                                                    {value === '✓' ? (
                                                        <span className="text-emerald-500 text-lg font-bold">✓</span>
                                                    ) : value === '—' ? (
                                                        <span className="text-slate-400">—</span>
                                                    ) : (
                                                        value
                                                    )}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col gap-3 border-t border-[#e1f5fb] bg-white/90 px-6 py-5 text-xs text-[#6a778d] sm:flex-row sm:items-center sm:justify-between">
                        <p>* Fair-use limits apply.</p>
                        <p>† UTM/redemption tracking where supported.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
