"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Lock, LogIn, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setStatus("error");
            setErrorMsg(error.message);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Terminal window header */}
                <div className="bg-panel-bg border border-panel-border rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,255,0,0.05)]">
                    <div className="flex items-center px-4 py-3 border-b border-panel-border bg-black/40">
                        <div className="flex space-x-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground font-mono mx-auto">
                            <Lock className="w-3 h-3 mr-2" />
                            bash — sudo admin_login.sh
                        </div>
                    </div>

                    <div className="p-8 font-mono">
                        <div className="mb-8">
                            <div className="flex items-center mb-2">
                                <Terminal className="w-5 h-5 text-accent-green mr-2" />
                                <span className="text-accent-green text-lg font-bold">
                                    ./authenticate.sh
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                <span className="text-accent-cyan"># </span>
                                Admin access required. Provide credentials.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground uppercase tracking-widest block">
                                    <span className="text-accent-green">$</span> EMAIL
                                </label>
                                <div className="flex items-center bg-black/50 border border-panel-border rounded px-3 py-2 focus-within:border-accent-green transition-colors">
                                    <span className="text-accent-cyan text-sm mr-2">{">"}</span>
                                    <input
                                        id="admin-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="user@domain.com"
                                        className="bg-transparent flex-1 outline-none text-sm text-foreground placeholder-muted-foreground/40"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground uppercase tracking-widest block">
                                    <span className="text-accent-green">$</span> PASSWORD
                                </label>
                                <div className="flex items-center bg-black/50 border border-panel-border rounded px-3 py-2 focus-within:border-accent-green transition-colors">
                                    <span className="text-accent-cyan text-sm mr-2">{">"}</span>
                                    <input
                                        id="admin-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="bg-transparent flex-1 outline-none text-sm text-foreground placeholder-muted-foreground/40"
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            {/* Error message */}
                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center space-x-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded px-3 py-2"
                                >
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    <span>[ERR] {errorMsg}</span>
                                </motion.div>
                            )}

                            {/* Submit */}
                            <button
                                id="admin-login-btn"
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full flex items-center justify-center space-x-2 py-3 bg-accent-green/10 border border-accent-green/50 text-accent-green rounded hover:bg-accent-green/20 hover:border-accent-green transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-accent-green border-t-transparent rounded-full"
                                        />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        <span>./login --exec</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-muted-foreground text-xs mt-6 text-center opacity-50">
                            Not you? This page is restricted.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
