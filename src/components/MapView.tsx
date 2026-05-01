import { MapContainer, TileLayer, CircleMarker, Popup, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GridCell } from '../types/CrimeIncident';
import { useEffect, useState } from 'react';

export type MapStyle = 'political' | 'geographic' | 'minimal';

interface MapViewProps {
  data: GridCell[];
  center?: [number, number];
  zoom?: number;
  isDark?: boolean;
  mapStyle?: MapStyle;
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ 
  data, 
  center = [20.5937, 78.9629], 
  zoom = 5, 
  isDark = true,
  mapStyle = 'political'
}: MapViewProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Fetch simplified Indian state boundaries for clear borders
    fetch('https://raw.githubusercontent.com/datameet/maps/master/States/Admin2.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Failed to load boundaries', err));
  }, []);

  const getColor = (score: number) => {
    if (score <= 40) return '#f43f5e'; // rose-500
    if (score <= 70) return '#f59e0b'; // amber-500
    return '#10b981'; // emerald-500
  };

  const getTileConfig = () => {
    switch (mapStyle) {
      case 'geographic':
        return {
          base: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          ref: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        };
      case 'minimal':
        return {
          base: isDark 
            ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
          ref: isDark
            ? "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        };
      case 'political':
      default:
        return {
          base: isDark 
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          ref: isDark
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
            : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        };
    }
  };

  const tiles = getTileConfig();

  return (
    <div className={`w-full h-full overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          key={`${mapStyle}-base-${isDark}`}
          attribution='&copy; Esri &copy; OpenStreetMap contributors'
          url={tiles.base}
        />
        
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={(feature) => {
              // Generate a stable color based on state name
              const name = feature?.properties?.ST_NM || '';
              const hash = name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
              const colors = isDark 
                ? ['#334155', '#475569', '#1e293b', '#0f172a', '#3f3f46']
                : ['#cbd5e1', '#94a3b8', '#e2e8f0', '#f1f5f9', '#d1d5db'];
              const color = colors[hash % colors.length];

              return {
                color: isDark ? '#64748b' : '#475569',
                weight: 1.5,
                fillColor: color,
                fillOpacity: isDark ? 0.15 : 0.05,
              };
            }} 
          />
        )}

        <TileLayer
          key={`${mapStyle}-ref-${isDark}`}
          attribution='&copy; Esri'
          url={tiles.ref}
          opacity={0.8}
        />
        
        {data.map((cell) => (
          <CircleMarker
            key={cell.id}
            center={[cell.lat, cell.lng]}
            radius={Math.min(50, cell.incidents.length * 10 + 15)}
            pathOptions={{
              fillColor: getColor(cell.safetyScore),
              fillOpacity: 0.35,
              color: getColor(cell.safetyScore),
              weight: 1,
              stroke: true,
            }}
          >
            <Popup closeButton={false}>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-0 leading-none">
                      {cell.incidents.length > 0 ? cell.incidents[0].city : 'Sector Area'}
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Grid Intelligence</p>
                  </div>
                  <div className={`px-2 py-1 border rounded-md text-[10px] font-black uppercase ${
                    cell.safetyScore <= 40 ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 
                    cell.safetyScore <= 70 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {cell.safetyScore <= 40 ? 'Unsafe' : cell.safetyScore <= 70 ? 'Moderate' : 'Safe'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] text-slate-400 uppercase tracking-tighter mb-1">Safety Index</p>
                    <div className="flex items-baseline gap-1">
                      <p className={`text-xl font-black ${
                        cell.safetyScore <= 40 ? 'text-rose-500' : 
                        cell.safetyScore <= 70 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {cell.safetyScore}
                      </p>
                      <span className="text-[10px] text-slate-500 font-bold">/100</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] text-slate-400 uppercase tracking-tighter mb-1">Per 1k Citizens</p>
                    <p className="text-xl font-black text-white">
                      {((cell.incidents.length / cell.populationDensity) * 1000).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signals Detected</span>
                  <div className="text-[10px] font-black text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded">
                    {cell.incidents.length} INCIDENTS
                  </div>
                </div>

                <div className="mt-2 p-2 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trend Analysis</span>
                  <div className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    cell.trend === 'up' ? 'text-rose-400 bg-rose-400/10' : 'text-emerald-400 bg-emerald-400/10'
                  }`}>
                    {cell.trend === 'up' ? '↗ DECLINING' : '↘ IMPROVING'}
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
