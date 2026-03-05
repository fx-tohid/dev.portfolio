"use client";

import { motion } from "framer-motion";
import { Terminal, Code, ArrowRight, Github, ExternalLink, Cpu, Zap, Activity, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
}

const ActivityGraph = () => {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.01 }}
          className={`w-3 h-3 rounded-sm ${i % 7 === 0 ? 'bg-accent-cyan' : i % 5 === 0 ? 'bg-accent-green' : i % 3 === 0 ? 'bg-accent-green/40' : 'bg-panel-border'
            }`}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [latestProjects, setLatestProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setLatestProjects(data.slice(0, 2));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="flex flex-col gap-32 pb-40">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 flex flex-col justify-center min-h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
              </span>
              <span className="text-sm font-mono tracking-wide">Available for work</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-cyan">Nazrul Islam</span>.
              <br />
              <span className="text-3xl md:text-5xl text-muted-foreground mt-2 inline-block">
                Frontend Engineer.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              I specialize in building high-performance, aesthetically pleasing web experiences with React, Next.js, and a keen eye for interactive design.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/projects" className="group relative px-6 py-3 font-mono font-bold text-background bg-accent-green rounded overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Explore Projects <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link href="/contact" className="px-6 py-3 font-mono font-bold text-accent-green border border-accent-green/50 rounded hover:bg-accent-green/10 transition-colors flex items-center justify-center">
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Glass mock terminal */}
            <div className="rounded-xl overflow-hidden bg-panel-bg backdrop-blur-md border border-panel-border shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-panel-border bg-black/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
                  <Terminal className="w-3 h-3 mr-2" /> bash - nazrul@dev-machine
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm leading-relaxed text-muted-foreground h-[300px] overflow-y-auto">
                <div>
                  <span className="text-accent-green">nazrul@dev-machine</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~/portfolio</span>
                  <span className="text-white">$ </span>
                  <TypewriterText text="./execute_skills.sh" delay={500} />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="mt-4"
                >
                  <div className="text-accent-cyan mb-2">Initializing core modules... [DONE]</div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-accent-green" />
                      <span>React.js / Next.js</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-accent-green" />
                      <span>TypeScript</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-accent-green" />
                      <span>Tailwind CSS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-accent-green" />
                      <span>JavaScript</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-accent-green" />
                      <span>Node.js / Express</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-accent-green" />
                      <span>PostgreSQL</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="text-accent-green">tohid@dev-machine</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~/portfolio</span>
                    <span className="text-white">$ </span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-white align-middle"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Subtle glow behind the terminal */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-green to-accent-cyan rounded-xl opacity-20 blur-xl -z-10 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* TECH STACK TICKER */}
      <section className="bg-panel-bg/50 py-12 border-y border-panel-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest flex items-center">
              <Cpu className="w-4 h-4 mr-2 text-accent-green" /> Powering My Build
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Next.js', 'React', 'TypeScript', 'Tailwind', 'JavaScript', 'Node.js', 'Supabase', 'PostgreSQL'].map((tech) => (
                <span key={tech} className="text-xl md:text-2xl font-bold font-mono text-foreground hover:text-accent-cyan cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Selected <span className="text-accent-green">Deployments</span>
            </h2>
            <p className="text-muted-foreground">
              A curated selection of my most complex and high-impact engineering projects.
            </p>
          </div>
          <Link href="/projects" className="group font-mono text-accent-cyan flex items-center hover:translate-x-2 transition-transform">
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {loadingProjects ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="font-mono text-xs">Accessing project registry...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-panel-bg border border-panel-border rounded-xl p-8 hover:border-accent-green transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <Activity className={`w-8 h-8 text-accent-green opacity-50`} />
                  <div className="flex gap-4">
                    {project.github_url && <Github className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />}
                    {project.live_url && <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag: string) => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-white/5 rounded border border-panel-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            {latestProjects.length === 0 && (
              <div className="col-span-full text-center py-20 opacity-30 border border-dashed border-panel-border rounded-xl">
                <p className="font-mono text-sm">No deployments found in database.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SYSTEM STATUS / ACTIVITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-panel-bg border border-panel-border rounded-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-muted-foreground/30 select-none hidden md:block">
            0x7FFD52A0 | CPU: 12% | RAM: 4.2GB
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-mono text-accent-cyan flex items-center mb-4">
                <Zap className="w-5 h-5 mr-2" /> system.activity
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Visualizing recent code pushes and engineering output across all repositories.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="px-2 py-1 bg-accent-green/10 text-accent-green border border-accent-green/30 rounded">
                  98% Uptime
                </div>
                <div className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 rounded">
                  42 Repos
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 bg-black/40 p-6 rounded-lg border border-panel-border flex flex-col gap-6">
              <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                <span>Recent Commits</span>
                <span>Last Sync: 2m ago</span>
              </div>
              <ActivityGraph />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {[
                  { label: 'Lines Added', val: '12,402' },
                  { label: 'PRs Merged', val: '84' },
                  { label: 'Bugs Killed', val: '312' },
                  { label: 'Coffee Logs', val: 'Infinite' }
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-[10px] text-muted-foreground uppercase font-mono">{stat.label}</div>
                    <div className="text-lg font-bold text-accent-green">{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-cyan">Iterate</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            I'm currently looking for new opportunities and collaborations.
            Let's build something that pushes boundaries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-accent-green text-background font-mono font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.4)] transition-all"
          >
            Initiate Connection <Terminal className="ml-3 w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
