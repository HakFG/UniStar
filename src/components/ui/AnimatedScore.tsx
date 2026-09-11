"use client";

import { useCountUp } from "@/hooks/useCountUp";
import type { CSSProperties } from "react";

interface Props {
  value: number;
  className?: string;
  duration?: number;
  suffix?: string;
  style?: CSSProperties;
}

/**
 * Exibe um numero com animacao count-up ao montar.
 * Componente client isolado — pode ser usado dentro de Server Components.
 */
export default function AnimatedScore({ value, className, duration = 1200, suffix, style }: Props) {
  const displayed = useCountUp(value, duration);
  return <span className={className} style={style}>{displayed}{suffix}</span>;
}