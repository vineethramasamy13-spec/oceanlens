import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Navigation, Maximize2, Compass, Radio } from 'lucide-react';
import { ARGO_FLOATS, ARGO_REGIONS } from '../data/argoDataset';

export default function OceanMap({ 
  selectedFloat, 
  compareFloat, 
  allFloats = ARGO_FLOATS, 
  activeRegionId = 'bay_of_bengal',
  onSelectFloat,
  height = '420px',
  interactive = true 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const trajectoryGroupRef = useRef(null);
  const [showTrajectories, setShowTrajectories] = useState(true);
  const [overlayMode, setOverlayMode] = useState('none'); // 'none', 'chlorophyll', 'vessels'
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const tileLayerRef = useRef(null);
  const chlorophyllLayerRef = useRef(null);
  const vesselsLayerRef = useRef(null);
  const shippingRoutesGroupRef = useRef(null);

  // Monitor document theme classes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Setup Overlay layers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Initialize shipping routes group
    shippingRoutesGroupRef.current = L.layerGroup();

    // 1. Chlorophyll-a layer (MODIS Terra/Aqua from NASA GIBS)
    const chlorophyllUrl = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_Chlorophyll_A/default/2023-08-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png';
    chlorophyllLayerRef.current = L.tileLayer(chlorophyllUrl, {
      opacity: 0.5,
      maxZoom: 9,
      attribution: 'NASA GIBS'
    });

    // 2. Vessel/Seamark overlay
    const seamarkUrl = 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png';
    vesselsLayerRef.current = L.tileLayer(seamarkUrl, {
      maxZoom: 18,
      attribution: 'OpenSeaMap'
    });

    // Shipping routes data
    const routes = [
      // Malacca Strait to Red Sea route
      [[1.3, 103.5], [5.6, 95.0], [6.0, 79.5], [11.8, 51.5], [12.5, 43.3]],
      // Caribbean Sea Route (Panama to Europe)
      [[9.1, -79.8], [15.0, -75.0], [25.0, -60.0], [35.0, -40.0], [45.0, -20.0]],
      // Gulf of Mexico Hubs (Houston to Florida)
      [[29.0, -94.0], [25.0, -90.0], [24.5, -83.0], [25.8, -80.2]],
      // Tasman Sea (Sydney to Auckland)
      [[-33.8, 151.2], [-35.0, 160.0], [-36.8, 174.7]]
    ];

    routes.forEach(route => {
      const routeLine = L.polyline(route, {
        color: '#f59e0b',
        weight: 1.8,
        dashArray: '4, 8',
        opacity: 0.7
      });
      shippingRoutesGroupRef.current.addLayer(routeLine);
    });

    return () => {
      if (chlorophyllLayerRef.current) chlorophyllLayerRef.current.remove();
      if (vesselsLayerRef.current) vesselsLayerRef.current.remove();
      if (shippingRoutesGroupRef.current) shippingRoutesGroupRef.current.remove();
    };
  }, []);

  // Handle toggling overlay modes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove all first
    if (chlorophyllLayerRef.current) map.removeLayer(chlorophyllLayerRef.current);
    if (vesselsLayerRef.current) map.removeLayer(vesselsLayerRef.current);
    if (shippingRoutesGroupRef.current) map.removeLayer(shippingRoutesGroupRef.current);

    // Add selected
    if (overlayMode === 'chlorophyll' && chlorophyllLayerRef.current) {
      map.addLayer(chlorophyllLayerRef.current);
    } else if (overlayMode === 'vessels') {
      if (vesselsLayerRef.current) map.addLayer(vesselsLayerRef.current);
      if (shippingRoutesGroupRef.current) map.addLayer(shippingRoutesGroupRef.current);
    }
  }, [overlayMode]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center on selected region or default
    const region = ARGO_REGIONS.find(r => r.id === activeRegionId) || ARGO_REGIONS[0];

    const map = L.map(mapContainerRef.current, {
      center: region.center,
      zoom: region.zoom,
      zoomControl: false,
      attributionControl: false
    });

    // Theme-aware tile source
    const isDark = document.documentElement.classList.contains('dark');
    const tileUrl = isDark 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    markersGroupRef.current = L.layerGroup().addTo(map);
    trajectoryGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map tiles dynamically when theme swaps
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const isDark = document.documentElement.classList.contains('dark');
    const newUrl = isDark 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    tileLayerRef.current.setUrl(newUrl);
  }, [currentTheme]);

  // Update Region Center / Bounds when selectedFloat or activeRegionId changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (selectedFloat && compareFloat) {
      // Fit bounds to show both floats
      const bounds = L.latLngBounds(
        [selectedFloat.lat, selectedFloat.lon],
        [compareFloat.lat, compareFloat.lon]
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6, animate: true });
    } else if (selectedFloat) {
      map.setView([selectedFloat.lat, selectedFloat.lon], 6, { animate: true });
    } else {
      const region = ARGO_REGIONS.find(r => r.id === activeRegionId) || ARGO_REGIONS[0];
      map.setView(region.center, region.zoom, { animate: true });
    }
  }, [selectedFloat, compareFloat, activeRegionId]);

  // Render Markers and Trajectories
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || !trajectoryGroupRef.current) return;

    markersGroupRef.current.clearLayers();
    trajectoryGroupRef.current.clearLayers();

    allFloats.forEach(float => {
      const isSelected = selectedFloat?.wmo === float.wmo;
      const isCompare = compareFloat?.wmo === float.wmo;

      let color = '#14b8a6'; // teal default
      let glowClass = '';
      let radius = 7;

      if (isSelected) {
        color = '#06b6d4'; // cyan primary
        glowClass = 'animate-ping-slow';
        radius = 10;
      } else if (isCompare) {
        color = '#f43f5e'; // coral compare
        glowClass = 'animate-ping-slow';
        radius = 10;
      }

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-argo-marker',
        html: `
          <div class="relative flex items-center justify-center">
            ${(isSelected || isCompare) ? `
              <span class="absolute w-8 h-8 rounded-full opacity-60 animate-ping" style="background-color: ${color};"></span>
              <span class="absolute w-10 h-10 rounded-full opacity-30 animate-pulse" style="background-color: ${color};"></span>
            ` : ''}
            <div class="w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-transform duration-300 hover:scale-125" style="background-color: ${color};">
              <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            ${(isSelected || isCompare) ? `
              <div class="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-ocean-950/90 text-white border border-slate-700 shadow-md">
                ${float.wmo}
              </div>
            ` : ''}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14]
      });

      const marker = L.marker([float.lat, float.lon], { icon: customIcon });

      // Rich Popup content
      const surfaceTemp = float.profile[0]?.temp || 'N/A';
      const surfaceSal = float.profile[0]?.salinity || 'N/A';
      
      const popupHtml = `
        <div class="p-3 font-sans min-w-[200px]">
          <div class="flex items-center justify-between gap-2 border-b border-slate-700 pb-2 mb-2">
            <span class="font-bold text-cyan-300 font-mono text-xs">ARGO #${float.wmo}</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded font-semibold ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : isCompare ? 'bg-coral-500/20 text-coral-300' : 'bg-slate-800 text-slate-300'}">
              Cycle ${float.cycle}
            </span>
          </div>
          <p class="text-xs font-medium text-white mb-1">${float.name}</p>
          <p class="text-[11px] text-slate-400 mb-2">📍 ${float.lat.toFixed(2)}°N, ${float.lon.toFixed(2)}°E</p>
          
          <div class="grid grid-cols-2 gap-1.5 text-xs bg-ocean-950/60 p-2 rounded-lg border border-slate-800 mb-2 font-mono">
            <div>
              <span class="text-[10px] text-slate-400 block">SST (0m)</span>
              <span class="text-cyan-400 font-bold">${surfaceTemp}°C</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Salinity</span>
              <span class="text-teal-400 font-bold">${surfaceSal} PSU</span>
            </div>
          </div>
          
          <div class="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Sensors: CTD</span>
            <span class="bg-amber-500/15 text-amber-450 border border-amber-500/30 px-1 py-0.2 rounded font-bold text-[8.5px] font-mono">Estimated Profile</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        if (onSelectFloat) {
          onSelectFloat(float);
        }
      });

      markersGroupRef.current.addLayer(marker);

      // Trajectory polyline for selected/comparison float
      if (showTrajectories && (isSelected || isCompare) && float.trajectory && float.trajectory.length > 1) {
        const latlngs = float.trajectory.map(t => [t.lat, t.lon]);
        
        const polyline = L.polyline(latlngs, {
          color: isSelected ? '#06b6d4' : '#f43f5e',
          weight: 2.5,
          dashArray: '4, 6',
          opacity: 0.85
        });

        // Add small dots for intermediate cycles
        float.trajectory.slice(0, -1).forEach(pt => {
          const trailMarker = L.circleMarker([pt.lat, pt.lon], {
            radius: 3,
            color: isSelected ? '#06b6d4' : '#f43f5e',
            fillColor: '#020b14',
            fillOpacity: 1,
            weight: 1.5
          }).bindTooltip(`Cycle ${pt.cycle} (${pt.date})`, { direction: 'top', className: 'text-[10px]' });
          trajectoryGroupRef.current.addLayer(trailMarker);
        });

        trajectoryGroupRef.current.addLayer(polyline);
      }
    });

  }, [allFloats, selectedFloat, compareFloat, showTrajectories, onSelectFloat]);

  const handleResetBounds = () => {
    if (!mapInstanceRef.current) return;
    const region = ARGO_REGIONS.find(r => r.id === activeRegionId) || ARGO_REGIONS[0];
    mapInstanceRef.current.setView(region.center, region.zoom, { animate: true });
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl">
      {/* Map Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-ocean-950/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-bold text-slate-200">Global ARGO Float Trajectories</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-300 font-mono">{allFloats.length} floats tracked</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Trajectory button */}
          <button
            onClick={() => setShowTrajectories(!showTrajectories)}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              showTrajectories 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Trajectories: {showTrajectories ? 'ON' : 'OFF'}
          </button>

          {/* Sat-Chlorophyll overlay button */}
          <button
            onClick={() => setOverlayMode(overlayMode === 'chlorophyll' ? 'none' : 'chlorophyll')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              overlayMode === 'chlorophyll'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
            }`}
            title="Toggle Satellite Chlorophyll-A Density"
          >
            Chlorophyll
          </button>

          {/* Vessels overlay button */}
          <button
            onClick={() => setOverlayMode(overlayMode === 'vessels' ? 'none' : 'vessels')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              overlayMode === 'vessels'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
            }`}
            title="Toggle Shipping Lanes & Maritime Seamarks"
          >
            Vessels
          </button>

          {/* Reset View button */}
          <button
            onClick={handleResetBounds}
            title="Reset Map Center"
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Map Leaflet Container */}
      <div 
        ref={mapContainerRef} 
        style={{ height, width: '100%' }}
        className="z-10"
      />

      {/* Legend Badge Overlay */}
      <div className="absolute bottom-3 left-3 z-20 glass-panel p-2 rounded-xl border border-slate-800 text-[11px] space-y-1 backdrop-blur-md pointer-events-none">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan"></span>
          <span>Primary Active Float</span>
        </div>
        {compareFloat && (
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-coral-500 shadow-glow-coral"></span>
            <span>Comparison Float</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          <span>Active ARGO Network</span>
        </div>
        
        {overlayMode === 'chlorophyll' && (
          <div className="flex items-center gap-2 text-emerald-400 border-t border-slate-800 pt-1 mt-1 font-bold">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 animate-pulse"></span>
            <span>MODIS Chlorophyll-a Active</span>
          </div>
        )}
        {overlayMode === 'vessels' && (
          <div className="flex items-center gap-2 text-amber-400 border-t border-slate-800 pt-1 mt-1 font-bold">
            <span className="w-2.5 h-0.5 border-t border-amber-500 border-dashed inline-block"></span>
            <span>Active Shipping Lanes</span>
          </div>
        )}
      </div>
    </div>
  );
}
