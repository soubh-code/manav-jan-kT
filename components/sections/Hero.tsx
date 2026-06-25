"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Eye,
  HandHeart,
  Heart,
  ShieldCheck,
  Soup,
  UserRoundCheck,
  Users
} from "lucide-react";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";

const stats = [
  { icon: Users, value: "25K+", label: "Families Supported", caption: "Across 12 States", color: "pink" as const },
  { icon: UserRoundCheck, value: "3,200+", label: "Volunteers", caption: "Driving Change", color: "blue" as const },
  { icon: Soup, value: "1.2M+", label: "Meals Served", caption: "With Dignity", color: "amber" as const },
  { icon: Building2, value: "150+", label: "Projects Active", caption: "Education, Health & More", color: "green" as const },
  { icon: ShieldCheck, value: "80G", label: "Certified", caption: "Tax Benefits", color: "green" as const },
  { icon: Users, value: "Trusted", label: "& Transparent", caption: "100% Accountability", color: "blue" as const },
  { icon: ShieldCheck, value: "Secure", label: "Donations", caption: "Safe & Reliable", color: "amber" as const }
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section id="home" className="watercolor-bg relative min-h-dvh overflow-hidden pt-20 max-md:pt-[76px]">
      <div className="section-shell flex min-h-[calc(100dvh-5rem)] flex-col justify-between gap-8 pb-4 pt-4 max-md:min-h-0 max-md:gap-6 max-md:pb-7 max-md:pt-8 lg:gap-10">
        <div className="relative isolate grid items-center gap-8 max-md:gap-3 xl:gap-12 lg:grid-cols-[0.51fr_0.49fr]">
          <motion.div
            className="relative z-20"
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <h1 className="display-title max-w-[860px] max-md:text-[clamp(1.95rem,8.2vw,2.75rem)] max-md:leading-[1.05]">
              <span className="block max-md:whitespace-nowrap lg:whitespace-nowrap">Together, We Build</span>
              <span className="block h-1 max-md:hidden" aria-hidden="true" />
              <span className="block max-md:whitespace-nowrap lg:whitespace-nowrap">Stronger Communities</span>
              <span className="block h-1 max-md:hidden" aria-hidden="true" />
              <span className="block max-md:whitespace-nowrap lg:whitespace-nowrap">
                and <span className="text-amber-mjkt">Brighter Futures.</span>
              </span>
            </h1>
            <div className="pink-rule mt-5 max-md:mt-3 max-md:h-0.5 max-md:w-10" />
            <p className="mt-5 max-w-[640px] text-[1.04rem] leading-8 text-midnight/80 max-md:mt-3 max-md:text-[0.86rem] max-md:leading-5 xl:max-w-[620px]">
              Manav Jan Kalyan Trust works across food support, quality education,
              healthcare, dignity, and community upliftment—empowering people to
              live with hope and build a better tomorrow.
            </p>
            <Button
              href="/donate"
              variant="amber"
              className="mt-7 h-[4.35rem] w-full max-w-[660px] rounded-2xl px-7 text-[1.15rem] shadow-mjkt max-md:hidden"
            >
              <HandHeart className="h-8 w-8" />
              Add Colors to Their Lives
              <ArrowRight className="ml-auto h-8 w-8" />
            </Button>
            <div className="mt-6 flex flex-wrap gap-4 max-md:hidden">
              <Button href="/donate" variant="donate" className="h-12 px-6 text-base">
                <Heart className="h-4 w-4" /> Donate Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#contact" variant="volunteer" className="h-12 px-6 text-base">
                <Users className="h-4 w-4" /> Become a Volunteer
              </Button>
              <Button href="#projects" variant="outline" className="h-12 px-6 text-base">
                <Eye className="h-4 w-4" /> View Projects
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative z-10 min-h-[360px] overflow-visible max-md:-my-1 max-md:min-h-[300px] sm:max-md:min-h-[350px] lg:min-h-[470px] xl:min-h-[560px] 2xl:min-h-[610px]"
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
          >
            <div className="absolute inset-x-4 inset-y-8 rounded-[46%] bg-amber-light/70 blur-3xl max-md:hidden" />
            <div className="absolute inset-0 scale-[1.08] rounded-[42%] bg-white/20 blur-[62px] max-md:hidden" />
            <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_58%,transparent_92%)] max-md:[mask-image:radial-gradient(ellipse_at_center,black_48%,rgba(0,0,0,0.86)_66%,transparent_88%)]">
              <Image
                src="/images/hero-image.png"
                alt="Colored ink splash collage of students, children, and food support work"
                fill
                priority
                sizes="(min-width: 1536px) 900px, (min-width: 1280px) 820px, (min-width: 1024px) 52vw, 92vw"
                className="scale-[1.34] object-contain object-center blur-[1.2px] max-md:scale-[1.18] max-md:opacity-75 max-md:mix-blend-multiply lg:translate-x-3 xl:scale-[1.4] 2xl:scale-[1.46]"
              />
            </div>
            <Image
              src="/images/hero-image.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1536px) 900px, (min-width: 1280px) 820px, (min-width: 1024px) 52vw, 92vw"
              className="scale-[1.34] object-contain object-center max-md:scale-[1.18] max-md:opacity-95 max-md:mix-blend-multiply lg:translate-x-3 xl:scale-[1.4] 2xl:scale-[1.46]"
            />
          </motion.div>
          <div className="relative z-20 grid gap-3 md:hidden">
            <Button
              href="/donate"
              variant="amber"
              className="h-14 w-full rounded-2xl px-4 text-[1.05rem] shadow-mjkt"
            >
              <HandHeart className="h-6 w-6" />
              <span className="whitespace-nowrap">Add Colors to Their Lives</span>
              <ArrowRight className="ml-auto h-6 w-6" />
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href="/donate" variant="donate" className="h-12 px-3 text-[0.88rem]">
                <Heart className="h-4 w-4" />
                <span className="whitespace-nowrap">Donate Now</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#contact" variant="volunteer" className="h-12 px-3 text-[0.88rem]">
                <Users className="h-4 w-4" />
                <span className="whitespace-nowrap">Become a Volunteer</span>
              </Button>
            </div>
            <Button href="#projects" variant="outline" className="h-11 px-4 text-[0.9rem]">
              <Eye className="h-4 w-4" /> View Projects
            </Button>
          </div>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.4 }}
          className="hero-mobile-stats relative z-10 grid gap-4 rounded-2xl bg-midnight px-5 py-5 shadow-mjkt max-md:grid-cols-4 max-md:gap-1 max-md:rounded-[18px] max-md:px-2 max-md:py-3 sm:grid-cols-2 lg:grid-cols-7"
        >
          {stats.map((stat, index) => (
            <div key={`${stat.value}-${stat.label}`} className={index > 3 ? "max-md:hidden" : ""}>
              <StatCard {...stat} dark />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
