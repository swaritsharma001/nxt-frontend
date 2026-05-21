import { useState } from 'react';
import { Sliders, Shield, Zap, Globe, RefreshCcw, Save, Trash2, Sparkles } from 'lucide-react';

interface SettingsTabProps {
  onSave: (message: string) => void;
  onClearAll: () => void;
  isPremium: boolean;
  brandingRemoved: boolean;
  onToggleBranding: (removed: boolean) => void;
}

export default function SettingsTab({ onSave, onClearAll, isPremium, brandingRemoved, onToggleBranding }: SettingsTabProps) {
  const [region, setRegion] = useState('mumbai');
  const [autoRestart, setAutoRestart] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  const handleSaveSettings = () => {
    const targetRegion = region === 'mumbai' ? 'Mumbai (India)' : 'Tokyo (Japan)';
    onSave(`Settings saved successfully. Target Cluster redirected to ${targetRegion}.`);
  };

  return (
    <div id="settings-tab-view" className="space-y-6 font-sans select-none text-slate-100">
      <div className="bg-slate-950/70 border border-purple-500/15 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <h2 className="text-lg font-black tracking-wide text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-purple-400" />
          <span>CLUSTER CONFIGURATION SETTINGS</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl font-medium">
          Manage your virtual hosting resources, adjust regional cluster pings, and config sandbox isolation profiles for optimal bot responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider pb-2.5 border-b border-white/5">Host Core Properties</h3>

            <div className="space-y-2">
              <label htmlFor="cluster-region-select" className="block text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Regional Ingress Node
              </label>
              <p className="text-[11px] text-slate-500 font-normal leading-normal">Choose the nearest container relay point to establish low-latency Discord gateway connections.</p>
              <select
                id="cluster-region-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-purple-500/60"
              >
                <option value="mumbai">ASIA-SOUTH1 (Mumbai, India) — 24ms (Recommended)</option>
                <option value="tokyo">ASIA-NORTHEAST1 (Tokyo, Japan) — 98ms</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4 p-3 bg-slate-900/35 border border-white/[0.03] rounded-xl">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer" onClick={() => setAutoRestart(!autoRestart)}>
                  <RefreshCcw className="w-3.5 h-3.5 text-purple-400" /> Auto-restart on Failure
                </label>
                <p className="text-[11px] text-slate-500 font-normal leading-snug">Automatically spins up thread containers if discord throws standard rate limit codes.</p>
              </div>
              <button
                type="button"
                onClick={() => setAutoRestart(!autoRestart)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${autoRestart ? 'bg-purple-600' : 'bg-slate-800'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${autoRestart ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-3 bg-slate-900/35 border border-white/[0.03] rounded-xl">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer" onClick={() => setDebugMode(!debugMode)}>
                  <Zap className="w-3.5 h-3.5 text-indigo-400" /> Enable Sandbox Debugging
                </label>
                <p className="text-[11px] text-slate-500 font-normal leading-snug">Inject extra websocket handshake packets directly to local diagnostic feeds.</p>
              </div>
              <button
                type="button"
                onClick={() => setDebugMode(!debugMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${debugMode ? 'bg-indigo-600' : 'bg-slate-800'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${debugMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {isPremium ? (
              <div className="flex items-center justify-between gap-4 p-3 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-purple-500/25 rounded-xl">
                <div className="space-y-0.5">
                  <label className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer" onClick={() => onToggleBranding(!brandingRemoved)}>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hide Nexbot Branding / Logo
                  </label>
                  <p className="text-[11px] text-purple-300 font-normal leading-snug">Completely disables NEXBOT INDIA signatures and emblems from your profile headers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleBranding(!brandingRemoved)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${brandingRemoved ? 'bg-purple-600' : 'bg-slate-800'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${brandingRemoved ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 p-3 bg-slate-900/30 border border-white/[0.02] rounded-xl select-none">
                <div className="space-y-0.5 opacity-40">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-500" /> White-Label Operator Profile [LOCKED]
                  </span>
                  <p className="text-[11px] text-slate-500 font-normal leading-snug">Instantly clear the standard logo designs and signatures from your user interface.</p>
                </div>
                <span className="text-[9px] bg-purple-500/10 border border-purple-500/20 text-purple-400 font-black px-2 py-1 rounded uppercase tracking-wider shrink-0">₹100 UPGRADE</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveSettings}
                id="save-cluster-settings-btn"
                className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] transition hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4" />
                <span>Apply & Reboot Threads</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#8B5CF6] uppercase tracking-wider flex items-center gap-1.5 select-none">
              <Shield className="w-4.5 h-4.5 text-purple-400" /> Cipher Integrity
            </h3>
            <div className="space-y-3.5 text-xs leading-relaxed text-slate-400 font-normal">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Cryptographic Key</span>
                <span className="text-slate-200 font-semibold font-mono text-[10px]">AES-256-GCM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Key Derivation</span>
                <span className="text-slate-200 font-semibold font-mono text-[10px]">PBKDF2 SHA-256</span>
              </div>
              <p>Tokens and active sessions are hashed with unique client salts before being localized in sandboxed memory nodes. They never touch outside services.</p>
            </div>
          </div>

          <div className="bg-rose-950/15 border border-rose-500/20 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider select-none">Destructive Operations</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">Need a clean wipe? Clear the local sandbox, flush all registered bot names, configuration toggles, and authentication cookies entirely from this browser.</p>
            <button
              type="button"
              onClick={onClearAll}
              id="settings-destroy-all-btn"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>Full Ingress Purge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
