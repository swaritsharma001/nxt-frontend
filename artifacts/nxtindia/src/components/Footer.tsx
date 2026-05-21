import { Shield, LifeBuoy, Heart, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="dashboard-footer"
      className="border-t border-white/[0.04] bg-slate-950/25 py-6 select-none font-sans mt-auto"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
          <p className="text-slate-400 font-semibold font-mono tracking-wider uppercase text-[10px]">
            NEXBOT INDIA © 2026
          </p>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B9BBBE]">MADE IN INDIA</span>
            <div className="flex gap-0.5 ml-1 select-none">
              <span className="w-2.5 h-1.5 bg-[#FF9933] rounded-sm" />
              <span className="w-2.5 h-1.5 bg-white rounded-sm" />
              <span className="w-2.5 h-1.5 bg-[#128807] rounded-sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </a>
          <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support Helpdesk</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
