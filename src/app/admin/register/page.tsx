"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Box, Lock, Mail, User, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminRegister() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/admin`,
                },
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Failed to initialize account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass-panel p-10 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="p-4 bg-accent-primary/10 rounded-2xl border border-accent-primary/20 mb-6">
                            <ShieldCheck className="w-8 h-8 text-accent-primary" />
                        </div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em] text-center mb-2">
                            Initialize_Admin<span className="text-accent-primary">.</span>node
                        </h1>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center">
                            Restricted_Access_Protocol_v4.0
                        </p>
                    </div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Registration_Successful</h2>
                            <p className="text-xs text-muted-foreground font-mono mb-4 italic">Verification link sent to encrypted stream.</p>
                            <p className="text-[10px] text-accent-primary font-mono mb-8 brightness-150 underline decoration-accent-primary/30">
                                IMPORTANT: Check your email inbox & spam to confirm identity before login.
                            </p>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3 }}
                                    className="h-full bg-emerald-500"
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] ml-1">Identity_Handle</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="admin@system.node"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white outline-none focus:border-accent-primary/40 focus:bg-black/60 transition-all font-mono"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] ml-1">Access_Cipher</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent-primary transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••••••"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white outline-none focus:border-accent-primary/40 focus:bg-black/60 transition-all font-mono"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-mono leading-relaxed"
                                >
                                    ERROR: {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full py-5 bg-accent-primary text-white text-[11px] font-black rounded-2xl shadow-xl hover:shadow-accent-primary/20 transition-all uppercase tracking-[0.5em] active:scale-[0.98] overflow-hidden relative flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        SYNCING...
                                    </>
                                ) : (
                                    <>
                                        Initialize_Account
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500"></div>
                            </button>
                        </form>
                    )}

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <Link
                            href="/admin/login"
                            className="text-[10px] font-mono text-white/40 hover:text-accent-primary transition-colors uppercase tracking-widest"
                        >
                            Return_to_Auth_Terminal
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
                    System_v4.52 // Encrypted_Auth_Node
                </p>
            </motion.div>
        </div>
    );
}
