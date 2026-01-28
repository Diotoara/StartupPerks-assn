"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import { User, Box, Compass, Fingerprint, Plus, Zap, ArrowUpRight } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const[name,setName] = useState("")

  useEffect(() => {
    const fetchMyClaims = async () => {
      try {
        const res = await api.get("/deals/my-claims");
        if (res.data?.userCLaims) {
          setClaims(res.data.userCLaims);
          setName(res.data.userName)
        }
      } catch (err) {
        console.error("Fetch failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyClaims();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-16 bg-[#F9F9F8] text-[#1A1A1A] font-sans selection:bg-orange-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <aside className="lg:col-span-4 space-y-6">
              <div className="border-4 border-[#1A1A1A] bg-white p-8 relative">
                <div className="absolute top-0 right-0 bg-[#1A1A1A] text-white px-3 py-1 font-mono text-[9px] uppercase tracking-tighter">
                  Status: Verified_Founder
                </div>
                
                <div className="w-20 h-20 border-2 border-[#1A1A1A] mb-6 bg-orange-50 flex items-center justify-center">
                  <User size={40} strokeWidth={1} />
                </div>
                
                <h2 className="text-3xl font-serif italic mb-1 capitalize">{name}</h2>
                <p className="font-mono text-[10px] uppercase opacity-40 mb-8 tracking-widest">Auth_Level: 01</p>
                
                <div className="space-y-3 font-mono text-[11px] border-t-2 border-[#1A1A1A] pt-6">
                  <div className="flex justify-between uppercase">
                    <span className="opacity-40">Assets_Authorized</span>
                    <span className="font-bold">{claims.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span className="opacity-40">System_Sync</span>
                    <span className="text-green-600 font-bold">Live</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500 p-6 text-white border-2 border-[#1A1A1A]">
                <div className="flex justify-between items-start mb-4">
                  <Zap size={20} fill="white" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-tighter opacity-70">Capital_Injected</span>
                </div>
                <div className="text-5xl font-serif italic leading-none mb-2">
                  ${(claims.length * 1250).toLocaleString()}
                </div>
                <p className="font-mono text-[9px] uppercase opacity-80 leading-tight">
                  Total project subsidies successfully authorized for deployment.
                </p>
              </div>
            </aside>

            {/* Main Content: The Tool Rack */}
            <main className="lg:col-span-8">
              <header className="flex flex-col md:flex-row justify-between items-end border-b-4 border-[#1A1A1A] pb-6 mb-12 gap-4">
                <div>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Inventory.</h1>
                  <p className="font-mono text-xs uppercase opacity-40 mt-3">Live feed of authorized startup subsidies.</p>
                </div>
                <a href="/deals" className="group bg-[#1A1A1A] text-white px-8 py-3 font-mono text-xs font-bold uppercase flex items-center gap-2 hover:bg-orange-600 transition-colors">
                  <Plus size={14} /> New_Requisition
                </a>
              </header>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-white border-2 border-dashed border-slate-200 animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {claims.length > 0 ? (
                      claims.map((claim) => (
                        <ToolKey key={claim._id} claim={claim} />
                      ))
                    ) : (
                      <div className="col-span-full border-2 border-dashed border-slate-300 py-20 text-center bg-white">
                        <Fingerprint size={40} className="mx-auto mb-4 opacity-10" />
                        <p className="font-mono text-[10px] uppercase opacity-40">No active assets found in ledger</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </main>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function ToolKey({ claim }: { claim: any }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all group cursor-default"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 border-2 border-[#1A1A1A] flex items-center justify-center font-mono font-black text-xl group-hover:bg-orange-50">
          {claim.deal?.brand?.[0] || "A"}
        </div>
        <div className="text-right">
          <span className="font-mono text-[9px] font-black uppercase text-orange-600 block">Status_Active</span>
          <span className="font-mono text-[9px] uppercase opacity-40 italic">
            Claimed: {new Date(claim.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-serif italic leading-tight">{claim.deal?.brand}</h3>
        <p className="text-xs font-bold font-mono uppercase opacity-40 mt-1">{claim.deal?.title}</p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-[#1A1A1A] text-white font-mono text-[10px] font-black uppercase py-2.5 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
          View_Credentials <ArrowUpRight size={12} />
        </button>
        <button className="px-3 border-2 border-[#1A1A1A] hover:bg-slate-50">
          <Compass size={14} />
        </button>
      </div>
    </motion.div>
  );
}