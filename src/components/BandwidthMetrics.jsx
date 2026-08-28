import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Wifi, Server, ShieldCheck, ArrowRight, Database } from 'lucide-react';

export const BandwidthMetrics = () => {
  const { isEasyMode } = useLanguage();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">
              {isEasyMode ? "Internet Data Saved by Bus Computer" : "Edge-to-Cloud Bandwidth Optimization Architecture"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono">
              98.9% SAVINGS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isEasyMode
              ? "Instead of sending heavy video over mobile data, the smart bus computer reads the camera inside the bus and sends tiny text alerts."
              : "Onboard Edge NPUs extract bounding box metadata, telemetry, and ANPR triggers locally, streaming lightweight JSON payloads."}
          </p>
        </div>
      </div>

      {/* Visual Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Traditional Streaming (Expensive & Slow) */}
        <div className="bg-slate-950 border border-rose-900/50 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>{isEasyMode ? "Old Way: Raw Video Streaming" : "Legacy Central Streaming Architecture"}</span>
            </span>
            <span className="text-xs font-mono font-bold text-rose-400">HIGH COST</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400">Data Upload Rate:</span>
              <span className="font-mono text-rose-400 font-bold">500 MB / minute / bus</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400">Monthly 4G/5G Cellular Cost:</span>
              <span className="font-mono text-rose-400 font-bold">$1,200 / bus</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400">Alert Delay (Latency):</span>
              <span className="font-mono text-rose-400 font-bold">3,500 ms (Slow)</span>
            </div>
          </div>

          <p className="text-[11px] text-rose-300/80 italic">
            {isEasyMode
              ? "⚠️ Uploading full video uses huge mobile internet data, freezes often, and costs too much money."
              : "⚠️ High network saturation, bandwidth costs scale exponentially with bus fleet size."}
          </p>
        </div>

        {/* UrbanEye AI Edge Processing (Fast & Optimized) */}
        <div className="bg-slate-950 border border-emerald-800/60 p-5 rounded-2xl space-y-4 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>{isEasyMode ? "New Way: Smart Bus Computer" : "UrbanEye Edge-AI Intelligent Pipeline"}</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">OPTIMIZED</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400">Data Upload Rate:</span>
              <span className="font-mono text-emerald-400 font-bold">0.8 MB / minute / bus</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400">Monthly 4G/5G Cellular Cost:</span>
              <span className="font-mono text-emerald-400 font-bold">$12 / bus</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400">Alert Delay (Latency):</span>
              <span className="font-mono text-emerald-400 font-bold">14 ms (Instant!)</span>
            </div>
          </div>

          <p className="text-[11px] text-emerald-300/90 font-medium">
            {isEasyMode
              ? "✅ Video is analyzed on the bus in milliseconds. Only urgent alerts & plate numbers are sent to city headquarters."
              : "✅ Onboard Edge AI eliminates bandwidth bottlenecks while maintaining immediate incident response."}
          </p>
        </div>

      </div>

    </div>
  );
};
