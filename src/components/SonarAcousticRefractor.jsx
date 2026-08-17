import React, { useState, useEffect, useRef } from 'react';
import { Radio, ShieldAlert, Info, HelpCircle } from 'lucide-react';
import { calculateSOFARAxis } from '../utils/oceanPhysics';

export default function SonarAcousticRefractor({ selectedFloat }) {
  const profile = selectedFloat?.profile || [];
  const sofarAxis = calculateSOFARAxis(profile);
  const maxDepth = profile.length > 0 ? profile[profile.length - 1].depth : 2000;

  // Sound speed range for background mapping
  const cValues = profile.map(p => p.soundSpeed || 1500);
  const minC = cValues.length > 0 ? Math.min(...cValues) : 1450;
  const maxC = cValues.length > 0 ? Math.max(...cValues) : 1550;
  // Simulation State
  const [sourceDepth, setSourceDepth] = useState(1000);
  const canvasRef = useRef(null);

  // Sync source depth to SOFAR axis when float changes
  useEffect(() => {
    if (sofarAxis && sofarAxis.sofarDepth) {
      setSourceDepth(Math.round(sofarAxis.sofarDepth));
    }
  }, [selectedFloat]);

  // Helper to interpolate sound speed & vertical gradient at a specific depth
  const getSoundSpeedAndGradient = (depth) => {
    const clampedDepth = Math.max(0, Math.min(depth, maxDepth));
    let idx = 0;
    for (let i = 0; i < profile.length - 1; i++) {
      if (clampedDepth >= profile[i].depth && clampedDepth <= profile[i + 1].depth) {
        idx = i;
        break;
      }
    }
    const p1 = profile[idx];
    const p2 = profile[idx + 1];
    const dz = p2.depth - p1.depth;
    if (dz <= 0) return { c: p1.soundSpeed || 1500, dcdz: 0 };

    const fraction = (clampedDepth - p1.depth) / dz;
    const c1 = p1.soundSpeed || 1500;
    const c2 = p2.soundSpeed || 1500;
    const c = c1 + fraction * (c2 - c1);
    const dcdz = (c2 - c1) / dz;

    return { c, dcdz };
  };

  // Run acoustic ray tracing simulation
  const traceRay = (startDepth, initialAngleDeg) => {
    const points = [];
    let x = 0;
    let y = startDepth;
    let theta = (initialAngleDeg * Math.PI) / 180;
    
    // Scale horizontal distance (px to meters conversion factor)
    const scaleFactor = 4.5;
    const dx = 3; // pixels per step

    points.push({ x, y });

    for (let step = 0; step < 160; step++) {
      x += dx;
      const { c, dcdz } = getSoundSpeedAndGradient(y);
      
      // Snell's refraction update: dtheta/dx = - (1/c) * (dc/dz)
      const dTheta = -(1 / c) * dcdz * dx * scaleFactor;
      theta += dTheta;
      
      y += Math.sin(theta) * dx * scaleFactor;

      // Bound reflection
      if (y <= 0) {
        y = 0;
        theta = -theta; 
      } else if (y >= maxDepth) {
        y = maxDepth;
        theta = -theta;
      }

      points.push({ x, y });
    }
    return points;
  };

  // Draw simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (profile.length < 2) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background sound speed profile overlay
    // Left side sound speed column (gradient representing velocity density)
    for (let py = 0; py < height; py++) {
      const depthAtPy = (py / height) * maxDepth;
      const { c } = getSoundSpeedAndGradient(depthAtPy);
      
      // Map velocity to cyan density
      const ratio = (c - minC) / (maxC - minC || 1);
      // Faster speed = brighter cyan, Slower speed = deep indigo-blue
      ctx.fillStyle = `rgba(6, 182, 212, ${0.03 + (1 - ratio) * 0.25})`;
      ctx.fillRect(0, py, width, 1);
    }

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let d = 250; d < maxDepth; d += 250) {
      const py = (d / maxDepth) * height;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(`${d}m`, width - 35, py - 4);
    }

    // Draw SOFAR Channel Axis (Min Sound Velocity layer)
    const sofarY = (sofarAxis.sofarDepth / maxDepth) * height;
    ctx.strokeStyle = '#06b6d4';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, sofarY);
    ctx.lineTo(width, sofarY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw SOFAR Axis text label
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`SOFAR Axis (${sofarAxis.sofarDepth}m - ${sofarAxis.minSpeed} m/s)`, 15, sofarY - 6);

    // Trace and draw multiple acoustic rays (from -12 to +12 degrees)
    const launchAngles = [-12, -6, -2, 0, 2, 6, 12];
    launchAngles.forEach(angle => {
      const points = traceRay(sourceDepth, angle);
      
      ctx.beginPath();
      ctx.lineWidth = angle === 0 ? 2 : 1.2;
      // Normal rays are teal, flat axial ray is bright green
      ctx.strokeStyle = angle === 0 
        ? 'rgba(34, 211, 238, 0.85)' 
        : 'rgba(20, 184, 166, 0.45)';

      points.forEach((pt, idx) => {
        // Map points to canvas coordinates
        const cx = (pt.x / (160 * 3)) * width;
        const cy = (pt.y / maxDepth) * height;
        if (idx === 0) {
          ctx.moveTo(cx, cy);
        } else {
          ctx.lineTo(cx, cy);
        }
      });
      ctx.stroke();
    });

    // Draw Transmitter Launch Node
    const nodeY = (sourceDepth / maxDepth) * height;
    ctx.fillStyle = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#f59e0b';
    ctx.beginPath();
    ctx.arc(10, nodeY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Outline node
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(10, nodeY, 6, 0, 2 * Math.PI);
    ctx.stroke();

  }, [sourceDepth, selectedFloat]);

  if (profile.length < 2) {
    return (
      <div className="w-full rounded-2xl glass-panel p-5 border border-cyan-500/20 text-center text-slate-400 py-12 flex flex-col items-center justify-center space-y-3">
        <Radio className="w-8 h-8 text-cyan-500/40 animate-pulse" />
        <p className="text-xs text-slate-400">No acoustics profile data available for the selected float.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl glass-panel p-5 border border-cyan-500/20 shadow-2xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-ocean-950 shadow-glow-cyan">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-white">
              SOFAR Acoustic Refraction Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Interactive sonar sounding and sound channel waveguide propagation
            </p>
          </div>
        </div>
      </div>

      {/* Physics explainer card */}
      <div className="p-3.5 rounded-xl bg-ocean-900/60 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-1.5 font-bold text-cyan-400">
          <Info className="w-3.5 h-3.5" />
          <span>Acoustic waveguide physics</span>
        </div>
        <p>
          Sound speed is governed by Temperature, Salinity, and Pressure. At the <strong>SOFAR Axis</strong>, cold temperature from above and massive pressure from below combine to create a <strong>sound speed minimum waveguide</strong>. Sound rays bend back toward this axis, preventing decay and allowing acoustic signals to travel thousands of kilometers.
        </p>
      </div>

      {/* Control Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300">Acoustic Source Depth:</span>
          <span className="font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">
            {sourceDepth}m
          </span>
        </div>
        <input
          type="range"
          min="10"
          max={maxDepth - 50}
          value={sourceDepth}
          onChange={(e) => setSourceDepth(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Surface (10m)</span>
          <button 
            type="button"
            onClick={() => setSourceDepth(Math.round(sofarAxis.sofarDepth))}
            className="text-[10px] text-cyan-400 hover:underline hover:text-cyan-300 font-bold"
          >
            Snap to SOFAR Axis ({Math.round(sofarAxis.sofarDepth)}m)
          </button>
          <span>Bottom ({maxDepth}m)</span>
        </div>
      </div>

      {/* Interactive Ray-tracing Canvas */}
      <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-ocean-950">
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          className="w-full block bg-gradient-to-b from-[#020b14] to-[#01060c]"
        />
        
        {/* Interactive guidelines */}
        <div className="absolute top-2 left-2 pointer-events-none flex flex-col gap-1 text-[9px] font-mono text-slate-500 bg-ocean-950/80 px-2 py-1.5 rounded border border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block border border-white"></span>
            <span>Acoustic Transmitter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 border-t border-cyan-400 border-dashed inline-block"></span>
            <span>SOFAR Channel Axis (Sound Speed Min)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-cyan-400/80 inline-block"></span>
            <span>Acoustic Sound Rays (±12° refraction paths)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
