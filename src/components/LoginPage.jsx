import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Bus, Shield, Key, User, ArrowRight, Sparkles, Lock, AlertTriangle, Eye, CheckCircle2, Cpu } from 'lucide-react';

export const LoginPage = () => {
  const { ROLES, loginAsRole } = useAuth();
  const { isEasyMode, toggleLanguage } = useLanguage();

  const [email, setEmail] = useState('officer@urbaneye.city');
  const [password, setPassword] = useState('citysafety2026');
  const [selectedRoleId, setSelectedRoleId] = useState('transit');
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsRole(selectedRoleId);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Bar on Login Page */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & App Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
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

          {/* Language Mode Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 px-2 hidden sm:inline">
                {isEasyMode ? "💡 Easy English Mode" : "⚙️ Technical Mode"}
              </span>
              <button
                onClick={toggleLanguage}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isEasyMode ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
                title={isEasyMode ? "Switch to Technical Mode" : "Switch to Simple English Mode"}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEasyMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Login Screen Workspace */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 w-full flex-1 flex flex-col justify-center">
        
        {/* Welcome Headline */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>{isEasyMode ? "AI Sensing Powered by Public Buses" : "Edge-AI Telemetry & Central GIS Command"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {isEasyMode
              ? "Welcome to City Smart Bus Safety Platform"
              : "Urban Intelligence Platform Authentication"}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {isEasyMode
              ? "Select your job role below or enter your login details to open the city sensing dashboard."
              : "Access real-time bus camera telemetry, hit-and-run ANPR tracking, and road maintenance work orders."}
          </p>
        </div>

        {/* Dual Grid: Role Preset Cards (Left) & Credential Sign-In (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Cols: Quick Role Selection Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>{isEasyMode ? "1. Select Demo User Role (1-Click Entry)" : "Select Preset Role Persona"}</span>
              </h2>
              <span className="text-[11px] text-emerald-400 font-mono">INSTANT ACCESS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(ROLES).map((role) => (
                <button
                  key={role.id}
                  onClick={() => loginAsRole(role.id)}
                  className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/80 hover:bg-slate-900 p-4 rounded-2xl text-left transition group relative shadow-lg flex flex-col justify-between h-40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl p-2 bg-slate-950 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform">
                        {role.icon}
                      </span>
                      <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded-full ${role.badgeColor}`}>
                        {role.id.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-white group-hover:text-cyan-400 transition">
                      {isEasyMode ? role.nameSimple : role.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {isEasyMode ? role.descriptionSimple : role.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>{isEasyMode ? "Click to Enter" : "Launch Dashboard"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Standard Credentials Form */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-extrabold text-base text-white">
                  {isEasyMode ? "2. Standard Account Sign In" : "Command Officer Credentials"}
                </h2>
                <p className="text-xs text-slate-400">
                  {isEasyMode ? "Enter username & password" : "Authenticate to central GIS node"}
                </p>
              </div>
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>

            <form onSubmit={handleCustomLogin} className="space-y-4">
              
              {/* Role Select Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {isEasyMode ? "Choose Authority Role:" : "Select Authorization Scope:"}
                </label>
                <select
                  value={selectedRoleId}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition"
                >
                  {Object.values(ROLES).map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.icon} {isEasyMode ? r.nameSimple : r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email / Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {isEasyMode ? "Username or Email:" : "Official Badge ID / Email:"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition font-mono"
                    placeholder="user@urbaneye.city"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {isEasyMode ? "Secret Password:" : "Security Password:"}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </span>
                ) : (
                  <>
                    <span>{isEasyMode ? "Sign In & Open Dashboard" : "Authenticate & Access Command Center"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEasyMode ? "Demo Mode: Pre-authenticated" : "SSO Edge Token Active"}</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500">v3.4.0</span>
            </div>

          </div>

        </div>

      </main>

      {/* Feature Badges Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-900/60 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Bus className="w-4 h-4 text-cyan-400" />
              <span>{isEasyMode ? "Public Bus Sensing" : "Transit Edge Units"}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{isEasyMode ? "Pothole & Damage Detection" : "Infrastructure Defect Sensing"}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Eye className="w-4 h-4 text-rose-400" />
              <span>{isEasyMode ? "Hit & Run Car Tracker" : "ANPR Incident Detection"}</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            Problem Statement ID #26124 • Urban Mobility AI
          </div>
        </div>
      </footer>

    </div>
  );
};
