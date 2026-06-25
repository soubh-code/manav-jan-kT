"use client";

import type { LucideIcon } from "lucide-react";
import { useCounter } from "@/lib/useCounter";

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  caption?: string;
  color: "pink" | "blue" | "amber" | "green";
  dark?: boolean;
};

const colorMap = {
  pink: "bg-pink-mjkt",
  blue: "bg-blue-mjkt",
  amber: "bg-amber-mjkt",
  green: "bg-green-mjkt"
};

export default function StatCard({
  icon: Icon,
  value,
  label,
  caption,
  color,
  dark = false
}: StatCardProps) {
  const { ref, display } = useCounter(value);

  return (
    <div ref={ref} className="flex min-w-0 items-center gap-4 max-sm:flex-col max-sm:gap-2 max-sm:text-center">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-mjkt max-sm:h-14 max-sm:w-14 ${colorMap[color]}`}
      >
        <Icon aria-hidden="true" className="h-6 w-6 max-sm:h-7 max-sm:w-7" />
      </span>
      <span className="min-w-0">
        <strong
          className={`block font-heading text-xl font-bold leading-tight max-sm:text-[1.45rem] ${dark ? "text-white" : "text-midnight"}`}
        >
          {display}
        </strong>
        <span
          className={`block text-sm leading-tight max-sm:text-[0.82rem] ${dark ? "text-white" : "text-midnight"}`}
        >
          {label}
        </span>
        {caption ? (
          <span className={`block text-xs max-sm:text-[0.72rem] ${dark ? "text-graylight" : "text-graymid"}`}>
            {caption}
          </span>
        ) : null}
      </span>
    </div>
  );
}
