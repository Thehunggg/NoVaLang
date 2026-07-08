import novaReading from "../../../../shared/assets/nova-reading.svg";

export function Mascot({ size = "md", message }: { size?: "sm" | "md" | "lg"; message?: string }) {
  const dimension = { sm: "h-16 w-20", md: "h-28 w-32", lg: "h-44 w-52" }[size];
  return <div className="flex items-center gap-4"><img src={novaReading} alt="Nova" className={`${dimension} shrink-0 object-contain drop-shadow-[0_12px_26px_rgba(139,92,246,.28)]`} />{message && <div className="rounded-2xl rounded-bl-sm border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-bold leading-6 text-cyan-50">{message}</div>}</div>;
}
