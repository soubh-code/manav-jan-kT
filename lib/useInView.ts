"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

export function useScrollInView() {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}
