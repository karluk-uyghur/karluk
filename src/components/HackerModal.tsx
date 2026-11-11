/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, Coffee, RefreshCw, X, Sparkles } from 'lucide-react';
import { validateHackerInput, formatHackerResponse, HACKER_PUNCHLINE } from '../utils/hackerTerminal.ts';

interface HackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export default function HackerModal({ isOpen, onClose, soundEnabled }: HackerModalProps) {
  const [step, setStep] = useState<'input' | 'processing' | 'punchline'>('input');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paidCoffee, setPaidCoffee] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playSound = (freq = 600, duration = 0.1, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy
    }
  };

  // Matrix digital rain canvas
  useEffect(() => {
    if (!isOpen) {
      setStep('input');
      setUserName('');
      setErrorMessage('');
      setPaidCoffee(false);
      return;
    }

    if (soundEnabled) {
      playSound(440, 0.12, 'sawtooth');
    }

    // Auto-focus input after modal opens
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const chars = '0123456789ABCDEF01010101XYZ#<>{}[]=+$*@!~%&';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -30));

    let lastTime = 0;
    const draw = (time: number) => {
      animId = requestAnimationFrame(draw);
      if (time - lastTime < 33) return; // ~30fps throttle
      lastTime = time;

      ctx.fillStyle = 'rgba(5, 8, 15, 0.18)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character is brighter cyan/white
        ctx.fillStyle = drops[i] % 4 === 0 ? '#38bdf8' : '#00ff9d';
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animId = requestAnimationFrame(draw);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, soundEnabled]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = validateHackerInput(userName);
    if (!val.valid) {
      setErrorMessage(val.error || 'ئىسمىڭىزنى كىرگۈزۈڭ');
      if (soundEnabled) playSound(220, 0.2, 'sawtooth');
      return;
    }

    setErrorMessage('');
    setStep('processing');
    if (soundEnabled) playSound(650, 0.15, 'sine');

    setTimeout(() => {
      setStep('punchline');
      if (soundEnabled) playSound(330, 0.35, 'square');
    }, 700);
  };

  const handlePayCoffee = () => {
    setPaidCoffee(true);
    if (soundEnabled) {
      playSound(880, 0.25, 'triangle');
      setTimeout(() => playSound(1320, 0.3, 'sine'), 120);
    }
  };

  const handleReset = () => {
    setStep('input');
    setUserName('');
    setErrorMessage('');
    setPaidCoffee(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn">
      {/* Outer Cyber Terminal Box */}
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-emerald-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(0,255,157,0.2)] flex flex-col max-h-[92vh]">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-emerald-500/30 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-zinc-800">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs text-emerald-300 font-semibold tracking-wider">
                QARLUQ_CYBER_TERMINAL // v5.2
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 hidden sm:inline">
              SSH://ROOT:ONLINE
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              title="تېرمىنالنى تاقاش"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Matrix Canvas Backdrop */}
        <div className="relative flex-1 p-5 sm:p-7 overflow-y-auto min-h-[380px] flex flex-col justify-between">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-35 z-0"
          />

          {/* Terminal Content Container */}
          <div className="relative z-10 space-y-5">
            
            {/* Terminal Boot Log */}
            <div className="font-mono text-xs text-emerald-400/90 space-y-1 bg-black/60 p-3.5 rounded-lg border border-emerald-950 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span>[⚡] QARLUQ AUTONOMOUS CLUSTER CONNECTED</span>
              </div>
              <div className="text-zinc-400">
                &gt; SYSTEM PROTOCOL: SECURE_MATRIX_UPLINK (ACTIVE)
              </div>
              <div className="text-zinc-400">
                &gt; AUTH STATUS: REQUIRING USER IDENTITY
              </div>
            </div>

            {/* STEP 1: Enter Name Form */}
            {step === 'input' && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="block font-mono text-sm sm:text-base text-emerald-300 font-bold tracking-wide">
                    &gt;&gt; ئىسمىڭىزنى كىرگۈزۈڭ:
                  </label>
                  <p className="text-xs text-zinc-400">
                    سىستېمىغا كىرىش ۋە تىزىملىتىش ئۈچۈن ئىسمىڭىزنى يېزىڭ:
                  </p>
                  
                  <div className="relative flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userName}
                      onChange={e => {
                        setUserName(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="مەسىلەن: قارلۇق، ئەلى، زەپەر..."
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border-2 border-emerald-500/60 focus:border-cyan-400 text-white font-mono text-base outline-none shadow-[0_0_20px_rgba(0,255,157,0.25)] transition-all"
                    />
                    <span className="absolute right-3 font-mono text-xs text-emerald-400/60 pointer-events-none hidden sm:inline">
                      [USER_ID]
                    </span>
                  </div>

                  {errorMessage && (
                    <p className="font-mono text-xs text-red-400 flex items-center gap-1.5 pt-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>{errorMessage}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-zinc-500">
                    بېسىڭ: Enter ياكى مۇقىملاش
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-mono text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_25px_rgba(0,255,157,0.4)] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>مۇقىملاش</span>
                    <span>↵</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Processing Matrix Animation */}
            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                <div className="font-mono text-emerald-400 text-sm animate-pulse">
                  [دەللىللەۋاتىدۇ... زىيارەتچى: {userName}]
                </div>
                <div className="font-mono text-xs text-zinc-500">
                  CHECKING SOVEREIGN CLEARANCE &amp; REPOSITORY KEYS...
                </div>
              </div>
            )}

            {/* STEP 3: The Famous Punchline & Humorous Hacker Gate */}
            {step === 'punchline' && (
              <div className="space-y-5 animate-scaleUp">
                
                {/* Warning Alert Banner */}
                <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold">
                    <ShieldAlert className="w-4 h-4 animate-bounce" />
                    <span>[STATUS: 402 PAYMENT REQUIRED // سىستېما تەلىپى]</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 px-2 py-0.5 bg-black/60 rounded">
                    USER: {userName || 'مېھمان'}
                  </span>
                </div>

                {/* THE MAIN PUNCHLINE QUOTE BOX */}
                <div className="p-6 rounded-xl bg-black/85 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.25)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="font-mono text-xs text-amber-400 tracking-wider font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>// مەشھۇر ھەقىقەت • كودېرلارنىڭ ساداسى:</span>
                    </div>

                    <blockquote className="font-display font-extrabold text-xl sm:text-2xl text-white leading-relaxed tracking-wide text-amber-200">
                      «{HACKER_PUNCHLINE}»
                    </blockquote>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-mono pt-1 border-t border-zinc-800">
                      ھۆرمەتلىك <span className="text-cyan-300 font-bold">{userName}</span>، يۇقىرى تېخنىكىلىق كود ئۆزلۈكىدىن يېزىلمايدۇ! ئەقىل ئەمگىكى ۋە كەچلىك كودلاشلار قەدىرلىنىشى كېرەك! 💻✨
                    </p>
                  </div>
                </div>

                {/* Funny Payment / Coffee Acceptance Action */}
                {!paidCoffee ? (
                  <div className="p-4 rounded-lg bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-center sm:text-right">
                      <div className="font-mono text-xs text-zinc-300 font-semibold">
                        ھەقنى قانداق تاپشۇرىمىز؟
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        تەپەككۇر ۋە ئەمگەك ھەققى سۈپىتىدە مەۋھۇم بىر لوڭقا قەھۋە سۇنۇڭ:
                      </div>
                    </div>

                    <button
                      onClick={handlePayCoffee}
                      className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-mono text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
                    >
                      <Coffee className="w-4 h-4" />
                      <span>قەھۋە سۇنۇش (ھەق تاپشۇرۇش) ☕</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2.5 text-emerald-300 font-mono text-xs sm:text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>
                        مۇبارەك بولسۇن! قەھۋە مۇۋەپپەقىيەتلىك تاپشۇرۇلدى! سىز ھەقىقىي مەرھەمەتلىك دوستىمىز ئىكەنسىز! 🎉
                      </span>
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>قايتا كىرگۈزۈش</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs transition-colors cursor-pointer"
                  >
                    چىقىش
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Terminal Bottom Status */}
          <div className="relative z-10 pt-4 mt-4 border-t border-zinc-900/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>TERMINAL_SESSION: #402-QARLUQ</span>
            <span className="text-emerald-500/80">EAST_TURKISTAN_CORE // SECURE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
