import React, { useState } from 'react';
import { ARGO_FLOATS, ARGO_REGIONS } from '../data/argoDataset';
import { Database, Filter, Download, FileCode, Check, Search, Sliders, RefreshCw, Eye } from 'lucide-react';
import DataTableModal from '../components/DataTableModal';

export default function DataExplorer() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [maxDepthFilter, setMaxDepthFilter] = useState(2000);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(35);
  const [searchFilter, setSearchFilter] = useState('');
  const [inspectFloat, setInspectFloat] = useState(null);

  // Flatten all float profile observations
  const allObservations = ARGO_FLOATS.flatMap(float => 
    float.profile.map(p => ({
      ...p,
      floatWmo: float.wmo,
      floatName: float.name,
      region: float.region,
      regionId: float.regionId,
      lat: float.lat,
      lon: float.lon,
      cycle: float.cycle
    }))
  );

  // Apply filters
  const filteredObservations = allObservations.filter(obs => {
    if (selectedRegion !== 'all' && obs.regionId !== selectedRegion) return false;
    if (obs.depth > maxDepthFilter) return false;
    if (obs.temp < tempMin || obs.temp > tempMax) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const match = obs.floatWmo.includes(q) || obs.region.toLowerCase().includes(q) || obs.floatName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const exportAllCSV = () => {
    const headers = ['Float_WMO', 'Region', 'Cycle', 'Depth_m', 'Pressure_dbar', 'Temperature_C', 'Salinity_PSU', 'Oxygen_umol_kg', 'Density_kg_m3', 'SoundSpeed_m_s', 'QC'];
    const rows = filteredObservations.map(o => [
      o.floatWmo,
      `"${o.region}"`,
      o.cycle,
      o.depth,
      o.pressure,
      o.temp,
      o.salinity,
      o.oxygen,
      o.density,
      o.soundSpeed,
      o.qc
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `argo_oceanlens_filtered_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Summary Metrics
  const avgTemp = filteredObservations.length ? (filteredObservations.reduce((acc, o) => acc + o.temp, 0) / filteredObservations.length).toFixed(2) : 0;
  const avgSal = filteredObservations.length ? (filteredObservations.reduce((acc, o) => acc + o.salinity, 0) / filteredObservations.length).toFixed(2) : 0;
  const maxO2 = filteredObservations.length ? Math.max(...filteredObservations.map(o => o.oxygen)) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Scientific Ocean Data Explorer
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Filter, inspect, slice and export multi-parameter ARGO CTD profile observations.
          </p>
        </div>

        {/* Global CSV Download */}
        <button
          onClick={exportAllCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-ocean-950 shadow-glow-cyan transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Filtered CSV ({filteredObservations.length} rows)</span>
        </button>
      </div>

      {/* Filter Workbench Card */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hydrographic Query Filters</span>
          </span>

          <button
            onClick={() => {
              setSelectedRegion('all');
              setMaxDepthFilter(2000);
              setTempMin(0);
              setTempMax(35);
              setSearchFilter('');
            }}
            className="text-slate-400 hover:text-cyan-300 text-xs flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* Region Dropdown */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Ocean Basin / Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-ocean-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Ocean Basins (Global)</option>
              {ARGO_REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Depth Range Slider */}
          <div>
            <div className="flex justify-between text-slate-400 font-medium mb-1.5">
              <span>Max Depth Slice</span>
              <span className="text-cyan-400 font-mono font-bold">0 - {maxDepthFilter}m</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={maxDepthFilter}
              onChange={(e) => setMaxDepthFilter(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Temperature Range Slider */}
          <div>
            <div className="flex justify-between text-slate-400 font-medium mb-1.5">
              <span>Max Temp Threshold</span>
              <span className="text-teal-400 font-mono font-bold">{tempMax}°C</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={tempMax}
              onChange={(e) => setTempMax(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Free text search */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Search Float / Keyword</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="WMO ID, region, or sensor..."
                className="w-full bg-ocean-950/80 border border-slate-700/80 rounded-xl pl-8 pr-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Aggregate Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-ocean-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">Matching Observations</span>
          <span className="text-base font-bold text-cyan-400">{filteredObservations.length} Points</span>
        </div>
        <div className="p-3 rounded-xl bg-ocean-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">Mean In-Situ Temperature</span>
          <span className="text-base font-bold text-teal-400">{avgTemp} °C</span>
        </div>
        <div className="p-3 rounded-xl bg-ocean-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">Mean Salinity</span>
          <span className="text-base font-bold text-amber-400">{avgSal} PSU</span>
        </div>
        <div className="p-3 rounded-xl bg-ocean-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">Peak Dissolved Oxygen</span>
          <span className="text-base font-bold text-blue-400">{maxO2} μmol/kg</span>
        </div>
      </div>

      {/* Observation Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-ocean-950 text-slate-400 font-sans text-[11px] uppercase tracking-wider border-b border-slate-800">
                <th className="p-3">WMO ID</th>
                <th className="p-3">Region</th>
                <th className="p-3">Depth (m)</th>
                <th className="p-3 text-cyan-400">Temp (°C)</th>
                <th className="p-3 text-teal-400">Salinity (PSU)</th>
                <th className="p-3 text-blue-400">Oxygen (μmol/kg)</th>
                <th className="p-3">Density (kg/m³)</th>
                <th className="p-3">Sound Speed (m/s)</th>
                <th className="p-3 text-center">QC Status</th>
                <th className="p-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredObservations.slice(0, 50).map((row, idx) => (
                <tr key={idx} className="hover:bg-ocean-900/60 transition-colors">
                  <td className="p-3 font-bold text-white">#{row.floatWmo}</td>
                  <td className="p-3 text-slate-300 font-sans">{row.region}</td>
                  <td className="p-3 text-cyan-300 font-bold">{row.depth}</td>
                  <td className="p-3 text-cyan-400 font-semibold">{row.temp}</td>
                  <td className="p-3 text-teal-300 font-semibold">{row.salinity}</td>
                  <td className="p-3 text-blue-300">{row.oxygen}</td>
                  <td className="p-3 text-slate-300">{row.density}</td>
                  <td className="p-3 text-slate-400">{row.soundSpeed}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300">
                      <Check className="w-2.5 h-2.5" />
                      QC 1
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        const parentFloat = ARGO_FLOATS.find(f => f.wmo === row.floatWmo);
                        if (parentFloat) setInspectFloat(parentFloat);
                      }}
                      className="p-1 rounded hover:bg-ocean-800 text-cyan-400 transition-colors"
                      title="Inspect Full Float Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-ocean-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {Math.min(50, filteredObservations.length)} of {filteredObservations.length} observations</span>
          <span className="font-mono text-[11px] text-teal-400">GDAC NetCDF-3 / CF-1.6</span>
        </div>
      </div>

      {/* Float Inspector Modal */}
      {inspectFloat && (
        <DataTableModal
          isOpen={!!inspectFloat}
          onClose={() => setInspectFloat(null)}
          selectedFloat={inspectFloat}
        />
      )}

    </div>
  );
}
