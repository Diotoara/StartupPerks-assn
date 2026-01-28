"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import { Search, MoveRight, Eye } from "lucide-react";

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await api.get("/deals");
        let dataToSet = res.data?.AllDeals || (Array.isArray(res.data) ? res.data : []);
        setDeals(dataToSet);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const filteredDeals = deals.filter((deal: any) => {
    const matchesSearch = (deal.title || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || (deal.category || "").toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#1A1A1A] font-sans selection:bg-orange-200">
      <div className="max-w-7xl mx-auto px-8 py-20">
        
        <header className="border-b-4 border-[#1A1A1A] pb-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="font-mono text-xs font-black uppercase text-orange-600">[ Section_02 ]</span>
            <h1 className="text-6xl font-serif italic tracking-tighter">Subsidies.</h1>
          </div>
          <p className="font-mono text-sm max-w-xs text-right opacity-60">
            Current inventory of active SaaS credits and enterprise-grade discounts.
          </p>
        </header>

        <div className="flex flex-col md:flex-row border-2 border-[#1A1A1A] bg-white mb-16 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1A1A1A]">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500" />
            <input 
              type="text"
              placeholder="SEARCH_BY_VENDOR..."
              className="w-full bg-transparent py-5 pl-12 pr-4 outline-none font-mono text-sm placeholder:text-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex">
            {["All", "Cloud", "Marketing", "DevTools"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-5 font-mono text-xs font-bold uppercase transition-colors ${
                  category === cat ? "bg-[#1A1A1A] text-white" : "hover:bg-orange-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-l-2 border-r-2 border-[#1A1A1A] bg-white">
          {loading ? (
            [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredDeals.map((deal) => (
                <DealRow key={deal._id || deal.id} deal={deal} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

function DealRow({ deal }: { deal: any }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group grid grid-cols-1 md:grid-cols-[1fr_200px_150px] border-b-2 border-[#1A1A1A] items-center hover:bg-orange-50 transition-colors"
    >
      <div className="p-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 border border-[#1A1A1A] uppercase">
            {deal.category}
          </span>
          {deal.isLocked && (
            <span className="font-mono text-[10px] bg-red-100 text-red-600 px-2 py-0.5 font-bold italic uppercase tracking-tighter">
              [ Restricted ]
            </span>
          )}
        </div>
        <h3 className="text-3xl font-serif italic mb-1">{deal.title}</h3>
        <p className="text-sm font-medium text-slate-500 line-clamp-1">{deal.description}</p>
      </div>

      <div className="px-8 py-4 md:py-0 border-t-2 md:border-t-0 md:border-l-2 border-[#1A1A1A] h-full flex items-center bg-white/50">
        <div className="font-mono">
          <span className="text-xs text-slate-400 block uppercase">Benefit</span>
          <span className="font-bold text-lg leading-none">90% OFF</span>
        </div>
      </div>

      <a 
        href={`/deals/${deal._id || deal.id}`}
        className="px-8 py-8 md:py-0 border-t-2 md:border-t-0 md:border-l-2 border-[#1A1A1A] h-full flex items-center justify-center bg-[#1A1A1A] text-white group-hover:bg-orange-600 transition-colors"
      >
        <MoveRight className="w-6 h-6" />
      </a>
    </motion.div>
  );
}

function SkeletonRow() {
  return (
    <div className="h-32 border-b-2 border-[#1A1A1A] bg-white animate-pulse flex items-center px-8">
      <div className="space-y-3 w-full">
        <div className="h-4 w-24 bg-slate-100" />
        <div className="h-8 w-1/3 bg-slate-100" />
      </div>
    </div>
  );
}