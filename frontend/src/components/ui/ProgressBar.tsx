export function ProgressBar({ value, max = 100, color = "from-cyan-300 via-violet-400 to-fuchsia-400", label }: { value: number; max?: number; color?: string; label?: string }) {
  const percent = Math.min(100, Math.max(0, (value / Math.max(1, max)) * 100));
  return <div>{label && <div className="mb-2 flex justify-between text-xs font-bold text-slate-400"><span>{label}</span><span>{Math.round(percent)}%</span></div>}<div className="h-2.5 overflow-hidden rounded-full bg-white/[.07]"><div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`} style={{ width: `${percent}%` }} /></div></div>;
}
