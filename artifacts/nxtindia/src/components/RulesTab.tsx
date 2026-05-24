import { motion } from 'motion/react';
import { ShieldAlert, AlertTriangle, Ban, Flame, CheckCircle, Scale } from 'lucide-react';

interface Rule {
  id: string;
  title: string;
  desc: string;
  severity: 'ban' | 'warn' | 'strict';
}

const RULES: Rule[] = [
  {
    id: '01',
    title: 'No Spam or Mass Messaging',
    desc: 'Using your bot to send bulk messages, DM spam, or server-wide mass mentions is strictly prohibited. Violation results in an immediate ban of both the bot and the account.',
    severity: 'ban',
  },
  {
    id: '02',
    title: 'Never Share Your Token',
    desc: 'Do not share your Discord bot token with anyone — on Discord, NEXBOT, or any other platform. If your token is leaked, full responsibility lies with you.',
    severity: 'ban',
  },
  {
    id: '03',
    title: 'No Self-Bots or User Account Tokens',
    desc: 'Only official Discord Bot tokens are allowed. Using personal account tokens (self-bots) violates Discord\'s Terms of Service and will result in an instant ban on NEXBOT.',
    severity: 'ban',
  },
  {
    id: '04',
    title: 'No Raiding or Nuking Servers',
    desc: 'Using your bot to raid, nuke, mass-kick, or mass-ban members in any server is a zero-tolerance violation. This will result in a permanent ban with no appeal.',
    severity: 'ban',
  },
  {
    id: '05',
    title: 'No NSFW or Illegal Content',
    desc: 'Distributing illegal, NSFW, or harmful content through your bot will result in an immediate account termination. Depending on severity, this may also be reported to relevant authorities.',
    severity: 'ban',
  },
  {
    id: '06',
    title: 'Do Not Exploit Free Tier Resources',
    desc: 'Creating multiple accounts to abuse free-tier limits, or running bots for resource-intensive tasks beyond fair use, is not allowed. Detected abuse will result in a ban.',
    severity: 'warn',
  },
  {
    id: '07',
    title: 'No Fake Payment UTR Submissions',
    desc: 'Submitting a false or invalid UPI transaction ID is considered fraud. This will result in a permanent ban and may lead to legal action.',
    severity: 'ban',
  },
  {
    id: '08',
    title: 'No Phishing Links or Scam Content',
    desc: 'Using your bot to distribute phishing links, fake giveaways, or any form of scam content is strictly forbidden. This will result in a ban on both Discord and NEXBOT.',
    severity: 'ban',
  },
  {
    id: '09',
    title: 'Respect the Support Team',
    desc: 'Using abusive, threatening, or disrespectful language toward support staff is not tolerated. This may result in a ban without any prior warning.',
    severity: 'warn',
  },
  {
    id: '10',
    title: 'No Intentional Infinite Loops or CPU Spikes',
    desc: 'Deliberately running tasks that cause infinite loops or heavy CPU usage on our infrastructure is prohibited. Violating the fair usage policy will lead to service suspension.',
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
    number: 'text-red-500/60',
  },
  warn: {
    label: 'WARNING',
    icon: AlertTriangle,
    border: 'border-amber-500/20',
    bg: 'bg-amber-950/10',
    badge: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
    number: 'text-amber-500/60',
  },
  strict: {
    label: 'STRICT',
    icon: ShieldAlert,
    border: 'border-orange-500/20',
    bg: 'bg-orange-950/10',
    badge: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
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
            <h2 className="text-lg font-black tracking-wide text-white">
              NEXBOT INDIA — RULES & GUIDELINES
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl font-medium">
              Following these rules is <span className="text-white font-bold">mandatory</span>. Violations may result in a permanent ban of your account and bot without prior warning. "I didn't know" is not an acceptable excuse.
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
              className={`relative flex items-start gap-4 p-4 rounded-xl border ${cfg.border} ${cfg.bg}`}
            >
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
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{rule.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer warning */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-red-950/30 to-rose-950/20 border border-red-500/20 rounded-xl p-4 text-xs">
        <Flame className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
        <div className="space-y-1 text-slate-400 leading-relaxed">
          <p className="font-black text-red-400 uppercase tracking-wider text-[11px]">Final Notice</p>
          <p>
            NEXBOT India is a community-driven platform. Any user who intentionally misuses the platform may be issued a <span className="text-white font-semibold">permanent ban</span> — without refund, notice, or explanation — if the violation is severe enough. No appeal will be entertained in such cases.
          </p>
          <p className="text-slate-500 mt-1">
            For questions, join our Discord support server. Rules are updated periodically — check back regularly to stay informed.
          </p>
        </div>
      </div>
    </div>
  );
}
