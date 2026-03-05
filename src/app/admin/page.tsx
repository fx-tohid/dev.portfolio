"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal, Shield, RefreshCcw, Mail, User, Clock, LogOut, Plus,
    Trash2, Folder, ExternalLink, Github, Code, LayoutDashboard,
    Activity, Database, Cpu, HardDrive, Wifi, Lock, AlertCircle,
    Settings, Star, Save, CheckCircle, Layers, Zap, Box
} from "lucide-react";
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

interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
}

interface Profile {
    id: string;
    name: string;
    role: string;
    bio: string;
    github_url: string;
    linkedin_url: string;
}

interface SystemStat {
    cpu: number;
    ram: number;
    net: string;
    storage: number;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "projects" | "profile" | "skills">("overview");
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulated Stats
    const [stats, setStats] = useState<SystemStat>({ cpu: 12, ram: 42, net: "1.2MB/s", storage: 88 });
    const [logs, setLogs] = useState<string[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);

    // New Project Form State
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        tech: "",
        github_url: "",
        live_url: ""
    });

    // New Skill Form State
    const [newSkill, setNewSkill] = useState({
        name: "",
        level: 85,
        category: "Frontend"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [editingProject, setEditingProject] = useState<string | null>(null);
    const [editingSkill, setEditingSkill] = useState<string | null>(null);

    // Modal State
    const [modal, setModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        confirmText: string;
        type: "danger" | "warning";
    }>({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => { },
        confirmText: "Execute",
        type: "warning"
    });

    const router = useRouter();
    const supabase = createClient();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [subRes, projRes, skillRes, profileRes] = await Promise.all([
                fetch("/api/contact"),
                fetch("/api/projects"),
                fetch("/api/skills"),
                fetch("/api/profile")
            ]);

            setSubmissions(await subRes.json());
            setProjects(await projRes.json());
            setSkills(await skillRes.json());
            setProfile(await profileRes.json());

            setError(null);
            addLog("System sync complete. All database clusters operational.");
        } catch (err) {
            setError("Critical system error: Sync failure.");
            addLog("ERROR: Data retrieval failed. Connection refused.");
        } finally {
            setLoading(false);
        }
    };

    const addLog = (msg: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-19), `[${time}] ${msg}`]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                cpu: Math.floor(Math.random() * 20) + 5,
                ram: Math.floor(Math.random() * 10) + 40,
                net: `${(Math.random() * 2).toFixed(1)}MB/s`,
                storage: 88
            });

            const events = [
                "Heartbeat pulse detected",
                "Backup buffer optimized",
                "Indexing secure sectors",
                "New session authenticated",
                "Port 443 active",
            ];
            if (Math.random() > 0.8) addLog(events[Math.floor(Math.random() * events.length)]);
        }, 3000);

        fetchData();
        return () => clearInterval(interval);
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setIsSavingProfile(true);
        addLog("Updating core profile settings...");
        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile)
            });
            if (!res.ok) throw new Error("Update failed");
            addLog("SUCCESS: Profile matrix updated.");
        } catch (err) {
            addLog("ERROR: Profile write access denied.");
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleCreateSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        addLog(`${editingSkill ? 'Updating' : 'Registering'} skill capability: ${newSkill.name}`);
        try {
            const res = await fetch("/api/skills", {
                method: editingSkill ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingSkill ? { ...newSkill, id: editingSkill } : newSkill)
            });
            if (!res.ok) throw new Error();
            setNewSkill({ name: "", level: 85, category: "Frontend" });
            setEditingSkill(null);
            fetchData();
            addLog(`SUCCESS: Skill ${editingSkill ? 'updated' : 'registered'}.`);
        } catch (err) {
            addLog(`ERROR: Skill ${editingSkill ? 'update' : 'registration'} failed.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSkill = (skill: Skill) => {
        setNewSkill({ name: skill.name, level: skill.level, category: skill.category });
        setEditingSkill(skill.id);
        setActiveTab("skills");
        addLog(`Loaded skill module for edit: ${skill.name}`);
    };

    const handleDeleteSkill = async (id: string) => {
        setModal({
            isOpen: true,
            title: "Deprecate Skill Module",
            message: "This action will permanently remove this skill from your matrix. Are you sure?",
            confirmText: "DEPRECATE",
            type: "danger",
            onConfirm: async () => {
                addLog("Deprecating skill module...");
                try {
                    await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
                    fetchData();
                    addLog("SUCCESS: Module deprecated.");
                } catch (err) {
                    addLog("ERROR: Deprecation failed.");
                }
                setModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        addLog(`${editingProject ? 'Updating' : 'Building'} project: ${newProject.title}...`);
        try {
            const payload = {
                ...newProject,
                id: editingProject,
                tech: newProject.tech.split(",").map(t => t.trim()).filter(Boolean)
            };
            const response = await fetch("/api/projects", {
                method: editingProject ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error();
            setNewProject({ title: "", description: "", tech: "", github_url: "", live_url: "" });
            setEditingProject(null);
            fetchData();
            addLog(`SUCCESS: ${payload.title} ${editingProject ? 'updated' : 'deployed'}.`);
        } catch (err) {
            addLog(`ERROR: ${editingProject ? 'Update' : 'Build'} failed.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditProject = (project: Project) => {
        setNewProject({
            title: project.title,
            description: project.description,
            tech: project.tech.join(", "),
            github_url: project.github_url || "",
            live_url: project.live_url || ""
        });
        setEditingProject(project.id);
        setActiveTab("projects");
        addLog(`Loaded project module for edit: ${project.title}`);
    };

    const handleDeleteProject = async (id: string) => {
        setModal({
            isOpen: true,
            title: "Purge Project Data",
            message: "Proceeding will permanently delete this deployment from the database. This action is irreversible.",
            confirmText: "PURGE",
            type: "danger",
            onConfirm: async () => {
                addLog("Data purge initiated...");
                try {
                    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
                    fetchData();
                    addLog("SUCCESS: Purged.");
                } catch (err) {
                    addLog("ERROR: Purge failed.");
                }
                setModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleDeleteContact = async (id: string, name: string) => {
        setModal({
            isOpen: true,
            title: "Clear Contact Node",
            message: `You are about to delete the message from ${name}. Proceed?`,
            confirmText: "CLEAR",
            type: "warning",
            onConfirm: async () => {
                addLog(`Deleting contact node from ${name}...`);
                try {
                    const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
                    if (!res.ok) throw new Error();
                    fetchData();
                    addLog("SUCCESS: Node cleared.");
                } catch (err) {
                    addLog("ERROR: Deletion failed.");
                }
                setModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handlePurgeContacts = async () => {
        setModal({
            isOpen: true,
            title: "CRITICAL: FULL MATRIX PURGE",
            message: "WARNING: You are about to wipe ALL communication data from the system. This cannot be undone. System protocol requires absolute confirmation.",
            confirmText: "EXECUTE_PURGE",
            type: "danger",
            onConfirm: async () => {
                addLog("CAUTION: Initiating full message matrix purge...");
                try {
                    const res = await fetch("/api/contact?id=all", { method: "DELETE" });
                    if (!res.ok) throw new Error();
                    fetchData();
                    addLog("SUCCESS: Entire message store purged.");
                } catch (err) {
                    addLog("ERROR: Purge sequence failed.");
                }
                setModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen font-mono bg-background">
            {/* Optimized Header - Slate & Indigo style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 glass-panel p-6 rounded-[24px] border border-white/5 border-l-4 border-l-accent-primary shadow-2xl"
            >
                <div className="flex items-center gap-5">
                    <div className="p-3.5 bg-accent-primary/10 rounded-2xl border border-accent-primary/20">
                        <Box className="w-8 h-8 text-accent-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter text-white">COMMAND_CENTER_V4 <span className="text-[9px] bg-accent-secondary/10 text-accent-secondary px-2.5 py-1 rounded-full border border-accent-secondary/20 ml-3 uppercase font-bold tracking-widest">Live System</span></h1>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="flex h-1.5 w-1.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-primary"></span>
                            </span>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Admin: <span className="text-white">{profile?.name || 'ROOT'}</span> | Env: PROD</p>
                        </div>
                    </div>
                </div>
                <button onClick={handleSignOut} className="px-6 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                    Terminate Session
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-panel border border-white/5 rounded-[24px] p-5 shadow-xl">
                        <p className="text-[9px] text-accent-primary font-bold mb-5 tracking-[0.3em] uppercase opacity-60">Control Modules</p>
                        <div className="space-y-1.5">
                            {[
                                { id: "overview", label: "Dashboard", icon: LayoutDashboard },
                                { id: "profile", label: "Identity Setup", icon: User },
                                { id: "skills", label: "Skill Matrix", icon: Star },
                                { id: "projects", label: "Deployments", icon: Database },
                                { id: "contacts", label: "Communication", icon: Mail },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${activeTab === item.id
                                        ? "bg-accent-primary/10 border-accent-primary/30 text-accent-primary px-5 shadow-lg shadow-accent-primary/5"
                                        : "border-transparent text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="glass-panel border border-white/5 rounded-[24px] p-5 shadow-xl">
                        <p className="text-[9px] text-accent-secondary font-bold mb-5 tracking-[0.3em] uppercase opacity-60">System Resources</p>
                        <div className="space-y-5">
                            <StatBar label="CPU_CORE" val={stats.cpu} col="bg-accent-primary" />
                            <StatBar label="MEM_BUFFER" val={stats.ram} col="bg-accent-secondary" />
                            <div className="flex justify-between border-t border-white/5 pt-5 opacity-70 text-[10px]">
                                <span className="font-bold flex items-center gap-2">
                                    <Wifi className="w-3 h-3 text-accent-primary" />
                                    TX_STREAM
                                </span>
                                <span className="text-white font-mono">{stats.net}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Viewport */}
                <div className="lg:col-span-9 glass-card rounded-[32px] border border-white/5 p-8 shadow-2xl min-h-[600px] relative overflow-hidden backdrop-blur-3xl">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                        <Box className="w-64 h-64 text-accent-primary" />
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "overview" && (
                            <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <MetricCard label="COMM_TX" val={submissions.length} icon={Mail} color="text-accent-primary" />
                                    <MetricCard label="BUILD_ACTIVE" val={projects.length} icon={Code} color="text-accent-secondary" />
                                    <MetricCard label="HEALTH_INDEX" val="99.9%" icon={Activity} color="text-emerald-400" />
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-mono text-accent-primary tracking-widest uppercase ml-1">Live Output Monitor</p>
                                    <div className="bg-[#050505]/80 rounded-2xl border border-white/5 p-6 font-mono text-[11px] h-[350px] overflow-y-auto shadow-inner" ref={logContainerRef}>
                                        {logs.map((l, i) => (
                                            <div key={i} className="mb-2 flex gap-4 hover:bg-white/5 transition-colors p-1 rounded">
                                                <span className="text-accent-primary opacity-40 shrink-0">[{new Date().toLocaleDateString()}]</span>
                                                <span className="text-white/80 shrink-0 select-none">❯</span>
                                                <span className={l.includes("ERROR") ? "text-red-400" : l.includes("SUCCESS") ? "text-accent-primary" : "text-white/60"}>{l}</span>
                                            </div>
                                        ))}
                                        <div className="animate-pulse flex gap-2 mt-4 ml-14">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary opacity-40"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary opacity-40"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary opacity-40"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "profile" && profile && (
                            <motion.div key="pr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto">
                                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                                    <Settings className="w-7 h-7 text-accent-primary animate-spin-slow" />
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight text-white">ID_MATRIX_OVERRIDE</h2>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Global System Identity Stream</p>
                                    </div>
                                </div>
                                <form onSubmit={handleUpdateProfile} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="System Name" val={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                                        <FormGroup label="Core Function" val={profile.role} onChange={(v) => setProfile({ ...profile, role: v })} />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] ml-1">Bio_Data_Array</label>
                                        <textarea
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            className="w-full bg-[#050505] border border-white/10 rounded-2xl p-6 text-xs text-white/80 focus:border-accent-primary outline-none min-h-[180px] shadow-inner transition-all resize-none"
                                            placeholder="Enter your system background..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="GitHub Node" val={profile.github_url} onChange={(v) => setProfile({ ...profile, github_url: v })} />
                                        <FormGroup label="LinkedIn Node" val={profile.linkedin_url} onChange={(v) => setProfile({ ...profile, linkedin_url: v })} />
                                    </div>
                                    <button disabled={isSavingProfile} className="group w-full py-5 bg-accent-primary text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl hover:shadow-accent-primary/20 transition-all flex items-center justify-center gap-3 overflow-hidden relative active:scale-[0.98]">
                                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        {isSavingProfile ? 'WRITING...' : 'Update Global Matrix'}
                                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500"></div>
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === "skills" && (
                            <motion.div key="sk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                                <div className="glass-panel border border-white/10 p-8 rounded-[24px] shadow-xl">
                                    <h3 className="text-xs font-bold mb-8 flex items-center gap-3 text-accent-secondary uppercase tracking-[0.2em]">
                                        <Zap className="w-4 h-4" />
                                        {editingSkill ? 'Override Skill Module' : 'Inject Skill Module'}
                                        {editingSkill && (
                                            <button onClick={() => { setEditingSkill(null); setNewSkill({ name: "", level: 85, category: "Frontend" }); }} className="ml-auto text-[9px] text-red-400 hover:text-red-300">CANCEL_EDIT</button>
                                        )}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-bold text-muted-foreground ml-1">Capability Label</label>
                                            <input placeholder="Skill Name" className="w-full bg-[#050505] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-accent-primary"
                                                value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-bold text-muted-foreground ml-1">Domain Class</label>
                                            <select className="w-full bg-[#050505] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-accent-primary cursor-pointer"
                                                value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}>
                                                <option>Frontend</option>
                                                <option>Backend</option>
                                                <option>Tools</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-bold text-muted-foreground ml-1">Power Level %</label>
                                            <input type="number" placeholder="85" className="w-full bg-[#050505] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-accent-primary"
                                                value={newSkill.level} onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })} />
                                        </div>
                                        <button onClick={handleCreateSkill} className={`md:col-span-3 py-4 ${editingSkill ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary' : 'bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary'} text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-opacity-100 hover:text-white transition-all shadow-lg active:scale-[0.98]`}>
                                            {editingSkill ? 'EXECUTE_OVERRIDE' : 'EXECUTE_LOAD'}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {skills.map(skill => (
                                        <div key={skill.id} className="glass-panel border border-white/5 p-5 rounded-[20px] flex items-center justify-between group hover:border-accent-primary/40 transition-all shadow-lg">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary opacity-40 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                                                    <p className="text-xs font-black text-white uppercase tracking-wider">{skill.name} <span className="text-[9px] text-accent-primary ml-2 font-mono">[{skill.category}]</span></p>
                                                </div>
                                                <div className="w-48 h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-accent-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${skill.level}%` }} />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button onClick={() => handleEditSkill(skill)} className="p-2.5 bg-accent-primary/10 text-accent-primary rounded-lg hover:bg-accent-primary hover:text-white border border-accent-primary/20">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteSkill(skill.id)} className="p-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white border border-red-500/20">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "contacts" && (
                            <motion.div key="ct" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xs font-black text-accent-primary uppercase tracking-[0.3em] flex items-center gap-3">
                                        <Mail className="w-4 h-4" />
                                        Incoming Comms Stream
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] text-muted-foreground font-mono bg-white/5 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-white/5">
                                            Total: {submissions.length} Nodes
                                        </span>
                                        {submissions.length > 0 && (
                                            <button
                                                onClick={handlePurgeContacts}
                                                className="text-[9px] text-red-500 hover:text-red-400 font-bold tracking-widest flex items-center gap-2 px-3 py-1 bg-red-500/5 rounded-full border border-red-500/10 hover:border-red-500/30 transition-all"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                PURGE_ALL
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {submissions.map(s => (
                                        <div key={s.id} className="glass-panel border border-white/5 p-6 rounded-[24px] hover:border-accent-primary/30 transition-all group shadow-lg">
                                            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary font-bold">
                                                        {s.name[0]}
                                                    </div>
                                                    <div>
                                                        <span className="text-white text-[12px] font-black uppercase tracking-tight block">{s.name}</span>
                                                        <span className="text-accent-primary text-[9px] font-mono block opacity-60 mt-0.5">{s.email}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-muted-foreground text-[9px] font-mono bg-white/5 px-2.5 py-1 rounded uppercase tracking-[0.1em] border border-white/5">{new Date(s.created_at).toLocaleDateString()}</span>
                                                    <button onClick={() => handleDeleteContact(s.id, s.name)} className="p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-500/20">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-[9px] text-accent-primary font-bold tracking-[0.2em] opacity-40 uppercase ml-1">Decrypted Content:</p>
                                                <p className="text-xs text-white/70 leading-relaxed font-sans bg-black/20 p-4 rounded-xl border border-white/5 italic">"{s.message}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "projects" && (
                            <motion.div key="pj" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                <div className="glass-panel border border-white/10 p-8 rounded-[32px] space-y-8 shadow-xl">
                                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                        <Box className="w-6 h-6 text-accent-primary" />
                                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] flex-1">
                                            {editingProject ? 'Override Payload Configuration' : 'Initialize New Payload'}
                                        </h3>
                                        {editingProject && (
                                            <button onClick={() => { setEditingProject(null); setNewProject({ title: "", description: "", tech: "", github_url: "", live_url: "" }); }} className="text-[9px] text-red-400 hover:text-red-300 font-bold tracking-widest">CANCEL_EDIT</button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormGroup label="Project Identifier" val={newProject.title} onChange={e => setNewProject({ ...newProject, title: e })} />
                                        <FormGroup label="Tech Stack (comma separated)" val={newProject.tech} onChange={e => setNewProject({ ...newProject, tech: e })} />
                                        <FormGroup label="GitHub URL" val={newProject.github_url} onChange={e => setNewProject({ ...newProject, github_url: e })} />
                                        <FormGroup label="Deployment URL" val={newProject.live_url} onChange={e => setNewProject({ ...newProject, live_url: e })} />
                                        <div className="md:col-span-2 space-y-2.5">
                                            <label className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] ml-1">Mission Briefing</label>
                                            <textarea placeholder="Describe the deployment objectives..." className="w-full bg-[#050505] border border-white/10 rounded-2xl p-6 text-xs text-white/80 outline-none focus:border-accent-primary min-h-[140px] resize-none transition-all shadow-inner"
                                                value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                                        </div>
                                    </div>
                                    <button onClick={handleCreateProject} className="group w-full py-5 bg-accent-primary text-white text-[11px] font-black rounded-2xl shadow-xl hover:shadow-accent-primary/20 transition-all uppercase tracking-[0.5em] active:scale-[0.98] overflow-hidden relative">
                                        <span className="relative z-10">{editingProject ? 'Execute Override' : 'Push to Production'}</span>
                                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500"></div>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map(p => (
                                        <div key={p.id} className="glass-panel border border-white/5 p-6 rounded-[28px] flex justify-between items-center group transition-all hover:border-accent-primary/40 shadow-lg">
                                            <div className="flex items-center gap-5">
                                                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/20 transition-all">
                                                    <Layers className="w-5 h-5 text-accent-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div>
                                                    <span className="text-[13px] font-black text-white uppercase tracking-tight block">{p.title}</span>
                                                    <span className="text-[9px] text-muted-foreground font-mono block mt-1 uppercase tracking-widest">{p.tech.slice(0, 3).join(' • ')}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button onClick={() => handleEditProject(p)} className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white border border-accent-primary/20 shadow-lg">
                                                    <Settings className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDeleteProject(p.id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-red-500/20 shadow-lg">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modal.isOpen}
                onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={modal.onConfirm}
                title={modal.title}
                message={modal.message}
                confirmText={modal.confirmText}
                type={modal.type}
            />
        </div>
    );
}

// Sub-components
function StatBar({ label, val, col }: { label: string, val: number, col: string }) {
    return (
        <div className="space-y-2 opacity-80">
            <div className="flex justify-between font-mono text-[9px] tracking-widest">
                <span className="text-white/60">{label}</span>
                <span className="text-white font-bold">{val}%</span>
            </div>
            <div className="h-[2px] bg-white/5 w-full rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    className={`h-full ${col} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                />
            </div>
        </div>
    );
}
function MetricCard({ label, val, icon: Icon, color }: { label: string, val: any, icon: any, color: string }) {
    return (
        <div className="glass-panel border border-white/5 p-6 rounded-[28px] hover:border-accent-primary/30 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                <Icon className="w-12 h-12" />
            </div>
            <Icon className={`w-5 h-5 ${color} mb-6 opacity-80`} />
            <div className="text-4xl font-black mb-1.5 tracking-tighter text-white">{val}</div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
        </div>
    );
}
function FormGroup({ label, val, onChange }: { label: string, val: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-2.5">
            <label className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] ml-1">{label}</label>
            <input
                type="text"
                value={val || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-xs text-white focus:border-accent-primary outline-none shadow-inner transition-all hover:border-white/20"
            />
        </div>
    );
}

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText, type }: {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    message: string,
    confirmText: string,
    type: "danger" | "warning"
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Type Indicator */}
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${type === 'danger' ? 'bg-red-500' : 'bg-amber-500'} opacity-50`} />

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'} border border-current/20`}>
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black tracking-tight text-white uppercase">{title}</h3>
                        </div>

                        <p className="text-xs text-white/60 leading-relaxed mb-8 font-mono">
                            {message}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                            >
                                Abort_Task
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`flex-1 py-4 ${type === 'danger' ? 'bg-red-500 text-white' : 'bg-amber-500 text-black'} text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:brightness-110 transition-all`}
                            >
                                {confirmText}
                            </button>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none">
                            <Shield className="w-40 h-40 text-white" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
