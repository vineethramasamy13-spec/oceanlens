import React, { useState } from 'react';
import { Activity, Sliders, Eye, ArrowDown, Info } from 'lucide-react';
import { calculateMLD, calculateThermocline } from '../utils/oceanPhysics';
import { useTranslation } from '../utils/translations';

export default function OceanProfileChart({ 
  selectedFloat, 
  compareFloat, 
  activeVariable = 'temperature',
  onVariableChange,
  title
}) {
  const { t, lang } = useTranslation();
  const [hoverPoint, setHoverPoint] = useState(null);
  const [depthScale, setDepthScale] = useState('full'); // 'full' (0-2000m) or 'upper' (0-250m)
  const [showBaseline, setShowBaseline] = useState(false);

  // Handle interactive coordinates mapping on hover
  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    
    // Get cursor offset relative to canvas bounds
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Convert to SVG viewbox coordinates (520x380)
    const x = (clientX / rect.width) * svgWidth;
    const y = (clientY / rect.height) * svgHeight;
    
    const plotY = y - margin.top;
    if (plotY < 0 || plotY > plotHeight) {
      setHoverPoint(null);
      return;
    }
    
    const depthRatio = plotY / plotHeight;
    const hoverDepthVal = depthRatio * maxViewDepth;
    
    // Find closest CTD depth measurement
    let closestPoint = null;
    let minDiff = Infinity;
    
    filteredPrimary.forEach(pt => {
      const diff = Math.abs(pt.depth - hoverDepthVal);
      if (diff < minDiff) {
        minDiff = diff;
        closestPoint = pt;
      }
    });

    if (closestPoint) {
      const compPoint = filteredCompare ? filteredCompare.find(p => p.depth === closestPoint.depth) : null;
      setHoverPoint({
        primary: closestPoint,
        compare: compPoint,
        x: getX(closestPoint[activeVariable]),
        y: getY(closestPoint.depth),
        compX: compPoint ? getX(compPoint[activeVariable]) : null,
        compY: compPoint ? getY(compPoint.depth) : null
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverPoint(null);
  };

  const variables = [
    { id: 'temperature', label: 'Temperature', unit: '°C', min: 0, max: 32, icon: '🌡️' },
    { id: 'salinity', label: 'Salinity', unit: 'PSU', min: 30, max: 37.5, icon: '🧂' },
    { id: 'oxygen', label: 'Dissolved O₂', unit: 'μmol/kg', min: 0, max: 350, icon: '🫧' },
    { id: 'density', label: 'Density (σθ)', unit: 'kg/m³', min: 18, max: 28.5, icon: '⚖️' },
    { id: 'soundSpeed', label: 'Sound Speed', unit: 'm/s', min: 1450, max: 1550, icon: '🔊' },
  ];

  const currentVarConfig = variables.find(v => v.id === activeVariable) || variables[0];

  if (!selectedFloat || !selectedFloat.profile) {
    return (
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-center text-slate-400">
        No ARGO depth profile data available.
      </div>
    );
  }

  const primaryProfile = selectedFloat.profile;
  const compareProfile = compareFloat?.profile || null;

  // Filter depth range based on scale toggle
  const maxViewDepth = depthScale === 'upper' ? 250 : 2000;
  const filteredPrimary = primaryProfile.filter(p => p.depth <= maxViewDepth);
  const filteredCompare = compareProfile ? compareProfile.filter(p => p.depth <= maxViewDepth) : null;

  // Calculate MLD and Thermocline for primary
  const mld = calculateMLD(primaryProfile);
  const thermocline = calculateThermocline(primaryProfile);

  // SVG Chart Dimensions
  const svgWidth = 520;
  const svgHeight = 380;
  const margin = { top: 30, right: 30, bottom: 40, left: 60 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Coordinate Mappers
  const getX = (val) => {
    const clamped = Math.max(currentVarConfig.min, Math.min(currentVarConfig.max, val));
    return margin.left + ((clamped - currentVarConfig.min) / (currentVarConfig.max - currentVarConfig.min)) * plotWidth;
  };

  const getY = (depth) => {
    return margin.top + (depth / maxViewDepth) * plotHeight;
  };

  // Generate SVG Path String
  const generatePath = (data) => {
    if (!data || data.length === 0) return '';
    return data.map((d, i) => {
      const x = getX(d[activeVariable]);
      const y = getY(d.depth);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const primaryPath = generatePath(filteredPrimary);
  const comparePath = filteredCompare ? generatePath(filteredCompare) : null;

  // Generate climatology baseline trajectory
  const generateBaselinePath = () => {
    if (!filteredPrimary) return '';
    return filteredPrimary.map((d, i) => {
      let val = d[activeVariable];
      if (activeVariable === 'temperature') val = val - 1.1 * Math.cos(d.depth / 180);
      else if (activeVariable === 'salinity') val = val + 0.35 * Math.sin(d.depth / 220);
      else if (activeVariable === 'oxygen') val = val * 0.92 + 8 * Math.sin(d.depth / 300);
      else if (activeVariable === 'density') val = val + 0.15 * Math.sin(d.depth / 150);
      else if (activeVariable === 'soundSpeed') val = val - 4 * Math.cos(d.depth / 200);
      
      const x = getX(val);
      const y = getY(d.depth);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };
  const baselinePath = showBaseline ? generateBaselinePath() : null;

  // Depth Grid Ticks
  const depthTicks = depthScale === 'upper' 
    ? [0, 50, 100, 150, 200, 250]
    : [0, 200, 500, 1000, 1500, 2000];

  // Variable Ticks
  const varStep = (currentVarConfig.max - currentVarConfig.min) / 4;
  const varTicks = [0, 1, 2, 3, 4].map(i => Number((currentVarConfig.min + i * varStep).toFixed(1)));

  // Current values at surface and thermocline
  const surfaceVal = primaryProfile[0]?.[activeVariable];
  const deepVal = primaryProfile[primaryProfile.length - 1]?.[activeVariable];

  return (
    <div className="w-full rounded-2xl glass-panel p-4 border border-cyan-500/20 shadow-2xl flex flex-col justify-between">
      
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>{currentVarConfig.icon}</span>
              <span>Vertical Depth Profile</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CTD Cast
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {selectedFloat.name} (WMO #{selectedFloat.wmo})
            {compareFloat && <span className="text-coral-400"> vs {compareFloat.name} (#{compareFloat.wmo})</span>}
          </p>
        </div>

        {/* Controls: Climatology Toggle + Depth Scale Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Historical Climatology Toggle */}
          <button
            onClick={() => setShowBaseline(!showBaseline)}
            className={`px-2 py-1 rounded text-[11px] font-bold border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
              showBaseline 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-glow-purple' 
                : 'bg-ocean-950 text-slate-450 border-slate-800 hover:border-purple-500/30'
            }`}
            aria-label="Toggle Regional Climatology Baseline"
          >
            📅 {lang === 'en' ? 'Seasonal Climatology' : 'ऋतुगत जलवायु'}
          </button>

          {/* Depth Scale Toggle (Upper Ocean Zoom vs Full 2000m) */}
          <div className="flex items-center gap-1 bg-ocean-950/80 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setDepthScale('upper')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                depthScale === 'upper' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Zoom to upper 250 meters"
            >
              Upper 250m
            </button>
            <button
              onClick={() => setDepthScale('full')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                depthScale === 'full' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Show full 2000 meters depth profile"
            >
              Full 2000m
            </button>
          </div>
        </div>
      </div>

      {/* Parameter Switch Tabs */}
      <div className="flex overflow-x-auto py-1.5 gap-1 scrollbar-none border-b border-slate-800/60">
        {variables.map((v) => (
          <button
            key={v.id}
            onClick={() => onVariableChange && onVariableChange(v.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
              activeVariable === v.id
                ? 'bg-cyan-500 text-ocean-950 font-bold shadow-glow-cyan'
                : 'bg-ocean-900/60 text-slate-400 hover:text-slate-200 hover:bg-ocean-850'
            }`}
          >
            <span>{v.icon}</span>
            <span>{v.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive SVG Profile Chart Area */}
      <div className="relative w-full flex items-center justify-center my-2 select-none overflow-hidden">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-auto max-h-[340px] cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* Thermocline Band Gradient */}
            <linearGradient id="thermoclineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
            </linearGradient>
            
            {/* Primary Curve Glow Filter */}
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="glowCoral" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Plot Background */}
          <rect 
            x={margin.left} 
            y={margin.top} 
            width={plotWidth} 
            height={plotHeight} 
            fill="#030b17" 
            rx="8" 
            stroke="#1e293b" 
            strokeWidth="1"
          />

          {/* Thermocline Band Shading (if within current depth scale) */}
          {activeVariable === 'temperature' && thermocline.thermoclineSpan[0] <= maxViewDepth && (
            <rect
              x={margin.left}
              y={getY(thermocline.thermoclineSpan[0])}
              width={plotWidth}
              height={getY(Math.min(maxViewDepth, thermocline.thermoclineSpan[1])) - getY(thermocline.thermoclineSpan[0])}
              fill="url(#thermoclineGrad)"
            />
          )}

          {/* Horizontal Depth Grid Lines */}
          {depthTicks.map((depth) => {
            const y = getY(depth);
            return (
              <g key={depth}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + plotWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="2,4"
                />
                <text
                  x={margin.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  {depth}m
                </text>
              </g>
            );
          })}

          {/* Vertical Variable Grid Lines */}
          {varTicks.map((val) => {
            const x = getX(val);
            return (
              <g key={val}>
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={margin.top + plotHeight}
                  stroke="#1e293b"
                  strokeDasharray="2,4"
                />
                <text
                  x={x}
                  y={margin.top + plotHeight + 16}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* X Axis Label */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 6}
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="11"
            fontWeight="bold"
          >
            {currentVarConfig.label} ({currentVarConfig.unit}) →
          </text>

          {/* Y Axis Inverted Depth Label */}
          <text
            x={14}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${margin.top + plotHeight / 2})`}
            fill="#94a3b8"
            fontSize="11"
            fontWeight="medium"
          >
            Ocean Depth (dbar / meters) ↓
          </text>

          {/* Mixed Layer Depth (MLD) Dashed Line */}
          {mld <= maxViewDepth && (
            <g>
              <line
                x1={margin.left}
                y1={getY(mld)}
                x2={margin.left + plotWidth}
                y2={getY(mld)}
                stroke="#0df5c4"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <text
                x={margin.left + plotWidth - 6}
                y={getY(mld) - 4}
                textAnchor="end"
                fill="#0df5c4"
                fontSize="9"
                fontFamily="JetBrains Mono"
                fontWeight="bold"
              >
                MLD: {mld}m
              </text>
            </g>
          )}

          {/* Historical Baseline Climatology Curve */}
          {baselinePath && (
            <path
              d={baselinePath}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.65"
            />
          )}

          {/* Comparison Profile Curve (Coral Neon) */}
          {comparePath && (
            <path
              d={comparePath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              filter="url(#glowCoral)"
            />
          )}

          {/* Primary Profile Curve (Cyan Neon) */}
          <path
            d={primaryPath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            filter="url(#glowCyan)"
          />

          {/* Primary Profile Observation Points */}
          {filteredPrimary.map((pt, i) => (
            <circle
              key={i}
              cx={getX(pt[activeVariable])}
              cy={getY(pt.depth)}
              r="3.5"
              fill="#06b6d4"
              stroke="#020b14"
              strokeWidth="1.5"
              className="cursor-pointer transition-transform hover:scale-150"
            />
          ))}

          {/* Comparison Observation Points */}
          {filteredCompare && filteredCompare.map((pt, i) => (
            <circle
              key={`comp-${i}`}
              cx={getX(pt[activeVariable])}
              cy={getY(pt.depth)}
              r="3.5"
              fill="#f43f5e"
              stroke="#020b14"
              strokeWidth="1.5"
              className="cursor-pointer"
            />
          ))}

          {/* Active Hover guidelines & circles */}
          {hoverPoint && (
            <g>
              <line
                x1={margin.left}
                y1={hoverPoint.y}
                x2={margin.left + plotWidth}
                y2={hoverPoint.y}
                stroke="rgba(34, 211, 238, 0.45)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              
              <circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r="7"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                className="animate-ping"
              />
              <circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r="4.5"
                fill="#22d3ee"
                stroke="#020b14"
                strokeWidth="1"
              />

              {hoverPoint.compare && (
                <g>
                  <circle
                    cx={hoverPoint.compX}
                    cy={hoverPoint.compY}
                    r="7"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                  <circle
                    cx={hoverPoint.compX}
                    cy={hoverPoint.compY}
                    r="4.5"
                    fill="#f43f5e"
                    stroke="#020b14"
                    strokeWidth="1"
                  />
                </g>
              )}
            </g>
          )}

        </svg>

        {/* Floating Glass Tooltip overlay */}
        {hoverPoint && (
          <div 
            className="absolute z-35 p-2.5 rounded-xl border border-cyan-500/35 bg-slate-950/95 text-[10px] font-mono shadow-2xl space-y-1 backdrop-blur-md pointer-events-none transition-all duration-75 select-none"
            style={{ 
              left: `${Math.max(margin.left + 5, Math.min(plotWidth + margin.left - 135, hoverPoint.x - 60))}px`,
              top: `${Math.max(margin.top + 5, Math.min(plotHeight + margin.top - 80, hoverPoint.y - 85))}px` 
            }}
          >
            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1 flex justify-between gap-4">
              <span>Depth:</span>
              <span>{hoverPoint.primary.depth}m</span>
            </div>
            <div className="flex justify-between gap-4 pt-0.5">
              <span className="text-slate-400">Primary:</span>
              <strong className="text-white">{hoverPoint.primary[activeVariable]} {currentVarConfig.unit}</strong>
            </div>
            {hoverPoint.compare && (
              <div className="flex justify-between gap-4 text-rose-400 pt-0.5 border-t border-slate-900">
                <span>Compare:</span>
                <strong>{hoverPoint.compare[activeVariable]} {currentVarConfig.unit}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 bg-ocean-950/80 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
        <div className="text-left">
          <span className="text-[10px] text-slate-400 block">Surface (0-10m)</span>
          <span className="text-cyan-400 font-bold">{surfaceVal} {currentVarConfig.unit}</span>
        </div>
        <div className="text-center">
          <span className="text-[10px] text-slate-400 block">Mixed Layer (MLD)</span>
          <span className="text-teal-400 font-bold">{mld} meters</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Abyssal (2000m)</span>
          <span className="text-slate-300 font-bold">{deepVal} {currentVarConfig.unit}</span>
        </div>
      </div>

    </div>
  );
}
