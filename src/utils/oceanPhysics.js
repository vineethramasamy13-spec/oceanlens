/**
 * Physical Oceanography Computations
 * Standard thermodynamic algorithms calibrated against TEOS-10 & UNESCO EOS-80
 */

/**
 * Calculates Mixed Layer Depth (MLD) based on delta T = 0.2°C criteria from 10m reference.
 * @param {Array} profile - Array of depth profile points {depth, temp, salinity, density}
 * @returns {number} MLD in meters
 */
export function calculateMLD(profile) {
  if (!profile || profile.length < 2) return 30;
  const refPoint = profile.find(p => p.depth >= 10) || profile[0];
  const refTemp = refPoint.temp;
  
  for (let i = 0; i < profile.length; i++) {
    if (profile[i].depth > refPoint.depth) {
      if (Math.abs(profile[i].temp - refTemp) >= 0.2) {
        // Linear interpolation
        const prev = profile[i - 1];
        const curr = profile[i];
        const fraction = (0.2 - Math.abs(prev.temp - refTemp)) / (Math.abs(curr.temp - refTemp) - Math.abs(prev.temp - refTemp) || 1);
        return Math.round(prev.depth + fraction * (curr.depth - prev.depth));
      }
    }
  }
  return Math.round(profile[Math.min(4, profile.length - 1)].depth);
}

/**
 * Calculates Thermocline Core Depth and Max Temperature Gradient |dT/dz|
 * @param {Array} profile - Array of depth profile points
 * @returns {Object} { thermoclineDepth, maxGradient, thermoclineSpan: [top, bottom] }
 */
export function calculateThermocline(profile) {
  if (!profile || profile.length < 3) return { thermoclineDepth: 75, maxGradient: 0.15, thermoclineSpan: [40, 150] };
  
  let maxGrad = 0;
  let maxGradDepth = 75;
  let topDepth = 40;
  let bottomDepth = 150;

  for (let i = 0; i < profile.length - 1; i++) {
    const p1 = profile[i];
    const p2 = profile[i + 1];
    const dz = p2.depth - p1.depth;
    if (dz > 0 && p1.depth < 800) {
      const grad = Math.abs(p2.temp - p1.temp) / dz; // °C/m
      if (grad > maxGrad) {
        maxGrad = grad;
        maxGradDepth = Math.round((p1.depth + p2.depth) / 2);
        topDepth = p1.depth;
        bottomDepth = p2.depth;
      }
    }
  }

  return {
    thermoclineDepth: maxGradDepth,
    maxGradient: Number(maxGrad.toFixed(3)), // °C / m
    thermoclineSpan: [Math.max(20, topDepth - 20), Math.min(300, bottomDepth + 40)]
  };
}

/**
 * Calculates Barrier Layer Thickness (BLT = ILD - MLD)
 * Critical for Bay of Bengal freshwater dynamics
 */
export function calculateBarrierLayer(profile) {
  const mld = calculateMLD(profile);
  // Isothermal layer depth (temp drop 0.2°C from surface)
  const surfaceTemp = profile[0].temp;
  let ild = mld;
  for (let i = 0; i < profile.length; i++) {
    if (surfaceTemp - profile[i].temp >= 0.2) {
      ild = profile[i].depth;
      break;
    }
  }
  const blt = Math.max(0, ild - mld);
  return {
    mld,
    ild,
    barrierLayerThickness: blt,
    hasBarrierLayer: blt > 5
  };
}

/**
 * Classifies Water Masses in T-S space
 */
export function classifyWaterMass(temp, salinity, depth) {
  if (depth < 80) {
    if (salinity < 33.5) return { code: 'BBLSW', name: 'Bay of Bengal Low Salinity Water', color: '#06b6d4' };
    if (salinity > 36.2) return { code: 'ASHSW', name: 'Arabian Sea High Salinity Water', color: '#f59e0b' };
    return { code: 'TSW', name: 'Tropical Surface Water', color: '#10b981' };
  }
  if (depth >= 100 && depth <= 350) {
    if (salinity > 36.0 && temp > 15) return { code: 'PGW', name: 'Persian Gulf Water Intrusion', color: '#ec4899' };
    if (salinity > 35.4 && temp > 12) return { code: 'RSOW', name: 'Red Sea Outflow Water', color: '#8b5cf6' };
    return { code: 'IOCW', name: 'Indian Ocean Central Water', color: '#3b82f6' };
  }
  if (depth > 350 && depth <= 1200) {
    if (salinity < 34.6 && temp < 6) return { code: 'AAIW', name: 'Antarctic Intermediate Water', color: '#6366f1' };
    return { code: 'IODW', name: 'Indian Ocean Deep Water', color: '#64748b' };
  }
  return { code: 'ABW', name: 'Antarctic Bottom / Deep Water', color: '#334155' };
}

