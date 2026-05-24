import { useState, FormEvent } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, BookOpen, ExternalLink, HelpCircle, Download, Youtube, CheckCircle, XCircle } from 'lucide-react';
import TokenGuideModal from './TokenGuideModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../config';

interface TokenSectionProps {
  onSubmitToken: (token: string) => void;
}

export default function TokenSection({ onSubmitToken }: TokenSectionProps) {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token.trim() || loading) return;

    const authToken = Cookies.get('token');
    setLoading(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      await axios.post(
        `${BACKEND_URL}/core/token`,
        { token: token.trim() },
        { headers: { Authorization: `${authToken}` } }
      );
      onSubmitToken(token.trim());
      setStatus('success');
      setToken('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Failed to connect bot. Please check the token and try again.';
      setErrorMsg(msg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const tutorials = [
    {
      step: '01',
      title: 'Download verified App',
      desc: 'Download the official NEXBOT APK from Mintgram server or search on Playstore for verification.',
      icon: <Download className="w-4 h-4 text-purple-400" />,
      linkText: 'Download APK',
      url: process.env.VITE_APK
    },
    {
      step: '02',
      title: 'Watch walk-through',
      desc: 'Complete the flow and extract token by following the quick setup video carefully.',
      icon: <Youtube className="w-4 h-4 text-rose-400" />,
      linkText: 'Watch Video Tutorial',
      url: process.env.VITE_YT
    },
    
  ];

  return (
    <div id="token-input-module-holder" className="space-y-6">
      <div className="bg-slate-950/70 border border-purple-500/15 rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mb-6">
          <h2 className="text-lg font-black tracking-wide text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>AUTHORIZE BOT PIPELINE</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans font-medium">
            Deploy a new bot thread on the Indian cluster node. Enter your Discord bot token directly below securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative rounded-xl border border-white/10 focus-within:border-purple-500/60 bg-slate-950 flex items-center transition duration-200 shadow-inner">
            <div className="pl-4 text-slate-500 shrink-0 select-none">
              <Lock className="w-4 h-4 text-purple-500/75 animate-pulse" />
            </div>
            <input
              type={showToken ? 'text' : 'password'}
              id="discord-bot-token-input"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ENTER BOT TOKEN (e.g. MTMyNDU2Nzg5MDEyMzQ1Njc4...)"
              className="w-full bg-transparent px-3 py-4 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none tracking-widest break-all"
              required
            />
            {token && (
              <button type="button" onClick={() => setShowToken(!showToken)} className="pr-2 text-slate-400 hover:text-slate-200 transition p-1">
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            <div className="pr-3 font-sans select-none shrink-0">
              <button
                type="submit"
                id="bot-token-submit-btn"
                className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition duration-200 cursor-pointer disabled:opacity-60 flex items-center gap-1.5 whitespace-nowrap"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>CONNECTING...</span>
                  </>
                ) : 'CONNECT BOT'}
              </button>
            </div>
          </div>

          {/* Status feedback */}
          {status === 'success' && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Bot token submitted successfully. Pipeline is now authorised.</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex justify-between items-center px-1">
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="text-xs text-purple-400 hover:text-purple-300 font-bold transition flex items-center gap-1.5 hover:underline focus:outline-none cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Don't know how to get token?</span>
            </button>
            <span className="text-[10px] text-slate-500 font-mono">TLS 1.3 encrypted</span>
          </div>
        </form>

        <div className="mt-6 flex gap-3.5 bg-slate-900/40 p-4 rounded-xl border border-white/[0.03] text-xs">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-slate-400 leading-relaxed font-sans">
            <h4 className="font-bold text-slate-200">Official Warning and Safe-Practice Protocol:</h4>
            <p>Users should <span className="text-amber-400 font-semibold">only use official Discord Bot Tokens</span> retrieved directly from the Discord Developer Portal.</p>
            <p><span className="text-rose-400 font-medium">Never share personal account credentials</span> (email/password) or client secret tokens anywhere on the web.</p>
          </div>
        </div>
      </div>

      <div id="guide-header-block" className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white tracking-widest uppercase">HOW TO GET & AUTHORIZE BOT TOKEN</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tutorials.map((item, idx) => (
            <div key={idx} className="bg-slate-950/45 p-5 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#8B5CF6]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-black font-mono text-purple-500/80 bg-purple-950/40 border border-purple-500/10 px-2 py-0.5 rounded">STEP {item.step}</span>
                  {item.icon}
                </div>
                <h4 className="text-xs font-bold text-slate-100 tracking-wide mb-1.5 uppercase">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{item.desc}</p>
              </div>
              <div className="mt-4 pt-1 text-[10px] font-sans font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
                <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                  <span>{item.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TokenGuideModal isOpen={showGuideModal} onClose={() => setShowGuideModal(false)} />
    </div>
  );
}
