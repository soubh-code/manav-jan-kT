"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HandHeart, Heart, Menu, UserPlus, Users, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navItems = [
  ["Home", "/#home"],
  ["About", "/#about"],
  ["Projects", "/#projects"],
  ["Transparency", "/#transparency"],
  ["Contact", "/#contact"]
];

function Logo() {
  return (
    <a href="/#home" className="flex min-w-0 items-center gap-3 max-md:gap-2" aria-label="Manav Jan Kalyan Trust home">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-mjkt bg-white max-md:h-10 max-md:w-10">
        <HandHeart aria-hidden="true" className="h-7 w-7 text-green-mjkt max-md:h-5 max-md:w-5" />
      </span>
      <span className="font-heading text-lg font-bold leading-tight text-midnight max-md:text-[0.9rem] sm:text-xl">
        Manav Jan
        <br />
        Kalyan Trust
      </span>
    </a>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/#home");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref(pathname);
      return;
    }

    const sectionIds = navItems.map(([, href]) => href.split("#")[1]).filter(Boolean);
    const updateActiveSection = () => {
      const current = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return { id, top: element.getBoundingClientRect().top };
        })
        .filter(Boolean)
        .reverse()
        .find((section) => section && section.top <= 160);

      setActiveHref(current ? `/#${current.id}` : "/#home");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-6 pt-4 max-md:px-3 max-md:pt-3">
      <nav className="mx-auto flex h-[72px] w-full max-w-[1720px] items-center justify-between rounded-2xl bg-white px-8 shadow-mjkt max-md:h-16 max-md:rounded-2xl max-md:px-3">
        <Logo />
        <div className="hidden items-center gap-12 xl:gap-16 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`relative font-heading text-sm font-semibold transition-colors duration-200 hover:text-pink-mjkt ${
                activeHref === href ? "text-pink-mjkt" : "text-midnight"
              }`}
            >
              {label}
              {activeHref === href ? (
                <span className="absolute -bottom-4 left-1/2 h-0.5 w-9 -translate-x-1/2 bg-pink-mjkt" />
              ) : null}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <Button
            href="/donate"
            variant="donate"
            className={`h-10 ${pathname === "/donate" ? "ring-4 ring-pink-mjkt/20" : ""}`}
          >
            <Heart className="h-5 w-5" /> Donate
          </Button>
          <Button href="/#contact" variant="volunteer" className="h-10">
            <Users className="h-5 w-5" /> Volunteer
          </Button>
          <Button href="/#contact" variant="join" className="h-10">
            <UserPlus className="h-5 w-5" /> Join Us
          </Button>
        </div>
        <div className="ml-auto mr-2 flex items-center gap-2 md:hidden">
          <Button href="/donate" variant="donate" className="h-10 min-h-10 rounded-xl px-3 text-[0.72rem]">
            <Heart className="h-4 w-4" /> Donate
          </Button>
          <Button href="/#contact" variant="volunteer" className="h-10 min-h-10 rounded-xl px-3 text-[0.72rem]">
            <Users className="h-4 w-4" /> Volunteer
          </Button>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-midnight md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-8 w-8" />
        </button>
      </nav>
      <div
        className={`fixed inset-0 z-50 bg-midnight/40 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-[86vw] max-w-sm flex-col bg-white p-6 shadow-glow transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-midnight"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-12 grid gap-5">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-heading text-2xl font-semibold ${
                activeHref === href ? "text-pink-mjkt" : "text-midnight"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="mt-auto grid gap-3">
          <Button href="/donate" variant="donate" className="w-full">
            <Heart className="h-5 w-5" /> Donate
          </Button>
          <Button href="/#contact" variant="volunteer" className="w-full">
            <Users className="h-5 w-5" /> Volunteer
          </Button>
          <Button href="/#contact" variant="join" className="w-full">
            <UserPlus className="h-5 w-5" /> Join Us
          </Button>
        </div>
      </aside>
    </header>
  );
}
