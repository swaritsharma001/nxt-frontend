import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flame, IndianRupee, Shield, Zap, Sparkles, Star, ClipboardCheck, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../config';

interface PricingTabProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

export default function PricingTab({ isPremium, onUpgrade }: PricingTabProps) {
  const UPI_ID = '8986917820@fam';
  const AMOUNT = 100;
  const UPI_URL = `upi://pay?pa=${UPI_ID}&pn=NEXBOT+INDIA&am=${AMOUNT}&cu=INR&tn=Premium+Upgrade`;

  const [utrOpen, setUtrOpen] = useState(false);
  const [utr, setUtr] = useState('');
  const [utrLoading, setUtrLoading] = useState(false);
  const [utrStatus, setUtrStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [utrError, setUtrError] = useState('');

  const handleUtrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr.trim() || utrLoading) return;

    const authToken = Cookies.get('token');
    setUtrLoading(true);
    setUtrStatus('idle');
    setUtrError('');

    try {
      await axios.post(
        `${BACKEND_URL}/core/utr`,
        { utr: utr.trim() },
        { headers: { Authorization: `${authToken}` } }
      );
      setUtrStatus('success');
      setUtr('');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Failed to submit UTR. Please try again.';
      setUtrError(msg);
      setUtrStatus('error');
    } finally {
      setUtrLoading(false);
    }
  };

  const freeFeatures = [
    'Host up to 2 Discord Bot Instances',
    'Mumbai Relay Node (Shared)',
    'Limited Console Telemetry Logs',
    'Basic CPU and RAM Metric Monitor',
  ];

  const premiumFeatures = [
    'Host Unlimited Discord Bot Instances',
    'Priority Mumbai + Tokyo Relay Nodes',
    'Full Console Telemetry + Debug Feeds',
    'Advanced Metric Monitoring Suite',
    'White-Label (Remove Nexbot Branding)',
    'Priority Discord Support Channel',
    'Auto-Restart Recovery Engine',
    'Early Beta Feature Access',
  ];

  return (
    <div id="pricing-tab-view" className="space-y-8 font-sans select-none">
      <div className="bg-slate-950/70 border border-purple-500/15 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <h2 className="text-lg font-black tracking-wide text-white flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-purple-400" />
          <span>NEXBOT INDIA — PREMIUM UPGRADE PORTAL</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl font-medium">
          Unlock your full cluster potential. Upgrade once. Access forever on your account. No subscription needed.
        </p>
        {isPremium && (
          <div className="mt-3 flex items-center gap-2 bg-gradient-to-r from-yellow-950/30 to-amber-950/15 border border-yellow-500/20 text-yellow-400 font-black text-xs tracking-widest uppercase px-4 py-2 rounded-lg w-fit">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>You already have Premium Access!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Free tier */}
        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">CURRENT PLAN</p>
                <h3 className="text-xl font-black text-slate-100">Free Tier</h3>
              </div>
              <div className="text-2xl font-black text-slate-400 font-mono">₹0</div>
            </div>
            <ul className="space-y-2.5">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                  <Check className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 px-4 py-2.5 rounded-lg border border-white/5 text-center text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-900/30 select-none">
            Current Active Plan
          </div>
        </div>

        {/* Premium tier */}
        <div className="relative bg-gradient-to-b from-purple-950/30 via-slate-950/80 to-slate-950/80 border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-[0_4px_40px_rgba(139,92,246,0.12)]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-500/8 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between mb-3 relative z-10">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">RECOMMENDED</p>
              </div>
              <h3 className="text-xl font-black text-white">Premium Plan</h3>
            </div>
            <div className="text-right">
              <div className="flex items-start gap-1 text-white font-black">
                <span className="text-lg mt-1">₹</span>
                <span className="text-3xl font-black font-mono leading-none">100</span>
              </div>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mt-0.5">One Time</p>
            </div>
          </div>

          <ul className="space-y-2.5 mb-6 relative z-10">
            {premiumFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-4 h-4 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-purple-400 stroke-[2.5]" />
                </div>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {!isPremium ? (
            <div className="relative z-10 space-y-3">
              {/* Themed QR code */}
              <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-4 text-center space-y-3">
                <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">Scan to Pay ₹100 via UPI</p>

                <div className="flex justify-center">
                  {/* Outer glow ring */}
                  <div className="relative p-[3px] rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 shadow-[0_0_28px_rgba(139,92,246,0.45)]">
                    <div className="bg-[#0d0b1a] rounded-[13px] p-3 flex items-center justify-center">
                      <QRCodeSVG
                        value={UPI_URL}
                        size={148}
                        bgColor="#0d0b1a"
                        fgColor="#c4b5fd"
                        level="H"
                        imageSettings={{
                          src: '/logo.jpg',
                          height: 34,
                          width: 34,
                          excavate: true,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>UPI QR — ₹100 one-time</span>
                </div>
              </div>

              {/* UTR submission */}
              <button
                type="button"
                onClick={() => { setUtrOpen(!utrOpen); setUtrStatus('idle'); }}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider text-purple-300 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/35 transition duration-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  After Payment? Submit Your UPI UTR
                </span>
                {utrOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {utrOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-900/60 border border-purple-500/15 rounded-xl p-4 space-y-3">
                      {utrStatus === 'success' ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center space-y-3 py-2"
                        >
                          <div className="flex justify-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-emerald-400" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-black text-emerald-400">UTR Submitted!</p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              Your payment is under review. Premium access will be activated within <span className="text-white font-bold">24 hours</span>.
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2">
                            <Clock className="w-3 h-3 text-purple-400" />
                            <span>Sit tight — we'll confirm manually</span>
                          </div>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleUtrSubmit} className="space-y-3">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Enter your UPI Transaction UTR / Reference ID</p>
                            <input
                              type="text"
                              value={utr}
                              onChange={(e) => setUtr(e.target.value)}
                              placeholder="e.g. 426112345678"
                              className="w-full bg-slate-950 border border-white/10 focus:border-purple-500/50 rounded-lg px-3 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none transition"
                              required
                            />
                          </div>

                          {utrStatus === 'error' && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                              <XCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{utrError}</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={utrLoading || !utr.trim()}
                            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {utrLoading ? (
                              <>
                                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Submit UTR — Activate Premium</span>
                              </>
                            )}
                          </button>

                          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                            <Clock className="w-3 h-3 inline mr-1 text-purple-500/70" />
                            Premium activates within <span className="text-slate-300 font-semibold">24 hours</span> after manual verification.
                          </p>
                        </form>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="relative z-10 flex items-center gap-2 justify-center bg-gradient-to-r from-yellow-500/15 to-amber-500/10 border border-yellow-500/25 rounded-xl py-3 text-yellow-400 font-black text-xs tracking-widest uppercase">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>Premium Active on Your Account!</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
        {[
          { icon: <Shield className="w-4 h-4 text-purple-400" />, label: 'Lifetime Access', desc: 'Pay once, receive permanent premium. No hidden renewals.' },
          { icon: <Zap className="w-4 h-4 text-indigo-400" />, label: '24hr Activation', desc: 'Activated within 24 hours after UPI payment verification.' },
          { icon: <Flame className="w-4 h-4 text-amber-400" />, label: 'Priority Support', desc: 'Jump the queue on Discord server for any bugs, help, or feature requests.' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-slate-950/30 p-4 rounded-xl border border-white/[0.03]">
            <div className="p-1.5 rounded-lg bg-slate-900/70 border border-white/5 mt-0.5 shrink-0">{item.icon}</div>
            <div>
              <p className="font-bold text-slate-200 mb-0.5">{item.label}</p>
              <p className="font-normal leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
