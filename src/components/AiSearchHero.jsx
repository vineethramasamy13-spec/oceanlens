import React, { useState } from 'react';
import { Search, Sparkles, Mic, ArrowRight, CornerDownLeft, RotateCcw, HelpCircle } from 'lucide-react';
import { SUGGESTED_QUERIES } from '../data/argoDataset';

export default function AiSearchHero({ onSearch, currentQuery, isLoading, currentContext }) {
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSearch(inputVal.trim());
  };

  const handleChipClick = (queryText) => {
    setInputVal(queryText);
    onSearch(queryText);
  };

  const handleVoiceSim = () => {
    setIsListening(true);
    setTimeout(() => {
      setInputVal("Compare salinity between Bay of Bengal and Arabian Sea");
      setIsListening(false);
      onSearch("Compare salinity between Bay of Bengal and Arabian Sea");
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto pt-2 pb-6 px-4">
      {/* Title & Tagline */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/60 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-medium mb-3 shadow-sm dark:shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          <span>Conversational Ocean Intelligence Layer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Ask anything about the world's <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-500 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">oceans</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Natural English queries converted into direct ARGO robotic float CTD analysis, depth profiles, and bathymetric maps.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center w-full rounded-2xl glass-panel-active p-1.5 transition-all duration-300 group-hover:border-cyan-400/60 shadow-2xl">
          
          {/* Leading Icon */}
          <div className="pl-3 pr-2 text-cyan-600 dark:text-cyan-400">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Input field */}
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              currentContext 
                ? `Ask follow-up (e.g. "Now show salinity" or "Compare with Arabian Sea")...` 
                : `Try: "Show temperature in Bay of Bengal" or "Why is salinity low near Chennai?"`
            }
            className="w-full bg-transparent border-0 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base px-2 py-2.5 focus:outline-none focus:ring-0 font-medium"
          />

          {/* Voice Search Simulation */}
          <button
            type="button"
            onClick={handleVoiceSim}
            title="Voice query simulation"
            className={`p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-ocean-800 transition-colors ${
              isListening ? 'text-coral-neon animate-pulse bg-coral-500/20' : ''
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-cyan whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-ocean-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Analyzing...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span>Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

        </div>

        {/* Active Context Memory Pill */}
        {currentContext && (
          <div className="flex items-center justify-between mt-2 px-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Context: <strong>{currentContext.regionName}</strong></span>
              <span>•</span>
              <span>Float <strong>#{currentContext.selectedFloat?.wmo}</strong></span>
              {currentContext.isComparison && (
                <span> ↔ <strong>{currentContext.compareRegionName}</strong></span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setInputVal('');
                onSearch("Show temperature in Bay of Bengal");
              }}
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Context</span>
            </button>
          </div>
        )}
      </form>

      {/* Suggested Query Chips */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-650 dark:text-slate-400 mb-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Suggested Oceanographic Questions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(sq.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-ocean-900/80 hover:bg-slate-100 dark:hover:bg-ocean-800 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-200 border border-slate-200 dark:border-slate-700/60 hover:border-cyan-400/50 dark:hover:border-cyan-500/40 transition-all hover:scale-[1.02] shadow-sm"
            >
              <span>{sq.icon}</span>
              <span>{sq.text}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
