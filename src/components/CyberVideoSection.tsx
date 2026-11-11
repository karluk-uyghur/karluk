/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, Sparkles, Cpu } from 'lucide-react';

interface CyberVideoSectionProps {
  isOverdrive: boolean;
  accentColor: string;
}

export default function CyberVideoSection({ isOverdrive, accentColor }: CyberVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="system-video-section" className="mt-24 pt-12 border-t border-zinc-900/90 relative">
      
      {/* CAD Index Header */}
      <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6">
        <div className="flex items-center gap-2">
          <span className="accent-text font-bold">// 02.00 SYSTEM_DEMO</span>
          <span className="text-zinc-700">|</span>
          <span>AUTONOMOUS 3D CINEMA • FABLE 5.2</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            4K UHD READY
          </span>
          <span className="text-zinc-600">// GPU: ACTIVE</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-8 max-w-3xl">
        <div className="font-mono text-xs uppercase tracking-widest accent-text font-semibold mb-2 flex items-center gap-2">
          <Video className="w-3.5 h-3.5" />
          <span>سۈنئىي ئەقىل ھەرىكەتلىك فىلىم تەجرىبىخانىسى</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          سۈنئىي ئەقىل ئارقىلىق 3D ئۆزلۈكىدىن قۇرۇلغان ئانىماتسىيە فىلىمى
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-3">
          Fable 5.2 مودېلى پەقەت بىرلا جۈملە تەلەپ ئارقىلىق پۈتۈنلەي Blender 3D مۇھىتىدا 13 خىل كامېرا بۇلۇڭىدا، 4K ئېنىقلىق بىلەن ھاسىل قىلغان مەخسۇس ئانىماتسىيە كۆرۈنۈشى. تۆۋەندىكى فىلىمنى بىۋاسىتە قويۇپ كۆرەلەيسىز.
        </p>
      </div>

      {/* Cyber Frame Video Player Container */}
      <div className={`relative rounded-2xl overflow-hidden bg-black border transition-all duration-500 ${
        isOverdrive
          ? 'border-cyan-400/70 shadow-[0_0_50px_rgba(0,153,255,0.35)]'
          : 'border-zinc-800 shadow-2xl'
      }`}>
        
        {/* CAD Corner crosshair decorations */}
        <div className="absolute top-2 left-2 z-20 pointer-events-none font-mono text-[10px] text-cyan-400/80 bg-black/50 px-1.5 py-0.5 rounded">
          ┌ + [TOP_LEFT_FOV]
        </div>
        <div className="absolute top-2 right-2 z-20 pointer-events-none font-mono text-[10px] text-cyan-400/80 bg-black/50 px-1.5 py-0.5 rounded">
          [RENDER_4K] + ┐
        </div>
        <div className="absolute bottom-14 left-2 z-20 pointer-events-none font-mono text-[10px] text-cyan-400/80 bg-black/50 px-1.5 py-0.5 rounded">
          └ + [FRAME_RATE: 60FPS]
        </div>

        {/* Video Element */}
        <div className="relative aspect-video max-h-[620px] w-full flex items-center justify-center bg-zinc-950">
          <video
            ref={videoRef}
            src="/assets/aistudio/AQMb7jeHqtBAgLHeLIw53fbYt9RIhAFICW4U6HjS9YxBOl6iLUNbk_Nl7X_Wclk2rTLqNJspp_ae78db44.mp4"
            className="w-full h-full object-contain cursor-pointer"
            muted={isMuted}
            playsInline
            loop
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Big Play Overlay Button when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer group transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-sky-500/90 group-hover:bg-sky-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,153,255,0.6)] group-hover:scale-110 transition-transform">
                <Play className="w-9 h-9 fill-white ml-1" />
              </div>
              <div className="mt-4 px-4 py-1.5 rounded-full bg-black/80 border border-sky-400/50 text-white font-mono text-xs tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>فىلىمنى كۆرۈش / Play Video</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Player Control Bar */}
        <div className="px-4 py-3 bg-zinc-950/95 border-t border-zinc-800/90 flex flex-wrap items-center justify-between gap-3 relative z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer"
              title={isPlaying ? 'توختىتىش' : 'قويۇش'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'ئاۋازنى ئېچىش' : 'ئاۋازنى ئۆچۈرۈش'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <div className="font-mono text-xs text-zinc-300 hidden sm:block">
              <span className="accent-text font-bold">Fable 5.2</span> • Blender 3D Autonomy
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-[11px] text-zinc-400 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>تەننەرخ: $5.75 GPU</span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="پۈتۈن ئېكران قىلىش"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 4 Tech Specification Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
          <div className="font-mono text-xs accent-text font-bold">01 // MODEL</div>
          <div className="font-display font-bold text-lg text-white mt-1">Fable 5.2</div>
          <p className="text-xs text-zinc-400 mt-1">بىرلا تەلەپتىن ھاسىل بولغان پۈتۈن كۆرۈنۈش</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
          <div className="font-mono text-xs accent-text font-bold">02 // CAMERAS</div>
          <div className="font-display font-bold text-lg text-white mt-1">13 لىنزىلىق نۇقتا</div>
          <p className="text-xs text-zinc-400 mt-1">ماكاندىكى ماس قەدەملىك كامېرا يۆنىلىشى</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
          <div className="font-mono text-xs accent-text font-bold">03 // QUALITY</div>
          <div className="font-display font-bold text-lg text-white mt-1">4K UHD رەندىر</div>
          <p className="text-xs text-zinc-400 mt-1">يۇقىرى ئېنىقلىقتىكى نۇر قايتىش تەقلىدى</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
          <div className="font-mono text-xs accent-text font-bold">04 // EFFICIENCY</div>
          <div className="font-display font-bold text-lg text-white mt-1">$5.75 سەرپىيات</div>
          <p className="text-xs text-zinc-400 mt-1">GPU ھېسابلاش تەننەرخىنىڭ تېجەشلىكلىكى</p>
        </div>
      </div>

    </section>
  );
}
