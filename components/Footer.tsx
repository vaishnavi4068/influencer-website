import Link from 'next/link'
import Image from 'next/image'
import GrowRippleLogo from '../Images/white-logo.png'
import InstaIcon from '../Images/insta.png'
import LinkedinIcon from '../Images/linkedin.png'
import FacebookIcon from '../Images/facebook (1).png'
import YoutubeIcon from '../Images/youtube.png'

const socialLinks = [
  { label: 'Instagram', icon: InstaIcon, href: 'https://www.instagram.com/growripple.ai/' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: '#' },
  { label: 'Facebook', icon: FacebookIcon, href: '#' },
  { label: 'YouTube', icon: YoutubeIcon, href: '#' }
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <div className="space-y-4">
          <Image
            src={GrowRippleLogo}
            alt="GrowRipple"
            width={320}
            height={120}
            className="h-14 w-auto"
            priority
          />
          <p className="text-sm text-white/80">
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
