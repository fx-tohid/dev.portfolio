"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <header className="fixed top-0 w-full z-50 bg-[#0a0a0a] border-b border-panel-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group z-50">
                        <Terminal className="w-6 h-6 text-accent-green group-hover:text-accent-cyan transition-colors" />
                        <span className="font-mono font-bold text-lg tracking-wider text-accent-green transition-colors group-hover:text-accent-cyan">
                            ~/portfolio
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className="relative group font-mono text-sm py-2"
                                >
                                    <span className={`${isActive ? "text-accent-green" : "text-muted-foreground"} group-hover:text-accent-cyan transition-colors`}>
                                        {link.name.toLowerCase()}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 p-2 text-accent-green hover:text-accent-cyan transition-colors focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/90 z-30 md:hidden"
                        />

                        {/* Drawer - COMPLETY SOLID BACKGROUND */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[70%] sm:w-[50%] bg-[#0f0f0f] border-l border-accent-green shadow-[-20px_0_50px_rgba(0,0,0,1)] z-[100] md:hidden flex flex-col p-8 pt-24"
                        >
                            {/* Background Decorative Pattern */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
                            </div>

                            <nav className="flex flex-col space-y-8 relative z-10">
                                {navLinks.map((link, idx) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                href={link.path}
                                                className={`text-2xl font-mono font-bold tracking-tight transition-all flex items-center ${isActive ? "text-accent-green" : "text-muted-foreground hover:text-accent-cyan"
                                                    }`}
                                            >
                                                <span className="text-accent-green mr-4 text-sm font-bold">$</span>
                                                {link.name.toLowerCase()}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Terminal Statistics Decoration */}
                            <div className="mt-auto space-y-6 font-mono text-xs text-muted-foreground">
                                <div className="border-t border-accent-green/30 pt-6">
                                    <p className="flex justify-between mb-2"><span># SCANNING...</span> <span className="text-accent-green font-bold">OK</span></p>
                                    <p className="flex justify-between mb-2"><span># UPTIME:</span> <span className="text-accent-cyan">99.9%</span></p>
                                    <p className="flex justify-between"><span># ENCRYPTION:</span> <span className="text-accent-green">AES-256</span></p>
                                </div>
                                <div className="animate-pulse bg-accent-green/5 p-4 rounded border border-accent-green/20">
                                    <p className="text-accent-green text-center font-bold tracking-widest text-sm uppercase">_V3_CORE_ACTIVE_</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
