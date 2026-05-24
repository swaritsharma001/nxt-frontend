import { motion } from 'motion/react';
import { ShieldAlert, XCircle, AlertTriangle, Ban, Flame, CheckCircle, Scale } from 'lucide-react';

interface Rule {
  id: string;
  title: string;
  desc: string;
  severity: 'ban' | 'warn' | 'strict';
}

const RULES: Rule[] = [
  {
    id: '01',
    title: 'Kisi bhi user ko spam ya mass-message mat karo',
    desc: 'Bot se bulk messages, DM spam, ya server mention spam karna strictly prohibited hai. Aisa karne pe bot aur account dono turant ban ho jayenge.',
    severity: 'ban',
  },
  {
    id: '02',
    title: 'Token kisi ke saath share mat karo',
    desc: 'Apna Discord bot token kabhi bhi kisi dusre insaan ko mat do — na Discord pe, na kisi aur platform pe. Token leak hone pe aapki full responsibility hogi.',
    severity: 'ban',
  },
  {
    id: '03',
    title: 'Self-bot ya user-account token use karna mana hai',
    desc: 'Sirf official Discord Bot tokens allowed hain. Personal account tokens (self-bots) use karna Discord TOS violation hai aur NEXBOT pe bhi turant ban lagega.',
    severity: 'ban',
  },
  {
    id: '04',
    title: 'Doosron ke servers ko raid ya nuke karna mana hai',
    desc: 'Bot ka use karke kisi server ko destroy karna, channels delete karna, ya mass-kick/ban karna — yeh sab zero-tolerance violation hai. Permanent ban hoga.',
    severity: 'ban',
  },
  {
    id: '05',
    title: 'NSFW ya illegal content distribute mat karo',
    desc: 'Bot ke zariye kisi bhi prakar ka illegal, NSFW, ya harmful content bhejne pe account instantly terminate ho jayega aur authorities ko report kiya ja sakta hai.',
    severity: 'ban',
  },
  {
    id: '06',
    title: 'Platform ko abuse karke free resources exploit mat karo',
    desc: 'Multiple accounts banakar free tier exploit karna, ya bots ko resource-intensive tasks ke liye misuse karna — yeh sab detected hone pe ban hoga.',
    severity: 'warn',
  },
  {
    id: '07',
    title: 'Payment ke baad fake UTR submit mat karo',
    desc: 'Galat ya fake UPI transaction ID dena fraud hai. Aisa karne pe account permanently ban hoga aur legal action liya ja sakta hai.',
    severity: 'ban',
  },
  {
    id: '08',
    title: 'Bot se phishing links ya scam content mat bhejo',
    desc: 'Kisi bhi tarah ke scam, phishing, ya fake giveaway links bot se distribute karna mana hai. Yeh Discord aur NEXBOT dono pe ban karwayega.',
    severity: 'ban',
  },
  {
    id: '09',
    title: 'Support team ke saath respectful raho',
    desc: 'Support staff ke saath abusive ya threatening language use karna acceptable nahi hai. Aisa karne pe bina warning ke ban ho sakta hai.',
    severity: 'warn',
  },
  {
    id: '10',
    title: 'Bot ko 24/7 heavy load pe forcefully mat chalao',
    desc: 'Ek hi bot pe intentionally infinite loops ya CPU-spike tasks dalna prohibited hai. Fair usage policy follow karo nahi toh service suspend hogi.',
    severity: 'strict',
  },
];

const severityConfig = {
  ban: {
    label: 'INSTANT BAN',
    icon: Ban,
    border: 'border-red-500/20',
    bg: 'bg-red-950/15',
    badge: 'bg-red-500/10 border-red-500/25 text-red-400',
    dot: 'bg-red-500',
    number: 'text-red-500/60',
  },
  warn: {
    label: 'WARNING',
    icon: AlertTriangle,
    border: 'border-amber-500/20',
    bg: 'bg-amber-950/10',
    badge: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
    dot: 'bg-amber-500',
    number: 'text-amber-500/60',
  },
  strict: {
    label: 'STRICT',
    icon: ShieldAlert,
    border: 'border-orange-500/20',
    bg: 'bg-orange-950/10',
    badge: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
    dot: 'bg-orange-500',
    number: 'text-orange-500/60',
  },
};

export default function RulesTab() {
  const banCount = RULES.filter((r) => r.severity === 'ban').length;
  const warnCount = RULES.filter((r) => r.severity === 'warn').length;

  return (
    <div id="rules-tab-view" className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-950/70 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_30px_rgba(239,68,68,0.08)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500" />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 shrink-0">
            <Scale className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-wide text-white flex items-center gap-2">
              NEXBOT INDIA — RULES & GUIDELINES
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl font-medium">
              Yeh rules follow karna <span className="text-white font-bold">mandatory</span> hai. Violation pe bina warning ke account aur bot permanently ban ho sakta hai. "Pata nahi tha" acceptable excuse nahi hai.
            </p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
                <Ban className="w-3 h-3" /> {banCount} Instant Ban Rules
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
                <AlertTriangle className="w-3 h-3" /> {warnCount} Warning Rules
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <CheckCircle className="w-3 h-3" /> Last Updated: May 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules list */}
      <div className="space-y-3">
        {RULES.map((rule, idx) => {
          const cfg = severityConfig[rule.severity];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.045, duration: 0.25 }}
              className={`relative flex items-start gap-4 p-4 rounded-xl border ${cfg.border} ${cfg.bg} group`}
            >
              {/* Rule number */}
              <span className={`text-3xl font-black font-mono leading-none shrink-0 mt-0.5 select-none ${cfg.number}`}>
                {rule.id}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <p className="text-sm font-bold text-slate-100 leading-snug">{rule.title}</p>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest border rounded-full px-2 py-0.5 shrink-0 ${cfg.badge}`}>
                    <Icon className="w-2.5 h-2.5" />
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">{rule.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer warning */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-red-950/30 to-rose-950/20 border border-red-500/20 rounded-xl p-4 text-xs">
        <Flame className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
        <div className="space-y-1 text-slate-400 leading-relaxed">
          <p className="font-black text-red-400 uppercase tracking-wider text-[11px]">Final Warning</p>
          <p>
            NEXBOT India ek community-based platform hai. Agar koi user intentionally platform ko misuse karta hai toh humara poora haq hai ki bina kisi refund ke, bina notice ke, aur bina explanation ke <span className="text-white font-semibold">permanent ban</span> lagaya jaye. Koi appeal nahi hogi agar violation severe ho.
          </p>
          <p className="text-slate-500 mt-1">
            Questions ke liye Discord support server join karo. Rules aksar update hote rehte hain — time-time pe check karte raho.
          </p>
        </div>
      </div>
    </div>
  );
}
