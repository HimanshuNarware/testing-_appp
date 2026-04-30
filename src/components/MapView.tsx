import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GridCell } from '../types/CrimeIncident';
import { useEffect } from 'react';

interface MapViewProps {
  data: GridCell[];
  center?: [number, number];
  zoom?: number;
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

export default function MapView({ data, center = [20.5937, 78.9629], zoom = 5 }: MapViewProps) {
  const getColor = (score: number) => {
    if (score <= 40) return '#f43f5e'; // rose-500
    if (score <= 70) return '#f59e0b'; // amber-500
    return '#10b981'; // emerald-500
  };

  return (
    <div className="w-full h-full bg-slate-900 overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                    <h4 className="text-lg font-bold text-white mb-0 leading-none">Sector Area</h4>
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
