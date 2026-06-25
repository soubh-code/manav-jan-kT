import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "donate" | "volunteer" | "join" | "amber" | "outline" | "dark";
  className?: string;
  ariaLabel?: string;
};

const variants = {
  donate: "bg-pink-mjkt text-white hover:bg-pink-dark",
  volunteer: "bg-blue-mjkt text-white hover:bg-blue-dark",
  join:
    "border border-green-mjkt text-green-mjkt hover:bg-green-mjkt hover:text-white",
  amber: "bg-amber-mjkt text-midnight hover:bg-amber-dark hover:text-white",
  outline:
    "border border-graymid/60 text-midnight hover:bg-midnight hover:text-white",
  dark: "bg-midnight text-white hover:bg-pink-dark"
};

export default function Button({
  href = "#",
  children,
  variant = "donate",
  className = "",
  ariaLabel
}: ButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-heading text-sm font-semibold transition-all duration-200 focus-visible:ring-4 focus-visible:ring-pink-mjkt/30 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
