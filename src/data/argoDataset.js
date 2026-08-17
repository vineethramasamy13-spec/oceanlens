/**
 * Comprehensive Global ARGO Float Dataset — All 5 Earth Oceans
 * Representative float data modeled on realistic regional profiles, not live WMO records.
 * Used for simulation and validation under offline/hybrid configurations.
 * Covers: Pacific, Atlantic, Indian, Arctic, Southern Oceans.
 */

export const ARGO_REGIONS = [
  // INDIAN OCEAN
  { id: 'bay_of_bengal', name: 'Bay of Bengal', ocean: 'Indian Ocean', bounds: [[6, 80], [22, 95]], center: [14.5, 87.5], zoom: 6, color: '#06b6d4' },
  { id: 'arabian_sea', name: 'Arabian Sea', ocean: 'Indian Ocean', bounds: [[8, 55], [25, 76]], center: [16.0, 66.0], zoom: 6, color: '#0284c7' },
  { id: 'equatorial_indian', name: 'Equatorial Indian Ocean', ocean: 'Indian Ocean', bounds: [[-8, 60], [6, 95]], center: [0.0, 78.0], zoom: 5, color: '#0ea5e9' },
  { id: 'lakshadweep', name: 'Lakshadweep Sea', ocean: 'Indian Ocean', bounds: [[7, 70], [14, 77]], center: [10.5, 73.5], zoom: 7, color: '#38bdf8' },
  // PACIFIC OCEAN
  { id: 'pacific_warm_pool', name: 'Western Pacific Warm Pool', ocean: 'Pacific Ocean', bounds: [[-5, 130], [15, 160]], center: [5.0, 145.0], zoom: 5, color: '#10b981' },
  { id: 'north_pacific', name: 'North Pacific Gyre', ocean: 'Pacific Ocean', bounds: [[25, -165], [45, -130]], center: [35.0, -150.0], zoom: 4, color: '#34d399' },
  { id: 'south_pacific', name: 'South Pacific Subtropical Gyre', ocean: 'Pacific Ocean', bounds: [[-40, -140], [-15, -75]], center: [-27.0, -110.0], zoom: 4, color: '#6ee7b7' },
  { id: 'peru_current', name: 'Peru Current / Humboldt', ocean: 'Pacific Ocean', bounds: [[-35, -88], [-5, -70]], center: [-18.0, -78.0], zoom: 5, color: '#a7f3d0' },
  { id: 'kuroshio', name: 'Kuroshio Current (NW Pacific)', ocean: 'Pacific Ocean', bounds: [[25, 130], [45, 155]], center: [33.0, 142.0], zoom: 5, color: '#059669' },
  // ATLANTIC OCEAN
  { id: 'north_atlantic', name: 'North Atlantic Gyre', ocean: 'Atlantic Ocean', bounds: [[25, -60], [50, -20]], center: [38.0, -40.0], zoom: 5, color: '#8b5cf6' },
  { id: 'south_atlantic', name: 'South Atlantic Subtropical Gyre', ocean: 'Atlantic Ocean', bounds: [[-45, -45], [-10, 15]], center: [-27.0, -15.0], zoom: 4, color: '#a78bfa' },
  { id: 'tropical_atlantic', name: 'Tropical Atlantic / Gulf of Guinea', ocean: 'Atlantic Ocean', bounds: [[-5, -30], [15, 10]], center: [5.0, -10.0], zoom: 5, color: '#c4b5fd' },
  { id: 'mediterranean', name: 'Mediterranean Sea', ocean: 'Atlantic Ocean', bounds: [[30, -5], [45, 36]], center: [35.0, 20.0], zoom: 5, color: '#ddd6fe' },
  // SOUTHERN OCEAN
  { id: 'southern_ocean', name: 'Southern Ocean (Antarctic)', ocean: 'Southern Ocean', bounds: [[-65, 40], [-45, 100]], center: [-55.0, 70.0], zoom: 4, color: '#f43f5e' },
  { id: 'antarctic_circumpolar', name: 'Antarctic Circumpolar Current', ocean: 'Southern Ocean', bounds: [[-60, -180], [-40, 180]], center: [-55.0, 0.0], zoom: 3, color: '#fb7185' },
  // ARCTIC OCEAN
  { id: 'arctic', name: 'Arctic Ocean', ocean: 'Arctic Ocean', bounds: [[70, -180], [90, 180]], center: [80.0, 30.0], zoom: 3, color: '#f59e0b' },
  { id: 'barents_sea', name: 'Barents Sea', ocean: 'Arctic Ocean', bounds: [[70, 15], [82, 60]], center: [75.0, 38.0], zoom: 5, color: '#fbbf24' },
  // NEW SEAS
  { id: 'red_sea', name: 'Red Sea', ocean: 'Indian Ocean', bounds: [[12, 32], [28, 44]], center: [20.0, 38.0], zoom: 5, color: '#f97316' },
  { id: 'caribbean_sea', name: 'Caribbean Sea', ocean: 'Atlantic Ocean', bounds: [[9, -89], [22, -59]], center: [15.0, -75.0], zoom: 5, color: '#0d9488' },
  { id: 'south_china_sea', name: 'South China Sea', ocean: 'Pacific Ocean', bounds: [[3, 108], [22, 121]], center: [12.0, 114.0], zoom: 5, color: '#0284c7' },
  { id: 'tasman_sea', name: 'Tasman Sea', ocean: 'Pacific Ocean', bounds: [[-46, 148], [-33, 174]], center: [-40.0, 160.0], zoom: 5, color: '#6366f1' },
  { id: 'gulf_of_mexico', name: 'Gulf of Mexico', ocean: 'Atlantic Ocean', bounds: [[18, -98], [30, -81]], center: [25.0, -90.0], zoom: 5, color: '#059669' },
];

