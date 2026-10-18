import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { videosList } from '../data/videosData';
import { caseStudies } from '../data/caseStudiesData';
import { 
  diagnosticAgeGroups, 
  responseOptions, 
  getGroupByExactAge 
} from '../data/workshopDiagnosticData';
import ScientificEvidencePanel from './ScientificEvidencePanel';
import { 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  QrCode, 
  Clock, 
  Video, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  PhoneCall, 
  FileText, 
  Sparkles, 
  X,
  Presentation,
  BookOpen,
  Brain,
  Flame,
  Sun,
  Utensils,
  Moon,
  BellOff,
  Shield,
  HeartHandshake,
  Smartphone,
  ExternalLink,
  ClipboardCheck,
  Users,
  ArrowRight,
  BarChart3
} from 'lucide-react';

export default function WorkshopMode({ onExit }) {
  // Current slide index (0 to 7, starting with 0 = Autodiagnóstico por Edad)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef(null);
  
  // Age & Self-Assessment state for Slide 0
  const [childAge, setChildAge] = useState(11);
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState('9-a-12');
  const [diagnosticAnswers, setDiagnosticAnswers] = useState({});
  const [slide0View, setSlide0View] = useState('preguntas'); // 'preguntas' | 'evidencia'

  // Timer state (default 45 min = 2700 sec)
  const [timerSeconds, setTimerSeconds] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Selected submode for Slide 6 ('votacion' | 'cineforo')
  const [slide6Submode, setSlide6Submode] = useState('votacion');

  // Selected clip for Slide 3 ("El dilema de las redes sociales")
  const socialDilemmaClips = [
    {
      id: 'cual-es-el-problema',
      label: '1. ¿Cuál es el problema? (Netflix)',
      title: '¿Cuál es el problema? — Fragmento oficial Netflix España',
      embedUrl: 'https://www.youtube.com/embed/tBnNuJSs6P0',
      note: 'Los exingenieros de Google, Facebook e Instagram explican cómo diseñaron mecanismos para capturar la atención.'
    },
    {
      id: 'apertura-ingenieros',
      label: '2. Confesión de los creadores',
      title: 'Introducción: Confesiones de quienes crearon las redes',
      embedUrl: 'https://www.youtube.com/embed/Erod28mWPE4',
      note: 'Por qué quienes programaron el botón de "Me gusta" y las notificaciones no permiten que sus propios hijos usen redes.'
    },
    {
      id: 'si-no-pagas-trailer',
      label: '3. "El producto sos vos" (2 min)',
      title: 'Síntesis (2 min): "Si no pagás por el producto, el producto sos vos"',
      embedUrl: 'https://www.youtube.com/embed/Sn2Nr8VEwoM',
      note: 'Disparador corto e impactante sobre cómo se subasta nuestro tiempo y atención a los anunciantes.'
    },
    {
      id: 'escenas-clave-cena',
      label: '4. Escenas: Algoritmo y cena',
      title: 'Escenas clave: Los 3 maniquíes del algoritmo y el reto en la cena',
      embedUrl: 'https://www.youtube.com/embed/LF77-dY46cA',
      note: 'Muestra la dramatización de cómo opera el algoritmo dentro de la mente adolescente y la tensión en la mesa familiar.'
    },
    {
      id: 'doblaje-latino',
      label: '5. Versión Audio Latino',
      title: 'El dilema de las redes sociales (Audio Español Latino)',
      embedUrl: 'https://www.youtube.com/embed/rOYFoiGKKrg',
      note: 'Ideal para reproducir fragmentos específicos doblados al español latino durante la charla.'
    }
  ];
  const [selectedDilemmaClipId, setSelectedDilemmaClipId] = useState(socialDilemmaClips[0].id);
  const currentDilemmaClip = socialDilemmaClips.find(c => c.id === selectedDilemmaClipId) || socialDilemmaClips[0];

  // Selected video for Cine-Foro slide (default to first AGESIC or local video)
  const [selectedVideoId, setSelectedVideoId] = useState('agesic-que-es-ciudadania-digital');

  // Selected dilemma for Live Voting slide
  const [selectedCaseId, setSelectedCaseId] = useState(caseStudies[0].id);
  const [votedOptionId, setVotedOptionId] = useState(null);
  const [handVotes, setHandVotes] = useState({ a: 0, b: 0, c: 0 });

  // Show presenter notes drawer
  const [showNotes, setShowNotes] = useState(false);

  // Sync exact age changes with age group bracket
  const handleExactAgeChange = (newAge) => {
    const clamped = Math.max(2, Math.min(25, newAge));
    setChildAge(clamped);
    const group = getGroupByExactAge(clamped);
    setSelectedAgeGroupId(group.id);
  };

  // Sync age group button click with representative default age
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

  // Count how many questions of current age group are answered
  const currentGroupAnsweredCount = currentAgeGroup.questions.filter(
    q => diagnosticAnswers[q.id] !== undefined
  ).length;

  // Topics flagged with 'no' or 'a_veces' to highlight during the workshop
  const priorityQuestionsForWorkshop = currentAgeGroup.questions.filter(
    q => diagnosticAnswers[q.id] === 'no' || diagnosticAnswers[q.id] === 'a_veces'
  );

  // Questions linked to the currently active slide (for slides 1..7)
  const linkedQuestionsForCurrentSlide = currentAgeGroup.questions.filter(
    q => q.targetSlideIndex === currentSlide
  );

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Slides metadata (8 slides, starting with Autodiagnóstico)
  const slides = [
    { title: "Autodiagnóstico inicial por edad", timeGuide: "0 - 6 min" },
    { title: "Construir ciudadanía digital", timeGuide: "6 - 12 min" },
    { title: "Neurociencia y Marián Rojas", timeGuide: "12 - 20 min" },
    { title: "El dilema de las redes", timeGuide: "20 - 27 min" },
    { title: "FOMO vs. JOMO", timeGuide: "27 - 33 min" },
    { title: "Buenas prácticas y estrategias", timeGuide: "33 - 40 min" },
    { title: "Cine-foro y votación en sala", timeGuide: "40 - 46 min" },
    { title: "Cierre, pacto y ayuda en Uruguay", timeGuide: "46 - 50 min" },
  ];

  // Keyboard navigation (Left/Right arrows for slides)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          handleNextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          handlePrevSlide();
        }
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const goToSlide = (targetIdx) => {
    setCurrentSlide(prev => {
      const clamped = Math.max(0, Math.min(slides.length - 1, targetIdx));
      if (clamped !== prev) {
        setSlideDirection(clamped > prev ? 'next' : 'prev');
        if (stageRef.current) {
          stageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return clamped;
    });
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => {
      if (prev < slides.length - 1) {
        setSlideDirection('next');
        if (stageRef.current) {
          stageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => {
      if (prev > 0) {
        setSlideDirection('prev');
        if (stageRef.current) {
          stageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return prev - 1;
      }
      return prev;
    });
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Full URL for QR code (supports local dev and GitHub Pages subpath)
  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${import.meta.env.BASE_URL}`
    : 'https://contenidistas.github.io/ProtocoloEntregaCelular/';

  const currentVideo = videosList.find(v => v.id === selectedVideoId) || videosList[0];
  const activeCase = caseStudies.find(c => c.id === selectedCaseId) || caseStudies[0];
  const votedOption = activeCase.options.find(o => o.id === votedOptionId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden animate-in fade-in duration-300">
      
      {/* Top Facilitator Control Bar */}
      <header className="h-14 sm:h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0">
        
        {/* Left: Indicator & Presentation title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-indigo-950 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider">
            <Presentation className="w-3.5 h-3.5 text-indigo-400" />
            <span>Modo taller · Proyector</span>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline">
            Diapositiva {currentSlide + 1} de {slides.length}: <strong className="text-slate-200">{slides[currentSlide].title}</strong>
          </span>
        </div>

        {/* Center: Slide indicator dots */}
        <div className="hidden lg:flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? 'w-8 bg-indigo-500' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`${idx + 1}. ${s.title}`}
            />
          ))}
        </div>

        {/* Right: Timer, Notes, Fullscreen & Exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 45 min timer */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono font-bold text-amber-300 text-sm">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-slate-300 hover:text-white p-1"
              title={isTimerRunning ? 'Pausar tiempo' : 'Iniciar tiempo'}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => { setIsTimerRunning(false); setTimerSeconds(45 * 60); }}
              className="text-slate-400 hover:text-slate-200 p-1"
              title="Reiniciar a 45 minutos"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Presenter notes toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors hidden sm:flex items-center gap-1.5 ${
              showNotes 
                ? 'bg-amber-400/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Apuntes</span>
          </button>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Pantalla completa para proyector"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit Workshop button */}
          <button
            onClick={onExit}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar</span>
          </button>

        </div>

      </header>

      {/* Main Slide Presentation Stage */}
      <div
        ref={stageRef}
        className="flex-1 relative flex items-start sm:items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto overflow-x-hidden"
      >
        
        <div
          key={`slide-${currentSlide}-${slide0View}-${slide6Submode}`}
          className={`w-full max-w-6xl mx-auto my-auto space-y-5 ${
            slideDirection === 'prev' ? 'slide-transition-prev' : 'slide-transition-next'
          }`}
        >

          {/* Contextual Banner on Slides 1..7 if linked to Self-Assessment */}
          {currentSlide > 0 && linkedQuestionsForCurrentSlide.length > 0 && (
            <div className="bg-indigo-950/80 border border-indigo-700/70 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-indigo-200">
                <ClipboardCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">Conectado con el autodiagnóstico inicial ({currentAgeGroup.label}):</strong>{' '}
                  «{linkedQuestionsForCurrentSlide[0].question}»
                </span>
              </div>
              {diagnosticAnswers[linkedQuestionsForCurrentSlide[0].id] && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 shrink-0">
                  Respuesta inicial: {
                    responseOptions.find(r => r.id === diagnosticAnswers[linkedQuestionsForCurrentSlide[0].id])?.label
                  }
                </span>
              )}
            </div>
          )}

          {/* SLIDE 0: Autodiagnóstico Inicial por Edad + Evidencia Científica */}
          {currentSlide === 0 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              {/* Header & View Switcher (Preguntas vs. Evidencia Científica) */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-900/70 border border-indigo-700 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
                      <ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" />
                      Paso 1 del Taller · Autodiagnóstico y Evidencia
                    </span>

                    {/* Subview Toggle Pills */}
                    <div className="inline-flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => setSlide0View('preguntas')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          slide0View === 'preguntas'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        <span>1. Preguntas por Edad</span>
                      </button>
                      <button
                        onClick={() => setSlide0View('evidencia')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          slide0View === 'evidencia'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>2. Evidencia Científica y Datos (Links)</span>
                      </button>
                    </div>
                  </div>

                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {slide0View === 'preguntas'
                      ? 'Autodiagnóstico familiar según la edad de tu hijo/a'
                      : 'Evidencia científica sobre el uso de pantallas'}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    {slide0View === 'preguntas'
                      ? 'Indicá primero la edad de tu hijo o hija. Las preguntas no buscan calificar ni juzgar, sino identificar qué temas del taller de hoy te resultarán más útiles.'
                      : 'Datos verificables (horas promedio, afectación neuronal, visión, postura cervical, salud mental y medicación) con enlace directo a las publicaciones científicas.'}
                  </p>
                </div>

                {/* Exact Age Stepper + Stage Selector */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0">
                  <div className="flex items-center justify-between sm:justify-end gap-2 bg-slate-950 border border-slate-700 px-3.5 py-2 rounded-2xl">
                    <span className="text-xs font-bold text-slate-300">Edad del hijo/a:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleExactAgeChange(childAge - 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center"
                        title="Restar 1 año"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-extrabold text-sm min-w-[72px] text-center">
                        {childAge >= 21 ? '21+ años' : `${childAge} años`}
                      </span>
                      <button
                        onClick={() => handleExactAgeChange(childAge + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center"
                        title="Sumar 1 año"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 4 Age Bracket Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {diagnosticAgeGroups.map((grp) => {
                      const isSelected = grp.id === currentAgeGroup.id;
                      return (
                        <button
                          key={grp.id}
                          onClick={() => handleSelectAgeGroup(grp)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/40'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {grp.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {slide0View === 'evidencia' ? (
                <div className="space-y-4">
                  <ScientificEvidencePanel darkMode={true} defaultExpanded={true} />
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4">
                    <button
                      onClick={() => setSlide0View('preguntas')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                    >
                      <ClipboardCheck className="w-4 h-4 text-indigo-400" />
                      <span>← Volver a las preguntas del autodiagnóstico</span>
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md"
                    >
                      <span>Continuar a Diapositiva 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Age-Specific Alert / Orientation Box */}
                  <div className={`rounded-2xl p-4 sm:p-5 border-2 flex items-start gap-3.5 ${
                    currentAgeGroup.alertType === 'warning'
                      ? 'bg-amber-950/60 border-amber-500/70 text-amber-100'
                      : currentAgeGroup.alertType === 'emerald'
                      ? 'bg-emerald-950/60 border-emerald-500/70 text-emerald-100'
                      : currentAgeGroup.alertType === 'purple'
                      ? 'bg-purple-950/60 border-purple-500/60 text-purple-100'
                      : 'bg-sky-950/60 border-sky-500/60 text-sky-100'
                  }`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      currentAgeGroup.alertType === 'warning'
                        ? 'bg-amber-500 text-slate-950'
                        : currentAgeGroup.alertType === 'emerald'
                        ? 'bg-emerald-500 text-slate-950'
                        : currentAgeGroup.alertType === 'purple'
                        ? 'bg-purple-500 text-white'
                        : 'bg-sky-500 text-slate-950'
                    }`}>
                      {currentAgeGroup.alertType === 'warning' ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <Users className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-white">
                          {currentAgeGroup.alertTitle} ({childAge >= 21 ? '21+ años' : `${childAge} años`})
                        </h3>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSlide0View('evidencia')}
                            className="text-[11px] font-extrabold text-rose-300 hover:text-rose-200 underline flex items-center gap-1"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                            <span>Ver gráficos de evidencia científica y links</span>
                          </button>
                          {currentGroupAnsweredCount > 0 && (
                            <button
                              onClick={resetCurrentAgeAnswers}
                              className="text-[11px] font-bold underline opacity-80 hover:opacity-100"
                            >
                              Limpiar ({currentGroupAnsweredCount}/6)
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                        {currentAgeGroup.alertMessage}
                      </p>
                    </div>
                  </div>

                  {/* 6 Neutral Questions Grid with Sí / No / A veces / No aplica */}
                  <div key={selectedAgeGroupId} className="grid grid-cols-1 md:grid-cols-2 gap-3.5 stagger-grid">
                    {currentAgeGroup.questions.map((q, idx) => {
                      const selectedAns = diagnosticAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                            selectedAns
                              ? 'bg-slate-900 border-indigo-500/60 shadow-md'
                              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300">
                                Pregunta {idx + 1} de 6
                              </span>
                              <button
                                onClick={() => goToSlide(q.targetSlideIndex)}
                                className="text-[10px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                                title="Ir a la diapositiva donde se aborda este tema"
                              >
                                <span>Se aborda en: {q.workshopTopic}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                              {q.question}
                            </p>
                          </div>

                          {/* 4 Response Options: Sí | No | A veces | No aplica */}
                          <div className="space-y-2">
                            <div className="grid grid-cols-4 gap-1.5">
                              {responseOptions.map((opt) => {
                                const isSelected = selectedAns === opt.id;
                                let activeStyle = 'bg-indigo-600 border-indigo-400 text-white';
                                if (opt.id === 'si') activeStyle = 'bg-emerald-600 border-emerald-400 text-white';
                                if (opt.id === 'no') activeStyle = 'bg-rose-600 border-rose-400 text-white';
                                if (opt.id === 'a_veces') activeStyle = 'bg-amber-500 border-amber-300 text-slate-950';
                                if (opt.id === 'no_aplica') activeStyle = 'bg-slate-600 border-slate-400 text-white';

                                return (
                                  <button
                                    key={opt.id}
                                    onClick={() => handleDiagnosticAnswer(q.id, opt.id)}
                                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                                      isSelected
                                        ? `${activeStyle} shadow-xs`
                                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>

                            {selectedAns && (
                              <p className="text-[11px] text-slate-300 bg-slate-950/90 border border-slate-800 rounded-xl px-2.5 py-1.5 leading-snug">
                                💡 <strong className="text-indigo-300">En el taller:</strong> {q.topicNote}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Dynamic Workshop Roadmap Summary */}
                  <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-400 block">
                        {currentGroupAnsweredCount === 0
                          ? 'Mapa de ruta del taller'
                          : `Resumen del autodiagnóstico (${currentGroupAnsweredCount} de 6 respondidas)`}
                      </span>
                      {priorityQuestionsForWorkshop.length > 0 ? (
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          A partir de las respuestas marcadas con <strong>«No»</strong> o <strong>«A veces»</strong>, hoy nos detendremos especialmente en:{' '}
                          <span className="text-amber-300 font-bold">
                            {[...new Set(priorityQuestionsForWorkshop.map(q => q.workshopTopic))].join(' · ')}
                          </span>.
                        </p>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Respondé con <strong>Sí</strong>, <strong>No</strong>, <strong>A veces</strong> o <strong>No aplica</strong>, o mirá los <strong>gráficos de evidencia científica</strong> antes de avanzar.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSlide0View('evidencia')}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Ver evidencia científica</span>
                      </button>

                      <button
                        onClick={handleNextSlide}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                      >
                        <span>Iniciar recorrido del taller</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

            </div>
          )}

          {/* SLIDE 1: Cómo construimos ciudadanía digital en la era algorítmica */}
          {currentSlide === 1 && (
            <div className="max-w-5xl w-full mx-auto space-y-7 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-900/60 border border-indigo-700 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Apertura conceptual · Uruguay Educa DGES & AGESIC
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  ¿Cómo construimos ciudadanía digital hoy?
                </h1>
                <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light">
                  Más allá de prohibir o soltar sin frenos: formar criterio, empatía y autonomía en el mundo hiperconectado.
                </p>
              </div>

              {/* 3 Pillars of Digital Citizenship */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-5 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    1. Derechos y supervisión (S.E.R.C.)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Entender que la privacidad frente a extraños, los datos personales y el acompañamiento familiar son la base de la seguridad en línea.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-5 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    2. Convivencia y huella digital
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    El ciberespacio es una prolongación de la convivencia social. La palabra en internet deja huella y no debemos ser testigos silenciosos del acoso.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-400 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    3. Pensamiento crítico
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Comprender que las plataformas no son neutrales: están diseñadas por algoritmos comerciales que buscan capturar nuestro tiempo y atención.
                  </p>
                </div>
              </div>

              {/* Metaphor Block & Audience QR Code */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 bg-slate-900/90 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-6 shadow-xl">
                  <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug italic">
                    "El celular no es un juguete ni un chupete electrónico; es una plaza pública global. No soltamos a un chiquilín solo de noche en una plaza sin enseñarle antes cómo cuidarse y cómo volver a casa."
                  </p>
                  <span className="text-xs text-indigo-300 font-bold block mt-2">
                    — Prof. Santiago Hernández (Contenidista de Informática, Uruguay Educa DGES)
                  </span>
                </div>

                <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center gap-4 shadow-xl">
                  <div className="bg-white p-2 rounded-2xl shrink-0 shadow-md">
                    <QRCodeSVG value={currentUrl} size={84} />
                  </div>
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-sky-400 uppercase tracking-wider">
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Abrí en tu celular</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      Seguí el taller en vivo desde tu asiento
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Escaneá el código para explorar los acuerdos y guías en tu teléfono.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Neurociencia · Marián Rojas Estapé */}
          {currentSlide === 2 && (
            <div className="max-w-5xl w-full mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Brain className="w-3.5 h-3.5 text-amber-400" />
                  Neurociencia, sueño y desarrollo cerebral
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  ¿La primera generación menos inteligente que sus padres?
                </h2>
              </div>

              {/* Impact Quote Box */}
              <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 text-center max-w-3xl mx-auto shadow-2xl">
                <p className="text-lg sm:text-2xl font-extrabold text-white leading-snug italic">
                  “Estamos ante la primera generación en la historia en la que los hijos van a ser menos inteligentes que sus padres... No por genética, sino porque no entrenan sus funciones mentales superiores.”
                </p>
                <span className="text-xs sm:text-sm text-amber-300 font-bold uppercase tracking-wider block mt-2">
                  — Dra. Marián Rojas Estapé (Médica Psiquiatra y Divulgadora)
                </span>
              </div>

              {/* Embedded YouTube Player & Key Biological Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                
                {/* Video Player */}
                <div className="lg:col-span-7 bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 aspect-video flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/UMIcGuwzuVk"
                    title="Estamos ante la primera generación en la que los hijos van a ser menos inteligentes que los Padres - Dra. Marian Rojas Estapé"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* 3 Biological Pillars */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>1. El principio "Úsalo o piérdelo"</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Si el GPS orienta, la agenda recuerda y la pantalla entretiene sin esfuerzo, el hipocampo y la memoria no se ejercitan y se debilitan.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <h4 className="text-xs font-extrabold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>2. Corteza prefrontal y sueño nocturno</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Madura hasta los 25 años. Regula la atención profunda, el control de impulsos y las emociones. La luz azul nocturna y la dopamina constante la agotan.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>3. El aburrimiento como motor</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      El aburrimiento activa la red neuronal por defecto y despierta la creatividad. Si tapamos el aburrimiento con una pantalla, apagamos la imaginación.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SLIDE 3: El consumo de redes sociales y "El dilema de las redes" */}
          {currentSlide === 3 && (
            <div className="max-w-6xl w-full mx-auto space-y-5 animate-in fade-in duration-300">
              <div className="text-center space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/50 border border-red-700/60 text-red-300 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  Diseño persuasivo y economía de la atención
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  El negocio de la atención: "El dilema de las redes"
                </h2>
              </div>

              {/* Clip Selector Bar for The Social Dilemma excerpts */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-400 px-2 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" />
                  <span>Fragmentos en video:</span>
                </span>
                {socialDilemmaClips.map((clip) => {
                  const isSelected = clip.id === currentDilemmaClip.id;
                  return (
                    <button
                      key={clip.id}
                      onClick={() => setSelectedDilemmaClipId(clip.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {clip.label}
                    </button>
                  );
                })}
              </div>

              {/* Main Grid: Left = Embedded YouTube Clip Player | Right = Quotes & Persuasive Traps */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                
                {/* Left: Video Player + Clip explanation */}
                <div className="lg:col-span-7 space-y-2.5">
                  <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 aspect-video flex items-center justify-center">
                    <iframe
                      key={currentDilemmaClip.id}
                      src={currentDilemmaClip.embedUrl}
                      title={currentDilemmaClip.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="bg-slate-900/90 border border-red-500/30 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-200 leading-snug">
                      🎬 <strong className="text-red-300">{currentDilemmaClip.title}:</strong> {currentDilemmaClip.note}
                    </p>
                  </div>
                </div>

                {/* Right: Key Quotes & 3 Persuasive Traps */}
                <div className="lg:col-span-5 space-y-3">
                  
                  <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-4 space-y-1 shadow-lg">
                    <p className="text-sm sm:text-base font-bold text-white leading-snug italic">
                      “Si no estás pagando por el producto, el producto sos vos.”
                    </p>
                    <span className="text-[11px] text-indigo-300 font-semibold uppercase block">
                      — Tristan Harris · Andrew Lewis (The Social Dilemma)
                    </span>
                  </div>

                  <div className="bg-slate-900 border-2 border-red-500/40 rounded-2xl p-4 space-y-1 shadow-lg">
                    <p className="text-sm sm:text-base font-bold text-white leading-snug italic">
                      “Hay sólo dos industrias que llaman a sus clientes 'usuarios': las drogas ilegales y el software.”
                    </p>
                    <span className="text-[11px] text-red-300 font-semibold uppercase block">
                      — Edward Tufte (Científico de datos)
                    </span>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                    <h4 className="font-heading font-bold text-xs text-amber-400 uppercase tracking-wider">
                      🎰 1. Efecto máquina tragamonedas
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Deslizar para actualizar (<em>pull-to-refresh</em>) y el scroll infinito activan el mismo circuito de recompensa variable que un casino.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                    <h4 className="font-heading font-bold text-xs text-sky-400 uppercase tracking-wider">
                      🔔 2. Notificaciones y edad mínima (13+)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Aunque exigen 13 años por ley, usan globitos rojos y "rachas" para interrumpir el estudio, la cena y el sueño.
                    </p>
                  </div>

                </div>

              </div>

              {/* Trigger Question to the room */}
              <div className="bg-indigo-950/70 border border-indigo-700/60 rounded-2xl p-3.5 text-center max-w-3xl mx-auto">
                <p className="text-xs sm:text-sm text-indigo-200">
                  💡 <strong className="text-white">Pregunta disparadora a la sala:</strong> "¿Cuántas veces desbloqueaste el celular solo para ver la hora y te descubriste 40 minutos después scrolleando sin rumbo?"
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 4: El FOMO (Fear Of Missing Out) vs. JOMO (Joy Of Missing Out) */}
          {currentSlide === 4 && (
            <div className="max-w-5xl w-full mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  Salud mental, procesos de angustia y presión de grupo
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  El FOMO: El miedo constante a quedarse afuera
                </h2>
              </div>

              {/* FOMO vs JOMO Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                
                {/* FOMO Card */}
                <div className="bg-slate-900 border-2 border-red-500/50 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 font-extrabold text-xs uppercase tracking-wider">
                        La trampa
                      </span>
                      <h3 className="font-heading font-black text-xl text-white">
                        FOMO · Fear Of Missing Out
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      La angustia crónica de sentir que los demás están viviendo algo increíble sin nosotros, alimentada por los grupos de WhatsApp y las historias efímeras.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300 pt-1">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">⚠️</span>
                        <span><strong>El grupo nocturno:</strong> Miedo a apagar el celular a las 23:30 hs por perderse el chiste o el plan del recreo de mañana.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">⚠️</span>
                        <span><strong>Comparación y angustia:</strong> Medir el peor día propio con el momento más editado y filtrado de los demás (especialmente crítico en adolescentes y jóvenes).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">⚠️</span>
                        <span><strong>Cuerpos presentes, mentes ausentes:</strong> Estar en la mesa o con amigos pero con la cabeza atrapada en la pantalla.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* JOMO Card */}
                <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                        El antídoto
                      </span>
                      <h3 className="font-heading font-black text-xl text-white">
                        JOMO · Joy Of Missing Out
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      El placer liberador de desconectar: la tranquilidad de no enterarse de todo y disfrutar el momento real que está pasando frente a nosotros.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300 pt-1">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">🌱</span>
                        <span><strong>Presencia plena:</strong> Disfrutar una comida, un libro o un paseo sin la obligación de fotografiarlo para que otros lo vean.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">🌱</span>
                        <span><strong>Validación interna:</strong> Enseñar que el valor de una persona no se mide por la cantidad de "me gusta" ni por la velocidad del visto.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">🌱</span>
                        <span><strong>Descanso real:</strong> Dormir 8 a 9 horas seguidas con el celular fuera del dormitorio para regenerar la mente.</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Discussion callout */}
              <div className="bg-purple-950/70 border border-purple-700/60 rounded-2xl p-4 text-center max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm text-purple-200">
                  💬 <strong className="text-white">Para reflexionar en familia:</strong> "Lo que no se publica en redes sociales también existe, y muchas veces es lo más valioso de la vida."
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 5: Buenas prácticas y estrategias para el hogar */}
          {currentSlide === 5 && (
            <div className="max-w-6xl w-full mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5 text-emerald-400" />
                  Herramientas prácticas para aplicar desde hoy
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Buenas prácticas y estrategias para el hogar
                </h2>
              </div>

              {/* 6 Concrete Strategies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    1. Regular el tiempo de pantalla
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Límites diarios claros según la edad. Apagado obligatorio 1 hora antes de dormir: la luz azul suprime la melatonina y altera el sueño profundo.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center font-bold">
                    <BellOff className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    2. Silenciar y escala de grises
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Desactivar globitos rojos y notificaciones de redes. Poner la pantalla en blanco y negro (escala de grises) le quita al teléfono el poder de adicción visual.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-600/30 text-sky-400 flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    3. Controles parentales activos
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Configurar Google Family Link o Apple En familia antes de entregar el celular. Son barandas de protección pactadas con ellos, no espionaje clandestino.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-400 flex items-center justify-center font-bold">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    4. Cero celular en la mesa
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Zonas sagradas libres de pantallas: la mesa del almuerzo y la cena son para mirarse a los ojos y conversar de cómo nos fue en el día.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-600/30 text-teal-400 flex items-center justify-center font-bold">
                    <Moon className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    5. El celular duerme en el living
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Establecer una "estación de recarga" en un espacio común fuera del dormitorio. Nunca el celular al lado de la almohada ni como despertador.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/30 text-rose-400 flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    6. Coherencia y ejemplo adulto
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Los chiquilines aprenden por imitación. Si los adultos no soltamos el teléfono en casa, ningún discurso pedagógico tendrá credibilidad.
                  </p>
                </div>

              </div>

              {/* Active disconnection banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center max-w-3xl mx-auto space-y-1">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  🏃 Actividades de desconexión activa y pausas visuales (mirar a 6 metros)
                </span>
                <p className="text-xs sm:text-sm text-slate-300">
                  Fomentar al menos 2 horas al aire libre, pausas cada 20 minutos mirando a 6 metros de distancia, deporte, música y lectura en papel.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 6: Cine-foro y dilema interactivo con la sala (Votación a mano alzada) */}
          {currentSlide === 6 && (
            <div className="max-w-5xl w-full mx-auto space-y-5 animate-in fade-in duration-300">
              
              {/* Submode Switcher: Votación vs. Cine-Foro */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                    Dinámica interactiva · Auditorio en acción
                  </span>
                  <h2 className="font-heading text-2xl sm:text-4xl font-black text-white">
                    {slide6Submode === 'votacion' ? 'Dilemas reales y votación a mano alzada' : 'Cine-Foro: Cortometrajes y AGESIC'}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
                  <button
                    onClick={() => setSlide6Submode('votacion')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      slide6Submode === 'votacion'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Votar Casos ({caseStudies.length})</span>
                  </button>
                  <button
                    onClick={() => setSlide6Submode('cineforo')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      slide6Submode === 'cineforo'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Cine-Foro ({videosList.length} videos)</span>
                  </button>
                </div>
              </div>

              {slide6Submode === 'votacion' ? (
                <div className="space-y-4">
                  {/* Case switcher */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {caseStudies.map((cs, idx) => (
                      <button
                        key={cs.id}
                        onClick={() => {
                          setSelectedCaseId(cs.id);
                          setVotedOptionId(null);
                          setHandVotes({ a: 0, b: 0, c: 0 });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          selectedCaseId === cs.id
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Caso {idx + 1}: {cs.category.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Situation Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-purple-900/60 text-purple-300 border border-purple-700">
                        {activeCase.category}
                      </span>
                      <button
                        onClick={() => setHandVotes({ a: 0, b: 0, c: 0 })}
                        className="text-[11px] text-slate-400 hover:text-white underline"
                      >
                        Reiniciar conteo de manos
                      </button>
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      {activeCase.title}
                    </h3>
                    <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                      {activeCase.situation}
                    </p>
                  </div>

                  {/* 3 Voting Choices with Live Hand-Raise Counter */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeCase.options.map((opt) => {
                      const isSelected = votedOptionId === opt.id;
                      const count = handVotes[opt.id] || 0;
                      return (
                        <div
                          key={opt.id}
                          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-3 ${
                            isSelected
                              ? opt.type === 'success' 
                                ? 'border-emerald-500 bg-emerald-950/60 shadow-lg' 
                                : opt.type === 'warning'
                                ? 'border-amber-500 bg-amber-950/60 shadow-lg'
                                : 'border-red-500 bg-red-950/60 shadow-lg'
                              : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          <div 
                            onClick={() => setVotedOptionId(opt.id)}
                            className="space-y-2 cursor-pointer flex-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {opt.id.toUpperCase()}
                              </span>
                              {isSelected ? (
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                                  Respuesta revelada
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  Clic para revelar
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                              {opt.label}
                            </p>
                          </div>

                          {/* Hand Tally Controls */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-400">
                              ✋ Manos en sala: <strong className="text-amber-300 text-sm ml-1">{count}</strong>
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setHandVotes(prev => ({ ...prev, [opt.id]: Math.max(0, (prev[opt.id] || 0) - 1) }))}
                                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                                title="Restar 1 voto"
                              >
                                -
                              </button>
                              <button
                                onClick={() => setHandVotes(prev => ({ ...prev, [opt.id]: (prev[opt.id] || 0) + 1 }))}
                                className="px-2 h-6 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold"
                                title="Sumar 1 mano alzada"
                              >
                                +1
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Revealed Outcome */}
                  {votedOption && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        {votedOption.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {votedOption.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                        {votedOption.type === 'danger' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                        <h4 className="font-heading font-bold text-base text-white">
                          {votedOption.evaluation}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {votedOption.feedback}
                      </p>
                      {activeCase.conversationStarter && (
                        <p className="text-xs text-teal-300 italic bg-teal-950/50 border border-teal-800/60 p-2.5 rounded-xl">
                          💬 <strong>Frase sugerida en casa:</strong> {activeCase.conversationStarter}
                        </p>
                      )}
                      <p className="text-xs text-sky-300 font-semibold pt-1">
                        ⚖️ Enfoque en Uruguay: {activeCase.uruguayContext}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* CINE-FORO MODE */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* Left: Video Selector List */}
                  <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-3.5 max-h-[380px] overflow-y-auto space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block mb-1">
                      Seleccioná el video a proyectar ({videosList.length}):
                    </span>
                    {videosList.map((vid) => {
                      const isSelected = vid.id === selectedVideoId;
                      return (
                        <button
                          key={vid.id}
                          onClick={() => setSelectedVideoId(vid.id)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <Play className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-extrabold opacity-75 block">
                              {vid.isAgesic ? `🇺🇾 AGESIC · ${vid.category}` : vid.category}
                            </span>
                            <p className="text-xs leading-snug truncate font-semibold">
                              {vid.title}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Active Video Player & Discussion Prompt */}
                  <div className="lg:col-span-8 space-y-3">
                    <div className="bg-black rounded-3xl overflow-hidden border border-slate-800 aspect-video shadow-2xl flex items-center justify-center">
                      {currentVideo.isYouTube ? (
                        <iframe
                          key={currentVideo.id}
                          src={currentVideo.embedUrl}
                          title={currentVideo.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          key={currentVideo.videoSrc}
                          src={currentVideo.videoSrc}
                          controls
                          className="w-full h-full object-contain bg-black"
                        />
                      )}
                    </div>

                    <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                          {currentVideo.title}
                        </h4>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300">
                          {currentVideo.target}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                        💡 <strong>Consigna para el debate en sala:</strong> {currentVideo.discussionPrompt}
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* SLIDE 7: Cierre, pacto familiar y canales de ayuda en Uruguay */}
          {currentSlide === 7 && (
            <div className="max-w-5xl w-full mx-auto space-y-6 text-center animate-in fade-in duration-300">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                  Cierre del encuentro y compromiso familiar
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-black text-white">
                  El pacto que sella la mutua confianza
                </h2>
                <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
                  La confianza no se compra con un celular; se construye día a día con diálogo, presencia y límites amorosos.
                </p>
              </div>

              {/* Emergency & Support Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-4 flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                    <PhoneCall className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block">
                      Línea gratuita nacional
                    </span>
                    <h4 className="font-bold text-base text-white">Línea Azul (INAU)</h4>
                    <p className="text-xs text-slate-300">0800 5050 · *5050 gratis desde celulares</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-4 flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center text-white shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 block">
                      Delitos informáticos
                    </span>
                    <h4 className="font-bold text-base text-white">Policía Nacional</h4>
                    <p className="text-xs text-slate-300">Tel: 2030 4625 · denuncias.minterior.gub.uy</p>
                  </div>
                </div>
              </div>

              {/* QR Code to Take Platform Home */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md mx-auto space-y-3 shadow-2xl">
                <div className="bg-white p-3 rounded-2xl w-fit mx-auto shadow-md">
                  <QRCodeSVG value={currentUrl} size={128} />
                </div>
                <h4 className="font-heading font-bold text-base text-white">
                  Llevate la plataforma a tu casa
                </h4>
                <p className="text-xs text-slate-400">
                  Escaneá el código para imprimir el pacto familiar o repasar los controles de Android e iPhone en familia.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Presenter Notes Drawer (Floating on right) */}
      {showNotes && (
        <aside className="absolute top-16 right-0 bottom-16 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-md border-l border-slate-800 p-5 overflow-y-auto space-y-4 shadow-2xl z-40 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Apuntes para el orador</span>
            </div>
            <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 bg-slate-800 rounded-xl space-y-1">
              <strong className="text-white block font-heading">Tiempo sugerido: {slides[currentSlide].timeGuide}</strong>
              <p className="text-slate-400">Usa las flechas del teclado (← / →) para avanzar o retroceder.</p>
            </div>

            {currentSlide === 0 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Iniciar el taller con un autodiagnóstico abierto, sin juzgar, adaptado a la edad de los hijos de los presentes.</p>
                <p>• Preguntá a las familias qué edades tienen sus hijos y cambiá el selector de edad en vivo para mostrar las advertencias de cada etapa.</p>
                <p>• Si hay niños pequeños (&lt; 9 años), remarcá la advertencia de que los smartphones y redes están pensados para mayores de 13 años.</p>
                <p>• Si son mayores de edad (18+), destacá que ya no van controles técnicos, sino estar atentos a procesos de angustia, sueño y escucha.</p>
                <p>• Leé las 6 preguntas y marcá con la sala <em>Sí / No / A veces / No aplica</em> para dejar trazada la hoja de ruta del taller.</p>
              </div>
            )}

            {currentSlide === 1 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Abrir la charla conceptual desarmando la dicotomía "prohibición absoluta vs. vía libre".</p>
                <p>• Enfatizá la metáfora de la plaza pública: a nadie se le ocurre soltar a un hijo de 10 años en una plaza de noche sin acompañamiento.</p>
                <p>• Invitá a que todos apunten su celular a la pantalla para abrir la plataforma en sus teléfonos.</p>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Explicar el impacto neurobiológico de forma accesible y rigurosa con Marián Rojas Estapé.</p>
                <p>• Dale play al video embebido durante 1 o 2 minutos para capturar la atención total del auditorio.</p>
                <p>• Hacé foco en la <strong>corteza prefrontal</strong>: no está madura hasta los 25 años. Si la acostumbramos a la dopamina fácil, pierde tolerancia al esfuerzo.</p>
                <p>• Rescatá el <strong>aburrimiento</strong>: "Papá, estoy aburrido" no se responde pasando una pantalla; se responde dejando que imagine un juego.</p>
              </div>
            )}

            {currentSlide === 3 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Revelar los mecanismos del diseño persuasivo (*The Social Dilemma*).</p>
                <p>• Explicá el truco del <em>pull-to-refresh</em>: es idéntico a bajar la palanca de una máquina tragamonedas.</p>
                <p>• Preguntá: "¿Alguna vez sintieron la vibración fantasma en el bolsillo?".</p>
                <p>• Conclusión clave: no es que los chiquilines no tengan fuerza de voluntad; es que compiten contra miles de ingenieros diseñando estímulos para retenerlos.</p>
              </div>
            )}

            {currentSlide === 4 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Desactivar el sufrimiento del FOMO y promover el JOMO.</p>
                <p>• Hablá del grupo de WhatsApp del liceo a las 23:30 hs: los chiquilines no duermen por terror a quedar excluidos.</p>
                <p>• Mostrá cómo las redes muestran "el backstage de mi vida contra la película editada del otro" y cómo esto dispara procesos de angustia.</p>
                <p>• Promover el JOMO: la alegría de no estar en todos lados y la libertad de disfrutar la vida real.</p>
              </div>
            )}

            {currentSlide === 5 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Brindar soluciones accionables e inmediatas para que las familias salgan con un plan.</p>
                <p>• La regla de oro: celular en la mesa = falta de respeto mutua. Los adultos deben ser los primeros en cumplirla.</p>
                <p>• Proponer el "desafío de escala de grises" y las pausas visuales cada 20 minutos mirando a 6 metros de distancia.</p>
                <p>• La estación de carga en el living: el celular nunca duerme en la mesa de luz.</p>
              </div>
            )}

            {currentSlide === 6 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Dinamizar con votación a mano alzada o proyectar un corto de AGESIC / Cine-Foro.</p>
                <p>• <strong>Modo Votar Casos:</strong> Leé la situación en voz alta, usá el botón <code>+1</code> para contar cuántas manos se levantan en A, B y C, y luego hacé clic en la tarjeta para revelar la evaluación.</p>
                <p>• <strong>Modo Cine-Foro:</strong> Cambiá a la pestaña amarilla "Cine-Foro" arriba a la derecha para proyectar los videos oficiales de AGESIC o los cortometrajes locales sin salir del proyector.</p>
              </div>
            )}

            {currentSlide === 7 && (
              <div className="space-y-2">
                <p><strong>Meta pedagógica:</strong> Cierre emotivo y compromiso de mutua confianza.</p>
                <p>• Cerrá invitando a que todos se lleven el código QR escaneado en sus celulares.</p>
                <p>• Recordá los canales uruguayos: Línea Azul INAU (0800 5050) y Delitos Informáticos de la Policía Nacional.</p>
                <p>• Destacá el pacto familiar: firmar un acuerdo en casa sella la responsabilidad de ambas partes.</p>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Bottom Slide Controller Bar */}
      <footer className="h-14 sm:h-16 bg-slate-900 border-t border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0">
        
        {/* Previous Slide Button */}
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Center Progress Bar */}
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[11px] font-bold text-slate-400">
            {currentSlide + 1} / {slides.length} · {slides[currentSlide].title}
          </span>
          <div className="w-32 sm:w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Next Slide Button */}
        <button
          onClick={handleNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white transition-colors shadow-xs"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </footer>

    </div>
  );
}
