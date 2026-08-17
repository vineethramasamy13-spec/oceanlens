import React, { useState } from 'react';
import { Search, Sparkles, Mic, ArrowRight, RotateCcw } from 'lucide-react';
import { SUGGESTED_QUERIES } from '../data/argoDataset';
import { useTranslation } from '../utils/translations';

export default function AiSearchHero({ onSearch, currentQuery, isLoading, currentContext }) {
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { t, lang } = useTranslation();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSearch(inputVal.trim());
  };

  const handleChipClick = (queryText) => {
    setInputVal(queryText);
    onSearch(queryText);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback to simulation
      setIsListening(true);
      setTimeout(() => {
        const text = "Compare salinity between Bay of Bengal and Arabian Sea";
        setInputVal(text);
        setIsListening(false);
        onSearch(text);
      }, 1200);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInputVal(speechToText);
      setIsListening(false);
      onSearch(speechToText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto pt-2 pb-6 px-4">
      {/* Title & Tagline */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/60 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-medium mb-3 shadow-sm dark:shadow-glow-cyan animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          <span>{lang === 'en' ? 'Conversational Ocean Intelligence Layer' : 'संवादात्मक समुद्री सूचना प्रणाली'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          {lang === 'en' ? (
            <>Ask anything about the world's <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-500 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">oceans</span></>
          ) : (
            <>दुनिया के <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-500 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">महासागरों</span> के बारे में कुछ भी पूछें</>
          )}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
          {lang === 'en' 
            ? 'Natural English queries converted into direct ARGO robotic float CTD analysis, depth profiles, and bathymetric maps.'
            : 'प्राकृतिक भाषा प्रश्नों को सीधे आरगो रोबोटिक फ्लोट सीटीडी विश्लेषण, गहराई प्रोफाइल और मानचित्रों में बदलें।'}
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
            disabled={isLoading}
            placeholder={
              currentContext 
                ? (lang === 'en' ? 'Ask follow-up (e.g. "Now show salinity" or "Compare with Arabian Sea")...' : 'आगे पूछें (जैसे: "अब लवणता दिखाएं" या "अरब सागर से तुलना करें")...') 
                : t('search_placeholder')
            }
            className="w-full bg-transparent border-0 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500/10 focus-visible:ring-2 focus-visible:ring-cyan-400 font-medium disabled:opacity-50"
            aria-label="Search ocean coordinates, float IDs, or ask ocean questions"
          />

          {/* Voice Search (Web Speech API) */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            disabled={isLoading}
            title={lang === 'en' ? "Voice search input" : "आवाज से खोजें"}
            aria-label={lang === 'en' ? "Voice search input" : "आवाज से खोजें"}
            className={`p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-ocean-800 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none shrink-0 ${
              isListening ? 'text-rose-500 bg-rose-500/20 animate-pulse border border-rose-500/30' : ''
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            aria-label="Submit query"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-cyan whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-ocean-950 border-t-transparent rounded-full animate-spin"></span>
                <span>{lang === 'en' ? 'Analyzing...' : 'विश्लेषण...'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span>{t('btn_analyze')}</span>
                <ArrowRight className="w-4 h-4 animate-in slide-in-from-left-2" />
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
              className="text-slate-450 hover:text-cyan-300 flex items-center gap-1 text-[11px] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded px-1"
              aria-label="Reset Search Context"
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
          <span>{lang === 'en' ? 'Suggested Oceanographic Questions:' : 'सुझाए गए महासागरीय प्रश्न:'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((sq, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleChipClick(sq.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-ocean-900/80 hover:bg-slate-100 dark:hover:bg-ocean-800 text-slate-600 dark:text-slate-350 hover:text-cyan-600 dark:hover:text-cyan-200 border border-slate-200 dark:border-slate-700/60 hover:border-cyan-400/50 dark:hover:border-cyan-500/40 transition-all hover:scale-[1.02] shadow-sm disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label={`Ask suggested query: ${sq.text}`}
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
