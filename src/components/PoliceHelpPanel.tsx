import { Smartphone, MapPin, ExternalLink } from 'lucide-react';

export default function PoliceHelpPanel({ userLocation, isDark, mapStyle }: { userLocation?: [number, number], isDark: boolean, mapStyle: string }) {
  const isLightMode = !isDark;
  const googleMapsUrl = userLocation 
    ? `https://www.google.com/maps/search/police+station/@${userLocation[0]},${userLocation[1]},15z`
    : 'https://www.google.com/maps/search/police+station+near+me';

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col gap-3 transition-colors ${
      isLightMode ? 'bg-white/70 border-slate-300' : 'bg-white/10 border-white/20'
    }`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-xs font-bold uppercase tracking-widest ${isLightMode ? 'text-rose-600' : 'text-rose-400'}`}>Emergency Services</h3>
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={`text-[9px] font-bold uppercase ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`}>System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <a 
          href="tel:112" 
          className="flex items-center justify-between p-3 bg-rose-500 hover:bg-rose-600 transition-all rounded-xl border border-rose-400/30 group shadow-md"
        >
          <div className="flex items-center gap-3">
            <Smartphone size={18} className="text-white" />
            <div className="text-left">
              <p className="text-[9px] font-bold text-rose-100 leading-none mb-1">NATIONAL HELPLINE</p>
              <p className="text-lg font-black text-white leading-none">CALL 112</p>
            </div>
          </div>
        </a>

        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between p-3 transition-all rounded-xl border ${
            isLightMode ? 'bg-slate-200/50 hover:bg-slate-100/50 border-slate-300' : 'bg-white/5 hover:bg-white/10 border-white/10'
          }`}
        >
          <div className={`flex items-center gap-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            <MapPin size={18} />
            <div className="text-left">
              <p className={`text-[9px] font-bold leading-none mb-1 uppercase tracking-tight ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Police Station Locator</p>
              <p className={`text-[11px] font-bold uppercase leading-none ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Find Nearest Station</p>
            </div>
          </div>
          <ExternalLink size={12} className={isLightMode ? 'text-slate-400' : 'text-slate-600'} />
        </a>
      </div>
    </div>
  );
}
