import React from 'react';
import { Waves, Sparkles, AlertCircle, Compass } from 'lucide-react';

export default function MarineLifeVisualizer({ selectedFloat }) {
  if (!selectedFloat || !selectedFloat.profile) return null;

  const profile = selectedFloat.profile;

  // Find Oxygen Minimum Zone (OMZ) range (Oxygen < 60 umol/kg)
  let omzStart = null;
  let omzEnd = null;
  let minO2 = 999;
  let minO2Depth = null;

  profile.forEach(p => {
    if (p.oxygen !== undefined) {
      if (p.oxygen < minO2) {
        minO2 = p.oxygen;
        minO2Depth = p.depth;
      }
      if (p.oxygen < 60) {
        if (omzStart === null) omzStart = p.depth;
        omzEnd = p.depth;
      }
    }
  });

  const hasOMZ = omzStart !== null;

  // Key measurements
  const surfaceTemp = profile[0]?.temp || 'N/A';
  const surfaceChl = profile[0]?.chl || 0.1;
  const deepO2 = profile[profile.length - 1]?.oxygen || 'N/A';

  return (
    <div className="w-full rounded-2xl glass-panel p-5 border border-cyan-500/20 shadow-2xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-ocean-950 shadow-glow-cyan">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-white">
              Marine Life Pelagic Zone Profiler
            </h3>
            <p className="text-xs text-slate-400">
              Biological boundaries mapped to active CTD & Oxygen profiles
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Oxygen Warning Callout */}
      {hasOMZ && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-350 font-medium animate-pulse-slow">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Hypoxic Oxygen Minimum Zone (OMZ) Detected:</strong>
            <p className="mt-0.5 text-slate-350">
              Dissolved oxygen drops below 60 μmol/kg between <span className="text-amber-400 font-bold">{omzStart}m - {omzEnd}m</span>, reaching a minimum of <span className="text-coral-400 font-bold">{minO2} μmol/kg</span> at {minO2Depth}m. Deep-sea animals in this band must be adapted to survive near-anoxic conditions.
            </p>
          </div>
        </div>
      )}

      {/* Pelagic Zones Stack */}
      <div className="space-y-4 font-sans text-xs">
        
        {/* Zone 1: Epipelagic (0 - 200m) */}
        <div className="relative group p-4 rounded-xl border border-teal-500/20 bg-gradient-to-r from-teal-950/20 to-transparent hover:border-teal-500/40 transition-all">
          <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
            0m - 200m
          </div>
          <h4 className="text-sm font-bold text-teal-300 flex items-center gap-1.5 mb-1.5">
            ☀️ Photic Zone (Epipelagic)
          </h4>
          <p className="text-slate-350 leading-relaxed mb-3">
            The sunlit surface layer hosting 90% of marine life. High solar irradiance fuels primary productivity by microscopic phytoplankton.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-[10px] text-slate-400">
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 uppercase">Surface Temp</span>
              <strong className="text-teal-400 text-xs">{surfaceTemp}°C</strong>
            </div>
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 uppercase">Chlorophyll-a</span>
              <strong className="text-emerald-400 text-xs">{surfaceChl} mg/m³</strong>
            </div>
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800 col-span-2 sm:col-span-1">
              <span className="block text-slate-500 uppercase">Key Habitats</span>
              <span className="text-white font-sans font-medium">Tuna, Billfish, Plankton</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Mesopelagic (200m - 1000m) */}
        <div className="relative group p-4 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/20 to-transparent hover:border-indigo-500/40 transition-all">
          <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            200m - 1000m
          </div>
          <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-1.5 mb-1.5">
            🌌 Twilight Zone (Mesopelagic)
          </h4>
          <p className="text-slate-350 leading-relaxed mb-3">
            Minimal sunlight penetrates here. Animals migrate vertically to the surface at night to feed (Diel Vertical Migration), forming the ocean's acoustic scatter layer.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-[10px] text-slate-400">
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 uppercase">Core OMZ Oxygen</span>
              <strong className="text-coral-400 text-xs">{minO2} μmol/kg</strong>
            </div>
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 uppercase">Pressure Load</span>
              <strong className="text-indigo-400 text-xs">Up to 100 atm</strong>
            </div>
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800 col-span-2 sm:col-span-1">
              <span className="block text-slate-500 uppercase">Key Habitats</span>
              <span className="text-white font-sans font-medium">Lanternfish, Squids, Siphonophores</span>
            </div>
          </div>
        </div>

        {/* Zone 3: Bathypelagic (1000m - 2000m+) */}
        <div className="relative group p-4 rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-950/20 to-transparent hover:border-purple-500/40 transition-all">
          <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
            1000m - 2000m
          </div>
          <h4 className="text-sm font-bold text-purple-300 flex items-center gap-1.5 mb-1.5">
            🌋 Midnight Zone (Bathypelagic)
          </h4>
          <p className="text-slate-350 leading-relaxed mb-3">
            Complete darkness and cold (average 2-4°C). Energy depends on "marine snow" (dead organic matter sinking from the photic zone).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-[10px] text-slate-400">
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 uppercase">Basal Temp</span>
              <strong className="text-purple-400 text-xs">{profile[profile.length - 1]?.temp}°C</strong>
            </div>
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800">
              <span className="block text-slate-500 uppercase">Abyssal Oxygen</span>
              <strong className="text-teal-400 text-xs">{deepO2} μmol/kg</strong>
            </div>
            <div className="bg-ocean-950/60 p-2 rounded border border-slate-800 col-span-2 sm:col-span-1">
              <span className="block text-slate-500 uppercase">Key Habitats</span>
              <span className="text-white font-sans font-medium">Anglerfish, Gulper Eels, Isopods</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
