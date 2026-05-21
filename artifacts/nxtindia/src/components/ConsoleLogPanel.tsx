import { useState, useRef, useEffect } from 'react';
import { Terminal, Database, Eye, Trash2, ArrowDown } from 'lucide-react';
import { ConsoleLog, LogLevel } from '../types';

interface ConsoleLogPanelProps {
  logs: ConsoleLog[];
  onClearLogs: () => void;
}

export default function ConsoleLogPanel({ logs, onClearLogs }: ConsoleLogPanelProps) {
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [isLive, setIsLive] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLive && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isLive]);

  const filteredLogs = logs.filter((log) => filter === 'all' || log.level === filter);

  return (
    <div id="logs-panel-card" className="relative flex flex-col bg-slate-950/80 border border-purple-500/15 rounded-xl overflow-hidden font-mono h-96 shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 bg-slate-900/65 border-b border-white/5 text-xs select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="font-bold text-slate-200 tracking-wider">DIAGNOSTIC TELEMETRY LOGS</span>
          <span className="bg-purple-950 text-purple-400 border border-purple-500/20 rounded px-1.5 py-0.5 text-[9px] font-extrabold animate-pulse">
            LIVE FEED
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-slate-950 font-sans text-[11px]">
            {(['all', 'success', 'info', 'warning', 'error'] as const).map((lvl, i) => {
              const labels: Record<string, string> = { all: 'ALL', success: 'OK', info: 'SYS', warning: 'WARN', error: 'ERR' };
              const activeColors: Record<string, string> = {
                all: 'bg-[#8B5CF6]/20 text-purple-400 font-bold',
                success: 'bg-[#10B981]/25 text-emerald-400 font-bold',
                info: 'bg-[#3B82F6]/25 text-blue-400 font-bold',
                warning: 'bg-[#F59E0B]/25 text-amber-500 font-bold',
                error: 'bg-rose-900/30 text-rose-400 font-bold',
              };
              return (
                <button
                  key={lvl}
                  type="button"
                  className={`px-2 py-1 ${i > 0 ? 'border-l border-white/5' : ''} transition-colors ${filter === lvl ? activeColors[lvl] : 'text-slate-400 hover:text-slate-200'}`}
                  onClick={() => setFilter(lvl)}
                >
                  {labels[lvl]}
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-1.5 font-sans">
            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                isLive
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                  : 'bg-slate-900 border-white/5 text-slate-500'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px]">{isLive ? 'Scroll Lock' : 'Frozen'}</span>
            </button>
            <button
              type="button"
              onClick={onClearLogs}
              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        id="terminal-stream-scroller"
        className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs select-text scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 font-sans select-none">
            <Database className="w-8 h-8 text-slate-700 animate-pulse" />
            <p className="text-xs">No matching transaction frames found.</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            let badgeColor = 'text-blue-400 bg-blue-500/10';
            if (log.level === 'success') badgeColor = 'text-emerald-400 bg-emerald-500/10';
            if (log.level === 'warning') badgeColor = 'text-amber-500 bg-amber-500/10';
            if (log.level === 'error') badgeColor = 'text-rose-400 bg-rose-500/10';
            return (
              <div key={log.id} className="flex items-start gap-2 text-slate-300 animate-fade-in font-mono leading-relaxed group">
                <span className="text-slate-600 shrink-0 select-none text-[10px] mt-0.5 font-mono">[{log.timestamp}]</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold shrink-0 font-sans tracking-wide ${badgeColor} select-none`}>
                  {log.level}
                </span>
                <span className="text-purple-400/90 font-semibold shrink-0 select-none">[{log.botName}]</span>
                <span className="flex-1 text-slate-300 font-mono break-all leading-normal">{log.message}</span>
              </div>
            );
          })
        )}
      </div>

      {!isLive && filteredLogs.length > 0 && (
        <button
          onClick={() => setIsLive(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full text-[10px] font-black uppercase tracking-widest font-sans shadow-lg shadow-purple-500/25 animate-bounce"
        >
          <ArrowDown className="w-3.5 h-3.5" /> Resume Auto-scroll
        </button>
      )}
    </div>
  );
}
