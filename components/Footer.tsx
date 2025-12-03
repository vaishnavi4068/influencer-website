import Link from 'next/link'
import Image from 'next/image'
import GrowRippleLogo from '../Images/white-logo.png'
import InstaIcon from '../Images/insta.png'
import LinkedinIcon from '../Images/linkedin.png'
import FacebookIcon from '../Images/facebook (1).png'
import YoutubeIcon from '../Images/youtube.png'

const socialLinks = [
  { label: 'Instagram', icon: InstaIcon, href: '#' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: '#' },
  { label: 'Facebook', icon: FacebookIcon, href: '#' },
  { label: 'YouTube', icon: YoutubeIcon, href: '#' }
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-4">
          <Image
            src={GrowRippleLogo}
            alt="GrowRipple"
            width={320}
            height={120}
            className="h-14 w-auto"
            priority
          />
          <p className="text-sm text-white/80 leading-relaxed">
            AI-orchestrated creator partnerships that keep your brand authentic, measurable, and fast to market across every campaign.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="group">
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-full bg-white/10 p-1 transition group-hover:bg-white/30"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] bg-white/5 border border-white/10 p-5 shadow-[0_20px_40px_-35px_rgba(0,0,0,0.8)]">
          <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Stay in the loop</h4>
          <p className="mt-3 text-xs text-white/80">
            Get monthly updates on AI-powered creator marketing plus new GrowRipple features.
          </p>
          <form className="mt-4 flex flex-col gap-2.5">
            <input
              type="email"
              placeholder="your@email.com"
              className="rounded-full bg-white text-[#1ECAD3] px-4 py-2.5 text-sm font-semibold focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#1ECAD3] px-4 py-2.5 text-sm font-semibold shadow-[0_20px_40px_-30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3">
          <p>© {new Date().getFullYear()} GrowRipple. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
