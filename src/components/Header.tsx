import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  isDark: boolean;
  mapStyle: string;
}

export default function Header({ isDark, mapStyle }: HeaderProps) {
  const isLightMode = !isDark;
  
  return (
    <header className={`absolute top-6 left-6 right-6 h-16 flex items-center gap-4 justify-between px-6 rounded-2xl border backdrop-blur-md z-[1000] w-fit transition-colors ${
      isLightMode ? 'bg-white/70 border-slate-300 shadow-xl' : 'bg-white/10 border-white/20'
    }`}>
      {/* <motion.div  */}
        {/* initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      > */}
        <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30 text-white">
          <Shield size={24} />
        </div>
        <h1 className={`text-xl font-bold tracking-tight uppercase ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
          SHAKTI<span className="font-light opacity-80">MAP</span>
        </h1>
      {/* </motion.div> */}
      
      {/* <div className="hidden md:flex gap-4">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80">
          Pan-India Safety Visualization
        </div>
        <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 transition-colors rounded-xl text-sm font-semibold text-white shadow-lg shadow-rose-500/20">
          Emergency SOS
        </button>
      </div> */}
    </header>
  );
}
