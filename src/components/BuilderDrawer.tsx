import React from 'react';
import { X, RefreshCw, Download, Code2, Sliders, Flag, Palette } from 'lucide-react';
import { PortfolioConfig } from '../types/portfolio';
import { TurkistanFlag } from './TurkistanFlag';

interface BuilderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onConfigChange: (updated: Partial<PortfolioConfig>) => void;
  onReplayAssembly: () => void;
  onOpenCodeModal: () => void;
  onDownloadHtml: () => void;
}

export const BuilderDrawer: React.FC<BuilderDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
  onReplayAssembly,
  onOpenCodeModal,
  onDownloadHtml
}) => {
  if (!isOpen) return null;

  const colorPresets = [
    { name: 'Turkistan Azure', hex: '#0099ff' },
    { name: 'Cyan Neon', hex: '#06b6d4' },
    { name: 'Crimson Red', hex: '#ef4444' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Royal Violet', hex: '#8b5cf6' },
    { name: 'Amber Gold', hex: '#f59e0b' }
  ];

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl z-10 flex flex-col overflow-hidden animate-slideLeft">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="font-display font-bold text-base text-white">
              بەت تەڭشىكى &amp; خاسلاشتۇرۇش
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="تاقاش"
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          
          {/* Cyber Overdrive / ۋەششىي ھالەت Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-cyan-950/30 to-purple-950/30 border border-cyan-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <span>⚡ ۋەششىي ھالەت</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    OVERDRIVE
                  </span>
                </span>
                <p className="text-xs text-zinc-400 mt-0.5">
                  لازېر تورى، ئېلېكترونلۇق قۇتۇپ نۇرى ۋە شاش گلىتچ ئۈنۈمى
                </p>
              </div>
              <button
                type="button"
                onClick={() => onConfigChange({ isOverdrive: !config.isOverdrive })}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  config.isOverdrive ? 'bg-cyan-500' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    config.isOverdrive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Turkistan Flag Settings */}
          <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-sky-400" />
                <span className="font-medium text-white">تۈركىستان بايرىقى</span>
              </div>
              <TurkistanFlag size="xs" styleMode="flat" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 block">بايراق كۆرسىتىش ئۇسلۇبى</label>
              <div className="grid grid-cols-3 gap-2">
                {(['waving', 'flat', 'badge'] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => onConfigChange({ flagStyle: style })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                      config.flagStyle === style
                        ? 'border-sky-500 bg-sky-500/20 text-sky-200'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {style === 'waving' ? 'دولقۇنلۇق' : style === 'flat' ? 'تۈز' : 'بەلگە'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Identity & Text */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              // سالاھىيەت &amp; ئۇچۇرلار
            </h4>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">ئىسمى (Name)</label>
              <input
                type="text"
                value={config.name}
                onChange={e => onConfigChange({ name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-sky-500 text-white font-sans text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">سالاملىشىش سۆزى (Greeting)</label>
              <input
                type="text"
                value={config.greeting}
                onChange={e => onConfigChange({ greeting: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-sky-500 text-white font-sans text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">رولى / كەسپى (Role)</label>
              <input
                type="text"
                value={config.role}
                onChange={e => onConfigChange({ role: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-sky-500 text-white font-sans text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">چۈشەندۈرۈش (Bio)</label>
              <textarea
                rows={3}
                value={config.bio}
                onChange={e => onConfigChange({ bio: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-sky-500 text-white font-sans text-sm focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">ئاساسىي كۆرۈنۈش تېمىسى (Hero Outline Title)</label>
              <input
                type="text"
                value={config.heroOutline}
                onChange={e => onConfigChange({ heroOutline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-sky-500 text-white font-sans text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-sky-400" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                // ئاساسىي رەڭ تاللاش
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {colorPresets.map(preset => (
                <button
                  key={preset.hex}
                  onClick={() => onConfigChange({ accentColor: preset.hex })}
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
                    config.accentColor.toLowerCase() === preset.hex.toLowerCase()
                      ? 'border-white bg-zinc-800'
                      : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shadow-xs shrink-0"
                    style={{ backgroundColor: preset.hex }}
                  />
                  <span className="text-[11px] font-mono text-zinc-300 truncate">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Agent Swarm Controls */}
          <div className="space-y-3 pt-2 border-t border-zinc-900">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              // سۈنئىي ئەقىل مائۇس قۇرۇلۇش پارامېتىرلىرى
            </h4>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Agent مائۇس سانى ({config.cursorCount})</span>
              <input
                type="range"
                min="4"
                max="10"
                value={config.cursorCount}
                onChange={e => onConfigChange({ cursorCount: parseInt(e.target.value, 10) })}
                className="w-32 accent-sky-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">قۇرۇلۇش تېزلىكى ({config.speedMultiplier}x)</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={config.speedMultiplier}
                onChange={e => onConfigChange({ speedMultiplier: parseFloat(e.target.value) })}
                className="w-32 accent-sky-500 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800/90 bg-zinc-900/60 flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              onReplayAssembly();
            }}
            className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>تەڭشەكنى قوللىنىپ قايتا قۇرۇش</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenCodeModal();
              }}
              className="py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>HTML كودى</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onDownloadHtml();
              }}
              className="py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>چۈشۈرۈش (.html)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
