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
    <section className="py-10 sm:py-16 bg-slate-50/60 border-b border-slate-200" id="controles-parentales">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guía paso a paso</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Configuración técnica del celular
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Configurar las restricciones no es espiar: es colocar barandas de seguridad. Elegí el sistema operativo del equipo y activá las pautas recomendadas.
          </p>
        </div>

        {/* Operating System Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          
          <button
            type="button"
            onClick={() => { setSelectedOS('android'); setExpandedStep(null); }}
            className={`w-full sm:w-60 p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
              selectedOS === 'android'
                ? 'border-slate-900 bg-white shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
              selectedOS === 'android' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              🤖
            </div>
            <div className="text-left">
              <span className="text-[10px] font-semibold text-slate-400 block">Sistema operativo</span>
              <h4 className="font-heading font-bold text-sm text-slate-900">Android</h4>
              <p className="text-xs text-slate-500">Google Family Link</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedOS('ios'); setExpandedStep(null); }}
            className={`w-full sm:w-60 p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
              selectedOS === 'ios'
                ? 'border-slate-900 bg-white shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
              selectedOS === 'ios' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              🍎
            </div>
            <div className="text-left">
              <span className="text-[10px] font-semibold text-slate-400 block">Sistema operativo</span>
              <h4 className="font-heading font-bold text-sm text-slate-900">iPhone / iPad</h4>
              <p className="text-xs text-slate-500">Apple "En familia"</p>
            </div>
          </button>

        </div>

        {/* Global Progress Bar for this OS */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-1 w-full sm:w-2/3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Progreso ({selectedOS === 'android' ? 'Android' : 'iOS'}):</span>
              <span className="text-indigo-600">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-slate-500 shrink-0">
            {completedCount} de {allStepsList.length} pasos
          </span>
        </div>

        {/* Depth Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {currentOSData.depths.map((depth) => {
            const isSelected = selectedDepth === depth.id;
            return (
              <button
                type="button"
                key={depth.id}
                onClick={() => { setSelectedDepth(depth.id); setExpandedStep(null); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
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
