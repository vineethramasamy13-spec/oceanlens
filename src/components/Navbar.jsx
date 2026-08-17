import React, { useState } from 'react';
import { Menu, X, Compass, Waves, Map as MapIcon, Database, FileText, Info, Radio, Activity, Sparkles, MessageSquare } from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { useConnectionStatus } from '../utils/realOceanApi';

export default function Navbar({ activePage, setActivePage, activeFloatsCount = 8, onQuickReport }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang, setLanguage } = useTranslation();
  const statusInfo = useConnectionStatus();

  const getStatusColor = () => {
    if (statusInfo.status === 'live') return 'bg-emerald-500';
    if (statusInfo.status === 'fallback') return 'bg-amber-500';
    return 'bg-slate-500';
  };

  const getStatusText = () => {
    if (statusInfo.status === 'live') return lang === 'en' ? 'Live Stream' : 'लाइव स्ट्रीम';
    if (statusInfo.status === 'fallback') return lang === 'en' ? 'Estimated (Offline)' : 'अनुमानित (ऑफ़लाइन)';
    return lang === 'en' ? 'Connecting...' : 'कनेक्ट हो रहा है...';
  };

  const navItems = [
    { id: 'ai-explorer', label: t('nav_explorer'), icon: Sparkles, badge: 'Core' },
    { id: 'ai-chatbot', label: t('nav_chatbot'), icon: MessageSquare, badge: 'New' },
    { id: 'ocean-map', label: t('nav_map'), icon: MapIcon },
    { id: 'data-explorer', label: t('nav_data'), icon: Database },
    { id: 'ocean-reports', label: t('nav_reports'), icon: FileText },
    { id: 'about-argo', label: t('nav_about'), icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-cyan-500/20 bg-white/80 dark:bg-ocean-950/80 backdrop-blur-xl shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActivePage('ai-explorer')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-0.5 shadow-glow-cyan">
              <div className="w-full h-full bg-ocean-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <Waves className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent">
                  OceanLens<span className="text-cyan-500 dark:text-cyan-400">AI</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 dark:border-cyan-500/30">
                  ARGO CTD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden sm:block">
                {lang === 'en' ? 'Ask the Ocean. Understand the Data.' : 'सागर से पूछें। डेटा को समझें।'}
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-450 focus-visible:outline-none ${
                    isActive
                      ? 'bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 dark:border-cyan-500/30 shadow-sm dark:shadow-glow-cyan'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-ocean-850/60'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 hidden xl:block ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-450 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-cyan-600 dark:bg-cyan-500 text-cyan-50 dark:text-ocean-950 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
 
          {/* Controls & Quick Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
           {/* Live Ticker Widget (Task 4) */}
            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-ocean-900 border border-slate-200 dark:border-cyan-500/20 text-xs text-slate-300 select-none">
              <span className="relative flex h-2 w-2 shrink-0">
                {statusInfo.status !== 'unknown' && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    statusInfo.status === 'live' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor()}`}></span>
              </span>
              <div className="flex flex-col text-[10px] leading-tight shrink-0">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>{getStatusText()}</span>
                  <span className="text-slate-450 dark:text-slate-500 font-normal">({statusInfo.source})</span>
                </span>
                <span className="font-mono text-slate-550 dark:text-slate-400 text-[8.5px] mt-0.5">
                  {statusInfo.timestamp 
                    ? `${lang === 'en' ? 'Last Fetch' : 'अंतिम फ़ेच'}: ${new Date(statusInfo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
                    : (lang === 'en' ? 'No API calls made yet' : 'कोई एपीआई कॉल नहीं')}
                </span>
              </div>
            </div>

            {/* Bilingual Translation Switcher */}
            <button
              onClick={() => setLanguage(lang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-ocean-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 text-xs font-bold font-mono transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Change Language / भाषा बदलें"
            >
              {lang === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            {/* Quick Report Button */}
            <button
              onClick={onQuickReport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 dark:text-ocean-950 transition-all shadow-sm dark:shadow-glow-cyan focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Generate Analysis Report"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('nav_quick_report')}</span>
            </button>
          </div>

          {/* Hamburger Menu & Language Button for Mobile Viewports */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(lang === 'en' ? 'hi' : 'en')}
              className="px-2 py-1 rounded bg-slate-100 dark:bg-ocean-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:text-cyan-400 text-[11px] font-bold font-mono"
              aria-label="Change Language"
            >
              {lang === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-ocean-900 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-ocean-950/95 py-3 px-3 flex flex-col gap-1.5 animate-in slide-in-from-top-4 duration-150 relative z-40 backdrop-blur-md">
          {/* Mobile Connection Ticker Widget (Task 4) */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 dark:bg-ocean-900 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-350 mb-1 select-none">
            <span className="relative flex h-2 w-2 shrink-0">
              {statusInfo.status !== 'unknown' && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  statusInfo.status === 'live' ? 'bg-emerald-400' : 'bg-amber-400'
                }`}></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor()}`}></span>
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-slate-700 dark:text-slate-250">
                {getStatusText()} <span className="text-[9px] text-slate-500 font-normal">({statusInfo.source})</span>
              </span>
              <span className="text-slate-550 dark:text-slate-450 font-mono text-[9px] mt-0.5">
                {statusInfo.timestamp 
                  ? `${lang === 'en' ? 'Last Fetch' : 'अंतिम फ़ेच'}: ${new Date(statusInfo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
                  : (lang === 'en' ? 'No API calls' : 'कोई एपीआई कॉल नहीं')}
              </span>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  isActive
                    ? 'bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/20 dark:border-cyan-500/30'
                    : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-ocean-900'
                }`}
                aria-label={item.label}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[8px] uppercase px-1.5 py-0.2 rounded bg-cyan-600 dark:bg-cyan-500 text-white dark:text-ocean-950 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          {/* Quick Report Button Mobile */}
          <button
            onClick={() => {
              onQuickReport();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-950 shadow-glow-cyan"
            aria-label="Generate Analysis Report"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('nav_quick_report')}</span>
          </button>
        </div>
      )}
    </header>
  );
}
