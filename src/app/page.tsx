"use client";

import { motion } from "framer-motion";
import { Terminal, Github, ExternalLink, Code, Database, Layout, Mail, ChevronRight, Activity, Shield, Sparkles, Binary, Cpu, Globe, Layers, Zap, Quote } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrambleText from "@/components/ui/ScrambleText";
import Magnetic from "@/components/ui/Magnetic";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  live_url: string;
}

interface Profile {
  name: string;
  role: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar_url: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "def-1",
    title: "Project_Hyperion",
    description: "Multi-regional Kubernetes mesh infrastructure designed for sub-50ms global latency and automated failover protocols.",
    tech: ["Go", "Kubernetes", "gRPC", "Terraform"],
    github_url: "#",
    live_url: "#"
  },
  {
    id: "def-2",
    title: "Quantum_Scale_DB",
    description: "Distributed ledger system optimized for high-throughput financial transactions with Byzantine Fault Tolerance.",
    tech: ["Rust", "PostgreSQL", "Redis", "Kafka"],
    github_url: "#",
    live_url: "#"
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "def-t1",
    name: "Dr. Elena Vance",
    role: "Chief Technology Officer",
    company: "Aeon Dynamics",
    quote: "Nazrul's architectural oversight transformed our legacy monolith into a resilient mesh of microservices. His focus on observability and zero-trust security is unmatched.",
    avatar_url: ""
  },
  {
    id: "def-t2",
    name: "Marcus Thorne",
    role: "VP of Engineering",
    company: "Sentry Systems",
    quote: "The system specs delivered weren't just code; they were a blueprint for the next decade of our digital infrastructure. A visionary in enterprise-grade design.",
    avatar_url: ""
  },
  {
    id: "def-t3",
    name: "Sarah Jenkins",
    role: "Principal Architect",
    company: "Vertex Cloud",
    quote: "Implementing his design patterns reduced our infrastructure costs by 40% while doubling our concurrent user capacity. Highly recommended.",
    avatar_url: ""
  }
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>({
    name: "Nazrul Islam",
    role: "Senior Software Architect"
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [projRes, profileRes, testRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/profile"),
          fetch("/api/testimonials")
        ]);
        const allProjects = await projRes.json();
        const profileData = await profileRes.json();
        const testData = await testRes.json();

        const fetchedProjects = Array.isArray(allProjects) ? allProjects.slice(0, 2) : [];
        setProjects(fetchedProjects.length > 0 ? fetchedProjects : DEFAULT_PROJECTS);

        const fetchedProfile = profileData && !profileData.error ? profileData : null;
        if (fetchedProfile) setProfile(fetchedProfile);

        const fetchedTestimonials = Array.isArray(testData) ? testData : [];
        setTestimonials(fetchedTestimonials.length > 0 ? fetchedTestimonials : DEFAULT_TESTIMONIALS);
      } catch (err) {
        console.error("Failed to load home data");
        setProjects(DEFAULT_PROJECTS);
        setTestimonials(DEFAULT_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const services = [
    {
      title: "Frontend Engineering",
      description: "Building ultra-fast, responsive web applications with Next.js and React.",
      icon: Layout,
      color: "text-accent-primary",
      glow: "rgba(99, 102, 241, 0.4)"
    },
    {
      title: "Backend Architecture",
      description: "Designing scalable database architectures and secure REST/GraphQL APIs.",
      icon: Database,
      color: "text-accent-secondary",
      glow: "rgba(168, 85, 247, 0.4)"
    },
    {
      title: "Performance Optimization",
      description: "Deep-diving into bundle sizes, rendering strategies, and Core Web Vitals.",
      icon: Activity,
      color: "text-accent-primary",
      glow: "rgba(99, 102, 241, 0.4)"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Elite Architectural Style */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[140px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-accent-secondary/10 rounded-full blur-[140px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-primary text-[10px] font-mono mb-6 uppercase tracking-[0.2em] backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                </span>
                <span>Available for new projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-foreground mb-4 leading-tight whitespace-nowrap overflow-visible">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-white to-accent-secondary glow-text-primary">
                  <ScrambleText text={profile?.name || 'Nazrul'} />
                </span>
                <span className="text-accent-primary">.</span>
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-accent-primary/50"></div>
                <h2 className="text-xl md:text-2xl text-muted-foreground font-medium tracking-tight">
                  <ScrambleText text={profile?.role || 'Senior Software Architect'} duration={2000} />
                </h2>
              </div>

              <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed font-normal">
                I build high-performance web applications with a focus on clean code and exceptional user experiences.
              </p>

              <div className="flex flex-wrap gap-5">
                <Magnetic>
                  <Link
                    href="/projects"
                    className="px-10 py-4 bg-accent-primary text-white font-bold rounded-xl hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-500 flex items-center group relative overflow-hidden active:scale-95 text-sm uppercase tracking-widest"
                  >
                    <span className="relative z-10 font-bold">View My Work</span>
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Link
                    href="/contact"
                    className="px-10 py-4 border border-white/10 bg-white/5 hover:border-accent-primary/50 text-white/80 hover:text-white transition-all duration-500 flex items-center rounded-xl backdrop-blur-md active:scale-95 group text-sm uppercase tracking-widest"
                  >
                    <span>Get In Touch</span>
                  </Link>
                </Magnetic>
              </div>

              {/* Hero Statistics - Refined */}
              <div className="mt-12 pt-8 border-t border-white/5 flex gap-10 opacity-60">
                <div className="space-y-1">
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent-primary">Location</p>
                  <p className="text-white font-bold text-sm">Remote / Worldwide</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent-secondary">Focus</p>
                  <p className="text-white font-bold text-sm">Modern Web Apps</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              {/* Premium Device Frame (IDE style) */}
              <div className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-white/20 to-transparent shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
                <div className="bg-[#0b0f1a] rounded-[31px] overflow-hidden border border-white/5">
                  {/* IDE Toolbar */}
                  <div className="flex items-center px-6 py-4 border-b border-white/5 bg-[#0d1221]/80 backdrop-blur-xl">
                    <div className="flex space-x-2.5 mr-8">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ff5555] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#50fa7b] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"></div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono bg-white/5 px-4 py-1.5 rounded-md border border-white/5">
                      <Code className="w-3 h-3 text-accent-primary" />
                      portfolio_main.ts <span className="text-white/20">|</span> <span className="text-accent-primary italic">Modified</span>
                    </div>
                  </div>

                  {/* Code Editor Content */}
                  <div className="p-8 font-mono text-sm leading-relaxed min-h-[400px]">
                    <div className="flex gap-4">
                      <span className="text-white/20 select-none">01</span>
                      <p><span className="text-accent-secondary">import</span> &#123; Developer &#125; <span className="text-accent-secondary">from</span> <span className="text-accent-green">'@core/identity'</span>;</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <span className="text-white/20 select-none">02</span>
                      <p><span className="text-accent-secondary">const</span> <span className="text-white">profile</span> = <span className="text-accent-secondary">new</span> <span className="text-accent-primary">Developer</span>(&#123;</p>
                    </div>
                    <div className="flex gap-4 mt-1 ml-4">
                      <span className="text-white/20 select-none">03</span>
                      <p><span className="text-accent-cyan">name</span>: <span className="text-accent-green">'{profile?.name || 'Nazrul'}'</span>,</p>
                    </div>
                    <div className="flex gap-4 mt-1 ml-4">
                      <span className="text-white/20 select-none">04</span>
                      <p><span className="text-accent-cyan">status</span>: <span className="text-accent-green">'high_performance'</span>,</p>
                    </div>
                    <div className="flex gap-4 mt-1 ml-4">
                      <span className="text-white/20 select-none">05</span>
                      <p><span className="text-accent-cyan">stack</span>: [<span className="text-accent-green">'NextJS'</span>, <span className="text-accent-green">'TypeScript'</span>, <span className="text-accent-green">'PostgreSQL'</span>]</p>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-white/20 select-none">06</span>
                      <p>&#125;);</p>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <span className="text-white/20 select-none">07</span>
                      <p><span className="text-white">profile</span>.<span className="text-accent-primary">initializeDeployment</span>();</p>
                    </div>

                    {/* Visualizer inside the editor */}
                    <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent"></div>
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-accent-primary/20 rounded-lg">
                            <Activity className="w-5 h-5 text-accent-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 font-mono">CORE_LATENCY</p>
                            <p className="text-white font-bold">14ms average</p>
                          </div>
                        </div>
                        <div className="flex -space-x-1">
                          {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="w-2 h-8 bg-accent-primary/40 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3 opacity-30 select-none">
                      <span className="text-accent-primary">❯</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>

                {/* Decorative floating labels */}
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 p-3 glass-card rounded-xl border border-accent-primary/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                >
                  <p className="text-[10px] font-mono text-accent-primary font-bold tracking-tight px-2">V_3.4 RELIABLE</p>
                </motion.div>

                <motion.div
                  initial={{ rotate: 5 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 p-4 glass-card rounded-xl border border-accent-secondary/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-3"
                >
                  <Shield className="w-4 h-4 text-accent-secondary" />
                  <p className="text-[10px] font-mono text-white/60">END_TO_END ENCRYPTED</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services/Experties Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-xs font-mono text-accent-primary uppercase tracking-[0.5em] mb-4">TECHNOLOGICAL_CORE</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Expertise & Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-10 group"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity w-12 h-12" style={{ backgroundColor: service.glow }}></div>
                  <service.icon className={`w-12 h-12 relative ${service.color} group-hover:scale-110 transition-transform duration-500`} />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-xs font-mono text-accent-secondary uppercase tracking-[0.5em] mb-4">LATEST_DEPLOYMENTS</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Featured Work</h3>
            </div>
            <Link href="/projects" className="text-accent-primary font-mono text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center group">
              VIEW_ALL_PROJECTS
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="h-80 bg-white/5 animate-pulse rounded-2xl border border-white/10"></div>
              ))
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-10 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex space-x-6">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent-primary transition-all transform hover:scale-110">
                          <Github className="w-6 h-6" />
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent-secondary transition-all transform hover:scale-110">
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                    <Code className="w-10 h-10 text-accent-primary opacity-5 group-hover:opacity-40 transition-opacity duration-700" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-primary transition-colors">{project.title}</h3>
                  <p className="text-white/50 mb-8 line-clamp-2 leading-relaxed text-sm group-hover:text-white/70 transition-colors">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-[9px] font-mono bg-white/5 border border-white/5 rounded-full text-white/50 group-hover:text-accent-secondary group-hover:border-accent-secondary/30 transition-all">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bottom corner glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-primary/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Trust Matrix */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-[0.5em] mb-4">TRUST_MATRIX_VERIFIED</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Client Endorsements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-10 relative group border-white/5 hover:border-emerald-500/20 transition-all duration-700 hover:shadow-[0_0_50px_rgba(16,185,129,0.05)]"
                >
                  <div className="absolute top-0 right-10 -translate-y-1/2 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <Quote className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-10 italic font-sans group-hover:text-white/80 transition-colors">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 font-black">
                        {t.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-[13px] font-black text-white uppercase tracking-tight">{t.name}</h4>
                      <p className="text-[9px] text-emerald-400/60 font-mono uppercase tracking-[0.2em] mt-1">{t.role} {t.company && `@ ${t.company}`}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
                <p className="font-mono text-xs uppercase tracking-[0.3em]">System_Initialized: Awaiting_Input_Data</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-16 rounded-[40px] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 relative overflow-hidden"
          >
            {/* Background glow for CTA */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent-primary/5 blur-[120px] pointer-events-none"></div>

            <h2 className="text-xs font-mono text-accent-secondary uppercase tracking-[0.5em] mb-8">JOINT_MISSION</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">Ready to build something <span className="text-accent-primary glow-text-primary">legendary</span>?</h3>
            <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
              I'm currently available for freelance opportunities and full-stack collaborations.
              Let's architect the future together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-4 bg-white text-background font-bold rounded-xl hover:bg-accent-primary hover:text-white hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 group active:scale-95"
            >
              INITIATE_CONTACT <Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
