"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  School,
  Soup,
  Star,
  Stethoscope,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SectionTag from "@/components/ui/SectionTag";
import StatCard from "@/components/ui/StatCard";

type ProjectColor = "pink" | "blue" | "amber" | "green";

type ProjectItem = {
  title: string;
  eyebrow: string;
  description: string;
  orbitText: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  color: ProjectColor;
  stats: Array<{
    icon: LucideIcon;
    value: string;
    label: string;
    color: ProjectColor;
  }>;
};

const projectCards: ProjectItem[] = [
  {
    title: "Education for Every Child",
    eyebrow: "Featured Project",
    description:
      "Providing quality education and learning support to children in rural and underserved communities.",
    orbitText: "12K+ Children Educated across 320+ centers",
    image: "/images/donate-education-drive.jpeg",
    imageAlt: "Education support session with children",
    icon: GraduationCap,
    color: "pink",
    stats: [
      { icon: Users, value: "12K+", label: "Children Educated", color: "pink" },
      { icon: School, value: "320+", label: "Learning Centers", color: "green" }
    ]
  },
  {
    title: "Healthcare Access Camps",
    eyebrow: "Health Initiative",
    description:
      "Organizing health camps, checkups, and care support so families can access timely medical guidance.",
    orbitText: "80K+ Lives Impacted through health camps & care",
    image: "/images/donate-health-support.jpeg",
    imageAlt: "Healthcare support in a community ward",
    icon: Stethoscope,
    color: "blue",
    stats: [
      { icon: Stethoscope, value: "80K+", label: "Lives Impacted", color: "blue" },
      { icon: Users, value: "12", label: "States Reached", color: "green" }
    ]
  },
  {
    title: "Food Support With Dignity",
    eyebrow: "Nutrition Project",
    description:
      "Serving nutritious meals and essentials to families facing hunger, with dignity at the center of every effort.",
    orbitText: "1.2M+ Nutritious Meals Served to those in need",
    image: "/images/donate-food-support.jpeg",
    imageAlt: "Food support being served to children",
    icon: Soup,
    color: "amber",
    stats: [
      { icon: Soup, value: "1.2M+", label: "Meals Served", color: "amber" },
      { icon: Users, value: "25K+", label: "Families Supported", color: "pink" }
    ]
  },
  {
    title: "Women Empowerment",
    eyebrow: "Growth Program",
    description:
      "Supporting women with skills, confidence, and opportunities that help them move toward financial independence.",
    orbitText: "5K+ Women Skilled & Empowered for growth",
    image: "/images/donate-women-empowerment.jpeg",
    imageAlt: "Women empowerment recognition program",
    icon: HeartHandshake,
    color: "green",
    stats: [
      { icon: HeartHandshake, value: "5K+", label: "Women Empowered", color: "green" },
      { icon: BriefcaseBusiness, value: "150+", label: "Projects Active", color: "amber" }
    ]
  },
  {
    title: "Sustainable Livelihoods",
    eyebrow: "Livelihood Project",
    description:
      "Helping families build sustainable income paths through training, support, and community-led opportunities.",
    orbitText: "3K+ Families Supported with sustainable livelihoods",
    image: "/images/donate-skill-india.jpeg",
    imageAlt: "Skill development and livelihood support program",
    icon: BriefcaseBusiness,
    color: "blue",
    stats: [
      { icon: BriefcaseBusiness, value: "3K+", label: "Families Supported", color: "blue" },
      { icon: Users, value: "12", label: "States Covered", color: "green" }
    ]
  },
  {
    title: "Community Care Network",
    eyebrow: "Community Project",
    description:
      "Reaching communities with dignity support, local care, and practical help where families need it most.",
    orbitText: "320+ Communities reached with dignity and support",
    image: "/images/donate-community-event.jpeg",
    imageAlt: "Community care event with volunteers",
    icon: Users,
    color: "green",
    stats: [
      { icon: Users, value: "320+", label: "Communities Reached", color: "green" },
      { icon: HeartHandshake, value: "25K+", label: "Families Supported", color: "pink" }
    ]
  }
];

const statRow = [
  { icon: Users, value: "25K+", label: "Families", caption: "Supported", color: "pink" as const },
  { icon: HeartHandshake, value: "1.2M+", label: "Lives", caption: "Impacted", color: "blue" as const },
  { icon: Soup, value: "150+", label: "Projects", caption: "Active", color: "amber" as const },
  { icon: School, value: "80G", label: "Certified", caption: "Tax Benefits", color: "green" as const }
];

const colorClasses: Record<
  ProjectColor,
  { bg: string; text: string; border: string; ring: string; soft: string }
