import { useState } from 'react';
import { Search, Navigation, ShieldCheck, AlertCircle, MapPin, FileText } from 'lucide-react';
import { GridCell } from '../types/CrimeIncident';
import { calculatePathSafety } from '../utils/routeUtils';
import { motion, AnimatePresence } from 'motion/react';

export default function SafetyIntelligence({ gridData, onShowReport }: { gridData: GridCell[], onShowReport?: (zones: GridCell[]) => void }) {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [routeResult, setRouteResult] = useState<{ 
    score: number, 
    rating: 'safe' | 'caution' | 'danger',
    dangerZones: GridCell[]
  } | null>(null);

  const checkSafety = () => {
    // Simulated path calculation (Mumbai to Suburban area)
    const start: [number, number] = [19.0760, 72.8777]; 
    const end: [number, number] = [19.1500, 72.9000];   
    
    const result = calculatePathSafety(start, end, gridData);
    setRouteResult(result);
  };

  return (
    <div className="p-5 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <Navigation size={14} className="text-rose-500" />
        Route Intelligence
      </h3>
      
      <div className="space-y-3">
        <div className="relative group">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={14} />
          <input 
            type="text" 
            placeholder="Starting Point (From)..." 
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-[11px] font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-all"
            value={fromQuery}
            onChange={(e) => setFromQuery(e.target.value)}
          />
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" size={14} />
          <input 
            type="text" 
            placeholder="Destination (To)..." 
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-[11px] font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-all"
            value={toQuery}
            onChange={(e) => setToQuery(e.target.value)}
          />
        </div>

        <button 
          onClick={checkSafety}
          disabled={!toQuery}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase py-3 rounded-xl transition-all shadow-lg shadow-rose-500/20 active:scale-95"
        >
          Analyse Route Safety
        </button>

        <AnimatePresence>
          {routeResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-4"
            >
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className={routeResult.rating === 'safe' ? 'text-emerald-500' : 'text-rose-500'} />
                    <span className="text-[10px] font-bold uppercase text-slate-300">Safety Index</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    routeResult.rating === 'safe' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {routeResult.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{routeResult.score}</span>
                    <span className="text-[10px] font-bold text-slate-500">/100</span>
                  </div>
                  {onShowReport && routeResult.dangerZones.length > 0 && (
                    <button 
                      onClick={() => onShowReport(routeResult.dangerZones)}
                      className="text-[9px] font-black uppercase px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-slate-300 flex items-center gap-1.5"
                    >
                      <FileText size={12} />
                      Full Report
                    </button>
                  )}
                </div>
              </div>

              {routeResult.dangerZones.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertCircle size={12} />
                    High Hazard Zones Detected
                  </p>
                  <div className="px-3 py-2 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                     <p className="text-[10px] text-slate-400 leading-relaxed font-medium capitalize">
                       The path goes through {routeResult.dangerZones.length} sensitive areas. Caution is advised after sunset.
                     </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
