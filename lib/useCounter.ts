"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(value: string) {
  const match = value.match(/([\d,.]+)/);
  if (!match) return null;
  return {
    number: Number(match[1].replace(/,/g, "")),
    prefix: value.slice(0, match.index),
    suffix: value.slice((match.index ?? 0) + match[1].length),
    decimals: match[1].includes(".") ? match[1].split(".")[1].length : 0
  };
}

export function useCounter(value: string) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseValue(value);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!parsed || reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      const formatted = current.toLocaleString("en-IN", {
        maximumFractionDigits: parsed.decimals,
        minimumFractionDigits: parsed.decimals
      });
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    if (inView) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return { ref, display };
}
