import { ListFilter } from 'lucide-react';
import { motion } from 'motion/react';

interface FilterPanelProps {
  currentFilter: 'all' | 'unsafe';
  onFilterChange: (filter: 'all' | 'unsafe') => void;
}

export default function FilterPanel({ currentFilter, onFilterChange }: FilterPanelProps) {
  return (
    <div className="p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <ListFilter size={14} />
        Visual Filters
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'all' 
              ? 'bg-white/20 border border-white/20' 
              : 'hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 transition-all ${
            currentFilter === 'all' 
              ? 'border-rose-500 bg-rose-500' 
              : 'border-slate-500'
          }`} />
          <span className="text-sm font-medium text-white">All Regions</span>
        </button>
        
        <button
          onClick={() => onFilterChange('unsafe')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'unsafe' 
              ? 'bg-white/20 border border-white/20' 
              : 'hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 transition-all ${
            currentFilter === 'unsafe' 
              ? 'border-rose-500 bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
              : 'border-slate-500'
          }`} />
          <span className="text-sm font-medium text-white">High Risk Only</span>
        </button>
      </div>
    </div>
  );
}