> = {
  pink: {
    bg: "bg-pink-mjkt",
    text: "text-pink-mjkt",
    border: "border-pink-mjkt",
    ring: "shadow-[0_0_32px_rgba(212,83,126,0.28)]",
    soft: "bg-pink-light"
  },
  blue: {
    bg: "bg-blue-mjkt",
    text: "text-blue-mjkt",
    border: "border-blue-mjkt",
    ring: "shadow-[0_0_32px_rgba(55,138,221,0.25)]",
    soft: "bg-blue-light"
  },
  amber: {
    bg: "bg-amber-mjkt",
    text: "text-amber-mjkt",
    border: "border-amber-mjkt",
    ring: "shadow-[0_0_32px_rgba(239,159,39,0.28)]",
    soft: "bg-amber-light"
  },
  green: {
    bg: "bg-green-mjkt",
    text: "text-green-mjkt",
    border: "border-green-mjkt",
    ring: "shadow-[0_0_32px_rgba(29,158,117,0.25)]",
    soft: "bg-green-light"
  }
};

function useOrbitalRotation(disabled: boolean) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (disabled) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const delta = now - previous;
      previous = now;
      setRotation((current) => (current + delta * 0.008) % 360);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [disabled]);

  return rotation;
}

function OrbitCard({
  card,
  active,
  angle,
  radius,
  onSelect
}: {
  card: ProjectItem;
  active: boolean;
  angle: number;
  radius: number;
  onSelect: () => void;
}) {
  const Icon = card.icon;
  const color = colorClasses[card.color];
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;
  const depth = 0.82 + ((Math.sin(radians) + 1) / 2) * 0.18;

  return (
    <button
      type="button"
      aria-label={`Show ${card.title}`}
      onClick={onSelect}
      className={`absolute left-1/2 top-1/2 z-10 w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-4 text-left shadow-mjkt transition-[box-shadow,border-color,background-color] duration-300 focus-visible:ring-4 focus-visible:ring-pink-mjkt/30 ${active ? `${color.border} ${color.ring}` : "border-white/80"}`}
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${active ? 1.04 : depth})`,
        zIndex: active ? 30 : Math.round(10 + depth * 10)
      }}
      aria-pressed={active}
    >
      <span className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white ${color.bg}`}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-heading text-base font-bold leading-tight text-midnight">
        {card.title.replace(" for Every Child", "")}
      </h3>
      <span
        className={`absolute -right-1 -top-1 h-4 w-4 rounded-full border-4 border-white ${color.bg}`}
        aria-hidden="true"
      />
    </button>
  );
}

