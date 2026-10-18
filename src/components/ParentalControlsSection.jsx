import React, { useState } from 'react';
import { parentalControlsData } from '../data/parentalControlsData';
import { 
  Smartphone, 
  Apple, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Lock, 
  HelpCircle,
  ExternalLink,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ParentalControlsSection() {
  const [selectedOS, setSelectedOS] = useState('android'); // 'android' | 'ios'
  const [selectedDepth, setSelectedDepth] = useState('basico'); // 'basico' | 'intermedio' | 'avanzado'
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedStep, setExpandedStep] = useState(null);

  const currentOSData = parentalControlsData[selectedOS];
  const currentDepthData = currentOSData.depths.find(d => d.id === selectedDepth) || currentOSData.depths[0];

  // Toggle step completion
  const toggleStepCompleted = (stepKey) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  // Calculate total steps and completed count
  const allStepsList = currentOSData.depths.flatMap((d, dIdx) => 
    d.steps.map((s, sIdx) => `${selectedOS}_${d.id}_${sIdx}`)
  );
  const completedCount = allStepsList.filter(key => completedSteps[key]).length;
  const progressPercentage = Math.round((completedCount / allStepsList.length) * 100);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200" id="controles-parentales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Guía técnica paso a paso
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Controles parentales en Android e iPhone
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Configurar las restricciones no es espiar: es colocar barandas de seguridad en un balcón antes de que el niño salga a jugar. Elige el sistema operativo de tu familia y el grado de profundidad deseado.
          </p>
        </div>

        {/* Operating System Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          
          <button
            onClick={() => { setSelectedOS('android'); setExpandedStep(null); }}
            className={`w-full sm:w-64 p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
              selectedOS === 'android'
                ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-slate-100/70 hover:bg-white text-slate-600'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              selectedOS === 'android' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
            }`}>
              🤖
            </div>
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Sistema</span>
              <h4 className="font-heading font-extrabold text-base text-slate-900">Android</h4>
              <p className="text-xs text-slate-500">Google Family Link</p>
            </div>
          </button>

          <button
            onClick={() => { setSelectedOS('ios'); setExpandedStep(null); }}
            className={`w-full sm:w-64 p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
              selectedOS === 'ios'
                ? 'border-sky-600 bg-white shadow-md ring-2 ring-sky-500/20'
                : 'border-slate-200 bg-slate-100/70 hover:bg-white text-slate-600'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              selectedOS === 'ios' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
            }`}>
              🍎
            </div>
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Sistema</span>
              <h4 className="font-heading font-extrabold text-base text-slate-900">iPhone / iPad</h4>
              <p className="text-xs text-slate-500">Apple "En familia"</p>
            </div>
          </button>

        </div>

        {/* Global Progress Bar for this OS */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-2/3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Progreso de configuración ({selectedOS === 'android' ? 'Android' : 'iOS'}):</span>
              <span className="text-indigo-600">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-slate-500 shrink-0 font-medium">
            {completedCount} de {allStepsList.length} pasos completados
          </span>
        </div>

        {/* Depth Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {currentOSData.depths.map((depth) => {
            const isSelected = selectedDepth === depth.id;
            return (
              <button
                key={depth.id}
                onClick={() => { setSelectedDepth(depth.id); setExpandedStep(null); }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{depth.level}</span>
              </button>
            );
          })}
        </div>

        {/* Current Depth Steps List */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 text-xs sm:text-sm text-indigo-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600 shrink-0" />
              <span><strong>{currentDepthData.level}:</strong> {currentDepthData.description}</span>
            </div>
          </div>

          {currentDepthData.steps.map((step, idx) => {
            const stepKey = `${selectedOS}_${selectedDepth}_${idx}`;
            const isDone = !!completedSteps[stepKey];
            const isExpanded = expandedStep === stepKey;

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isDone 
                    ? 'border-emerald-200 bg-emerald-50/20 shadow-none' 
                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {/* Step Header */}
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleStepCompleted(stepKey)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDone
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300 hover:border-indigo-600'
                      }`}
                      title="Marcar como configurado"
                    >
                      {isDone && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Paso {idx + 1}
                        </span>
                        {isDone && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Configurado en el equipo
                          </span>
                        )}
                      </div>
                      <h4 className={`font-heading font-bold text-base sm:text-lg mt-0.5 ${
                        isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>

                  {/* Toggle expand button */}
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : stepKey)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                    aria-label="Ver instrucciones detalladas"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Instructions & Tip Dropdown */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60 space-y-3 animate-in fade-in duration-200">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 block mb-1">
                        ¿Cómo configurarlo paso a paso?
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-mono bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                        {step.howTo}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
                      <span className="text-base shrink-0">💡</span>
                      <div>
                        <strong className="font-semibold">Consejo pedagógico:</strong> {step.tip}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* Warning Callout Box: Uruguayan context & operators */}
        <div className="mt-12 max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-lg text-white">
                Dos advertencias críticas en el contexto de Uruguay
              </h4>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>Cuidado con los 'servicios de valor agregado' de las operadoras (Antel, Claro, Movistar):</strong> Aunque bloquees compras en Google Play, muchos juegos permiten suscribirse por SMS enviando mensajes cortos que se cargan a la factura mensual. Llama a tu compañía telefónica o ingresa a su app oficial para solicitar el <em>bloqueo de compras a terceros por SMS</em>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>La 'graduación digital' a los 14 años:</strong> En Uruguay y según los términos de servicio internacionales, al cumplir 13/14 años las plataformas permiten al joven tomar control de su cuenta. Por eso, el control técnico debe complementarse desde el primer día con educación y confianza: el software no sustituye el vínculo familiar.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
