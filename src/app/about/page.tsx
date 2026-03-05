"use client";

import { motion } from "framer-motion";
import { Terminal, Code, Database, Globe, Briefcase, Cpu } from "lucide-react";

export default function About() {
    const skills = [
        { name: "React", level: 90, category: "Frontend" },
        { name: "Next.js", level: 85, category: "Frontend" },
        { name: "TypeScript", level: 80, category: "Language" },
        { name: "Tailwind CSS", level: 95, category: "Design" },
        { name: "Framer Motion", level: 75, category: "Design" },
        { name: "Node.js", level: 70, category: "Backend" },
        { name: "PostgreSQL", level: 65, category: "Database" },
        { name: "Git", level: 85, category: "Tools" },
    ];

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

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">

            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16 border-b border-panel-border pb-8"
            >
                <h1 className="text-4xl font-bold font-mono text-accent-cyan flexItems-center">
                    <Terminal className="inline-block mr-4 w-8 h-8" />
                    ./about_me.sh
                </h1>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                    I'm a passionate frontend software engineer who bridges the gap between design and engineering.
                    I love creating beautiful, performant, and accessible user interfaces. When I'm not coding,
                    you can find me exploring new technologies or building side projects.
                </p>
            </motion.div>

            {/* Skills Matrix */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-20 space-y-8"
            >
                <h2 className="text-2xl font-mono text-accent-green flex items-center">
                    <Cpu className="inline-block mr-2 w-6 h-6" />
                    Core_Competencies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-panel-bg border border-panel-border p-8 rounded-xl backdrop-blur-sm">
                    {skills.map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between font-mono text-sm text-muted-foreground">
                                <span className="text-foreground">{skill.name}</span>
                                <span>{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-accent-green to-accent-cyan"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.1 * index }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="text-2xl font-mono text-accent-green flex items-center mb-8">
                    <Briefcase className="inline-block mr-2 w-6 h-6" />
                    Execution_History
                </h2>

                <div className="space-y-8 border-l border-accent-green/30 ml-4 pl-8 relative">
                    {timeline.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                            className="relative bg-panel-bg border border-panel-border p-6 rounded-lg backdrop-blur-sm hover:border-accent-green/50 transition-colors"
                        >
                            <div className="absolute w-4 h-4 rounded-full bg-accent-green -left-[42px] top-6 border-4 border-background shadow-[0_0_10px_#00ff00]" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                                <span className="font-mono text-sm text-accent-cyan px-2 py-1 bg-accent-cyan/10 rounded">
                                    {job.period}
                                </span>
                            </div>
                            <h4 className="text-muted-foreground font-medium mb-4">{job.company}</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {job.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
