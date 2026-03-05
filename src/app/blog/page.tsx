"use client";

import { motion } from "framer-motion";
import { FileText, Clock, ChevronRight, Search, TrendingUp, Layers, Box } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    reading_time: string;
    image_url: string;
    published_at: string;
}

const DEFAULT_POSTS: BlogPost[] = [
    {
        id: "def-p1",
        title: "The Zero-Trust Frontier: Modernizing Infrastructure",
        excerpt: "Exploring the shift from perimeter-based security to identity-driven micro-segmentation in distributed cloud environments.",
        category: "Security",
        reading_time: "8 min read",
        image_url: "",
        published_at: new Date().toISOString()
    },
    {
        id: "def-p2",
        title: "Scaling Beyond 10k RPS: Lessons from the Trenches",
        excerpt: "A technical deep-dive into bottleneck identification, caching hierarchies, and concurrent data processing at scale.",
        category: "Performance",
        reading_time: "10 min read",
        image_url: "",
        published_at: new Date().toISOString()
    },
    {
        id: "def-p3",
        title: "Distributed Consensus in High-Availability Clusters",
        excerpt: "An analysis of Paxos vs Raft implementation trade-offs for maintaining strong consistency across global datacenters.",
        category: "Architecture",
        reading_time: "15 min read",
        image_url: "",
        published_at: new Date().toISOString()
    }
];

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                const fetchedPosts = Array.isArray(data) ? data : [];
                setPosts(fetchedPosts.length > 0 ? fetchedPosts : DEFAULT_POSTS);
            } catch (err) {
                console.error("Failed to load blog posts");
                setPosts(DEFAULT_POSTS);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono text-accent-secondary uppercase tracking-widest text-xs bg-background">
                <div className="flex flex-col items-center gap-4">
                    <FileText className="w-8 h-8 animate-pulse text-accent-secondary" />
                    <span className="animate-pulse">Retrieving Thought Nodes...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pb-60">
            {/* Blog Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-24 relative"
            >
                <div className="absolute -left-20 top-0 w-64 h-64 bg-accent-secondary/10 rounded-full blur-[100px] pointer-events-none opacity-40"></div>

                <h1 className="text-5xl md:text-7xl font-bold font-sans text-white flex items-center mb-10 group tracking-tight">
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl mr-6 group-hover:border-accent-secondary/40 transition-all duration-500 shadow-xl">
                        <FileText className="w-10 h-10 text-accent-secondary" />
                    </div>
                    Thought Logs<span className="text-accent-secondary">.</span>
                </h1>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <p className="text-white/50 font-sans text-xl max-w-2xl flex-1">
                        Architectural insights, technical deep-dives, and meditations on the future of scalable engineering.
                    </p>
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent-secondary transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH_KNOWLEDGE_BASE..."
                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-xs text-white outline-none focus:border-accent-secondary/40 focus:bg-white/[0.04] transition-all font-mono"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${post.id}`} className="group block">
                                <div className="glass-card overflow-hidden h-full flex flex-col border-white/5 group-hover:border-accent-secondary/30 transition-all duration-500 shadow-xl">
                                    {/* Cover Image */}
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <Box className="w-12 h-12 text-white/10 group-hover:text-accent-secondary/20 transition-colors" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-accent-secondary uppercase tracking-[0.2em]">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <div className="h-px flex-1 bg-white/10 group-hover:bg-accent-secondary/30 transition-colors"></div>
                                            <Clock className="w-3.5 h-3.5 text-accent-secondary" />
                                            <span className="text-[9px] font-mono font-bold tracking-widest text-white/60">{post.reading_time}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-secondary transition-colors tracking-tight line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1 line-clamp-3 font-sans group-hover:text-white/60 transition-colors">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-[10px] font-black text-accent-secondary uppercase tracking-[0.3em] group-hover:gap-4 transition-all">
                                            INITIALIZE_READ_SEQUENCE
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
                    <p className="font-mono text-xs uppercase tracking-[0.3em]">No_Thought_Nodes_Found_In_Stream</p>
                </div>
            )}
        </div>
    );
}