export const ARGO_FLOATS = [
  // ===================== INDIAN OCEAN — BAY OF BENGAL =====================
  {
    wmo: '2903334', name: 'INCOIS-BoB-Central (BGC-Argo)', platformType: 'PROVOR CTS4 (BGC-Argo)',
    country: 'India', institution: 'INCOIS / MoES', region: 'Bay of Bengal', regionId: 'bay_of_bengal',
    lat: 13.82, lon: 86.45, lastUpdate: '2026-08-14T04:30:00Z', cycle: 184, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Aanderaa Optode 4330 (O2)', 'ECO-Triplet (Chl/BBP)'],
    transmission: 'Iridium SBD', batteryRemaining: '82%',
    trajectory: [
      { lat: 12.50, lon: 84.80, date: '2026-07-05', cycle: 180 },
      { lat: 12.95, lon: 85.20, date: '2026-07-15', cycle: 181 },
      { lat: 13.30, lon: 85.70, date: '2026-07-25', cycle: 182 },
      { lat: 13.60, lon: 86.15, date: '2026-08-04', cycle: 183 },
      { lat: 13.82, lon: 86.45, date: '2026-08-14', cycle: 184 }
    ],
    profile: [
      { depth: 2, temp: 29.8, salinity: 32.8, pressure: 2.0, oxygen: 208, density: 20.8, soundSpeed: 1544.5, chl: 0.35, qc: 1 },
      { depth: 10, temp: 29.6, salinity: 32.9, pressure: 10.1, oxygen: 206, density: 20.9, soundSpeed: 1544.2, chl: 0.42, qc: 1 },
      { depth: 25, temp: 29.4, salinity: 33.1, pressure: 25.2, oxygen: 202, density: 21.1, soundSpeed: 1544.1, chl: 0.78, qc: 1 },
      { depth: 50, temp: 28.5, salinity: 33.8, pressure: 50.4, oxygen: 175, density: 21.9, soundSpeed: 1543.2, chl: 1.15, qc: 1 },
      { depth: 75, temp: 25.2, salinity: 34.4, pressure: 75.6, oxygen: 110, density: 23.4, soundSpeed: 1536.8, chl: 0.45, qc: 1 },
      { depth: 100, temp: 21.4, salinity: 34.7, pressure: 100.8, oxygen: 65, density: 24.7, soundSpeed: 1527.6, chl: 0.12, qc: 1 },
      { depth: 150, temp: 16.8, salinity: 34.9, pressure: 151.3, oxygen: 28, density: 25.8, soundSpeed: 1515.2, chl: 0.02, qc: 1 },
      { depth: 200, temp: 14.1, salinity: 35.0, pressure: 201.8, oxygen: 18, density: 26.3, soundSpeed: 1507.9, chl: 0.00, qc: 1 },
      { depth: 300, temp: 11.5, salinity: 35.0, pressure: 302.9, oxygen: 15, density: 26.8, soundSpeed: 1501.4, chl: 0.00, qc: 1 },
      { depth: 500, temp: 9.2, salinity: 34.95, pressure: 505.0, oxygen: 22, density: 27.2, soundSpeed: 1497.8, chl: 0.00, qc: 1 },
      { depth: 750, temp: 7.1, salinity: 34.9, pressure: 758.1, oxygen: 40, density: 27.5, soundSpeed: 1496.1, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 5.8, salinity: 34.85, pressure: 1011.5, oxygen: 58, density: 27.7, soundSpeed: 1498.3, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 3.9, salinity: 34.8, pressure: 1519.2, oxygen: 85, density: 27.85, soundSpeed: 1504.6, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.5, salinity: 34.78, pressure: 2028.0, oxygen: 105, density: 27.92, soundSpeed: 1512.4, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '2903335', name: 'INCOIS-BoB-North (Ganges-Brahmaputra Outflow)', platformType: 'APEX CTD',
    country: 'India', institution: 'INCOIS', region: 'Bay of Bengal', regionId: 'bay_of_bengal',
    lat: 19.45, lon: 89.20, lastUpdate: '2026-08-15T11:15:00Z', cycle: 198, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '76%',
    trajectory: [
      { lat: 18.20, lon: 88.30, date: '2026-07-06', cycle: 194 }, { lat: 19.45, lon: 89.20, date: '2026-08-15', cycle: 198 }
    ],
    profile: [
      { depth: 2, temp: 30.4, salinity: 30.8, pressure: 2.0, oxygen: 215, density: 19.1, soundSpeed: 1542.2, chl: 0.65, qc: 1 },
      { depth: 10, temp: 30.2, salinity: 31.2, pressure: 10.1, oxygen: 212, density: 19.4, soundSpeed: 1542.8, chl: 0.85, qc: 1 },
      { depth: 25, temp: 29.8, salinity: 32.5, pressure: 25.2, oxygen: 195, density: 20.5, soundSpeed: 1544.6, chl: 1.45, qc: 1 },
      { depth: 50, temp: 27.9, salinity: 34.1, pressure: 50.4, oxygen: 150, density: 22.3, soundSpeed: 1542.1, chl: 0.90, qc: 1 },
      { depth: 75, temp: 24.1, salinity: 34.5, pressure: 75.6, oxygen: 90, density: 23.8, soundSpeed: 1534.2, chl: 0.25, qc: 1 },
      { depth: 100, temp: 20.2, salinity: 34.7, pressure: 100.8, oxygen: 45, density: 25.0, soundSpeed: 1524.5, chl: 0.05, qc: 1 },
      { depth: 150, temp: 15.6, salinity: 34.9, pressure: 151.3, oxygen: 18, density: 26.0, soundSpeed: 1511.4, chl: 0.00, qc: 1 },
      { depth: 200, temp: 13.5, salinity: 35.0, pressure: 201.8, oxygen: 12, density: 26.4, soundSpeed: 1505.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 8.7, salinity: 34.95, pressure: 505.0, oxygen: 25, density: 27.3, soundSpeed: 1495.8, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 5.5, salinity: 34.85, pressure: 1011.5, oxygen: 62, density: 27.72, soundSpeed: 1497.1, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 3.7, salinity: 34.8, pressure: 1519.2, oxygen: 88, density: 27.88, soundSpeed: 1503.8, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.4, salinity: 34.78, pressure: 2028.0, oxygen: 108, density: 27.94, soundSpeed: 1511.9, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '2903337', name: 'NIOT-BoB-Chennai Coastal', platformType: 'ARVOR Deep CTD',
    country: 'India', institution: 'NIOT / INCOIS', region: 'Bay of Bengal', regionId: 'bay_of_bengal',
    lat: 13.08, lon: 80.35, lastUpdate: '2026-08-16T08:00:00Z', cycle: 138, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '88%',
    trajectory: [
      { lat: 12.50, lon: 80.10, date: '2026-07-17', cycle: 135 }, { lat: 13.08, lon: 80.35, date: '2026-08-16', cycle: 138 }
    ],
    profile: [
      { depth: 2, temp: 30.1, salinity: 33.2, pressure: 2.0, oxygen: 204, density: 21.2, soundSpeed: 1544.8, chl: 0.55, qc: 1 },
      { depth: 10, temp: 29.9, salinity: 33.3, pressure: 10.1, oxygen: 203, density: 21.3, soundSpeed: 1544.7, chl: 0.62, qc: 1 },
      { depth: 25, temp: 29.3, salinity: 33.5, pressure: 25.2, oxygen: 198, density: 21.6, soundSpeed: 1544.1, chl: 0.95, qc: 1 },
      { depth: 50, temp: 28.1, salinity: 34.0, pressure: 50.4, oxygen: 168, density: 22.3, soundSpeed: 1542.5, chl: 1.10, qc: 1 },
      { depth: 75, temp: 24.8, salinity: 34.4, pressure: 75.6, oxygen: 105, density: 23.5, soundSpeed: 1535.8, chl: 0.35, qc: 1 },
      { depth: 100, temp: 21.0, salinity: 34.7, pressure: 100.8, oxygen: 60, density: 24.8, soundSpeed: 1526.4, chl: 0.10, qc: 1 },
      { depth: 150, temp: 16.5, salinity: 34.9, pressure: 151.3, oxygen: 25, density: 25.9, soundSpeed: 1514.2, chl: 0.01, qc: 1 },
      { depth: 200, temp: 13.8, salinity: 35.0, pressure: 201.8, oxygen: 16, density: 26.3, soundSpeed: 1506.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 9.0, salinity: 34.95, pressure: 505.0, oxygen: 24, density: 27.2, soundSpeed: 1497.1, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 5.7, salinity: 34.85, pressure: 1011.5, oxygen: 60, density: 27.7, soundSpeed: 1497.9, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 3.8, salinity: 34.8, pressure: 1519.2, oxygen: 86, density: 27.86, soundSpeed: 1504.2, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.5, salinity: 34.78, pressure: 2028.0, oxygen: 106, density: 27.93, soundSpeed: 1512.2, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== INDIAN OCEAN — ARABIAN SEA =====================
  {
    wmo: '2902089', name: 'NIO-AS-Central (ASHSW Core)', platformType: 'PROVOR CTS4 (BGC-Argo)',
    country: 'India', institution: 'INCOIS / NIO', region: 'Arabian Sea', regionId: 'arabian_sea',
    lat: 16.20, lon: 66.45, lastUpdate: '2026-08-15T18:40:00Z', cycle: 168, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Aanderaa Optode 4330 (O2)'], transmission: 'Iridium SBD', batteryRemaining: '86%',
    trajectory: [
      { lat: 15.10, lon: 65.20, date: '2026-07-16', cycle: 165 }, { lat: 16.20, lon: 66.45, date: '2026-08-15', cycle: 168 }
    ],
    profile: [
      { depth: 2, temp: 29.1, salinity: 36.65, pressure: 2.0, oxygen: 202, density: 23.8, soundSpeed: 1547.2, chl: 0.22, qc: 1 },
      { depth: 10, temp: 29.0, salinity: 36.65, pressure: 10.1, oxygen: 201, density: 23.8, soundSpeed: 1547.1, chl: 0.25, qc: 1 },
      { depth: 25, temp: 28.9, salinity: 36.68, pressure: 25.2, oxygen: 198, density: 23.9, soundSpeed: 1547.2, chl: 0.35, qc: 1 },
      { depth: 50, temp: 28.7, salinity: 36.70, pressure: 50.4, oxygen: 190, density: 24.0, soundSpeed: 1547.1, chl: 0.65, qc: 1 },
      { depth: 75, temp: 27.2, salinity: 36.55, pressure: 75.6, oxygen: 145, density: 24.4, soundSpeed: 1544.6, chl: 0.85, qc: 1 },
      { depth: 100, temp: 24.5, salinity: 36.35, pressure: 100.8, oxygen: 70, density: 25.1, soundSpeed: 1538.8, chl: 0.30, qc: 1 },
      { depth: 150, temp: 19.8, salinity: 35.85, pressure: 151.3, oxygen: 12, density: 26.1, soundSpeed: 1526.4, chl: 0.01, qc: 1 },
      { depth: 200, temp: 16.5, salinity: 35.65, pressure: 201.8, oxygen: 6, density: 26.5, soundSpeed: 1517.2, chl: 0.00, qc: 1 },
      { depth: 300, temp: 13.2, salinity: 35.40, pressure: 302.9, oxygen: 4, density: 26.9, soundSpeed: 1508.6, chl: 0.00, qc: 1 },
      { depth: 500, temp: 10.5, salinity: 35.25, pressure: 505.0, oxygen: 8, density: 27.3, soundSpeed: 1503.2, chl: 0.00, qc: 1 },
      { depth: 750, temp: 8.2, salinity: 35.05, pressure: 758.1, oxygen: 18, density: 27.6, soundSpeed: 1500.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 6.4, salinity: 34.92, pressure: 1011.5, oxygen: 38, density: 27.75, soundSpeed: 1501.2, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 4.2, salinity: 34.82, pressure: 1519.2, oxygen: 72, density: 27.88, soundSpeed: 1506.4, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.7, salinity: 34.78, pressure: 2028.0, oxygen: 98, density: 27.93, soundSpeed: 1513.5, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '2902088', name: 'INCOIS-AS-Konkan (OMZ Core)', platformType: 'ARVOR CTD + DO',
    country: 'India', institution: 'NIO / INCOIS', region: 'Arabian Sea', regionId: 'arabian_sea',
    lat: 14.85, lon: 72.10, lastUpdate: '2026-08-16T02:10:00Z', cycle: 145, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Aanderaa Optode 4330'], transmission: 'Iridium SBD', batteryRemaining: '80%',
    trajectory: [
      { lat: 14.30, lon: 71.50, date: '2026-07-17', cycle: 142 }, { lat: 14.85, lon: 72.10, date: '2026-08-16', cycle: 145 }
    ],
    profile: [
      { depth: 2, temp: 28.8, salinity: 36.20, pressure: 2.0, oxygen: 200, density: 23.6, soundSpeed: 1545.8, chl: 0.45, qc: 1 },
      { depth: 10, temp: 28.7, salinity: 36.22, pressure: 10.1, oxygen: 198, density: 23.6, soundSpeed: 1545.7, chl: 0.50, qc: 1 },
      { depth: 25, temp: 28.5, salinity: 36.25, pressure: 25.2, oxygen: 192, density: 23.7, soundSpeed: 1545.5, chl: 0.70, qc: 1 },
      { depth: 50, temp: 27.8, salinity: 36.35, pressure: 50.4, oxygen: 165, density: 24.0, soundSpeed: 1544.5, chl: 1.10, qc: 1 },
      { depth: 75, temp: 25.5, salinity: 36.15, pressure: 75.6, oxygen: 100, density: 24.6, soundSpeed: 1539.8, chl: 0.55, qc: 1 },
      { depth: 100, temp: 22.8, salinity: 35.90, pressure: 100.8, oxygen: 40, density: 25.2, soundSpeed: 1533.2, chl: 0.15, qc: 1 },
      { depth: 150, temp: 18.2, salinity: 35.60, pressure: 151.3, oxygen: 8, density: 26.2, soundSpeed: 1521.5, chl: 0.01, qc: 1 },
      { depth: 200, temp: 15.4, salinity: 35.45, pressure: 201.8, oxygen: 5, density: 26.6, soundSpeed: 1513.2, chl: 0.00, qc: 1 },
      { depth: 300, temp: 12.5, salinity: 35.30, pressure: 302.9, oxygen: 3, density: 27.0, soundSpeed: 1505.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 10.0, salinity: 35.15, pressure: 505.0, oxygen: 6, density: 27.4, soundSpeed: 1501.2, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 6.2, salinity: 34.90, pressure: 1011.5, oxygen: 35, density: 27.76, soundSpeed: 1500.5, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 4.1, salinity: 34.80, pressure: 1519.2, oxygen: 70, density: 27.88, soundSpeed: 1505.8, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.6, salinity: 34.78, pressure: 2028.0, oxygen: 96, density: 27.93, soundSpeed: 1513.0, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '2901550', name: 'INCOIS-EIO-Wyrtki Jet', platformType: 'SOLO-II CTD',
    country: 'India / USA', institution: 'INCOIS / SIO', region: 'Equatorial Indian Ocean', regionId: 'equatorial_indian',
    lat: 0.50, lon: 80.25, lastUpdate: '2026-08-16T08:15:00Z', cycle: 242, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '75%',
    trajectory: [
      { lat: -0.20, lon: 77.80, date: '2026-07-17', cycle: 239 }, { lat: 0.50, lon: 80.25, date: '2026-08-16', cycle: 242 }
    ],
    profile: [
      { depth: 2, temp: 29.5, salinity: 35.10, pressure: 2.0, oxygen: 205, density: 22.6, soundSpeed: 1545.2, chl: 0.28, qc: 1 },
      { depth: 10, temp: 29.4, salinity: 35.12, pressure: 10.1, oxygen: 204, density: 22.6, soundSpeed: 1545.1, chl: 0.30, qc: 1 },
      { depth: 25, temp: 29.2, salinity: 35.15, pressure: 25.2, oxygen: 202, density: 22.7, soundSpeed: 1544.9, chl: 0.40, qc: 1 },
      { depth: 50, temp: 28.9, salinity: 35.20, pressure: 50.4, oxygen: 196, density: 22.9, soundSpeed: 1544.8, chl: 0.65, qc: 1 },
      { depth: 75, temp: 27.5, salinity: 35.30, pressure: 75.6, oxygen: 170, density: 23.4, soundSpeed: 1542.5, chl: 0.95, qc: 1 },
      { depth: 100, temp: 24.0, salinity: 35.25, pressure: 100.8, oxygen: 120, density: 24.4, soundSpeed: 1534.6, chl: 0.35, qc: 1 },
      { depth: 150, temp: 18.5, salinity: 35.15, pressure: 151.3, oxygen: 65, density: 25.7, soundSpeed: 1520.4, chl: 0.02, qc: 1 },
      { depth: 200, temp: 14.8, salinity: 35.10, pressure: 201.8, oxygen: 40, density: 26.3, soundSpeed: 1510.5, chl: 0.00, qc: 1 },
      { depth: 500, temp: 9.5, salinity: 34.95, pressure: 505.0, oxygen: 45, density: 27.2, soundSpeed: 1499.1, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 5.9, salinity: 34.82, pressure: 1011.5, oxygen: 75, density: 27.68, soundSpeed: 1498.8, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 3.8, salinity: 34.76, pressure: 1519.2, oxygen: 95, density: 27.84, soundSpeed: 1504.2, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.4, salinity: 34.74, pressure: 2028.0, oxygen: 112, density: 27.91, soundSpeed: 1511.8, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== PACIFIC OCEAN =====================
  {
    wmo: '5904421', name: 'NOAA-WP-WarmPool (ENSO Monitor)', platformType: 'APEX BGC',
    country: 'USA', institution: 'NOAA / PMEL', region: 'Western Pacific Warm Pool', regionId: 'pacific_warm_pool',
    lat: 5.40, lon: 144.60, lastUpdate: '2026-08-16T10:00:00Z', cycle: 256, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Aanderaa Optode 4330'], transmission: 'Iridium SBD', batteryRemaining: '72%',
    trajectory: [
      { lat: 4.95, lon: 143.30, date: '2026-07-17', cycle: 253 }, { lat: 5.40, lon: 144.60, date: '2026-08-16', cycle: 256 }
    ],
    profile: [
      { depth: 2, temp: 30.2, salinity: 34.20, pressure: 2.0, oxygen: 206, density: 21.6, soundSpeed: 1546.5, chl: 0.15, qc: 1 },
      { depth: 10, temp: 30.1, salinity: 34.22, pressure: 10.1, oxygen: 205, density: 21.7, soundSpeed: 1546.4, chl: 0.18, qc: 1 },
      { depth: 25, temp: 29.8, salinity: 34.25, pressure: 25.2, oxygen: 204, density: 21.8, soundSpeed: 1546.2, chl: 0.25, qc: 1 },
      { depth: 50, temp: 29.5, salinity: 34.35, pressure: 50.4, oxygen: 200, density: 22.0, soundSpeed: 1546.0, chl: 0.40, qc: 1 },
      { depth: 75, temp: 28.8, salinity: 34.60, pressure: 75.6, oxygen: 185, density: 22.5, soundSpeed: 1545.2, chl: 0.75, qc: 1 },
      { depth: 100, temp: 26.5, salinity: 34.95, pressure: 100.8, oxygen: 150, density: 23.5, soundSpeed: 1541.5, chl: 0.95, qc: 1 },
      { depth: 150, temp: 19.5, salinity: 35.10, pressure: 151.3, oxygen: 105, density: 25.4, soundSpeed: 1523.6, chl: 0.05, qc: 1 },
      { depth: 200, temp: 15.2, salinity: 34.85, pressure: 201.8, oxygen: 85, density: 26.0, soundSpeed: 1512.1, chl: 0.00, qc: 1 },
      { depth: 500, temp: 8.2, salinity: 34.55, pressure: 505.0, oxygen: 110, density: 27.1, soundSpeed: 1494.2, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 4.3, salinity: 34.54, pressure: 1011.5, oxygen: 155, density: 27.62, soundSpeed: 1492.8, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 2.8, salinity: 34.60, pressure: 1519.2, oxygen: 178, density: 27.78, soundSpeed: 1500.1, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 1.9, salinity: 34.65, pressure: 2028.0, oxygen: 192, density: 27.86, soundSpeed: 1509.8, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '5904880', name: 'NOAA-NP-SubtropicalGyre', platformType: 'SOLO-II CTD',
    country: 'USA', institution: 'NOAA / WHOI', region: 'North Pacific Gyre', regionId: 'north_pacific',
    lat: 34.80, lon: -148.50, lastUpdate: '2026-08-15T14:20:00Z', cycle: 187, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Aanderaa DO'], transmission: 'Iridium SBD', batteryRemaining: '91%',
    trajectory: [
      { lat: 33.90, lon: -150.10, date: '2026-07-16', cycle: 184 }, { lat: 34.80, lon: -148.50, date: '2026-08-15', cycle: 187 }
    ],
    profile: [
      { depth: 2, temp: 21.4, salinity: 35.20, pressure: 2.0, oxygen: 218, density: 25.1, soundSpeed: 1526.4, chl: 0.10, qc: 1 },
      { depth: 10, temp: 21.2, salinity: 35.22, pressure: 10.1, oxygen: 216, density: 25.1, soundSpeed: 1526.2, chl: 0.12, qc: 1 },
      { depth: 25, temp: 20.8, salinity: 35.25, pressure: 25.2, oxygen: 210, density: 25.2, soundSpeed: 1525.5, chl: 0.18, qc: 1 },
      { depth: 50, temp: 19.5, salinity: 35.40, pressure: 50.4, oxygen: 195, density: 25.6, soundSpeed: 1522.5, chl: 0.25, qc: 1 },
      { depth: 75, temp: 17.8, salinity: 35.50, pressure: 75.6, oxygen: 185, density: 26.0, soundSpeed: 1518.2, chl: 0.15, qc: 1 },
      { depth: 100, temp: 15.2, salinity: 35.45, pressure: 100.8, oxygen: 178, density: 26.4, soundSpeed: 1512.1, chl: 0.05, qc: 1 },
      { depth: 150, temp: 11.5, salinity: 34.95, pressure: 151.3, oxygen: 165, density: 26.8, soundSpeed: 1502.5, chl: 0.01, qc: 1 },
      { depth: 200, temp: 9.2, salinity: 34.72, pressure: 201.8, oxygen: 150, density: 27.1, soundSpeed: 1496.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 5.8, salinity: 34.48, pressure: 505.0, oxygen: 120, density: 27.42, soundSpeed: 1490.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 3.4, salinity: 34.52, pressure: 1011.5, oxygen: 135, density: 27.68, soundSpeed: 1490.8, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 2.1, salinity: 34.60, pressure: 1519.2, oxygen: 158, density: 27.80, soundSpeed: 1498.2, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 1.5, salinity: 34.65, pressure: 2028.0, oxygen: 172, density: 27.87, soundSpeed: 1507.5, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '5905080', name: 'NOAA-SP-SubtropicalGyre', platformType: 'APEX CTD',
    country: 'USA / France', institution: 'NOAA / IRD', region: 'South Pacific Subtropical Gyre', regionId: 'south_pacific',
    lat: -26.50, lon: -112.80, lastUpdate: '2026-08-15T06:00:00Z', cycle: 162, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '85%',
    trajectory: [
      { lat: -25.80, lon: -114.20, date: '2026-07-16', cycle: 159 }, { lat: -26.50, lon: -112.80, date: '2026-08-15', cycle: 162 }
    ],
    profile: [
      { depth: 2, temp: 22.8, salinity: 36.45, pressure: 2.0, oxygen: 210, density: 25.4, soundSpeed: 1530.5, chl: 0.05, qc: 1 },
      { depth: 10, temp: 22.6, salinity: 36.45, pressure: 10.1, oxygen: 209, density: 25.4, soundSpeed: 1530.3, chl: 0.06, qc: 1 },
      { depth: 25, temp: 22.2, salinity: 36.48, pressure: 25.2, oxygen: 207, density: 25.5, soundSpeed: 1530.0, chl: 0.08, qc: 1 },
      { depth: 50, temp: 21.5, salinity: 36.50, pressure: 50.4, oxygen: 198, density: 25.8, soundSpeed: 1529.2, chl: 0.12, qc: 1 },
      { depth: 75, temp: 19.8, salinity: 36.40, pressure: 75.6, oxygen: 185, density: 26.1, soundSpeed: 1525.5, chl: 0.10, qc: 1 },
      { depth: 100, temp: 17.2, salinity: 35.95, pressure: 100.8, oxygen: 175, density: 26.4, soundSpeed: 1519.8, chl: 0.03, qc: 1 },
      { depth: 150, temp: 13.5, salinity: 35.60, pressure: 151.3, oxygen: 162, density: 26.8, soundSpeed: 1510.1, chl: 0.01, qc: 1 },
      { depth: 200, temp: 11.0, salinity: 35.25, pressure: 201.8, oxygen: 148, density: 27.0, soundSpeed: 1503.5, chl: 0.00, qc: 1 },
      { depth: 500, temp: 6.5, salinity: 34.62, pressure: 505.0, oxygen: 125, density: 27.38, soundSpeed: 1491.2, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 3.8, salinity: 34.54, pressure: 1011.5, oxygen: 145, density: 27.66, soundSpeed: 1491.8, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 2.2, salinity: 34.58, pressure: 1519.2, oxygen: 165, density: 27.80, soundSpeed: 1499.2, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 1.4, salinity: 34.62, pressure: 2028.0, oxygen: 180, density: 27.86, soundSpeed: 1508.2, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '5907321', name: 'MBARI-PC-Humboldt-Upwelling', platformType: 'MBARI ISUS-BGC',
    country: 'USA', institution: 'MBARI / NOAA', region: 'Peru Current / Humboldt', regionId: 'peru_current',
    lat: -14.50, lon: -77.20, lastUpdate: '2026-08-16T03:00:00Z', cycle: 95, status: 'Active (Profiling)',
    maxDepth: 1000, sensors: ['SBE41CP CTD', 'ISUS Nitrate', 'Optode O2'], transmission: 'Iridium SBD', batteryRemaining: '78%',
    trajectory: [
      { lat: -15.20, lon: -78.00, date: '2026-07-17', cycle: 92 }, { lat: -14.50, lon: -77.20, date: '2026-08-16', cycle: 95 }
    ],
    profile: [
      { depth: 2, temp: 19.2, salinity: 35.10, pressure: 2.0, oxygen: 225, density: 25.6, soundSpeed: 1521.5, chl: 1.85, qc: 1 },
      { depth: 10, temp: 18.8, salinity: 35.12, pressure: 10.1, oxygen: 220, density: 25.7, soundSpeed: 1520.5, chl: 2.10, qc: 1 },
      { depth: 25, temp: 17.5, salinity: 35.15, pressure: 25.2, oxygen: 185, density: 25.9, soundSpeed: 1517.2, chl: 2.80, qc: 1 },
      { depth: 50, temp: 15.2, salinity: 35.20, pressure: 50.4, oxygen: 95, density: 26.3, soundSpeed: 1511.5, chl: 1.95, qc: 1 },
      { depth: 75, temp: 13.8, salinity: 35.10, pressure: 75.6, oxygen: 35, density: 26.6, soundSpeed: 1507.5, chl: 0.85, qc: 1 },
      { depth: 100, temp: 12.5, salinity: 34.92, pressure: 100.8, oxygen: 15, density: 26.8, soundSpeed: 1504.2, chl: 0.25, qc: 1 },
      { depth: 150, temp: 10.8, salinity: 34.72, pressure: 151.3, oxygen: 8, density: 27.0, soundSpeed: 1500.1, chl: 0.05, qc: 1 },
      { depth: 200, temp: 9.5, salinity: 34.62, pressure: 201.8, oxygen: 5, density: 27.2, soundSpeed: 1496.8, chl: 0.00, qc: 1 },
      { depth: 300, temp: 8.0, salinity: 34.55, pressure: 302.9, oxygen: 4, density: 27.4, soundSpeed: 1493.5, chl: 0.00, qc: 1 },
      { depth: 500, temp: 5.5, salinity: 34.48, pressure: 505.0, oxygen: 10, density: 27.58, soundSpeed: 1489.5, chl: 0.00, qc: 1 },
      { depth: 750, temp: 3.8, salinity: 34.52, pressure: 758.1, oxygen: 35, density: 27.70, soundSpeed: 1490.2, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 2.8, salinity: 34.60, pressure: 1011.5, oxygen: 65, density: 27.80, soundSpeed: 1494.5, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '2901888', name: 'JAMSTEC-Kuroshio-Extension', platformType: 'ARVOR Deep 4000',
    country: 'Japan', institution: 'JAMSTEC', region: 'Kuroshio Current (NW Pacific)', regionId: 'kuroshio',
    lat: 33.50, lon: 143.20, lastUpdate: '2026-08-15T22:00:00Z', cycle: 210, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Dissolved O2'], transmission: 'Iridium SBD', batteryRemaining: '88%',
    trajectory: [
      { lat: 32.80, lon: 141.50, date: '2026-07-16', cycle: 207 }, { lat: 33.50, lon: 143.20, date: '2026-08-15', cycle: 210 }
    ],
    profile: [
      { depth: 2, temp: 27.5, salinity: 34.85, pressure: 2.0, oxygen: 212, density: 22.8, soundSpeed: 1541.5, chl: 0.18, qc: 1 },
      { depth: 10, temp: 27.3, salinity: 34.87, pressure: 10.1, oxygen: 210, density: 22.9, soundSpeed: 1541.2, chl: 0.20, qc: 1 },
      { depth: 25, temp: 26.8, salinity: 34.90, pressure: 25.2, oxygen: 205, density: 23.1, soundSpeed: 1540.5, chl: 0.30, qc: 1 },
      { depth: 50, temp: 24.5, salinity: 35.05, pressure: 50.4, oxygen: 185, density: 23.8, soundSpeed: 1536.2, chl: 0.45, qc: 1 },
      { depth: 75, temp: 20.8, salinity: 35.15, pressure: 75.6, oxygen: 160, density: 24.9, soundSpeed: 1527.5, chl: 0.25, qc: 1 },
      { depth: 100, temp: 16.5, salinity: 34.80, pressure: 100.8, oxygen: 148, density: 25.7, soundSpeed: 1515.8, chl: 0.08, qc: 1 },
      { depth: 150, temp: 12.2, salinity: 34.55, pressure: 151.3, oxygen: 135, density: 26.4, soundSpeed: 1504.5, chl: 0.01, qc: 1 },
      { depth: 200, temp: 9.8, salinity: 34.42, pressure: 201.8, oxygen: 125, density: 26.8, soundSpeed: 1498.2, chl: 0.00, qc: 1 },
      { depth: 500, temp: 5.2, salinity: 34.42, pressure: 505.0, oxygen: 115, density: 27.42, soundSpeed: 1489.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 2.8, salinity: 34.52, pressure: 1011.5, oxygen: 148, density: 27.70, soundSpeed: 1491.5, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 1.8, salinity: 34.60, pressure: 1519.2, oxygen: 170, density: 27.82, soundSpeed: 1498.8, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 1.2, salinity: 34.65, pressure: 2028.0, oxygen: 188, density: 27.88, soundSpeed: 1508.1, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== ATLANTIC OCEAN =====================
  {
    wmo: '6903820', name: 'CORIOLIS-NA-Subpolar Gyre', platformType: 'PROVOR CTS5 (Deep 4000)',
    country: 'France / EU', institution: 'Ifremer / Coriolis', region: 'North Atlantic Gyre', regionId: 'north_atlantic',
    lat: 38.65, lon: -41.20, lastUpdate: '2026-08-15T19:45:00Z', cycle: 148, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '87%',
    trajectory: [
      { lat: 37.75, lon: -42.60, date: '2026-07-16', cycle: 145 }, { lat: 38.65, lon: -41.20, date: '2026-08-15', cycle: 148 }
    ],
    profile: [
      { depth: 2, temp: 20.1, salinity: 36.40, pressure: 2.0, oxygen: 220, density: 26.1, soundSpeed: 1521.8, chl: 0.45, qc: 1 },
      { depth: 10, temp: 20.0, salinity: 36.40, pressure: 10.1, oxygen: 219, density: 26.1, soundSpeed: 1521.7, chl: 0.48, qc: 1 },
      { depth: 25, temp: 19.8, salinity: 36.41, pressure: 25.2, oxygen: 215, density: 26.2, soundSpeed: 1521.5, chl: 0.65, qc: 1 },
      { depth: 50, temp: 18.9, salinity: 36.38, pressure: 50.4, oxygen: 208, density: 26.3, soundSpeed: 1520.1, chl: 0.85, qc: 1 },
      { depth: 75, temp: 17.5, salinity: 36.32, pressure: 75.6, oxygen: 200, density: 26.6, soundSpeed: 1516.8, chl: 0.40, qc: 1 },
      { depth: 100, temp: 16.2, salinity: 36.20, pressure: 100.8, oxygen: 192, density: 26.8, soundSpeed: 1513.2, chl: 0.15, qc: 1 },
      { depth: 150, temp: 14.8, salinity: 35.95, pressure: 151.3, oxygen: 185, density: 27.0, soundSpeed: 1509.5, chl: 0.02, qc: 1 },
      { depth: 200, temp: 13.9, salinity: 35.80, pressure: 201.8, oxygen: 180, density: 27.1, soundSpeed: 1507.2, chl: 0.00, qc: 1 },
      { depth: 500, temp: 10.5, salinity: 35.40, pressure: 505.0, oxygen: 170, density: 27.45, soundSpeed: 1502.1, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 6.5, salinity: 35.02, pressure: 1011.5, oxygen: 190, density: 27.75, soundSpeed: 1501.5, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 4.5, salinity: 34.92, pressure: 1519.2, oxygen: 215, density: 27.88, soundSpeed: 1507.2, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 3.2, salinity: 34.88, pressure: 2028.0, oxygen: 235, density: 27.94, soundSpeed: 1515.0, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '6901800', name: 'IFREMER-SA-SubtropicalGyre', platformType: 'PROVOR CTD',
    country: 'France', institution: 'Ifremer / Coriolis', region: 'South Atlantic Subtropical Gyre', regionId: 'south_atlantic',
    lat: -27.80, lon: -15.40, lastUpdate: '2026-08-14T16:00:00Z', cycle: 132, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '82%',
    trajectory: [
      { lat: -28.50, lon: -16.80, date: '2026-07-15', cycle: 129 }, { lat: -27.80, lon: -15.40, date: '2026-08-14', cycle: 132 }
    ],
    profile: [
      { depth: 2, temp: 23.5, salinity: 36.80, pressure: 2.0, oxygen: 208, density: 25.5, soundSpeed: 1533.5, chl: 0.08, qc: 1 },
      { depth: 10, temp: 23.3, salinity: 36.81, pressure: 10.1, oxygen: 206, density: 25.5, soundSpeed: 1533.2, chl: 0.10, qc: 1 },
      { depth: 25, temp: 23.0, salinity: 36.82, pressure: 25.2, oxygen: 204, density: 25.6, soundSpeed: 1532.8, chl: 0.12, qc: 1 },
      { depth: 50, temp: 22.2, salinity: 36.80, pressure: 50.4, oxygen: 195, density: 25.8, soundSpeed: 1531.2, chl: 0.15, qc: 1 },
      { depth: 75, temp: 20.8, salinity: 36.70, pressure: 75.6, oxygen: 185, density: 26.1, soundSpeed: 1527.8, chl: 0.08, qc: 1 },
      { depth: 100, temp: 18.5, salinity: 36.50, pressure: 100.8, oxygen: 178, density: 26.4, soundSpeed: 1522.5, chl: 0.02, qc: 1 },
      { depth: 150, temp: 15.2, salinity: 36.10, pressure: 151.3, oxygen: 168, density: 26.8, soundSpeed: 1514.5, chl: 0.01, qc: 1 },
      { depth: 200, temp: 12.8, salinity: 35.80, pressure: 201.8, oxygen: 160, density: 27.0, soundSpeed: 1507.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 7.5, salinity: 35.20, pressure: 505.0, oxygen: 145, density: 27.42, soundSpeed: 1494.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 4.2, salinity: 34.90, pressure: 1011.5, oxygen: 168, density: 27.72, soundSpeed: 1494.8, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 2.5, salinity: 34.80, pressure: 1519.2, oxygen: 188, density: 27.84, soundSpeed: 1501.8, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 1.8, salinity: 34.75, pressure: 2028.0, oxygen: 205, density: 27.89, soundSpeed: 1510.5, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '6902890', name: 'Ifremer-Mediterranean-Basin', platformType: 'ARVOR CTD',
    country: 'France', institution: 'Ifremer / MedArgo', region: 'Mediterranean Sea', regionId: 'mediterranean',
    lat: 35.20, lon: 20.50, lastUpdate: '2026-08-15T10:00:00Z', cycle: 218, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '77%',
    trajectory: [
      { lat: 34.80, lon: 19.20, date: '2026-07-16', cycle: 215 }, { lat: 35.20, lon: 20.50, date: '2026-08-15', cycle: 218 }
    ],
    profile: [
      { depth: 2, temp: 26.8, salinity: 38.60, pressure: 2.0, oxygen: 215, density: 26.2, soundSpeed: 1544.1, chl: 0.12, qc: 1 },
      { depth: 10, temp: 26.5, salinity: 38.62, pressure: 10.1, oxygen: 213, density: 26.3, soundSpeed: 1543.5, chl: 0.15, qc: 1 },
      { depth: 25, temp: 25.8, salinity: 38.64, pressure: 25.2, oxygen: 208, density: 26.4, soundSpeed: 1542.2, chl: 0.20, qc: 1 },
      { depth: 50, temp: 24.5, salinity: 38.68, pressure: 50.4, oxygen: 195, density: 26.7, soundSpeed: 1539.8, chl: 0.28, qc: 1 },
      { depth: 75, temp: 22.8, salinity: 38.72, pressure: 75.6, oxygen: 178, density: 27.0, soundSpeed: 1535.5, chl: 0.15, qc: 1 },
      { depth: 100, temp: 20.5, salinity: 38.76, pressure: 100.8, oxygen: 162, density: 27.3, soundSpeed: 1529.8, chl: 0.05, qc: 1 },
      { depth: 150, temp: 17.2, salinity: 38.80, pressure: 151.3, oxygen: 148, density: 27.6, soundSpeed: 1521.5, chl: 0.01, qc: 1 },
      { depth: 200, temp: 14.8, salinity: 38.82, pressure: 201.8, oxygen: 138, density: 27.8, soundSpeed: 1514.5, chl: 0.00, qc: 1 },
      { depth: 300, temp: 13.2, salinity: 38.84, pressure: 302.9, oxygen: 128, density: 27.9, soundSpeed: 1510.5, chl: 0.00, qc: 1 },
      { depth: 500, temp: 13.0, salinity: 38.85, pressure: 505.0, oxygen: 120, density: 27.92, soundSpeed: 1512.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 13.0, salinity: 38.85, pressure: 1011.5, oxygen: 115, density: 27.95, soundSpeed: 1518.5, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 13.1, salinity: 38.86, pressure: 1519.2, oxygen: 112, density: 27.96, soundSpeed: 1524.5, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 13.1, salinity: 38.86, pressure: 2028.0, oxygen: 110, density: 27.97, soundSpeed: 1530.8, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== SOUTHERN OCEAN =====================
  {
    wmo: '5906532', name: 'CSIRO-SO-PolarFront (Deep Argo)', platformType: 'Deep SOLO (6000m rated)',
    country: 'Australia', institution: 'CSIRO / IMOS', region: 'Southern Ocean (Antarctic)', regionId: 'southern_ocean',
    lat: -54.20, lon: 74.80, lastUpdate: '2026-08-14T22:10:00Z', cycle: 112, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Dissolved O2'], transmission: 'Iridium SBD', batteryRemaining: '84%',
    trajectory: [
      { lat: -53.70, lon: 72.80, date: '2026-07-15', cycle: 109 }, { lat: -54.20, lon: 74.80, date: '2026-08-14', cycle: 112 }
    ],
    profile: [
      { depth: 2, temp: 1.8, salinity: 33.90, pressure: 2.0, oxygen: 330, density: 27.0, soundSpeed: 1456.2, chl: 0.85, qc: 1 },
      { depth: 10, temp: 1.8, salinity: 33.91, pressure: 10.1, oxygen: 328, density: 27.0, soundSpeed: 1456.3, chl: 0.90, qc: 1 },
      { depth: 25, temp: 1.7, salinity: 33.92, pressure: 25.2, oxygen: 325, density: 27.0, soundSpeed: 1456.1, chl: 0.95, qc: 1 },
      { depth: 50, temp: 1.5, salinity: 33.95, pressure: 50.4, oxygen: 318, density: 27.1, soundSpeed: 1455.8, chl: 0.60, qc: 1 },
      { depth: 75, temp: 1.2, salinity: 34.02, pressure: 75.6, oxygen: 305, density: 27.15, soundSpeed: 1455.1, chl: 0.20, qc: 1 },
      { depth: 100, temp: 0.9, salinity: 34.15, pressure: 100.8, oxygen: 290, density: 27.28, soundSpeed: 1454.4, chl: 0.05, qc: 1 },
      { depth: 150, temp: 1.6, salinity: 34.35, pressure: 151.3, oxygen: 240, density: 27.42, soundSpeed: 1458.8, chl: 0.00, qc: 1 },
      { depth: 200, temp: 2.1, salinity: 34.50, pressure: 201.8, oxygen: 210, density: 27.50, soundSpeed: 1462.4, chl: 0.00, qc: 1 },
      { depth: 300, temp: 2.3, salinity: 34.62, pressure: 302.9, oxygen: 185, density: 27.58, soundSpeed: 1465.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 2.1, salinity: 34.70, pressure: 505.0, oxygen: 165, density: 27.68, soundSpeed: 1468.9, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 1.6, salinity: 34.74, pressure: 1011.5, oxygen: 160, density: 27.78, soundSpeed: 1476.2, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 1.1, salinity: 34.72, pressure: 1519.2, oxygen: 175, density: 27.83, soundSpeed: 1484.5, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 0.7, salinity: 34.70, pressure: 2028.0, oxygen: 190, density: 27.87, soundSpeed: 1493.1, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '5906780', name: 'CSIRO-ACC-CircumpolarCurrent', platformType: 'PROVOR BGC (Deep)',
    country: 'Australia / EU', institution: 'CSIRO / IMOS', region: 'Antarctic Circumpolar Current', regionId: 'antarctic_circumpolar',
    lat: -51.80, lon: -8.50, lastUpdate: '2026-08-15T03:00:00Z', cycle: 88, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'BGC-Argo Suite'], transmission: 'Iridium SBD', batteryRemaining: '91%',
    trajectory: [
      { lat: -52.40, lon: -11.20, date: '2026-07-16', cycle: 85 }, { lat: -51.80, lon: -8.50, date: '2026-08-15', cycle: 88 }
    ],
    profile: [
      { depth: 2, temp: 4.2, salinity: 33.80, pressure: 2.0, oxygen: 310, density: 26.8, soundSpeed: 1464.5, chl: 1.20, qc: 1 },
      { depth: 10, temp: 4.1, salinity: 33.82, pressure: 10.1, oxygen: 308, density: 26.8, soundSpeed: 1464.6, chl: 1.25, qc: 1 },
      { depth: 25, temp: 3.9, salinity: 33.85, pressure: 25.2, oxygen: 305, density: 26.9, soundSpeed: 1464.2, chl: 1.30, qc: 1 },
      { depth: 50, temp: 3.5, salinity: 33.90, pressure: 50.4, oxygen: 295, density: 26.95, soundSpeed: 1463.5, chl: 0.90, qc: 1 },
      { depth: 75, temp: 3.0, salinity: 33.95, pressure: 75.6, oxygen: 280, density: 27.0, soundSpeed: 1462.5, chl: 0.35, qc: 1 },
      { depth: 100, temp: 2.5, salinity: 34.05, pressure: 100.8, oxygen: 265, density: 27.1, soundSpeed: 1461.5, chl: 0.08, qc: 1 },
      { depth: 150, temp: 2.2, salinity: 34.20, pressure: 151.3, oxygen: 248, density: 27.22, soundSpeed: 1461.2, chl: 0.00, qc: 1 },
      { depth: 200, temp: 2.1, salinity: 34.38, pressure: 201.8, oxygen: 235, density: 27.35, soundSpeed: 1461.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 2.0, salinity: 34.65, pressure: 505.0, oxygen: 195, density: 27.65, soundSpeed: 1466.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 1.7, salinity: 34.72, pressure: 1011.5, oxygen: 178, density: 27.76, soundSpeed: 1474.8, chl: 0.00, qc: 1 },
      { depth: 1500, temp: 1.2, salinity: 34.70, pressure: 1519.2, oxygen: 182, density: 27.82, soundSpeed: 1482.5, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 0.8, salinity: 34.68, pressure: 2028.0, oxygen: 188, density: 27.86, soundSpeed: 1491.5, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== ARCTIC OCEAN =====================
  {
    wmo: '6904117', name: 'IMB-Arctic-Beaufort-Gyre', platformType: 'ITP (Ice-Tethered Profiler) / APEX',
    country: 'USA / Canada', institution: 'WHOI / DFO', region: 'Arctic Ocean', regionId: 'arctic',
    lat: 76.50, lon: -145.20, lastUpdate: '2026-08-15T12:00:00Z', cycle: 58, status: 'Active (Profiling)',
    maxDepth: 800, sensors: ['SBE41CP CTD', 'Dissolved O2'], transmission: 'Iridium SBD', batteryRemaining: '92%',
    trajectory: [
      { lat: 75.80, lon: -147.50, date: '2026-07-16', cycle: 55 }, { lat: 76.50, lon: -145.20, date: '2026-08-15', cycle: 58 }
    ],
    profile: [
      { depth: 2, temp: -1.5, salinity: 29.50, pressure: 2.0, oxygen: 385, density: 23.2, soundSpeed: 1435.2, chl: 0.05, qc: 1 },
      { depth: 10, temp: -1.6, salinity: 30.20, pressure: 10.1, oxygen: 380, density: 23.8, soundSpeed: 1435.5, chl: 0.08, qc: 1 },
      { depth: 25, temp: -1.7, salinity: 31.50, pressure: 25.2, oxygen: 370, density: 24.9, soundSpeed: 1436.2, chl: 0.12, qc: 1 },
      { depth: 50, temp: -1.4, salinity: 33.20, pressure: 50.4, oxygen: 340, density: 26.4, soundSpeed: 1438.5, chl: 0.08, qc: 1 },
      { depth: 75, temp: -0.5, salinity: 34.15, pressure: 75.6, oxygen: 295, density: 27.2, soundSpeed: 1441.8, chl: 0.02, qc: 1 },
      { depth: 100, temp: 0.8, salinity: 34.58, pressure: 100.8, oxygen: 260, density: 27.45, soundSpeed: 1446.5, chl: 0.00, qc: 1 },
      { depth: 150, temp: 1.5, salinity: 34.82, pressure: 151.3, oxygen: 230, density: 27.62, soundSpeed: 1450.8, chl: 0.00, qc: 1 },
      { depth: 200, temp: 1.2, salinity: 34.88, pressure: 201.8, oxygen: 218, density: 27.70, soundSpeed: 1454.5, chl: 0.00, qc: 1 },
      { depth: 300, temp: 0.8, salinity: 34.90, pressure: 302.9, oxygen: 210, density: 27.75, soundSpeed: 1460.5, chl: 0.00, qc: 1 },
      { depth: 500, temp: 0.2, salinity: 34.92, pressure: 505.0, oxygen: 205, density: 27.80, soundSpeed: 1469.5, chl: 0.00, qc: 1 },
      { depth: 800, temp: -0.2, salinity: 34.94, pressure: 809.0, oxygen: 200, density: 27.84, soundSpeed: 1480.2, chl: 0.00, qc: 1 }
    ]
  },
  {
    wmo: '6904245', name: 'BSH-BarentsSea-ArcticFront', platformType: 'PROVOR CTD',
    country: 'Germany / Norway', institution: 'BSH / NPI', region: 'Barents Sea', regionId: 'barents_sea',
    lat: 75.20, lon: 38.80, lastUpdate: '2026-08-14T08:00:00Z', cycle: 74, status: 'Active (Profiling)',
    maxDepth: 500, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '88%',
    trajectory: [
      { lat: 74.80, lon: 37.20, date: '2026-07-15', cycle: 71 }, { lat: 75.20, lon: 38.80, date: '2026-08-14', cycle: 74 }
    ],
    profile: [
      { depth: 2, temp: 6.5, salinity: 34.20, pressure: 2.0, oxygen: 340, density: 26.5, soundSpeed: 1470.2, chl: 1.85, qc: 1 },
      { depth: 10, temp: 6.2, salinity: 34.25, pressure: 10.1, oxygen: 335, density: 26.6, soundSpeed: 1469.5, chl: 2.10, qc: 1 },
      { depth: 25, temp: 5.5, salinity: 34.30, pressure: 25.2, oxygen: 328, density: 26.7, soundSpeed: 1468.2, chl: 2.50, qc: 1 },
      { depth: 50, temp: 4.2, salinity: 34.40, pressure: 50.4, oxygen: 312, density: 26.9, soundSpeed: 1465.5, chl: 1.80, qc: 1 },
      { depth: 75, temp: 2.8, salinity: 34.50, pressure: 75.6, oxygen: 295, density: 27.1, soundSpeed: 1462.5, chl: 0.85, qc: 1 },
      { depth: 100, temp: 1.8, salinity: 34.62, pressure: 100.8, oxygen: 278, density: 27.25, soundSpeed: 1459.8, chl: 0.25, qc: 1 },
      { depth: 150, temp: 1.2, salinity: 34.72, pressure: 151.3, oxygen: 262, density: 27.35, soundSpeed: 1459.2, chl: 0.05, qc: 1 },
      { depth: 200, temp: 0.9, salinity: 34.78, pressure: 201.8, oxygen: 250, density: 27.42, soundSpeed: 1460.5, chl: 0.00, qc: 1 },
      { depth: 300, temp: 0.5, salinity: 34.82, pressure: 302.9, oxygen: 240, density: 27.48, soundSpeed: 1463.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 0.2, salinity: 34.85, pressure: 505.0, oxygen: 232, density: 27.52, soundSpeed: 1470.5, chl: 0.00, qc: 1 }
    ]
  },
  
  // ===================== RED SEA =====================
  {
    wmo: '3902201', name: 'Coriolis-RedSea-Rift', platformType: 'APEX BGC',
    country: 'France / Saudi Arabia', institution: 'Coriolis / KAUST', region: 'Red Sea', regionId: 'red_sea',
    lat: 22.45, lon: 38.10, lastUpdate: '2026-08-16T09:00:00Z', cycle: 142, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD', 'Dissolved O2'], transmission: 'Iridium SBD', batteryRemaining: '89%',
    trajectory: [
      { lat: 21.80, lon: 37.50, date: '2026-07-17', cycle: 139 }, { lat: 22.45, lon: 38.10, date: '2026-08-16', cycle: 142 }
    ],
    profile: [
      { depth: 2, temp: 30.2, salinity: 40.20, pressure: 2.0, oxygen: 198, density: 26.2, soundSpeed: 1548.5, chl: 0.12, qc: 1 },
      { depth: 10, temp: 29.8, salinity: 40.22, pressure: 10.1, oxygen: 196, density: 26.3, soundSpeed: 1548.2, chl: 0.15, qc: 1 },
      { depth: 25, temp: 28.5, salinity: 40.25, pressure: 25.2, oxygen: 190, density: 26.8, soundSpeed: 1546.5, chl: 0.28, qc: 1 },
      { depth: 50, temp: 26.8, salinity: 40.30, pressure: 50.4, oxygen: 178, density: 27.4, soundSpeed: 1542.4, chl: 0.35, qc: 1 },
      { depth: 75, temp: 25.0, salinity: 40.35, pressure: 75.6, oxygen: 165, density: 27.9, soundSpeed: 1538.1, chl: 0.20, qc: 1 },
      { depth: 100, temp: 23.4, salinity: 40.40, pressure: 100.8, oxygen: 152, density: 28.4, soundSpeed: 1534.5, chl: 0.08, qc: 1 },
      { depth: 200, temp: 21.9, salinity: 40.50, pressure: 201.8, oxygen: 125, density: 28.9, soundSpeed: 1531.2, chl: 0.00, qc: 1 },
      { depth: 500, temp: 21.7, salinity: 40.58, pressure: 505.0, oxygen: 110, density: 29.0, soundSpeed: 1532.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 21.7, salinity: 40.62, pressure: 1011.5, oxygen: 108, density: 29.1, soundSpeed: 1538.6, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 21.7, salinity: 40.65, pressure: 2028.0, oxygen: 112, density: 29.1, soundSpeed: 1549.5, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== CARIBBEAN SEA =====================
  {
    wmo: '4901844', name: 'NOAA-Caribbean-DeepBasin', platformType: 'APEX CTD',
    country: 'USA', institution: 'NOAA / AOML', region: 'Caribbean Sea', regionId: 'caribbean_sea',
    lat: 14.80, lon: -74.50, lastUpdate: '2026-08-15T06:00:00Z', cycle: 204, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '82%',
    trajectory: [
      { lat: 14.10, lon: -75.80, date: '2026-07-16', cycle: 200 }, { lat: 14.80, lon: -74.50, date: '2026-08-15', cycle: 204 }
    ],
    profile: [
      { depth: 2, temp: 28.9, salinity: 35.50, pressure: 2.0, oxygen: 205, density: 22.8, soundSpeed: 1542.4, chl: 0.18, qc: 1 },
      { depth: 10, temp: 28.8, salinity: 35.52, pressure: 10.1, oxygen: 204, density: 22.9, soundSpeed: 1542.5, chl: 0.20, qc: 1 },
      { depth: 50, temp: 27.5, salinity: 35.70, pressure: 50.4, oxygen: 198, density: 23.4, soundSpeed: 1540.8, chl: 0.45, qc: 1 },
      { depth: 100, temp: 24.2, salinity: 36.40, pressure: 100.8, oxygen: 175, density: 24.9, soundSpeed: 1533.6, chl: 0.15, qc: 1 },
      { depth: 200, temp: 18.5, salinity: 36.62, pressure: 201.8, oxygen: 142, density: 26.6, soundSpeed: 1519.8, chl: 0.00, qc: 1 },
      { depth: 500, temp: 11.2, salinity: 35.40, pressure: 505.0, oxygen: 120, density: 27.15, soundSpeed: 1498.4, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 6.8, salinity: 34.90, pressure: 1011.5, oxygen: 135, density: 27.42, soundSpeed: 1496.1, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 4.1, salinity: 34.98, pressure: 2028.0, oxygen: 148, density: 27.54, soundSpeed: 1506.8, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== SOUTH CHINA SEA =====================
  {
    wmo: '5903212', name: 'SOA-SouthChinaSea-Basin', platformType: 'PROVOR CTD',
    country: 'China', institution: 'SOA / FIO', region: 'South China Sea', regionId: 'south_china_sea',
    lat: 13.50, lon: 113.80, lastUpdate: '2026-08-16T11:00:00Z', cycle: 95, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '79%',
    trajectory: [
      { lat: 12.90, lon: 112.50, date: '2026-07-17', cycle: 92 }, { lat: 13.50, lon: 113.80, date: '2026-08-16', cycle: 95 }
    ],
    profile: [
      { depth: 2, temp: 29.5, salinity: 33.40, pressure: 2.0, oxygen: 202, density: 21.4, soundSpeed: 1543.8, chl: 0.22, qc: 1 },
      { depth: 10, temp: 29.3, salinity: 33.42, pressure: 10.1, oxygen: 201, density: 21.5, soundSpeed: 1543.6, chl: 0.25, qc: 1 },
      { depth: 50, temp: 26.8, salinity: 33.80, pressure: 50.4, oxygen: 192, density: 22.6, soundSpeed: 1538.9, chl: 0.65, qc: 1 },
      { depth: 100, temp: 21.4, salinity: 34.42, pressure: 100.8, oxygen: 158, density: 24.6, soundSpeed: 1526.4, chl: 0.12, qc: 1 },
      { depth: 200, temp: 15.8, salinity: 34.60, pressure: 201.8, oxygen: 115, density: 25.8, soundSpeed: 1511.2, chl: 0.00, qc: 1 },
      { depth: 500, temp: 8.5, salinity: 34.50, pressure: 505.0, oxygen: 98, density: 26.95, soundSpeed: 1494.6, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 4.8, salinity: 34.52, pressure: 1011.5, oxygen: 112, density: 27.42, soundSpeed: 1493.5, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.2, salinity: 34.62, pressure: 2028.0, oxygen: 135, density: 27.58, soundSpeed: 1502.4, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== TASMAN SEA =====================
  {
    wmo: '5904588', name: 'CSIRO-Tasman-Boundary', platformType: 'APEX CTD',
    country: 'Australia', institution: 'CSIRO / IMOS', region: 'Tasman Sea', regionId: 'tasman_sea',
    lat: -38.20, lon: 158.50, lastUpdate: '2026-08-14T05:00:00Z', cycle: 114, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '85%',
    trajectory: [
      { lat: -39.10, lon: 157.00, date: '2026-07-15', cycle: 110 }, { lat: -38.20, lon: 158.50, date: '2026-08-14', cycle: 114 }
    ],
    profile: [
      { depth: 2, temp: 17.2, salinity: 35.40, pressure: 2.0, oxygen: 242, density: 25.8, soundSpeed: 1513.5, chl: 0.85, qc: 1 },
      { depth: 10, temp: 17.1, salinity: 35.42, pressure: 10.1, oxygen: 240, density: 25.8, soundSpeed: 1513.4, chl: 0.90, qc: 1 },
      { depth: 50, temp: 16.5, salinity: 35.45, pressure: 50.4, oxygen: 235, density: 26.0, soundSpeed: 1511.9, chl: 1.20, qc: 1 },
      { depth: 100, temp: 14.8, salinity: 35.48, pressure: 100.8, oxygen: 218, density: 26.4, soundSpeed: 1506.2, chl: 0.35, qc: 1 },
      { depth: 200, temp: 12.2, salinity: 35.35, pressure: 201.8, oxygen: 195, density: 26.8, soundSpeed: 1498.2, chl: 0.00, qc: 1 },
      { depth: 500, temp: 8.4, salinity: 34.80, pressure: 505.0, oxygen: 172, density: 27.05, soundSpeed: 1488.5, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 4.8, salinity: 34.45, pressure: 1011.5, oxygen: 185, density: 27.35, soundSpeed: 1489.1, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 2.8, salinity: 34.62, pressure: 2028.0, oxygen: 198, density: 27.52, soundSpeed: 1501.2, chl: 0.00, qc: 1 }
    ]
  },

  // ===================== GULF OF MEXICO =====================
  {
    wmo: '4902111', name: 'NOAA-GulfMexico-LoopCurrent', platformType: 'ARVOR CTD',
    country: 'USA / Mexico', institution: 'NOAA / AOML', region: 'Gulf of Mexico', regionId: 'gulf_of_mexico',
    lat: 24.80, lon: -89.50, lastUpdate: '2026-08-15T09:00:00Z', cycle: 156, status: 'Active (Profiling)',
    maxDepth: 2000, sensors: ['SBE41CP CTD'], transmission: 'Iridium SBD', batteryRemaining: '78%',
    trajectory: [
      { lat: 23.90, lon: -90.20, date: '2026-07-16', cycle: 152 }, { lat: 24.80, lon: -89.50, date: '2026-08-15', cycle: 156 }
    ],
    profile: [
      { depth: 2, temp: 29.8, salinity: 36.10, pressure: 2.0, oxygen: 198, density: 23.2, soundSpeed: 1545.2, chl: 0.15, qc: 1 },
      { depth: 10, temp: 29.6, salinity: 36.12, pressure: 10.1, oxygen: 196, density: 23.3, soundSpeed: 1544.8, chl: 0.18, qc: 1 },
      { depth: 50, temp: 28.2, salinity: 36.25, pressure: 50.4, oxygen: 190, density: 23.8, soundSpeed: 1541.9, chl: 0.38, qc: 1 },
      { depth: 100, temp: 23.8, salinity: 36.58, pressure: 100.8, oxygen: 162, density: 25.1, soundSpeed: 1531.5, chl: 0.08, qc: 1 },
      { depth: 200, temp: 17.9, salinity: 36.40, pressure: 201.8, oxygen: 125, density: 26.6, soundSpeed: 1515.6, chl: 0.00, qc: 1 },
      { depth: 500, temp: 10.5, salinity: 35.25, pressure: 505.0, oxygen: 105, density: 27.2, soundSpeed: 1495.2, chl: 0.00, qc: 1 },
      { depth: 1000, temp: 6.2, salinity: 34.88, pressure: 1011.5, oxygen: 120, density: 27.48, soundSpeed: 1493.4, chl: 0.00, qc: 1 },
      { depth: 2000, temp: 4.2, salinity: 34.95, pressure: 2028.0, oxygen: 142, density: 27.52, soundSpeed: 1507.2, chl: 0.00, qc: 1 }
    ]
  }
];

export const SUGGESTED_QUERIES = [
  { text: "Show temperature in Bay of Bengal", tag: "Temperature", region: "bay_of_bengal", icon: "🌡️" },
  { text: "Compare salinity between Bay of Bengal and Arabian Sea", tag: "BoB vs AS", region: "bay_of_bengal", icon: "⚖️" },
  { text: "Show the Oxygen Minimum Zone in the Arabian Sea", tag: "OMZ", region: "arabian_sea", icon: "🫧" },
  { text: "What is happening in the Pacific Warm Pool right now?", tag: "Pacific SST", region: "pacific_warm_pool", icon: "🌊" },
  { text: "Show Arctic Ocean temperature — is it warming?", tag: "Arctic Warming", region: "arctic", icon: "❄️" },
  { text: "Show Antarctic Circumpolar Current temperature inversion", tag: "Southern Ocean", region: "southern_ocean", icon: "🐧" },
  { text: "Compare North Atlantic and South Atlantic salinity", tag: "Atlantic", region: "north_atlantic", icon: "🌍" },
  { text: "Show Mediterranean Sea deep water formation", tag: "Mediterranean", region: "mediterranean", icon: "🏖️" },
  { text: "Why does the Peru Current cause upwelling?", tag: "Upwelling", region: "peru_current", icon: "🐟" },
  { text: "Show Kuroshio Current temperature off Japan", tag: "Kuroshio", region: "kuroshio", icon: "🗾" }
];
