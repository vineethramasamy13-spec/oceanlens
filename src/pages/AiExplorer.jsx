import React, { useState, useEffect } from 'react';
import AiSearchHero from '../components/AiSearchHero';
import OceanMap from '../components/OceanMap';
import OceanProfileChart from '../components/OceanProfileChart';
import TSDiagram from '../components/TSDiagram';
import AiInsightCard from '../components/AiInsightCard';
import DataTableModal from '../components/DataTableModal';
import ReportGeneratorModal from '../components/ReportGeneratorModal';
import MarineLifeVisualizer from '../components/MarineLifeVisualizer';
import SonarAcousticRefractor from '../components/SonarAcousticRefractor';
import { ARGO_FLOATS } from '../data/argoDataset';
import { processOceanQuery } from '../utils/aiQueryEngine';

export default function AiExplorer({ onSelectFloatGlobal }) {
  const [currentQuery, setCurrentQuery] = useState('Show temperature in Bay of Bengal');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeVariable, setActiveVariable] = useState('temperature');
  const [showTSDiagram, setShowTSDiagram] = useState(false);
  const [isDataTableOpen, setIsDataTableOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeVisualizerTab, setActiveVisualizerTab] = useState('physical');

  // Initialize query on mount
  useEffect(() => {
    let isMounted = true;
    processOceanQuery('Show temperature in Bay of Bengal').then(result => {
      if (isMounted) {
        setAnalysisResult(result);
        setActiveVariable(result.variable || 'temperature');
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleSearch = async (queryText) => {
    setIsLoading(true);
    setCurrentQuery(queryText);

    try {
      const result = await processOceanQuery(queryText, analysisResult);
      setAnalysisResult(result);
      setActiveVariable(result.variable || 'temperature');
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariableChange = async (newVar) => {
    setActiveVariable(newVar);
    if (!analysisResult) return;
    setIsLoading(true);
    try {
      const updated = await processOceanQuery(`Show ${newVar} in ${analysisResult.regionName}`, analysisResult);
      setAnalysisResult(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFloat = async (float) => {
    if (!analysisResult) return;
    setIsLoading(true);
    try {
      const updated = await processOceanQuery(`Show ${activeVariable} for float #${float.wmo} in ${float.region}`, analysisResult);
      setAnalysisResult(updated);
      if (onSelectFloatGlobal) onSelectFloatGlobal(float);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      
      {/* 1. Hero AI Search Section */}
      <AiSearchHero
        onSearch={handleSearch}
        currentQuery={currentQuery}
        isLoading={isLoading}
        currentContext={analysisResult}
      />

      {/* 2. Main Visualizations Split Dashboard */}
      {analysisResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Ocean Map */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <OceanMap
              selectedFloat={analysisResult.selectedFloat}
              compareFloat={analysisResult.compareFloat}
              allFloats={ARGO_FLOATS}
              activeRegionId={analysisResult.regionId}
              onSelectFloat={handleSelectFloat}
              height="440px"
            />

            {/* Optional T-S Diagram Card if toggled */}
            {showTSDiagram && (
              <TSDiagram
                selectedFloat={analysisResult.selectedFloat}
                compareFloat={analysisResult.compareFloat}
              />
            )}
          </div>

          {/* Right Column: Depth Profile Graph & AI Insight */}
          <div className={`lg:col-span-7 flex flex-col space-y-6 transition-all duration-300 ${
            isLoading ? 'opacity-60 pointer-events-none' : ''
          }`}>
            
            {isLoading && (
              <div className="w-full h-1 bg-slate-900/80 rounded-full overflow-hidden relative border border-slate-800">
                <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-500 to-teal-400 w-full shimmer-glow"></div>
              </div>
            )}

            {/* Exploration Focus Tabs */}
            <div className="flex p-1 bg-ocean-900/60 dark:bg-ocean-950/60 border border-slate-800 rounded-xl text-xs gap-1">
              <button
                type="button"
                onClick={() => setActiveVisualizerTab('physical')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all ${
                  activeVisualizerTab === 'physical'
                    ? 'bg-cyan-500 text-ocean-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📈 Physical Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveVisualizerTab('biology')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all ${
                  activeVisualizerTab === 'biology'
                    ? 'bg-cyan-500 text-ocean-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🐠 Marine Biology
              </button>
              <button
                type="button"
                onClick={() => setActiveVisualizerTab('acoustics')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all ${
                  activeVisualizerTab === 'acoustics'
                    ? 'bg-cyan-500 text-ocean-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔊 Sonar Sounding
              </button>
            </div>

            {/* Tab content switcher */}
            {activeVisualizerTab === 'physical' && (
              <OceanProfileChart
                selectedFloat={analysisResult.selectedFloat}
                compareFloat={analysisResult.compareFloat}
                activeVariable={activeVariable}
                onVariableChange={handleVariableChange}
              />
            )}

            {activeVisualizerTab === 'biology' && (
              <MarineLifeVisualizer selectedFloat={analysisResult.selectedFloat} />
            )}

            {activeVisualizerTab === 'acoustics' && (
              <SonarAcousticRefractor selectedFloat={analysisResult.selectedFloat} />
            )}

            {/* Grounded AI Oceanographic Insight & Evidence Card */}
            <AiInsightCard
              analysisResult={analysisResult}
              onOpenReport={() => setIsReportOpen(true)}
              onOpenDataTable={() => setIsDataTableOpen(true)}
              showTSDiagram={showTSDiagram}
              onToggleTSDiagram={() => setShowTSDiagram(!showTSDiagram)}
            />
          </div>

        </div>
      ) : (
        <DashboardSkeleton />
      )}

      {/* Data Table Modal */}
      {analysisResult && (
        <DataTableModal
          isOpen={isDataTableOpen}
          onClose={() => setIsDataTableOpen(false)}
          selectedFloat={analysisResult.selectedFloat}
          compareFloat={analysisResult.compareFloat}
        />
      )}

      {/* Report Generator Modal */}
      {analysisResult && (
        <ReportGeneratorModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          analysisResult={analysisResult}
        />
      )}

    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column Skeleton */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        {/* Map Placeholder */}
        <div className="w-full h-[440px] rounded-2xl border border-slate-800 bg-ocean-950/40 relative overflow-hidden flex flex-col items-center justify-center space-y-3">
          <div className="absolute inset-0 shimmer-glow opacity-30"></div>
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-cyan-400/45 text-xl font-bold relative z-10 animate-bounce">
            🗺️
          </div>
          <span className="text-[11px] font-mono text-slate-500 tracking-wider uppercase relative z-10">Initializing Geo-Spatial Map...</span>
        </div>
        {/* T-S space toggle */}
        <div className="h-24 rounded-2xl border border-slate-800 bg-ocean-950/20 relative overflow-hidden">
          <div className="absolute inset-0 shimmer-glow opacity-10"></div>
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        {/* Tabs Bar */}
        <div className="h-10 rounded-xl bg-ocean-900/40 border border-slate-800/80 p-1 flex gap-1">
          <div className="flex-1 rounded-lg bg-slate-800/40 shimmer-glow opacity-25"></div>
          <div className="flex-1 rounded-lg bg-slate-850/20"></div>
          <div className="flex-1 rounded-lg bg-slate-850/20"></div>
        </div>

        {/* Chart placeholder */}
        <div className="w-full h-72 rounded-2xl border border-slate-800 bg-ocean-950/40 relative overflow-hidden flex flex-col justify-end p-6 space-y-4">
          <div className="absolute inset-0 shimmer-glow opacity-20"></div>
          {/* Mock vertical grid lines */}
          <div className="flex justify-between items-end h-40 opacity-10 border-b border-slate-800 pb-2">
            <div className="w-1 h-32 bg-slate-700"></div>
            <div className="w-1 h-24 bg-slate-700"></div>
            <div className="w-1 h-36 bg-slate-700"></div>
            <div className="w-1 h-16 bg-slate-700"></div>
            <div className="w-1 h-28 bg-slate-700"></div>
          </div>
        </div>

        {/* Insight Card Placeholder */}
        <div className="w-full rounded-2xl border border-slate-800 bg-ocean-950/40 p-5 space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer-glow opacity-30"></div>
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/60"></div>
            <div className="space-y-2 flex-1">
              <div className="w-48 h-4 bg-slate-800/60 rounded"></div>
              <div className="w-32 h-3 bg-slate-800/40 rounded"></div>
            </div>
          </div>
          
          {/* Text lines */}
          <div className="space-y-2.5 pt-4">
            <div className="w-full h-3 bg-slate-850/50 rounded"></div>
            <div className="w-full h-3 bg-slate-850/50 rounded"></div>
            <div className="w-3/4 h-3 bg-slate-850/50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
