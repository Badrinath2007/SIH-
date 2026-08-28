import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera, AlertTriangle, ShieldCheck, Zap, Radio, RefreshCw, Eye, Car, AlertOctagon, HelpCircle } from 'lucide-react';
import { MOCK_INCIDENTS } from '../data/mockIncidents';
import { MOCK_DEFECTS } from '../data/mockDefects';

export const EdgeCameraSimulator = ({ onTriggerIncidentAlert }) => {
  const { isEasyMode, getTerm } = useLanguage();
  const [activeCam, setActiveCam] = useState('front'); // front, rear, side, cabin
  const [isSimulatingAlert, setIsSimulatingAlert] = useState(null); // 'pothole', 'hit_and_run', 'children', 'water'
  const [edgeStats, setEdgeStats] = useState({
    fps: 30,
    latency: '14 ms',
    cpu: '24%',
    npu: '68%',
    temp: '48°C',
    bandwidthRatio: '98.9%'
  });

  const canvasRef = useRef(null);

  // Simulation tick for Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;

    const render = () => {
      step += 1;
      const width = canvas.width;
      const height = canvas.height;

      // Clear & background road gradient
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.fillRect(0, 0, width, height);

      if (activeCam === 'front') {
        // Perspective road lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.35, height * 0.35);
        ctx.lineTo(0, height);
        ctx.moveTo(width * 0.65, height * 0.35);
        ctx.lineTo(width, height);
        ctx.stroke();

        // Dashed central divider lane
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([15, 15]);
        ctx.lineDashOffset = -step * 2;
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.35);
        ctx.lineTo(width * 0.5, height);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Simulated Vehicles in motion
        const carY = (step * 2) % (height * 0.5) + height * 0.35;
        const carScale = 0.4 + (carY / height) * 0.6;
        const carW = 120 * carScale;
        const carH = 70 * carScale;
        const carX = width * 0.6;

        // Bounding Box for Detected Vehicle
        ctx.strokeStyle = '#06b6d4'; // cyan
        ctx.lineWidth = 2;
        ctx.strokeRect(carX - carW / 2, carY - carH / 2, carW, carH);

        // Label tag
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(carX - carW / 2, carY - carH / 2 - 20, 140, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(isEasyMode ? 'Car: 42 km/h' : 'Vehicle (Sedan) 96.2%', carX - carW / 2 + 5, carY - carH / 2 - 6);

        // Simulation Overlays
        if (isSimulatingAlert === 'pothole') {
          // Pothole Detection on Road
          const pX = width * 0.35;
          const pY = height * 0.65;
          ctx.strokeStyle = '#ef4444'; // Red bounding box
          ctx.lineWidth = 3;
          ctx.strokeRect(pX - 40, pY - 20, 80, 40);

          ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
          ctx.fillRect(pX - 40, pY - 20, 80, 40);

          ctx.fillStyle = '#ef4444';
          ctx.fillRect(pX - 40, pY - 42, 160, 20);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(isEasyMode ? '⚠️ Deep Road Hole (94%)' : '⚠️ POTHOLE DEFECT: 94.5%', pX - 35, pY - 28);
        } else if (isSimulatingAlert === 'children') {
          // School Children Crossing Detection
          const cX = width * 0.25;
          const cY = height * 0.55;
          ctx.strokeStyle = '#f59e0b'; // Amber box
          ctx.lineWidth = 3;
          ctx.strokeRect(cX - 30, cY - 40, 60, 80);

          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(cX - 30, cY - 62, 170, 20);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(isEasyMode ? '🚸 School Child (98%)' : '🚸 VRU Pedestrian 98.2%', cX - 25, cY - 48);
        } else if (isSimulatingAlert === 'water') {
          // Waterlogging hazard
          ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
          ctx.fillRect(width * 0.1, height * 0.6, width * 0.8, height * 0.3);
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2;
          ctx.strokeRect(width * 0.1, height * 0.6, width * 0.8, height * 0.3);

          ctx.fillStyle = '#0284c7';
          ctx.fillRect(width * 0.1, height * 0.6 - 22, 180, 20);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(isEasyMode ? '🌊 Flooded Road Water' : '🌊 WATERLOGGING HAZARD (91%)', width * 0.1 + 8, height * 0.6 - 8);
        }
      } else if (activeCam === 'rear') {
        // Rear camera ANPR view
        const rX = width * 0.4;
        const rY = height * 0.45;
        const rW = 220;
        const rH = 120;

        ctx.strokeStyle = isSimulatingAlert === 'hit_and_run' ? '#ef4444' : '#10b981';
        ctx.lineWidth = 3;
        ctx.strokeRect(rX - rW / 2, rY - rH / 2, rW, rH);

        // License Plate Reader Target Box
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.strokeRect(rX - 60, rY + 10, 120, 30);

        ctx.fillStyle = isSimulatingAlert === 'hit_and_run' ? '#ef4444' : '#10b981';
        ctx.fillRect(rX - rW / 2, rY - rH / 2 - 24, 220, 22);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(
          isSimulatingAlert === 'hit_and_run'
            ? (isEasyMode ? '🚨 RASH SPEEDER: 92 km/h' : '🚨 CRASH INCIDENT DETECTED')
            : (isEasyMode ? 'Rear Vehicle Tracked' : 'ANPR TELEMETRY TRACK'),
          rX - rW / 2 + 8,
          rY - rH / 2 - 8
        );

        // License Plate overlay text
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('MH-02-CB-4821', rX - 52, rY + 30);
      } else if (activeCam === 'side') {
        // Side door camera - Bus stop crowd & passing bikes
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(40, height * 0.4, 180, 140);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, height * 0.4, 180, 140);

        ctx.fillStyle = '#6366f1';
        ctx.fillRect(40, height * 0.4 - 20, 180, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(isEasyMode ? 'Bus Stop Waiting People: 8' : 'Pedestrian Density: HIGH (8)', 48, height * 0.4 - 6);
      } else {
        // Cabin driver & passenger count
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(width * 0.15, height * 0.3, width * 0.7, height * 0.5);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(width * 0.15, height * 0.3, width * 0.7, height * 0.5);

        ctx.fillStyle = '#10b981';
        ctx.fillRect(width * 0.15, height * 0.3 - 22, 220, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(isEasyMode ? 'Passenger Count: 42 People' : 'Cabin AI Density: 42 Occupants', width * 0.15 + 8, height * 0.3 - 7);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeCam, isSimulatingAlert, isEasyMode]);

  const triggerAlert = (type) => {
    setIsSimulatingAlert(type);
    if (type === 'hit_and_run') {
      setActiveCam('rear');
      if (onTriggerIncidentAlert) {
        onTriggerIncidentAlert(MOCK_INCIDENTS[0]);
      }
    } else if (type === 'pothole' || type === 'children' || type === 'water') {
      setActiveCam('front');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-2xl">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">
              {isEasyMode ? "Bus Live Camera AI Scanner" : "Edge-AI Multi-Camera Telemetry Simulator"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isEasyMode
              ? "Bus BUS-104 is scanning the roads using 4 cameras to detect potholes, accidents, speeders, and children crossing."
              : "Vehicle Unit BUS-104 edge GPU processing 4 camera channels concurrently with dynamic annotation bounding boxes."}
          </p>
        </div>

        {/* Camera Feed Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveCam('front'); setIsSimulatingAlert(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeCam === 'front' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isEasyMode ? "Front View" : "Front Cam"}</span>
          </button>

          <button
            onClick={() => { setActiveCam('rear'); setIsSimulatingAlert(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeCam === 'rear' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isEasyMode ? "Rear (Plate Scanner)" : "Rear ANPR"}</span>
          </button>

          <button
            onClick={() => { setActiveCam('side'); setIsSimulatingAlert(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeCam === 'side' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isEasyMode ? "Side Door" : "Side Cam"}</span>
          </button>

          <button
            onClick={() => { setActiveCam('cabin'); setIsSimulatingAlert(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeCam === 'cabin' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isEasyMode ? "Inside Bus" : "Cabin Cam"}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas & Edge Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Video Simulator Canvas */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
          
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="w-full h-auto object-cover block"
          />

          {/* Top Canvas Overlay Stats */}
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-3 font-mono">
            <span className="text-cyan-400 font-bold">CAM: {activeCam.toUpperCase()}</span>
            <span>FPS: {edgeStats.fps}</span>
            <span>LATENCY: {edgeStats.latency}</span>
          </div>

          <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>{isEasyMode ? "Data Saved: 98.9%" : "Edge Bandwidth Compression: 98.9%"}</span>
          </div>

          {/* Bottom Alert Banner Overlay */}
          {isSimulatingAlert && (
            <div className="absolute bottom-3 left-3 right-3 bg-rose-950/90 backdrop-blur-md border border-rose-600/50 p-3 rounded-xl flex items-center justify-between animate-bounce">
              <div className="flex items-center space-x-2 text-rose-200 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>
                  {isSimulatingAlert === 'hit_and_run' && (isEasyMode ? "🚨 ALERT: Dangerous Speeder / Hit-and-Run Car detected!" : "🚨 CRITICAL INCIDENT: Offending Vehicle ANPR Extracted")}
                  {isSimulatingAlert === 'pothole' && (isEasyMode ? "🕳️ ROAD HAZARD: Deep Pothole detected on lane!" : "🕳️ DEFECT DETECTED: Asphalt Pothole Severity 0.92")}
                  {isSimulatingAlert === 'children' && (isEasyMode ? "🚸 SAFETY WARNING: School Children Crossing Road!" : "🚸 PEDESTRIAN HAZARD: School Zone VRU Warning")}
                  {isSimulatingAlert === 'water' && (isEasyMode ? "🌊 WATER HAZARD: Flooded Road section ahead!" : "🌊 INFRASTRUCTURE DEFECT: High Waterlogging Surface Depth")}
                </span>
              </div>
              <button
                onClick={() => setIsSimulatingAlert(null)}
                className="text-[10px] bg-rose-600 hover:bg-rose-500 text-white px-2 py-1 rounded font-bold"
              >
                Clear Simulation
              </button>
            </div>
          )}

        </div>

        {/* Right 1 Col: Interactive Simulation Triggers & Edge NPU Health */}
        <div className="space-y-4 flex flex-col justify-between">
          
          {/* Interactive Simulation Trigger Panel */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{isEasyMode ? "Test AI Detection Signals" : "Simulate Edge AI Detection Events"}</span>
              </h3>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              {isEasyMode
                ? "Click any button below to see how the bus camera reacts in real-time:"
                : "Trigger synthetic edge neural network classification events to evaluate alert dispatch pipeline."}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => triggerAlert('hit_and_run')}
                className="p-2.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-xl text-left transition group"
              >
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold text-xs">
                  <Car className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>{isEasyMode ? "Hit & Run Car" : "ANPR Speed Alert"}</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Read License Plate</span>
              </button>

              <button
                onClick={() => triggerAlert('pothole')}
                className="p-2.5 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 rounded-xl text-left transition group"
              >
                <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-xs">
                  <AlertOctagon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>{isEasyMode ? "Pothole Hole" : "Road Pothole"}</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Deep road damage</span>
              </button>

              <button
                onClick={() => triggerAlert('children')}
                className="p-2.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-xl text-left transition group"
              >
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs">
                  <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>{isEasyMode ? "Kids Crossing" : "VRU Pedestrian"}</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">School children safety</span>
              </button>

              <button
                onClick={() => triggerAlert('water')}
                className="p-2.5 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-xl text-left transition group"
              >
                <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-xs">
                  <RefreshCw className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>{isEasyMode ? "Flooded Water" : "Waterlogging"}</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Deep street water</span>
              </button>
            </div>
          </div>

          {/* Edge AI Device Telemetry Stats */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>{isEasyMode ? "Bus Computer Health" : "Onboard Edge NPU Health"}</span>
              <span className="text-emerald-400 font-mono text-[10px]">NORMAL</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">NPU USAGE</span>
                <span className="text-sm font-bold text-cyan-400">{edgeStats.npu}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">TEMP</span>
                <span className="text-sm font-bold text-emerald-400">{edgeStats.temp}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">CPU LOAD</span>
                <span className="text-sm font-bold text-blue-400">{edgeStats.cpu}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
