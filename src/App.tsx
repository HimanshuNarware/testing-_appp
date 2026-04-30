import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import MapView, { MapStyle } from './components/MapView';
import Legend from './components/Legend';
import FilterPanel from './components/FilterPanel';
import PoliceHelpPanel from './components/PoliceHelpPanel';
import SafetyIntelligence from './components/SafetyIntelligence';
import crimeIncidents from './data/crimes.json';
import { useRiskEngine } from './hooks/useRiskEngine';
import { CrimeIncident, GridCell } from './types/CrimeIncident';
import { INDIAN_STATES, StateInfo, INDIAN_CITIES, CityInfo } from './constants/states';
import { Search, Info, TrendingUp, Shield, Building2, MapPin, AlertTriangle, X, FileText, Moon, Sun, Bell, ShieldOff } from 'lucide-react';

export default function App() {
  const [filter, setFilter] = useState<'all' | 'unsafe'>('all');
  const [category, setCategory] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const [analysisReport, setAnalysisReport] = useState<GridCell[] | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [mapStyle, setMapStyle] = useState<MapStyle>('political');
  const [alerts, setAlerts] = useState<any[]>([]);

  // Monitor for "New" high-risk incidents for alerts
  useMemo(() => {
    const highRisk = (crimeIncidents as any[]).filter(inc => 
      inc.type === 'women_safety' || inc.isHighCriminalPresence
    ).slice(0, 2); // Simulating newest 2 for demo
    setAlerts(highRisk);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const riskFilters = {
    category,
    time: timeFilter
  };

  const gridData = useRiskEngine(crimeIncidents as CrimeIncident[], riskFilters);

  const finalData = gridData.filter(cell => {
    if (filter === 'unsafe') return cell.safetyScore <= 40;
    return true;
  });

  const filteredCities = useMemo(() => {
    if (!citySearch) return [];
    return INDIAN_CITIES.filter(c => 
      c.name.toLowerCase().includes(citySearch.toLowerCase())
    ).slice(0, 5);
  }, [citySearch]);

  const handleStateChange = (stateName: string) => {
    setSelectedCity(null);
    if (!stateName) {
      setSelectedState(null);
      return;
    }
    const state = INDIAN_STATES.find(s => s.name === stateName);
    if (state) setSelectedState(state);
  };

  const selectCity = (city: CityInfo) => {
    setSelectedState(null);
    setSelectedCity(city);
    setCitySearch("");
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden font-sans transition-colors duration-500 ${isDark ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Real-time Alert System */}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {alerts.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ delay: idx * 0.5 }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-rose-500/30' : 'bg-white border-rose-200'} shadow-2xl backdrop-blur-xl w-80`}>
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 animate-pulse">
                  <Bell size={18} />
                </div>
                <div className="flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-rose-400' : 'text-rose-500'}`}>Critical Alert</p>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{alert.city}: {alert.type.replace('_', ' ')}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">High Criminal Presence Detected</p>
                </div>
                <button 
                  onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                  className="text-slate-500 hover:text-rose-500"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Theme & Map Toggle */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <div className="flex bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl">
          {(['political', 'geographic', 'terrain', 'minimal'] as MapStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                mapStyle === style 
                  ? 'bg-emerald-500 text-white shadow-lg' 
                  : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`p-3 rounded-2xl border backdrop-blur-xl transition-all shadow-xl ${
            isDark ? 'bg-white/10 border-white/20 text-yellow-400' : 'bg-slate-900/10 border-slate-900/20 text-slate-900'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      {/* Analysis Report Modal */}
      <AnimatePresence>
        {analysisReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                    <FileText className="text-rose-500" />
                    Detailed Route Danger Analysis
                  </h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">NCRB Pattern Recognition & Risk Distribution</p>
                </div>
                <button 
                  onClick={() => setAnalysisReport(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl">
                    <p className="text-[10px] font-black uppercase text-rose-400 tracking-tighter mb-2">High Risk Zones</p>
                    <p className="text-4xl font-black">{analysisReport.length}</p>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Detected on Path</p>
                  </div>
                  <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl">
                    <p className="text-[10px] font-black uppercase text-amber-400 tracking-tighter mb-2">Avg Safety Score</p>
                    <p className="text-4xl font-black">
                      {Math.round(analysisReport.reduce((acc, c) => acc + c.safetyScore, 0) / analysisReport.length)}%
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Path Integrity</p>
                  </div>
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-tighter mb-2">Signal Density</p>
                    <p className="text-4xl font-black">{analysisReport.reduce((acc, c) => acc + c.incidents.length, 0)}</p>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Signals Identified</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-800/50 border-b border-white/10">
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Hazard Location</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Safety Index</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Incident History</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Risk Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {analysisReport.map((zone, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-white uppercase">{zone.id}</p>
                            <p className="text-[10px] font-mono text-slate-500">{zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-rose-500 transition-all duration-1000" 
                                  style={{ width: `${zone.safetyScore}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-black text-rose-400">{zone.safetyScore}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-white">{zone.incidents.length} REPORTS</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                              zone.trend === 'up' ? 'text-rose-400 bg-rose-400/10' : 'text-emerald-400 bg-emerald-400/10'
                            }`}>
                              {zone.trend === 'up' ? 'Escalating' : 'Controlled'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full text-slate-800" fill="currentColor">
          <circle cx="400" cy="400" r="350" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
        </svg>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <Header />
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-28 left-6 w-80 flex flex-col gap-4 z-40 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar"
      >
        {/* City Intelligence Search */}
        <div className={`p-5 rounded-3xl border shadow-2xl transition-colors duration-500 ${isDark ? 'border-white/20 bg-white/10' : 'border-slate-200 bg-white'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
            <Building2 size={14} />
            City Intelligence
          </h3>
          <div className="relative">
            <div className="relative group">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-emerald-500' : 'text-slate-400 group-focus-within:text-emerald-500'}`} size={16} />
              <input 
                type="text" 
                placeholder="Search Metro Intelligence..." 
                className={`w-full border rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium transition-all shadow-inner ${
                  isDark ? 'bg-slate-900/50 border-white/10 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                }`}
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
              />
            </div>
            
            <AnimatePresence>
              {filteredCities.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 p-1"
                >
                  {filteredCities.map(city => (
                    <button
                      key={city.name}
                      onClick={() => selectCity(city)}
                      className="w-full flex items-center justify-between p-3 hover:bg-emerald-500/10 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <MapPin size={14} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white">{city.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{city.state}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* City Deep Dive Stats */}
        <AnimatePresence mode="wait">
          {selectedCity && (
            <motion.div
              key={selectedCity.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">{selectedCity.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">State Intel: {selectedCity.state}</p>
                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{selectedCity.dataSource}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const toastId = Math.random().toString();
                      setAlerts(prev => [...prev, { id: toastId, city: selectedCity.name, type: 'api_sync', isHighCriminalPresence: true }]);
                      setTimeout(() => setAlerts(prev => prev.filter(a => a.id !== toastId)), 5000);
                    }}
                    title="Simulate Live API Sync"
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl transition-all"
                  >
                    <TrendingUp size={14} />
                  </button>
                  <button onClick={() => setSelectedCity(null)} className="text-slate-600 hover:text-white transition-colors">✕</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">NCRB Hotspots</p>
                  <p className="text-xl font-black text-emerald-400">{selectedCity.hotspots}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Active Profiles</p>
                  <p className="text-xl font-black text-white">{selectedCity.activeCriminals}</p>
                </div>
              </div>

              {selectedCity.policePortal && (
                <a 
                  href={selectedCity.policePortal} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full mb-3 flex items-center justify-center gap-2 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                >
                  <Shield size={12} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Access Official Police Portal</span>
                </a>
              )}

              <div className="flex items-center gap-2 p-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                 <AlertTriangle size={14} className="text-rose-500 animate-pulse" />
                 <p className="text-[10px] font-bold text-rose-300 uppercase tracking-tighter">Localized Critical Zones Detected</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-5 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <Search size={14} className="text-rose-500" />
            Regional Analysis
          </h3>
          <select 
            onChange={(e) => handleStateChange(e.target.value)}
            value={selectedState?.name || ""}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-rose-500 active:bg-slate-900 transition-all cursor-pointer"
          >
            <option value="" className="bg-slate-900 text-slate-400">Select Region...</option>
            {INDIAN_STATES.map(state => (
              <option key={state.name} value={state.name} className="bg-slate-900">
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          {selectedState && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 rounded-3xl border border-white/20 bg-rose-500/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 text-rose-500/10 group-hover:scale-110 transition-transform duration-700">
                <Shield size={120} />
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-black text-white italic tracking-tighter mb-1 uppercase">NCRB REPORT: {selectedState.name}</h4>
                <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-4">Official State Metrics</p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total Crimes</span>
                    <span className="text-sm font-black text-rose-100">{selectedState.ncrbStats.totalCrimes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Conviction Rate</span>
                    <span className="text-sm font-black text-emerald-400">{selectedState.ncrbStats.convictionRate}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <FilterPanel 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />
        
        <div className="p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Intelligence Filters</h3>
          <div className="space-y-3">
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Category</p>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-xs font-medium text-white focus:outline-none focus:border-rose-500"
              >
                <option value="all" className="bg-slate-900">All Crimes</option>
                <option value="women_safety" className="bg-slate-900">Women Safety</option>
                <option value="conflict_zones" className="bg-slate-900 text-rose-400 font-bold">Conflict Zones (Naxal/Border)</option>
                <option value="harrasment" className="bg-slate-900">Harassment</option>
                <option value="domestic_violence" className="bg-slate-900">Domestic Violence</option>
              </select>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Time of Interest</p>
              <div className="flex gap-1">
                {['all', 'day', 'night'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
                      timeFilter === t ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Legend />
      </motion.div>
      
      <main className="absolute inset-0 z-10">
        <MapView 
          data={finalData} 
          center={selectedCity?.coordinates || selectedState?.coordinates || [20.5937, 78.9629]} 
          zoom={selectedCity?.zoom || selectedState?.zoom || 5} 
          isDark={isDark}
          mapStyle={mapStyle}
        />
      </main>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-28 right-6 w-72 flex flex-col gap-4 z-40 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar"
      >
        <PoliceHelpPanel userLocation={selectedCity?.coordinates || selectedState?.coordinates} />
        
        <SafetyIntelligence 
          gridData={gridData} 
          onShowReport={(zones) => setAnalysisReport(zones)} 
        />
        
        <div className="p-5 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl hidden md:block">
          <div className="flex items-center justify-between mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Criminal Activity Feed</span>
            <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-3">
            {(crimeIncidents as any[]).slice(0, 3).map(inc => (
              <div key={inc.id} className={`flex gap-3 items-start border-l-2 ${inc.isHighCriminalPresence ? 'border-amber-500' : 'border-rose-500/30'} pl-3`}>
                <div className="w-full">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-white/90 leading-tight">{inc.city} Detected</p>
                    <span className="text-[8px] font-black text-rose-400 uppercase">Live Intel</span>
                  </div>
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mt-1">
                    {inc.type.replace('_', ' ')} • {inc.isHighCriminalPresence ? '🔴 ACTIVE CRIMINAL PRESENCE' : 'SIG DETECTED'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <footer className="absolute bottom-0 left-0 right-0 h-10 bg-slate-950/90 backdrop-blur-md flex items-center justify-center border-t border-white/5 z-50">
        <p className="text-[10px] tracking-widest text-slate-500 font-bold uppercase">
          Dynamic Risk Engine v1.0 • Client-Side Aggregation Powered • {finalData.length} active sectors
        </p>
      </footer>
    </div>
  );
}
