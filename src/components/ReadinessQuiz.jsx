import React, { useState } from 'react';
import { quizQuestions, getQuizResult } from '../data/quizQuestions';
import { 
  diagnosticAgeGroups, 
  responseOptions, 
  getGroupByExactAge 
} from '../data/workshopDiagnosticData';
import ScientificEvidencePanel from './ScientificEvidencePanel';
import { 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  ClipboardCheck, 
  Users 
} from 'lucide-react';

export default function ReadinessQuiz({ onProceedToAgreement }) {
  // Mode switcher: 'autodiagnostico' (Age-based Sí/No/A veces/No aplica) | 'madurez' (6-question score test)
  const [quizMode, setQuizMode] = useState('autodiagnostico');

  // State for Age-based Autodiagnóstico
  const [childAge, setChildAge] = useState(11);
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState('9-a-12');
  const [diagnosticAnswers, setDiagnosticAnswers] = useState({});

  // State for Classic Readiness Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleExactAgeChange = (newAge) => {
    const clamped = Math.max(2, Math.min(25, newAge));
    setChildAge(clamped);
    const group = getGroupByExactAge(clamped);
    setSelectedAgeGroupId(group.id);
  };

  const handleSelectAgeGroup = (group) => {
    setSelectedAgeGroupId(group.id);
    setChildAge(group.defaultAge);
  };

  const currentAgeGroup = diagnosticAgeGroups.find(g => g.id === selectedAgeGroupId) || diagnosticAgeGroups[1];

  const handleDiagnosticAnswer = (questionId, optionId) => {
    setDiagnosticAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const resetCurrentAgeAnswers = () => {
    const updated = { ...diagnosticAnswers };
    currentAgeGroup.questions.forEach(q => {
      delete updated[q.id];
    });
    setDiagnosticAnswers(updated);
  };

  const currentGroupAnsweredCount = currentAgeGroup.questions.filter(
    q => diagnosticAnswers[q.id] !== undefined
  ).length;

  const priorityQuestions = currentAgeGroup.questions.filter(
    q => diagnosticAnswers[q.id] === 'no' || diagnosticAnswers[q.id] === 'a_veces'
  );

  // Classic Quiz helpers
  const currentQ = quizQuestions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / quizQuestions.length) * 100);

  const handleSelectOption = (optionIndex, score) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: { optionIndex, score }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  const totalScore = Object.values(userAnswers).reduce((acc, curr) => acc + curr.score, 0);
  const result = isFinished ? getQuizResult(totalScore) : null;

  return (
    <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200" id="test-madurez">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Submode Switcher */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <ClipboardCheck className="w-3.5 h-3.5" />
            Autodiagnóstico y reflexión familiar
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {quizMode === 'autodiagnostico'
              ? 'Autodiagnóstico familiar según la edad'
              : '¿Está listo/a para su primer celular?'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {quizMode === 'autodiagnostico'
              ? 'Selecciona la edad de tu hijo o hija y responde con Sí, No, A veces o No aplica para identificar qué aspectos trabajar en casa o en el taller.'
              : 'Evalúa hábitos de responsabilidad cotidiana, autorregulación emocional y confianza antes de entregar el primer dispositivo.'}
          </p>

          <div className="inline-flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setQuizMode('autodiagnostico')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                quizMode === 'autodiagnostico'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Autodiagnóstico por Edad (Sí / No / A veces)
            </button>
            <button
              onClick={() => setQuizMode('madurez')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                quizMode === 'madurez'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Test de Madurez (Puntaje)
            </button>
          </div>
        </div>

        {quizMode === 'autodiagnostico' ? (
          <div key="mode-autodiagnostico" className="space-y-6 tab-panel-transition">
            {/* Dynamic Graphical Scientific Evidence Panel */}
            <ScientificEvidencePanel darkMode={false} defaultExpanded={true} />

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            
            {/* Age Selector Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  ¿Qué edad tiene tu hijo/a?:
                </span>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => handleExactAgeChange(childAge - 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="px-3 py-0.5 rounded-lg bg-indigo-600 text-white font-extrabold text-xs sm:text-sm min-w-[72px] text-center">
                    {childAge >= 21 ? '21+ años' : `${childAge} años`}
                  </span>
                  <button
                    onClick={() => handleExactAgeChange(childAge + 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {diagnosticAgeGroups.map((grp) => {
                  const isSelected = grp.id === currentAgeGroup.id;
                  return (
                    <button
                      key={grp.id}
                      onClick={() => handleSelectAgeGroup(grp)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {grp.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Age Warning / Orientation Banner */}
            <div className={`rounded-2xl p-4 sm:p-5 border flex items-start gap-3.5 transition-all duration-300 ${
              currentAgeGroup.alertType === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : currentAgeGroup.alertType === 'emerald'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : currentAgeGroup.alertType === 'purple'
                ? 'bg-purple-50 border-purple-200 text-purple-950'
                : 'bg-sky-50 border-sky-200 text-sky-950'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                currentAgeGroup.alertType === 'warning'
                  ? 'bg-amber-500 text-white'
                  : currentAgeGroup.alertType === 'emerald'
                  ? 'bg-emerald-600 text-white'
                  : currentAgeGroup.alertType === 'purple'
                  ? 'bg-purple-600 text-white'
                  : 'bg-sky-600 text-white'
              }`}>
                {currentAgeGroup.alertType === 'warning' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading font-extrabold text-sm sm:text-base">
                    {currentAgeGroup.alertTitle} ({childAge >= 21 ? '21+ años' : `${childAge} años`})
                  </h3>
                  {currentGroupAnsweredCount > 0 && (
                    <button
                      onClick={resetCurrentAgeAnswers}
                      className="text-xs font-bold underline opacity-75 hover:opacity-100"
                    >
                      Reiniciar respuestas ({currentGroupAnsweredCount}/6)
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {currentAgeGroup.alertMessage}
                </p>
              </div>
            </div>

            {/* 6 Questions Grid */}
            <div key={selectedAgeGroupId} className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-grid">
              {currentAgeGroup.questions.map((q, idx) => {
                const selectedAns = diagnosticAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      selectedAns
                        ? 'bg-indigo-50/30 border-indigo-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-indigo-700">
                          Pregunta {idx + 1}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          Eje: {q.workshopTopic}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-4 gap-1.5">
                        {responseOptions.map((opt) => {
                          const isSelected = selectedAns === opt.id;
                          let activeStyle = 'bg-indigo-600 border-indigo-600 text-white';
                          if (opt.id === 'si') activeStyle = 'bg-emerald-600 border-emerald-600 text-white';
                          if (opt.id === 'no') activeStyle = 'bg-rose-600 border-rose-600 text-white';
                          if (opt.id === 'a_veces') activeStyle = 'bg-amber-500 border-amber-500 text-slate-950';
                          if (opt.id === 'no_aplica') activeStyle = 'bg-slate-600 border-slate-600 text-white';

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleDiagnosticAnswer(q.id, opt.id)}
                              className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                                isSelected
                                  ? `${activeStyle} shadow-xs`
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>

                      {selectedAns && (
                        <p className="text-[11px] text-slate-600 bg-white border border-slate-200/80 rounded-xl px-3 py-2 leading-snug">
                          💡 <strong className="text-indigo-700">Pauta de trabajo:</strong> {q.topicNote}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 block">
                  Devolución orientadora ({currentGroupAnsweredCount} de 6 respondidas)
                </span>
                {priorityQuestions.length > 0 ? (
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Según tus respuestas con <strong>«No»</strong> o <strong>«A veces»</strong>, te sugerimos explorar especialmente:{' '}
                    <strong className="text-indigo-700">
                      {[...new Set(priorityQuestions.map(q => q.workshopTopic))].join(' · ')}
                    </strong>.
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-600">
                    Marca tus respuestas arriba para armar tu hoja de ruta familiar personalizada.
                  </p>
                )}
              </div>

              <button
                onClick={onProceedToAgreement}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shrink-0 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Ir al Acuerdo Familiar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            </div>
          </div>
        ) : (
          /* Classic Score Quiz Container */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 transition-all">
            {!isFinished ? (
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>PREGUNTA {currentQuestionIndex + 1} DE {quizQuestions.length}</span>
                    <span>{progressPercent}% COMPLETADO</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h3>
                  <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs sm:text-sm text-purple-900 leading-relaxed">
                    💡 <span className="font-semibold">Por qué importa:</span> {currentQ.explanation}
                  </div>

                  <div className="space-y-3 pt-3">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = userAnswers[currentQuestionIndex]?.optionIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx, opt.score)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-sm sm:text-base font-medium text-slate-800">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    Anterior
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={userAnswers[currentQuestionIndex] === undefined}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-200 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none transition-all"
                  >
                    <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'Ver Resultado' : 'Siguiente'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    result.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                    result.color === 'amber' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.badge} · Puntaje: {totalScore} de 12
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {result.status}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                    Recomendaciones clave para tu familia
                  </h4>
                  <div className="space-y-2.5">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Volver a responder el test</span>
                  </button>

                  <button
                    onClick={onProceedToAgreement}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Pasar al Protocolo & Generar Acuerdo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
