"use client";

import { useEffect, useState, useRef } from "react";

interface ScrambleTextProps {
    text: string;
    duration?: number;
    className?: string;
    trigger?: boolean;
}

const characters = "segdry@%^$#%#!@&*";

export default function ScrambleText({ text, duration = 1000, className, trigger = true }: ScrambleTextProps) {
    const [output, setOutput] = useState(text);
    const frameRef = useRef(0);
    const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
    const requestRef = useRef<number>(0);

    const update = (time: number) => {
        let complete = 0;
        let newOutput = "";

        for (let i = 0, n = queueRef.current.length; i < n; i++) {
            let { from, to, start, end, char } = queueRef.current[i];
            if (frameRef.current >= end) {
                complete++;
                newOutput += to;
            } else if (frameRef.current >= start) {
                if (!char || Math.random() < 0.28) {
                    char = characters[Math.floor(Math.random() * characters.length)];
                    queueRef.current[i].char = char;
                }
                newOutput += `<span class="text-accent-primary opacity-50 font-mono">${char}</span>`;
            } else {
                newOutput += from;
            }
        }

        setOutput(newOutput);

        if (complete < queueRef.current.length) {
            frameRef.current++;
            requestRef.current = requestAnimationFrame(update);
        }
    };

    useEffect(() => {
        if (!trigger) return;

        const oldText = output.replace(/<[^>]*>?/gm, '');
        const length = Math.max(oldText.length, text.length);
        queueRef.current = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = text[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queueRef.current.push({ from, to, start, end });
        }

        frameRef.current = 0;
        requestRef.current = requestAnimationFrame(update);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [text, trigger]);

    return (
        <span
            className={className}
            dangerouslySetInnerHTML={{ __html: output }}
        />
    );
}
