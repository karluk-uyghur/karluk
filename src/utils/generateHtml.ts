import { PortfolioConfig, DEFAULT_PORTFOLIO_CONFIG } from '../types/portfolio';
import { getTurkistanStarPoints } from './flag';

/**
 * Generates a clean, standalone, zero-dependency single-file HTML code
 * with the Multi-Agent Autonomous Assembly animation, Qarluq Uyghur identity,
 * authentic East Turkistan Flag (Kökbayraq) integration, and Wild Cyber Overdrive mode.
 */
export function generateAutonomousPortfolioHtml(customConfig?: Partial<PortfolioConfig>): string {
  const cfg: PortfolioConfig = { ...DEFAULT_PORTFOLIO_CONFIG, ...customConfig };
  const starPoints = getTurkistanStarPoints(515, 300, 62, 24);

  return `<!DOCTYPE html>
<html lang="ug" dir="ltr" class="dark" style="--accent: ${cfg.accentColor}; --accent-dim: ${cfg.accentColor}2e; --accent-glow: ${cfg.accentColor}73;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cfg.name} - ${cfg.heroOutline} | تۈركىستان بايرىقى ۋە ۋەششىي ھالەت بىلەن</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['Space Grotesk', 'Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                        serif: ['Instrument Serif', 'Georgia', 'serif']
                    }
                }
            }
        }
    </script>

    <style>
        :root {
            --accent: ${cfg.accentColor};
            --accent-dim: ${cfg.accentColor}2e;
            --accent-glow: ${cfg.accentColor}73;
            --bg-primary: #050507;
            --bg-card: #0b0b10;
        }

        * {
            box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: var(--accent) #0b0b10;
        }

        body {
            background-color: var(--bg-primary);
            color: #f4f4f6;
            font-family: 'Inter', system-ui, sans-serif;
            overflow-x: hidden;
            margin: 0;
        }

        .tech-grid-bg {
            background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
            background-size: 48px 48px;
        }

        body.overdrive-active .tech-grid-bg {
            background-image: 
                linear-gradient(to right, rgba(0, 229, 255, 0.07) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 229, 255, 0.07) 1px, transparent 1px);
            background-size: 32px 32px;
        }

        .hero-outline-text {
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            font-weight: 800;
            color: transparent;
            -webkit-text-stroke: 2px var(--accent);
            letter-spacing: 0.04em;
            line-height: 0.95;
            user-select: none;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            filter: drop-shadow(0 0 28px ${cfg.accentColor}40);
        }

        .hero-outline-text.wireframe-mode {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
            filter: none;
        }

        /* Chromatic Aberration & Glitch */
        @keyframes cyberGlitch {
            0% { text-shadow: 2px 0 #00ffff, -2px 0 #ff0055; transform: translate(0); }
            20% { text-shadow: -2px 0 #00ffff, 2px 0 #ff0055; transform: translate(-1px, 1px); }
            40% { text-shadow: 2px -1px #00ffff, -1px 2px #ff0055; transform: translate(1px, -1px); }
            60% { text-shadow: -1px 1px #00ffff, 1px -1px #ff0055; transform: translate(0); }
            80% { text-shadow: 1px 0 #00ffff, -1px 0 #ff0055; transform: translate(1px, 1px); }
            100% { text-shadow: 2px 0 #00ffff, -2px 0 #ff0055; transform: translate(0); }
        }

        .cyber-glitch-text {
            animation: cyberGlitch 2.5s infinite steps(2, start);
        }

        .asm-target {
            position: relative;
            opacity: 0;
            transform: translateY(6px) scale(0.985);
            transition: opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                        filter 0.42s ease;
            will-change: opacity, transform;
        }

        .asm-target.asm-skeleton {
            opacity: 0.28;
            filter: grayscale(1) contrast(0.7);
            transform: translateY(2px) scale(0.995);
        }

        .asm-target.asm-complete {
            opacity: 1;
            filter: none;
            transform: translateY(0) scale(1);
        }

        .portrait-accent-bg {
            background-color: var(--accent);
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            transition: clip-path 0.75s cubic-bezier(0.19, 1, 0.22, 1), background-color 0.3s ease;
        }

        .portrait-accent-bg.revealed {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .cad-wireframe-box {
            position: fixed;
            pointer-events: none;
            z-index: 60;
            border: 1.5px solid var(--box-color, #3b82f6);
            background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 100%);
            box-shadow: 0 0 20px var(--box-glow, rgba(59, 130, 246, 0.25));
            transition: opacity 0.25s ease;
        }

        .cad-corner {
            position: absolute;
            width: 7px;
            height: 7px;
            background: #ffffff;
            border: 1.5px solid var(--box-color, #3b82f6);
        }
        .cad-corner.tl { top: -4px; left: -4px; }
        .cad-corner.tr { top: -4px; right: -4px; }
        .cad-corner.bl { bottom: -4px; left: -4px; }
        .cad-corner.br { bottom: -4px; right: -4px; }

        @keyframes sparklePop {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
            60% { transform: translate(-50%, -50%) scale(1.25) rotate(45deg); opacity: 0.95; }
            100% { transform: translate(-50%, -50%) scale(0.2) rotate(90deg); opacity: 0; }
        }
        .sparkle-star {
            position: fixed;
            pointer-events: none;
            z-index: 75;
            animation: sparklePop 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .scanlines {
            background: repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 2px,
                rgba(0, 0, 0, 0.18) 3px,
                rgba(0, 0, 0, 0.18) 4px
            );
        }

        @keyframes flagWave {
            0%, 100% { transform: rotate(0deg) skewY(0deg); }
            50% { transform: rotate(1.2deg) skewY(-1deg); }
        }
        .turkistan-flag-wave {
            animation: flagWave 4s ease-in-out infinite;
        }

        .flag-cyber-aura {
            box-shadow: 0 0 22px rgba(0, 153, 255, 0.75), inset 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .accent-bg { background-color: var(--accent); }
        .accent-text { color: var(--accent); }
        .accent-glow-btn {
            border: 1px solid var(--accent);
            box-shadow: 0 0 18px var(--accent-dim), inset 0 0 12px var(--accent-dim);
        }
        .accent-glow-btn:hover {
            background-color: var(--accent);
            color: #ffffff;
            box-shadow: 0 0 28px var(--accent-glow);
        }

        @keyframes cyberPulse {
            0%, 100% { box-shadow: 0 0 15px rgba(0, 229, 255, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.2); }
            50% { box-shadow: 0 0 35px rgba(0, 229, 255, 0.8), inset 0 0 25px rgba(0, 229, 255, 0.4); }
        }
        .overdrive-pulse {
            animation: cyberPulse 2s ease-in-out infinite;
        }
    </style>
</head>
<body class="tech-grid-bg min-h-screen relative selection:bg-sky-500 selection:text-white overdrive-active">

    <!-- INTERACTIVE CYBER MATRIX & PARTICLE LASER CANVAS -->
    <canvas id="cyber-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

    <!-- CENTER SWARM ORBIT HUB OVERLAY -->
    <div id="swarm-center-hub" class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-500" style="opacity: 0;">
        <div id="hub-badge" class="w-14 h-14 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 scale-100" style="transform: scale(0.1);">
            <span class="font-mono text-xs font-bold text-sky-400 tracking-tighter">&lt;/&gt;</span>
            <span class="text-[9px] font-mono text-zinc-400">QARLUQ</span>
        </div>
    </div>

    <!-- DYNAMIC MULTI-AGENT CURSORS & CAD WIREFRAME LAYER -->
    <div id="cad-boxes-layer" class="fixed inset-0 pointer-events-none z-50 overflow-hidden"></div>
    <div id="cursors-layer" class="fixed inset-0 pointer-events-none z-[70] overflow-hidden"></div>

    <!-- MAIN SELF-ASSEMBLING PORTFOLIO CANVAS -->
    <main id="portfolio-stage" class="max-w-[1380px] mx-auto px-4 sm:px-8 pt-4 pb-32 relative z-10">

        <!-- 1. TOP NAVIGATION BAR WITH EAST TURKISTAN FLAG & OVERDRIVE BUTTON -->
        <header id="target-nav" data-agent-label="NAV-SYNTH" class="asm-target flex items-center justify-between py-3 px-4 rounded-xl border border-zinc-900/80 bg-zinc-950/70 backdrop-blur-md mb-2">
            <div class="flex items-center gap-3">
                <div id="view-logo-box" class="w-8 h-8 rounded-lg accent-bg flex items-center justify-center font-display font-black text-white text-base tracking-tighter shadow-md">
                    ق
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-mono text-[11px] text-zinc-300 tracking-wider font-semibold uppercase">// QARLUQ_UYGHUR</span>
                    <span class="hidden sm:inline text-zinc-600">|</span>
                    
                    <!-- Authentic East Turkistan Flag Pill -->
                    <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-950/40 border border-sky-500/30 text-sky-300 font-mono text-[10px] shadow-sm">
                        <svg viewBox="0 0 900 600" class="w-4 h-2.5 rounded-sm overflow-hidden inline-block" xmlns="http://www.w3.org/2000/svg">
                            <rect width="900" height="600" fill="#0099ff"/>
                            <defs>
                                <mask id="flag-nav-mask">
                                    <rect width="900" height="600" fill="#ffffff"/>
                                    <circle cx="342" cy="300" r="120" fill="#000000"/>
                                </mask>
                            </defs>
                            <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#flag-nav-mask)"/>
                            <polygon points="${starPoints}" fill="#ffffff"/>
                        </svg>
                        <span class="hidden md:inline font-sans">تۈركىستان بايرىقى</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <!-- Wild Overdrive Toggle Button -->
                <button
                    id="btn-overdrive-toggle"
                    onclick="toggleOverdriveMode()"
                    class="px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-black shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-200 animate-pulse"
                    title="ۋەششىي شاش قارام ھالەتنى ئېچىش / تاقاش"
                >
                    <span>⚡</span>
                    <span id="txt-overdrive-label" class="hidden sm:inline">ۋەششىي: ئوچۇق</span>
                </button>

                <nav class="flex items-center gap-5 sm:gap-8 text-xs font-mono text-zinc-400">
                    <a href="#hero-section" class="text-white hover:accent-text transition-colors flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full accent-bg"></span>ھەققىدە
                    </a>
                    <a href="#philosophy-section" class="hover:text-white transition-colors">تەپەككۇر</a>
                    <a href="#philosophy-section" class="hover:text-white transition-colors hidden sm:inline">ئارخىتېكتۇرا</a>
                    <a href="#philosophy-section" class="hover:text-white transition-colors">ئالاقە</a>
                </nav>

                <div class="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span class="text-zinc-300 hidden md:inline">SWARM: ONLINE</span>
                </div>
            </div>
        </header>

        <!-- 2. GIANT OUTLINED HERO TITLE WITH GLITCH ABERRATION -->
        <section id="hero-section" class="relative mt-1">
            <div id="target-hero-title" data-agent-label="TYPE-ENGINE" class="asm-target w-full overflow-hidden py-1">
                <h1
                    id="view-hero-outline"
                    onclick="triggerDecrypterScramble()"
                    class="hero-outline-text text-center text-[15.2vw] xl:text-[212px] tracking-tight leading-none select-none cursor-pointer cyber-glitch-text drop-shadow-[0_0_35px_rgba(0,229,255,0.7)]"
                    title="گلىتچ ۋە شاش ئۈنۈم ئۈچۈن چېكىڭ"
                >
                    ${cfg.heroOutline}
                </h1>
            </div>

            <!-- 3. THREE-COLUMN HERO GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start -mt-2 sm:-mt-6 lg:-mt-10 relative z-20">

                <!-- LEFT COLUMN: Greeting, Name Block, Flag, Bio, Buttons, Metrics -->
                <div class="lg:col-span-5 flex flex-col space-y-5 pt-2">
                    
                    <div id="target-name-card" data-agent-label="IDENTITY-OP" class="asm-target inline-flex flex-col items-start">
                        <div class="flex items-center gap-2 mb-1">
                            <span id="view-greeting" class="font-serif italic text-2xl sm:text-3xl text-zinc-200 pl-0.5">${cfg.greeting}</span>
                            
                            <!-- Turkistan Flag with Wild Cyber Aura -->
                            <div class="turkistan-flag-wave flag-cyber-aura shadow-md rounded overflow-hidden border border-white/20 cursor-pointer" title="East Turkistan Flag / شەرقىي تۈركىستان كۆك بايرىقى">
                                <svg viewBox="0 0 900 600" class="w-7 h-4.5 block" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="900" height="600" fill="#0099ff"/>
                                    <defs>
                                        <mask id="flag-name-mask">
                                            <rect width="900" height="600" fill="#ffffff"/>
                                            <circle cx="342" cy="300" r="120" fill="#000000"/>
                                        </mask>
                                    </defs>
                                    <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#flag-name-mask)"/>
                                    <polygon points="${starPoints}" fill="#ffffff"/>
                                </svg>
                            </div>
                        </div>

                        <!-- Name Block: مەن قارلۇق ئۇيغۇر with Hover Decryption -->
                        <div
                            id="view-name-container"
                            onmouseenter="triggerDecrypterScramble()"
                            onclick="triggerDecrypterScramble()"
                            class="accent-bg px-5 py-2.5 shadow-xl relative group rounded-sm flex items-center gap-3 cursor-pointer overdrive-pulse"
                            title="ماترىسسا كود يېشىش ئۈنۈمى ئۈچۈن مائۇسنى ئەكېلىڭ"
                        >
                            <h2 id="view-name" class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                                ${cfg.name}
                            </h2>
                            <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-white/60"></span>
                            <span class="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-300 animate-ping"></span>
                        </div>

                        <div class="flex items-center gap-2 mt-3 font-mono text-[11px] tracking-widest uppercase accent-text font-semibold">
                            <span>•</span>
                            <span id="view-role">${cfg.role}</span>
                        </div>
                    </div>

                    <!-- Bio Description & Action Buttons -->
                    <div id="target-bio-box" data-agent-label="COPY-NODE" class="asm-target space-y-5">
                        <p id="view-bio" class="text-zinc-300 text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
                            ${cfg.bio}
                        </p>

                        <div class="flex flex-wrap items-center gap-3 pt-1">
                            <button onclick="revealRegisterPrompt()" id="view-btn-primary" class="accent-glow-btn px-4 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer active:scale-95" title="تىزىملىتىش ۋە سىستېمىغا ئاتلىنىش">
                                <span>${cfg.btn1}</span>
                                <span>→</span>
                            </button>
                            <button onclick="document.getElementById('system-video-section')?.scrollIntoView({behavior: 'smooth'})" id="view-btn-secondary" class="px-4 py-2.5 rounded border border-zinc-800 hover:border-zinc-600 bg-zinc-950/80 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer">
                                ${cfg.btn2}
                            </button>
                        </div>

                        <!-- Registration Prompt under دەرھال ئاتلىنىش -->
                        <div id="register-prompt-box" class="hidden mt-3 p-3.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/90 shadow-[0_0_30px_rgba(0,255,157,0.35)] flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div class="flex items-center gap-2.5">
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                                <span class="font-mono text-xs sm:text-sm text-emerald-200 font-bold">
                                    سىستېمىغا كىرىش ئۈچۈن تىزىملىتىڭ:
                                </span>
                            </div>
                            <button onclick="openHackerModal()" class="w-full sm:w-auto px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-mono text-xs font-black tracking-wider shadow-lg hover:shadow-emerald-500/50 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">
                                <span>⚡ تىزىملىتىپ كىرىڭ</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>

                    <!-- Bottom Metrics Row -->
                    <div id="target-stats-row" data-agent-label="TELEMETRY-UI" class="asm-target pt-4 border-t border-zinc-900 grid grid-cols-3 gap-4 max-w-md">
                        <div>
                            <div class="flex items-baseline gap-1">
                                <span id="view-stat1-val" class="font-display font-extrabold text-xl sm:text-2xl accent-text">${cfg.stat1Val}</span>
                                <span class="font-mono text-[10px] text-zinc-500">LOC</span>
                            </div>
                            <p id="view-stat1-lbl" class="font-mono text-[11px] text-zinc-400 mt-0.5">${cfg.stat1Lbl}</p>
                        </div>
                        <div>
                            <div class="flex items-baseline gap-1">
                                <span id="view-stat2-val" class="font-display font-extrabold text-xl sm:text-2xl text-white">${cfg.stat2Val}</span>
                                <span class="font-mono text-[10px] text-zinc-500">Arch</span>
                            </div>
                            <p id="view-stat2-lbl" class="font-mono text-[11px] text-zinc-400 mt-0.5">${cfg.stat2Lbl}</p>
                        </div>
                        <div>
                            <div class="flex items-baseline gap-1">
                                <span id="view-stat3-val" class="font-display font-extrabold text-xl sm:text-2xl text-white">${cfg.stat3Val}</span>
                                <span class="font-mono text-[10px] text-zinc-500">Raw</span>
                            </div>
                            <p id="view-stat3-lbl" class="font-mono text-[11px] text-zinc-400 mt-0.5">${cfg.stat3Lbl}</p>
                        </div>
                    </div>
                </div>

                <!-- CENTER COLUMN: Noir Portrait Card with Turkistan Flag Badge -->
                <div class="lg:col-span-4 flex flex-col items-center">
                    <div id="target-portrait" data-agent-label="SHADER-CORE" class="asm-target w-full max-w-[340px] aspect-[4/4.7] relative rounded-sm overflow-hidden border border-zinc-800/90 bg-zinc-900/70 shadow-2xl group">
                        
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                            <div class="w-full h-[1px] bg-zinc-700"></div>
                            <div class="h-full w-[1px] bg-zinc-700 absolute"></div>
                        </div>

                        <div id="portrait-accent-layer" class="portrait-accent-bg absolute inset-0 scanlines revealed"></div>

                        <div class="relative z-10 w-full h-full flex items-end justify-center pt-6">
                            <svg id="view-svg-portrait" viewBox="0 0 320 380" class="w-[92%] h-[92%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-transform duration-700 group-hover:scale-[1.02]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="160" cy="118" rx="68" ry="16" fill="#09090c" opacity="0.25"></ellipse>
                                <path d="M112 96 C116 54, 140 44, 162 46 C184 44, 206 56, 210 96 Z" fill="#0c0c10"></path>
                                <path d="M111 91 Q160 100 211 91 L213 99 Q160 108 109 99 Z" fill="#18181f"></path>
                                <path d="M68 102 C95 88, 225 88, 254 104 C230 118, 92 118, 68 102 Z" fill="#09090d"></path>
                                <path d="M126 104 L132 162 C136 184, 184 184, 188 162 L194 104 Z" fill="#101015"></path>
                                <rect x="136" y="122" width="19" height="8" rx="2" fill="#272732" opacity="0.7"></rect>
                                <rect x="165" y="122" width="19" height="8" rx="2" fill="#272732" opacity="0.7"></rect>
                                <line x1="155" y1="125" x2="165" y2="125" stroke="#272732" stroke-width="1.5"></line>
                                <path d="M138 174 L122 204 L160 275 L198 204 L182 174 Z" fill="#dcdce5"></path>
                                <path d="M153 192 L167 192 L171 268 L160 282 L149 268 Z" fill="#09090c"></path>
                                <path d="M26 380 L42 232 C46 206, 86 192, 124 184 L160 280 L196 184 C234 192, 274 206, 278 232 L294 380 Z" fill="#0c0c10"></path>
                                <path d="M120 186 L102 230 L156 286 L160 275 Z" fill="#16161d"></path>
                                <path d="M200 186 L218 230 L164 286 L160 275 Z" fill="#16161d"></path>
                                <path d="M204 264 L218 256 L224 266 L202 268 Z" fill="#e4e4ec" opacity="0.85"></path>
                            </svg>
                        </div>

                        <!-- Technical Corner Overlays with East Turkistan Flag -->
                        <div class="absolute top-2.5 left-3 z-20 flex items-center gap-1.5 font-mono text-[10px] text-white/90 tracking-widest uppercase bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 flag-cyber-aura">
                            <svg viewBox="0 0 900 600" class="w-3.5 h-2.5 rounded-xs" xmlns="http://www.w3.org/2000/svg">
                                <rect width="900" height="600" fill="#0099ff"/>
                                <defs>
                                    <mask id="flag-corner-mask">
                                        <rect width="900" height="600" fill="#ffffff"/>
                                        <circle cx="342" cy="300" r="120" fill="#000000"/>
                                    </mask>
                                </defs>
                                <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#flag-corner-mask)"/>
                                <polygon points="${starPoints}" fill="#ffffff"/>
                            </svg>
                            <span>ID // QARLUQ-01</span>
                        </div>
                        <div class="absolute top-2.5 right-3 z-20 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>

                    <div id="target-portrait-caption" data-agent-label="META-TAG" class="asm-target w-full max-w-[340px] flex items-center justify-between pt-2.5 font-mono text-[11px] text-zinc-400">
                        <span id="view-portrait-caption" class="tracking-widest uppercase">${cfg.portraitCaption}</span>
                        <span class="text-zinc-600">[24/7 OP]</span>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Architecture Log Cards -->
                <div class="lg:col-span-3 flex flex-col space-y-3.5 pt-2">
                    <div class="font-mono text-[11px] text-zinc-500 tracking-widest uppercase pb-1 border-b border-zinc-900 flex items-center justify-between">
                        <span>// ARCHITECTURE LOG</span>
                        <span class="accent-text">SYS.03</span>
                    </div>

                    <div id="target-log-1" data-agent-label="NODE-01" class="asm-target p-4 rounded bg-zinc-950/90 border border-zinc-800/80 hover:border-sky-500/50 transition-all group">
                        <div class="flex items-center justify-between font-mono text-[11px] mb-1">
                            <span class="accent-text font-bold">01</span>
                            <span class="text-zinc-600 group-hover:text-zinc-400 transition-colors">CORE.SWARM</span>
                        </div>
                        <h3 id="view-log1-title" class="font-display font-bold text-base text-white mb-1">${cfg.log1Title}</h3>
                        <p id="view-log1-desc" class="text-xs text-zinc-400 leading-relaxed">${cfg.log1Desc}</p>
                    </div>

                    <div id="target-log-2" data-agent-label="NODE-02" class="asm-target p-4 rounded bg-zinc-950/90 border border-zinc-800/80 hover:border-sky-500/50 transition-all group">
                        <div class="flex items-center justify-between font-mono text-[11px] mb-1">
                            <span class="accent-text font-bold">02</span>
                            <span class="text-zinc-600 group-hover:text-zinc-400 transition-colors">GRAPH.SYNTH</span>
                        </div>
                        <h3 id="view-log2-title" class="font-display font-bold text-base text-white mb-1">${cfg.log2Title}</h3>
                        <p id="view-log2-desc" class="text-xs text-zinc-400 leading-relaxed">${cfg.log2Desc}</p>
                    </div>

                    <div id="target-log-3" data-agent-label="NODE-03" class="asm-target p-4 rounded bg-zinc-950/90 border border-zinc-800/80 hover:border-sky-500/50 transition-all group">
                        <div class="flex items-center justify-between font-mono text-[11px] mb-1">
                            <span class="accent-text font-bold">03</span>
                            <span class="text-zinc-600 group-hover:text-zinc-400 transition-colors">EXEC.LOOP</span>
                        </div>
                        <h3 id="view-log3-title" class="font-display font-bold text-base text-white mb-1">${cfg.log3Title}</h3>
                        <p id="view-log3-desc" class="text-xs text-zinc-400 leading-relaxed">${cfg.log3Desc}</p>
                    </div>
                </div>

            </div>
        </section>

        <!-- SECTION 2: PHILOSOPHY -->
        <section id="philosophy-section" class="mt-20 pt-10 border-t border-zinc-900/90 relative">
            
            <div id="target-sec2-index" data-agent-label="INDEX-OP" class="asm-target flex items-center justify-between font-mono text-xs text-zinc-500 mb-8">
                <span>// 01.00 SEC_ABOUT INDEX [01/05] • QARLUQ UYGHUR</span>
                <span class="hidden sm:inline">LATENCY: 0.04ms // MEM_LOCK: TRUE</span>
            </div>

            <div id="target-sec2-title" data-agent-label="HEAD-BUILDER" class="asm-target mb-10">
                <div class="font-mono text-xs uppercase tracking-widest accent-text font-semibold mb-2">
                    COGNITIVE PROFILE
                </div>
                <h2 id="view-sec2-heading" class="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                    ${cfg.sec2Heading}
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div id="target-phil-1" data-agent-label="PHIL-AGENT-1" class="asm-target p-6 rounded-lg bg-zinc-950/90 border border-zinc-800/90 flex flex-col justify-between space-y-4">
                    <div>
                        <div class="font-mono text-xs accent-text mb-2">// 01. FIRST PRINCIPLES</div>
                        <h3 id="view-phil1-title" class="font-display font-bold text-xl text-white mb-2">${cfg.phil1Title}</h3>
                        <p id="view-phil1-desc" class="text-sm text-zinc-400 leading-relaxed">${cfg.phil1Desc}</p>
                    </div>
                    <div class="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                        <span>STATUS: VERIFIED</span>
                        <span class="text-emerald-400">100% NATIVE</span>
                    </div>
                </div>

                <div id="target-phil-2" data-agent-label="PHIL-AGENT-2" class="asm-target p-6 rounded-lg bg-zinc-950/90 border border-zinc-800/90 flex flex-col justify-between space-y-4">
                    <div>
                        <div class="font-mono text-xs accent-text mb-2">// 02. SWARM COGNITION</div>
                        <h3 id="view-phil2-title" class="font-display font-bold text-xl text-white mb-2">${cfg.phil2Title}</h3>
                        <p id="view-phil2-desc" class="text-sm text-zinc-400 leading-relaxed">${cfg.phil2Desc}</p>
                    </div>
                    <div class="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                        <span>AGENTS: 16 ACTIVE</span>
                        <span class="accent-text">AUTONOMOUS</span>
                    </div>
                </div>

                <div id="target-phil-3" data-agent-label="PHIL-AGENT-3" class="asm-target p-6 rounded-lg bg-zinc-950/90 border border-zinc-800/90 flex flex-col justify-between space-y-4">
                    <div>
                        <div class="font-mono text-xs accent-text mb-2">// 03. DETERMINISTIC SPEED</div>
                        <h3 id="view-phil3-title" class="font-display font-bold text-xl text-white mb-2">${cfg.phil3Title}</h3>
                        <p id="view-phil3-desc" class="text-sm text-zinc-400 leading-relaxed">${cfg.phil3Desc}</p>
                    </div>
                    <div class="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                        <span>THROUGHPUT: 1.2M/s</span>
                        <span class="text-cyan-400">LOCKED</span>
                    </div>
                </div>

            </div>
        </section>

        <!-- SECTION 3: SYSTEM VIDEO DEMO (FABLE 5.2 3D CINEMA) -->
        <section id="system-video-section" class="mt-24 pt-12 border-t border-zinc-900/90 relative">
            <div class="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6">
                <div class="flex items-center gap-2">
                    <span class="accent-text font-bold">// 02.00 SYSTEM_DEMO</span>
                    <span class="text-zinc-700">|</span>
                    <span>AUTONOMOUS 3D CINEMA • FABLE 5.2</span>
                </div>
                <div class="hidden sm:flex items-center gap-3">
                    <span class="text-emerald-400 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        4K UHD READY
                    </span>
                    <span class="text-zinc-600">// GPU: ACTIVE</span>
                </div>
            </div>

            <div class="mb-8 max-w-3xl">
                <div class="font-mono text-xs uppercase tracking-widest accent-text font-semibold mb-2 flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span>سۈنئىي ئەقىل ھەرىكەتلىك فىلىم تەجرىبىخانىسى</span>
                </div>
                <h2 class="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                    سۈنئىي ئەقىل ئارقىلىق 3D ئۆزلۈكىدىن قۇرۇلغان ئانىماتسىيە فىلىمى
                </h2>
                <p class="text-zinc-400 text-sm sm:text-base leading-relaxed mt-3">
                    Fable 5.2 مودېلى پەقەت بىرلا جۈملە تەلەپ ئارقىلىق پۈتۈنلەي Blender 3D مۇھىتىدا 13 خىل كامېرا بۇلۇڭىدا، 4K ئېنىقلىق بىلەن ھاسىل قىلغان مەخسۇس ئانىماتسىيە كۆرۈنۈشى.
                </p>
            </div>

            <div class="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
                <div class="relative aspect-video max-h-[600px] w-full flex items-center justify-center bg-zinc-950">
                    <video id="fable-video-player" src="/assets/aistudio/AQMb7jeHqtBAgLHeLIw53fbYt9RIhAFICW4U6HjS9YxBOl6iLUNbk_Nl7X_Wclk2rTLqNJspp_ae78db44.mp4" class="w-full h-full object-contain" controls playsinline preload="metadata"></video>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                    <div class="font-mono text-xs accent-text font-bold">01 // MODEL</div>
                    <div class="font-display font-bold text-lg text-white mt-1">Fable 5.2</div>
                    <p class="text-xs text-zinc-400 mt-1">بىرلا تەلەپتىن ھاسىل بولغان پۈتۈن كۆرۈنۈش</p>
                </div>
                <div class="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                    <div class="font-mono text-xs accent-text font-bold">02 // CAMERAS</div>
                    <div class="font-display font-bold text-lg text-white mt-1">13 لىنزىلىق نۇقتا</div>
                    <p class="text-xs text-zinc-400 mt-1">ماكاندىكى ماس قەدەملىك كامېرا يۆنىلىشى</p>
                </div>
                <div class="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                    <div class="font-mono text-xs accent-text font-bold">03 // QUALITY</div>
                    <div class="font-display font-bold text-lg text-white mt-1">4K UHD رەندىر</div>
                    <p class="text-xs text-zinc-400 mt-1">يۇقىرى ئېنىقلىقتىكى نۇر قايتىش تەقلىدى</p>
                </div>
                <div class="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                    <div class="font-mono text-xs accent-text font-bold">04 // EFFICIENCY</div>
                    <div class="font-display font-bold text-lg text-white mt-1">$5.75 سەرپىيات</div>
                    <p class="text-xs text-zinc-400 mt-1">GPU ھېسابلاش تەننەرخىنىڭ تېجەشلىكلىكى</p>
                </div>
            </div>
        </section>

    </main>

    <!-- BOTTOM FLOATING TELEMETRY PILL BAR -->
    <div class="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-950/95 border border-zinc-800/90 shadow-[0_10px_40px_rgba(0,0,0,0.85)] backdrop-blur-md">
        <div class="flex items-center -space-x-1" id="pill-agent-dots">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-zinc-950 animate-pulse"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-zinc-950"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-zinc-950"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-zinc-950"></span>
        </div>

        <span id="pill-status-text" class="font-mono text-xs text-zinc-200 tracking-wide min-w-[145px]">Assembly complete ✦</span>

        <div class="w-16 sm:w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
            <div id="pill-progress-bar" class="h-full accent-bg transition-all duration-200" style="width: 100%;"></div>
        </div>

        <div class="h-3.5 w-[1px] bg-zinc-800"></div>

        <button id="btn-skip-asm" onclick="skipAssembly()" class="font-mono text-xs text-zinc-400 hover:text-white transition-colors px-1.5 hidden">
            Skip
        </button>

        <button onclick="startSwarmAssembly()" title="قايتا قۇرۇش / Replay Assembly" class="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
    </div>

    <!-- HACKER MATRIX TERMINAL MODAL -->
    <div id="hacker-terminal-modal" class="fixed inset-0 z-[120] hidden items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg">
        <div class="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-emerald-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(0,255,157,0.2)] flex flex-col max-h-[92vh]">
            <div class="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-emerald-500/30">
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-red-500/90"></span>
                    <span class="w-3 h-3 rounded-full bg-amber-500/90"></span>
                    <span class="w-3 h-3 rounded-full bg-emerald-500/90"></span>
                    <span class="font-mono text-xs text-emerald-300 font-semibold tracking-wider ml-2 pl-2 border-l border-zinc-800">
                        QARLUQ_CYBER_TERMINAL // v5.2
                    </span>
                </div>
                <button onclick="closeHackerModal()" class="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer">✕</button>
            </div>

            <div class="relative flex-1 p-5 sm:p-7 overflow-y-auto min-h-[380px]">
                <canvas id="matrix-rain-canvas" class="absolute inset-0 pointer-events-none opacity-30"></canvas>
                <div class="relative z-10 space-y-5">
                    <div class="font-mono text-xs text-emerald-400/90 space-y-1 bg-black/60 p-3.5 rounded-lg border border-emerald-950">
                        <div class="text-sky-400 font-bold">[⚡] QARLUQ AUTONOMOUS CLUSTER CONNECTED</div>
                        <div class="text-zinc-400">&gt; SYSTEM PROTOCOL: SECURE_MATRIX_UPLINK (ACTIVE)</div>
                        <div class="text-zinc-400">&gt; AUTH STATUS: REQUIRING USER IDENTITY</div>
                    </div>

                    <!-- Input step -->
                    <div id="hacker-step-input" class="space-y-4 pt-2">
                        <div class="space-y-2">
                            <label class="block font-mono text-sm sm:text-base text-emerald-300 font-bold">
                                &gt;&gt; ئىسمىڭىزنى كىرگۈزۈڭ:
                            </label>
                            <input id="hacker-user-name" type="text" placeholder="مەسىلەن: قارلۇق، ئەلى، زەپەر..." class="w-full px-4 py-3 rounded-lg bg-black/80 border-2 border-emerald-500/60 text-white font-mono text-base outline-none focus:border-cyan-400" onkeydown="if(event.key==='Enter')submitHackerName()"/>
                        </div>
                        <div id="hacker-error-msg" class="hidden font-mono text-xs text-red-400">ئىسمىڭىزنى كىرگۈزۈڭ!</div>
                        <div class="flex items-center justify-between pt-2">
                            <span class="text-[11px] font-mono text-zinc-500">بېسىڭ: Enter ياكى مۇقىملاش</span>
                            <button onclick="submitHackerName()" class="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider cursor-pointer">
                                مۇقىملاش ↵
                            </button>
                        </div>
                    </div>

                    <!-- Punchline step -->
                    <div id="hacker-step-punchline" class="hidden space-y-5">
                        <div class="p-3.5 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center justify-between font-mono text-xs text-red-400">
                            <span>[STATUS: 402 PAYMENT REQUIRED // سىستېما تەلىپى]</span>
                            <span id="hacker-verified-name" class="text-zinc-300"></span>
                        </div>

                        <div class="p-6 rounded-xl bg-black/85 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.25)]">
                            <div class="font-mono text-xs text-amber-400 font-semibold mb-2">
                                // مەشھۇر ھەقىقەت • كودېرلارنىڭ ساداسى:
                            </div>
                            <blockquote class="font-display font-extrabold text-xl sm:text-2xl text-amber-200 leading-relaxed">
                                «ھەق تاپشۇرۇڭ، بىكارغا مۈشۈكمۇ ئاپتاپقا چىقماس! خۇددى بىز كود يېزىشنى بىكارغا ئۆگەنمىگەندەك.»
                            </blockquote>
                            <p class="text-zinc-400 text-xs sm:text-sm font-mono pt-2 mt-2 border-t border-zinc-800">
                                ئەقىل ئەمگىكى ۋە كېچىلىك تىرىشچانلىقلار ھەقسىز بولمايدۇ! 💻☕
                            </p>
                        </div>

                        <div id="coffee-pay-box" class="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <span class="font-mono text-xs text-zinc-300">مەۋھۇم قەھۋە سۇنۇش ئارقىلىق ئەمگەكنى قەدىرلەڭ:</span>
                            <button onclick="payCoffeeMock()" class="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold cursor-pointer whitespace-nowrap">
                                قەھۋە سۇنۇش (ھەق تاپشۇرۇش) ☕
                            </button>
                        </div>
                        <div id="coffee-success-box" class="hidden p-4 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs">
                            مۇبارەك بولسۇن! قەھۋە تاپشۇرۇۋېلىندى! سىز ھەقىقىي مەرھەمەتلىك دوستىمىز ئىكەنسىز! 🎉
                        </div>

                        <div class="flex justify-between pt-2">
                            <button onclick="resetHackerModal()" class="px-3.5 py-1.5 rounded bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs cursor-pointer">قايتا كىرگۈزۈش</button>
                            <button onclick="closeHackerModal()" class="px-4 py-1.5 rounded bg-zinc-800 text-zinc-200 font-mono text-xs cursor-pointer">چىقىش</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SCRIPTS: SWARM ENGINE, MATRIX TEXT DECRYPTER & CYBER LASER CANVAS -->
    <script>
        const portfolioConfig = ${JSON.stringify(cfg, null, 4)};

        let isOverdriveActive = true;
        let audioCtx = null;

        function playSciFiSound(type) {
            try {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const t0 = audioCtx.currentTime;
                if (type === 'overdrive') {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(90, t0);
                    osc.frequency.exponentialRampToValueAtTime(520, t0 + 0.35);
                    gain.gain.setValueAtTime(0.12, t0);
                    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.45);
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(t0);
                    osc.stop(t0 + 0.45);
                }
            } catch(e) {}
        }

        function toggleOverdriveMode() {
            isOverdriveActive = !isOverdriveActive;
            document.body.classList.toggle('overdrive-active', isOverdriveActive);
            const btn = document.getElementById('btn-overdrive-toggle');
            const lbl = document.getElementById('txt-overdrive-label');
            const outline = document.getElementById('view-hero-outline');
            const nameBox = document.getElementById('view-name-container');

            if (isOverdriveActive) {
                btn.className = "px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-black shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-200 animate-pulse";
                lbl.textContent = "ۋەششىي: ئوچۇق";
                outline.classList.add('cyber-glitch-text');
                nameBox.classList.add('overdrive-pulse');
                playSciFiSound('overdrive');
            } else {
                btn.className = "px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/50";
                lbl.textContent = "⚡ ۋەششىي ھالەت";
                outline.classList.remove('cyber-glitch-text');
                nameBox.classList.remove('overdrive-pulse');
            }
            triggerDecrypterScramble();
        }

        // Matrix Glitch Text Decrypter Effect
        const GLYPHS = '01#$@&%*<>{}[]/~=+|!?;:▲▼◆■قۇت';
        function triggerDecrypterScramble() {
            const el = document.getElementById('view-name');
            if (!el) return;
            const original = portfolioConfig.name || "مەن قارلۇق ئۇيغۇر";
            let step = 0;
            const interval = setInterval(() => {
                step += 0.12;
                const len = Math.floor(original.length * Math.min(1, step));
                el.textContent = original.split('').map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < len) return char;
                    return GLYPHS[(i * 5 + Math.floor(step * 30)) % GLYPHS.length];
                }).join('');

                if (step >= 1) {
                    clearInterval(interval);
                    el.textContent = original;
                }
            }, 38);
        }

        function revealRegisterPrompt() {
            const box = document.getElementById('register-prompt-box');
            if (box) {
                box.classList.remove('hidden');
                box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                playSciFiSound('overdrive');
            }
        }

        let matrixAnimId = null;
        function openHackerModal() {
            const modal = document.getElementById('hacker-terminal-modal');
            if (!modal) return;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            playSciFiSound('overdrive');
            startMatrixRain();
            setTimeout(() => {
                const input = document.getElementById('hacker-user-name');
                if (input) input.focus();
            }, 100);
        }

        function closeHackerModal() {
            const modal = document.getElementById('hacker-terminal-modal');
            if (!modal) return;
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            if (matrixAnimId) cancelAnimationFrame(matrixAnimId);
        }

        function submitHackerName() {
            const input = document.getElementById('hacker-user-name');
            const err = document.getElementById('hacker-error-msg');
            const name = (input ? input.value : '').trim();
            if (!name) {
                if (err) err.classList.remove('hidden');
                return;
            }
            if (err) err.classList.add('hidden');

            const nameEl = document.getElementById('hacker-verified-name');
            if (nameEl) nameEl.textContent = 'USER: ' + name;

            document.getElementById('hacker-step-input')?.classList.add('hidden');
            document.getElementById('hacker-step-punchline')?.classList.remove('hidden');
            playSciFiSound('overdrive');
        }

        function payCoffeeMock() {
            document.getElementById('coffee-pay-box')?.classList.add('hidden');
            document.getElementById('coffee-success-box')?.classList.remove('hidden');
            playSciFiSound('overdrive');
        }

        function resetHackerModal() {
            document.getElementById('hacker-step-input')?.classList.remove('hidden');
            document.getElementById('hacker-step-punchline')?.classList.add('hidden');
            document.getElementById('coffee-pay-box')?.classList.remove('hidden');
            document.getElementById('coffee-success-box')?.classList.add('hidden');
            const input = document.getElementById('hacker-user-name');
            if (input) {
                input.value = '';
                input.focus();
            }
        }

        function startMatrixRain() {
            const canvas = document.getElementById('matrix-rain-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const parent = canvas.parentElement;
            let w = canvas.width = parent ? parent.clientWidth : 600;
            let h = canvas.height = parent ? parent.clientHeight : 400;

            const chars = '0123456789ABCDEF01010101XYZ#<>{}[]=+$*@!~%&';
            const fontSize = 14;
            const cols = Math.floor(w / fontSize);
            const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -30));

            let last = 0;
            function drawMatrix(time) {
                matrixAnimId = requestAnimationFrame(drawMatrix);
                if (time - last < 33) return;
                last = time;
                ctx.fillStyle = 'rgba(5, 8, 15, 0.18)';
                ctx.fillRect(0, 0, w, h);
                ctx.font = fontSize + 'px monospace';
                for (let i = 0; i < drops.length; i++) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;
                    ctx.fillStyle = drops[i] % 4 === 0 ? '#38bdf8' : '#00ff9d';
                    ctx.fillText(char, x, y);
                    if (y > h && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
            }
            matrixAnimId = requestAnimationFrame(drawMatrix);
        }

        // Interactive Cyber Laser Canvas
        (function initCyberCanvas() {
            const canvas = document.getElementById('cyber-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let w = canvas.width = window.innerWidth;
            let h = canvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            });

            const particles = [];
            for (let i = 0; i < 55; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 2 + 1
                });
            }

            let mouse = { x: -100, y: -100, active: false };
            window.addEventListener('mousemove', e => {
                mouse = { x: e.clientX, y: e.clientY, active: true };
            });
            window.addEventListener('mouseleave', () => { mouse.active = false; });

            let scanlineY = 0;

            function loop() {
                ctx.clearRect(0, 0, w, h);

                if (isOverdriveActive) {
                    scanlineY = (scanlineY + 3) % h;
                    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, scanlineY);
                    ctx.lineTo(w, scanlineY);
                    ctx.stroke();
                }

                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.x += p.vx * (isOverdriveActive ? 1.4 : 0.8);
                    p.y += p.vy * (isOverdriveActive ? 1.4 : 0.8);

                    if (p.x < 0) p.x = w;
                    if (p.x > w) p.x = 0;
                    if (p.y < 0) p.y = h;
                    if (p.y > h) p.y = 0;

                    ctx.fillStyle = '#38bdf8';
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();

                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < 120) {
                            ctx.strokeStyle = isOverdriveActive ? '#00e5ff' : '#0099ff';
                            ctx.globalAlpha = (1 - dist / 120) * 0.28;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }

                    if (mouse.active) {
                        const mdx = p.x - mouse.x;
                        const mdy = p.y - mouse.y;
                        const mdist = Math.hypot(mdx, mdy);
                        if (mdist < 150) {
                            ctx.strokeStyle = '#ffffff';
                            ctx.globalAlpha = (1 - mdist / 150) * 0.55;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(mouse.x, mouse.y);
                            ctx.stroke();
                        }
                    }
                }
                ctx.globalAlpha = 1;
                requestAnimationFrame(loop);
            }
            loop();
        })();

        // Multi-Agent Swarm Logic
        const AGENT_PALETTE = [
            { name: 'UI-ARCHITECT', color: '#0099ff' },
            { name: 'SYS-KERNEL',   color: '#3b82f6' },
            { name: 'TYPE-ENGINE',  color: '#10b981' },
            { name: 'SHADER-OP',    color: '#f59e0b' },
            { name: 'GRID-SYNTH',   color: '#a855f7' },
            { name: 'DATA-NODE',    color: '#06b6d4' }
        ];

        let animFrameId = null;
        let activeTimeouts = [];
        let agents = [];
        let isAssembling = false;
        let sec2Assembled = false;

        function spawnSparkle(x, y, color = '#ffffff') {
            const el = document.createElement('div');
            el.className = 'sparkle-star';
            el.style.left = \`\${x}px\`;
            el.style.top = \`\${y}px\`;
            el.innerHTML = \`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="\${color}">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z"/>
                </svg>
            \`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 680);
        }

        function createAgentCursors(count) {
            const layer = document.getElementById('cursors-layer');
            layer.innerHTML = '';
            agents = [];
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            for (let i = 0; i < count; i++) {
                const profile = AGENT_PALETTE[i % AGENT_PALETTE.length];
                const angle = (i / count) * Math.PI * 2;
                const radius = 58;

                const cursorEl = document.createElement('div');
                cursorEl.className = 'fixed top-0 left-0 pointer-events-none transition-opacity duration-300';
                cursorEl.style.willChange = 'transform';
                cursorEl.innerHTML = \`
                    <div class="relative flex items-start">
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" class="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            <path d="M1.5 1.5L16 10.5L9.2 12.2L6.5 19.5L1.5 1.5Z" fill="\${profile.color}" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round"/>
                        </svg>
                        <span style="background:\${profile.color}" class="ml-1 mt-3 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white shadow-md whitespace-nowrap tracking-tight">
                            \${profile.name}
                        </span>
                    </div>
                \`;
                layer.appendChild(cursorEl);

                agents.push({
                    id: i,
                    name: profile.name,
                    color: profile.color,
                    el: cursorEl,
                    x: cx + Math.cos(angle) * radius,
                    y: cy + Math.sin(angle) * radius,
                    targetX: cx + Math.cos(angle) * radius,
                    targetY: cy + Math.sin(angle) * radius,
                    orbitAngle: angle,
                    mode: 'orbit'
                });
            }
        }

        function animateWireframeBoxOnTarget(targetId, agent, delayMs, durationMs, onComplete) {
            const t = setTimeout(() => {
                const targetEl = document.getElementById(targetId);
                if (!targetEl) return;

                const rect = targetEl.getBoundingClientRect();
                const cadLayer = document.getElementById('cad-boxes-layer');

                const box = document.createElement('div');
                box.className = 'cad-wireframe-box';
                box.style.setProperty('--box-color', agent.color);
                box.style.left = \`\${rect.left}px\`;
                box.style.top = \`\${rect.top}px\`;
                box.style.width = '12px';
                box.style.height = '12px';

                box.innerHTML = \`
                    <div class="cad-corner tl"></div>
                    <div class="cad-corner tr"></div>
                    <div class="cad-corner bl"></div>
                    <div class="cad-corner br"></div>
                    <div style="background:\${agent.color}" class="absolute -top-4 left-0 px-1 py-0.2 text-[8px] font-mono font-bold text-white uppercase whitespace-nowrap">
                        \${targetEl.dataset.agentLabel || agent.name} · \${Math.round(rect.width)}×\${Math.round(rect.height)}
                    </div>
                \`;
                cadLayer.appendChild(box);

                agent.mode = 'fly';
                agent.targetX = rect.left + 8;
                agent.targetY = rect.top + 8;
                spawnSparkle(rect.left + 8, rect.top + 8, '#ffffff');

                targetEl.classList.add('asm-skeleton');
                if (targetId === 'target-hero-title') {
                    document.getElementById('view-hero-outline')?.classList.add('wireframe-mode');
                }

                const startTime = performance.now();
                function stepBox(now) {
                    const p = Math.min(1, (now - startTime) / durationMs);
                    const ease = 1 - Math.pow(1 - p, 3);

                    const curW = Math.max(12, rect.width * ease);
                    const curH = Math.max(12, rect.height * ease);

                    box.style.width = \`\${curW}px\`;
                    box.style.height = \`\${curH}px\`;

                    agent.targetX = rect.left + curW;
                    agent.targetY = rect.top + curH;

                    if (p < 1 && isAssembling) {
                        requestAnimationFrame(stepBox);
                    } else {
                        targetEl.classList.remove('asm-skeleton');
                        targetEl.classList.add('asm-complete');

                        if (targetId === 'target-hero-title') {
                            document.getElementById('view-hero-outline')?.classList.remove('wireframe-mode');
                        }
                        if (targetId === 'target-portrait') {
                            document.getElementById('portrait-accent-layer')?.classList.add('revealed');
                        }

                        spawnSparkle(rect.left + rect.width, rect.top + rect.height, agent.color);
                        box.style.opacity = '0';
                        setTimeout(() => box.remove(), 260);
                        if (onComplete) onComplete();
                    }
                }
                requestAnimationFrame(stepBox);
            }, delayMs);

            activeTimeouts.push(t);
        }

        function clearAssemblyTimers() {
            activeTimeouts.forEach(t => clearTimeout(t));
            activeTimeouts = [];
            if (animFrameId) cancelAnimationFrame(animFrameId);
            document.getElementById('cad-boxes-layer').innerHTML = '';
        }

        function resetAllTargetsToHidden() {
            document.querySelectorAll('.asm-target').forEach(el => {
                el.classList.remove('asm-skeleton', 'asm-complete');
            });
            document.getElementById('view-hero-outline')?.classList.add('wireframe-mode');
            document.getElementById('portrait-accent-layer')?.classList.remove('revealed');
            sec2Assembled = false;
        }

        function startSwarmAssembly() {
            clearAssemblyTimers();
            window.scrollTo({ top: 0, behavior: 'auto' });

            isAssembling = true;
            const spd = 1 / (portfolioConfig.speedMultiplier || 1.0);

            resetAllTargetsToHidden();
            createAgentCursors(portfolioConfig.cursorCount || 6);

            const hub = document.getElementById('swarm-center-hub');
            const hubBadge = document.getElementById('hub-badge');
            hub.style.opacity = '1';
            hubBadge.style.transform = 'scale(1)';

            const statusText = document.getElementById('pill-status-text');
            const progressBar = document.getElementById('pill-progress-bar');
            const skipBtn = document.getElementById('btn-skip-asm');
            statusText.textContent = 'Assembling page...';
            progressBar.style.width = '10%';
            skipBtn.classList.remove('hidden');

            function updateCursorsLoop(now) {
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;

                agents.forEach((ag, idx) => {
                    if (ag.mode === 'orbit') {
                        ag.orbitAngle += 0.065 * (portfolioConfig.speedMultiplier || 1.0);
                        const r = 56 + Math.sin(now * 0.005 + idx) * 6;
                        ag.targetX = cx + Math.cos(ag.orbitAngle) * r;
                        ag.targetY = cy + Math.sin(ag.orbitAngle) * r;
                    }
                    ag.x += (ag.targetX - ag.x) * 0.22;
                    ag.y += (ag.targetY - ag.y) * 0.22;
                    ag.el.style.transform = \`translate3d(\${ag.x}px, \${ag.y}px, 0)\`;
                });

                if (isAssembling) {
                    animFrameId = requestAnimationFrame(updateCursorsLoop);
                }
            }
            animFrameId = requestAnimationFrame(updateCursorsLoop);

            activeTimeouts.push(setTimeout(() => {
                hubBadge.style.transform = 'scale(0.1)';
                hub.style.opacity = '0';
                for (let s = 0; s < 8; s++) {
                    setTimeout(() => {
                        spawnSparkle(
                            80 + Math.random() * (window.innerWidth * 0.65),
                            90 + Math.random() * (window.innerHeight * 0.65),
                            '#ffffff'
                        );
                    }, s * 45);
                }
                progressBar.style.width = '25%';
            }, 900 * spd));

            const heroBuildPlan = [
                { id: 'target-nav',              agentIdx: 0, delay: 950, dur: 600, prog: '35%' },
                { id: 'target-hero-title',       agentIdx: 1, delay: 1150, dur: 850, prog: '48%' },
                { id: 'target-name-card',        agentIdx: 2, delay: 1450, dur: 800, prog: '62%' },
                { id: 'target-bio-box',          agentIdx: 3, delay: 1950, dur: 900, prog: '75%' },
                { id: 'target-portrait',         agentIdx: 4, delay: 1750, dur: 1200, prog: '84%' },
                { id: 'target-portrait-caption', agentIdx: 5, delay: 2950, dur: 500, prog: '88%' },
                { id: 'target-stats-row',        agentIdx: 2, delay: 2750, dur: 650, prog: '90%' },
                { id: 'target-log-1',            agentIdx: 0, delay: 2050, dur: 700, prog: '92%' },
                { id: 'target-log-2',            agentIdx: 1, delay: 2500, dur: 700, prog: '96%' },
                { id: 'target-log-3',            agentIdx: 2, delay: 2950, dur: 700, prog: '100%' }
            ];

            heroBuildPlan.forEach(step => {
                const ag = agents[step.agentIdx % agents.length];
                animateWireframeBoxOnTarget(
                    step.id,
                    ag,
                    step.delay * spd,
                    step.dur * spd,
                    () => { progressBar.style.width = step.prog; }
                );
            });

            activeTimeouts.push(setTimeout(() => {
                finishSwarmAssembly();
            }, 3900 * spd));
        }

        function finishSwarmAssembly() {
            const statusText = document.getElementById('pill-status-text');
            const progressBar = document.getElementById('pill-progress-bar');
            const skipBtn = document.getElementById('btn-skip-asm');

            statusText.textContent = 'Assembly complete ✦';
            progressBar.style.width = '100%';
            skipBtn.classList.add('hidden');

            agents.forEach(ag => { ag.el.style.opacity = '0'; });
            setTimeout(() => {
                isAssembling = false;
                if (animFrameId) cancelAnimationFrame(animFrameId);
                document.getElementById('cursors-layer').innerHTML = '';
            }, 400);
        }

        function skipAssembly() {
            clearAssemblyTimers();
            document.getElementById('swarm-center-hub').style.opacity = '0';
            document.querySelectorAll('.asm-target').forEach(el => {
                el.classList.remove('asm-skeleton');
                el.classList.add('asm-complete');
            });
            document.getElementById('view-hero-outline')?.classList.remove('wireframe-mode');
            document.getElementById('portrait-accent-layer')?.classList.add('revealed');
            finishSwarmAssembly();
        }

        window.onload = function () {
            setTimeout(() => {
                startSwarmAssembly();
            }, 180);
        };
    </script>
</body>
</html>`;
}
