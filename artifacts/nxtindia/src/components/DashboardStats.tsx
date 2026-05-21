import { motion } from 'motion/react';
import { Activity, Play, Square, Cpu, Server, MapPin, Globe } from 'lucide-react';
import { Bot } from '../types';

interface DashboardStatsProps {
  bots: Bot[];
}

export default function DashboardStats({ bots }: DashboardStatsProps) {
  const totalCount = bots.length;
  const runningCount = bots.filter((b) => b.status === 'running').length;
  const stoppedCount = totalCount - runningCount;

  const activeMetrics = [
    { label: 'Cluster Ram Stress', value: '42.8 GB / 128 GB', icon: Server, color: 'text-purple-400' },
    { label: 'Network Latency Index', value: '24ms (Excellent)', icon: Activity, color: 'text-blue-400' },
    { label: 'Compute Engine Load', value: '18.4% Average', icon: Cpu, color: 'text-indigo-400' },
  ];

  return (
    <div id="stats-dashboard-grid" className="space-y-6 select-none font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950/70 border border-emerald-500/15 rounded-xl p-4 relative overflow-hidden shadow-[0_4px_24px_rgba(16,185,129,0.02)]">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 tracking-wider">RUNNING BOTS</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Play className="w-4 h-4 fill-emerald-400/20" />
            </div>
          </div>
          <div className="mt-3.5 flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-slate-100 font-mono tracking-tight">{runningCount}</span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-rose-500/15 rounded-xl p-4 relative overflow-hidden shadow-[0_4px_24px_rgba(244,63,94,0.02)]">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 tracking-wider">STOPPED BOTS</span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
              <Square className="w-4 h-4 fill-rose-500/20" />
            </div>
          </div>
          <div className="mt-3.5 flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-slate-100 font-mono tracking-tight">{stoppedCount}</span>
            <span className="text-xs text-slate-500 font-bold bg-slate-900 border border-white/5 px-1.5 py-0.5 rounded uppercase">STANDBY</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-purple-500/15 rounded-xl p-4 relative overflow-hidden shadow-[0_4px_24px_rgba(139,92,246,0.02)]">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 tracking-wider">SERVER CLUSTER</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3.5 flex items-baseline gap-2">
            <span className="text-sm font-black text-slate-200 uppercase tracking-wider">MUMBAI (BOM)</span>
            <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider bg-purple-950/40 border border-purple-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 leading-none ml-auto">
              <Globe className="w-3 h-3 text-purple-400" />
              ASIA-SOUTH1
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeMetrics.map((met, idx) => {
          const Icon = met.icon;
          return (
            <div key={idx} className="bg-slate-950/40 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-purple-500/10 transition duration-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-900/85 border border-white/5 ${met.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{met.label}</p>
                  <p className="text-xs font-semibold text-slate-200 leading-none mt-1">{met.value}</p>
                </div>
              </div>
              <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden relative border border-white/5 shrink-0 hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  style={{ width: idx === 0 ? '34%' : idx === 1 ? '15%' : '22%' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
