import { Sparkles } from "lucide-react";

export function Mascot({ size = "md", message }: { size?: "sm" | "md" | "lg"; message?: string }) {
  const dimension = { sm: "h-14 w-14", md: "h-24 w-24", lg: "h-40 w-40" }[size];
  return <div className="flex items-center gap-4"><div className={`nova-orb relative grid shrink-0 place-items-center rounded-full ${dimension}`}><div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-cyan-200 via-violet-400 to-fuchsia-400 opacity-90 blur-[1px]" /><div className="absolute inset-[27%] rounded-full bg-white shadow-[0_0_25px_10px_rgba(255,255,255,.5)]" /><Sparkles className="relative z-10 text-violet-700" size={size === "lg" ? 34 : size === "md" ? 23 : 16} /></div>{message && <div className="rounded-2xl rounded-bl-sm border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-bold leading-6 text-cyan-50">{message}</div>}</div>;
}
