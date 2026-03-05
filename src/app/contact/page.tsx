"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, CheckCircle, AlertCircle } from "lucide-react";

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[calc(100vh-160px)] flex flex-col justify-center">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold font-mono text-accent-green mb-4 flex items-center justify-center">
                    <Terminal className="inline-block mr-4 w-8 h-8" />
                    ./contact.sh
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Interested in working together or just want to say hi? Drop me a message below.
                    My inbox is always open.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative bg-panel-bg border border-panel-border p-8 rounded-xl backdrop-blur-md shadow-2xl overflow-hidden max-w-2xl mx-auto w-full"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl -z-10" />

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                            <span className="text-accent-cyan mr-2">$</span>
                            read -p "Enter Name:" name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            disabled={status === "submitting"}
                            className="w-full bg-black/50 border border-panel-border rounded bg-transparent px-4 py-3 text-foreground font-mono focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green transition-colors disabled:opacity-50"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                            <span className="text-accent-cyan mr-2">$</span>
                            read -p "Enter Email:" email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            disabled={status === "submitting"}
                            className="w-full bg-black/50 border border-panel-border rounded bg-transparent px-4 py-3 text-foreground font-mono focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors disabled:opacity-50"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                            <span className="text-accent-cyan mr-2">$</span>
                            cat &lt;&lt; EOF &gt; message.txt
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            disabled={status === "submitting"}
                            rows={5}
                            className="w-full bg-black/50 border border-panel-border rounded bg-transparent px-4 py-3 text-foreground font-mono focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green transition-colors resize-none disabled:opacity-50"
                            placeholder="Your message here..."
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === "submitting"}
                        type="submit"
                        className="w-full relative px-6 py-4 font-mono font-bold text-background bg-gradient-to-r from-accent-green to-accent-cyan rounded overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group transition-all"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            {status === "idle" && (
                                <>
                                    <Send className="mr-2 w-4 h-4" />
                                    ./send_message.sh
                                </>
                            )}
                            {status === "submitting" && (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="mr-2 w-4 h-4 rounded-full border-2 border-background border-t-transparent"
                                    />
                                    Transmitting...
                                </>
                            )}
                            {status === "success" && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center text-background"
                                >
                                    <CheckCircle className="mr-2 w-4 h-4" />
                                    Message Delivered
                                </motion.span>
                            )}
                            {status === "error" && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center text-red-900"
                                >
                                    <AlertCircle className="mr-2 w-4 h-4" />
                                    Transmission Failed
                                </motion.span>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
