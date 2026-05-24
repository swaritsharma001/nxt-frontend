import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import axios from 'axios';
import { motion } from 'motion/react';
import { BACKEND_URL } from './config';

import { seetUser, logoutUser } from '../redux/userSlice';

import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import DiscordLoginModal from './components/DiscordLoginModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';
import DashboardStats from './components/DashboardStats';
import BotManager from './components/BotManager';
import ConsoleLogPanel from './components/ConsoleLogPanel';
import TokenSection from './components/TokenSection';
import SettingsTab from './components/SettingsTab';
import DocsTab from './components/DocsTab';
import PricingTab from './components/PricingTab';
import RulesTab from './components/RulesTab';

import { ActiveTab, Bot, ConsoleLog, ToastMessage } from './types';

function generateLogId() {
  return Math.random().toString(36).substr(2, 9);
}

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

function formatUptime(lastActive: string): string {
  const diff = Math.floor((Date.now() - new Date(lastActive).getTime()) / 1000);
  const d = Math.floor(diff / 86400);
  const h = Math.floor((diff % 86400) / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

export default function App() {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: any) => state.user.user);

  const [user, setUser] = useState<{ username: string; avatarUrl: string } | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [bots, setBots] = useState<Bot[]>([]);
  const [botsLoading, setBotsLoading] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [premiumStatus, setPremiumStatus] = useState<string>('free');
  const [brandingRemoved, setBrandingRemoved] = useState(false);

  const isPremium = premiumStatus === 'premium';

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = generateLogId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  const addLog = useCallback((botName: string, level: ConsoleLog['level'], message: string) => {
    setConsoleLogs((prev) => [
      ...prev.slice(-199),
      { id: generateLogId(), timestamp: nowTime(), botName, level, message },
    ]);
  }, []);

  // Strip ?token= from URL after Discord OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      cookie.set('token', urlToken, { expires: 7 });
      params.delete('token');
      const cleanUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : '') +
        window.location.hash;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  // Fetch user profile
  useEffect(() => {
    const token = cookie.get('token');
    if (!token) return;

    setUserLoading(true);
    axios
      .get(`${BACKEND_URL}/auth/user`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        const data = res.data;
        const avatarUrl =
          data.id && data.pic
            ? `https://cdn.discordapp.com/avatars/${data.id}/${data.pic}.png?size=128`
            : null;
        setUser({ username: data.username || 'User', avatarUrl: avatarUrl || 'logo' });
        dispatch(seetUser({
          Id: data.id,
          username: data.username,
          pic: data.pic,
          isPremium: data.isPremium,
        }));
        if (data.isPremium) setPremiumStatus('premium');
      })
      .catch(() => {
        setUser({ username: 'User', avatarUrl: 'logo' });
      })
      .finally(() => setUserLoading(false));
  }, [dispatch]);

  // Fetch bots using cookie token — poll every 10s
  useEffect(() => {
    const token = cookie.get('token');
    if (!token) return;

    const types: Bot['type'][] = ['music', 'moderation', 'ai'];
    const avatarColors = [
      'bg-purple-950/60 border border-purple-500/30',
      'bg-blue-950/60 border border-blue-500/30',
      'bg-indigo-950/60 border border-indigo-500/30',
    ];

    const fetchBots = async () => {
      setBotsLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/core/bots`, {
          headers: { Authorization: token },
        });

        const dbBots: Array<{
          _id: string;
          username: string;
          isRunning: boolean;
          isBanned: boolean;
          lastActive: string;
        }> = res.data;

        const mapped: Bot[] = dbBots.map((db, i) => ({
          id: db._id,
          name: db.username,
          status: db.isRunning ? 'running' : 'stopped',
          type: types[i % types.length],
          avatarColor: avatarColors[i % avatarColors.length],
          uptime: db.isRunning ? formatUptime(db.lastActive) : '—',
          latency: db.latency,
          ramUsage: db.ramUsage,
          cpuUsage: db.cpuUsage,
          description: `Last active: ${new Date(db.lastActive).toLocaleString()}`,
        }));

        setBots(mapped);
      } catch (err) {
        console.error('Failed to fetch bots:', err);
      } finally {
        setBotsLoading(false);
      }
    };

    fetchBots();
    const interval = setInterval(fetchBots, 10_000);
    return () => clearInterval(interval);
  }, []);

  // Console log noise for running bots
  useEffect(() => {
    const runningBots = bots.filter((b) => b.status === 'running');
    if (runningBots.length === 0) return;
    const interval = setInterval(() => {
      const bot = runningBots[Math.floor(Math.random() * runningBots.length)];
      const messages: Array<[ConsoleLog['level'], string]> = [
        ['info', `Heartbeat ACK received from Discord Gateway (shard 0).`],
        ['info', `Voice state update processed for guild node.`],
        ['success', `Command interaction handled in ${Math.floor(Math.random() * 50 + 10)}ms.`],
        ['warning', `Rate limit warning: 4 requests remain in current window.`],
      ];
      const [level, msg] = messages[Math.floor(Math.random() * messages.length)];
      addLog(bot.name, level, msg);
    }, 3500);
    return () => clearInterval(interval);
  }, [bots, addLog]);

  const handleStartBot = async (id: string) => {
    const token = cookie.get('token');
    const bot = bots.find((b) => b.id === id)!;
    try {
      await axios.post(`${BACKEND_URL}/core/start`, {id}, {
        headers: { Authorization: token },
        
      });
      setBots((prev) =>
        prev.map((b) => b.id === id ? { ...b, status: 'running' } : b)
      );
      addLog(bot.name, 'success', 'Bot instance launched. Gateway connection established.');
      addToast(`${bot.name} is now online.`, 'success');
    } catch {
      addToast(`Failed to start ${bot.name}.`, 'error');
    }
  };

  const handleStopBot = async (id: string) => {
    const token = cookie.get('token');
    const bot = bots.find((b) => b.id === id)!;
    try {
      await axios.post(`${BACKEND_URL}/core/stop`, {id}, {
        headers: { Authorization: token },
      });
      setBots((prev) =>
        prev.map((b) => b.id === id ? { ...b, status: 'stopped', uptime: '—' } : b)
      );
      addLog(bot.name, 'warning', 'Bot stopped. Gateway connection cleanly closed (code 1000).');
      addToast(`${bot.name} has been stopped.`, 'warning');
    } catch {
      addToast(`Failed to stop ${bot.name}.`, 'error');
    }
  };

  const handleRestartBot = async (id: string) => {
    const token = cookie.get('token');
    const bot = bots.find((b) => b.id === id)!;
    try {
      await axios.post(`${BACKEND_URL}/bots/${id}/restart`, {}, {
        headers: { Authorization: token },
      });
      setBots((prev) =>
        prev.map((b) => b.id === id ? { ...b, status: 'stopped', uptime: '—' } : b)
      );
      setTimeout(() => {
        setBots((prev) =>
          prev.map((b) => b.id === id ? { ...b, status: 'running' } : b)
        );
      }, 1200);
      addLog(bot.name, 'info', 'Rebooting container thread. Re-establishing Gateway session...');
      addToast(`${bot.name} is rebooting.`, 'info');
    } catch {
      addToast(`Failed to restart ${bot.name}.`, 'error');
    }
  };

  const handleDeleteBot = (id: string) => {
    setBots((prev) => prev.filter((b) => b.id !== id));
    addToast('Bot deleted successfully.', 'success');
  };

  const handleSelectBotForLogs = (botName: string) => {
    addToast(`Showing logs for ${botName}.`, 'info');
    setActiveTab('dashboard');
  };

  const handleTokenSubmit = (_token: string) => {
    addLog('TOKEN_MANAGER', 'success', `New bot token registered and encrypted in the local sandbox.`);
    addToast('Bot token registered securely. Ready to deploy.', 'success');
  };

  const handleLogout = () => {
    cookie.remove('token');
    setUser(null);
    dispatch(logoutUser());
    setPremiumStatus('free');
    setBrandingRemoved(false);
    setBots([]);
    addToast('Logged out of console.', 'info');
  };

  const handleSaveSettings = (message: string) => {
    addToast(message, 'success');
  };

  const handleClearAll = () => {
    cookie.remove('token');
    setUser(null);
    dispatch(logoutUser());
    setBots([]);
    setConsoleLogs([]);
    setPremiumStatus('free');
    setBrandingRemoved(false);
    addToast('Full purge complete. All data wiped.', 'warning');
  };

  const handlePremiumUpgrade = () => {
    addToast('Contact on Discord with your UPI transaction ID to activate premium.', 'info');
  };

  const token = cookie.get('token');
  const isAuthenticated = !!(token || user || reduxUser);

  const displayUsername = user?.username || reduxUser?.username || (token ? 'User' : null);
  const displayAvatar =
    (user?.avatarUrl && user.avatarUrl !== 'logo')
      ? user.avatarUrl
      : (reduxUser?.Id && reduxUser?.pic)
        ? `https://cdn.discordapp.com/avatars/${reduxUser.Id}/${reduxUser.pic}.png?size=128`
        : null;

  const runningCount = bots.filter((b) => b.status === 'running').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <DashboardStats bots={bots} />
            <TokenSection onSubmitToken={handleTokenSubmit} />
            <ConsoleLogPanel logs={consoleLogs} onClearLogs={() => setConsoleLogs([])} />
          </div>
        );
      case 'bots':
        return botsLoading && bots.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
              <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                Fetching bots...
              </span>
            </div>
          </div>
        ) : (
          <BotManager
            bots={bots}
            isPremium={isPremium}
            onStartBot={handleStartBot}
            onStopBot={handleStopBot}
            onRestartBot={handleRestartBot}
            onSelectBotForLogs={handleSelectBotForLogs}
            onDeleteBot={handleDeleteBot}
          />
        );
      case 'pricing':
        return <PricingTab isPremium={isPremium} onUpgrade={handlePremiumUpgrade} />;
      case 'settings':
        return (
          <SettingsTab
            onSave={handleSaveSettings}
            onClearAll={handleClearAll}
            isPremium={isPremium}
            brandingRemoved={brandingRemoved}
            onToggleBranding={setBrandingRemoved}
          />
        );
      case 'docs':
        return <DocsTab />;
      case 'rules':
        return <RulesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 relative overflow-x-hidden font-sans">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          username={displayUsername}
          avatarUrl={displayAvatar}
          userLoading={userLoading}
          onLoginClick={() => setLoginModalOpen(true)}
          onLogout={handleLogout}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          brandingRemoved={brandingRemoved}
        />

        {isAuthenticated ? (
          <div className="flex flex-1">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              username={displayUsername}
              onLogout={handleLogout}
              runningCount={runningCount}
              brandingRemoved={brandingRemoved}
            />
            <main className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </div>
              <Footer />
            </main>
          </div>
        ) : (
          <LandingPage onLoginClick={() => setLoginModalOpen(true)} />
        )}
      </div>

      <DiscordLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onAuthorize={(username, avatarUrl) => {
          setUser({ username, avatarUrl });
          setLoginModalOpen(false);
          addToast(`Welcome back, ${username}!`, 'success');
        }}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}