import React, { useState } from 'react';
import { teacherGuidelines, classroomActivities, parentWorkshopAgenda } from '../data/teacherResources';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Copy, 
  Check, 
  Clock, 
  Sparkles, 
  Calendar,
  Presentation,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';

export default function TeachersSection({ onOpenWorkshopMode }) {
  const [copiedWorkshop, setCopiedWorkshop] = useState(false);
  const [copiedActivityId, setCopiedActivityId] = useState(null);

  const handleCopyWorkshop = () => {
    const text = `TALLER PARA FAMILIAS: "${parentWorkshopAgenda.title.toUpperCase()}"
Duración: ${parentWorkshopAgenda.duration}
Público Objetivo: ${parentWorkshopAgenda.target}

OBJETIVOS:
${parentWorkshopAgenda.goals.map((g, i) => `${i + 1}. ${g}`).join('\n')}

ESTRUCTURA DEL TALLER:
${parentWorkshopAgenda.modules.map(m => `[${m.time}] ${m.name}\n${m.activity}`).join('\n\n')}

Materiales sugeridos:
- Acuerdo Familiar impreso para cada familia.
- Proyector con el Modo Taller de esta plataforma (Atajo: Alt + T).
- Canales de ayuda en Uruguay: Línea Azul INAU (0800 5050) y Delitos Informáticos (2030 4625).
Autor de referencia: Prof. Santiago Hernández - Uruguay Educa DGES.`;

    navigator.clipboard.writeText(text);
    setCopiedWorkshop(true);
    setTimeout(() => setCopiedWorkshop(false), 2500);
  };

  const handleCopyActivity = (act) => {
    const text = `${act.title.toUpperCase()}
Nivel sugerido: ${act.level}
Duración: ${act.duration}
Objetivo: ${act.goal}

PASO A PASO EN EL AULA:
${act.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

Recurso de la Plataforma Primer Celular Uruguay (Prof. Santiago Hernández - Uruguay Educa DGES).`;

    navigator.clipboard.writeText(text);
    setCopiedActivityId(act.id);
    setTimeout(() => setCopiedActivityId(null), 2500);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200" id="seccion-docentes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-purple-700" />
            <span>Espacio para educadores y centros educativos</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Herramientas para docentes, adscriptos y equipos de dirección
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            El aula y el patio son el termómetro donde repercuten los grupos de WhatsApp y las redes sociales. 
            Aquí dispones de criterios institucionales, dinámicas de tutoría y un taller listo para proyectar en reuniones de familias.
          </p>
        </div>

        {/* 4 Institutional Guidelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teacherGuidelines.map((guide, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 inline-block mb-3">
                  {guide.badge}
                </span>
                <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2">
                  {guide.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {guide.content}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>Pauta formativa ANEP · DGES · DGEIP</span>
                <span className="text-purple-700 font-bold">Criterio #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Classroom Ready-to-Use Activities */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4" />
                Propuestas didácticas para trabajar con estudiantes
              </span>
              <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                3 Dinámicas de aula listas para aplicar en clase o tutoría
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Primaria (5º y 6º) · Educación Básica Integrada (7º, 8º y 9º)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {classroomActivities.map((act) => {
              const isCopied = copiedActivityId === act.id;
              return (
                <div
                  key={act.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col justify-between space-y-5 hover:border-indigo-300 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold">
                        {act.level}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-slate-500 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        {act.duration}
                      </span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                      {act.title}
                    </h4>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <strong className="text-slate-900 block mb-0.5">Objetivo pedagógico:</strong>
                      {act.goal}
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Secuencia paso a paso:
                      </span>
                      {act.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyActivity(act)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-xs font-bold text-slate-700 hover:text-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">¡Planificación copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar secuencia para mi libreta</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workshop Blueprint for Parent Meetings */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>Kit de reunión de familias · Listo para proyectar</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-3xl text-white">
                {parentWorkshopAgenda.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Diseñado para coordinadores de informática, adscriptos, maestros comunitarios, directores o profesores tutores.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onOpenWorkshopMode && (
                <button
                  onClick={onOpenWorkshopMode}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-lg"
                >
                  <Presentation className="w-4 h-4" />
                  <span>Abrir Modo Proyector (8 Diapositivas)</span>
                </button>
              )}

              <button
                onClick={handleCopyWorkshop}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md"
              >
                {copiedWorkshop ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWorkshop ? '¡Guión copiado!' : 'Copiar guión escrito'}</span>
              </button>
            </div>
          </div>

          {/* Target & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/60">
            <div>
              <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                Público y duración estimada
              </span>
              <p className="text-sm font-semibold text-slate-200">{parentWorkshopAgenda.target}</p>
              <p className="text-xs text-indigo-300 font-mono mt-2">⏱️ Duración: {parentWorkshopAgenda.duration}</p>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                Objetivos pedagógicos del encuentro
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                {parentWorkshopAgenda.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline of Modules */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Estructura minuto a minuto del taller (Sincronizada con el Modo Proyector)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parentWorkshopAgenda.modules.map((mod, idx) => (
                <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md">
                      {mod.time}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Bloque {idx + 1}</span>
                  </div>
                  <h5 className="font-heading font-bold text-sm sm:text-base text-white">
                    {mod.name}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {mod.activity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Attribution footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span>Portal Uruguay Educa · Espacio Educación y TIC (DGES)</span>
            <span>shernandez@uruguayeduca.edu.uy</span>
          </div>

        </div>

      </div>
    </section>
  );
}
