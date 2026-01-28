"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import { MoveLeft, ShieldAlert, Hash, Scissors } from "lucide-react";

export default function DealDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await api.get(`/deals/${id}`);
        setDeal(res.data.deal || res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleClaim = async () => {
    setClaiming(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await api.post("/deals/claim", { dealId: id });
      setMessage({ type: "success", text: res.data.message });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "SYSTEM_ERROR_CODE_403";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setClaiming(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F9F9F8] font-mono flex items-center justify-center">
      <div className="flex gap-2 items-center">
        <div className="w-2 h-2 bg-[#1A1A1A] animate-bounce" />
        <span>FETCHING_DATA...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#1A1A1A] p-6 md:p-12 font-sans selection:bg-orange-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-3 font-mono text-xs font-bold uppercase mb-12 hover:text-orange-600 transition-colors"
        >
          <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back_to_Index
        </button>

        <div className="relative border-2 border-[#1A1A1A] bg-white">
          {/* Manila Folder Tab */}
          <div className="absolute -top-[34px] left-[-2px] bg-[#1A1A1A] text-white px-6 py-1.5 font-mono text-[10px] uppercase tracking-widest">
            File_No: {id?.toString().slice(-8) || "UNKNOWN"}
          </div>

          <div className="grid md:grid-cols-[1fr_300px] divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1A1A1A]">
            
            {/* Primary Content Area */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <Hash className="text-orange-500" size={20} />
                <span className="font-mono text-sm font-bold uppercase tracking-tighter">
                  {deal.brand || "Vendor_Verified"}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif italic leading-none mb-10">
                {deal.title}
              </h1>

              <div className="space-y-8 max-w-2xl">
                <section>
                  <label className="font-mono text-[10px] font-black uppercase text-slate-400 block mb-2">Description</label>
                  <p className="text-lg font-medium leading-relaxed">{deal.description}</p>
                </section>

                {deal.eligiblityCriteria && (
                  <section className="bg-slate-50 border-l-4 border-[#1A1A1A] p-6">
                    <label className="font-mono text-[10px] font-black uppercase text-slate-500 block mb-2 underline">Eligibility_Protocol</label>
                    <p className="font-mono text-sm leading-snug italic">{deal.eligiblityCriteria}</p>
                  </section>
                )}
              </div>
            </div>

            {/* Sidebar / Claim Area */}
            <div className="p-8 bg-slate-50 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="border-2 border-dashed border-slate-300 p-4 bg-white text-center">
                  <Scissors className="w-4 h-4 mx-auto mb-2 text-slate-300" />
                  <span className="font-mono text-[10px] uppercase text-slate-400">Cut along the dotted line</span>
                </div>

                {deal.isLocked ? (
                  <div className="border-2 border-red-200 bg-red-50 p-4">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <ShieldAlert size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Restricted_Access</span>
                    </div>
                    <p className="text-[10px] font-mono leading-tight opacity-70 uppercase">
                      This benefit requires founder verification. complete your profile to unlock.
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-[#1A1A1A] p-4 bg-white">
                    <span className="font-mono text-[10px] font-bold uppercase block mb-1">Status</span>
                    <span className="font-serif italic text-xl">Open Requisition</span>
                  </div>
                )}
              </div>

              <div className="mt-12 relative z-10">
                <AnimatePresence>
                  {message.text && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-6 font-mono text-[10px] p-3 border-l-4 ${
                        message.type === "success" ? "border-green-600 bg-green-50" : "border-red-600 bg-red-50"
                      }`}
                    >
                      {message.text.toUpperCase()}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleClaim}
                  disabled={claiming || (deal.isLocked && message.type !== "success")}
                  className={`w-full py-6 font-mono font-black uppercase tracking-widest text-sm border-2 border-[#1A1A1A] transition-all relative overflow-hidden group
                    ${claiming ? "bg-slate-200 cursor-wait" : "bg-[#1A1A1A] text-white hover:bg-orange-600 active:translate-y-1"}
                    ${deal.isLocked && !claiming ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <span className="relative z-10">{claiming ? "Processing..." : "Authorize_Claim"}</span>
                </button>
              </div>

              {/* Approval Stamp (Hidden until success) */}
              <AnimatePresence>
                {message.type === "success" && (
                  <motion.div 
                    initial={{ scale: 2, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: -15 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  >
                    <div className="border-8 border-red-600/30 text-red-600/30 text-6xl font-black px-4 py-2 uppercase tracking-tighter">
                      Approved
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}