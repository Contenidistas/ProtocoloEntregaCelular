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
    <section className="relative overflow-hidden pt-5 pb-8 sm:pt-10 sm:pb-12 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 border-b border-slate-200">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Mini Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Guía de Uruguay Educa (DGES)</span>
          </span>
          <button
            onClick={onOpenProfileSelector}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <span>{userProfile === 'familia' ? '👨‍👩‍👧 Vista Familias' : '👩‍🏫 Vista Docentes'}</span>
            <span className="text-[10px] underline">cambiar</span>
          </button>
        </div>

        {/* Clean, Human Title */}
        <div className="text-center space-y-2">
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
              "Una guía simple, pensada para madres, padres y tutores en Uruguay. Sin términos raros: pautas claras de descanso, controles técnicos para su equipo y videos para charlar en familia."
            ) : (
              "Herramientas pedagógicas, protocolos de actuación ante situaciones digitales de ANEP y AGESIC, y guía lista para reuniones de familias."
            )}
          </p>
        </div>

        {/* Andrew Lewis Quote - Minimal & Light */}
        <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 text-center max-w-lg mx-auto shadow-sm border border-slate-800">
          <p className="text-xs sm:text-sm italic text-slate-200 font-medium">
            “Si no pagás por el producto, vos sos el producto.”
          </p>
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block mt-0.5">
            Andrew Lewis · Reflexión central de Ciudadanía Digital
          </span>
        </div>

        {/* Primary Action Cards for Families (3 Essential Cards) */}
        {userProfile === 'familia' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Card 1: Poner a punto el celu */}
              <div
                onClick={() => { setActiveTab('controles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    1. Configurar el Celu
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    Paso a paso para Android (Family Link) e iPhone: horario nocturno y bloqueo de compras.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Ver pasos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2: Videos para mirar juntos */}
              <div
                onClick={() => { setActiveTab('videos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    2. Videos & Situaciones
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    Cortometrajes sobre grooming, ciberbullying y redes, con disparadores para charlar.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
                  <span>Ver videos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3: Pautas en casa (SERC) */}
              <div
                onClick={() => { 
                  const sercEl = document.getElementById('modelo-serc');
                  if (sercEl) sercEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                    3. Reglas de Casa (SERC)
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    Cero celulares en la mesa, descanso nocturno y educar siempre desde el ejemplo.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>Leer pautas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* Optional Tools & Research Survey Clean Sub-Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-100/90 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <span className="text-base shrink-0">📊</span>
                <span>
                  <strong>Encuesta Familiar Anónima y Herramientas:</strong> Participá en el estudio sobre <em>percepciones familiares y primer celular</em> (con devolución inmediata) o creá tu <em>Acuerdo Familiar en PDF</em>.
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => { setActiveTab('encuesta'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Responder encuesta (2 min)</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => { setActiveTab('opcionales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-bold text-indigo-700 hover:bg-indigo-50 transition-colors"
                >
                  <span>Acuerdo PDF y Test</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Teacher Mode Cards */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div 
              onClick={() => { setActiveTab('docentes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-purple-500 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Pautas de Aula</h3>
              <p className="text-[11px] text-slate-500 mt-1">Convivencia y mediación del celular.</p>
            </div>

            <div 
              onClick={() => { setActiveTab('documentos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-purple-500 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                <FolderDown className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Guías PDF</h3>
              <p className="text-[11px] text-slate-500 mt-1">Materiales ANEP, AGESIC y Ceibal.</p>
            </div>

            <div 
              onClick={() => { setActiveTab('videos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-purple-500 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">Videos de Tutoría</h3>
              <p className="text-[11px] text-slate-500 mt-1">Para debatir con los chiquilines.</p>
            </div>

            <div 
              onClick={() => { setActiveTab('docentes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-purple-500 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
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
