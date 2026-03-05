"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Clock, Calendar, Share2, ArrowLeft, FileText, Globe, Layers } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    reading_time: string;
    image_url: string;
    published_at: string;
}

export default function BlogPostDetail() {
    const params = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!params.id) return;
            try {
                const res = await fetch(`/api/posts?id=${params.id}`);
                const data = await res.json();
                setPost(data);
            } catch (err) {
                console.error("Failed to load blog post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono text-accent-secondary uppercase tracking-widest text-xs bg-background">
                <div className="flex flex-col items-center gap-4">
                    <FileText className="w-8 h-8 animate-pulse text-accent-secondary" />
                    <span className="animate-pulse">Loading Thought Node...</span>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <h2 className="text-2xl font-bold font-sans text-white mb-6">Error: Node Not Found</h2>
                <Link href="/blog" className="text-accent-secondary font-mono text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Return to Base
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-40 pb-60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/blog"
                        className="group flex items-center gap-3 text-white/40 hover:text-accent-secondary transition-all font-mono text-[10px] uppercase tracking-[0.3em]"
                    >
                        <div className="p-2 bg-white/5 border border-white/5 rounded-lg group-hover:border-accent-secondary/40 transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        LOG_STREAM_RETURN
                    </Link>
                </motion.div>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <span className="px-4 py-1.5 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full text-[10px] font-black text-accent-secondary uppercase tracking-[0.3em]">
                            {post.category}
                        </span>
                        <div className="h-px w-12 bg-white/10" />
                        <div className="flex items-center gap-2 text-white/30 font-mono text-[9px] uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" />
                            {post.reading_time}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-12 tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 py-8 border-y border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center border border-accent-primary/20">
                                <Layers className="w-5 h-5 text-accent-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-mono text-accent-primary uppercase tracking-widest">Architect</p>
                                <p className="text-white text-xs font-bold font-sans">System Node Admin</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/5" />
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-white/20" />
                            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                                {new Date(post.published_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image */}
                {post.image_url && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-20 rounded-[40px] overflow-hidden border border-white/5 aspect-video relative group"
                    >
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                    </motion.div>
                )}

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tight prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-light prose-strong:text-white prose-strong:font-bold prose-code:text-accent-secondary"
                >
                    <p className="text-xl md:text-2xl text-accent-primary font-sans italic leading-relaxed mb-16 border-l-4 border-accent-primary/30 pl-10 font-light">
                        {post.excerpt}
                    </p>
                    <div className="whitespace-pre-wrap font-sans text-lg text-white/80 space-y-8 leading-loose">
                        {post.content}
                    </div>
                </motion.div>

                {/* Share/Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-4 text-white/30 font-mono text-[9px] uppercase tracking-[0.4em]">
                        <Share2 className="w-4 h-4" />
                        SHARE_KNOWLEDGE_NODE
                    </div>
                    <div className="flex gap-4">
                        {['Twitter', 'LinkedIn', 'Copy Link'].map((label) => (
                            <button key={label} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-widest hover:bg-accent-secondary hover:text-white hover:border-accent-secondary transition-all active:scale-95">
                                {label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
