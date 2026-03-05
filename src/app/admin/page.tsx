"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, RefreshCcw, Mail, User, Clock, LogOut, Plus, Trash2, Folder, ExternalLink, Github, Code } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github_url: string;
    live_url: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"contacts" | "projects">("contacts");
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // New Project Form State
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        tech: "",
        github_url: "",
        live_url: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const fetchData = async () => {
        setLoading(true);
        try {
            const submissionsResponse = await fetch("/api/contact");
            const projectsResponse = await fetch("/api/projects");

            if (!submissionsResponse.ok || !projectsResponse.ok) throw new Error("Failed to fetch data");

            setSubmissions(await submissionsResponse.json());
            setProjects(await projectsResponse.json());
            setError(null);
        } catch (err) {
            setError("Critical system error: Failed to retrieve data packets.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                ...newProject,
                tech: newProject.tech.split(",").map(t => t.trim()).filter(Boolean)
            };

            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Failed to create project");

            setNewProject({ title: "", description: "", tech: "", github_url: "", live_url: "" });
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const response = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete project");
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to delete project");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
            >
                <div>
                    <h1 className="text-3xl font-bold font-mono text-accent-green flex items-center">
                        <Shield className="mr-4 w-8 h-8" />
                        ./admin_console.sh
                    </h1>
                    <p className="text-muted-foreground mt-2 font-mono text-sm">
                        Authenticated Access | Status: <span className="text-accent-cyan">Secure</span>
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-panel-bg border border-panel-border rounded hover:border-accent-green transition-all font-mono text-sm"
                    >
                        <RefreshCcw className={`mr-2 w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        sync --force
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded hover:bg-red-900/40 hover:border-red-500 transition-all font-mono text-sm"
                    >
                        <LogOut className="mr-2 w-4 h-4" />
                        exit
                    </button>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex border-b border-panel-border mb-8 gap-8">
                <button
                    onClick={() => setActiveTab("contacts")}
                    className={`pb-4 font-mono text-sm transition-all border-b-2 ${activeTab === "contacts" ? "border-accent-green text-accent-green" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                    {">"} contacts ({submissions.length})
                </button>
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`pb-4 font-mono text-sm transition-all border-b-2 ${activeTab === "projects" ? "border-accent-cyan text-accent-cyan" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                    {">"} projects ({projects.length})
                </button>
            </div>

            {error && (
                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded mb-8 text-red-400 font-mono text-sm">
                    [ERROR] {error}
                </div>
            )}

            {loading && submissions.length === 0 && projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full mb-4"
                    />
                    <p className="font-mono text-sm animate-pulse">Scanning database...</p>
                </div>
            ) : (
                <div>
                    {activeTab === "contacts" ? (
                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence>
                                {submissions.map((sub, idx) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-panel-bg border border-panel-border rounded-lg p-6 hover:border-accent-cyan transition-colors"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                            <div className="md:col-span-1 space-y-4">
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <User className="w-4 h-4 text-accent-green" />
                                                    <span className="font-bold text-foreground truncate">{sub.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <Mail className="w-4 h-4 text-accent-cyan" />
                                                    <span className="text-muted-foreground truncate">{sub.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-[10px] text-muted-foreground font-mono">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{new Date(sub.created_at).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="md:col-span-3 bg-black/30 p-4 rounded border border-panel-border/50">
                                                <div className="flex items-center text-[10px] text-muted-foreground font-mono mb-2 uppercase tracking-widest border-b border-panel-border/50 pb-1">
                                                    Message Content
                                                </div>
                                                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono">
                                                    {sub.message}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {submissions.length === 0 && !loading && (
                                <div className="text-center py-20 bg-panel-bg rounded border border-dashed border-panel-border opacity-50">
                                    <Terminal className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="font-mono text-sm">No data packets found in the queue.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Add Project Form */}
                            <div className="bg-panel-bg border border-panel-border rounded-xl p-8 max-w-4xl">
                                <h3 className="text-xl font-mono text-accent-cyan mb-6 flex items-center">
                                    <Plus className="mr-2 w-5 h-5" /> ./add_project.sh
                                </h3>
                                <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground"># TITLE</label>
                                        <input
                                            type="text"
                                            value={newProject.title}
                                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                            required
                                            className="w-full bg-black/50 border border-panel-border rounded p-2 text-sm outline-none focus:border-accent-cyan"
                                            placeholder="Project name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground"># TECH (COMMA SEPARATED)</label>
                                        <input
                                            type="text"
                                            value={newProject.tech}
                                            onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                                            required
                                            className="w-full bg-black/50 border border-panel-border rounded p-2 text-sm outline-none focus:border-accent-cyan"
                                            placeholder="React, Next.js, Tailwind"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground"># DESCRIPTION</label>
                                        <textarea
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                            required
                                            className="w-full bg-black/50 border border-panel-border rounded p-2 text-sm outline-none focus:border-accent-cyan h-24"
                                            placeholder="Brief project mission statement..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground"># GITHUB URL</label>
                                        <input
                                            type="url"
                                            value={newProject.github_url}
                                            onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                                            className="w-full bg-black/50 border border-panel-border rounded p-2 text-sm outline-none focus:border-accent-cyan"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground"># LIVE URL</label>
                                        <input
                                            type="url"
                                            value={newProject.live_url}
                                            onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                                            className="w-full bg-black/50 border border-panel-border rounded p-2 text-sm outline-none focus:border-accent-cyan"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 bg-accent-cyan/10 border border-accent-cyan/50 text-accent-cyan rounded hover:bg-accent-cyan transition-all hover:text-background font-mono font-bold"
                                        >
                                            {isSubmitting ? "Creating..." : "Execute Build"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Projects List */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-mono text-accent-green mb-6 flex items-center">
                                    <Code className="mr-2 w-5 h-5" /> Current Deployments
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {projects.map((project) => (
                                        <div key={project.id} className="bg-panel-bg border border-panel-border rounded-lg p-6 hover:border-accent-green transition-all relative group">
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                title="Delete project"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="flex justify-between items-start mb-4">
                                                <Folder className="w-10 h-10 text-accent-green" />
                                                <div className="flex space-x-2">
                                                    {project.github_url && <Github className="w-4 h-4 text-muted-foreground" />}
                                                    {project.live_url && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-foreground mb-2">{project.title}</h4>
                                            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {project.tech.map(t => (
                                                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 bg-accent-green/10 text-accent-green border border-accent-green/20 rounded">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
