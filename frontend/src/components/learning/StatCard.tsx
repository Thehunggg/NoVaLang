import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

export function StatCard({ icon: Icon, label, value, color = "text-cyan-300" }: { icon: LucideIcon; label: string; value: string | number; color?: string }) {
  return <Card className="p-4"><Icon className={color} size={19} /><strong className="mt-3 block font-display text-2xl font-black text-white">{value}</strong><span className="text-xs font-bold text-slate-500">{label}</span></Card>;
}
