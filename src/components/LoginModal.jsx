import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Shield, X, Check, Lock, ArrowRight } from 'lucide-react';

export const LoginModal = () => {
  const { user, ROLES, loginAsRole, isLoginOpen, setIsLoginOpen } = useAuth();
  const { isEasyMode } = useLanguage();

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        {user && (
          <button
            onClick={() => setIsLoginOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl mb-3 shadow-lg shadow-cyan-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {isEasyMode ? "Welcome to UrbanEye AI" : "Urban Intelligence Platform Authentication"}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            {isEasyMode
              ? "Select your role below to open the dashboard with custom settings for your work."
              : "Choose a role persona to evaluate multi-stakeholder operational capabilities."}
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {Object.values(ROLES).map((role) => {
            const isSelected = user?.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => loginAsRole(role.id)}
                className={`p-4 rounded-xl border text-left transition-all relative group flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/30 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{role.icon}</span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-400 transition">
                    {isEasyMode ? role.nameSimple : role.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {isEasyMode ? role.descriptionSimple : role.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>{isEasyMode ? "Select Role" : "Login Persona"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>{isEasyMode ? "Demo Mode: No password needed" : "Public Transit Sensing Prototype"}</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">v3.4.0-EdgeAI</span>
        </div>

      </div>
    </div>
  );
};
