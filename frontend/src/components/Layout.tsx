import { Outlet } from "react-router-dom";
import { MobileNav } from "./layout/MobileNav";
import { Navbar } from "./layout/Navbar";

export function Layout() {
  return <div className="min-h-screen bg-[#090612] text-white"><div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,.075),transparent_24%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,.09),transparent_26%)]" /><Navbar /><main className="relative pb-24 lg:pb-0"><Outlet /></main><MobileNav /></div>;
}
