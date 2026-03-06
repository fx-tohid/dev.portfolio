"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X, Command, Code, Box } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Magnetic from "@/components/ui/Magnetic";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <header
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4 md:py-5" : "py-8 md:py-10"
                }`}
        >
            {/* Elite Scroll Progress Line */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-primary to-accent-secondary origin-left z-[101]"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav
                    className={`flex items-center justify-between px-8 py-3 rounded-[24px] border transition-all duration-500 overflow-hidden group ${scrolled
                        ? "bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                        : "bg-transparent border-transparent"
                        }`}
                >
                    {/* Animated background glow inside navbar */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

                    {/* Logo with Magnetic pull */}
                    <Magnetic strength={0.2}>
                        <Link href="/" className="flex items-center space-x-3 group z-[110]">
                            <div className="p-2.5 bg-accent-primary/10 rounded-xl group-hover:bg-accent-primary/20 transition-all duration-500 border border-accent-primary/5 group-hover:border-accent-primary/30">
                                <Box className="w-5 h-5 text-accent-primary group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                            </div>
                            <span className="font-mono font-bold text-lg tracking-tight text-white transition-all group-hover:text-accent-primary">
                                system<span className="text-accent-primary">.</span>node<span className="text-accent-primary animate-pulse">_</span>
                            </span>
                        </Link>
                    </Magnetic>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`relative px-5 py-2 font-mono text-[10px] uppercase font-bold tracking-[0.2em] rounded-xl transition-all ${isActive
                                        ? "text-accent-primary"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-glow-modern"
                                            className="absolute inset-0 bg-accent-primary/5 border border-accent-primary/20 rounded-xl -z-10"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <div className="h-4 w-px bg-white/10 mx-6" />
                        <Link
                            href="/admin"
                            className="p-2.5 text-white/20 hover:text-accent-secondary transition-all hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
                        >
                            <Command className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-[110] p-2.5 text-white/60 hover:text-white transition-all active:scale-95 bg-white/5 rounded-xl border border-white/10"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>
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
                            className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-[90] md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 35, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] sm:w-[70%] bg-[#020617] border-l border-white/5 z-[100] md:hidden flex flex-col p-12 pt-40"
                        >
                            {/* Decorative architectural elements */}
                            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                                <Box className="w-[400px] h-[400px] absolute -right-20 -top-20 text-accent-primary" />
                            </div>

                            <nav className="flex flex-col space-y-12 relative z-10">
                                {navLinks.map((link, idx) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Link
                                                href={link.path}
                                                className={`text-4xl font-sans font-black flex items-center group tracking-tighter ${isActive ? "text-accent-primary" : "text-white/30 hover:text-white"
                                                    }`}
                                            >
                                                <span className={`mr-6 text-[10px] font-mono tracking-widest transition-colors ${isActive ? 'text-accent-primary' : 'text-white/10'}`}>
                                                    0{idx + 1} //
                                                </span>
                                                {link.name.toLowerCase()}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <div className="mt-auto pt-12 border-t border-white/5 relative z-10">
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-4 text-white/30 hover:text-accent-primary transition-all group"
                                >
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:border-accent-primary/40 group-hover:bg-accent-primary/5 transition-all">
                                        <Command className="w-5 h-5" />
                                    </div>
                                    <span className="font-mono text-xs uppercase font-bold tracking-[0.3em]">Access Command</span>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
