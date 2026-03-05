"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Zap, Globe, Shield, Loader2 } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setStatus("success");
                setFormState({ name: "", email: "", message: "" });
                // Reset status after a few seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                const data = await response.json();
                console.error("Submission failed:", data.error);
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pb-60 transition-all duration-300">
            {/* Header section - Architectural Style */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 relative text-center"
            >
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-80 h-80 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

                <h1 className="text-5xl md:text-7xl font-black font-sans text-white mb-8 tracking-tighter leading-none">
                    Contact Me<span className="text-accent-primary animate-pulse">.</span>
                </h1>
                <p className="text-xl text-muted-foreground/80 max-w-2xl leading-relaxed font-light mx-auto">
                    Have a project in mind or just want to say hello? I'm always open to discussing new opportunities and creative ideas.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start max-w-6xl mx-auto">
                {/* Visualizer & Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-5 space-y-8"
                >
                    <div className="glass-card p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                            <Mail className="w-24 h-24 text-accent-primary" />
                        </div>
                        <h3 className="text-xs font-mono text-accent-primary uppercase tracking-[0.5em] mb-6">Contact Details</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <Globe className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Availability</p>
                                    <p className="text-white font-bold">Ready for Remote work</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <Shield className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Direct Email</p>
                                    <p className="text-white font-bold">Encrypted Channel</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-[32px] border border-white/5 font-mono text-[10px] text-white/30 space-y-4">
                        <p className="text-accent-primary opacity-60 font-bold uppercase tracking-widest">Status Monitor:</p>
                        <div className="space-y-1 text-white/50">
                            <p><span className="text-accent-primary">❯</span> Secure connection established</p>
                            <p><span className="text-accent-primary">❯</span> Server ready for message</p>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side - Premium IDE style */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-7 glass-panel p-10 rounded-[40px] border border-white/10 shadow-2xl relative"
                >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-40"></div>

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="name" className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.3em] ml-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    disabled={status === "submitting"}
                                    className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-white font-sans text-sm focus:border-accent-primary outline-none shadow-inner transition-all hover:border-white/20 disabled:opacity-50"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="email" className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.3em] ml-1">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    disabled={status === "submitting"}
                                    className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-white font-sans text-sm focus:border-accent-primary outline-none shadow-inner transition-all hover:border-white/20 disabled:opacity-50"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="message" className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.3em] ml-1">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                disabled={status === "submitting"}
                                rows={6}
                                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-white font-sans text-sm focus:border-accent-primary outline-none shadow-inner transition-all hover:border-white/20 resize-none disabled:opacity-50"
                                placeholder="How can I help you?"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === "submitting"}
                            type="submit"
                            className="w-full relative py-5 font-mono font-black text-white bg-accent-primary rounded-2xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl hover:shadow-accent-primary/20 transition-all uppercase tracking-[0.5em] text-xs"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {status === "idle" && (
                                    <>
                                        <Send className="mr-3 w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                                {status === "submitting" && (
                                    <>
                                        <Loader2 className="mr-3 w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                )}
                                {status === "success" && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center"
                                    >
                                        <CheckCircle className="mr-3 w-4 h-4" />
                                        Message Sent
                                    </motion.span>
                                )}
                                {status === "error" && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center text-red-100"
                                    >
                                        <AlertCircle className="mr-3 w-4 h-4" />
                                        Sending Failed
                                    </motion.span>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500" />
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
