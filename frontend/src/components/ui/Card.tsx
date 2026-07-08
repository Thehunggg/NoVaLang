import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[.055] shadow-[0_18px_60px_rgba(0,0,0,.22)] backdrop-blur-xl ${className}`} {...props} />;
}
