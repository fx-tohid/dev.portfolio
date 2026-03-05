import { Terminal, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-panel-border bg-background/50 backdrop-blur-sm mt-20 py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Terminal className="w-5 h-5 text-muted-foreground" />
                    <span className="font-mono text-sm text-muted-foreground">
                        System.exit(0)
                    </span>
                </div>

                <div className="flex space-x-6 items-center">
                    <Link href="/admin" className="font-mono text-xs text-muted-foreground hover:text-accent-cyan transition-colors border border-panel-border px-2 py-1 rounded">
                        sudo_admin
                    </Link>
                    <a href="#" className="text-muted-foreground hover:text-accent-green transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-accent-green transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
