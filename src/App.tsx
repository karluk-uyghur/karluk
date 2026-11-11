import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Download,
  RefreshCw,
  Sliders,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Flag,
  Share2,
  Zap
} from 'lucide-react';
import { PortfolioConfig, DEFAULT_PORTFOLIO_CONFIG, AGENT_PALETTE } from './types/portfolio';
import { TurkistanFlag } from './components/TurkistanFlag';
import { CodeModal } from './components/CodeModal';
import { BuilderDrawer } from './components/BuilderDrawer';
import { CyberCanvas } from './components/CyberCanvas';
import HackerModal from './components/HackerModal';
import CyberVideoSection from './components/CyberVideoSection';
import { generateAutonomousPortfolioHtml } from './utils/generateHtml';
import { getScrambledText, playCyberSound } from './utils/cyberEffects';

interface AgentState {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  orbitAngle: number;
  mode: 'orbit' | 'fly';
}

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(DEFAULT_PORTFOLIO_CONFIG);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isHackerModalOpen, setIsHackerModalOpen] = useState(false);
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [assemblyProgress, setAssemblyProgress] = useState(100);
  const [assemblyStatus, setAssemblyStatus] = useState('Assembly complete ✦');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeStepIds, setActiveStepIds] = useState<Set<string>>(
    new Set([
      'target-nav',
      'target-hero-title',
      'target-name-card',
      'target-bio-box',
      'target-portrait',
      'target-portrait-caption',
      'target-stats-row',
      'target-log-1',
      'target-log-2',
      'target-log-3',
      'target-sec2-index',
      'target-sec2-title',
      'target-phil-1',
      'target-phil-2',
      'target-phil-3'
    ])
  );

  const [cadBoxes, setCadBoxes] = useState<
    Array<{
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      label: string;
    }>
  >([]);

  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([]);

  const [agents, setAgents] = useState<AgentState[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const [displayName, setDisplayName] = useState(config.name);

  // Sync displayed name with config
  useEffect(() => {
    setDisplayName(config.name);
  }, [config.name]);

  // Update dynamic CSS custom variables on config change & toggle body overdrive class
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', config.accentColor);
    document.documentElement.style.setProperty('--accent-dim', `${config.accentColor}2e`);
    document.documentElement.style.setProperty('--accent-glow', `${config.accentColor}73`);
    document.body.classList.toggle('overdrive-active', config.isOverdrive);
  }, [config.accentColor, config.isOverdrive]);

  // Matrix Decrypter Scramble Text Effect
  const triggerGlitchScramble = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.12;
      setDisplayName(getScrambledText(config.name, progress));
      if (progress >= 1) {
        clearInterval(interval);
        setDisplayName(config.name);
      }
    }, 38);
  };

  // Toggle Overdrive / ۋەششىي ھالەت
  const toggleOverdrive = () => {
    const nextState = !config.isOverdrive;
    setConfig(prev => ({ ...prev, isOverdrive: nextState }));
    
    // Play cyber sound
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {}
    }
    if (audioCtxRef.current) {
      playCyberSound(audioCtxRef.current, nextState ? 'overdrive' : 'powerdown');
    }

    triggerGlitchScramble();
  };

  // Audio synthesize tick sound
  const playTick = (freq = 620, duration = 0.035, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy
    }
  };

  const spawnSparkle = (x: number, y: number, color = '#ffffff') => {
    const id = Date.now() + Math.random();
    setSparkles(prev => [...prev.slice(-15), { id, x, y, color }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 650);
  };

  // Multi-Agent Assembly Sequence
  const startSwarmAssembly = () => {
    // Clear ongoing timers
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAssembling(true);
    setAssemblyProgress(8);
    setAssemblyStatus('Assembling page...');
    setActiveStepIds(new Set());
    setCadBoxes([]);

    const count = config.cursorCount || 6;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const spd = 1 / (config.speedMultiplier || 1.0);

    const initialAgents: AgentState[] = [];
    for (let i = 0; i < count; i++) {
      const palette = AGENT_PALETTE[i % AGENT_PALETTE.length];
      const angle = (i / count) * Math.PI * 2;
      const radius = 56;
      initialAgents.push({
        id: i,
        name: palette.name,
        color: palette.color,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        targetX: cx + Math.cos(angle) * radius,
        targetY: cy + Math.sin(angle) * radius,
        orbitAngle: angle,
        mode: 'orbit'
      });
    }
    setAgents(initialAgents);

    // Loop for spring cursor physics
    let lastTime = performance.now();
    const updateLoop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const currentCx = window.innerWidth / 2;
      const currentCy = window.innerHeight / 2;

      setAgents(prev =>
        prev.map(ag => {
          let tx = ag.targetX;
          let ty = ag.targetY;
          let nAngle = ag.orbitAngle;

          if (ag.mode === 'orbit') {
            nAngle += 3.8 * delta * (config.speedMultiplier || 1.0);
            const r = 58 + Math.sin(now * 0.005 + ag.id) * 6;
            tx = currentCx + Math.cos(nAngle) * r;
            ty = currentCy + Math.sin(nAngle) * r;
          }

          const nx = ag.x + (tx - ag.x) * 0.22;
          const ny = ag.y + (ty - ag.y) * 0.22;

          return {
            ...ag,
            x: nx,
            y: ny,
            targetX: tx,
            targetY: ty,
            orbitAngle: nAngle
          };
        })
      );

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };
    animFrameRef.current = requestAnimationFrame(updateLoop);

    // Sparkle burst at 800ms
    const tBurst = setTimeout(() => {
      for (let s = 0; s < 7; s++) {
        setTimeout(() => {
          spawnSparkle(
            80 + Math.random() * (window.innerWidth * 0.65),
            90 + Math.random() * (window.innerHeight * 0.65),
            '#ffffff'
          );
        }, s * 50);
      }
      setAssemblyProgress(24);
      playTick(720, 0.05, 'triangle');
    }, 800 * spd);
    timeoutsRef.current.push(tBurst);

    // Build plan mapping targets to agents
    const buildPlan = [
      { id: 'target-nav', agentIdx: 0, delay: 900, dur: 550, prog: 34, label: 'NAV-SYNTH' },
      { id: 'target-hero-title', agentIdx: 1, delay: 1100, dur: 750, prog: 46, label: 'TYPE-ENGINE' },
      { id: 'target-name-card', agentIdx: 2, delay: 1400, dur: 700, prog: 58, label: 'QARLUQ-ID' },
      { id: 'target-bio-box', agentIdx: 3, delay: 1800, dur: 800, prog: 70, label: 'COPY-NODE' },
      { id: 'target-portrait', agentIdx: 4, delay: 1650, dur: 1100, prog: 82, label: 'SHADER-CORE' },
      { id: 'target-portrait-caption', agentIdx: 5, delay: 2800, dur: 450, prog: 86, label: 'META-TAG' },
      { id: 'target-stats-row', agentIdx: 2, delay: 2600, dur: 600, prog: 90, label: 'STATS-UI' },
      { id: 'target-log-1', agentIdx: 0, delay: 1900, dur: 650, prog: 93, label: 'LOG-01' },
      { id: 'target-log-2', agentIdx: 1, delay: 2350, dur: 650, prog: 96, label: 'LOG-02' },
      { id: 'target-log-3', agentIdx: 2, delay: 2750, dur: 650, prog: 100, label: 'LOG-03' }
    ];

    buildPlan.forEach(step => {
      const t = setTimeout(() => {
        const el = document.getElementById(step.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const ag = initialAgents[step.agentIdx % initialAgents.length];

        // Add CAD wireframe drag box
        setCadBoxes(prev => [
          ...prev.filter(b => b.id !== step.id),
          {
            id: step.id,
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
            color: ag.color,
            label: step.label
          }
        ]);

        // Move agent cursor to drag position
        setAgents(prev =>
          prev.map(a =>
            a.id === ag.id
              ? {
                  ...a,
                  mode: 'fly',
                  targetX: rect.left + rect.width,
                  targetY: rect.top + rect.height
                }
              : a
          )
        );

        spawnSparkle(rect.left, rect.top, ag.color);
        playTick(500 + ag.id * 50, 0.03);

        // Lock component into active crisp state after duration
        setTimeout(() => {
          setActiveStepIds(prev => new Set([...prev, step.id]));
          setCadBoxes(prev => prev.filter(b => b.id !== step.id));
          setAssemblyProgress(step.prog);
          spawnSparkle(rect.left + rect.width, rect.top + rect.height, ag.color);
          playTick(750 + ag.id * 60, 0.045, 'triangle');
        }, step.dur * spd);
      }, step.delay * spd);

      timeoutsRef.current.push(t);
    });

    // Finalize assembly
    const tFinish = setTimeout(() => {
      // Also reveal philosophy cards
      setActiveStepIds(
        new Set([
          'target-nav',
          'target-hero-title',
          'target-name-card',
          'target-bio-box',
          'target-portrait',
          'target-portrait-caption',
          'target-stats-row',
          'target-log-1',
          'target-log-2',
          'target-log-3',
          'target-sec2-index',
          'target-sec2-title',
          'target-phil-1',
          'target-phil-2',
          'target-phil-3'
        ])
      );
      setCadBoxes([]);
      setAssemblyStatus('Assembly complete ✦');
      setAssemblyProgress(100);

      // Fade out agents
      setTimeout(() => {
        setIsAssembling(false);
        setAgents([]);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      }, 500);
    }, 3800 * spd);

    timeoutsRef.current.push(tFinish);
  };

  const skipAssembly = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCadBoxes([]);
    setAgents([]);
    setActiveStepIds(
      new Set([
        'target-nav',
        'target-hero-title',
        'target-name-card',
        'target-bio-box',
        'target-portrait',
        'target-portrait-caption',
        'target-stats-row',
        'target-log-1',
        'target-log-2',
        'target-log-3',
        'target-sec2-index',
        'target-sec2-title',
        'target-phil-1',
        'target-phil-2',
        'target-phil-3'
      ])
    );
    setAssemblyStatus('Assembly complete ✦');
    setAssemblyProgress(100);
    setIsAssembling(false);
  };

  const handleDownloadHtml = () => {
    const code = generateAutonomousPortfolioHtml(config);
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qarluq-uyghur-portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfigChange = (updated: Partial<PortfolioConfig>) => {
    setConfig(prev => ({ ...prev, ...updated }));
  };

  // Auto start on first load
  useEffect(() => {
    const t = setTimeout(() => {
      startSwarmAssembly();
    }, 300);
    return () => {
      clearTimeout(t);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const fullHtmlCode = generateAutonomousPortfolioHtml(config);

  return (
    <div className="tech-grid-bg min-h-screen relative text-zinc-100 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* ===================================================================== */}
      {/* TOP FLOATING ACTION BAR WITH UYGHUR CONTROLS & TURKISTAN FLAG       */}
      {/* ===================================================================== */}
      <nav
        aria-label="ئۈستۈنكى قورال بالدىقى"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[85] w-[95%] max-w-4xl px-3 sm:px-4 py-2 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-md flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            onClick={() => setIsFlagModalOpen(true)}
            className="cursor-pointer hover:scale-105 transition-transform"
            title="تۈركىستان بايرىقىنى كۆرۈش"
          >
            <TurkistanFlag size="sm" styleMode="waving" />
          </div>
          <div>
            <span className="font-display font-bold text-xs sm:text-sm text-white block leading-tight">
              قارلۇق ئۇيغۇر پورتفولىيوسى
            </span>
            <span className="font-mono text-[10px] text-sky-400 block sm:hidden">
              تۈركىستان بايرىقى قوشۇلدى
            </span>
            <span className="font-mono text-[10px] text-zinc-400 hidden sm:block">
              تۈركىستان بايرىقى قوشۇلغان • ئۆزلۈكىدىن قۇرۇلىدىغان تور بەت
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Wild / Overdrive Mode Toggle ("ۋەششىي ھالەت") */}
          <button
            onClick={toggleOverdrive}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              config.isOverdrive
                ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-black shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-200 animate-pulse'
                : 'border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/50'
            }`}
            title="ۋەششىي شاش قارام ھالەتنى ئېچىش / تاقاش"
          >
            <Zap className={`w-3.5 h-3.5 ${config.isOverdrive ? 'fill-black' : 'text-cyan-400'}`} />
            <span className="hidden sm:inline">
              {config.isOverdrive ? '⚡ ۋەششىي: ئوچۇق' : '⚡ ۋەششىي ھالەت'}
            </span>
            <span className="sm:hidden">⚡</span>
          </button>

          {/* View & Copy Code Button */}
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">HTML كودى</span>
            <span className="md:hidden">كود</span>
          </button>

          {/* Download HTML Button */}
          <button
            onClick={handleDownloadHtml}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="HTML ھۆججىتىنى بىۋاستە چۈشۈرۈش"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">چۈشۈرۈش</span>
          </button>

          {/* Builder Drawer Trigger */}
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1 transition-all cursor-pointer"
            title="خاسلاشتۇرۇش ۋە تەڭشەك"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden lg:inline">تەڭشەش</span>
          </button>
        </div>
      </nav>

      {/* Interactive Particle Galaxy & Laser Scan Canvas */}
      <CyberCanvas isOverdrive={config.isOverdrive} accentColor={config.accentColor} />

      {/* Sparkles Layer */}
      {sparkles.map(s => (
        <div
          key={s.id}
          className="sparkle-star"
          style={{ left: `${s.x}px`, top: `${s.y}px` }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={s.color}>
            <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
          </svg>
        </div>
      ))}

      {/* CAD Wireframe Drag Boxes */}
      {cadBoxes.map(box => (
        <div
          key={box.id}
          className="cad-wireframe-box animate-pulse"
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            borderColor: box.color
          }}
        >
          <div className="cad-corner tl" style={{ borderColor: box.color }} />
          <div className="cad-corner tr" style={{ borderColor: box.color }} />
          <div className="cad-corner bl" style={{ borderColor: box.color }} />
          <div className="cad-corner br" style={{ borderColor: box.color }} />
          <div
            style={{ backgroundColor: box.color }}
            className="absolute -top-4 left-0 px-1 py-0.2 text-[8px] font-mono font-bold text-white uppercase whitespace-nowrap shadow-sm"
          >
            {box.label} · {Math.round(box.width)}×{Math.round(box.height)}
          </div>
        </div>
      ))}

      {/* Multi-Agent Cursors */}
      {agents.map(ag => (
        <div
          key={ag.id}
          className="fixed top-0 left-0 pointer-events-none z-[75] transition-opacity duration-300"
          style={{
            transform: `translate3d(${ag.x}px, ${ag.y}px, 0)`,
            willChange: 'transform'
          }}
        >
          <div className="relative flex items-start">
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              <path
                d="M1.5 1.5L16 10.5L9.2 12.2L6.5 19.5L1.5 1.5Z"
                fill={ag.color}
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{ backgroundColor: ag.color }}
              className="ml-1 mt-3 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white shadow-md whitespace-nowrap tracking-tight"
            >
              {ag.name}
            </span>
          </div>
        </div>
      ))}

      {/* ===================================================================== */}
      {/* MAIN PORTFOLIO CANVAS STAGE                                          */}
      {/* ===================================================================== */}
      <main className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-20 pb-32 relative z-10">
        
        {/* 1. TOP NAVIGATION BAR */}
        <header
          id="target-nav"
          className={`asm-target flex items-center justify-between py-3 px-4 rounded-xl border border-zinc-900/80 bg-zinc-950/70 backdrop-blur-md mb-3 transition-all ${
            activeStepIds.has('target-nav') ? 'asm-complete' : 'asm-skeleton'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center font-display font-black text-white text-base tracking-tighter shadow-md">
              ق
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-300 tracking-wider font-semibold uppercase">
                // QARLUQ_UYGHUR
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              
              {/* Turkistan Flag pill */}
              <div
                onClick={() => setIsFlagModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-950/40 border border-sky-500/30 text-sky-300 font-mono text-[10px] shadow-sm cursor-pointer hover:border-sky-400 transition-colors"
                title="تۈركىستان بايرىقى كۆرۈنمىسى"
              >
                <TurkistanFlag size="xs" styleMode="flat" />
                <span className="hidden md:inline font-sans">تۈركىستان بايرىقى</span>
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-5 sm:gap-8 text-xs font-mono text-zinc-400">
            <a
              href="#hero-section"
              className="text-white hover:accent-text transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full accent-bg" />
              ھەققىدە
            </a>
            <a href="#philosophy-section" className="hover:text-white transition-colors">
              تەپەككۇر
            </a>
            <a
              href="#philosophy-section"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              ئارخىتېكتۇرا
            </a>
            <a href="#philosophy-section" className="hover:text-white transition-colors">
              ئالاقە
            </a>
          </nav>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-zinc-300 hidden md:inline">SWARM: ONLINE</span>
          </div>
        </header>

        {/* 2. GIANT OUTLINED HERO TITLE */}
        <section id="hero-section" className="relative mt-1">
          <div
            id="target-hero-title"
            className={`asm-target w-full overflow-hidden py-1 transition-all ${
              activeStepIds.has('target-hero-title') ? 'asm-complete' : 'asm-skeleton'
            }`}
          >
            <h1
              onClick={triggerGlitchScramble}
              className={`hero-outline-text text-center text-[15.2vw] xl:text-[212px] tracking-tight leading-none select-none cursor-pointer transition-all ${
                config.isOverdrive ? 'cyber-glitch-text drop-shadow-[0_0_35px_rgba(0,229,255,0.7)]' : ''
              } ${activeStepIds.has('target-hero-title') ? '' : 'wireframe-mode'}`}
              title="گلىتچ ۋە تېكىست ئۈنۈمى ئۈچۈن چېكىڭ"
            >
              {config.heroOutline}
            </h1>
          </div>

          {/* 3. THREE-COLUMN HERO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start -mt-2 sm:-mt-6 lg:-mt-10 relative z-20">
            
            {/* LEFT COLUMN: Greeting, Qarluq Uyghur Name Block, Flag, Bio, Buttons, Metrics */}
            <div className="lg:col-span-5 flex flex-col space-y-5 pt-2">
              
              {/* Name Card with Qarluq Uyghur and Turkistan Flag */}
              <div
                id="target-name-card"
                className={`asm-target inline-flex flex-col items-start transition-all ${
                  activeStepIds.has('target-name-card') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif italic text-2xl sm:text-3xl text-zinc-200 pl-0.5">
                    {config.greeting}
                  </span>
                  
                  {/* East Turkistan Flag waving with cyber aura in overdrive */}
                  <div
                    onClick={() => setIsFlagModalOpen(true)}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    title="East Turkistan Flag / شەرقىي تۈركىستان كۆك بايرىقى"
                  >
                    <TurkistanFlag size="sm" styleMode="waving" glow={config.isOverdrive} />
                  </div>
                </div>

                {/* Cyber Accent Name Block: "مەن قارلۇق ئۇيغۇر" with hover decryption */}
                <div
                  onMouseEnter={triggerGlitchScramble}
                  onClick={triggerGlitchScramble}
                  className={`accent-bg px-5 py-2.5 shadow-xl relative group rounded-sm flex items-center gap-3 cursor-pointer transition-all ${
                    config.isOverdrive ? 'overdrive-pulse' : ''
                  }`}
                  title="ماترىسسا كود يېشىش ئۈنۈمىنى قوزغاش ئۈچۈن مائۇسنى ئەكېلىڭ"
                >
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                    {displayName}
                  </h2>
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/60" />
                  {config.isOverdrive && (
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-300 animate-ping" />
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 font-mono text-[11px] tracking-widest uppercase accent-text font-semibold">
                  <span>•</span>
                  <span>{config.role}</span>
                </div>
              </div>

              {/* Bio Description & Action Buttons */}
              <div
                id="target-bio-box"
                className={`asm-target space-y-5 transition-all ${
                  activeStepIds.has('target-bio-box') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
                  {config.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      setShowRegisterPrompt(true);
                      if (soundEnabled) playTick(660, 0.12, 'sine');
                    }}
                    className="accent-glow-btn px-4 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                    title="تىزىملىتىش ۋە سىستېمىغا ئاتلىنىش"
                  >
                    <span>{config.btn1}</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setIsCodeModalOpen(true)}
                    className="px-4 py-2.5 rounded border border-zinc-800 hover:border-zinc-600 bg-zinc-950/80 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    {config.btn2}
                  </button>
                </div>

                {/* Pulsating Prompt that appears right under دەرھال ئاتلىنىش */}
                {showRegisterPrompt && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/90 shadow-[0_0_30px_rgba(0,255,157,0.35)] flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono text-xs sm:text-sm text-emerald-200 font-bold">
                        سىستېمىغا كىرىش ئۈچۈن تىزىملىتىڭ:
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsHackerModalOpen(true);
                        if (soundEnabled) playTick(750, 0.15, 'triangle');
                      }}
                      className="w-full sm:w-auto px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-mono text-xs font-black tracking-wider shadow-lg hover:shadow-emerald-500/50 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      <span>⚡ تىزىملىتىپ كىرىڭ</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom 3 Metrics Row */}
              <div
                id="target-stats-row"
                className={`asm-target pt-4 border-t border-zinc-900 grid grid-cols-3 gap-4 max-w-md transition-all ${
                  activeStepIds.has('target-stats-row') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-xl sm:text-2xl accent-text">
                      {config.stat1Val}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">LOC</span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400 mt-0.5">{config.stat1Lbl}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {config.stat2Val}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">Arch</span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400 mt-0.5">{config.stat2Lbl}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {config.stat3Val}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">Raw</span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400 mt-0.5">{config.stat3Lbl}</p>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Portrait Card with East Turkistan Flag Overlays */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                id="target-portrait"
                className={`asm-target w-full max-w-[340px] aspect-[4/4.7] relative rounded-sm overflow-hidden border border-zinc-800/90 bg-zinc-900/70 shadow-2xl group transition-all ${
                  activeStepIds.has('target-portrait') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                {/* Initial Wireframe Crosshair Layer */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div className="w-full h-[1px] bg-zinc-700" />
                  <div className="h-full w-[1px] bg-zinc-700 absolute" />
                </div>

                {/* Accent Reveal Backdrop */}
                <div
                  className={`portrait-accent-bg absolute inset-0 scanlines ${
                    activeStepIds.has('target-portrait') ? 'revealed' : ''
                  }`}
                />

                {/* Fedora & Noir Suit Silhouette */}
                <div className="relative z-10 w-full h-full flex items-end justify-center pt-6">
                  <svg
                    viewBox="0 0 320 380"
                    className="w-[92%] h-[92%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-transform duration-700 group-hover:scale-[1.02]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse cx="160" cy="118" rx="68" ry="16" fill="#09090c" opacity="0.25" />
                    <path d="M112 96 C116 54, 140 44, 162 46 C184 44, 206 56, 210 96 Z" fill="#0c0c10" />
                    <path d="M111 91 Q160 100 211 91 L213 99 Q160 108 109 99 Z" fill="#18181f" />
                    <path d="M68 102 C95 88, 225 88, 254 104 C230 118, 92 118, 68 102 Z" fill="#09090d" />
                    <path d="M126 104 L132 162 C136 184, 184 184, 188 162 L194 104 Z" fill="#101015" />
                    <rect x="136" y="122" width="19" height="8" rx="2" fill="#272732" opacity="0.7" />
                    <rect x="165" y="122" width="19" height="8" rx="2" fill="#272732" opacity="0.7" />
                    <line x1="155" y1="125" x2="165" y2="125" stroke="#272732" strokeWidth="1.5" />
                    <path d="M138 174 L122 204 L160 275 L198 204 L182 174 Z" fill="#dcdce5" />
                    <path d="M153 192 L167 192 L171 268 L160 282 L149 268 Z" fill="#09090c" />
                    <path d="M26 380 L42 232 C46 206, 86 192, 124 184 L160 280 L196 184 C234 192, 274 206, 278 232 L294 380 Z" fill="#0c0c10" />
                    <path d="M120 186 L102 230 L156 286 L160 275 Z" fill="#16161d" />
                    <path d="M200 186 L218 230 L164 286 L160 275 Z" fill="#16161d" />
                    <path d="M204 264 L218 256 L224 266 L202 268 Z" fill="#e4e4ec" opacity="0.85" />
                  </svg>
                </div>

                {/* Technical Corner Overlays with East Turkistan Flag */}
                <div className="absolute top-2.5 left-3 z-20 flex items-center gap-1.5 font-mono text-[10px] text-white/90 tracking-widest uppercase bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                  <TurkistanFlag size="xs" styleMode="flat" glow={config.isOverdrive} />
                  <span>ID // QARLUQ-01</span>
                </div>
                <div className="absolute top-2.5 right-3 z-20 w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              </div>

              {/* Portrait Bottom Caption */}
              <div
                id="target-portrait-caption"
                className={`asm-target w-full max-w-[340px] flex items-center justify-between pt-2.5 font-mono text-[11px] text-zinc-400 transition-all ${
                  activeStepIds.has('target-portrait-caption') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <span className="tracking-widest uppercase">{config.portraitCaption}</span>
                <span className="text-zinc-600">[24/7 OP]</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Architecture Log Cards */}
            <div className="lg:col-span-3 flex flex-col space-y-3.5 pt-2">
              <div className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase pb-1 border-b border-zinc-900 flex items-center justify-between">
                <span>// ARCHITECTURE LOG</span>
                <span className="accent-text">SYS.03</span>
              </div>

              {/* Card 01 */}
              <div
                id="target-log-1"
                className={`asm-target p-4 rounded bg-zinc-950/90 border border-zinc-800/80 hover:border-sky-500/50 transition-all group ${
                  activeStepIds.has('target-log-1') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="accent-text font-bold">01</span>
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    CORE.SWARM
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  {config.log1Title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{config.log1Desc}</p>
              </div>

              {/* Card 02 */}
              <div
                id="target-log-2"
                className={`asm-target p-4 rounded bg-zinc-950/90 border border-zinc-800/80 hover:border-sky-500/50 transition-all group ${
                  activeStepIds.has('target-log-2') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="accent-text font-bold">02</span>
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    GRAPH.SYNTH
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  {config.log2Title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{config.log2Desc}</p>
              </div>

              {/* Card 03 */}
              <div
                id="target-log-3"
                className={`asm-target p-4 rounded bg-zinc-950/90 border border-zinc-800/80 hover:border-sky-500/50 transition-all group ${
                  activeStepIds.has('target-log-3') ? 'asm-complete' : 'asm-skeleton'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="accent-text font-bold">03</span>
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    EXEC.LOOP
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  {config.log3Title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{config.log3Desc}</p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: PHILOSOPHY & COGNITIVE PROFILE */}
        <section id="philosophy-section" className="mt-20 pt-10 border-t border-zinc-900/90 relative">
          
          <div
            id="target-sec2-index"
            className={`asm-target flex items-center justify-between font-mono text-xs text-zinc-500 mb-8 transition-all ${
              activeStepIds.has('target-sec2-index') ? 'asm-complete' : 'asm-skeleton'
            }`}
          >
            <span>// 01.00 SEC_ABOUT INDEX [01/05] • QARLUQ UYGHUR</span>
            <span className="hidden sm:inline">LATENCY: 0.04ms // MEM_LOCK: TRUE</span>
          </div>

          <div
            id="target-sec2-title"
            className={`asm-target mb-10 transition-all ${
              activeStepIds.has('target-sec2-title') ? 'asm-complete' : 'asm-skeleton'
            }`}
          >
            <div className="font-mono text-xs uppercase tracking-widest accent-text font-semibold mb-2">
              COGNITIVE PROFILE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {config.sec2Heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div
              id="target-phil-1"
              className={`asm-target p-6 rounded-lg bg-zinc-950/90 border border-zinc-800/90 flex flex-col justify-between space-y-4 transition-all ${
                activeStepIds.has('target-phil-1') ? 'asm-complete' : 'asm-skeleton'
              }`}
            >
              <div>
                <div className="font-mono text-xs accent-text mb-2">// 01. FIRST PRINCIPLES</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {config.phil1Title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{config.phil1Desc}</p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>STATUS: VERIFIED</span>
                <span className="text-emerald-400">100% NATIVE</span>
              </div>
            </div>

            <div
              id="target-phil-2"
              className={`asm-target p-6 rounded-lg bg-zinc-950/90 border border-zinc-800/90 flex flex-col justify-between space-y-4 transition-all ${
                activeStepIds.has('target-phil-2') ? 'asm-complete' : 'asm-skeleton'
              }`}
            >
              <div>
                <div className="font-mono text-xs accent-text mb-2">// 02. SWARM COGNITION</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {config.phil2Title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{config.phil2Desc}</p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>AGENTS: 16 ACTIVE</span>
                <span className="accent-text">AUTONOMOUS</span>
              </div>
            </div>

            <div
              id="target-phil-3"
              className={`asm-target p-6 rounded-lg bg-zinc-950/90 border border-zinc-800/90 flex flex-col justify-between space-y-4 transition-all ${
                activeStepIds.has('target-phil-3') ? 'asm-complete' : 'asm-skeleton'
              }`}
            >
              <div>
                <div className="font-mono text-xs accent-text mb-2">// 03. DETERMINISTIC SPEED</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {config.phil3Title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{config.phil3Desc}</p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>THROUGHPUT: 1.2M/s</span>
                <span className="text-cyan-400">LOCKED</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: AUTONOMOUS 3D AI VIDEO CINEMA */}
        <CyberVideoSection
          isOverdrive={config.isOverdrive}
          accentColor={config.accentColor}
        />

      </main>

      {/* ===================================================================== */}
      {/* BOTTOM FLOATING TELEMETRY PILL BAR                                    */}
      {/* ===================================================================== */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-950/95 border border-zinc-800/90 shadow-[0_10px_40px_rgba(0,0,0,0.85)] backdrop-blur-md">
        
        {/* Agent Dots */}
        <div className="flex items-center -space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-zinc-950" />
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-zinc-950" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-zinc-950" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-zinc-950" />
        </div>

        {/* Status text */}
        <span className="font-mono text-xs text-zinc-200 tracking-wide min-w-[145px]">
          {assemblyStatus}
        </span>

        {/* Progress bar */}
        <div className="w-16 sm:w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
          <div
            className="h-full accent-bg transition-all duration-200"
            style={{ width: `${assemblyProgress}%` }}
          />
        </div>

        <div className="h-3.5 w-[1px] bg-zinc-800" />

        {/* Skip button during animation */}
        {isAssembling && (
          <button
            onClick={skipAssembly}
            className="font-mono text-xs text-zinc-400 hover:text-white transition-colors px-1.5 cursor-pointer"
          >
            Skip
          </button>
        )}

        {/* Replay Assembly Button */}
        <button
          onClick={startSwarmAssembly}
          title="قايتا قۇرۇش / Replay Assembly"
          className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Sound toggle */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playTick(880, 0.06, 'triangle');
          }}
          title={soundEnabled ? 'ئاۋازنى ئۆچۈرۈش' : 'ئاۋازنى ئېچىش'}
          className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* ===================================================================== */}
      {/* MODALS & DRAWERS                                                      */}
      {/* ===================================================================== */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        htmlCode={fullHtmlCode}
      />

      <BuilderDrawer
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        config={config}
        onConfigChange={handleConfigChange}
        onReplayAssembly={startSwarmAssembly}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onDownloadHtml={handleDownloadHtml}
      />

      {/* Flag Showcase Modal */}
      {isFlagModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsFlagModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-3">
              <TurkistanFlag size="md" styleMode="flat" />
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  شەرقىي تۈركىستان كۆك بايرىقى
                </h3>
                <p className="font-mono text-xs text-sky-400">East Turkistan Kökbayraq</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <TurkistanFlag size="xl" styleMode="waving" className="w-full h-auto" />
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              تۈركىستان كۆك بايرىقى مۇقەددەس ئاسمان كۆكى تەگلىككە چۈشۈرۈلگەن ئاق يېرىم ئاي ۋە بەش قىرلىق يۇلتۇز بىلەن ئىپادىلىنىدۇ.
              بۇ بەتكە مۇكەممەل ھالدا قوشۇلدى ۋە كودى تەييارلاندى.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setIsFlagModalOpen(false);
                  setIsCodeModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold cursor-pointer"
              >
                HTML كودىنى ئېلىش
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hacker Matrix Terminal Modal */}
      <HackerModal
        isOpen={isHackerModalOpen}
        onClose={() => setIsHackerModalOpen(false)}
        soundEnabled={soundEnabled}
      />

    </div>
  );
}
