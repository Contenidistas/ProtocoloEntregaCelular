import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Presentation, 
  Lock, 
  ArrowLeft, 
  BookOpen, 
  Leaf, 
  ShieldCheck 
} from 'lucide-react';

export default function ProfileSelectorModal({ 
  userProfile, 
  setUserProfile, 
  familyViewMode = 'esencial',
  onSetFamilyViewMode,
  isOpen, 
  onClose, 
  onOpenWorkshopMode, 
  onOpenResearcherDashboard 
}) {
  const [step, setStep] = useState('profile'); // 'profile' | 'family-view'

  // Reset to initial step when opened
  useEffect(() => {
    if (isOpen) {
      setStep('profile');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectTeacher = () => {
    setUserProfile('docente');
    localStorage.setItem('primer_celular_perfil', 'docente');
    if (onClose) onClose();
  };

  const handleSelectFamilyMode = (viewMode) => {
    setUserProfile('familia');
    localStorage.setItem('primer_celular_perfil', 'familia');
    if (onSetFamilyViewMode) {
      onSetFamilyViewMode(viewMode);
    } else {
      localStorage.setItem('primer_celular_vista_familia', viewMode);
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative overflow-hidden">
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-amber-400" />

        {/* STEP 1: SELECT PROFILE (FAMILIA / DOCENTE) */}
        {step === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Bienvenido / Bienvenida 🇺🇾</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                ¿Cómo vas a usar esta guía hoy?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Elegí tu perfil para que adaptemos las herramientas y recomendaciones a tu realidad cotidiana:
              </p>
            </div>

            {/* The Two Main Choices */}
            <div className="space-y-3.5 pt-1">
              
              {/* Option 1: Familias (Opens View Selector Step) */}
              <button
                type="button"
                onClick={() => setStep('family-view')}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group cursor-pointer ${
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
                    <span className="text-xs text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Elegir vista</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Acompañamiento en casa, límites de descanso, controles técnicos y acuerdos. <em>Podés elegir entre la vista sencilla o completa</em>.
                  </p>
                </div>
              </button>

              {/* Option 2: Docentes */}
              <button
                type="button"
                onClick={handleSelectTeacher}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group cursor-pointer ${
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
                    Pautas para el aula en la escuela o liceo, guías didácticas oficiales de ANEP y AGESIC, contrato escolar y taller para familias.
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-purple-700">
                    <span>Ir al modo educativo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

            </div>

            {/* Bottom Links */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="text-[11px]">Podés cambiar de perfil cuando quieras.</span>
              
              <div className="flex items-center gap-3">
                {onOpenResearcherDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onClose) onClose();
                      onOpenResearcherDashboard();
                    }}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-600 text-[11px] font-semibold transition-colors cursor-pointer"
                    title="Acceso protegido con contraseña al panel de investigación"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Perfil investigador</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (onClose) onClose();
                    if (onOpenWorkshopMode) onOpenWorkshopMode();
                  }}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-600 text-[11px] font-semibold transition-colors cursor-pointer"
                  title="Vista diseñada para pantalla grande y proyector de eventos"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Modo taller</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT FAMILY VIEW (SENCILLA O COMPLETA) */}
        {step === 'family-view' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right duration-200">
            
            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep('profile')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a perfiles</span>
            </button>

            {/* Header */}
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Modo Familias</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900">
                Seleccioná la visualización
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Elegí cómo querés ver la guía. Podés alternar entre ambas en cualquier momento desde la barra superior:
              </p>
            </div>

            {/* The Two View Options */}
            <div className="space-y-3 pt-1">
              
              {/* Opción 1: Vista Sencilla */}
              <button
                type="button"
                onClick={() => handleSelectFamilyMode('esencial')}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 group cursor-pointer ${
                  familyViewMode === 'esencial'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Leaf className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-base text-slate-900">
                      Vista Sencilla
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Recomendada
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Presenta un <strong>recorrido minimalista con lo esencial</strong>: las 3 reglas de oro de descanso en casa, la configuración del celular en 3 minutos (Android / iPhone) y el acuerdo familiar en PDF listo para charlar y firmar.
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <span>Elegir Vista Sencilla</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Opción 2: Vista Completa */}
              <button
                type="button"
                onClick={() => handleSelectFamilyMode('completa')}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 group cursor-pointer ${
                  familyViewMode === 'completa'
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5 text-indigo-700" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-base text-slate-900">
                      Vista Completa
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-semibold">
                      Con referencias
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Presenta <strong>mayor detalle, referencias y materiales</strong>: videoteca de cortometrajes de debate, marco pedagógico S.E.R.C., simulador de casos interactivos, salud digital y normativas oficiales (ANEP, AGESIC, Ceibal).
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-indigo-700">
                    <span>Elegir Vista Completa</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

            </div>

            <p className="text-[11px] text-center text-slate-400 pt-1">
              💡 Podrás alternar entre la vista sencilla y la completa en cualquier momento con el botón superior.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}