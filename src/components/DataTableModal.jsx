import React, { useState } from 'react';
import { X, Download, Database, FileCode, Check, Search, Filter, ShieldCheck } from 'lucide-react';

export default function DataTableModal({ isOpen, onClose, selectedFloat, compareFloat }) {
  const [activeTab, setActiveTab] = useState('table'); // 'table' or 'netcdf'
  const [depthFilter, setDepthFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !selectedFloat) return null;

  const profileData = selectedFloat.profile;

  const filteredData = profileData.filter(item => {
    if (depthFilter === 'surface') return item.depth <= 100;
    if (depthFilter === 'thermocline') return item.depth > 100 && item.depth <= 500;
    if (depthFilter === 'deep') return item.depth > 500;
    return true;
  });

  const exportCSV = () => {
    const headers = ['Depth_m', 'Pressure_dbar', 'Temperature_C', 'Salinity_PSU', 'Oxygen_umol_kg', 'Density_kg_m3', 'SoundSpeed_m_s', 'QC_Flag'];
    const rows = profileData.map(p => [
      p.depth,
      p.pressure,
      p.temp,
      p.salinity,
      p.oxygen,
      p.density,
      p.soundSpeed,
      p.qc
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `argo_float_${selectedFloat.wmo}_profile.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedFloat, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `argo_float_${selectedFloat.wmo}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const netCdfSchema = `netcdf nodc_argo_${selectedFloat.wmo} {
dimensions:
    N_PROF = 1 ;
    N_PARAM = 6 ;
    N_LEVELS = ${profileData.length} ;
    N_CALIB = 1 ;
    N_HISTORY = 1 ;
variables:
    char DATA_TYPE(N_PROF) ;
        DATA_TYPE:long_name = "Data type" ;
        DATA_TYPE:conventions = "Argo reference table 1" ;
    char FORMAT_VERSION(N_PROF) ;
        FORMAT_VERSION:long_name = "File format version" ;
        FORMAT_VERSION:value = "3.1" ;
    double JULD(N_PROF) ;
        JULD:long_name = "Julian day (UTC) of the station relative to 1950-01-01 00:00:00" ;
        JULD:units = "days since 1950-01-01 00:00:00 UTC" ;
    float LATITUDE(N_PROF) ;
        LATITUDE:long_name = "Latitude of the station" ;
        LATITUDE:units = "degree_north" ;
        LATITUDE:valid_range = -90.f, 90.f ;
    float LONGITUDE(N_PROF) ;
        LONGITUDE:long_name = "Longitude of the station" ;
        LONGITUDE:units = "degree_east" ;
        LONGITUDE:valid_range = -180.f, 180.f ;
    float PRES(N_PROF, N_LEVELS) ;
        PRES:long_name = "Sea water pressure" ;
        PRES:standard_name = "sea_water_pressure" ;
        PRES:units = "decibar" ;
    float TEMP(N_PROF, N_LEVELS) ;
        TEMP:long_name = "Sea water temperature" ;
        TEMP:standard_name = "sea_water_temperature" ;
        TEMP:units = "degree_Celsius" ;
    float PSAL(N_PROF, N_LEVELS) ;
        PSAL:long_name = "Practical salinity" ;
        PSAL:standard_name = "sea_water_practical_salinity" ;
        PSAL:units = "psu" ;
    float DOXY(N_PROF, N_LEVELS) ;
        DOXY:long_name = "Dissolved Oxygen concentration" ;
        DOXY:units = "micromole/kg" ;

// Global attributes:
    :title = "ARGO Float Vertical Profile Data" ;
    :institution = "${selectedFloat.institution}" ;
    :source = "Autonomous robotic profiling float ${selectedFloat.platformType}" ;
    :platform_number = "${selectedFloat.wmo}" ;
    :cycle_number = ${selectedFloat.cycle} ;
    :data_centre = "INCOIS / GDAC" ;
    :quality_control = "All parameters Real-Time QC Flag = 1" ;
}`;

  const copyNetCDF = () => {
    navigator.clipboard.writeText(netCdfSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] glass-panel-active rounded-2xl border border-cyan-500/30 flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-ocean-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white">ARGO Observation Explorer</h3>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300">
                  WMO #{selectedFloat.wmo}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {selectedFloat.name} • {selectedFloat.institution} • Cycle {selectedFloat.cycle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ocean-900 hover:bg-ocean-800 text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={exportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ocean-900 hover:bg-ocean-800 text-teal-300 border border-teal-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-ocean-900/60 border-b border-slate-800 text-xs">
          {/* Tab Selector */}
          <div className="flex items-center gap-1 bg-ocean-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeTab === 'table' ? 'bg-cyan-500 text-ocean-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CTD Observation Table
            </button>
            <button
              onClick={() => setActiveTab('netcdf')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded font-medium transition-colors ${
                activeTab === 'netcdf' ? 'bg-cyan-500 text-ocean-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>NetCDF CDL Structure</span>
            </button>
          </div>

          {/* Depth Filters (for Table view) */}
          {activeTab === 'table' && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Depth Slice:</span>
              {['all', 'surface', 'thermocline', 'deep'].map(f => (
                <button
                  key={f}
                  onClick={() => setDepthFilter(f)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase transition-colors ${
                    depthFilter === f ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-ocean-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {f === 'all' ? 'All (0-2000m)' : f === 'surface' ? '0-100m' : f === 'thermocline' ? '100-500m' : '500-2000m'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto max-h-[60vh] font-mono text-xs">
          {activeTab === 'table' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ocean-950 text-slate-400 font-sans text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <th className="p-3">Depth (m)</th>
                    <th className="p-3">Pressure (dbar)</th>
                    <th className="p-3 text-cyan-400">Temp (°C)</th>
                    <th className="p-3 text-teal-400">Salinity (PSU)</th>
                    <th className="p-3 text-blue-400">Oxygen (μmol/kg)</th>
                    <th className="p-3">Density (kg/m³)</th>
                    <th className="p-3">Sound Speed (m/s)</th>
                    <th className="p-3 text-center">QC Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-ocean-900/60 transition-colors">
                      <td className="p-3 font-bold text-white">{row.depth}</td>
                      <td className="p-3 text-slate-400">{row.pressure}</td>
                      <td className="p-3 font-semibold text-cyan-300">{row.temp}</td>
                      <td className="p-3 font-semibold text-teal-300">{row.salinity}</td>
                      <td className="p-3 text-blue-300">{row.oxygen}</td>
                      <td className="p-3 text-slate-300">{row.density}</td>
                      <td className="p-3 text-slate-400">{row.soundSpeed}</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                          <Check className="w-2.5 h-2.5" />
                          QC 1 (Good)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={copyNetCDF}
                className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-sans font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied NetCDF!' : 'Copy CDL Header'}</span>
              </button>
              <pre className="p-4 rounded-xl bg-ocean-950 text-cyan-300/90 border border-slate-800 overflow-x-auto leading-relaxed text-[11px]">
                {netCdfSchema}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-ocean-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Standard NetCDF-3 / CF-1.6 Data Schema • GDAC Calibrated</span>
          </div>
          <span>Showing {filteredData.length} observation levels</span>
        </div>

      </div>
    </div>
  );
}
