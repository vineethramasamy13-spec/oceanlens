import React from 'react';
import { Layers, Info, Sparkles } from 'lucide-react';
import { classifyWaterMass } from '../utils/oceanPhysics';

export default function TSDiagram({ selectedFloat, compareFloat }) {
  if (!selectedFloat || !selectedFloat.profile) return null;

  const svgWidth = 480;
  const svgHeight = 320;
  const margin = { top: 25, right: 25, bottom: 40, left: 55 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Axis ranges
  const minSal = 30.0;
  const maxSal = 38.0;
  const minTemp = 0.0;
  const maxTemp = 32.0;

  const getX = (sal) => {
    const clamped = Math.max(minSal, Math.min(maxSal, sal));
    return margin.left + ((clamped - minSal) / (maxSal - minSal)) * plotWidth;
  };

  const getY = (temp) => {
    const clamped = Math.max(minTemp, Math.min(maxTemp, temp));
    return margin.top + ((maxTemp - clamped) / (maxTemp - minTemp)) * plotHeight;
  };

  // Salinity & Temp Ticks
  const salTicks = [30, 32, 34, 36, 38];
  const tempTicks = [0, 8, 16, 24, 32];

  // Water mass signature zones
  const waterMasses = [
    { name: 'Bay of Bengal Low Salinity (BBLSW)', sal: 31.8, temp: 29.5, color: '#06b6d4' },
    { name: 'Arabian Sea High Salinity (ASHSW)', sal: 36.6, temp: 28.5, color: '#f59e0b' },
    { name: 'Persian Gulf Water (PGW)', sal: 36.3, temp: 17.5, color: '#ec4899' },
    { name: 'Antarctic Intermediate Water (AAIW)', sal: 34.4, temp: 2.2, color: '#8b5cf6' },
  ];

  return (
    <div className="w-full rounded-2xl glass-panel p-4 border border-cyan-500/20 shadow-2xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold text-white">T-S Diagram (Water Mass Identification)</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Thermohaline Space
        </span>
      </div>

      <p className="text-[11px] text-slate-400 mt-1 mb-2">
        Temperature vs Salinity water mass fingerprinting. Sinking isopycnal pathways classify ocean origin.
      </p>

      {/* SVG T-S Diagram */}
      <div className="relative w-full flex items-center justify-center my-1 select-none">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-h-[280px]">
          {/* Plot Background */}
          <rect 
            x={margin.left} 
            y={margin.top} 
            width={plotWidth} 
            height={plotHeight} 
            fill="#030b17" 
            rx="6" 
            stroke="#1e293b" 
            strokeWidth="1"
          />

          {/* Salinity Grid Lines (Vertical) */}
          {salTicks.map((sal) => {
            const x = getX(sal);
            return (
              <g key={sal}>
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={margin.top + plotHeight}
                  stroke="#1e293b"
                  strokeDasharray="2,3"
                />
                <text
                  x={x}
                  y={margin.top + plotHeight + 16}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {sal}
                </text>
              </g>
            );
          })}

          {/* Temp Grid Lines (Horizontal) */}
          {tempTicks.map((temp) => {
            const y = getY(temp);
            return (
              <g key={temp}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + plotWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="2,3"
                />
                <text
                  x={margin.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {temp}°C
                </text>
              </g>
            );
          })}

          {/* Water mass marker labels */}
          {waterMasses.map((wm, idx) => (
            <g key={idx} opacity="0.6">
              <circle cx={getX(wm.sal)} cy={getY(wm.temp)} r="12" fill={wm.color} opacity="0.15" />
              <text
                x={getX(wm.sal)}
                y={getY(wm.temp) - 14}
                textAnchor="middle"
                fill={wm.color}
                fontSize="8"
                fontWeight="bold"
              >
                {wm.name.split(' ')[0]}
              </text>
            </g>
          ))}

          {/* X Axis Label */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 6}
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="10"
            fontWeight="bold"
          >
            Practical Salinity (PSU) →
          </text>

          {/* Y Axis Label */}
          <text
            x={14}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${margin.top + plotHeight / 2})`}
            fill="#38bdf8"
            fontSize="10"
            fontWeight="bold"
          >
            Potential Temp (°C) →
          </text>

          {/* Connect Points Line for Primary Float */}
          {selectedFloat.profile.length > 1 && (
            <path
              d={selectedFloat.profile.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.salinity).toFixed(1)} ${getY(p.temp).toFixed(1)}`).join(' ')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              opacity="0.8"
            />
          )}

          {/* Connect Points Line for Compare Float */}
          {compareFloat && compareFloat.profile && (
            <path
              d={compareFloat.profile.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.salinity).toFixed(1)} ${getY(p.temp).toFixed(1)}`).join(' ')}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              opacity="0.8"
            />
          )}

          {/* Points for Primary Float */}
          {selectedFloat.profile.map((p, i) => (
            <circle
              key={`p-${i}`}
              cx={getX(p.salinity)}
              cy={getY(p.temp)}
              r="4"
              fill="#06b6d4"
              stroke="#020b14"
              strokeWidth="1.5"
            />
          ))}

          {/* Points for Compare Float */}
          {compareFloat && compareFloat.profile && compareFloat.profile.map((p, i) => (
            <circle
              key={`c-${i}`}
              cx={getX(p.salinity)}
              cy={getY(p.temp)}
              r="4"
              fill="#f43f5e"
              stroke="#020b14"
              strokeWidth="1.5"
            />
          ))}

        </svg>
      </div>

      {/* Legend & Water Mass tags */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-[10px]">
        <span className="text-slate-400 font-semibold">Identified Water Masses:</span>
        <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
          BBLSW (Fresh Lens)
        </span>
        <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
          ASHSW (High Salinity)
        </span>
        <span className="px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800 font-mono">
          PGW (Intrusion)
        </span>
      </div>
    </div>
  );
}
