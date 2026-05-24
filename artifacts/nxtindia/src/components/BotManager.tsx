import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Square, RotateCw, Terminal, Music, ShieldCheck, MessageSquareCode, Activity, Cpu, Server, Trash2, Sparkles, ChevronDown, ChevronUp, CheckCircle, XCircle, Hash } from 'lucide-react';
import { Bot } from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../config';

interface BotManagerProps {
  bots: Bot[];
  isPremium: boolean;
  onStartBot: (id: string) => void;
  onStopBot: (id: string) => void;
  onRestartBot: (id: string) => void;
  onSelectBotForLogs: (botName: string) => void;
  onDeleteBot: (id: string) => void;
}

type PresenceStatus = 'idle' | 'loading' | 'success' | 'error';
type PrefixStatus  = 'idle' | 'loading' | 'success' | 'error';

export default function BotManager({ bots, isPremium, onStartBot, onStopBot, onRestartBot, onSelectBotForLogs, onDeleteBot }: BotManagerProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Presence state per bot id
  const [presenceOpen, setPresenceOpen] = useState<Record<string, boolean>>({});
  const [presenceMsg, setPresenceMsg]   = useState<Record<string, string>>({});
  const [presenceSt,  setPresenceSt]    = useState<Record<string, PresenceStatus>>({});
  const [presenceErr, setPresenceErr]   = useState<Record<string, string>>({});

  // Prefix state per bot id
  const [prefixOpen, setPrefixOpen] = useState<Record<string, boolean>>({});
  const [prefixVal,  setPrefixVal]  = useState<Record<string, string>>({});
  const [prefixSt,   setPrefixSt]   = useState<Record<string, PrefixStatus>>({});
  const [prefixErr,  setPrefixErr]  = useState<Record<string, string>>({});

  const togglePresence = (id: string) =>
    setPresenceOpen((p) => ({ ...p, [id]: !p[id] }));

  const togglePrefix = (id: string) =>
    setPrefixOpen((p) => ({ ...p, [id]: !p[id] }));

  const handlePresenceSubmit = async (id: string) => {
    const msg = presenceMsg[id]?.trim();
    if (!msg) return;
    const authToken = Cookies.get('token');
    setPresenceSt((s) => ({ ...s, [id]: 'loading' }));
    setPresenceErr((e) => ({ ...e, [id]: '' }));
    try {
      await axios.post(
        `${BACKEND_URL}/core/presence`,
        { id, presence: msg },
        { headers: { Authorization: authToken } }
      );
      setPresenceSt((s) => ({ ...s, [id]: 'success' }));
      setTimeout(() => setPresenceSt((s) => ({ ...s, [id]: 'idle' })), 4000);
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Failed to update presence.';
      setPresenceErr((e) => ({ ...e, [id]: errMsg }));
      setPresenceSt((s) => ({ ...s, [id]: 'error' }));
      setTimeout(() => setPresenceSt((s) => ({ ...s, [id]: 'idle' })), 5000);
    }
  };

  const handlePrefixSubmit = async (id: string) => {
    const prefix = prefixVal[id]?.trim();
    if (!prefix) return;
    const authToken = Cookies.get('token');
    setPrefixSt((s) => ({ ...s, [id]: 'loading' }));
    setPrefixErr((e) => ({ ...e, [id]: '' }));
    try {
      await axios.post(
        `${BACKEND_URL}/core/prefix`,
        { id, prefix },
        { headers: { Authorization: authToken } }
      );
      setPrefixSt((s) => ({ ...s, [id]: 'success' }));
      setTimeout(() => setPrefixSt((s) => ({ ...s, [id]: 'idle' })), 4000);
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Failed to update prefix.';
      setPrefixErr((e) => ({ ...e, [id]: errMsg }));
      setPrefixSt((s) => ({ ...s, [id]: 'error' }));
      setTimeout(() => setPrefixSt((s) => ({ ...s, [id]: 'idle' })), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    const authToken = Cookies.get('token');
    setDeletingId(id);
    try {
      await axios.post(
        `${BACKEND_URL}/core/delete`,
        { id },
        { headers: { Authorization: authToken } }
      );
      onDeleteBot(id);
    } catch {
      // silently keep the bot in the list if the request fails
    } finally {
      setDeletingId(null);
    }
  };

  const getBotIcon = (type: Bot['type']) => {
    switch (type) {
      case 'music':      return <Music className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />;
      case 'moderation': return <ShieldCheck className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />;
      case 'ai':         return <MessageSquareCode className="w-5 h-5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />;
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

                {/* Prefix — available to all users */}
                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={() => togglePrefix(bot.id)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-sky-500/15 hover:border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/10 text-sky-400 hover:text-sky-300 transition duration-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5" />
                      Change Command Prefix
                    </span>
                    {prefixOpen[bot.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <AnimatePresence>
                    {prefixOpen[bot.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 bg-slate-900/60 border border-sky-500/10 rounded-xl p-3 space-y-2">
                          {prefixSt[bot.id] === 'success' ? (
                            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold py-1">
                              <CheckCircle className="w-4 h-4 shrink-0" />
                              <span>Prefix updated! Restart bot to apply.</span>
                            </div>
                          ) : (
                            <>
                              <div className="relative flex items-center">
                                <Hash className="absolute left-3 w-3 h-3 text-sky-500/60 pointer-events-none" />
                                <input
                                  type="text"
                                  value={prefixVal[bot.id] || ''}
                                  onChange={(e) => setPrefixVal((p) => ({ ...p, [bot.id]: e.target.value }))}
                                  placeholder="e.g. ! or ? or >>"
                                  maxLength={5}
                                  className="w-full bg-slate-950 border border-white/10 focus:border-sky-500/40 rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none transition"
                                  onKeyDown={(e) => e.key === 'Enter' && handlePrefixSubmit(bot.id)}
                                />
                                {prefixVal[bot.id] && (
                                  <span className="absolute right-3 text-[9px] font-mono text-slate-500">
                                    {prefixVal[bot.id].length}/5
                                  </span>
                                )}
                              </div>
                              {prefixSt[bot.id] === 'error' && (
                                <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-semibold">
                                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{prefixErr[bot.id]}</span>
                                </div>
                              )}
                              <button
                                type="button"
                                disabled={prefixSt[bot.id] === 'loading' || !prefixVal[bot.id]?.trim()}
                                onClick={() => handlePrefixSubmit(bot.id)}
                                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-black uppercase tracking-wider text-white rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 shadow-[0_0_12px_rgba(14,165,233,0.2)] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                {prefixSt[bot.id] === 'loading' ? (
                                  <>
                                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    <span>Updating...</span>
                                  </>
                                ) : (
                                  <>
                                    <Hash className="w-3.5 h-3.5" />
                                    <span>Set Prefix</span>
                                  </>
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Presence — premium only */}
                {isPremium && (
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={() => togglePresence(bot.id)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-yellow-500/15 hover:border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 transition duration-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Update Bot Presence
                      </span>
                      {presenceOpen[bot.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <AnimatePresence>
                      {presenceOpen[bot.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 bg-slate-900/60 border border-yellow-500/10 rounded-xl p-3 space-y-2">
                            {presenceSt[bot.id] === 'success' ? (
                              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold py-1">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>Presence updated! Restart bot to apply.</span>
                              </div>
                            ) : (
                              <>
                                <input
                                  type="text"
                                  value={presenceMsg[bot.id] || ''}
                                  onChange={(e) => setPresenceMsg((m) => ({ ...m, [bot.id]: e.target.value }))}
                                  placeholder="e.g. Listening to lo-fi beats..."
                                  className="w-full bg-slate-950 border border-white/10 focus:border-yellow-500/40 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none transition"
                                  onKeyDown={(e) => e.key === 'Enter' && handlePresenceSubmit(bot.id)}
                                />
                                {presenceSt[bot.id] === 'error' && (
                                  <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-semibold">
                                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{presenceErr[bot.id]}</span>
                                  </div>
                                )}
                                <button
                                  type="button"
                                  disabled={presenceSt[bot.id] === 'loading' || !presenceMsg[bot.id]?.trim()}
                                  onClick={() => handlePresenceSubmit(bot.id)}
                                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-black uppercase tracking-wider text-white rounded-lg bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.2)] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  {presenceSt[bot.id] === 'loading' ? (
                                    <>
                                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                      </svg>
                                      <span>Updating...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-3.5 h-3.5" />
                                      <span>Set Presence</span>
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <button
                  type="button"
                  disabled={deletingId === bot.id}
                  onClick={() => handleDelete(bot.id)}
                  className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-red-500/10 hover:border-red-500/30 bg-red-950/10 hover:bg-red-950/30 text-red-500 hover:text-red-400 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === bot.id ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Bot</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}