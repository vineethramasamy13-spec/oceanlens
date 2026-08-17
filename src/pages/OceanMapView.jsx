import React, { useState } from 'react';
import OceanMap from '../components/OceanMap';
import OceanProfileChart from '../components/OceanProfileChart';
import { ARGO_FLOATS, ARGO_REGIONS } from '../data/argoDataset';
import { Radio, Search, Filter, Compass, Layers, Activity, ChevronRight, Info, Eye } from 'lucide-react';

export default function OceanMapView() {
  const [selectedFloat, setSelectedFloat] = useState(ARGO_FLOATS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState('bay_of_bengal');

  const filteredFloats = ARGO_FLOATS.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.wmo.includes(searchQuery) ||
    f.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegionSelect = (regionId) => {
    setSelectedRegionId(regionId);
    const floatInRegion = ARGO_FLOATS.find(f => f.regionId === regionId);
    if (floatInRegion) setSelectedFloat(floatInRegion);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header & Regional Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Global ARGO Float Fleet Telemetry
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time positioning and 10-day CTD dive trajectory tracking across ocean basins.
          </p>
        </div>

        {/* Region Quick Filters - Scrollable & Compact */}
        <div className="w-full overflow-x-auto scrollbar-none py-1">
          <div className="flex gap-1 bg-ocean-900/80 p-1 rounded-xl border border-slate-800 text-[11px] w-max">
            {ARGO_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => handleRegionSelect(r.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedRegionId === r.id
                    ? 'bg-cyan-500 text-ocean-950 font-bold shadow-glow-cyan'
                    : 'text-slate-300 hover:text-white hover:bg-ocean-800'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map + Float Fleet Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Full Interactive Map */}
        <div className="lg:col-span-8 space-y-4">
          <OceanMap
            selectedFloat={selectedFloat}
            allFloats={ARGO_FLOATS}
            activeRegionId={selectedRegionId}
            onSelectFloat={(float) => setSelectedFloat(float)}
            height="560px"
          />

          {/* Quick Snapshot Profile Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ocean-900/60 p-4 rounded-xl border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 font-sans block">Selected Platform</span>
              <strong className="text-cyan-300 text-sm">{selectedFloat.name}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-550 dark:text-slate-400 font-sans block">WMO Identifier</span>
              <strong className="text-slate-800 dark:text-white text-sm">#{selectedFloat.wmo}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-550 dark:text-slate-400 font-sans block">Current Cycle</span>
              <strong className="text-teal-400 text-sm">Cycle {selectedFloat.cycle}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block">Battery Level</span>
              <strong className="text-emerald-400 text-sm">{selectedFloat.batteryRemaining}</strong>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Float List & Inspector */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Float Search Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Active Float Directory ({filteredFloats.length})
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-teal-500/20 text-teal-300">
                100% Operational
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search WMO, region, or float name..."
                className="w-full bg-ocean-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
              />
            </div>

            {/* Scrollable Float Cards */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredFloats.map((float) => {
                const isSelected = selectedFloat.wmo === float.wmo;
                return (
                  <div
                    key={float.wmo}
                    onClick={() => {
                      setSelectedFloat(float);
                      setSelectedRegionId(float.regionId);
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/50 shadow-glow-cyan'
                        : 'bg-ocean-950/60 border-slate-800 hover:border-slate-700 hover:bg-ocean-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-800 dark:text-white">#{float.wmo}</span>
                      <span className="text-[10px] font-mono text-slate-400">{float.region}</span>
                    </div>
                    <p className="text-xs text-cyan-300 truncate font-medium">{float.name}</p>
                    <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-slate-400">
                      <span>📍 {float.lat.toFixed(1)}°N, {float.lon.toFixed(1)}°E</span>
                      <span className="text-teal-400 font-bold">{float.profile[0]?.temp}°C SST</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Float Depth Profile Mini Chart */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live CTD Vertical Profile</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-300">WMO #{selectedFloat.wmo}</span>
            </div>

            <OceanProfileChart
              selectedFloat={selectedFloat}
              activeVariable="temperature"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
