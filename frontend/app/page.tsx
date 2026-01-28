"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Fingerprint, Activity, Box } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#1A1A1A] font-sans selection:bg-orange-200">
      {/* Brutalist Nav */}
      <nav className="border-b-2 border-[#1A1A1A] h-20 flex items-center justify-between px-8 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center font-mono font-black text-xl">
            P/S
          </div>
          <span className="font-mono text-xs uppercase tracking-widest font-bold hidden md:block">
            Founders_Ledger_v1.0
          </span>
        </div>
        <div className="flex gap-10 items-center font-mono text-sm font-bold uppercase">
          <a href="#" className="hover:underline underline-offset-4">Archive</a>
          <a href="#" className="hover:underline underline-offset-4">Access</a>
          <button className="bg-[#1A1A1A] text-white px-6 py-2 hover:bg-orange-600 transition-colors">
            Join Platform
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        {/* Abstract Hero */}
        <section className="py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter mb-8">
              Build <br /> Light.
            </h1>
            <p className="font-mono text-lg max-w-md border-l-4 border-orange-500 pl-6 my-12 py-2">
              A curated ledger of SaaS subsidies for founders who despise waste. No fluff. Just the raw capital you need to scale.
            </p>
            <div className="flex gap-4">
              <button className="group border-2 border-[#1A1A1A] px-8 py-4 flex items-center gap-3 font-mono font-bold uppercase hover:bg-orange-50 transition-all active:translate-y-1">
                Enter Directory
                <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative border-2 border-[#1A1A1A] aspect-square bg-white p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none" />
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border-[1px] border-dashed border-slate-300 rounded-full flex items-center justify-center"
            >
              <div className="w-1/2 h-[1px] bg-[#1A1A1A] origin-right" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Box className="w-24 h-24 stroke-[1px]" />
            </div>
          </div>
        </section>

        {/* The List (Abstract Feature Grid) */}
        <section className="pb-32">
          <div className="border-t-2 border-[#1A1A1A] pt-4 mb-12 flex justify-between items-end">
            <h2 className="font-mono text-sm font-black uppercase tracking-tighter">System_Capabilities</h2>
            <span className="font-mono text-[10px] text-slate-400">001 — 003</span>
          </div>

          <div className="grid md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1A1A1A] border-b-2 border-[#1A1A1A]">
            <AbstractFeature 
              index="01"
              icon={<Fingerprint size={32} strokeWidth={1} />}
              title="Verified Identity"
              desc="Proof of build is required for top-tier subsidies. We verify your domain and incorporation once."
            />
            <AbstractFeature 
              index="02"
              icon={<Activity size={32} strokeWidth={1} />}
              title="Direct Pipeline"
              desc="No referral links. These are direct API-enabled redemptions that hit your billing dashboard instantly."
            />
            <AbstractFeature 
              index="03"
              icon={<Box size={32} strokeWidth={1} />}
              title="Inventory"
              desc="Cloud credits, CRM seats, and dev-tooling. A full inventory for the modern engineering stack."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function AbstractFeature({ index, icon, title, desc }: { index: string, icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 hover:bg-white transition-colors cursor-default">
      <div className="font-mono text-xs font-bold mb-8 text-orange-600">[{index}]</div>
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-serif italic mb-4">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600 font-medium">
        {desc}
      </p>
    </div>
  );
}