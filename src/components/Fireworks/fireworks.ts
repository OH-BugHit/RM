export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
}

export class Fireworks {
    private readonly ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationFrame = 0;

    private readonly particleCount = 24;
    private readonly gravity = 0.045;

    constructor(private readonly canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas 2D context is not supported.');
        }

        this.ctx = ctx;

        this.resize();
        window.addEventListener('resize', this.resize);

        this.animationFrame = requestAnimationFrame(this.loop);
    }

    public explodeAt(left?: number, top?: number): void {
        const xPercent = left ?? 20 + Math.random() * 60;
        const yPercent = top ?? 20 + Math.random() * 60;

        const x = window.innerWidth * (xPercent / 100);
        const y = window.innerHeight * (yPercent / 100);

        for (let i = 0; i < this.particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.5;

            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 35 + Math.random() * 25,
                size: 6 + Math.random() * 2.2,
                hue: Math.random() * 360,
            });
        }
    }

    public fireworkShow(count: number, stagger = 150): void {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.explodeAt();
            }, i * stagger);
        }
    }

    private readonly resize = (): void => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;

        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;

        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    private readonly update = (): void => {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            p.vy += this.gravity;

            p.vx *= 0.985;
            p.vy *= 0.985;

            p.life++;

            if (p.life >= p.maxLife) {
                this.particles.splice(i, 1);
            }
        }
    };

    private readonly draw = (): void => {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (const p of this.particles) {
            const alpha = 1 - p.life / p.maxLife;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

            this.ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;

            this.ctx.fill();
        }
    };

    private readonly loop = (): void => {
        this.update();
        this.draw();

        this.animationFrame = requestAnimationFrame(this.loop);
    };

    public destroy(): void {
        cancelAnimationFrame(this.animationFrame);
        window.removeEventListener('resize', this.resize);
    }
}
