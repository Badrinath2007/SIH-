import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_BUSES } from '../data/mockBuses';
import { MOCK_DEFECTS } from '../data/mockDefects';
import { MOCK_INCIDENTS } from '../data/mockIncidents';
import { MapPin, Bus, AlertTriangle, ShieldCheck, Flame, Filter, Layers, Navigation, ChevronRight, PhoneCall, Wrench } from 'lucide-react';

export const GisMapDashboard = () => {
  const { isEasyMode } = useLanguage();
  const { user } = useAuth();

  const [buses, setBuses] = useState(MOCK_BUSES);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, defects, incidents, buses
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Animate bus positions along waypoints to simulate live GIS tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          const deltaLat = (Math.random() - 0.5) * 0.0004;
          const deltaLng = (Math.random() - 0.5) * 0.0004;
          return {
            ...bus,
            lat: bus.lat + deltaLat,
            lng: bus.lng + deltaLng
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-2xl space-y-6">
      
      {/* Map Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">
              {isEasyMode ? "City Map & Live Bus Sensing Fleet" : "GIS Urban Intelligence Map & Hazard Layer"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono">
              GPS LIVE FEED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isEasyMode
              ? "See active public buses moving across the city, reported potholes, damaged signs, and police incident alerts."
              : "Real-time spatial visualization of transit edge nodes, structural defects, and traffic incident ANPR logs."}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterType === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isEasyMode ? "Show All" : "All Layers"}
            </button>
            <button
              onClick={() => setFilterType('buses')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterType === 'buses' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🚌 {isEasyMode ? "Buses" : "Buses Fleet"}
            </button>
            <button
              onClick={() => setFilterType('defects')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterType === 'defects' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🕳️ {isEasyMode ? "Road Damage" : "Defects"}
            </button>
            <button
              onClick={() => setFilterType('incidents')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterType === 'incidents' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🚨 {isEasyMode ? "Police Alerts" : "Incidents"}
            </button>
          </div>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
              showHeatmap
                ? 'bg-amber-950/50 border-amber-600 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{isEasyMode ? "Traffic Heatmap" : "Congestion Heatmap"}</span>
          </button>
        </div>
      </div>

      {/* Main Map View & Details Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: High-Fidelity Custom GIS Canvas Map */}
        <div className="lg:col-span-2 relative h-[450px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex flex-col justify-between p-4">
          
          {/* Map Grid Background Styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Simulated Road Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <path d="M 50 100 Q 250 150 450 120 T 700 300" stroke="#0284c7" strokeWidth="6" fill="none" strokeDasharray="8 8" />
            <path d="M 120 400 Q 300 200 650 100" stroke="#3b82f6" strokeWidth="8" fill="none" />
            <path d="M 80 50 L 500 380" stroke="#475569" strokeWidth="4" fill="none" />
          </svg>

          {/* Heatmap overlay effect */}
          {showHeatmap && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-500/10 via-rose-500/15 to-transparent blur-3xl animate-pulse" />
          )}

          {/* Map Pins: Bus Fleet */}
          {(filterType === 'all' || filterType === 'buses') &&
            buses.map((bus, idx) => (
              <button
                key={bus.id}
                onClick={() => setSelectedItem({ type: 'bus', data: bus })}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border transition-all shadow-xl hover:scale-115 z-20 flex items-center space-x-1.5 ${
                  selectedItem?.data?.id === bus.id
                    ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/30'
                    : 'bg-slate-900 border-cyan-500/60 text-cyan-400 hover:border-cyan-400'
                }`}
                style={{
                  top: `${25 + idx * 20}%`,
                  left: `${20 + idx * 22}%`
                }}
              >
                <Bus className="w-4 h-4 animate-bounce" />
                <span className="text-[11px] font-bold font-mono">{bus.id}</span>
              </button>
            ))}

          {/* Map Pins: Road Defects */}
          {(filterType === 'all' || filterType === 'defects') &&
            MOCK_DEFECTS.map((defect, idx) => (
              <button
                key={defect.id}
                onClick={() => setSelectedItem({ type: 'defect', data: defect })}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border transition-all shadow-xl hover:scale-115 z-10 flex items-center space-x-1 ${
                  selectedItem?.data?.id === defect.id
                    ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30'
                    : 'bg-slate-900 border-amber-500/60 text-amber-400 hover:border-amber-400'
                }`}
                style={{
                  top: `${40 + (idx % 3) * 22}%`,
                  left: `${35 + (idx % 4) * 18}%`
                }}
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[10px] font-bold hidden sm:inline">
                  {isEasyMode ? defect.typeSimple : defect.type}
                </span>
              </button>
            ))}

          {/* Map Pins: Police Incidents */}
          {(filterType === 'all' || filterType === 'incidents') &&
            MOCK_INCIDENTS.map((incident, idx) => (
              <button
                key={incident.id}
                onClick={() => setSelectedItem({ type: 'incident', data: incident })}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border transition-all shadow-xl hover:scale-115 z-30 flex items-center space-x-1 animate-pulse ${
                  selectedItem?.data?.id === incident.id
                    ? 'bg-rose-600 text-white border-white ring-4 ring-rose-500/30'
                    : 'bg-rose-950 border-rose-500 text-rose-300 hover:border-rose-400'
                }`}
                style={{
                  top: `${30 + idx * 28}%`,
                  left: `${50 + idx * 20}%`
                }}
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] font-bold">{incident.plateNumber || 'INCIDENT'}</span>
              </button>
            ))}

          {/* Bottom Map Legend */}
          <div className="mt-auto z-10 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                <span>{isEasyMode ? "Active Bus" : "Transit Edge Unit"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>{isEasyMode ? "Road Damage" : "Structural Defect"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span>{isEasyMode ? "Hit & Run Alert" : "ANPR Incident"}</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Center: 19.0760 N, 72.8777 E</span>
          </div>

        </div>

        {/* Right 1 Col: Selected Map Pin Inspector Panel */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-lg">
                    {selectedItem.type === 'bus' && '🚌'}
                    {selectedItem.type === 'defect' && '🕳️'}
                    {selectedItem.type === 'incident' && '🚨'}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {selectedItem.type === 'bus' && selectedItem.data.id}
                      {selectedItem.type === 'defect' && (isEasyMode ? selectedItem.data.typeSimple : selectedItem.data.type)}
                      {selectedItem.type === 'incident' && (isEasyMode ? selectedItem.data.typeSimple : selectedItem.data.type)}
                    </h3>
                    <p className="text-[11px] text-slate-400">{selectedItem.data.street || selectedItem.data.currentStreet}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>

              {/* Inspector Content by Type */}
              {selectedItem.type === 'bus' && (
                <div className="space-y-2.5 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isEasyMode ? "Bus Line:" : "Route Name:"}</span>
                      <span className="font-semibold text-cyan-400">{isEasyMode ? selectedItem.data.routeSimple : selectedItem.data.routeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isEasyMode ? "Current Speed:" : "Telemetry Speed:"}</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedItem.data.speed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isEasyMode ? "Passengers Onboard:" : "Occupancy Index:"}</span>
                      <span className="font-semibold text-white">{selectedItem.data.passengers} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{isEasyMode ? "Data Saved:" : "Edge Bandwidth Ratio:"}</span>
                      <span className="font-mono text-cyan-300">{selectedItem.data.bandwidthSaved}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedItem.type === 'defect' && (
                <div className="space-y-3 text-xs">
                  {selectedItem.data.image && (
                    <img
                      src={selectedItem.data.image}
                      alt="Defect"
                      className="w-full h-32 object-cover rounded-xl border border-slate-800"
                    />
                  )}
                  <p className="text-slate-300">
                    {isEasyMode ? selectedItem.data.descriptionSimple : selectedItem.data.description}
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Severity AI Confidence:</span>
                      <span className="text-amber-400 font-bold">{selectedItem.data.confidence}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Detected By:</span>
                      <span className="text-cyan-400 font-mono">{selectedItem.data.detectedBy}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{isEasyMode ? "Send Repair Team" : "Issue Repair Work Order"}</span>
                  </button>
                </div>
              )}

              {selectedItem.type === 'incident' && (
                <div className="space-y-3 text-xs">
                  <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-800/60 text-rose-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-rose-400">
                      {isEasyMode ? "Number Plate Proof:" : "ANPR Registration Number:"}
                    </span>
                    <span className="text-lg font-mono font-black text-amber-300 block tracking-widest mt-0.5">
                      {selectedItem.data.plateNumber}
                    </span>
                    <p className="text-slate-300 mt-2">
                      {isEasyMode ? selectedItem.data.detailsSimple : selectedItem.data.details}
                    </p>
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5 animate-pulse">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{isEasyMode ? "Alert Nearby Traffic Police" : "Dispatch Police Response Alert"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <MapPin className="w-8 h-8 text-slate-700 mb-2 animate-bounce" />
              <p className="text-xs font-semibold text-slate-400">
                {isEasyMode ? "Click any bus or hazard pin on the map to see full photos and details." : "Select any spatial node on the GIS canvas to inspect real-time edge telemetry."}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
