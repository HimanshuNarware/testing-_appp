import { ListFilter } from 'lucide-react';
import { motion } from 'motion/react';

interface FilterPanelProps {
  currentFilter: 'all' | 'unsafe';
  onFilterChange: (filter: 'all' | 'unsafe') => void;
  isDark: boolean;
  mapStyle: string;
}

export default function FilterPanel({ currentFilter, onFilterChange, isDark, mapStyle }: FilterPanelProps) {
  const isLightMode = !isDark;

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-colors ${
      isLightMode ? 'bg-white/70 border-slate-300' : 'bg-white/10 border-white/20'
    }`}>
      <h3 className={`text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2 ${
        isLightMode ? 'text-slate-600' : 'text-slate-400'
      }`}>
        <ListFilter size={14} />
        Visual Filters
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'all' 
              ? (isLightMode ? 'bg-slate-200/50 border border-slate-300' : 'bg-white/20 border border-white/20')
              : (isLightMode ? 'hover:bg-slate-100/50 border border-transparent' : 'hover:bg-white/5 border border-transparent')
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 transition-all ${
            currentFilter === 'all' 
              ? 'border-rose-500 bg-rose-500' 
              : 'border-slate-500'
          }`} />
          <span className={`text-sm font-medium ${isLightMode ? 'text-slate-900' : 'text-white'}`}>All Regions</span>
        </button>
        
        <button
          onClick={() => onFilterChange('unsafe')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'unsafe' 
              ? (isLightMode ? 'bg-slate-200/50 border border-slate-300' : 'bg-white/20 border border-white/20')
              : (isLightMode ? 'hover:bg-slate-100/50 border border-transparent' : 'hover:bg-white/5 border border-transparent')
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 transition-all ${
            currentFilter === 'unsafe' 
              ? 'border-rose-500 bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
              : 'border-slate-500'
          }`} />
          <span className={`text-sm font-medium ${isLightMode ? 'text-slate-900' : 'text-white'}`}>High Risk Only</span>
        </button>
      </div>
    </div>
  );
}
