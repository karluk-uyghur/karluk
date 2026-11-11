import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, X, Code2, Flag, FileCode } from 'lucide-react';
import { TurkistanFlag } from './TurkistanFlag';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, htmlCode }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'flag' | 'info'>('html');

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = htmlCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qarluq-uyghur-portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/90 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  HTML كودى &amp; تۈركىستان بايرىقى
                </h3>
                <TurkistanFlag size="xs" styleMode="flat" />
              </div>
              <p className="font-mono text-xs text-zinc-400">
                qarluq-uyghur-portfolio.html • قارلۇق ئۇيغۇر ئۈچۈن تولۇق كود
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-900/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>چۈشۈرۈش (.html)</span>
            </button>
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'كۆچۈرۈلدى ✓' : 'كودنى كۆچۈرۈش'}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="تاقاش"
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-zinc-900/40 border-b border-zinc-800/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'html'
                  ? 'bg-zinc-800 text-sky-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>تولۇق HTML كودى</span>
            </button>
            <button
              onClick={() => setActiveTab('flag')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'flag'
                  ? 'bg-zinc-800 text-sky-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>تۈركىستان بايرىقى تەپسىلاتى</span>
            </button>
          </div>

          <a
            href="/qarluq-uyghur-portfolio.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>يېڭى بەتتە ئېچىش</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 font-mono text-xs">
          {activeTab === 'html' && (
            <div className="relative">
              <pre className="p-4 rounded-xl bg-black/80 border border-zinc-900 text-zinc-300 overflow-x-auto leading-relaxed select-all whitespace-pre-wrap max-h-[62vh]">
                <code>{htmlCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'flag' && (
            <div className="space-y-6 text-zinc-300 font-sans p-2">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 sm:w-60 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20">
                  <TurkistanFlag size="xl" styleMode="waving" className="w-full h-auto" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-xs">
                    شەرقىي تۈركىستان دۆلەت بايرىقى (كۆك بايراق)
                  </div>
                  <h4 className="font-display font-bold text-xl text-white">
                    East Turkistan Kökbayraq (كۆك بايراق)
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    بۇ بايراق ئاسمان كۆكى (#0099ff) رەڭ تەگلىك ئۈستىگە ئاق رەڭلىك يېرىم ئاي ۋە بەش بۈرجەكلىك يۇلتۇز بىلەن ياسالغان.
                    بۇ بەتتە ئارخىتېكتۇرا، نام كارتىسى ۋە ئۈستۈنكى بۆلەكلەردە مۇكەممەل SVG كودى بىلەن بىر گەۋدىلەشتۈرۈلدى.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">رەڭ: #0099ff (Azure Sky)</span>
                    <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">نىسبىتى: 2:3 (900×600)</span>
                    <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">SVG: 100% ساپ ۋېكتور</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>SVG كودىنى ئايرىم ئېلىش:</span>
                  <button
                    onClick={() => {
                      const svg = `<svg viewBox="0 0 900 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" rx="12" fill="#0099ff"/><defs><mask id="turkistan-crescent-mask"><rect width="900" height="600" fill="#ffffff"/><circle cx="342" cy="300" r="120" fill="#000000"/></mask></defs><circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#turkistan-crescent-mask)"/><polygon points="505,242 522,282 565,274 535,305 558,342 516,324 485,355 491,311 454,286 497,280" fill="#ffffff"/></svg>`;
                      navigator.clipboard.writeText(svg);
                      alert('تۈركىستان بايرىقى SVG كودى كۆچۈرۈلدى!');
                    }}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>SVG نى كۆچۈرۈش</span>
                  </button>
                </div>
                <pre className="p-3 rounded bg-black/60 text-zinc-400 overflow-x-auto text-[11px]">
                  {`<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="900" height="600" fill="#0099ff"/>
  <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#crescent)"/>
  <polygon points="..." fill="#ffffff"/>
</svg>`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800/90 bg-zinc-900/60 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>قارلۇق ئۇيغۇر • تەييار قىلىندى (Ready for Production)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            تاقاش
          </button>
        </div>

      </div>
    </div>
  );
};
