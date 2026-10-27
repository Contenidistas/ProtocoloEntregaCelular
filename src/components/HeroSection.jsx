import React from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  Video, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  FolderDown,
  Users,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function HeroSection({ setActiveTab, userProfile, onOpenProfileSelector }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-slate-50/80 via-white to-slate-50 border-b border-slate-200">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        
        {/* Top Mini Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-medium text-slate-600 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Guía oficial · Uruguay Educa (DGES)</span>
          </span>
          <button
            onClick={onOpenProfileSelector}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200/70 border border-slate-200 transition-colors"
          >
            <span>{userProfile === 'familia' ? 'Modo Familias' : 'Modo Docentes'}</span>
            <span className="text-[11px] text-indigo-600 font-semibold underline">cambiar</span>
          </button>
        </div>

        {/* Clean, Human Title */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {userProfile === 'familia' ? (
              <>
                Acompañar a los chiquilines con su{' '}
                <span className="text-indigo-600">primer celular</span>
              </>
            ) : (
              <>
                Pautas de convivencia digital en{' '}
                <span className="text-purple-700">el aula y el centro</span>
              </>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            {userProfile === 'familia' ? (
              "Una guía simple y práctica para madres, padres y tutores. Pautas de descanso, pasos para configurar el equipo y herramientas para charlar en familia con tranquilidad."
            ) : (
              "Herramientas pedagógicas, protocolos de actuación de ANEP y AGESIC y guiones listos para talleres de familias."
            )}
          </p>
        </div>

        {/* Primary Action Cards for Families (3 Essential Cards) */}
        {userProfile === 'familia' ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              {/* Card 1: Poner a punto el celu */}
              <div
                onClick={() => { setActiveTab('controles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    1. Configurar el celular
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Paso a paso para Android (Family Link) e iPhone: apagado nocturno y control de descargas.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Ver pasos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2: Videos para mirar juntos */}
              <div
                onClick={() => { setActiveTab('videos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    2. Videos para charlar
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Cortometrajes breves sobre grooming, ciberbullying y redes sociales para mirar juntos.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Ver videoteca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3: Pautas en casa (SERC) */}
              <div
                onClick={() => { 
                  const sercEl = document.getElementById('modelo-serc');
                  if (sercEl) sercEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    3. Pautas de casa (SERC)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Celulares fuera del dormitorio de noche, mesa sin pantallas y educar con el ejemplo.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Leer pautas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* Clean, Unified Banner: Encuesta & Acuerdo Familiar */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-5 sm:p-6 transition-all hover:border-slate-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Estudio anónimo familiar · Devolución personalizada</span>
                  </div>
                  <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900">
                    ¿Cómo se usan las pantallas en tu hogar? Sumá tu voz en 2 minutos
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Completá la encuesta anónima y recibí pautas inmediatas de la Sociedad Uruguaya de Pediatría y ANEP adaptadas a tu hogar. También podés personalizar tu Acuerdo Familiar para imprimir.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('encuesta'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Hacer Encuesta Familiar (2 min)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('opcionales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Ver Acuerdo Familiar en PDF</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Teacher Mode Cards */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div 
              onClick={() => { setActiveTab('docentes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-purple-400 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Pautas de Aula</h3>
              <p className="text-[11px] text-slate-500 mt-1">Convivencia y mediación del celular.</p>
            </div>

            <div 
              onClick={() => { setActiveTab('documentos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-purple-400 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2">
                <FolderDown className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Guías PDF</h3>
              <p className="text-[11px] text-slate-500 mt-1">Materiales ANEP, AGESIC y Ceibal.</p>
            </div>

            <div 
              onClick={() => { setActiveTab('videos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-purple-400 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Videos de Tutoría</h3>
              <p className="text-[11px] text-slate-500 mt-1">Para debatir con los chiquilines.</p>
            </div>

            <div 
              onClick={() => { setActiveTab('docentes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-purple-400 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Taller Familias</h3>
              <p className="text-[11px] text-slate-500 mt-1">Guión listo de 45 minutos.</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
