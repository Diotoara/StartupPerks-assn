"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white border-2 border-[#1A1A1A] p-1 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
      <div className="flex items-center">
        <NavTab href="/" label="INDEX" active={pathname === "/"} />
        <NavTab href="/deals" label="INVENTORY" active={pathname === "/deals"} />
        <NavTab href="/dashboard" label="WORKSTATION" active={pathname === "/dashboard"} />
        
        {/* Vertical Divider */}
        <div className="w-[2px] h-6 bg-[#1A1A1A] mx-1 opacity-20" />
        
        <Link 
          href="/login" 
          className="px-5 py-2 text-[10px] font-mono font-black uppercase text-orange-600 hover:bg-orange-50 transition-colors"
        >
          AUTH_PORTAL
        </Link>
      </div>
    </nav>
  );
}

function NavTab({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} className="relative px-5 py-2 text-[10px] font-mono font-black uppercase transition-colors tracking-widest">
      <span className={`relative z-10 ${active ? "text-white" : "text-[#1A1A1A] opacity-50 hover:opacity-100"}`}>
        {label}
      </span>
      
      {active && (
        <motion.div 
          layoutId="nav-pill" 
          className="absolute inset-0 bg-[#1A1A1A] -z-0" 
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        />
      )}
    </Link>
  );
}