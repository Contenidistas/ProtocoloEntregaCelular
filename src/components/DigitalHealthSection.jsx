import React, { useState } from 'react';
import InteractiveCasesSection from './InteractiveCasesSection';
import GoodPracticesGuide from './GoodPracticesGuide';
import ScientificEvidencePanel from './ScientificEvidencePanel';
import { 
  Moon, 
  Eye, 
  Brain, 
  UtensilsCrossed, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Zap,
  AlertTriangle,
  Users,
  ShieldCheck,
  MessageCircle,
  HeartPulse
} from 'lucide-react';

export default function DigitalHealthSection() {
  const [activeMainTab, setActiveMainTab] = useState('pautas'); // 'pautas' | 'edades' | 'casos' | 'evidencia'
  const [activeHealthTab, setActiveHealthTab] = useState('sueno'); // 'sueno' | 'dopamina' | 'postura' | 'oasis'
  const [activeAgeGroup, setActiveAgeGroup] = useState('10-12');
  const [checkedSigns, setCheckedSigns] = useState({});

  const healthGuides = [
    {
      id: 'sueno',
      title: 'Higiene del sueño y vamping',
      icon: Moon,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      badge: 'Descanso cerebral',
      highlight: 'Retirar pantallas al menos 60 a 90 minutos antes de dormir y cargar el equipo fuera del dormitorio.',
      quickAction: 'Armá hoy mismo una "Estación de Carga Familiar" con una zapatilla eléctrica en el living o la cocina para que todos los celulares duerman allí desde las 21:30 hs.',
      familyQuestion: '«¿Notaste qué distinto nos levantamos a la mañana cuando dejamos el celular afuera del cuarto antes de dormir?»',
      content: [
        {
          heading: "¿Qué es la luz azul y cómo altera el descanso?",
          text: "Las pantallas LED emiten radiación en el espectro azul que inhibe la producción natural de melatonina (la hormona que induce el sueño profundo). Esto retrasa el adormecimiento y fragmenta las fases de sueño REM indispensables para fijar el aprendizaje escolar."
        },
        {
          heading: "El peligro del 'Vamping' (chatear a escondidas en la cama)",
          text: "Muchos niños y adolescentes se quedan hasta las 2:00 o 3:00 de la madrugada revisando TikTok o respondiendo grupos de WhatsApp. La falta de sueño crónico genera irritabilidad, descenso del rendimiento en la escuela/liceo y mayor riesgo de ansiedad."
        },
        {
          heading: "Solución práctica familiar",
          text: "Establecer una 'estación de carga familiar' en la cocina o el living. A las 21:30 o 22:00 hs todos los celulares (incluidos los de los padres) van a dormir a esa estación y se vuelve al reloj despertador tradicional."
        }
      ]
    },
    {
      id: 'dopamina',
      title: 'Dopamina, algoritmos y FOMO',
      icon: Brain,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      badge: 'Salud emocional',
      highlight: 'Entender el diseño adictivo de las redes y proteger el desarrollo de la corteza prefrontal.',
      quickAction: 'Activá la "Escala de Grises" (blanco y negro) en Accesibilidad o Modo Descanso y silenciá todas las notificaciones que no sean de personas reales.',
      familyQuestion: '«¿Alguna vez desbloqueaste el teléfono solo para ver la hora y terminaste 30 minutos mirando videos sin saber cómo llegaste ahí?»',
      content: [
        {
          heading: "El principio 'úsalo o piérdelo' (Marián Rojas Estapé)",
          text: "Como advierte la Dra. Marián Rojas Estapé, si delegamos la memoria, el esfuerzo y el ocio en una pantalla, la corteza prefrontal no madura adecuadamente. El aburrimiento es el motor de la creatividad: taparlo con un celular anestesia la imaginación infantil."
        },
        {
          heading: "Scroll infinito y 'The Social Dilemma'",
          text: "Las redes funcionan como máquinas tragamonedas (recompensa variable intermitente). Si no pagás por el producto, el producto sos vos: compiten deliberadamente contra el sueño, el almuerzo familiar y el estudio de nuestros hijos."
        },
        {
          heading: "Del FOMO al JOMO (El placer de desconectar)",
          text: "El FOMO (miedo a quedarse afuera) genera ansiedad nocturna en grupos de WhatsApp. Enseñemos a cultivar el JOMO (Joy Of Missing Out): la libertad y el alivio de disfrutar la vida real cara a cara sin necesidad de buscar likes ajenos."
        }
      ]
    },
    {
      id: 'postura',
      title: 'Salud visual y cuello de texto',
      icon: Eye,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      badge: 'Cuidado físico',
      highlight: 'Pausas visuales cada 20 minutos mirando a 6 metros de distancia para prevenir miopía y fatiga.',
      quickAction: 'Asegurate de que tu hijo/a tenga al menos 90 a 120 minutos diarios de luz natural al aire libre (patio, plaza, club o bicicleta).',
      familyQuestion: '«Hagamos la prueba: ¿cómo sentimos los hombros y la nuca cuando subimos el celular a la altura de los ojos en vez de doblar el cuello?»',
      content: [
        {
          heading: "Pausa visual cada 20 minutos (mirar a 6 metros)",
          text: "Cada 20 minutos de pantalla continua, levantar la vista y enfocar un punto lejano ubicado al menos a 6 metros de distancia (por ejemplo, mirando por una ventana hacia afuera o al otro extremo del salón) durante 20 segundos. Esto relaja el músculo ciliar del ojo y previene la fatiga visual."
        },
        {
          heading: "El síndrome de 'cuello de texto' (Text Neck)",
          text: "Inclinar la cabeza hacia abajo en un ángulo de 60 grados para mirar el celular multiplica la carga sobre la columna cervical por seis (equivalente a llevar 27 kg sobre el cuello de un niño). Provoca dolores de espalda, cefaleas tensionales y contracturas."
        },
        {
          heading: "Hábitos recomendados",
          text: "Subir el celular a la altura de los ojos en lugar de doblar el cuello hacia abajo. Fomentar al menos 2 horas diarias de luz solar y juego exterior, factor clave comprobado para prevenir el avance de la miopía en niños."
        }
      ]
    },
    {
      id: 'oasis',
      title: 'Oasis libres de pantallas',
      icon: UtensilsCrossed,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      badge: 'Convivencia hogareña',
      highlight: 'Proteger la presencia física en los momentos sagrados de encuentro familiar.',
      quickAction: 'Colocá una panera o caja bonita cerca del comedor donde toda la familia deposite los celulares en silencio antes de sentarse a cenar.',
      familyQuestion: '«¿Qué fue lo más divertido, lo más difícil y lo más curioso que nos pasó hoy en la escuela, el liceo o el trabajo?»',
      content: [
        {
          heading: "La mesa de las comidas: zona sagrada",
          text: "Como destaca el Prof. Esp. Santiago Hernández en la guía de Uruguay Educa: jamás llevar dispositivos a la mesa durante el almuerzo o la cena. Es el espacio por excelencia para mirar a los ojos, contar el día y ejercitar la empatía."
        },
        {
          heading: "El 'Modo No Molestar' compartido",
          text: "Activar el modo 'No Molestar' en salidas familiares, paseos al parque o cuando estamos compartiendo un juego de mesa o una película juntos. Si el adulto responde correos del trabajo en el cine o en el parque, el niño internaliza que la presencia digital vale más que el vínculo humano."
        },
        {
          heading: "La tecnología como puente, no como muro",
          text: "Usar la tecnología también para compartir: mirar un documental juntos, buscar una receta en internet para cocinar en familia o investigar sobre un tema de clase en CREA o Uruguay Educa."
        }
      ]
    }
  ];

  const ageStages = [
    {
      id: '0-5',
      range: '0 a 5 años',
      label: 'Primera infancia',
      semaforo: 'Evitar pantallas propias',
      color: 'border-rose-200 bg-rose-50 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-800',
      recommendation: 'De 0 a 2 años: cero pantallas (salvo videollamadas puntuales con familiares). De 2 a 5 años: máximo 30-45 min diarios de contenido educativo lento y siempre acompañados por un adulto.',
      avoid: 'Nunca usar el celular como "chupete emocional" para calmar rabietas ni para que coman distraídos.',
      focus: 'Juego libre sensoriomotor, cuentos en papel, contacto visual y conversación cara a cara.'
    },
    {
      id: '6-9',
      range: '6 a 9 años',
      label: 'Edad escolar inicial',
      semaforo: 'Uso compartido y supervisado',
      color: 'border-amber-200 bg-amber-50 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-800',
      recommendation: 'Sin smartphone propio ni redes sociales. Si usan tablet o computadora (como el equipo Ceibal o familiar), hacerlo siempre en espacios comunes de la casa (living/comedor) y con tiempo acotado (máx. 1 hora diaria).',
      avoid: 'Juegos multijugador con chat abierto a desconocidos y acceso libre a YouTube estándar o TikTok.',
      focus: 'Aprender a pedir permiso antes de descargar, respetar turnos y priorizar el juego físico y amigos.'
    },
    {
      id: '10-12',
      range: '10 a 12 años',
      label: 'Transición · Primer celular',
      semaforo: 'Autonomía acompañada (SERC)',
      color: 'border-indigo-200 bg-indigo-50 text-indigo-900',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      recommendation: 'Etapa habitual de entrega del primer equipo por traslados a 5º-6º de escuela o inicio del liceo/UTU. Entrega bajo Acuerdo Familiar firmado y con Google Family Link / Apple En Familia activo.',
      avoid: 'Celular en el dormitorio de noche, redes sociales para mayores de 13 años abiertas al público y compras con tarjeta.',
      focus: 'Supervisión del primer grupo de WhatsApp de la clase, empatía digital y regla de "cero secretos incómodos".'
    },
    {
      id: '13+',
      range: '13 a 16+ años',
      label: 'Adolescencia y ciudadanía',
      semaforo: 'Diálogo crítico y confianza',
      color: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      recommendation: 'Relajación gradual del control técnico a medida que demuestran madurez, pasando a una supervisión basada en el pensamiento crítico, la privacidad de sus perfiles y la huella digital.',
      avoid: 'El espionaje invasivo sin diálogo previo, o el extremo opuesto de desentenderse creyendo que "ya son grandes".',
      focus: 'Prevención de sexting no consentido (Ley 19.580), manejo del FOMO, apuestas online y cuidado del sueño.'
    }
  ];

  const warningSigns = [
    {
      id: 'enojo',
      text: 'Reacciona con ira desproporcionada, llanto o agresividad cada vez que se le pide apagar la pantalla.'
    },
    {
      id: 'sueno',
      text: 'Cuesta mucho despertarlo/a para ir a la escuela o liceo, tiene ojeras o se queda conectado/a de madrugada.'
    },
    {
      id: 'ocultamiento',
      text: 'Cambia rápidamente de pantalla, cierra aplicaciones con nerviosismo o se aísla cuando un adulto entra al cuarto.'
    },
    {
      id: 'desinteres',
      text: 'Abandonó deportes, clubes, lectura o encuentros presenciales con amigos que antes disfrutaba mucho.'
    },
    {
      id: 'ansiedad',
      text: 'Muestra ansiedad constante por revisar notificaciones, "rachas" de juegos o mensajes del grupo de WhatsApp.'
    },
    {
      id: 'rendimiento',
      text: 'Bajó su atención en clase, olvida tareas escolares o usa el celular mientras intenta estudiar.'
    }
  ];

  const toggleSign = (id) => {
    setCheckedSigns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checkedCount = Object.values(checkedSigns).filter(Boolean).length;

  const currentGuide = healthGuides.find(g => g.id === activeHealthTab) || healthGuides[0];
  const currentAge = ageStages.find(a => a.id === activeAgeGroup) || ageStages[2];

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-slate-200" id="seccion-formacion">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bienestar y crianza digital</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Salud digital y neurodesarrollo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Pautas claras de descanso, tiempos por etapa madurativa, señales de saturación y casos prácticos para dialogar en familia.
          </p>
        </div>

        {/* Clean Segmented Sub-Navbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveMainTab('pautas')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMainTab === 'pautas'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-600" />
            <span>Pautas de descanso</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('edades')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMainTab === 'edades'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Etapas por edad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('casos')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMainTab === 'casos'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-4 h-4 text-amber-600" />
            <span>Casos y alertas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('evidencia')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMainTab === 'evidencia'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Evidencia y hábitos</span>
          </button>
        </div>

        {/* TAB 1: PAUTAS DE BIENESTAR */}
        {activeMainTab === 'pautas' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {healthGuides.map((guide) => {
                const Icon = guide.icon;
                const isSelected = activeHealthTab === guide.id;
                return (
                  <button
                    key={guide.id}
                    onClick={() => setActiveHealthTab(guide.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200/90 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${guide.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {guide.badge}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                        {guide.title}
                      </h4>
                    </div>
                    <span className={`text-[11px] font-medium mt-3 block ${isSelected ? 'text-indigo-600 font-semibold' : 'text-slate-400'}`}>
                      {isSelected ? 'Leyendo tema →' : 'Ver pautas'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Health Guide Detailed Card */}
            <div key={activeHealthTab} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-semibold text-indigo-600">
                    Pauta de bienestar
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                    {currentGuide.title}
                  </h3>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs self-start sm:self-auto">
                  💡 {currentGuide.highlight}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentGuide.content.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
                    <h5 className="font-heading font-bold text-sm text-slate-900 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item.heading}</span>
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actionable 5-minute tip & Dinner question */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-white border border-indigo-200/80 p-4 rounded-xl flex items-start gap-3 shadow-xs">
                  <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-indigo-700 block">
                      Acción concreta para hoy (5 min)
                    </span>
                    <p className="text-xs font-normal text-slate-700 leading-relaxed">
                      {currentGuide.quickAction}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-start gap-3 shadow-xs">
                  <MessageCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      Pregunta disparadora para charlar en familia
                    </span>
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      {currentGuide.familyQuestion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ETAPAS POR EDAD */}
        {activeMainTab === 'edades' && (
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Autonomía Progresiva (Criterios SUP · Ceibal · UNICEF)
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  Hoja de ruta por edades: ¿Qué acompañar en cada etapa?
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {ageStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveAgeGroup(stage.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeAgeGroup === stage.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {stage.range}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-400">{currentAge.range}</span>
                  <h4 className="font-heading text-base sm:text-lg font-bold text-slate-900">
                    {currentAge.label}
                  </h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${currentAge.badgeColor}`}>
                  {currentAge.semaforo}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Pauta recomendada
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentAge.recommendation}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-1">
                  <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Qué evitar en esta etapa
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentAge.avoid}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-1">
                  <span className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Foco familiar
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentAge.focus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CASOS Y AUTOCHEQUEO */}
        {activeMainTab === 'casos' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Termómetro de bienestar en casa */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <HeartPulse className="w-4 h-4" />
                    Termómetro familiar
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                    Autochequeo rápido: ¿Hay señales de saturación digital?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Marcá las situaciones que hayas observado en las últimas semanas para recibir orientación:
                  </p>
                </div>
                {checkedCount > 0 && (
                  <button
                    onClick={() => setCheckedSigns({})}
                    className="text-xs font-medium text-slate-300 hover:text-white underline self-start sm:self-auto shrink-0"
                  >
                    Limpiar ({checkedCount})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {warningSigns.map((sign) => {
                  const isChecked = !!checkedSigns[sign.id];
                  return (
                    <button
                      key={sign.id}
                      onClick={() => toggleSign(sign.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-500'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs leading-relaxed font-normal">
                        {sign.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Diagnosis box */}
              <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                checkedCount === 0
                  ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-200'
                  : checkedCount <= 2
                  ? 'bg-amber-950/40 border-amber-600/50 text-amber-100'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
              }`}>
                {checkedCount === 0 && (
                  <p>
                    ✅ <strong>Equilibrio saludable (0 señales):</strong> Los hábitos actuales van por buen camino. Celulares fuera del cuarto de noche y mesa sin pantallas consolidan esta rutina.
                  </p>
                )}
                {checkedCount >= 1 && checkedCount <= 2 && (
                  <p>
                    ⚠️ <strong>Atención preventiva ({checkedCount} {checkedCount === 1 ? 'señal' : 'señales'}):</strong> Buen momento para reajustar límites sin dramatizar: horario de apagado nocturno en Family Link / Tiempo de Uso y sumar actividades al aire libre.
                  </p>
                )}
                {checkedCount >= 3 && (
                  <p>
                    🚨 <strong>Sobrecarga digital ({checkedCount} señales):</strong> El dispositivo está afectando el descanso o la convivencia. Aplicá una desintoxicación progresiva retirando el celular del dormitorio hoy mismo y dialogá en calma sin gritos ni castigos sorpresivos.
                  </p>
                )}
              </div>
            </div>

            {/* Simulator of Real Cases */}
            <div className="pt-2">
              <InteractiveCasesSection />
            </div>
          </div>
        )}

        {/* TAB 4: EVIDENCIA Y HÁBITOS */}
        {activeMainTab === 'evidencia' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <GoodPracticesGuide />
            <ScientificEvidencePanel darkMode={false} defaultExpanded={false} />
          </div>
        )}

      </div>
    </section>
  );
}
