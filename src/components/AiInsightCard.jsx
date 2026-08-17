import React, { useState } from 'react';
import { AlertTriangle, Sparkles, ShieldCheck, FileText, Database, ArrowRight, Activity, Info, CheckCircle2, ChevronRight, Layers, Radio, Waves, Wind, RefreshCw } from 'lucide-react';
import { calculateTCHP, calculateENSOAnomaly } from '../utils/oceanPhysics';
import { analyzeOceanAnomalies } from '../utils/oceanAnomalies';
import { useTranslation } from '../utils/translations';

export default function AiInsightCard({ 
  analysisResult, 
  onOpenReport, 
  onOpenDataTable,
  showTSDiagram,
  onToggleTSDiagram,
  onRefreshLive,
  secondsSinceUpdate = 0,
  isLoading = false
}) {
  if (!analysisResult) return null;

  const { t, lang } = useTranslation();

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
  const anomalies = selectedFloat ? analyzeOceanAnomalies(selectedFloat.profile) : null;
  const isLive = liveEarthData?.isLive ?? false;

  let confidenceScore = 'High';
  let confidencePercent = '96%';
  if (!isLive) {
    confidenceScore = 'Medium';
    confidencePercent = '78%';
  }
  if (!selectedFloat || selectedFloat.profile.length < 5) {
    confidenceScore = 'Low';
    confidencePercent = '45%';
  }

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
                {t('nav_explorer')}
              </h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 ${
                isLive ? 'bg-teal-500/20 text-teal-350 border-teal-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                {isLive ? t('live_feed') : t('estimated_data')}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Live CTD + Satellite stream for ' : 'लाइव सीटीडी + सैटेलाइट स्ट्रीम - '} <strong className="text-cyan-300">{regionName}</strong>
              {isComparison && <span> {lang === 'en' ? 'compared with' : 'तुलना में'} <strong className="text-coral-400">{compareRegionName}</strong></span>}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTSDiagram}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
              showTSDiagram 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                : 'bg-ocean-900 text-slate-300 border-slate-700 hover:border-purple-500/40'
            }`}
            aria-label="Toggle Temperature-Salinity diagram"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>T-S Space</span>
          </button>

          <button
            onClick={onOpenDataTable}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-ocean-900 hover:bg-ocean-800 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="View raw data matrix"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Raw Data</span>
          </button>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-ocean-950 shadow-glow-cyan transition-all hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Generate and print PDF report"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('btn_print')}</span>
          </button>
        </div>
      </div>

      {/* Live Earth Telemetry Strip (Real satellite conditions) */}
      {liveEarthData && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono w-full">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  liveEarthData.isLive ? 'bg-cyan-400' : 'bg-amber-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  liveEarthData.isLive ? 'bg-cyan-500' : 'bg-amber-500'
                }`}></span>
              </span>
              <span>{liveEarthData.isLive ? 'Live Earth Satellite Stream' : 'Calibrated Satellite Estimates'}</span>
            </div>

            {/* Polling Timer & Refresh Button */}
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="text-slate-500">
                {secondsSinceUpdate < 60
                  ? `${secondsSinceUpdate}s ago`
                  : `${Math.floor(secondsSinceUpdate / 60)}m ago`}
              </span>
              <button
                type="button"
                onClick={onRefreshLive}
                disabled={isLoading}
                title="Refresh Live Data"
                className="p-1 rounded bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/20 text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                aria-label="Refresh Live Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-350 text-[11px] w-full sm:w-auto">
            <div>
              <span className="text-slate-500 mr-1">SST:</span>
              <strong className="text-cyan-400">{liveEarthData.sst}°C</strong>
            </div>
            <div>
              <span className="text-slate-500 mr-1">Waves:</span>
              <strong className="text-teal-400">{liveEarthData.waveHeight}m</strong>
            </div>
            <div>
              <span className="text-slate-500 mr-1">Current:</span>
              <strong className="text-blue-400">{liveEarthData.currentVelocity} km/h @ {liveEarthData.currentDirection}°</strong>
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

      {/* AI Anomaly Warnings & Fisheries Advisory Section */}
      {anomalies && (
        <div className="space-y-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-bold text-white border-l-4 border-amber-500 pl-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{t('anomaly_alerts')}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Anomaly Alerts List */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Anomaly Flags</span>
              {anomalies.alerts.length > 0 ? (
                <div className="space-y-1.5">
                  {anomalies.alerts.map((alert) => (
                    <div key={alert.id} className="flex gap-2 items-start p-2 rounded bg-rose-500/5 border border-rose-500/25 text-[11px] text-rose-350">
                      <span>⚠️</span>
                      <div>
                        <strong className="block text-rose-300 font-bold text-[10px]">{alert.title}</strong>
                        <p className="text-[9.5px] text-slate-400 leading-normal">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 p-2 rounded bg-emerald-500/5 border border-emerald-500/20 text-[10px] text-emerald-450 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450" />
                  <span>{t('no_anomalies')}</span>
                </div>
              )}
            </div>
            
            {/* Fisheries advisories */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{t('fisheries_advisory')}</span>
                <span className="text-[9px] text-teal-400 font-semibold font-mono">SIH Bio-Decision Layer</span>
              </div>
              <div className="space-y-2 text-[10.5px]">
                <div className="flex gap-2">
                  <span className={`px-1.5 py-0.2 rounded font-bold text-[8.5px] uppercase tracking-wide h-fit shrink-0 ${
                    anomalies.fisheriesAdvisory.pelagicSuitability === 'Excellent' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    anomalies.fisheriesAdvisory.pelagicSuitability === 'Unfavorable' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {anomalies.fisheriesAdvisory.pelagicSuitability}
                  </span>
                  <div>
                    <strong className="text-slate-355 block text-[10px]">{t('tuna_suitability')}</strong>
                    <span className="text-[9.5px] text-slate-400 leading-relaxed block font-sans">{anomalies.fisheriesAdvisory.pelagicDescription}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1.5 border-t border-slate-850">
                  <span className={`px-1.5 py-0.2 rounded font-bold text-[8.5px] uppercase tracking-wide h-fit shrink-0 ${
                    anomalies.fisheriesAdvisory.demersalSuitability === 'Favorable' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    anomalies.fisheriesAdvisory.demersalSuitability === 'Severe Danger' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {anomalies.fisheriesAdvisory.demersalSuitability}
                  </span>
                  <div>
                    <strong className="text-slate-355 block text-[10px]">{t('demersal_suitability')}</strong>
                    <span className="text-[9.5px] text-slate-400 leading-relaxed block font-sans">{anomalies.fisheriesAdvisory.demersalDescription}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div className="flex items-center flex-wrap gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400 font-bold shrink-0" />
            <span><strong>{t('data_source')}:</strong> {provenance.source}</span>
            {isLive ? (
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider font-mono animate-pulse">
                {t('live_feed')}
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-350 border border-amber-500/30 px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider font-mono">
                {t('estimated_data')}
              </span>
            )}
            
            <span className="text-slate-600">•</span>
            
            <span className="flex items-center gap-1">
              <span className="text-slate-500">{t('ai_confidence')}:</span>
              <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] font-mono ${
                confidenceScore === 'High' ? 'bg-emerald-500/20 text-emerald-350 border border-emerald-500/30' :
                confidenceScore === 'Medium' ? 'bg-amber-500/20 text-amber-350 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-350 border border-rose-500/30'
              }`}>
                {confidenceScore} ({confidencePercent})
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>Floats: <strong>{provenance.wmoIds.map(w => `#${w}`).join(', ')}</strong></span>
            <span>•</span>
            <span>Observations: <strong className="text-cyan-300">{totalObservations.toLocaleString()} points</strong></span>
            <span>•</span>
            <span className="text-teal-400 font-semibold">{t('verified')}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
