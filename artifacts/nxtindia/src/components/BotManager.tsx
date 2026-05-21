import { motion } from 'motion/react';
import { Play, Square, RotateCw, Terminal, Music, ShieldCheck, MessageSquareCode, Activity, Cpu, Server } from 'lucide-react';
import { Bot } from '../types';

interface BotManagerProps {
  bots: Bot[];
  onStartBot: (id: string) => void;
  onStopBot: (id: string) => void;
  onRestartBot: (id: string) => void;
  onSelectBotForLogs: (botName: string) => void;
}

export default function BotManager({ bots, onStartBot, onStopBot, onRestartBot, onSelectBotForLogs }: BotManagerProps) {
  const getBotIcon = (type: Bot['type']) => {
    switch (type) {
      case 'music': return <Music className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />;
      case 'moderation': return <ShieldCheck className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />;
      case 'ai': return <MessageSquareCode className="w-5 h-5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />;
    }
  };

  return (
    <div id="bot-manager-layout" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => {
          const isRunning = bot.status === 'running';
          return (
            <div
              key={bot.id}
              id={`bot-card-${bot.id}`}
              className={`relative bg-slate-950/70 border rounded-2xl p-5 overflow-hidden transition-all duration-300 group flex flex-col justify-between ${
                isRunning ? 'border-purple-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.12)]' : 'border-slate-800/80 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300 ${isRunning ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-slate-800'}`} />

              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${bot.avatarColor}`}>
                    {isRunning && <div className="absolute inset-0 rounded-xl bg-purple-500/20 animate-ping opacity-60 scale-105 pointer-events-none" />}
                    {getBotIcon(bot.type)}
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 flex items-center justify-center ${isRunning ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-white ${isRunning ? 'animate-pulse' : ''}`} />
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border flex items-center gap-1 leading-none transition-colors ${
                    isRunning ? 'bg-emerald-950/40 border-emerald-500/25 text-emerald-400' : 'bg-rose-950/40 border-rose-500/25 text-rose-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                    {isRunning ? 'RUNNING' : 'STOPPED'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black tracking-wide text-white group-hover:text-purple-300 transition-colors">{bot.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans font-medium">{bot.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 my-4 bg-slate-900/35 border border-white/[0.03] rounded-xl p-3 text-[11px] font-mono select-none">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-sans font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-purple-400" /> CPU Usage
                    </span>
                    <span className={isRunning ? 'text-slate-200' : 'text-slate-500'}>{isRunning ? bot.cpuUsage : '0.00%'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-l border-white/[0.04] pl-2.5">
                    <span className="text-slate-500 font-sans font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                      <Server className="w-3 h-3 text-indigo-400" /> RAM Alloc
                    </span>
                    <span className={isRunning ? 'text-slate-200' : 'text-slate-500'}>{isRunning ? bot.ramUsage : '0.0MB'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-l border-white/[0.04] pl-2.5">
                    <span className="text-slate-500 font-sans font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                      <Activity className="w-3 h-3 text-blue-400" /> Ping Delay
                    </span>
                    <span className={isRunning ? 'text-slate-200' : 'text-slate-500'}>{isRunning ? `${bot.latency}ms` : 'Offline'}</span>
                  </div>
                </div>

                {isRunning && (
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-900/80 pt-2.5 mb-2">
                    <span className="uppercase">Uptime Record</span>
                    <span className="text-slate-300 font-semibold">{bot.uptime}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-1 select-none font-sans">
                {isRunning ? (
                  <button
                    type="button"
                    onClick={() => onStopBot(bot.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-rose-500/10 hover:border-rose-500/35 bg-rose-950/20 hover:bg-rose-950/45 text-rose-400 transition duration-200 cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-rose-400/15" />
                    <span>Stop Bot</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onStartBot(bot.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-extrabold uppercase tracking-wide rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition duration-200 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white/10" />
                    <span>Launch</span>
                  </button>
                )}
                <button
                  type="button"
                  disabled={!isRunning}
                  onClick={() => onRestartBot(bot.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition duration-200 cursor-pointer ${
                    isRunning
                      ? 'border-[#8B5CF6]/15 hover:border-[#8B5CF6]/35 hover:bg-[#8B5CF6]/10 text-purple-300'
                      : 'border-slate-900/60 text-slate-600 bg-slate-950 cursor-not-allowed'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRunning ? 'text-purple-400' : ''}`} />
                  <span>Reboot</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectBotForLogs(bot.name)}
                  className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-300 transition-all hover:text-slate-100"
                >
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Inspect Console Logs</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
