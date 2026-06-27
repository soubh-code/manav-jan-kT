"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Eye,
  FileCheck2,
  FileText,
  Mail,
  ShieldCheck,
  ShieldPlus,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SectionTag from "@/components/ui/SectionTag";
import StatCard from "@/components/ui/StatCard";

type TransparencyColor = "pink" | "blue" | "amber" | "green";

type TransparencyItem = {
  title: string;
  eyebrow: string;
  text: string;
  detail: string;
  icon: LucideIcon;
  color: TransparencyColor;
  metrics: Array<{
    value: string;
    label: string;
    caption: string;
    tone: TransparencyColor;
  }>;
};

const transparencyCards: TransparencyItem[] = [
  {
    title: "Fund Allocation",
    eyebrow: "Financial Clarity",
    text: "₹ 10.32 Cr+ Deployed Across Key Areas",
    detail:
      "Every rupee deployed is mapped to impact areas, so donors can see how support moves from contribution to community outcomes.",
    icon: BarChart3,
    color: "pink",
    metrics: [
      { value: "₹ 12.45 Cr+", label: "Donations Received", caption: "2023-24", tone: "green" },
      { value: "₹ 10.32 Cr+", label: "Funds Deployed", caption: "2023-24", tone: "blue" },
      { value: "34%", label: "Education", caption: "Largest allocation", tone: "green" },
      { value: "28%", label: "Healthcare", caption: "Health camps & care", tone: "blue" }
    ]
  },
  {
    title: "Audited Annually",
    eyebrow: "Independent Verification",
    text: "Independent Audits Every Financial Year",
    detail:
      "Annual audits help keep records reliable, independently reviewed, and ready for responsible reporting.",
    icon: ShieldCheck,
    color: "green",
    metrics: [
      { value: "Annual", label: "Audit Cycle", caption: "Every financial year", tone: "green" },
      { value: "100%", label: "Accountability", caption: "Every rupee tracked", tone: "pink" },
      { value: "Verified", label: "Statements", caption: "Independently checked", tone: "blue" },
      { value: "Open", label: "Records", caption: "Transparent process", tone: "amber" }
    ]
  },
  {
    title: "Donor Updates",
    eyebrow: "Communication",
    text: "Monthly Updates Shared With Donors",
    detail:
      "Donors receive timely project updates, campaign progress, and impact stories connected to their support.",
    icon: Mail,
    color: "pink",
    metrics: [
      { value: "Monthly", label: "Updates", caption: "Shared with donors", tone: "pink" },
      { value: "1.25M+", label: "Families Reached", caption: "2023-24", tone: "green" },
      { value: "150+", label: "Active Projects", caption: "Across 12 states", tone: "amber" },
      { value: "Visible", label: "Impact", caption: "Stories & reports", tone: "blue" }
    ]
  },
  {
    title: "Compliance",
    eyebrow: "Governance",
    text: "80G Certified • Tax Benefits • Governance Compliant",
    detail:
      "Compliance systems keep donor benefits, governance records, and reporting obligations aligned with trust standards.",
    icon: ShieldCheck,
    color: "blue",
    metrics: [
      { value: "80G", label: "Certified", caption: "Tax benefits available", tone: "blue" },
      { value: "Governed", label: "Operations", caption: "Compliant processes", tone: "green" },
      { value: "Secure", label: "Donations", caption: "Safe & reliable", tone: "amber" },
      { value: "Audited", label: "Records", caption: "Verified statements", tone: "pink" }
    ]
  },
  {
    title: "Live Project Tracker",
    eyebrow: "Project Visibility",
    text: "150+ Active Projects Across 12 States",
    detail:
      "Active projects are tracked by focus area and geography, helping the trust monitor progress across communities.",
    icon: TrendingUp,
    color: "amber",
    metrics: [
      { value: "150+", label: "Active Projects", caption: "Education, health & more", tone: "amber" },
      { value: "12", label: "States", caption: "Live coverage", tone: "blue" },
      { value: "186", label: "Audited Projects", caption: "2023-24", tone: "green" },
      { value: "320+", label: "Communities", caption: "Reached with dignity", tone: "pink" }
    ]
  },
  {
    title: "Verified Reports",
    eyebrow: "Reporting",
    text: "12 Reports Published Every Quarter",
    detail:
      "Regular reports create a clear rhythm of disclosure, giving donors and partners a dependable view of progress.",
    icon: FileText,
    color: "blue",
    metrics: [
      { value: "12", label: "Reports", caption: "Published every quarter", tone: "blue" },
      { value: "Quarterly", label: "Reporting", caption: "Timely & consistent", tone: "pink" },
      { value: "186", label: "Projects Audited", caption: "2023-24", tone: "amber" },
      { value: "Traceable", label: "Records", caption: "Open reporting", tone: "green" }
    ]
  }
];

