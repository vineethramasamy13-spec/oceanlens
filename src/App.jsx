import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AiExplorer from './pages/AiExplorer';
import AiChat from './pages/AiChat';
import OceanMapView from './pages/OceanMapView';
import DataExplorer from './pages/DataExplorer';
import OceanReports from './pages/OceanReports';
import AboutArgo from './pages/AboutArgo';
import ReportGeneratorModal from './components/ReportGeneratorModal';
import { processOceanQuery } from './utils/aiQueryEngine';
import { Waves, Heart, Radio, ShieldCheck, Github } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('ai-explorer');
  const [isQuickReportOpen, setIsQuickReportOpen] = useState(false);
  const [quickReportAnalysis, setQuickReportAnalysis] = useState(null);

  useEffect(() => {
    // Add default dark mode class on mount
    document.documentElement.classList.add('dark');
  }, []);

  const handleOpenQuickReport = async () => {
    try {
      const result = await processOceanQuery("Show temperature and salinity in Bay of Bengal");
      setQuickReportAnalysis(result);
      setIsQuickReportOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-ocean-950 text-slate-100 ocean-grid-bg selection:bg-cyan-500 selection:text-ocean-950 ${
      activePage === 'ai-chatbot' ? 'h-screen overflow-hidden' : ''
    }`}>
      
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        activeFloatsCount={17}
        onQuickReport={handleOpenQuickReport}
      />

      {/* Main Dynamic Page Content */}
      <main className={`flex-1 ${activePage === 'ai-chatbot' ? 'flex flex-col min-h-0 overflow-hidden' : ''}`}>
        {activePage === 'ai-explorer' && <AiExplorer />}
        {activePage === 'ai-chatbot' && <AiChat />}
        {activePage === 'ocean-map' && <OceanMapView />}
        {activePage === 'data-explorer' && <DataExplorer />}
        {activePage === 'ocean-reports' && <OceanReports />}
        {activePage === 'about-argo' && <AboutArgo />}
      </main>

      {/* Global Quick Report Modal */}
      {isQuickReportOpen && quickReportAnalysis && (
        <ReportGeneratorModal
          isOpen={isQuickReportOpen}
          onClose={() => setIsQuickReportOpen(false)}
          analysisResult={quickReportAnalysis}
        />
      )}

      {/* Modern Deep Ocean Footer */}
      {activePage !== 'ai-chatbot' && (
        <footer className="mt-16 border-t border-cyan-500/20 bg-ocean-950/90 py-8 px-4 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
              🌊
            </div>
            <div>
              <div className="font-extrabold text-white">
                OceanLens <span className="text-cyan-400">AI</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Ask the Ocean. Understand the Data.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
            <button onClick={() => setActivePage('ai-explorer')} className="hover:text-cyan-300 transition-colors">AI Explorer</button>
            <span>•</span>
            <button onClick={() => setActivePage('ai-chatbot')} className="hover:text-cyan-300 transition-colors">AI Chatbot</button>
            <span>•</span>
            <button onClick={() => setActivePage('ocean-map')} className="hover:text-cyan-300 transition-colors">Ocean Map</button>
            <span>•</span>
            <button onClick={() => setActivePage('data-explorer')} className="hover:text-cyan-300 transition-colors">Data Explorer</button>
            <span>•</span>
            <button onClick={() => setActivePage('ocean-reports')} className="hover:text-cyan-300 transition-colors">Ocean Reports</button>
            <span>•</span>
            <button onClick={() => setActivePage('about-argo')} className="hover:text-cyan-300 transition-colors">About ARGO</button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Real Earth Data • INCOIS GDAC • Copernicus Marine • GOOS Verified</span>
          </div>

        </div>
      </footer>
      )}

    </div>
  );
}
