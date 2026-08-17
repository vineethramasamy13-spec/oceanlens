/**
 * AI Anomaly & Fisheries Advisory Engine
 * Runs threshold-based calculations on vertical ocean profiles to detect hazards and provide coastal advisories.
 */

export function analyzeOceanAnomalies(profile) {
  if (!profile || profile.length === 0) {
    return {
      hasAnomalies: false,
      alerts: [],
      fisheriesAdvisory: {
        pelagicSuitability: 'Unknown',
        pelagicDescription: 'No profile data to calculate thermal fronts.',
        demersalSuitability: 'Unknown',
        demersalDescription: 'No profile data to compute benthic oxygen boundaries.'
      }
    };
  }

  const alerts = [];
  const surfacePt = profile[0];
  const deepPt = profile[profile.length - 1];

  // 1. Marine Heatwave (MHW) alert
  const surfaceTemp = surfacePt.temp;
  if (surfaceTemp > 30.5) {
    alerts.push({
      id: 'heatwave',
      type: 'danger',
      title: 'Marine Heatwave Detected',
      description: `Surface temperature is highly anomalous at ${surfaceTemp}°C, exceeding seasonal thermal thresholds. Risk of coral bleaching.`
    });
  }

  // 2. Salinity Freshening (Monsoon Run-off / River discharge)
  const surfaceSal = surfacePt.salinity;
  if (surfaceSal < 32.5) {
    alerts.push({
      id: 'freshening',
      type: 'warning',
      title: 'Sudden Surface Freshening',
      description: `Surface salinity dropped to ${surfaceSal} PSU, indicating high freshwater input (monsoon precipitation/river discharge). Strong barrier layer active.`
    });
  }

  // 3. Shallow Hypoxia (Oxygen Minimum Zone expansion)
  // Find depth where oxygen falls below 60 μmol/kg
  const hypoxicPoint = profile.find(p => p.oxygen < 60);
  if (hypoxicPoint && hypoxicPoint.depth < 120) {
    alerts.push({
      id: 'hypoxia',
      type: 'danger',
      title: 'Shallow Hypoxic Zone Warning',
      description: `Oxygen Minimum Zone (OMZ) boundary detected at a shallow depth of ${hypoxicPoint.depth}m (Dissolved O₂ = ${hypoxicPoint.oxygen.toFixed(1)} μmol/kg).`
    });
  }

  // 4. Fisheries Suitability Advisories
  // Pelagic (Tuna/Mackerel) depends on SST
  let pelagicSuitability = 'Moderate';
  let pelagicDescription = 'Standard thermal parameters. Moderate pelagic aggregation expected.';

  if (surfaceTemp >= 26.0 && surfaceTemp <= 29.5) {
    pelagicSuitability = 'Excellent';
    pelagicDescription = `Optimal temperature bounds (${surfaceTemp}°C) with active thermal fronts. Highly favorable for Tuna/Mackerel shoals.`;
  } else if (surfaceTemp > 30.5) {
    pelagicSuitability = 'Unfavorable';
    pelagicDescription = `Thermal stress detected (${surfaceTemp}°C). Pelagic species are likely migrating to deeper, cooler strata.`;
  } else if (surfaceTemp < 22.0) {
    pelagicSuitability = 'Low';
    pelagicDescription = `Sub-optimal surface temperatures (${surfaceTemp}°C). Reduced pelagic activity in upper layers.`;
  }

  // Demersal (Crabs, Shrimps, Flatfish) depends on OMZ depth and benthic oxygen levels
  let demersalSuitability = 'Favorable';
  let demersalDescription = 'Benthic layer is well-oxygenated. Normal bottom-dwelling species distribution.';

  if (hypoxicPoint) {
    if (hypoxicPoint.depth < 100) {
      demersalSuitability = 'Severe Danger';
      demersalDescription = `Extreme benthic hypoxia. Anoxic dead zone extending up to ${hypoxicPoint.depth}m. Benthic trawling is highly unproductive and ecosystem-stressed.`;
    } else if (hypoxicPoint.depth < 180) {
      demersalSuitability = 'Marginal';
      demersalDescription = `Subsurface oxygen minimum boundary active at ${hypoxicPoint.depth}m. Demersal species may shift to shallower shelves.`;
    }
  }

  return {
    hasAnomalies: alerts.length > 0,
    alerts,
    fisheriesAdvisory: {
      pelagicSuitability,
      pelagicDescription,
      demersalSuitability,
      demersalDescription
    }
  };
}