function MobileOrbitCard({
  card,
  active,
  angle,
  radius,
  onSelect
}: {
  card: ProjectItem;
  active: boolean;
  angle: number;
  radius: number;
  onSelect: () => void;
}) {
  const Icon = card.icon;
  const color = colorClasses[card.color];
  const radians = ((angle - 90) * Math.PI) / 180;
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;

  return (
    <button
      type="button"
      aria-label={`Show ${card.title}`}
      aria-pressed={active}
      onClick={onSelect}
      className={`absolute left-1/2 top-1/2 z-30 w-[132px] overflow-hidden rounded-2xl border bg-white p-2 text-left shadow-mjkt transition-[box-shadow,border-color,background-color] duration-300 ${active ? `${color.border} ${color.ring}` : "border-white/90"}`}
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${active ? 1.03 : 0.94})`,
        zIndex: active ? 40 : 30
      }}
    >
      <span className="flex items-center gap-1.5">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${color.bg}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0 whitespace-normal font-heading text-[clamp(0.56rem,2.15vw,0.7rem)] font-bold leading-[0.82rem] text-midnight [overflow-wrap:normal] [word-break:normal]">
          {card.title.replace(" for Every Child", "")}
        </span>
      </span>
    </button>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const rotation = useOrbitalRotation(Boolean(reduceMotion));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = projectCards[selectedIndex];
  const selectedColor = colorClasses[selectedProject.color];

  const orbitItems = useMemo(
    () =>
      projectCards.map((card, index) => ({
        card,
        angle: rotation + (index / projectCards.length) * 360
      })),
    [rotation]
  );

  return (
    <section id="projects" className="leaf-lines relative overflow-hidden bg-ivory">
      <div className="section-shell">
        <SectionTag icon={HandHeart}>Projects</SectionTag>
        <div className="grid items-center gap-16 max-md:gap-8 xl:grid-cols-[0.43fr_0.57fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
          >
            <h2 className="section-title">
              Projects That Turn
              <br />
              Compassion <span className="text-amber-mjkt">Into Action.</span>
            </h2>
            <div className="pink-rule mx-auto mt-6 lg:mx-0" />
            <p className="mt-7 max-w-[560px] text-lg leading-8 text-midnight/80 max-md:mx-auto max-md:text-center max-md:text-[1.08rem]">
              We create lasting impact through education, healthcare, nutrition,
              dignity, and community upliftment—empowering people to live with hope
              and build a better tomorrow.
            </p>
            <motion.div
              key={selectedProject.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              className="mt-10 hidden gap-5 rounded-3xl bg-white p-5 shadow-mjkt sm:grid-cols-[170px_1fr] md:grid"
            >
              <Image
                src={selectedProject.image}
                alt={selectedProject.imageAlt}
                width={260}
                height={260}
                className="h-full min-h-[190px] w-full rounded-2xl object-cover object-center"
              />
              <div className="relative pb-14">
                <div className={`flex items-center gap-3 ${selectedColor.text}`}>
                  <Star className="h-6 w-6" />
                  <span className="font-heading text-xs font-bold uppercase">
                    {selectedProject.eyebrow}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-3xl font-bold leading-tight text-midnight">
                  {selectedProject.title}
                </h3>
                <p className="mt-4 leading-7 text-midnight/80">
                  {selectedProject.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-5">
                  {selectedProject.stats.map((stat) => (
                    <StatCard key={`${selectedProject.title}-${stat.label}`} {...stat} />
                  ))}
                </div>
                <a
                  href="#contact"
                  aria-label={`Explore ${selectedProject.title}`}
                  className={`absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-mjkt transition-colors ${selectedColor.bg}`}
                >
                  <ArrowRight />
                </a>
              </div>
            </motion.div>
          </motion.div>
          <div className="aurora relative mx-auto min-h-[720px] w-full max-w-[760px] overflow-visible rounded-full max-md:-mx-4 max-md:h-[430px] max-md:min-h-0 max-md:w-[calc(100%+2rem)] max-md:max-w-none max-md:rounded-none max-md:bg-transparent">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-mjkt/45 max-md:h-[320px] max-md:w-[320px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-pink-mjkt/35 max-md:h-[230px] max-md:w-[230px]" />
            <div className="relative z-20 mx-auto h-60 w-60 rounded-full border-8 border-white bg-white text-center shadow-glow max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:h-32 max-md:w-32 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:border-[6px] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 flex w-[132px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center max-md:w-[94px]">
                <Users className="h-8 w-8 shrink-0 text-pink-mjkt max-md:h-6 max-md:w-6" />
                <h3 className="mt-1 w-full text-center font-heading text-[1.45rem] font-bold leading-[1.02] text-midnight max-md:text-[0.98rem]">
                  Our
                  <br />
                  Projects
                </h3>
                <div className="pink-rule mt-1.5 h-0.5 w-6" />
                <p className="mt-1 w-full text-center text-[0.72rem] leading-4 text-midnight/80 max-md:text-[0.58rem] max-md:leading-3">
                  Impact Areas
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              {orbitItems.map(({ card, angle }, index) => (
                <OrbitCard
                  key={card.title}
                  card={card}
                  angle={angle}
                  radius={282}
                  active={selectedIndex === index}
                  onSelect={() => setSelectedIndex(index)}
                />
              ))}
            </div>
            <div className="md:hidden" aria-label="Project impact areas mobile orbit">
              {orbitItems.map(({ card, angle }, index) => (
                <MobileOrbitCard
                  key={card.title}
                  card={card}
                  angle={angle}
                  radius={124}
                  active={selectedIndex === index}
                  onSelect={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
          <motion.div
            key={`mobile-${selectedProject.title}`}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="mx-auto grid w-full max-w-[calc(100vw-2.2rem)] gap-3 overflow-hidden rounded-[22px] bg-white p-3 shadow-mjkt md:hidden"
          >
            <Image
              src={selectedProject.image}
              alt={selectedProject.imageAlt}
              width={260}
              height={190}
              className="h-[145px] w-full rounded-2xl object-cover object-center"
            />
            <div className="relative min-w-0 pb-11">
              <div className={`flex items-center gap-2 ${selectedColor.text}`}>
                <Star className="h-5 w-5" />
                <span className="font-heading text-[0.7rem] font-bold uppercase">
                  {selectedProject.eyebrow}
                </span>
              </div>
              <h3 className="mt-2 break-words font-heading text-xl font-bold leading-tight text-midnight">
                {selectedProject.title}
              </h3>
              <p className="mobile-info-detail mt-2 text-sm leading-5 text-midnight/80">
                {selectedProject.description}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {selectedProject.stats.map((stat) => (
                  <StatCard key={`mobile-${selectedProject.title}-${stat.label}`} {...stat} />
                ))}
              </div>
              <a
                href="#contact"
                aria-label={`Explore ${selectedProject.title}`}
                className={`absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-mjkt ${selectedColor.bg}`}
              >
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 grid gap-6 rounded-3xl bg-white p-7 shadow-mjkt max-md:grid-cols-2 max-md:gap-5 max-md:rounded-[26px] max-md:px-4 sm:grid-cols-2 lg:grid-cols-4">
          {statRow.map((stat) => (
            <StatCard key={stat.value} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
