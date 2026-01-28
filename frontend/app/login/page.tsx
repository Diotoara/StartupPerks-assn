"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoveRight, Fingerprint, Shield, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      router.push("/deals");
    } catch (err: any) {
      setError(err.response?.data?.message || "AUTH_FAILURE: INVALID_CREDENTIALS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-[#F9F9F8] grid lg:grid-cols-2 text-[#1A1A1A] font-sans selection:bg-orange-200">
      <div className="hidden lg:flex flex-col justify-between p-12 border-r-4 border-[#1A1A1A] bg-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-12 h-12 border-2 border-[#1A1A1A] flex items-center justify-center font-mono font-black mb-12">P/S</div>
          <h2 className="text-6xl font-serif italic leading-[0.85] mb-6">Authorize <br /> Entry.</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 max-w-xs">Secure_Terminal_v2.6 // Accessing_Inventory</p>
        </div>
        <div className="relative z-10 py-6 border-t-2 border-[#1A1A1A]">
          <div className="flex items-center gap-3 text-orange-600 font-mono text-[10px] font-black uppercase">
            <Shield size={16} /> Encryption_Active
          </div>
        </div>
        <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] pointer-events-none">
          <Fingerprint size={600} strokeWidth={1} />
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="group">
                <label className="font-mono text-[10px] font-black uppercase mb-3 block group-focus-within:text-orange-600 transition-colors">
                  [ 01 ] Account_Identifier
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white border-2 border-[#1A1A1A] p-4 font-mono text-sm outline-none focus:bg-orange-50 transition-colors placeholder:opacity-20"
                  placeholder="name@startup.io"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="group">
                <label className="font-mono text-[10px] font-black uppercase mb-3 block group-focus-within:text-orange-600 transition-colors">
                  [ 02 ] Passkey_Sequence
                </label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-white border-2 border-[#1A1A1A] p-4 font-mono text-sm outline-none focus:bg-orange-50 transition-colors placeholder:opacity-20"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-red-50 border-l-4 border-red-600 font-mono text-[10px] text-red-600 font-bold uppercase"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 pt-4">
              <button 
                disabled={loading}
                className="w-full bg-[#1A1A1A] text-white py-5 font-mono font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-3 relative overflow-hidden group active:translate-y-1"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>Initialise_Entry <MoveRight className="group-hover:translate-x-2 transition-transform" size={18} /></>
                )}
              </button>

              <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-tighter pt-4 border-t border-[#1A1A1A]/10">
                <span className="opacity-40 text-left">New_Founders_Only</span>
                <Link href="/register" className="font-black underline underline-offset-4 hover:text-orange-600 transition-colors">
                  Register_Dossier
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}