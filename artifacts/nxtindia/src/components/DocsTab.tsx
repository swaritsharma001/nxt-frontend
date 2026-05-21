import { useState } from 'react';
import { BookOpen, ChevronRight, Copy, Check } from 'lucide-react';

export default function DocsTab() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(code);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const codeBlocks = {
    command: 'npx nexbot-cli init --cluster=bom-india',
    env: `NEXBOT_TOKEN="MTMyNDU2Mzc4O..."\nNEXBOT_CLUSTER="bom-mumbai"\nNEXBOT_MAX_THREADS=3`
  };

  return (
    <div id="docs-tab-view" className="space-y-6 font-sans select-text">
      <div className="bg-slate-950/70 border border-purple-500/15 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <h2 className="text-lg font-black tracking-wide text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span>DEVELOPER PROTOCOL DOCUMENTATION</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl font-medium">
          Welcome to the official offline SDK reference guide. Easily configure, manage callbacks, listen to Discord gateways, and deploy container threads on the Indian Node Cluster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wide">
              <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
              Quickstart Deployment (CLI Tooling)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              You can deploy and command active instances directly from your local system terminal using our official verified Indian Cloud CLI module.
            </p>
            <div className="relative rounded-xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold tracking-widest pb-2 mb-2 border-b border-white/5 select-none">
                <span>Local Terminal Code</span>
                <button
                  type="button"
                  onClick={() => handleCopy(codeBlocks.command)}
                  className="flex items-center gap-1 hover:text-slate-200 transition"
                >
                  {copiedText === codeBlocks.command ? (
                    <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">COPIED</span></>
                  ) : (
                    <><Copy className="w-3 h-3" /><span>COPY</span></>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-purple-400 select-none">$</span>
                <code className="text-slate-100 break-all">{codeBlocks.command}</code>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wide">
              <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
              Environment Variables Matrix
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Below are the configuration properties our Mumbai cluster handles during hot-swap container cycles:
            </p>
            <div className="space-y-3 font-sans">
              {[
                { name: 'NEXBOT_TOKEN', type: 'String (Secret)', desc: 'The verified Discord application secret generated in the Developer Portal panel.' },
                { name: 'NEXBOT_CLUSTER', type: 'Enum ("bom-mumbai" | "nrt-tokyo")', desc: 'The targeted container hosting region for server relay speeds.' },
                { name: 'NEXBOT_MAX_THREADS', type: 'Int (Default 3)', desc: 'The concurrent process load constraints assigned to your active sandboxes.' }
              ].map((val, idx) => (
                <div key={idx} className="p-3 bg-slate-900/30 rounded-lg border border-white/[0.02]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                    <span className="text-xs font-bold text-purple-400 font-mono">{val.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5">{val.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wide select-none">
              <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
              Gateway Status Indicators
            </h3>
            <div className="space-y-3.5 text-xs">
              {[
                { code: 'Code 1000', label: 'NORMAL_CLOSE', status: 'Inactive status cleanly terminated.', color: 'text-slate-400' },
                { code: 'Code 4004', label: 'AUTHENTICATION_FAILED', status: 'Invalid token declared. Check dev console.', color: 'text-rose-400' },
                { code: 'Code 4014', label: 'DISALLOWED_INTENTS', status: 'Enable privileged intents inside bot settings.', color: 'text-amber-400' }
              ].map((st, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-0.5 text-slate-600 font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-white/5 shrink-0 self-start">{st.code}</div>
                  <div>
                    <p className={`font-bold font-mono tracking-wide ${st.color} uppercase`}>{st.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-normal leading-normal">{st.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-950/20 to-blue-950/20 border border-purple-500/20 rounded-xl p-4 text-xs space-y-2 select-none">
            <h4 className="font-bold text-slate-200">LOCAL CRYPTO SECURITY NOTE:</h4>
            <p className="text-slate-400 leading-relaxed font-normal">
              All tokens registered via the client are stored using AES-256 standard encryption inside your local sandbox. No codes or credentials are sent to external databases. Build safe, host safe!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
