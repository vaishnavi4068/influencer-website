"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type CardDef = {
  key: string;
  bg: string;
  iconBg: string;
  bulletColor: string;
  iconShape: string;
  title: string;
  bullets: string[];
  imageGradient: string;
  accentColor: string;
  isReversed: boolean;
};

type Props = {
  items: CardDef[];
  /** Navbar height in px (keeps cards pinned under it). Default 96. */
  topOffset?: number;
  /** Scroll distance (px) each card consumes before the next takes over. */
  stepPx?: number;
  /** Optional fixed sticky viewport height (px). By default uses (vh - topOffset). */
  heightPx?: number;
};

export default function StackedScroll({
  items,
  topOffset = 96,
  stepPx = 380,
  heightPx,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scrollLocal, setScrollLocal] = useState(0);
  const [reduced, setReduced] = useState(false);

  const stickyHeight = useMemo(() => {
    if (typeof window === "undefined" || heightPx) return heightPx ?? 600;
    return Math.max(320, window.innerHeight - topOffset);
  }, [heightPx, topOffset]);

  const totalScroll = useMemo(() => Math.max(1, items.length * stepPx), [items.length, stepPx]);
  const containerHeight = stickyHeight + totalScroll;

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const handler = () => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const startY = window.scrollY + rect.top;
        const st = Math.min(Math.max(window.scrollY - startY, 0), totalScroll);
        setScrollLocal(st);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [totalScroll]);

  return (
    <section ref={wrapRef} className="relative" style={{ height: containerHeight }}>
      <div className="sticky top-0 pointer-events-none" style={{ height: stickyHeight }}>
        <div className="relative h-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {items.map((card, i) => {
            const start = i * stepPx;
            const local = clamp01((scrollLocal - start) / stepPx);
            const z = 1000 - i;

            let opacity = 1, scale = 1, translateY = 0;
            if (!reduced) {
              if (local < 0.1) opacity = lerp(0, 1, local / 0.1);
              else if (local < 0.65) opacity = 1;
              else opacity = lerp(1, 0.4, (local - 0.65) / 0.35);

              const depthShrink = i * 0.008;
              if (local < 0.1) scale = lerp(0.96, 1.0, local / 0.1);
              else if (local < 0.65) scale = 1.0 - depthShrink;
              else scale = (1.0 - depthShrink) - lerp(0, 0.06, (local - 0.65) / 0.35);

              translateY = lerp(18, -6 - i * 2, local);
            }

            return (
              <div key={card.key} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: z }}>
                <div
                  className="pointer-events-auto w-full"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    transition: "transform 100ms linear, opacity 100ms linear",
                  }}
                >
                  <Card card={card} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: CardDef }) {
  return (
    <div className={`${card.bg} rounded-3xl p-8 md:p-12 overflow-hidden w-full shadow-2xl`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${card.isReversed ? "lg:flex-row-reverse" : ""}`}>
        {/* Visual */}
        <div className={`${card.isReversed ? "order-2 lg:order-1" : ""} relative`}>
          <div className="relative mb-6">
            <div className="relative inline-block">
              <div className={`w-48 h-48 md:w-64 md:h-64 rounded-xl bg-gradient-to-br ${card.imageGradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg border-4 border-white">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Center badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <div className={`absolute inset-0 ${card.iconBg} ${card.iconShape} shadow-lg`} />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="text-white text-2xl md:text-3xl font-bold">#</span>
                  </div>
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <path id="circle-text-path" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                    </defs>
                    <text className="fill-white font-bold text-[6px] uppercase">
                      <textPath href="#circle-text-path" startOffset="0%">CONNECT EVERYTHING • CONNECT EVERYTHING •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`${card.isReversed ? "lg:pr-8 order-1 lg:order-2" : "lg:pl-8"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{card.title}</h2>
          <ul className="space-y-4 mb-8 text-gray-700 text-lg">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`${card.bulletColor} mt-1.5`}>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/try-free" className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center">
              TRY FOR FREE
            </a>
            <a href="/book-demo" className="inline-block border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-center">
              BOOK A DEMO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* utils */
function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp01(t); }
