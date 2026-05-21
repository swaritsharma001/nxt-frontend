import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import axios from 'axios';
import { motion } from 'motion/react';

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

import { ActiveTab, Bot, ConsoleLog, ToastMessage } from './types';

const INITIAL_BOTS: Bot[] = [
  { id: 'bot-1', name: 'Harmony Music Engine', status: 'running', type: 'music', avatarColor: 'bg-purple-950/60 border border-purple-500/30', uptime: '3d 14h 22m', latency: 22, ramUsage: '182MB', cpuUsage: '4.2%', description: 'Streams lossless audio tracks directly from YouTube and Spotify endpoints into voice channels.' },
  { id: 'bot-2', name: 'SentinelGuard Moderator', status: 'running', type: 'moderation', avatarColor: 'bg-blue-950/60 border border-blue-500/30', uptime: '7d 02h 15m', latency: 28, ramUsage: '95MB', cpuUsage: '1.8%', description: 'Scans text payloads and media metadata to enforce custom safety protocols and anti-spam scripts.' },
  { id: 'bot-3', name: 'Nova AI Chat Assistant', status: 'stopped', type: 'ai', avatarColor: 'bg-indigo-950/60 border border-indigo-500/30', uptime: '0d 0h 0m', latency: 0, ramUsage: '0MB', cpuUsage: '0%', description: 'An advanced language model chatbot that connects to GPT-4 Turbo for real-time slash command responses.' },
];

function generateLogId() {
  return Math.random().toString(36).substr(2, 9);
}

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

export default function App() {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: any) => state.user.user);

  const [user, setUser] = useState<{ username: string; avatarUrl: string } | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [bots, setBots] = useState<Bot[]>(INITIAL_BOTS);
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

  useEffect(() => {
    const token = cookie.get('token');
    if (!token) return;

    axios
      .get('https://5dfe6ee9-e7c3-42ac-8969-a375eaf6f061-00-3t8s8w7v3ehcc.worf.replit.dev:3000/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setUser({ username: data.username || 'User', avatarUrl: data.pic || 'logo' });
        dispatch(seetUser({ Id: data.id, username: data.username, pic: data.pic, isPremium: data.isPremium }));
        if (data.isPremium) setPremiumStatus('premium');
      })
      .catch(() => {
        setUser({ username: 'User', avatarUrl: 'logo' });
      });
  }, [dispatch]);

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
        ['info', `Memory allocation stable: ${bot.ramUsage} in use.`],
      ];
      const [level, msg] = messages[Math.floor(Math.random() * messages.length)];
      addLog(bot.name, level, msg);
    }, 3500);
    return () => clearInterval(interval);
  }, [bots, addLog]);

  const handleStartBot = (id: string) => {
    setBots((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: 'running', uptime: '0d 0h 1m', latency: Math.floor(Math.random() * 30 + 15), ramUsage: `${Math.floor(Math.random() * 150 + 60)}MB`, cpuUsage: `${(Math.random() * 5 + 1).toFixed(1)}%` }
          : b
      )
    );
    const bot = bots.find((b) => b.id === id)!;
    addLog(bot.name, 'success', 'Bot instance launched successfully. Gateway connection established.');
    addToast(`${bot.name} is now online.`, 'success');
  };

  const handleStopBot = (id: string) => {
    setBots((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: 'stopped', uptime: '0d 0h 0m', latency: 0, ramUsage: '0MB', cpuUsage: '0%' } : b
      )
    );
    const bot = bots.find((b) => b.id === id)!;
    addLog(bot.name, 'warning', 'Bot instance stopped. Gateway connection cleanly closed (code 1000).');
    addToast(`${bot.name} has been stopped.`, 'warning');
  };

  const handleRestartBot = (id: string) => {
    setBots((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'stopped' } : b)));
    setTimeout(() => {
      setBots((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, status: 'running', latency: Math.floor(Math.random() * 30 + 15), ramUsage: `${Math.floor(Math.random() * 150 + 60)}MB`, cpuUsage: `${(Math.random() * 5 + 1).toFixed(1)}%` }
            : b
        )
      );
    }, 1200);
    const bot = bots.find((b) => b.id === id)!;
    addLog(bot.name, 'info', 'Rebooting container thread. Re-establishing Gateway session...');
    addToast(`${bot.name} is rebooting.`, 'info');
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
    addToast('Logged out of console.', 'info');
  };

  const handleSaveSettings = (message: string) => {
    addToast(message, 'success');
  };

  const handleClearAll = () => {
    cookie.remove('token');
    setUser(null);
    dispatch(logoutUser());
    setBots(INITIAL_BOTS);
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
  const displayAvatar = user?.avatarUrl || (reduxUser?.pic ? reduxUser.pic : null);

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
        return (
          <BotManager
            bots={bots}
            onStartBot={handleStartBot}
            onStopBot={handleStopBot}
            onRestartBot={handleRestartBot}
            onSelectBotForLogs={handleSelectBotForLogs}
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
