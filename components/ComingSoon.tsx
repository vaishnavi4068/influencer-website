import Link from 'next/link'

interface ComingSoonProps {
  headline?: string
  subtext?: string
}

export default function ComingSoon({
  headline = 'A new ripple is warming up backstage.',
  subtext = "We're building the next experience for creators and brands - stay tuned."
}: ComingSoonProps) {
  return (
    <section className="relative min-h-screen bg-[#1ECAD3] text-white overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-12 w-36 h-36 rounded-full bg-[#00d0c2]/30 blur-[90px]" />
        <div className="absolute bottom-14 right-16 w-52 h-52 rounded-full bg-[#1ECAD3]/40 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
        <div className="flex justify-start">
          <Link
            href="/try-free"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 hover:bg-white/20 transition"
          >
            Back
          </Link>
        </div>

        <div className="space-y-4 pt-6">
          <p className="text-sm uppercase tracking-[0.5em] text-[#FFD43B] animate-pulse">Coming Soon</p>
          <h1 className="text-4xl sm:text-5xl font-black leading-snug animate-fade-in">{headline}</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">{subtext}</p>
        </div>
      </div>

      <div className="arc arc1" />
      <div className="arc arc2" />
      <div className="arc arc3" />
      <style jsx>{`
        .arc {
          position: absolute;
          border: 4px solid rgba(255, 212, 59, 0.35);
          border-radius: 9999px;
          animation: ripple 6s infinite ease-out;
        }
        .arc1 {
          width: 260px;
          height: 260px;
          top: 10%;
          left: -60px;
          animation-delay: 0s;
        }
        .arc2 {
          width: 420px;
          height: 420px;
          bottom: -80px;
          right: -60px;
          animation-delay: 1.5s;
        }
        .arc3 {
          width: 540px;
          height: 540px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.2;
          animation-delay: 3s;
        }
        @keyframes ripple {
          0% {
            transform: scale(0.9);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.35;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
