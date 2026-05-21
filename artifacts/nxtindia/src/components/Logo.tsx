import { FC } from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
  brandingRemoved?: boolean;
}

export const LogoIcon: FC<LogoIconProps> = ({ size = 36, className = '', brandingRemoved = false }) => {
  if (brandingRemoved) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="prem-bg" x1="256" y1="50" x2="256" y2="462" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>
          <radialGradient id="prem-glow" cx="256" cy="256" r="160">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </radialGradient>
        </defs>
        <rect x="32" y="32" width="448" height="448" rx="120" fill="url(#prem-bg)" stroke="#1E1B4B" strokeWidth="12" />
        <rect x="156" y="156" width="200" height="200" rx="40" fill="#0B0F19" stroke="#FFFFFF" strokeWidth="10" />
        <circle cx="256" cy="256" r="60" fill="url(#prem-glow)" className="animate-pulse" />
        <path d="M256 120 L256 156 M256 356 L256 392 M120 256 L156 256 M356 256 L392 256" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-bg-grad" x1="256" y1="50" x2="256" y2="462" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="30%" stopColor="#EC4899" />
          <stop offset="65%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
        <linearGradient id="logo-head-grad" x1="256" y1="180" x2="256" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="logo-visor-grad" x1="256" y1="185" x2="256" y2="285" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B0F19" />
        </linearGradient>
        <radialGradient id="logo-antenna-grad" cx="256" cy="115" r="16">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </radialGradient>
        <filter id="logo-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="logo-btn-grad" x1="256" y1="410" x2="256" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="236" fill="#0B1329" stroke="#1E1B4B" strokeWidth="8" />
      <circle cx="256" cy="256" r="222" fill="url(#logo-bg-grad)" />
      <g opacity="0.9">
        <path d="M370 155 L372 163 L380 165 L372 167 L370 175 L368 167 L360 165 L368 163 Z" fill="#FFFFFF" />
        <path d="M142 220 L143.5 226 L149.5 227.5 L143.5 229 L142 235 L140.5 229 L134.5 227.5 L140.5 226 Z" fill="#FFFFFF" />
        <circle cx="365" cy="290" r="3" fill="#FFFFFF" />
        <circle cx="145" cy="330" r="3" fill="#FFFFFF" opacity="0.75" />
        <circle cx="210" cy="135" r="2" fill="#FFFFFF" />
        <circle cx="305" cy="130" r="2" fill="#FFFFFF" />
      </g>
      <g>
        <path
          d="M190 355 L322 355 C350 355, 360 380, 360 410 L360 430 C360 450, 335 465, 300 465 L212 465 C177 465, 152 450, 152 430 L152 410 C152 380, 162 355, 190 355 Z"
          fill="url(#logo-head-grad)"
          stroke="#090D16"
          strokeWidth="12"
          strokeLinejoin="round"
        />
        <rect x="230" y="385" width="52" height="60" rx="26" fill="#0F172A" stroke="#090D16" strokeWidth="6" />
        <circle cx="256" cy="415" r="14" fill="url(#logo-btn-grad)" />
        <path d="M136 390 L120 410 C110 422, 110 440, 122 452 L128 458 C140 470, 158 470, 170 458 L180 448" fill="none" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
        <path d="M136 390 L120 410 C110 422, 110 440, 122 452 L128 458 C140 470, 158 470, 170 458 L180 448" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
        <path d="M376 390 L392 410 C402 422, 402 440, 390 452 L384 458 C372 470, 354 470, 342 458 L332 448" fill="none" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
        <path d="M376 390 L392 410 C402 422, 402 440, 390 452 L384 458 C372 470, 354 470, 332 448" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
        <path d="M244 142 L268 142 L260 120 L252 120 Z" fill="#64748B" stroke="#090D16" strokeWidth="8" strokeLinejoin="round" />
        <line x1="256" y1="120" x2="256" y2="105" stroke="#090D16" strokeWidth="8" strokeLinecap="round" />
        <circle cx="256" cy="95" r="14" fill="url(#logo-antenna-grad)" stroke="#090D16" strokeWidth="8" />
        <rect x="156" y="140" width="200" height="175" rx="88" fill="url(#logo-head-grad)" stroke="#090D16" strokeWidth="16" strokeLinejoin="round" />
        <rect x="136" y="200" width="24" height="60" rx="12" fill="#024D94" stroke="#090D16" strokeWidth="8" />
        <rect x="142" y="210" width="10" height="40" rx="5" fill="#38BDF8" />
        <rect x="352" y="200" width="24" height="60" rx="12" fill="#024D94" stroke="#090D16" strokeWidth="8" />
        <rect x="360" y="210" width="10" height="40" rx="5" fill="#38BDF8" />
        <rect x="180" y="185" width="152" height="100" rx="46" fill="url(#logo-visor-grad)" stroke="#090D16" strokeWidth="10" />
        <g filter="url(#logo-cyan-glow)">
          <path d="M208 244 Q223 222 238 244" fill="none" stroke="#22D3EE" strokeWidth="11" strokeLinecap="round" />
          <path d="M274 244 Q289 222 304 244" fill="none" stroke="#22D3EE" strokeWidth="11" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

interface LogoTextProps {
  className?: string;
  subtitleClassName?: string;
  brandingRemoved?: boolean;
}

export const LogoText: FC<LogoTextProps> = ({ className = '', subtitleClassName = '', brandingRemoved = false }) => (
  <div className="flex flex-col select-none font-sans">
    <div className={`text-sm sm:text-base font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 uppercase ${className}`}>
      {brandingRemoved ? 'OPERATOR PROFILE' : 'NEXBOT INDIA'}
    </div>
    <div className={`text-[9px] text-purple-400 font-extrabold uppercase tracking-widest -mt-1 flex items-center gap-1.5 ${subtitleClassName}`}>
      <span>{brandingRemoved ? 'PRIVATE CLUSTER' : 'NOVA LABS'}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    </div>
  </div>
);

export const FullStackedLogo: FC<{ size?: number; className?: string; brandingRemoved?: boolean }> = ({ size = 120, className = '', brandingRemoved = false }) => (
  <div className={`flex flex-col items-center text-center select-none font-sans ${className}`}>
    <LogoIcon size={size} brandingRemoved={brandingRemoved} className="filter drop-shadow-[0_0_20px_rgba(139,92,246,0.25)] mb-3 transition duration-300 transform hover:scale-105" />
    <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white font-mono">
      {brandingRemoved ? 'OPERATOR CONSOLE' : 'NEXBOT INDIA'}
    </h1>
    <div className="flex items-center gap-2 mt-0.5 justify-center">
      <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-500/50" />
      <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest">
        {brandingRemoved ? 'PRIVATE CLUSTER' : 'NOVA LABS'}
      </span>
      <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-500/50" />
    </div>
  </div>
);
