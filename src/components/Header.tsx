import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="absolute top-6 left-6 right-6 h-16 flex items-center justify-between px-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md z-[1000]">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30 text-white">
          <Shield size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white uppercase">
          SHAKTI<span className="font-light opacity-80">MAP</span>
        </h1>
      </motion.div>
      
      <div className="hidden md:flex gap-4">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80">
          Pan-India Safety Visualization
        </div>
        <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 transition-colors rounded-xl text-sm font-semibold text-white shadow-lg shadow-rose-500/20">
          Emergency SOS
        </button>
      </div>
    </header>
  );
}
