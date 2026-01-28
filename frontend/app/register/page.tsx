"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PenTool, Check, Loader2 } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", startupUrl: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "REGISTRATION_PROTOCOL_REJECTED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-16 pt-19 bg-[#F9F9F8]">
    <div className="pt-16  min-h-screen bg-[#F9F9F8] text-[#1A1A1A] p-2 lg:p-12 font-sans selection:bg-orange-200">
      <div className="max-w-6xl  mx-auto border-4 border-[#1A1A1A] bg-white grid lg:grid-cols-[380px_1fr]">
        
        <div className="bg-[#1A1A1A] text-white p-10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-orange-500 text-[10px] font-black mb-10">[ FORM_33-B ]</div>
            <h1 className="text-5xl font-serif italic leading-[0.85] mb-8">Register <br /> Account.</h1>
            <ul className="space-y-4 font-mono text-[9px] uppercase tracking-widest opacity-60">
              <li className="flex gap-3"><Check size={12} className="text-orange-500" /> Professional Domain</li>
              <li className="flex gap-3"><Check size={12} className="text-orange-500" /> LinkedIn Status</li>
              <li className="flex gap-3"><Check size={12} className="text-orange-500" /> Verify Incorporation</li>
            </ul>
          </div>
          <div className="pt-8 border-t border-white/10 font-mono text-[9px] uppercase opacity-40 leading-relaxed">
            Submitting this requisition authorizes background verification of startup affiliation.
          </div>
        </div>

        <div className="p-10 lg:p-16">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-1 border-b-2 border-[#1A1A1A] group focus-within:border-orange-500 transition-colors">
                <label className=" text-[9px] font-bold uppercase opacity-40 italic tracking-tighter">Full_Legal_Name</label>
                <input required type="text" className="w-full py-2 outline-none font-serif text-xl bg-transparent" placeholder="John Doe" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1 border-b-2 border-[#1A1A1A] group focus-within:border-orange-500 transition-colors">
                <label className="font-mono text-[9px] font-black uppercase opacity-40 italic tracking-tighter">Corporate_Email</label>
                <input required type="email" className="w-full py-2 outline-none font-serif text-xl bg-transparent" placeholder="john@company.io" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1 border-b-2 border-[#1A1A1A] group focus-within:border-orange-500 transition-colors">
              <label className="font-mono text-[9px] font-black uppercase opacity-40 italic tracking-tighter">Passkey_Sequence</label>
              <input required type="password" placeholder="••••••••" className="w-full py-2 outline-none font-serif text-xl bg-transparent" onChange={(e)=>setFormData({...formData, password: e.target.value})} />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-50 text-red-600 font-mono text-[10px] font-black border-l-4 border-red-600 uppercase">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-between pt-6">
              <Link href="/login" className="font-mono text-[10px] font-black uppercase underline underline-offset-4 opacity-40 hover:opacity-100 transition-opacity">
                I_Have_A_Dossier
              </Link>
              <button 
                disabled={loading}
                className="w-full md:w-auto bg-[#1A1A1A] text-white px-12 py-5 font-mono font-black uppercase text-xs hover:bg-orange-600 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-1"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Finalize_Dossier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}