import React, { useState } from 'react';
import { Sparkles, ShieldCheck, FileText, Database, ArrowRight, Activity, Info, CheckCircle2, ChevronRight, Layers, Radio, Waves, Wind } from 'lucide-react';
import { calculateTCHP, calculateENSOAnomaly } from '../utils/oceanPhysics';

export default function AiInsightCard({ 
  analysisResult, 
  onOpenReport, 
  onOpenDataTable,
  showTSDiagram,
  onToggleTSDiagram 
}) {
  if (!analysisResult) return null;

  const {
    variableTitle,
    unit,
    regionName,
    isComparison,
    compareRegionName,
    selectedFloat,
    compareFloat,
    explanation,
    keyHighlights,
    scientificContext,
    mld,
    thermocline,
    barrierLayer,
    surfaceVal,
    deepVal,
    provenance,
    totalObservations,
    liveEarthData
  } = analysisResult;

  const tchpData = selectedFloat ? calculateTCHP(selectedFloat.profile) : null;
  const ensoData = selectedFloat ? calculateENSOAnomaly(selectedFloat.profile, selectedFloat.region) : null;

  return (
    <div className="w-full rounded-2xl glass-panel p-5 border border-cyan-500/25 shadow-2xl space-y-4">
      
      {/* Header: AI Insight Title & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-ocean-950 shadow-glow-cyan">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Grounded AI Ocean Analysis
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                Real Earth Data
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live CTD + Satellite stream for <strong className="text-cyan-300">{regionName}</strong>
              {isComparison && <span> compared with <strong className="text-coral-400">{compareRegionName}</strong></span>}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTSDiagram}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showTSDiagram 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                : 'bg-ocean-900 text-slate-300 border-slate-700 hover:border-purple-500/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>T-S Space</span>
          </button>

          <button
            onClick={onOpenDataTable}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-ocean-900 hover:bg-ocean-800 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-[1.02]"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Raw Data</span>
          </button>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 shadow-glow-cyan transition-all hover:scale-[1.02]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Live Earth Telemetry Strip (Real satellite conditions) */}
      {liveEarthData && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span>Live Earth Satellite Stream</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-[11px]">
            <div>
              <span className="text-slate-500 mr-1">Live SST:</span>
              <strong className="text-cyan-400">{liveEarthData.sst}°C</strong>
            </div>
            <div>
              <span className="text-slate-500 mr-1">Wave Ht:</span>
              <strong className="text-teal-400">{liveEarthData.waveHeight}m</strong>
            </div>
            <div>
              <span className="text-slate-500 mr-1">Current:</span>
              <strong className="text-blue-400">{liveEarthData.currentVelocity} km/h @ {liveEarthData.currentDirection}°</strong>
            </div>
            <div className="text-[10px] text-slate-400">
              UTC {new Date(liveEarthData.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Main Grounded Scientific Explanation */}
      <div className="bg-ocean-950/70 p-4 rounded-xl border border-slate-800 text-sm leading-relaxed text-slate-200">
        <p className="mb-3 font-normal text-slate-100">
          {explanation}
        </p>

        {/* Scientific Mechanism Callout */}
        {scientificContext && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 font-medium">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <span><strong>Physical Mechanism:</strong> {scientificContext}</span>
          </div>
        )}
      </div>

      {/* Key Observation Highlights Grid */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Observed Real-World Evidence:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {keyHighlights.map((hl, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 p-2.5 rounded-lg bg-ocean-900/60 border border-slate-800/80 text-slate-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <span>{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Numerical Metrics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">Sea Surface {variableTitle}</span>
          <span className="text-sm font-bold text-cyan-400">{surfaceVal} {unit}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">Mixed Layer (MLD)</span>
          <span className="text-sm font-bold text-teal-400">{mld} m</span>
        </div>
        <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">Thermocline Core</span>
          <span className="text-sm font-bold text-amber-400">{thermocline.thermoclineDepth} m</span>
        </div>
        <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">Abyssal Base (2000m)</span>
          <span className="text-sm font-bold text-slate-300">{deepVal} {unit}</span>
        </div>
      </div>

      {/* Advanced Climate Indicators (TCHP & ENSO) */}
      {selectedFloat && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-900/60 dark:bg-ocean-950/60 border border-slate-800 text-xs">
          {/* TCHP/Cyclone Fuel potential card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-350 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                Cyclone Heat Potential (TCHP)
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                tchpData.tchp > 85 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                tchpData.tchp > 45 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {tchpData.fuelCategory}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-ocean-900/40 p-2 rounded border border-slate-850">
                <span className="text-[9px] text-slate-500 block">D26 Isotherm Depth</span>
                <strong className="text-white text-xs">{tchpData.d26} meters</strong>
              </div>
              <div className="bg-ocean-900/40 p-2 rounded border border-slate-850">
                <span className="text-[9px] text-slate-500 block">Integrated Energy</span>
                <strong className="text-cyan-400 text-xs">{tchpData.tchp} kJ/cm²</strong>
              </div>
            </div>
            <div className="text-[10px] text-slate-450 leading-relaxed font-sans">
              *TCHP measures stored heat above 26°C. Values &gt; 45 kJ/cm² sustain rapid tropical cyclone intensification.
            </div>
          </div>

          {/* ENSO Anomaly card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-350 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-indigo-400" />
                ENSO Pacific Anomaly Index
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                ensoData ? (
                  ensoData.anomaly >= 0.75 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  ensoData.anomaly <= -0.75 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                ) : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {ensoData ? ensoData.state : 'Global Basins Standard'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-ocean-900/40 p-2 rounded border border-slate-850">
                <span className="text-[9px] text-slate-500 block">Warm Pool SST Anomaly</span>
                <strong className={ensoData ? (ensoData.anomaly >= 0 ? 'text-red-400 text-xs' : 'text-blue-400 text-xs') : 'text-slate-400 text-xs'}>
                  {ensoData ? `${ensoData.anomaly > 0 ? '+' : ''}${ensoData.anomaly}°C` : 'N/A'}
                </strong>
              </div>
              <div className="bg-ocean-900/40 p-2 rounded border border-slate-850">
                <span className="text-[9px] text-slate-500 block">Baseline Surface Temp</span>
                <strong className="text-white text-xs">{ensoData ? `${ensoData.baseline}°C` : `${surfaceVal}°C`}</strong>
              </div>
            </div>
            <div className="text-[10px] text-slate-450 leading-relaxed font-sans">
              {ensoData 
                ? "*Determined via upper warm pool layer heat anomalies. Positive values correspond to active El Niño transitions."
                : "*ENSO anomalies are calculated dynamically when a float profile is active in the Equatorial Pacific Warm Pool."
              }
            </div>
          </div>
        </div>
      )}

      {/* Transparent Data Provenance Badge */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 bg-ocean-900/40 p-3 rounded-xl border border-cyan-500/10">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span><strong>Data Source:</strong> {provenance.source}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>Floats: <strong>{provenance.wmoIds.map(w => `#${w}`).join(', ')}</strong></span>
            <span>•</span>
            <span>Observations: <strong className="text-cyan-300">{totalObservations.toLocaleString()} points</strong></span>
            <span>•</span>
            <span className="text-teal-400 font-semibold">{provenance.qualityStatus}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
