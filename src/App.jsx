import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { SimpleModeBanner } from './components/SimpleModeBanner';
import { LoginModal } from './components/LoginModal';
import { EdgeCameraSimulator } from './components/EdgeCameraSimulator';
import { GisMapDashboard } from './components/GisMapDashboard';
import { TrafficAnalytics } from './components/TrafficAnalytics';
import { DefectWorkOrders } from './components/DefectWorkOrders';
import { BandwidthMetrics } from './components/BandwidthMetrics';
import { LoginPage } from './components/LoginPage';
import { MOCK_DEFECTS } from './data/mockDefects';
import { MOCK_INCIDENTS } from './data/mockIncidents';
import { Shield, Sparkles, Cpu, MapPin, Wrench, AlertTriangle, ChevronRight, Bus, HelpCircle } from 'lucide-react';

const DashboardContent = () => {
  const { isEasyMode } = useLanguage();
  const { user, setIsLoginOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('camera'); // camera, map, analytics, maintenance
  const [defects, setDefects] = useState(MOCK_DEFECTS);
  const [incidentAlert, setIncidentAlert] = useState(null);

  if (!user) {
    return <LoginPage />;
  }

  const handleTriggerIncidentAlert = (incident) => {
    setIncidentAlert(incident);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={defects.filter((d) => d.severity === 'Critical').length}
      />

      {/* Simple English Banner */}
      <SimpleModeBanner />

      {/* Login Modal for switching roles on the fly */}
      <LoginModal />


      {/* Incident Pop-up Toast Notification */}
      {incidentAlert && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md w-full bg-rose-950 border-2 border-rose-500 rounded-2xl p-4 shadow-2xl shadow-rose-900/50 animate-bounce">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-rose-600 rounded-xl text-white">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">
                  {isEasyMode ? "🚨 POLICE ALERT: Crash & Fleeing Car!" : "🚨 CRITICAL ANPR INCIDENT DETECTED"}
                </h4>
                <p className="text-xs text-rose-200 mt-0.5 font-mono">
                  {isEasyMode ? `License Plate: ${incidentAlert.plateNumber}` : `ANPR: ${incidentAlert.plateNumber} [98.4%]` }
                </p>
              </div>
            </div>
            <button
              onClick={() => setIncidentAlert(null)}
              className="text-xs text-rose-300 hover:text-white font-bold bg-rose-900 px-2 py-1 rounded-lg"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-slate-200 mt-2">
            {isEasyMode ? incidentAlert.detailsSimple : incidentAlert.details}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-rose-800">
            <span className="text-rose-300 font-mono">📍 {incidentAlert.street}</span>
            <button
              onClick={() => {
                setActiveTab('map');
                setIncidentAlert(null);
              }}
              className="bg-white text-rose-950 font-bold px-3 py-1 rounded-lg hover:bg-slate-100 transition"
            >
              {isEasyMode ? "View on Map" : "Inspect GIS Location"}
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Role Overview Greeting Card */}
        {user && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <span className="text-3xl p-2 bg-slate-800 rounded-2xl border border-slate-700">{user.icon}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-black text-lg text-white">
                    {isEasyMode ? `Role: ${user.nameSimple}` : `Active Workspace: ${user.name}`}
                  </h1>
                  <span className={`text-[10px] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${user.badgeColor}`}>
                    {user.id}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isEasyMode ? user.descriptionSimple : user.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                {isEasyMode ? "Switch User Role" : "Change Persona"}
              </button>
            </div>
          </div>
        )}

        {/* View Router Render */}
        {activeTab === 'camera' && <EdgeCameraSimulator onTriggerIncidentAlert={handleTriggerIncidentAlert} />}
        {activeTab === 'map' && <GisMapDashboard />}
        {activeTab === 'analytics' && <TrafficAnalytics />}
        {activeTab === 'maintenance' && <DefectWorkOrders defects={defects} setDefects={setDefects} />}

        {/* Always visible Edge Bandwidth Saver Display section */}
        <BandwidthMetrics />

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-slate-400 font-semibold">
            <Bus className="w-4 h-4 text-cyan-400" />
            <span>UrbanEye AI • Mobile Urban Intelligence Platform</span>
          </div>
          <p>
            {isEasyMode
              ? "Transforming municipal buses into smart sensing units to detect road damage, catch speeders, and keep school children safe."
              : "Edge-AI Onboard Public Transport Sensing Framework integrated with GIS Central Urban Command."}
          </p>
          <div className="pt-2 text-[10px] text-slate-600 font-mono">
            Problem Statement ID #26124 • AI Edge Sensing & Urban Analytics
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DashboardContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
