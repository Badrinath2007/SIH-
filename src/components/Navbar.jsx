import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Bus, ShieldAlert, Cpu, Sparkles, LogIn, LogOut, User, Activity, Bell } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, alertCount }) => {
  const { isEasyMode, toggleLanguage } = useLanguage();
  const { user, setIsLoginOpen, logout } = useAuth();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Bus className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">UrbanEye<span className="text-cyan-400">AI</span></span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">EDGE-V3</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {isEasyMode ? "Smart Bus City Sense (Easy English)" : "Mobile Urban Intelligence Platform"}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('camera')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'camera'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{isEasyMode ? "Bus Live Camera AI" : "Edge-AI Simulator"}</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'map'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{isEasyMode ? "City Map & Bus Tracking" : "GIS Fleet & Hazards"}</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEasyMode ? "Traffic & Travel Patterns" : "O-D & Congestion"}</span>
            </button>

            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 relative ${
                activeTab === 'maintenance'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isEasyMode ? "Road Damage Reports" : "Defect Work Orders"}</span>
              {alertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold animate-pulse">
                  {alertCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Section: Easy Mode Toggle, Role & Login */}
          <div className="flex items-center space-x-3">
            
            {/* Simple English Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 font-semibold px-2 hidden sm:inline">
                {isEasyMode ? "💡 Easy English" : "⚙️ Technical"}
              </span>
              <button
                onClick={toggleLanguage}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isEasyMode ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
                title={isEasyMode ? "Switch to Technical Jargon" : "Switch to Simple English"}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEasyMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Role / User Button */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition shadow-sm ${user.badgeColor}`}
                >
                  <span>{user.icon}</span>
                  <span className="hidden md:inline">{isEasyMode ? user.nameSimple : user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-md"
              >
                <LogIn className="w-4 h-4" />
                <span>{isEasyMode ? "Sign In / Switch Role" : "Login Platform"}</span>
              </button>
            )}

            {/* Time Indicator */}
            <div className="hidden lg:block text-right border-l border-slate-800 pl-3">
              <span className="text-xs font-mono font-bold text-slate-300 block">{time}</span>
              <span className="text-[10px] text-emerald-400 font-medium">● Fleet Edge Live</span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
