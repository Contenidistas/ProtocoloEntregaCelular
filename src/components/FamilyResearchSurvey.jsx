import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CONSENTIMIENTO_INFORMADO, SURVEY_BLOCKS } from '../data/familyResearchSurveyData';
import { 
  saveResearchRecord, 
  generateFamilyFeedback, 
  getResearchConfig 
} from '../utils/researchStorage';
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Smartphone,
  Clock,
  HeartHandshake,
  Tag,
  BookOpenCheck
} from 'lucide-react';

const INITIAL_ANSWERS = {
  parentesco: '',
  departamento_region: '',
  tipo_centro: '',
  edad_hijo: 10,
  genero_hijo: '',
  estado_celular: '',
  edad_primer_celular: 10,
  edad_acceso_internet: '',
  otros_dispositivos: [],
  motivo_principal_entrega: '',
  horas_semana: '',
  horas_fin_semana: '',
  actividades_percibidas: [],
  certeza_supervision: null,
  uso_control_parental: '',
  lugar_dormir_celular: '',
  frecuencia_conflictos: '',
  impacto_fisico_emocional: [],
  principal_preocupacion: '',
  comentario_abierto: ''
};

export default function FamilyResearchSurvey({ 
  onNavigateTab, 
  onProceedToAgreement, 
  onOpenResearcherDashboard 
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [participationMode, setParticipationMode] = useState('consent'); // 'consent' | 'local_only'
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [workshopCode, setWorkshopCode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [stepError, setStepError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect workshop code from URL query or hash if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let code = params.get('taller') || '';
    if (!code && window.location.hash.includes('taller=')) {
      const hashParts = window.location.hash.split('?');
      if (hashParts[1]) {
        const hashParams = new URLSearchParams(hashParts[1]);
        code = hashParams.get('taller') || '';
      }
    }
    if (code) {
      setWorkshopCode(code.toUpperCase());
    } else {
      const cfg = getResearchConfig();
      if (cfg.activeWorkshopCode && cfg.activeWorkshopCode !== 'WEB-PUBLICA') {
        setWorkshopCode(cfg.activeWorkshopCode);
      }
    }
  }, []);

  const currentBlock = SURVEY_BLOCKS[currentStep];
  const totalSteps = SURVEY_BLOCKS.length;
  const progressPct = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleSingleChange = (questionId, value) => {
    setStepError('');
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleOtherDetailChange = (questionId, text) => {
    setAnswers(prev => ({ ...prev, [`${questionId}_otro_detalle`]: text }));
  };

  const handleMultipleToggle = (questionId, optionValue, maxSelections) => {
    setStepError('');
    setAnswers(prev => {
      const currentArr = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      if (optionValue === 'ninguno') {
        return { ...prev, [questionId]: currentArr.includes('ninguno') ? [] : ['ninguno'] };
      }
      const withoutNone = currentArr.filter(v => v !== 'ninguno');
      if (withoutNone.includes(optionValue)) {
        return { ...prev, [questionId]: withoutNone.filter(v => v !== optionValue) };
      }
      if (maxSelections && withoutNone.length >= maxSelections) {
        return prev;
      }
      return { ...prev, [questionId]: [...withoutNone, optionValue] };
    });
  };

  const validateCurrentBlock = () => {
    for (const q of currentBlock.questions) {
      if (!q.required) continue;
      const val = answers[q.id];
      if (q.type === 'multiple') {
        if (!Array.isArray(val) || val.length === 0) {
          return `Por favor respondé la pregunta ${q.label.split('.')[0]} para continuar.`;
        }
      } else if (val === '' || val === null || val === undefined) {
        return `Por favor respondé la pregunta ${q.label.split('.')[0]} para continuar.`;
      }
    }
    return '';
  };

  const handleNextStep = async () => {
    const err = validateCurrentBlock();
    if (err) {
      setStepError(err);
      return;
    }
    setStepError('');

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Submit survey
      setIsSubmitting(true);
      const isConsent = participationMode === 'consent' && consentAccepted;
      const saved = await saveResearchRecord(answers, {
        consentAccepted: isConsent,
        workshopCode: workshopCode.trim() || 'WEB-PUBLICA'
      });
      setIsSubmitting(false);
      setSubmittedRecord(saved);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // Ignore confetti errors on older browsers
      }
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setHasStarted(false);
    }
  };

  const handleResetSurvey = () => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(0);
    setSubmittedRecord(null);
    setHasStarted(false);
    setStepError('');
  };

  // ---------------------------------------------------------------------------
  // VIEW 1: COMPLETED SURVEY + OFFICIAL EVIDENCE-BASED FAMILY FEEDBACK
  // ---------------------------------------------------------------------------
  if (submittedRecord) {
    const feedbackItems = generateFamilyFeedback(answers);
    const weekdayLabel =
      SURVEY_BLOCKS[2].questions[0].options
        .find(o => o.value === answers.horas_semana)
        ?.label.replace(' por día', '') || '-';

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Top Confirmation Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                    {submittedRecord.consentAccepted
                      ? 'Aporte anónimo registrado'
                      : 'Modo solo devolución local'}
                  </span>
                  {submittedRecord.consentAccepted && (
                    <span className="text-[11px] font-mono text-slate-400">
                      ID: {submittedRecord.id}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  ¡Muchas gracias por tu participación!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {submittedRecord.consentAccepted
                    ? 'Tus respuestas fueron guardadas de forma 100% anónima para el estudio sobre percepciones familiares y primer celular en Uruguay.'
                    : 'Tus respuestas no fueron guardadas en la base del estudio. Aquí tenés tu devolución personalizada.'}
                </p>
              </div>
            </div>
          </div>

          {/* Official Scientific Evidence Emphasis Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950 text-white border border-indigo-800 flex items-start gap-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-indigo-800/80 text-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed">
              <span className="font-heading font-extrabold text-sm text-white block">
                Devolución elaborada de acuerdo a la evidencia científica y pautas oficiales
              </span>
              <p className="text-indigo-100/90">
                Todas las sugerencias que ves a continuación se generan en función de tus respuestas siguiendo los lineamientos oficiales de la <strong>Sociedad Uruguaya de Pediatría (SUP)</strong>, la <strong>Organización Mundial de la Salud (OMS)</strong>, el <strong>Ministerio de Salud Pública (MSP)</strong>, <strong>AGESIC</strong> y <strong>Plan Ceibal / ANEP</strong>.
              </p>
            </div>
          </div>

          {/* Quick Snapshot of Family Profile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[11px] text-slate-500 block">Edad actual del hijo/a</span>
              <span className="font-heading font-extrabold text-base text-slate-900">
                {answers.edad_hijo} años
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Edad 1er celular</span>
              <span className="font-heading font-extrabold text-base text-indigo-700">
                {answers.edad_primer_celular} años
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Pantallas Lun a Vie</span>
              <span className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-2">
                {weekdayLabel}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Certeza de supervisión</span>
              <span className="font-heading font-extrabold text-base text-slate-900">
                Nivel {answers.certeza_supervision} de 5
              </span>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="space-y-3 pt-2">
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Sugerencias personalizadas basadas en evidencia para tu hogar</span>
            </h4>

            <div className="grid grid-cols-1 gap-3.5">
              {feedbackItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border ${
                    item.level === 'prioritario'
                      ? 'bg-amber-50/70 border-amber-200'
                      : item.level === 'positivo'
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-indigo-50/50 border-indigo-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.level === 'prioritario'
                          ? 'bg-amber-200/80 text-amber-900'
                          : item.level === 'positivo'
                          ? 'bg-emerald-200/80 text-emerald-900'
                          : 'bg-indigo-200/80 text-indigo-900'
                      }`}
                    >
                      {item.level === 'prioritario'
                        ? 'Atención sugerida por evidencia'
                        : item.level === 'positivo'
                        ? 'Factor protector validado'
                        : 'Sugerencia basada en evidencia'}
                    </span>
                  </div>
                  <h5 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    {item.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                    {item.text}
                  </p>
                  {item.evidenciaOficial && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500">
                        <strong>Fuente / Respaldo oficial:</strong> {item.evidenciaOficial}
                      </span>
                      {item.actionTab && (
                        <button
                          onClick={() => {
                            if (item.actionTab === 'acuerdo-familiar' && onProceedToAgreement) {
                              onProceedToAgreement();
                            } else if (onNavigateTab) {
                              onNavigateTab(item.actionTab);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleResetSurvey}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Completar otra respuesta</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {onProceedToAgreement && (
                <button
                  onClick={onProceedToAgreement}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all"
                >
                  <span>Armar nuestro Acuerdo Familiar (PDF)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW 2: INFORMED CONSENT & WELCOME CARD (BEFORE STARTING)
  // ---------------------------------------------------------------------------
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Top Badge & Researcher Access Button */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Estudio Académico y Diagnóstico Familiar · Uruguay 🇺🇾</span>
            </span>

            {onOpenResearcherDashboard && (
              <button
                onClick={onOpenResearcherDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
                title="Acceso con contraseña para el investigador responsable"
              >
                <Lock className="w-3 h-3 text-slate-600" />
                <span>Perfil Investigador (Datos)</span>
              </button>
            )}
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Percepciones familiares sobre el primer celular, tiempo en pantalla y salud
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Te invitamos a responder esta breve encuesta anónima (<strong>2 a 3 minutos</strong>). Al finalizar, recibirás una <strong>devolución personalizada elaborada de acuerdo a la evidencia científica y pautas oficiales</strong> (Sociedad Uruguaya de Pediatría, OMS, MSP, AGESIC y ANEP) y, si estás de acuerdo, tus respuestas anónimas aportarán a una investigación sobre bienestar digital infantil y adolescente en Uruguay.
            </p>
          </div>

          {/* 3 Visual Pillars of What is Surveyed */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Edad de inicio y dispositivos</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  A qué edad reciben su primer celular, acceso a internet y motivos de entrega.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Tiempo y uso percibido</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  Qué creen las familias que hacen sus hijos/as en línea y cuántas horas pasan en pantalla.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">Postura, visión, ira y sueño</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  Efectos en la postura, vista, aislamiento, frustración en juegos en línea y descanso nocturno.
                </p>
              </div>
            </div>
          </div>

          {/* Informed Consent Box */}
          <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-4 sm:p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                    {CONSENTIMIENTO_INFORMADO.titulo}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <strong>Investigador responsable:</strong> {CONSENTIMIENTO_INFORMADO.investigador} ({CONSENTIMIENTO_INFORMADO.filiacion}) ·{' '}
                    <span className="font-mono text-indigo-700">{CONSENTIMIENTO_INFORMADO.contacto}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFullConsent(!showFullConsent)}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors"
              >
                <span>{showFullConsent ? 'Ocultar detalle' : 'Leer protocolo ético'}</span>
                {showFullConsent ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showFullConsent && (
              <div className="bg-white rounded-xl p-4 border border-indigo-100 space-y-3 text-xs text-slate-700 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONSENTIMIENTO_INFORMADO.puntosClave.map((punto, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                      <p className="font-bold text-slate-900">{punto.titulo}</p>
                      <p className="text-slate-600 leading-relaxed">{punto.texto}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <strong>Marco normativo:</strong> {CONSENTIMIENTO_INFORMADO.marcoLegal}. No se recolectan datos personales identificatorios (nombre, documento, IP ni correo).
                </p>
              </div>
            )}

            {/* Radio Options for Consent vs Local-Only */}
            <div className="space-y-2.5 pt-1">
              <label
                onClick={() => {
                  setParticipationMode('consent');
                  setConsentAccepted(true);
                }}
                className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  participationMode === 'consent'
                    ? 'bg-white border-indigo-600 shadow-xs'
                    : 'bg-white/60 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <input
                  type="radio"
                  name="consent_mode"
                  checked={participationMode === 'consent'}
                  onChange={() => {
                    setParticipationMode('consent');
                    setConsentAccepted(true);
                  }}
                  className="mt-1 w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold text-slate-900 block">
                    Sí, acepto el Consentimiento Informado y quiero aportar mis respuestas de forma 100% anónima
                  </span>
                  <span className="text-slate-600">
                    {CONSENTIMIENTO_INFORMADO.declaracionAceptacion}
                  </span>
                </div>
              </label>

              <label
                onClick={() => {
                  setParticipationMode('local_only');
                  setConsentAccepted(false);
                }}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  participationMode === 'local_only'
                    ? 'bg-white border-slate-600 shadow-xs'
                    : 'bg-white/50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="consent_mode"
                  checked={participationMode === 'local_only'}
                  onChange={() => {
                    setParticipationMode('local_only');
                    setConsentAccepted(false);
                  }}
                  className="mt-1 w-4 h-4 text-slate-600 focus:ring-slate-500"
                />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold text-slate-700 block">
                    Solo quiero realizar el autodiagnóstico para ver mi devolución familiar (sin guardar datos en el estudio)
                  </span>
                  <span className="text-slate-500">
                    Podés responder el cuestionario y recibir las sugerencias basadas en evidencia oficial en pantalla sin que tus respuestas se registren en la muestra académica.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Optional Workshop Cohort Tag & Start Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex items-center gap-2">
                <label htmlFor="workshop-code-input" className="text-xs text-slate-500 font-medium">
                  Código de taller (opcional):
                </label>
                <input
                  id="workshop-code-input"
                  type="text"
                  value={workshopCode}
                  onChange={e => setWorkshopCode(e.target.value.toUpperCase())}
                  placeholder="Ej: TALLER-MAYO"
                  className="w-36 px-2.5 py-1 text-xs font-mono uppercase rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHasStarted(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-sm hover:shadow transition-all"
            >
              <span>Comenzar encuesta (2 min)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW 3: STEP-BY-STEP QUESTIONNAIRE WIZARD
  // ---------------------------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Top Progress Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-700 uppercase tracking-wider">
              Paso {currentStep + 1} de {totalSteps} · {currentBlock.title}
            </span>
            <span className="font-mono font-bold text-slate-500">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">{currentBlock.subtitle}</p>
        </div>

        {/* Questions in Current Block */}
        <div className="space-y-6 pt-2">
          {currentBlock.questions.map((q) => {
            const val = answers[q.id];
            const selectedSingleOption = q.type === 'single' ? q.options?.find(o => o.value === val) : null;
            const hasSelectedOtherMultiple =
              q.type === 'multiple' &&
              Array.isArray(val) &&
              q.options?.some(o => o.allowOtherText && val.includes(o.value));
            const showOtherInput = Boolean(selectedSingleOption?.allowOtherText || hasSelectedOtherMultiple);

            return (
              <div key={q.id} className="space-y-2.5 pb-5 border-b border-slate-100 last:border-b-0 last:pb-0">
                <label className="block font-heading font-bold text-sm sm:text-base text-slate-900">
                  {q.label}
                </label>

                {/* Single choice */}
                {q.type === 'single' && (
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt) => {
                      const selected = val === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSingleChange(q.id, opt.value)}
                          className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${
                            selected
                              ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500/30'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                            }`}
                          >
                            {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Number slider */}
                {q.type === 'number_slider' && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Deslizá o elegí la edad:</span>
                      <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-heading font-extrabold text-base">
                        {val} {q.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={q.min}
                      max={q.max}
                      value={val}
                      onChange={(e) => handleSingleChange(q.id, Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>{q.min} años</span>
                      <span>{Math.round((q.min + q.max) / 2)} años</span>
                      <span>{q.max}+ años</span>
                    </div>
                  </div>
                )}

                {/* Multiple choice */}
                {q.type === 'multiple' && (
                  <div className="space-y-1.5">
                    {q.maxSelections && (
                      <p className="text-[11px] text-indigo-600 font-semibold">
                        Seleccionadas: {(val || []).length} de máximo {q.maxSelections}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        const selected = Array.isArray(val) && val.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleMultipleToggle(q.id, opt.value, q.maxSelections)}
                            className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                              selected
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 text-[10px] ${
                                selected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                              }`}
                            >
                              {selected && '✓'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Optional specification input when "Otro" is selected */}
                {showOtherInput && (
                  <div className="pt-1 animate-in fade-in duration-150">
                    <input
                      type="text"
                      value={answers[`${q.id}_otro_detalle`] || ''}
                      onChange={(e) => handleOtherDetailChange(q.id, e.target.value)}
                      placeholder="Si querés, especificá cuál (opcional)..."
                      className="w-full px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50/30 text-xs text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                )}

                {/* Likert 1-5 */}
                {q.type === 'likert' && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="grid grid-cols-5 gap-2">
                      {q.options.map((opt) => {
                        const selected = val === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSingleChange(q.id, opt.value)}
                            className={`py-3 rounded-xl font-heading font-extrabold text-base border transition-all ${
                              selected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm scale-105'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 gap-4">
                      <span>{q.minLabel}</span>
                      <span className="text-right">{q.maxLabel}</span>
                    </div>
                  </div>
                )}

                {/* Textarea */}
                {q.type === 'textarea' && (
                  <textarea
                    rows={3}
                    value={val}
                    onChange={(e) => handleSingleChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Validation Error Alert */}
        {stepError && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevStep}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 0 ? 'Volver al consentimiento' : 'Anterior'}</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleNextStep}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
          >
            <span>
              {currentStep < totalSteps - 1
                ? 'Siguiente paso'
                : isSubmitting
                ? 'Procesando...'
                : 'Finalizar y ver devolución basada en evidencia'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
