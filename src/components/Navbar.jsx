import React from 'react';
import { Compass, Waves, Map as MapIcon, Database, FileText, Info, Radio, Activity, Sparkles, MessageSquare, Sun, Moon } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, activeFloatsCount = 8, onQuickReport }) {
  const navItems = [
    { id: 'ai-explorer', label: 'AI Explorer', icon: Sparkles, badge: 'Core' },
    { id: 'ai-chatbot', label: 'AI Chatbot', icon: MessageSquare, badge: 'New' },
    { id: 'ocean-map', label: 'Ocean Map', icon: MapIcon },
    { id: 'data-explorer', label: 'Data Explorer', icon: Database },
    { id: 'ocean-reports', label: 'Reports', icon: FileText },
    { id: 'about-argo', label: 'About ARGO', icon: Info },
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
                Ask the Ocean. Understand the Data.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 dark:border-cyan-500/30 shadow-sm dark:shadow-glow-cyan'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-ocean-850/60'
                  }`}
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
 
          {/* Live Telemetry Status & Quick Action */}
          <div className="flex items-center gap-3">
            {/* Live Floats Telemetry Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-ocean-900 border border-slate-200 dark:border-cyan-500/20 text-xs text-slate-600 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="font-mono text-cyan-600 dark:text-cyan-300 font-semibold">{activeFloatsCount} Floats</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span className="text-teal-600 dark:text-teal-400 font-mono text-[11px]">GDAC Live</span>
            </div>

            {/* Quick Report Button */}
            <button
              onClick={onQuickReport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 dark:text-ocean-950 transition-all shadow-sm dark:shadow-glow-cyan"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>

        </div>

         {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-200 dark:border-slate-800 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 dark:border-cyan-500/40'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
