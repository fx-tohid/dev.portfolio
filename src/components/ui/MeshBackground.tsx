"use client";

import { useEffect, useRef } from "react";

export default function MeshBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        // if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;



        // const canvas = canvasRef.current!;
        // const ctx = canvas.getContext("2d");
        // if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 150 };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.x;
            mouse.y = event.y;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = 1.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.color = "rgba(99, 102, 241, 0.2)";
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;


                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                        this.color = "rgba(168, 85, 247, 0.4)"; // Shift to purple on hover
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 10;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 10;
                        }
                        this.color = "rgba(99, 102, 241, 0.15)";
                    }
                }
            }
        }

        function init() {
            particles = [];
            // Create a grid-based distribution for a more "Architectural" feel
            const gap = 45;
            for (let y = 0; y < canvas.height; y += gap) {
                for (let x = 0; x < canvas.width; x += gap) {
                    particles.push(new Particle(x, y));
                }
            }
        }

        function connect() {
            if (!ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 60) {
                        opacityValue = 1 - (distance / 60);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        }

        handleResize();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-40 transition-opacity duration-1000"
        />
    );
}
