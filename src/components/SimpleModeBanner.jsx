import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export const SimpleModeBanner = () => {
  const { isEasyMode, toggleLanguage } = useLanguage();

  if (!isEasyMode) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-b border-emerald-800/40 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        
        <div className="flex items-center space-x-2 text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
          <span className="font-semibold">
            Easy English Mode Active:
          </span>
          <span className="text-slate-300">
            Technical terms like "ANPR Edge Telemetry" have been replaced with clear, easy-to-understand words for everyone.
          </span>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Non-technical Friendly</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-cyan-400 underline hover:text-cyan-300 font-medium text-[11px]"
          >
            Switch to Technical Mode
          </button>
        </div>

      </div>
    </div>
  );
};
