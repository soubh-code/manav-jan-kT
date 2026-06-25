"use client";

import Image from "next/image";
import { BookOpen, Droplets, Heart, HeartHandshake, Leaf, Stethoscope, Venus } from "lucide-react";

const focusAreas = [
  {
    title: "Education",
    image: "/images/donate-education-drive.jpeg",
    alt: "Child smiling in a classroom",
    icon: BookOpen
  },
  {
    title: "Healthcare",
    image: "/images/donate-health-support.jpeg",
    alt: "Healthcare support for an underserved community member",
    icon: Stethoscope
  },
  {
    title: "Clean Water",
    image: "/images/about-zoom-3.jpeg",
    alt: "Community water and public welfare coverage",
    icon: Droplets
  },
  {
    title: "Women Empowerment",
    image: "/images/donate-women-empowerment.jpeg",
    alt: "Women empowerment and recognition program",
    icon: Venus
  },
  {
    title: "Child Welfare",
    image: "/images/about-zoom-14.jpeg",
    alt: "Children receiving food and care",
    icon: HeartHandshake
  },
  {
    title: "Livelihood Support",
    image: "/images/donate-community-event.jpeg",
    alt: "Community livelihood support gathering",
    icon: Leaf
  }
];

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#062f55] py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(30deg, transparent 42%, rgba(255,255,255,0.12) 43%, transparent 45%), linear-gradient(150deg, transparent 42%, rgba(255,255,255,0.12) 43%, transparent 45%)",
          backgroundSize: "44px 38px"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(55,138,221,0.28),transparent_28%),linear-gradient(180deg,rgba(2,24,45,0.45),rgba(2,24,45,0.18))]" />

      <div className="section-shell relative z-10 py-0">
        <div className="grid gap-14 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
          <div>
            <div className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[0.18em] text-amber-mjkt sm:text-base">
              <span>About Us</span>
              <span className="h-px w-28 bg-amber-mjkt" />
              <Heart className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <h2 className="mt-8 font-[family:var(--font-luxury)] text-[clamp(4.8rem,9.4vw,9.6rem)] font-bold leading-[0.82] tracking-0 text-white">
              About Us
            </h2>

            <div className="mt-8 flex max-w-[380px] items-center gap-4 text-amber-mjkt">
              <span className="h-px flex-1 bg-amber-mjkt" />
              <Heart className="h-7 w-7" strokeWidth={1.8} />
              <span className="h-px flex-1 bg-amber-mjkt" />
            </div>

            <p className="mt-7 max-w-[760px] font-[family:var(--font-luxury)] text-[clamp(2rem,3.1vw,3.4rem)] font-bold leading-[1.06] text-white">
              Serving communities with dignity, care, and lasting impact.
            </p>

            <p className="mt-6 max-w-[760px] text-lg leading-8 text-white/86 sm:text-xl sm:leading-9">
              Manav Jan Kalyan Trust is committed to supporting underserved
              communities through meaningful action. We work across education,
              healthcare, clean water, women empowerment, child welfare, and
              livelihood support to build stronger, healthier, and more hopeful futures.
            </p>
          </div>

          <div className="relative hidden min-h-[330px] lg:block">
            <div className="absolute right-4 top-10 h-64 w-[31rem] rotate-[-7deg] rounded-[48%] bg-blue-mjkt/18 blur-sm" />
            <div className="absolute right-0 top-0 h-80 w-[34rem] rotate-[-8deg] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(55,138,221,0.34),rgba(55,138,221,0.13)_48%,transparent_68%)]" />
            <div className="absolute right-20 top-5 h-72 w-72 rounded-full border border-dashed border-amber-mjkt/90" />
            <div className="absolute right-36 top-20 h-48 w-80 rotate-[-28deg] rounded-[50%] border-t border-dashed border-amber-mjkt/85" />
            <div className="absolute right-36 top-8 grid h-36 w-36 place-items-center rounded-full bg-ivory text-midnight shadow-[0_18px_70px_rgba(0,0,0,0.28)] ring-8 ring-white/30">
              <div className="grid h-[7.3rem] w-[7.3rem] place-items-center rounded-full border border-graylight/70 text-center">
                <p className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.34em] text-midnight/80">
                  Dignity Care
                </p>
                <Heart className="-my-1 h-9 w-9 text-amber-mjkt" strokeWidth={1.8} />
                <p className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.28em] text-midnight/80">
                  Opportunity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-14 sm:gap-8 lg:mt-18 lg:grid-cols-6 lg:gap-6 xl:gap-8">
          {focusAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article key={area.title} className="group text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[150px] sm:max-w-[230px]">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-mjkt/80 transition-transform duration-300 group-hover:rotate-6" />
                  <div className="absolute inset-[7px] overflow-hidden rounded-full border-[5px] border-[#07365f] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.22)]">
                    <Image
                      src={area.image}
                      alt={area.alt}
                      fill
                      sizes="(min-width: 1280px) 230px, (min-width: 1024px) 16vw, (min-width: 640px) 45vw, 86vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062f55]/20 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-2 border-amber-mjkt bg-[#07365f] text-amber-mjkt shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:-bottom-5 sm:h-16 sm:w-16">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="mt-7 font-[family:var(--font-luxury)] text-[1.08rem] font-bold leading-tight text-white sm:mt-10 sm:text-[1.55rem] lg:text-[1.35rem] xl:text-[1.55rem]">
                  {area.title}
                </h3>
                <div className="mx-auto mt-2 h-px w-10 bg-amber-mjkt sm:mt-4 sm:w-12" />
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex items-center gap-5 text-amber-mjkt">
          <span className="h-px flex-1 bg-amber-mjkt/80" />
          <Heart className="h-8 w-8" strokeWidth={1.8} />
          <span className="h-px flex-1 bg-amber-mjkt/80" />
        </div>
      </div>
    </section>
  );
}
