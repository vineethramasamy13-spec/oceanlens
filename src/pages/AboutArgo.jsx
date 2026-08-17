import React, { useState } from 'react';
import { Info, Waves, Radio, Activity, Compass, ShieldCheck, Cpu, ArrowDown, ArrowUp, RefreshCw, Sparkles, BookOpen } from 'lucide-react';

export default function AboutArgo() {
  const [activeCycleStep, setActiveCycleStep] = useState(3);

  const cycleSteps = [
    {
      step: 1,
      title: '1. Surface Satellite Transmission',
      depth: '0 meters (Surface)',
      duration: '15 - 30 minutes',
      icon: Radio,
      color: 'text-cyan-400',
      description: 'The float reaches the sea surface, inflates its external bladder, establishes GPS positioning, and transmits CTD measurements via Iridium satellite telemetry to GDAC assembly centers.'
    },
    {
      step: 2,
      title: '2. Descent to Parking Depth',
      depth: '1,000 meters (Mesopelagic)',
      duration: '6 hours descent',
      icon: ArrowDown,
      color: 'text-blue-400',
      description: 'Hydraulic pumps deflate the internal oil bladder, increasing the float density to sink precisely to the 1,000 dbar neutral buoyancy parking depth.'
    },
    {
      step: 3,
      title: '3. 9-Day Subsurface Neutral Drift',
      depth: '1,000 meters',
      duration: '9 days (~216 hours)',
      icon: Compass,
      color: 'text-teal-400',
      description: 'The robotic float passively drifts with ocean currents at 1,000m depth, mapping deep ocean velocity streamlines away from surface wave turbulence.'
    },
    {
      step: 4,
      title: '4. Deep Descent to Profiling Base',
      depth: '2,000 meters (Bathypelagic)',
      duration: '3 hours descent',
      icon: ArrowDown,
      color: 'text-purple-400',
      description: 'On day 10, the float pumps out a small volume of oil to sink to its deepest observation level (2,000 dbar / 6,000 dbar for Deep Argo).'
    },
    {
      step: 5,
      title: '5. Profiling Ascent & CTD Data Collection',
      depth: '2,000m → 0m (Continuous Cast)',
      duration: '6 hours ascent',
      icon: ArrowUp,
      color: 'text-emerald-400',
      description: 'The float ascends smoothly at ~10 cm/s. High-precision CTD sensors record Temperature, Salinity, Pressure, and Dissolved Oxygen every 1-2 meters, building the vertical profile.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Global Ocean Observing Science Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          What is the <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">ARGO Ocean Fleet</span>?
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          ARGO is a global array of nearly 4,000 autonomous robotic floats measuring temperature, salinity, and biogeochemistry across the upper 2,000 meters of the global ocean.
        </p>
      </div>

      {/* The 3-Pillar Conceptual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
            🌊
          </div>
          <h3 className="text-base font-bold text-white">1. Robotic Ocean Drifters</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Unlike surface buoys or research ships, ARGO floats freely adjust their buoyancy using internal hydraulic bladders, diving to 2,000m and surfacing every 10 days autonomously for 4 to 7 years.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl">
            🔬
          </div>
          <h3 className="text-base font-bold text-white">2. High-Precision CTD Sensors</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Floats measure Conductivity (Salinity ±0.003 PSU), Temperature (±0.002°C), and Pressure (±2 dbar). Modern BGC-Argo floats also measure Dissolved Oxygen, pH, Nitrate, and Chlorophyll.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl">
            🤖
          </div>
          <h3 className="text-base font-bold text-white">3. The OceanLens AI Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ARGO data is stored in complex binary NetCDF scientific files. OceanLens AI bridges this gap, allowing anyone to query global ocean telemetry in natural English with instant maps and charts.
          </p>
        </div>

      </div>

      {/* Interactive 10-Day Dive Cycle Explorer */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                The 10-Day Robotic Float Profiling Cycle
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Click any phase below to examine how ARGO robots measure vertical water column structure.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-ocean-950 p-1 rounded-xl border border-slate-800">
            {cycleSteps.map(cs => (
              <button
                key={cs.step}
                onClick={() => setActiveCycleStep(cs.step - 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCycleStep === cs.step - 1
                    ? 'bg-cyan-500 text-ocean-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Step {cs.step}
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Showcase */}
        {(() => {
          const stepData = cycleSteps[activeCycleStep];
          const Icon = stepData.icon;
          return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-ocean-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-ocean-900/60 border border-slate-800 text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-3 shadow-glow-cyan">
                  <Icon className={`w-8 h-8 ${stepData.color}`} />
                </div>
                <span className="font-mono text-xs text-cyan-300 font-bold">{stepData.depth}</span>
                <span className="text-[11px] text-slate-400 mt-1">Duration: {stepData.duration}</span>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    PHASE {stepData.step} / 5
                  </span>
                  <h3 className="text-lg font-bold text-white">{stepData.title}</h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {stepData.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-1 rounded bg-ocean-900 border border-slate-800">Hydraulic Bladder: Active</span>
                  <span className="px-2 py-1 rounded bg-ocean-900 border border-slate-800">Iridium Telemetry: SBD</span>
                  <span className="px-2 py-1 rounded bg-ocean-900 border border-slate-800">Sampling Rate: 1 Hz CTD</span>
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      {/* Global Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">~3,900+</div>
          <div className="text-xs text-slate-400 mt-1">Active Floats in Global Ocean</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">2,500,000+</div>
          <div className="text-xs text-slate-400 mt-1">Hydrographic CTD Profiles</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">0 - 2000m</div>
          <div className="text-xs text-slate-400 mt-1">Observation Depth Span</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">100% Free</div>
          <div className="text-xs text-slate-400 mt-1">Open Access to Humanity</div>
        </div>
      </div>

    </div>
  );
}
