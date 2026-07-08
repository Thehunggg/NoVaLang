import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 text-[#10051a] shadow-[0_0_28px_rgba(139,92,246,.26)] hover:-translate-y-0.5",
    secondary: "border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/15",
    danger: "border border-rose-400/25 bg-rose-400/10 text-rose-200 hover:bg-rose-400/15",
    ghost: "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
  };
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
