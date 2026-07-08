import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_10px_28px_rgba(109,40,217,.24)] hover:-translate-y-0.5 hover:from-cyan-500 hover:via-violet-500 hover:to-fuchsia-500 active:translate-y-0",
    secondary: "border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/15",
    danger: "border border-rose-400/25 bg-rose-400/10 text-rose-200 hover:bg-rose-400/15",
    ghost: "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
  };
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
