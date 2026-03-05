"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, ExternalLink, Github, Terminal, Loader2 } from "lucide-react";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-bold font-mono text-accent-cyan flex items-center">
                    <Terminal className="inline-block mr-4 w-8 h-8" />
                    ls ./projects
                </h1>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                    A showcase of systems, applications, and experiments I've built.
                    Filter by the specific technologies to find what you're looking for.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 opacity-50">
                    <Loader2 className="w-12 h-12 text-accent-green animate-spin mb-4" />
                    <p className="font-mono text-sm animate-pulse">Initializing data streams...</p>
                </div>
            ) : (
                <>
                    {/* Filter Menu */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-3 mb-12"
                    >
                        <button
                            onClick={() => setActiveFilter("All")}
                            className={`px-4 py-2 font-mono text-sm border rounded transition-colors ${activeFilter === "All" ? "bg-accent-green text-background border-accent-green" : "border-panel-border text-muted-foreground hover:border-accent-green hover:text-accent-green"}`}
                        >
                            All
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-4 py-2 font-mono text-sm border rounded transition-colors ${activeFilter === tag ? "bg-accent-green text-background border-accent-green" : "border-panel-border text-muted-foreground hover:border-accent-green hover:text-accent-green"}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={project.id}
                                    className="group relative bg-panel-bg rounded-xl border border-panel-border p-6 hover:border-accent-green transition-colors flex flex-col h-full overflow-hidden"
                                >
                                    {/* Glowing hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <div className="flex justify-between items-start mb-6">
                                        <Folder className="w-10 h-10 text-accent-green" />
                                        <div className="flex space-x-3">
                                            {project.github_url && (
                                                <a href={project.github_url} className="text-muted-foreground hover:text-accent-cyan transition-colors" aria-label="GitHub">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a href={project.live_url} className="text-muted-foreground hover:text-accent-green transition-colors" aria-label="Live Demo">
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent-cyan transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 flex-grow text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.map((t) => (
                                            <span key={t} className="font-mono text-xs text-accent-green bg-accent-green/10 px-2 py-1 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredProjects.length === 0 && (
                            <div className="col-span-full text-center py-20 opacity-50 border border-dashed border-panel-border rounded-xl">
                                <p className="font-mono text-sm text-muted-foreground">No projects found matching the filter.</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </div>
    );
}
