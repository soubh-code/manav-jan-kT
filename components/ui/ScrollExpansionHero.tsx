"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CirclePlay, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionTag from "@/components/ui/SectionTag";

type ScrollExpansionHeroProps = {
  id: string;
  tagIcon: LucideIcon;
  tagLabel: string;
  backgroundSrc: string;
  backgroundAlt: string;
  videoSrc: string;
  posterSrc?: string;
  titleStart: string;
  titleEnd: string;
  accentLabel: string;
};

export default function ScrollExpansionHero({
  id,
  tagIcon,
  tagLabel,
  backgroundSrc,
  backgroundAlt,
  videoSrc,
  posterSrc,
  titleStart,
  titleEnd,
  accentLabel
}: ScrollExpansionHeroProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const maxProgress = shouldReduceMotion ? 1 : 0.78;
  const progressRange: number[] = [0, maxProgress];

  const mediaScale = useTransform(scrollYProgress, progressRange, [1, isMobile ? 1.2 : 1.72]);
  const mediaRadius = useTransform(scrollYProgress, progressRange, [32, isMobile ? 18 : 0]);
  const mediaY = useTransform(scrollYProgress, [0, maxProgress * 0.6, maxProgress], [18, 4, -18]);
  const headingY = useTransform(scrollYProgress, [0, maxProgress * 0.72], [0, -170]);
  const textOpacity = useTransform(scrollYProgress, [0, maxProgress * 0.45, maxProgress * 0.76], [1, 1, 0]);
  const tagOpacity = useTransform(scrollYProgress, [0, maxProgress * 0.35, maxProgress * 0.7], [1, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, maxProgress * 0.3, maxProgress * 0.65], [0.95, 0.85, 0]);
  const overlayOpacity = useTransform(scrollYProgress, progressRange, [0.46, 0.14]);
  const bgScale = useTransform(scrollYProgress, progressRange, [1.04, 1]);
  const bgBlur = useTransform(scrollYProgress, progressRange, ["0px", "2px"]);
  const tagY = useTransform(scrollYProgress, [0, maxProgress], [0, -28]);

  return (
    <section id={id} ref={sceneRef} className="relative h-[220vh] overflow-clip bg-ivory">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale, filter: bgBlur }}>
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,244,239,0.1),rgba(26,26,46,0.72))]"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/12 via-transparent to-midnight/36" />

        <motion.div
          className="absolute inset-x-0 top-8 z-30 px-6 md:top-10"
          style={{ opacity: tagOpacity, y: shouldReduceMotion ? 0 : tagY }}
        >
          <SectionTag icon={tagIcon}>{tagLabel}</SectionTag>
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-center justify-center px-5 md:px-10">
          <motion.div
            className="absolute inset-x-0 top-[8.6rem] z-30 mx-auto w-[min(58rem,90vw)] text-center md:top-[9.5rem]"
            style={{ y: headingY, opacity: textOpacity }}
          >
            <div className="mx-auto max-w-[56rem] rounded-[32px] border border-white/15 bg-midnight/24 px-6 py-7 shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-md md:px-10 md:py-9">
              <p
                className="font-heading text-base font-bold uppercase tracking-[0.28em] text-white md:text-lg"
                style={{
                  WebkitTextStroke: "1px #111111",
                  textShadow: "0 2px 10px rgba(0,0,0,0.35)"
                }}
              >
                {accentLabel}
              </p>
              <h2 className="mt-5 font-heading text-[clamp(2.8rem,5.7vw,6.1rem)] font-bold leading-[0.94] text-white">
                {titleStart}
                <span className="block text-amber-mjkt">{titleEnd}</span>
              </h2>
              <div className="pink-rule mx-auto mt-7" />
            </div>
          </motion.div>

          <motion.div
            className="relative z-20 mt-[12.5rem] aspect-[16/10] w-[min(86vw,24rem)] overflow-hidden border border-white/20 bg-black shadow-[0_32px_90px_rgba(0,0,0,0.38)] md:mt-[16rem] md:w-[min(46vw,48rem)]"
            style={{
              scale: mediaScale,
              borderRadius: mediaRadius,
              y: mediaY
            }}
          >
            <video
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/45 via-transparent to-midnight/10" />
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md md:left-6 md:top-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-mjkt text-white">
                <CirclePlay className="h-4 w-4 fill-white" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold">Impact In Motion</p>
                <p className="text-xs text-white/70">Real moments from the trust&apos;s journey</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-6 md:left-6 md:right-6">
              <div className="max-w-[18rem] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white/88 backdrop-blur-md">
                <p className="font-heading text-xs uppercase tracking-[0.26em] text-amber-light">
                  Community Story
                </p>
                <p className="mt-2 text-sm leading-6">
                  Service, recognition, and dignity captured in one expanding frame.
                </p>
              </div>
              <div className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md md:block">
                Scroll to expand
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md md:bottom-8"
          style={{ opacity: hintOpacity }}
        >
          <ArrowDown className="h-4 w-4" />
          Scroll to reveal our story
        </motion.div>
      </div>
    </section>
  );
}
