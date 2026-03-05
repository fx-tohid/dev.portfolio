"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, ExternalLink, Github, Terminal, Loader2, Code, Box, Layers, Globe } from "lucide-react";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github_url: string;
    live_url: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/projects");
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const allTags = Array.from(new Set(projects.flatMap((p) => p.tech)));

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.tech.includes(activeFilter));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pb-60 transition-all duration-300">
            {/* Header section - Architectural Style */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 relative"
            >
                <div className="absolute -left-20 top-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                <h1 className="text-5xl md:text-7xl font-black font-sans text-white mb-8 tracking-tighter leading-none">
                    My Projects<span className="text-accent-primary animate-pulse">.</span>
                </h1>
                <p className="text-xl text-muted-foreground/80 max-w-2xl leading-relaxed font-light">
                    A showcase of my recent work, featuring full-stack applications, interactive interfaces, and technical experiments.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 opacity-50">
                    <Loader2 className="w-12 h-12 text-accent-primary animate-spin mb-6" />
                    <p className="font-mono text-xs uppercase tracking-[0.5em] animate-pulse">Loading Projects...</p>
                </div>
            ) : (
                <>
                    {/* Architectural Filter Menu */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-4 mb-20"
                    >
                        <button
                            onClick={() => setActiveFilter("All")}
                            className={`px-8 py-2.5 font-mono text-[10px] uppercase font-bold tracking-widest rounded-xl border transition-all duration-500 active:scale-95 ${activeFilter === "All" ? "bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20" : "border-white/10 text-white/40 hover:border-white/20 hover:text-white bg-white/[0.02]"}`}
                        >
                            All Projects
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-6 py-2.5 font-mono text-[10px] uppercase font-bold tracking-widest rounded-xl border transition-all duration-500 active:scale-95 ${activeFilter === tag ? "bg-accent-secondary text-white border-accent-secondary shadow-lg shadow-accent-secondary/20" : "border-white/10 text-white/40 hover:border-white/20 hover:text-white bg-white/[0.02]"}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid - Premium Glass Cards */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    key={project.id}
                                    className="group glass-card rounded-[32px] p-10 hover:border-accent-primary/40 flex flex-col h-full relative overflow-hidden"
                                >
                                    {/* High-end corner ornament */}
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                        <Box className="w-24 h-24 text-accent-primary" />
                                    </div>

                                    <div className="flex justify-between items-start mb-10 relative z-10">
                                        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-accent-primary/10 transition-colors border border-white/5 group-hover:border-accent-primary/30">
                                            <Layers className="w-10 h-10 text-accent-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex space-x-4">
                                            {project.github_url && (
                                                <a href={project.github_url} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-accent-primary hover:bg-accent-primary/10 border border-white/5 transition-all transform active:scale-90" aria-label="GitHub">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a href={project.live_url} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-accent-secondary hover:bg-accent-secondary/10 border border-white/5 transition-all transform active:scale-90" aria-label="Live Demo">
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-accent-primary transition-colors tracking-tight relative z-10">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/40 mb-10 flex-grow text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors relative z-10 italic">
                                        "{project.description}"
                                    </p>

                                    <div className="flex flex-wrap gap-2.5 mt-auto relative z-10">
                                        {project.tech.map((t) => (
                                            <span key={t} className="font-mono text-[9px] font-bold text-accent-primary bg-accent-primary/5 px-3 py-1.5 rounded-full border border-accent-primary/10 uppercase tracking-widest group-hover:border-accent-primary/30 transition-all">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Abstract grid background inside card */}
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredProjects.length === 0 && (
                            <div className="col-span-full text-center py-32 opacity-40 border-2 border-dashed border-white/5 rounded-[40px] glass-panel">
                                <p className="font-mono text-xs uppercase tracking-[0.5em] text-muted-foreground mb-4">No_Results_Found</p>
                                <button onClick={() => setActiveFilter("All")} className="text-accent-primary hover:underline font-mono text-[10px] uppercase tracking-widest">Reset_Filters</button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </div>
    );
}
