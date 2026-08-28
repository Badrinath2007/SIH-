import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, TrendingUp, Clock, Compass, ArrowRight, BarChart2, Layers } from 'lucide-react';

export const TrafficAnalytics = () => {
  const { isEasyMode } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState('route12');

  const odData = [
    { from: "Central Railway Station", to: "Tech Park Sector 5", volume: "14,200 / day", delay: "+12 mins", status: "Heavy Traffic" },
    { from: "West Residential Hub", to: "International Airport", volume: "18,900 / day", delay: "+4 mins", status: "Flowing" },
    { from: "South Harbor Terminal", to: "City Market District", volume: "22,100 / day", delay: "+18 mins", status: "Bottleneck" },
    { from: "North Suburbs Gate", to: "St. Xavier School District", volume: "9,800 / day", delay: "+8 mins", status: "Moderate" }
  ];

  const hourlyDelayData = [
    { hour: '06:00', delayMinutes: 4, speedKm: 45 },
    { hour: '08:00', delayMinutes: 18, speedKm: 22 },
    { hour: '10:00', delayMinutes: 14, speedKm: 28 },
    { hour: '12:00', delayMinutes: 6, speedKm: 40 },
    { hour: '14:00', delayMinutes: 8, speedKm: 38 },
    { hour: '17:00', delayMinutes: 24, speedKm: 18 },
    { hour: '19:00', delayMinutes: 20, speedKm: 20 },
    { hour: '21:00', delayMinutes: 5, speedKm: 42 }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">
              {isEasyMode ? "Where People Travel & Traffic Delays" : "Origin-Destination Traffic Patterns & Delay Estimation"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono">
              ANALYTICS ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isEasyMode
              ? "Calculated automatically by camera data on 48 public buses as they travel across the city."
              : "Derived from multi-vehicle edge counting, density classification, and route timing telemetry."}
          </p>
        </div>
      </div>

      {/* 2 Grid Columns: Origin-Destination Matrix & Hourly Delays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Origin-Destination Matrix */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>{isEasyMode ? "Main Travel Routes (Start to Destination)" : "Origin-Destination Commute Corridors"}</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">UPDATED LIVE</span>
          </div>

          <div className="space-y-3">
            {odData.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl hover:border-cyan-500/50 transition flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
                    <span>{item.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-300">{item.to}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span>{isEasyMode ? `Daily Travelers: ${item.volume}` : `Flow Volume: ${item.volume}`}</span>
                    <span className="text-amber-400 font-medium">Delay: {item.delay}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  item.status === 'Bottleneck' || item.status === 'Heavy Traffic'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : item.status === 'Moderate'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {isEasyMode ? (item.status === 'Bottleneck' ? 'Slow Jam' : item.status) : item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Hourly Delay Chart */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{isEasyMode ? "Peak Hour Traffic Delays (Minutes Extra)" : "Spatial-Temporal Delay Analytics"}</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono">AVG SPEED: 31 KM/H</span>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="space-y-3 py-2">
            <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800">
              {hourlyDelayData.map((d, idx) => {
                const heightPercent = (d.delayMinutes / 25) * 100;
                const isPeak = d.delayMinutes >= 18;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition absolute -top-8 bg-slate-900 border border-slate-700 text-[10px] text-white px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">
                      +{d.delayMinutes}m delay ({d.speedKm} km/h)
                    </div>
                    {/* Bar */}
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isPeak
                          ? 'bg-gradient-to-t from-rose-600 to-amber-500 shadow-lg shadow-rose-500/20'
                          : 'bg-gradient-to-t from-cyan-600 to-blue-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[10px] font-mono text-slate-400 mt-2">{d.hour}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-gradient-to-r from-rose-600 to-amber-500" />
                <span>{isEasyMode ? "Heavy Rush Hours" : "Peak Delay Bottleneck"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-gradient-to-r from-cyan-600 to-blue-500" />
                <span>{isEasyMode ? "Normal Traffic" : "Baseline Traffic"}</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>{isEasyMode ? "💡 Best travel time recommendation:" : "💡 Recommended route timing:"}</span>
            <span className="font-semibold text-emerald-400">12:00 PM – 2:00 PM (Lowest Delays)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
