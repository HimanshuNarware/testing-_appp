import { motion } from 'motion/react';

export default function Legend() {
  const steps = [
    { label: 'High Risk', color: 'bg-rose-500', shadow: 'shadow-[0_0_8px_rgba(244,63,94,0.5)]' },
    { label: 'Moderate', color: 'bg-amber-500', shadow: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' },
    { label: 'Low Risk', color: 'bg-emerald-500', shadow: 'shadow-[0_0_8px_rgba(16,185,129,0.5)]' },
  ];

  return (
    <div className="p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Map Legend</h3>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">{step.label}</span>
            <div className={`h-1.5 w-24 rounded-full ${step.color} ${step.shadow}`} />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 opacity-60">
        <p className="text-[10px] text-slate-400 leading-relaxed italic">
          Circle size indicates relative crime density across major metropolitan areas.
        </p>
      </div>
    </div>
  );
}
