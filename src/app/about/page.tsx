"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Briefcase, Sparkles, ChevronRight, Layers, Box } from "lucide-react";
import { useEffect, useState } from "react";

interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
}

interface Profile {
    bio: string;
}

export default function About() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [skillRes, profileRes] = await Promise.all([
                    fetch("/api/skills"),
                    fetch("/api/profile")
                ]);
                setSkills(await skillRes.json());
                setProfile(await profileRes.json());
            } catch (err) {
                console.error("Failed to load about data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const timeline = [
        {
            role: "Senior Frontend Engineer",
            company: "Tech Nova",
            period: "2024 - Present",
            description: "Leading the frontend architecture using Next.js, optimizing performance, and building a comprehensive design system.",
        },
        {
            role: "Frontend Developer",
            company: "WebCraft Solutions",
            period: "2022 - 2024",
            description: "Developed enterprise dashboards with React and Redux, improving data visualization loading times by 40%.",
        },
        {
            role: "Junior Web Developer",
            company: "Startup Inc.",
            period: "2020 - 2022",
            description: "Maintained legacy codebases, built landing pages, and learned the intricacies of modern web development.",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono text-accent-primary uppercase tracking-widest text-xs bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Layers className="w-8 h-8 animate-pulse text-accent-primary" />
                    <span className="animate-pulse">Loading Profile...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pb-60 transition-all duration-300">
            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 relative"
            >
                <div className="absolute -left-20 top-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none opacity-40"></div>

                <h1 className="text-5xl md:text-7xl font-bold font-sans text-white flex items-center mb-10 group tracking-tight">
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl mr-6 group-hover:border-accent-primary/40 transition-all duration-500 shadow-xl">
                        <Box className="w-10 h-10 text-accent-primary" />
                    </div>
                    About Me<span className="text-accent-primary">.</span>
                </h1>

                <div className="relative p-12 bg-white/[0.02] border border-white/5 rounded-[40px] backdrop-blur-2xl group shadow-2xl">
                    <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-sans font-light italic whitespace-pre-wrap max-w-4xl border-l-4 border-accent-primary/20 pl-10 ml-0 hover:border-accent-primary transition-colors">
                        {profile?.bio || "I am a passionate developer focused on creating high-quality web experiences."}
                    </p>
                </div>
            </motion.div>

            {/* Skills Matrix */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-32 space-y-12"
            >
                <div className="flex items-center gap-6">
                    <div className="h-[2px] w-12 bg-accent-primary"></div>
                    <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">My Skills</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.01] border border-white/5 p-12 rounded-[40px] backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    {skills.length > 0 ? skills.map((skill, index) => (
                        <div key={skill.id} className="space-y-4 group/skill">
                            <div className="flex justify-between font-mono text-xs uppercase tracking-widest">
                                <span className="text-white/60 font-bold flex items-center gap-3 group-hover/skill:text-accent-primary transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/40 group-hover/skill:bg-accent-primary transition-colors" />
                                    {skill.name}
                                </span>
                                <span className="text-white/20 group-hover/skill:text-accent-primary transition-colors">{skill.level}%</span>
                            </div>
                            <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent-primary"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.1 * index }}
                                    style={{ boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}
                                />
                            </div>
                        </div>
                    )) : (
                        <p className="col-span-2 text-center text-white/30 italic text-sm py-10 font-mono">Loading skills...</p>
                    )}
                </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-12"
            >
                <div className="flex items-center gap-6">
                    <div className="h-[2px] w-12 bg-accent-secondary"></div>
                    <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">Experience</h3>
                </div>

                <div className="space-y-12 border-l border-white/5 ml-4 pl-12 relative py-4">
                    {timeline.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * idx }}
                            className="relative group lg:max-w-4xl"
                        >
                            {/* Timeline node */}
                            <div className="absolute w-3 h-3 rounded-full bg-white/10 group-hover:bg-accent-primary -left-[54.5px] top-8 border-[3px] border-background transition-all duration-500 group-hover:scale-125" />

                            <div className="glass-card p-12 hover:border-accent-primary/30 transition-all duration-500 overflow-hidden relative shadow-xl">
                                <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity rotate-12 duration-1000">
                                    <Briefcase className="w-48 h-48 text-accent-secondary" />
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                    <h3 className="text-3xl font-bold text-white group-hover:text-accent-primary transition-colors tracking-tight">{job.role}</h3>
                                    <span className="font-mono text-[10px] font-bold text-accent-primary px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full uppercase tracking-widest shadow-lg">
                                        {job.period}
                                    </span>
                                </div>

                                <h4 className="text-accent-secondary font-mono text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <Layers className="w-4 h-4" />
                                    {job.company}
                                </h4>

                                <p className="text-white/50 leading-relaxed font-sans text-lg max-w-3xl group-hover:text-white/80 transition-colors">
                                    {job.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
