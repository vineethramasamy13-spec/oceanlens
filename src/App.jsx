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
import { ARGO_FLOATS } from './data/argoDataset';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('ai-explorer');
  const [isQuickReportOpen, setIsQuickReportOpen] = useState(false);
  const [quickReportAnalysis, setQuickReportAnalysis] = useState(null);
  const [argoFloats, setArgoFloats] = useState(ARGO_FLOATS);

  useEffect(() => {
    // Add default dark mode class on mount
    document.documentElement.classList.add('dark');
  }, []);

  // Background Live Drift Simulation (Task 2)
  useEffect(() => {
    const interval = setInterval(() => {
      setArgoFloats(prevFloats => {
        return prevFloats.map(float => {
          // Plausible drift nudge along current coordinates: ±0.003 degrees
          const latNudge = (Math.random() - 0.5) * 0.006;
          const lonNudge = (Math.random() - 0.5) * 0.006;
          
          const newLat = Number((float.lat + latNudge).toFixed(4));
          const newLon = Number((float.lon + lonNudge).toFixed(4));

          // Nudge active trajectory endpoint
          let updatedTrajectory = [...(float.trajectory || [])];
          if (updatedTrajectory.length > 0) {
            const lastIdx = updatedTrajectory.length - 1;
            updatedTrajectory[lastIdx] = {
              ...updatedTrajectory[lastIdx],
              lat: newLat,
              lon: newLon
            };
          }

          // Fluctuate upper layer CTD sensors slightly (temp: ±0.04°C, salinity: ±0.01 PSU, oxygen: ±0.4)
          const updatedProfile = float.profile.map((p, idx) => {
            if (idx < 6) { // Only fluctuate the top 6 layers (depth <= 100m)
              const tempVar = (Math.random() - 0.5) * 0.08;
              const salVar = (Math.random() - 0.5) * 0.02;
              const o2Var = (Math.random() - 0.5) * 0.8;
              return {
                ...p,
                temp: Number((p.temp + tempVar).toFixed(2)),
                salinity: Number((p.salinity + salVar).toFixed(3)),
                oxygen: Number((p.oxygen + o2Var).toFixed(1))
              };
            }
            return p;
          });

          return {
            ...float,
            lat: newLat,
            lon: newLon,
            trajectory: updatedTrajectory,
            profile: updatedProfile
          };
        });
      });
    }, 35000); // 35 seconds drift
    return () => clearInterval(interval);
  }, []);

  const handleOpenQuickReport = async () => {
    try {
      const result = await processOceanQuery("Show temperature and salinity in Bay of Bengal", null, argoFloats);
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
        {activePage === 'ai-explorer' && <AiExplorer floats={argoFloats} />}
        {activePage === 'ai-chatbot' && <AiChat />}
        {activePage === 'ocean-map' && <OceanMapView floats={argoFloats} />}
        {activePage === 'data-explorer' && <DataExplorer floats={argoFloats} />}
        {activePage === 'ocean-reports' && <OceanReports floats={argoFloats} />}
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
            <span>Live Sea Surface Data • Representative ARGO Profiles • Copernicus & GOOS Reference</span>
          </div>

        </div>
      </footer>
      )}

    </div>
  );
}
