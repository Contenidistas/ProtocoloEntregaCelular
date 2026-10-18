import React from 'react';
import { Users, GraduationCap, Sparkles, Check, ArrowRight, Presentation } from 'lucide-react';

export default function ProfileSelectorModal({ userProfile, setUserProfile, isOpen, onClose, onOpenWorkshopMode }) {
  if (!isOpen) return null;

  const handleSelect = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('primer_celular_perfil', profile);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative overflow-hidden">
        
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-amber-400" />

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bienvenido / Bienvenida 🇺🇾</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
            ¿Cómo vas a usar esta guía hoy?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Elegí tu perfil para que adaptemos las herramientas y recomendaciones a tu realidad cotidiana.
          </p>
        </div>

        {/* The Two Main Choices */}
        <div className="space-y-3.5 pt-1">
          
          {/* Option 1: Familias */}
          <button
            onClick={() => handleSelect('familia')}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group ${
              userProfile === 'familia'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
                  Soy padre, madre o tutor
                </span>
                {userProfile === 'familia' && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quiero acompañar a mi hijo/a con su primer celular, poner límites de descanso en casa y configurar los controles parentales.
              </p>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-indigo-700">
                <span>Ir al modo familia</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Option 2: Docentes */}
          <button
            onClick={() => handleSelect('docente')}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group ${
              userProfile === 'docente'
                ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-500/20'
                : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
                  Soy docente o educador/a
                </span>
                {userProfile === 'docente' && (
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Busco pautas para el aula en la escuela o liceo, guías didácticas oficiales de ANEP y AGESIC, y el taller para familias.
              </p>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-purple-700">
                <span>Ir al modo educativo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

        </div>

        {/* Discreet Facilitator / Workshop Mode Link */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">Podés cambiar de perfil cuando quieras.</span>
          
          <button
            onClick={() => {
              if (onClose) onClose();
              if (onOpenWorkshopMode) onOpenWorkshopMode();
            }}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-600 text-[11px] font-semibold transition-colors"
            title="Vista diseñada para pantalla grande y proyector de eventos"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Modo taller (proyector)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