const colorClasses: Record<
  TransparencyColor,
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
  card: TransparencyItem;
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
      aria-pressed={active}
      onClick={onSelect}
      className={`absolute left-1/2 top-1/2 z-10 w-[172px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-4 text-left shadow-mjkt transition-[box-shadow,border-color,background-color] duration-300 focus-visible:ring-4 focus-visible:ring-pink-mjkt/30 ${active ? `${color.border} ${color.ring}` : "border-white/80"}`}
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${active ? 1.04 : depth})`,
        zIndex: active ? 30 : Math.round(10 + depth * 10)
      }}
    >
      <span className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white ${color.bg}`}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-heading text-base font-bold text-midnight">{card.title}</h3>
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
  card: TransparencyItem;
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
        <span className="min-w-0 whitespace-normal font-heading text-[clamp(0.56rem,2.15vw,0.7rem)] font-bold leading-[0.82rem] text-midnight [overflow-wrap:normal] [word-break:normal]">{card.title}</span>
      </span>
    </button>
  );
}

export default function Transparency() {
  const reduceMotion = useReducedMotion();
  const rotation = useOrbitalRotation(Boolean(reduceMotion));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCard = transparencyCards[selectedIndex];
  const selectedColor = colorClasses[selectedCard.color];
  const SelectedIcon = selectedCard.icon;

  const orbitItems = useMemo(
    () =>
      transparencyCards.map((card, index) => ({
        card,
        angle: rotation + (index / transparencyCards.length) * 360
      })),
    [rotation]
  );

  return (
    <section id="transparency" className="leaf-lines relative overflow-hidden bg-ivory">
      <div className="section-shell">
        <SectionTag icon={Eye}>Transparency</SectionTag>
        <div className="grid items-center gap-16 max-md:gap-8 xl:grid-cols-[0.43fr_0.57fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
          >
            <h2 className="section-title">
              Transparency That
              <br />
              Turns Trust <span className="text-amber-mjkt">Into Confidence.</span>
            </h2>
            <div className="pink-rule mx-auto mt-6 lg:mx-0" />
            <p className="mt-7 max-w-[560px] text-lg leading-8 text-midnight/80 max-md:mx-auto max-md:text-center max-md:text-[1.08rem]">
              We believe openness builds lasting trust. Through financial clarity,
              regular reporting, and accountable operations, we ensure every
              contribution creates visible, measurable impact.
            </p>
            <motion.div
              key={selectedCard.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              className={`mt-10 hidden rounded-3xl border bg-white p-6 shadow-mjkt md:block ${selectedColor.border}`}
            >
              <div className="flex items-start gap-4">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${selectedColor.bg}`}>
                  <SelectedIcon className="h-7 w-7" />
                </span>
                <div>
                  <p className={`font-heading text-xs font-bold uppercase ${selectedColor.text}`}>
                    {selectedCard.eyebrow}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-midnight">
                    {selectedCard.title}
                  </h3>
                  <p className="mt-3 leading-7 text-midnight/80">{selectedCard.detail}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {selectedCard.metrics.map((metric) => {
                  const metricColor = colorClasses[metric.tone];
                  return (
                    <div key={`${selectedCard.title}-${metric.label}`} className={`rounded-2xl p-4 ${metricColor.soft}`}>
                      <strong className="font-heading text-lg text-midnight">{metric.value}</strong>
                      <p className="text-sm text-midnight/80">{metric.label}</p>
                      <p className="text-xs text-graymid">({metric.caption})</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7">
                <p className="font-heading text-sm font-bold">Fund Allocation (2023-24)</p>
                <div className="mt-4 flex h-4 overflow-hidden rounded-full">
                  <span className="w-[34%] bg-green-mjkt" />
                  <span className="w-[28%] bg-blue-mjkt" />
                  <span className="w-[22%] bg-amber-mjkt" />
                  <span className="w-[16%] bg-pink-mjkt" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-midnight/80">
                  <span>Education 34%</span>
                  <span>Healthcare 28%</span>
                  <span>Food Support 22%</span>
                  <span>Community Care 16%</span>
                </div>
              </div>

              <a
                href="#contact"
                className={`mt-7 inline-flex items-center gap-3 rounded-full px-5 py-3 font-heading text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 ${selectedColor.bg}`}
              >
                View Report <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
          <div className="aurora relative mx-auto min-h-[740px] w-full max-w-[780px] overflow-visible rounded-full max-md:-mx-4 max-md:h-[440px] max-md:min-h-0 max-md:w-[calc(100%+2rem)] max-md:max-w-none max-md:rounded-none max-md:bg-transparent">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[590px] w-[590px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-mjkt/40 max-md:h-[324px] max-md:w-[324px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-pink-mjkt/35 max-md:h-[232px] max-md:w-[232px]" />
            <div className="relative z-20 mx-auto h-60 w-60 rounded-full border-8 border-white bg-white text-center shadow-glow max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:h-32 max-md:w-32 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:border-[6px] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 flex w-[138px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center max-md:w-[98px]">
                <ShieldPlus className="h-8 w-8 shrink-0 text-pink-mjkt max-md:h-6 max-md:w-6" />
                <h3 className="mt-1 w-full text-center font-heading text-[1.18rem] font-bold leading-[1.05] text-midnight max-md:text-[0.9rem]">
                  Our
                  <br />
                  Transparency
                </h3>
                <div className="pink-rule mt-1.5 h-0.5 w-6" />
                <p className="mt-1 w-full text-center text-[0.68rem] leading-4 text-midnight/80 max-md:text-[0.58rem] max-md:leading-3">
                  Open, Trackable,
                  <br />
                  Accountable
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              {orbitItems.map(({ card, angle }, index) => (
                <OrbitCard
                  key={card.title}
                  card={card}
                  angle={angle}
                  radius={300}
                  active={selectedIndex === index}
                  onSelect={() => setSelectedIndex(index)}
                />
              ))}
            </div>
            <div className="md:hidden" aria-label="Transparency areas mobile orbit">
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
            key={`mobile-${selectedCard.title}`}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className={`mx-auto w-full max-w-[calc(100vw-2.2rem)] overflow-hidden rounded-[22px] border bg-white p-3 shadow-mjkt md:hidden ${selectedColor.border}`}
          >
            <div className="flex items-start gap-3">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${selectedColor.bg}`}>
                <SelectedIcon className="h-6 w-6" />
              </span>
              <div>
                <p className={`font-heading text-[0.7rem] font-bold uppercase ${selectedColor.text}`}>
                  {selectedCard.eyebrow}
                </p>
                <h3 className="mt-1 font-heading text-xl font-bold text-midnight">
                  {selectedCard.title}
                </h3>
                <p className="mobile-info-detail mt-2 text-sm leading-5 text-midnight/80">{selectedCard.detail}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {selectedCard.metrics.slice(0, 4).map((metric) => {
                const metricColor = colorClasses[metric.tone];
                return (
                  <div key={`mobile-${selectedCard.title}-${metric.label}`} className={`rounded-2xl p-3 ${metricColor.soft}`}>
                    <strong className="font-heading text-sm text-midnight">{metric.value}</strong>
                    <p className="text-xs leading-4 text-midnight/80">{metric.label}</p>
                  </div>
                );
              })}
            </div>

            <a
              href="#contact"
              className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-heading text-xs font-semibold text-white ${selectedColor.bg}`}
            >
              View Report <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <div className="mt-12 grid gap-6 rounded-3xl bg-white p-7 shadow-mjkt max-md:gap-0 max-md:divide-y max-md:divide-graylight/70 max-md:rounded-[26px] max-md:px-5 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={ShieldCheck} value="100%" label="Accountability" caption="Every Rupee, Fully Accounted" color="pink" />
          <StatCard icon={FileText} value="Quarterly" label="Reports" caption="Transparent. Timely. Consistent" color="blue" />
          <StatCard icon={Star} value="80G" label="Certified" caption="Tax Benefits Available" color="amber" />
          <StatCard icon={FileCheck2} value="Audited" label="Statements" caption="Independently Verified" color="green" />
          <StatCard icon={Users} value="Trusted" label="& Transparent" caption="Our Promise. Always." color="blue" />
        </div>
      </div>
    </section>
  );
}
