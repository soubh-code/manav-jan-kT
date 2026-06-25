"use client";

import Image from "next/image";
import { type MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type MediaCard = {
  type: "image" | "video";
  src: string;
  alt: string;
  className: string;
  scale: number;
  fadeStart?: number;
  fadeEnd?: number;
};

type ZoomParallaxAboutProps = {
  cards: MediaCard[];
};

function ParallaxCard({
  card,
  reduceMotion,
  scrollYProgress
}: {
  card: MediaCard;
  reduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const isVideo = card.type === "video";
  const scale = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    [1, reduceMotion ? 1 : card.scale, reduceMotion ? 1 : card.scale]
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, card.fadeStart ?? 0.5, card.fadeEnd ?? 0.76, 1],
    [1, 0.92, 0, 0]
  );
  const opacity = isVideo || reduceMotion ? 1 : imageOpacity;
  const videoGlow = useTransform(scrollYProgress, [0, 0.58, 1], [0.22, 0.4, 0.64]);

  return (
    <motion.div
      data-about-card-shell=""
      style={{ scale, opacity }}
      className={`absolute inset-0 flex items-center justify-center will-change-transform ${
        isVideo ? "z-30" : "z-10"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.5rem] border border-white/18 bg-white/8 shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-sm ${card.className}`}
      >
        {isVideo ? (
          <motion.div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle,rgba(239,159,39,0.36),transparent_62%)] blur-3xl"
            style={{ opacity: videoGlow }}
          />
        ) : null}
        {isVideo ? (
          <video
            data-about-card=""
            data-kind="video"
            src={card.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            aria-label={card.alt}
          />
        ) : (
          <Image
            data-about-card=""
            data-kind="image"
            src={card.src}
            alt={card.alt}
            fill
            sizes="(min-width: 1280px) 34vw, (min-width: 768px) 44vw, 86vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/34 via-transparent to-white/6" />
      </div>
    </motion.div>
  );
}

export default function ZoomParallaxAbout({ cards }: ZoomParallaxAboutProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backdropOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.2, 0.36, 0.58]);

  return (
    <div ref={containerRef} data-zoom-stage="" className="relative h-[340vh] bg-midnight">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,159,39,0.28),transparent_34%),linear-gradient(135deg,rgba(212,83,126,0.18),rgba(55,138,221,0.13),rgba(29,158,117,0.16))]"
          style={{ opacity: backdropOpacity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,239,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(247,244,239,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

        {cards.map((card, index) => (
          <ParallaxCard
            key={`${card.src}-${index}`}
            card={card}
            reduceMotion={Boolean(reduceMotion)}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
