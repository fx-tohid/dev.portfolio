"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Home,
    User,
    Code,
    Mail,
    FileText,
    Settings,
    Terminal as TerminalIcon,
    Command,
    ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
    { id: "home", label: "Navigate: Home", icon: Home, path: "/", shortcut: "H" },
    { id: "about", label: "Navigate: About_System", icon: User, path: "/about", shortcut: "A" },
    { id: "blog", label: "Navigate: Thought_Logs", icon: FileText, path: "/blog", shortcut: "B" },
    { id: "contact", label: "Navigate: Contact_Protocol", icon: Mail, path: "/contact", shortcut: "C" },
    { id: "admin", label: "Navigate: Admin_Terminal", icon: Settings, path: "/admin", shortcut: "S" },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const filteredCommands = COMMANDS.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    const closePalette = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }, []);

    const executeCommand = useCallback((path: string) => {
        router.push(path);
        closePalette();
    }, [router, closePalette]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }

            if (isOpen) {
                if (e.key === "Escape") closePalette();
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                }
                if (e.key === "Enter") {
                    e.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        executeCommand(filteredCommands[selectedIndex].path);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, executeCommand, closePalette]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePalette}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-xl bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                            <TerminalIcon className="w-5 h-5 text-accent-primary mr-4" />
                            <input
                                autoFocus
                                placeholder="Execute_Command..."
                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20 font-mono"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                            />
                            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/40">
                                <Command className="w-2.5 h-2.5" />
                                <span>K</span>
                            </div>
                        </div>

                        <div className="max-h-[350px] overflow-y-auto p-3 custom-scrollbar">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((cmd, idx) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => executeCommand(cmd.path)}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 ${idx === selectedIndex ? "bg-accent-primary/10 border border-accent-primary/20 text-white" : "text-white/40 border border-transparent"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <cmd.icon className={`w-4 h-4 ${idx === selectedIndex ? "text-accent-primary" : "text-white/20"}`} />
                                            <span className="text-xs font-mono tracking-tight">{cmd.label}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {idx === selectedIndex && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-[9px] font-black text-accent-primary uppercase tracking-[0.2em]"
                                                >
                                                    EXECUTE
                                                </motion.span>
                                            )}
                                            <span className="text-[10px] font-mono opacity-20 bg-white/5 px-2 py-1 rounded">{cmd.shortcut}</span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="py-12 text-center text-white/20 font-mono text-xs italic">
                                    No_Node_Found_Matches_Stream
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex items-center justify-between text-[10px] text-white/20 font-mono">
                            <div className="flex gap-4">
                                <span><span className="text-white/40 font-bold">↑↓</span> to Navigate</span>
                                <span><span className="text-white/40 font-bold">↵</span> to Select</span>
                            </div>
                            <span>ESC to close</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
