import { motion } from 'motion/react';
import { LayoutGrid, Bot, Sliders, BookOpen, LogOut, Terminal, IndianRupee, ShieldAlert } from 'lucide-react';
import { ActiveTab } from '../types';
import { LogoIcon, LogoText } from './Logo';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  username: string | null;
  onLogout: () => void;
  runningCount: number;
  brandingRemoved?: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, username, onLogout, runningCount, brandingRemoved = false }: SidebarProps) {
  if (!username) return null;

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutGrid },
    { id: 'bots' as ActiveTab, label: 'My Bots', icon: Bot, badge: runningCount > 0 ? runningCount : undefined },
    { id: 'pricing' as ActiveTab, label: 'Premium Plan ⚡', icon: IndianRupee },
    { id: 'rules' as ActiveTab, label: 'Rules & Guidelines', icon: ShieldAlert },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Sliders },
    { id: 'docs' as ActiveTab, label: 'Docs API', icon: BookOpen },
  ];

  return (
    <aside
      id="sidebar-desktop-nav"
      className="hidden md:flex flex-col w-64 bg-slate-950/85 border-r border-[#8B5CF6]/15 h-screen sticky top-0 shrink-0 select-none z-10 backdrop-blur-md"
    >
      <div className="p-6 border-b border-[#3B82F6]/10">
        <div className="flex items-center gap-3">
          <LogoIcon size={32} brandingRemoved={brandingRemoved} className="filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
          <LogoText brandingRemoved={brandingRemoved} />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 mt-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              id={`sidebar-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                isActive
                  ? 'text-white font-medium bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 shadow-[inset_0_0_12px_rgba(139,92,246,0.06)]'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-indicator"
                  className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r bg-gradient-to-b from-purple-500 to-blue-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <IconComponent className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-purple-400 filter drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'text-slate-400 group-hover:text-slate-300'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 text-xs font-black rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white min-w-5 text-center shadow-[0_0_10px_rgba(139,92,246,0.4)]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mx-4 mb-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-wider font-extrabold mb-2.5">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" /> Security Check
          </span>
          <span className="text-emerald-400 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <div className="space-y-1.5 text-xs leading-relaxed">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Sandbox:</span>
            <span className="text-slate-300 font-mono text-[10px] bg-slate-950 px-1 py-0.5 rounded border border-white/5">AES-256</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Compliance:</span>
            <span className="text-purple-400 text-[10px] font-semibold">TOS Grounded</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#3B82F6]/10 bg-slate-950/45">
        <button
          type="button"
          id="sidebar-logout-btn"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Console</span>
        </button>
      </div>
    </aside>
  );
}
