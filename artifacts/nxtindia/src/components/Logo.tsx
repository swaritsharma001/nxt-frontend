import { FC } from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
  brandingRemoved?: boolean;
}

export const LogoIcon: FC<LogoIconProps> = ({ size = 36, className = '', brandingRemoved = false }) => {
  if (brandingRemoved) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full overflow-hidden flex-shrink-0 ${className}`}
      >
        <img src="/logo.jpg" alt="Logo" style={{ width: size, height: size }} className="object-cover rounded-full" />
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full overflow-hidden flex-shrink-0 ${className}`}
    >
      <img src="/logo.jpg" alt="NEXBOT India" style={{ width: size, height: size }} className="object-cover rounded-full" />
    </div>
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
