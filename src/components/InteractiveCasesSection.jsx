import React, { useState } from 'react';
import { caseStudies } from '../data/caseStudiesData';
import { 
  HeartHandshake, 
  HelpCircle, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Scale, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  MessageCircleHeart,
  Copy,
  Check
} from 'lucide-react';

export default function InteractiveCasesSection() {
  const [activeCaseId, setActiveCaseId] = useState(caseStudies[0].id);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [copiedPhrase, setCopiedPhrase] = useState(false);

  const currentCase = caseStudies.find(c => c.id === activeCaseId) || caseStudies[0];
  const userChosenOptionId = selectedOptions[currentCase.id];
  const chosenOption = currentCase.options.find(o => o.id === userChosenOptionId);

  const answeredCount = Object.keys(selectedOptions).length;

  const handleSelectOption = (optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentCase.id]: optionId
    });
  };

  const handleResetCurrentCase = () => {
    const updated = { ...selectedOptions };
    delete updated[currentCase.id];
    setSelectedOptions(updated);
  };

  const handleCopyStarter = () => {
    if (!currentCase.conversationStarter) return;
    navigator.clipboard.writeText(currentCase.conversationStarter);
    setCopiedPhrase(true);
    setTimeout(() => setCopiedPhrase(false), 2000);
  };

  const currentIndex = caseStudies.findIndex(c => c.id === currentCase.id);
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="space-y-8" id="casos-interactivos">
      
      {/* Subheader */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Simulador de Dilemas Cotidianos ({answeredCount}/{caseStudies.length} resueltos)
        </span>
        <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          ¿Cómo actuarías en estas situaciones reales?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Elige una opción en cada escenario para analizar el impacto formativo, las frases sugeridas de diálogo en casa y el marco legal uruguayo.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {caseStudies.map((cs, idx) => {
          const isSelected = cs.id === activeCaseId;
          const chosenId = selectedOptions[cs.id];
          const chosenOpt = cs.options.find(o => o.id === chosenId);
          return (
            <button
              key={cs.id}
              onClick={() => setActiveCaseId(cs.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              <span>Caso {idx + 1}</span>
              {chosenOpt && (
                <span 
                  className={`w-2.5 h-2.5 rounded-full ${
                    chosenOpt.type === 'success' 
                      ? 'bg-emerald-400' 
                      : chosenOpt.type === 'warning' 
                      ? 'bg-amber-400' 
                      : 'bg-red-400'
                  }`} 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Case Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all">
        
        {/* Case Banner Header */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${currentCase.badgeColor}`}>
              {currentCase.category}
            </span>
            <span className="text-xs text-slate-400">Escenario {currentIndex + 1} de {caseStudies.length}</span>
          </div>
          <h4 className="font-heading font-extrabold text-lg sm:text-2xl text-white">
            {currentCase.title}
          </h4>
          <p className="mt-3 text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
            {currentCase.situation}
          </p>
        </div>

        {/* Question / Dilemma & Options */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>{currentCase.dilemma}</span>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentCase.options.map((option) => {
              const isSelected = userChosenOptionId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? option.type === 'success'
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : option.type === 'warning'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-red-500 bg-red-50/50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                    isSelected
                      ? option.type === 'success'
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : option.type === 'warning'
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-red-600 bg-red-600 text-white'
                      : 'border-slate-300 text-slate-500'
                  }`}>
                    {option.id.toUpperCase()}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Area if chosen */}
          {chosenOption && (
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 animate-in fade-in duration-300">
              
              {/* Outcome Badge */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                chosenOption.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : chosenOption.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}>
                {chosenOption.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {chosenOption.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                {chosenOption.type === 'danger' && <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
                
                <div className="space-y-1">
                  <h5 className="font-bold text-sm sm:text-base">
                    {chosenOption.evaluation}
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {chosenOption.feedback}
                  </p>
                </div>
              </div>

              {/* Suggested Phrase for Family Dialogue */}
              {currentCase.conversationStarter && (
                <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs sm:text-sm text-teal-950 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold text-teal-900">
                      <MessageCircleHeart className="w-5 h-5 text-teal-600 shrink-0" />
                      <span>¿Cómo abrir la charla en casa sin juzgar? (Frase sugerida)</span>
                    </div>
                    <button
                      onClick={handleCopyStarter}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-teal-200 text-[11px] font-bold text-teal-800 hover:bg-teal-100 transition-colors shrink-0"
                    >
                      {copiedPhrase ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPhrase ? 'Copiada' : 'Copiar frase'}</span>
                    </button>
                  </div>
                  <p className="italic leading-relaxed text-teal-900 pl-7">
                    {currentCase.conversationStarter}
                  </p>
                </div>
              )}

              {/* Pedagogical Tip */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5 text-indigo-900">Enfoque Pedagógico SERC:</span>
                  <p className="leading-relaxed">{chosenOption.pedagogicalTip}</p>
                </div>
              </div>

              {/* Uruguayan Legal Context */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
                <Scale className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5 text-slate-900">¿Qué dice la ley y el protocolo en Uruguay?</span>
                  <p className="leading-relaxed">{currentCase.uruguayContext}</p>
                </div>
              </div>

              {/* Reset or Next Case buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleResetCurrentCase}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Probar otra respuesta en este caso</span>
                </button>

                <button
                  onClick={() => setActiveCaseId(nextCase.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <span>Ir al siguiente escenario ({nextCase.title.split(':')[0]})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
