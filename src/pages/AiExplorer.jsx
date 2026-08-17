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
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
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
        <div className="flex items-center justify-center p-12 glass-panel rounded-2xl text-cyan-400">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting to ARGO Global Ocean Observing System & Real-Time Satellite Feed...</span>
          </div>
        </div>
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
