import { motion } from 'motion/react';
import { Check, Flame, IndianRupee, Shield, Zap, Sparkles, Star } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PricingTabProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

export default function PricingTab({ isPremium, onUpgrade }: PricingTabProps) {
  const UPI_ID = 'swaritsharma12@ybl';
  const AMOUNT = 100;
  const UPI_URL = `upi://pay?pa=${UPI_ID}&pn=NEXBOT+INDIA&am=${AMOUNT}&cu=INR&tn=Premium+Upgrade`;

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
            <div className="relative z-10 space-y-4">
              <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-4 text-center space-y-3">
                <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">Scan to Pay ₹100 via UPI</p>
                <div className="flex justify-center">
                  <div className="p-2.5 bg-white rounded-xl inline-block shadow-lg shadow-purple-500/20">
                    <QRCodeSVG value={UPI_URL} size={140} bgColor="#ffffff" fgColor="#0f172a" level="M" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider">{UPI_ID}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">After payment, contact on Discord with your transaction ID to activate premium.</p>
              </div>
              <button
                type="button"
                onClick={onUpgrade}
                id="premium-upgrade-submit-btn"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.55)] transition hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>I've Paid — Activate Premium</span>
              </button>
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
          { icon: <Zap className="w-4 h-4 text-indigo-400" />, label: 'Instant Activation', desc: 'Activated within minutes after UPI payment + Discord confirmation.' },
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
