import React, { useState } from 'react';
import { FileText, Download, Printer, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Waves, Calendar, Compass, Layers } from 'lucide-react';
import ReportGeneratorModal from '../components/ReportGeneratorModal';
import { processOceanQuery } from '../utils/aiQueryEngine';
import { ARGO_REGIONS } from '../data/argoDataset';

export default function OceanReports() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [loading, setLoading] = useState(false);

  const curatedReports = [
    {
      id: 'REP-BOB-2026-01',
      title: 'Monsoon Stratification & Freshwater Capping in Bay of Bengal',
      region: 'Bay of Bengal (Northern Basin)',
      regionId: 'bay_of_bengal',
      query: 'Show salinity in northern Bay of Bengal near Ganges mouth',
      date: 'August 2026',
      summary: 'Analysis of river runoff from the Ganges-Brahmaputra system delivering 1.6 × 10¹² m³/year, creating a 25m freshwater barrier layer and intense near-surface halocline.',
      keyFinding: 'Salinity drops to 30.8 PSU at surface with 12m barrier layer trapping solar heat.',
      tag: 'Freshwater Dynamics',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      id: 'REP-AS-2026-02',
      title: 'Arabian Sea High Salinity Water (ASHSW) & Evaporative Forcing',
      region: 'Central Arabian Sea',
      regionId: 'arabian_sea',
      query: 'Show salinity and temperature in central Arabian Sea',
      date: 'August 2026',
      summary: 'Assessment of intense evaporative cooling (>1.5m/year net evaporation) driving surface salinity up to 36.65 PSU and generating deep convective mixed layers (~50m).',
      keyFinding: 'Deep MLD of 50m and dense ASHSW formation sinking into intermediate depths.',
      tag: 'Thermohaline Circulation',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'REP-OMZ-2026-03',
      title: 'Arabian Sea Oxygen Minimum Zone (OMZ) Hydrographic Profile',
      region: 'Eastern Arabian Sea (Konkan Shelf)',
      regionId: 'arabian_sea',
      query: 'Show dissolved oxygen profile in Arabian Sea OMZ',
      date: 'August 2026',
      summary: 'Subsurface hypoxic core detection using BGC-Argo Aanderaa optode sensors, observing dissolved oxygen depletion below 5 μmol/kg between 150m and 400m depth.',
      keyFinding: 'Oxygen levels plummet to 3 μmol/kg at 300m depth, driving intense denitrification.',
      tag: 'Biogeochemical Argo',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'REP-SO-2026-04',
      title: 'Antarctic Polar Front Temperature Inversion & Deep SOLO CTD',
      region: 'Southern Ocean (Antarctic)',
      regionId: 'southern_ocean',
      query: 'Show Antarctic polar front temperature profile',
      date: 'August 2026',
      summary: 'Subpolar stratification featuring near-freezing surface water (1.8°C) overlying warmer, saltier circumpolar deep water (2.3°C at 300m) measured by CSIRO float.',
      keyFinding: 'Clear mesopelagic thermal inversion where subsurface water is warmer than the surface.',
      tag: 'Polar Oceanography',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleLaunchReport = async (queryText) => {
    setLoading(true);
    try {
      const analysis = await processOceanQuery(queryText);
      setSelectedCaseStudy(analysis);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Oceanographic Analysis Reports
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Publication-grade scientific synthesis, multi-platform comparisons, and downloadable hydrographic dossiers.
          </p>
        </div>

        {/* Generate Custom Report for any region */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLaunchReport("Show temperature in Bay of Bengal")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 shadow-glow-cyan transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Synthesizing...' : 'Generate New Assessment'}</span>
          </button>
        </div>
      </div>

      {/* Curated Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {curatedReports.map((rep) => (
          <div
            key={rep.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:scale-[1.01] shadow-xl"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {rep.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">{rep.date}</span>
              </div>

              {/* Title & Region */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                {rep.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-3">📍 {rep.region}</p>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {rep.summary}
              </p>

              {/* Key Empirical Finding */}
              <div className="p-3 rounded-xl bg-ocean-950/80 border border-slate-800/80 text-xs text-cyan-200 font-medium flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span><strong>Key Empirical Finding:</strong> {rep.keyFinding}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-[11px] font-mono text-slate-400">ID: {rep.id}</span>
              
              <button
                onClick={() => handleLaunchReport(rep.query)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold bg-ocean-900 hover:bg-cyan-500 text-cyan-300 hover:text-ocean-950 border border-cyan-500/30 transition-all shadow-sm"
              >
                <span>View Full Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Report Modal */}
      {selectedCaseStudy && (
        <ReportGeneratorModal
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          analysisResult={selectedCaseStudy}
        />
      )}

    </div>
  );
}
