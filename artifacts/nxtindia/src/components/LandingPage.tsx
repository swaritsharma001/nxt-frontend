import { motion } from 'motion/react';
import { Bot, Terminal, ShieldAlert, Cpu, Orbit, Sparkles, Heart } from 'lucide-react';
import { LogoIcon, LogoText, FullStackedLogo } from './Logo';
import cookie from "js-cookie";

interface LandingPageProps {
  onLoginClick: () => void;
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div id="landing-page-root" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden text-slate-100 font-sans">
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 z-10">
        <div className="bg-slate-950/40 border border-purple-500/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <LogoIcon size={38} className="filter drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" />
              <LogoText />
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/[0.04]">
              <div className="flex flex-col gap-0.5 shrink-0">
                <div className="w-4 h-1 bg-[#FF9933] rounded-t-sm" />
                <div className="w-4 h-1 bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full border border-[#000080] bg-transparent animate-spin-slow" />
                </div>
                <div className="w-4 h-1 bg-[#128807] rounded-b-sm" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-100">MADE IN INDIA</p>
                <p className="text-[9px] text-slate-500 font-medium">BOM Cloud Cluster Node</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs text-slate-400">
            <div className="flex gap-2 items-start bg-slate-900/20 p-2.5 rounded-lg border border-white/[0.02]">
              <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">We are <span className="text-slate-300 font-semibold">not affiliated with Discord</span> in any way.</p>
            </div>
            <div className="flex gap-2 items-start bg-slate-900/20 p-2.5 rounded-lg border border-white/[0.02]">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">Using automation <span className="text-amber-400 font-semibold">may violate Discord Terms of Service</span>.</p>
            </div>
            <div className="flex gap-2 items-start bg-slate-900/20 p-2.5 rounded-lg border border-white/[0.02]">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">Your <span className="text-rose-400 font-semibold">account or bot may be restricted</span> by Discord.</p>
            </div>
            <div className="flex gap-2 items-start bg-slate-900/20 p-2.5 rounded-lg border border-[#8B5CF6]/15">
              <Terminal className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">We store <span className="text-purple-400 font-bold">your data using encryption</span> locally inside secure browser client sandboxes.</p>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center py-12 sm:py-20 z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-8">
          <FullStackedLogo size={110} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Next-Gen Bot Architecture</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white font-sans">
            Manage Your <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              Bots Easily
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Configure, deploy, and maintain your custom music, safety audits, and artificial intelligence helper agents from one sleek, futuristic cyber terminal.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={onLoginClick}
            type="button"
            id="hero-login-discord-btn"
            className="group relative px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 blur-md opacity-40 group-hover:opacity-75 transition duration-300 -z-10 animate-pulse" />
            <span className="relative z-10 flex items-center gap-3">
              <Bot className="w-5 h-5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
              {cookie.get("token") ? <span>Logout</span> : <span>Login with Discord</span>}
            </span>
          </button>
          <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Secure client authentication • Instant connection</span>
        </motion.div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full">
          {[
            { icon: <Cpu className="w-5 h-5 text-purple-400" />, title: 'Hacker Sandbox Engine', desc: 'High performance sandboxed threads that host your bots with zero delay, optimized memory storage, and automatic recovery protocols.' },
            { icon: <Orbit className="w-5 h-5 text-indigo-400" />, title: 'Global Latency Relays', desc: 'Leverages high frequency networks in Mumbai (India) and Tokyo to ensure your Discord webhook response latency is kept below 25ms.' },
            { icon: <Terminal className="w-5 h-5 text-blue-400" />, title: 'Live Encrypted Logs', desc: 'Simulate, inspect, and analyze incoming events, interactions, command calls, and diagnostic stack paths inside the local browser module.' },
          ].map((feat, idx) => (
            <div key={idx} className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-purple-500/25 transition group text-left relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center mb-4 shadow-inner group-hover:border-purple-500/20 transition-all">
                {feat.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-100 tracking-wide mb-1.5">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full z-10 py-6 border-t border-white/5 bg-slate-950/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>NEXBOT INDIA © 2026 • Host Your Own Bot</div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-white/5">
            <span>MADE IN INDIA WITH</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}