/**
 * Computes Ocean Acoustic Sound Channel (SOFAR Axis)
 */
export function calculateSOFARAxis(profile) {
  if (!profile || profile.length < 3) return { sofarDepth: 1000, minSpeed: 1490 };
  let minSpeed = 9999;
  let sofarDepth = 1000;

  profile.forEach(p => {
    if (p.soundSpeed && p.soundSpeed < minSpeed) {
      minSpeed = p.soundSpeed;
      sofarDepth = p.depth;
    }
  });

  return { sofarDepth, minSpeed: Number(minSpeed.toFixed(1)) };
}

/**
 * Calculates depth of 26°C isotherm (D26) and Tropical Cyclone Heat Potential (TCHP) in kJ/cm²
 * @param {Array} profile - Depth profile points
 * @returns {Object} { d26, tchp, fuelCategory }
 */
export function calculateTCHP(profile) {
  if (!profile || profile.length < 2) return { d26: 0, tchp: 0, fuelCategory: 'Low' };
  
  // Find depth of 26°C isotherm (D26)
  let d26 = 0;
  if (profile[0].temp < 26) {
    return { d26: 0, tchp: 0, fuelCategory: 'Low' };
  }

  for (let i = 0; i < profile.length - 1; i++) {
    const p1 = profile[i];
    const p2 = profile[i + 1];
    if (p1.temp >= 26 && p2.temp < 26) {
      // Linear interpolation to find depth where temp = 26
      const fraction = (p1.temp - 26) / (p1.temp - p2.temp || 1);
      d26 = p1.depth + fraction * (p2.depth - p1.depth);
      break;
    }
  }

  // If D26 was not reached but deep water is still warm, clamp to maximum depth
  if (d26 === 0 && profile[profile.length - 1].temp >= 26) {
    d26 = profile[profile.length - 1].depth;
  }

  // Calculate integrated heat content down to D26
  let integralSum = 0;
  for (let i = 0; i < profile.length - 1; i++) {
    const p1 = profile[i];
    const p2 = profile[i + 1];
    
    if (p1.depth >= d26) break;

    const zStart = p1.depth;
    const zEnd = Math.min(p2.depth, d26);
    const dz = zEnd - zStart;
    
    if (dz > 0) {
      // Average temp in this layer
      const t1 = p1.temp;
      // Interpolate temperature at zEnd if it matches d26
      const t2 = zEnd === d26 ? 26 : p2.temp;
      const tAvg = (t1 + t2) / 2;
      
      integralSum += (tAvg - 26) * dz;
    }
  }

  // TCHP in kJ/cm² = Cp * rho * integral(T-26)dz scaled by 10^-7 to match standard OHC units
  // Cp * rho ≈ 4.08 * 10^6 J/(m³ °C). 
  // Integrated depth in meters gives J/m². Converting to kJ/cm² gives factor of 0.4084
  const tchp = Number((0.4084 * integralSum).toFixed(1));
  
  let fuelCategory = 'Low';
  if (tchp > 85) fuelCategory = 'Extreme (Cyclone Booster)';
  else if (tchp > 45) fuelCategory = 'High (Rapid Intensification)';
  else if (tchp > 15) fuelCategory = 'Moderate';

  return {
    d26: Math.round(d26),
    tchp,
    fuelCategory
  };
}

/**
 * Calculates El Niño / La Niña Pacific Anomaly for Pacific Warm Pool region
 */
export function calculateENSOAnomaly(profile, regionId) {
  if (!profile || profile.length === 0 || regionId !== 'pacific_warm_pool') return null;
  
  // Surface temp is index 0 or average of upper 10m
  const surfacePoint = profile[0];
  const surfaceTemp = surfacePoint.temp;
  
  // Climatological neutral baseline for Western Pacific Warm Pool is 28.5°C
  const baseline = 28.5;
  const anomaly = surfaceTemp - baseline;
  
  let state = 'Neutral (Walker Circulation)';
  if (anomaly >= 0.75) state = 'El Niño (Warm Phase Active)';
  else if (anomaly <= -0.75) state = 'La Niña (Cold Phase Active)';
  
  return {
    anomaly: Number(anomaly.toFixed(2)),
    state,
    baseline
  };
}
