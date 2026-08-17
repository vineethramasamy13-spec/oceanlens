import React, { useEffect } from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Waves, Calendar, Compass, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportGeneratorModal({ isOpen, onClose, analysisResult }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#14b8a6', '#f43f5e', '#38bdf8']
        });
      } catch (e) {
        // ignore if canvas confetti is blocked
      }
    }
  }, [isOpen]);

  if (!isOpen || !analysisResult) return null;

  const {
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
    variableTitle,
    unit
  } = analysisResult;

  const reportId = `OL-REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const generationDate = new Date().toUTCString();

  const handlePrint = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    const mdContent = `# OCEAN DATA ANALYSIS REPORT: ${regionName.toUpperCase()}
**Document ID:** ${reportId}
**Date Generated:** ${generationDate}
**Primary Platform:** ARGO WMO #${selectedFloat.wmo} (${selectedFloat.name})
**Source:** ${provenance.source}

---

## 1. Executive Oceanographic Summary
${explanation}

## 2. Key Physical Oceanography Indicators
- **Sea Surface ${variableTitle}:** ${surfaceVal} ${unit}
- **Mixed Layer Depth (MLD):** ${mld} meters
- **Thermocline Core Depth:** ${thermocline.thermoclineDepth} meters
- **Maximum Thermal Gradient:** ${thermocline.maxGradient} °C/m
- **Barrier Layer Thickness:** ${barrierLayer.barrierLayerThickness} meters
- **Abyssal Base (2000m):** ${deepVal} ${unit}

## 3. Physical Mechanism
${scientificContext}

## 4. Observational Evidence
${keyHighlights.map(h => `- ${h}`).join('\n')}

## 5. Data Provenance & QC
- **Data Source:** ${provenance.source}
- **Floats Analyzed:** ${provenance.wmoIds.join(', ')}
- **Total Profile Observations:** ${totalObservations}
- **Quality Control:** ${provenance.qualityStatus}
- **Citation:** OceanLens AI Hydrographic Assessment Platform (2026).
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OceanLens_Report_${selectedFloat.wmo}.md`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] glass-panel-active rounded-2xl border border-cyan-500/30 flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-4">
        
        {/* Modal Controls Toolbar (No-Print) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-ocean-950/90 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white text-sm">Ocean Data Analysis Report Preview</span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-teal-500/20 text-teal-300">
              Ready to Print / PDF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-ocean-950 shadow-glow-cyan transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ocean-900 hover:bg-ocean-800 text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Scientific Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh] space-y-6 text-slate-200 font-sans print-clean bg-ocean-950/90">
          
          {/* Official Document Header */}
          <div className="border-b-2 border-cyan-500/40 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Waves className="w-6 h-6 text-cyan-400" />
                  <span className="font-black text-xl text-white tracking-wider">
                    OCEANLENS <span className="text-cyan-400">AI</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ocean Data Analysis Report
                </h1>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Autonomous CTD Profiling Assessment • Global ARGO GDAC / INCOIS Network
                </p>
              </div>

              <div className="text-right text-xs font-mono text-slate-400 space-y-1">
                <div className="text-cyan-300 font-bold">{reportId}</div>
                <div>{generationDate}</div>
                <div className="text-teal-400 font-semibold">STATUS: VERIFIED (QC: 1)</div>
              </div>
            </div>
          </div>

          {/* Target Domain Metadata Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ocean-900/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Target Basin</span>
              <strong className="text-cyan-300 text-sm">{regionName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Active Platform</span>
              <strong className="text-white text-sm">WMO #{selectedFloat.wmo}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Coordinates</span>
              <strong className="text-white font-mono">{selectedFloat.lat.toFixed(2)}°N, {selectedFloat.lon.toFixed(2)}°E</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Observations</span>
              <strong className="text-teal-400 font-mono">{totalObservations} Profile Points</strong>
            </div>
          </div>

          {/* Section 1: Executive Oceanographic Summary */}
          <div>
            <h2 className="text-base font-bold text-white border-l-4 border-cyan-400 pl-2.5 mb-2.5">
              1. Executive Oceanographic Summary
            </h2>
            <div className="p-4 rounded-xl bg-ocean-900/40 border border-slate-800 text-sm leading-relaxed text-slate-200">
              <p className="mb-3">{explanation}</p>
              {scientificContext && (
                <p className="text-xs text-cyan-200/90 font-medium bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/20">
                  <strong>Hydrodynamic Context:</strong> {scientificContext}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Physical Oceanography Metrics Matrix */}
          <div>
            <h2 className="text-base font-bold text-white border-l-4 border-cyan-400 pl-2.5 mb-2.5">
              2. Water Column Stratification & Metrics Matrix
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-ocean-900/80 text-slate-400 border-b border-slate-800 font-mono">
                    <th className="p-3">Parameter Indicator</th>
                    <th className="p-3 text-cyan-400">Observed Value</th>
                    <th className="p-3">Reference Depth</th>
                    <th className="p-3">Oceanographic Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="p-3 text-white font-medium">Sea Surface {variableTitle}</td>
                    <td className="p-3 text-cyan-300 font-bold">{surfaceVal} {unit}</td>
                    <td className="p-3 text-slate-400">0 - 10 dbar</td>
                    <td className="p-3 text-slate-300">Governs air-sea heat & moisture flux</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">Mixed Layer Depth (MLD)</td>
                    <td className="p-3 text-teal-300 font-bold">{mld} meters</td>
                    <td className="p-3 text-slate-400">Upper Column</td>
                    <td className="p-3 text-slate-300">ΔT = 0.2°C criteria (Surface convective zone)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">Thermocline Core Depth</td>
                    <td className="p-3 text-amber-300 font-bold">{thermocline.thermoclineDepth} meters</td>
                    <td className="p-3 text-slate-400">Pycnocline</td>
                    <td className="p-3 text-slate-300">Max vertical gradient: {thermocline.maxGradient} °C/m</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">Barrier Layer Thickness</td>
                    <td className="p-3 text-purple-300 font-bold">{barrierLayer.barrierLayerThickness} meters</td>
                    <td className="p-3 text-slate-400">Subsurface</td>
                    <td className="p-3 text-slate-300">{barrierLayer.hasBarrierLayer ? 'Active freshwater thermal barrier' : 'Homogeneous convective mixing'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">Abyssal Base Value</td>
                    <td className="p-3 text-slate-300 font-bold">{deepVal} {unit}</td>
                    <td className="p-3 text-slate-400">2000 dbar</td>
                    <td className="p-3 text-slate-300">Antarctic Deep Water ventilation standard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Observational Evidence Breakdown */}
          <div>
            <h2 className="text-base font-bold text-white border-l-4 border-cyan-400 pl-2.5 mb-2.5">
              3. Empirical Observational Evidence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {keyHighlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-ocean-900/60 border border-slate-800 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Data Provenance & Academic Citation */}
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span><strong>Data Assembly:</strong> {provenance.source}</span>
              </div>
              <span className="font-mono text-teal-400">{provenance.qualityStatus}</span>
            </div>
            <p className="bg-ocean-900/40 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
              <strong>Recommended Citation:</strong> OceanLens AI (2026). Autonomous ARGO Profiling Hydrographic Assessment for {regionName} (WMO #{selectedFloat.wmo}). Global Ocean Observing System (GOOS), INCOIS GDAC.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
