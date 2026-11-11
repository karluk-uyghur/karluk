import React from 'react';
import { getTurkistanStarPoints } from '../utils/flag';

interface TurkistanFlagProps {
  className?: string;
  styleMode?: 'waving' | 'flat' | 'badge' | 'emblem';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  glow?: boolean;
  onClick?: () => void;
}

export const TurkistanFlag: React.FC<TurkistanFlagProps> = ({
  className = '',
  styleMode = 'flat',
  size = 'md',
  title = 'شەرقىي تۈركىستان كۆك بايرىقى | East Turkistan Flag',
  glow = false,
  onClick
}) => {
  const starPoints = getTurkistanStarPoints(515, 300, 62, 24);

  const sizeClasses = {
    xs: 'w-4 h-2.5',
    sm: 'w-6 h-4',
    md: 'w-8 h-5.5',
    lg: 'w-14 h-9.5',
    xl: 'w-24 h-16'
  }[size];

  if (styleMode === 'badge') {
    return (
      <div
        onClick={onClick}
        title={title}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-950/60 border border-sky-400/40 text-sky-200 text-xs font-mono shadow-md backdrop-blur-sm cursor-pointer hover:border-sky-300 transition-all ${className}`}
      >
        <span className="w-4 h-2.5 rounded-xs overflow-hidden inline-block shadow-xs">
          <svg viewBox="0 0 900 600" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="600" fill="#0099ff" />
            <defs>
              <mask id="badge-flag-mask">
                <rect width="900" height="600" fill="#ffffff" />
                <circle cx="342" cy="300" r="120" fill="#000000" />
              </mask>
            </defs>
            <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#badge-flag-mask)" />
            <polygon points={starPoints} fill="#ffffff" />
          </svg>
        </span>
        <span className="font-sans font-medium text-[11px]">تۈركىستان بايرىقى</span>
      </div>
    );
  }

  if (styleMode === 'emblem') {
    return (
      <div
        onClick={onClick}
        title={title}
        className={`w-9 h-9 rounded-full overflow-hidden border-2 border-sky-300 shadow-lg relative flex items-center justify-center bg-[#0099ff] cursor-pointer hover:scale-105 transition-transform ${className}`}
      >
        <svg viewBox="0 0 900 600" className="w-[140%] h-[140%] -ml-1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="emblem-flag-mask">
              <rect width="900" height="600" fill="#ffffff" />
              <circle cx="342" cy="300" r="120" fill="#000000" />
            </mask>
          </defs>
          <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#emblem-flag-mask)" />
          <polygon points={starPoints} fill="#ffffff" />
        </svg>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      title={title}
      className={`rounded overflow-hidden shadow-md border border-white/20 select-none ${
        styleMode === 'waving' ? 'turkistan-flag-wave' : ''
      } ${glow ? 'flag-cyber-aura' : ''} ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 900 600"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Authentic Sky Blue Background (#0099ff / Pantone 300C) */}
        <rect width="900" height="600" fill="#0099ff" />
        <defs>
          <mask id="flag-main-mask">
            <rect width="900" height="600" fill="#ffffff" />
            <circle cx="342" cy="300" r="120" fill="#000000" />
          </mask>
        </defs>
        {/* Crescent Moon */}
        <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#flag-main-mask)" />
        {/* 5-Pointed Star */}
        <polygon points={starPoints} fill="#ffffff" />
      </svg>
    </div>
  );
};
