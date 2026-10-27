import React, { useState } from 'react';
import { Eye, BookOpen, Clock, MessageSquare, CheckCircle2, AlertTriangle, ShieldCheck, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function SercModelSection() {
  const [activePillar, setActivePillar] = useState('S');
  const [showOriginalBanner, setShowOriginalBanner] = useState(false);

  const pillars = [
    {
      id: 'S',
      letter: 'S',
      title: 'Supervisión',
      subtitle: 'Asumir el rol de adultos responsables del menor, controlar sitios de acceso.',
      color: 'bg-red-500',
      lightColor: 'bg-red-50 text-red-700 border-red-200',
      activeTabColor: 'border-red-500 text-red-600 bg-red-50/50',
      textColor: 'text-red-600',
      icon: Eye,
      practicalTips: [
        "Establecer controles parentales de arranque que se van aflojando progresivamente hacia la adolescencia.",
        "Revisar juntos cada tanto las aplicaciones que descargan y los juegos donde chatean.",
        "Supervisar de frente y a la luz del día, sin caer en el espionaje a escondidas: la regla se conversa.",
        "Configurar que cualquier descarga o compra requiera la huella o clave de mamá, papá o tutor."
      ],
      uruguayContext: "En el marco del Código de la Niñez y la Adolescencia (Uruguay), los adultos tenemos el deber de cuidar y orientar a los hijos. Supervisar su celular no es desconfiar: es poner barandas para que no se caigan."
    },
    {
      id: 'E',
      letter: 'E',
      title: 'Educación',
      subtitle: 'Promover acciones formativas partiendo siempre del ejemplo.',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50 text-purple-700 border-purple-200',
      activeTabColor: 'border-purple-600 text-purple-600 bg-purple-50/50',
      textColor: 'text-purple-600',
      icon: BookOpen,
      practicalTips: [
        "Enseñar con el ejemplo: los hijos aprenden más de lo que nos ven hacer que de los sermones.",
        "Cero celulares en la mesa durante el almuerzo y la cena familiar: charla cara a cara.",
        "Explicarles qué es la huella digital: lo que se sube a internet o a un estado de WhatsApp ya no se borra tan fácil.",
        "Aprender juntos sobre los juegos de moda (Roblox, Brawl Stars, TikTok) en vez de prohibir a ciegas."
      ],
      uruguayContext: "Uruguay Educa (DGES) y Plan Ceibal impulsan la Ciudadanía Digital como la capacidad de usar la tecnología para crear, investigar y comunicarse con respeto a uno mismo y a los demás."
    },
    {
      id: 'R',
      letter: 'R',
      title: 'Regulación',
      subtitle: 'Graduar el tiempo de exposición a las pantallas.',
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50 text-amber-700 border-amber-200',
      activeTabColor: 'border-amber-500 text-amber-600 bg-amber-50/50',
      textColor: 'text-amber-600',
      icon: Clock,
      practicalTips: [
        "Acordar horarios claros de corte para días de clase y fines de semana.",
        "Activar el horario de descanso automático (bedtime) para que el teléfono se bloquee solo a la hora de dormir.",
        "Regla de oro de la casa: los celulares duermen cargándose en el living o la cocina, nunca en la mesa de luz del dormitorio.",
        "Cuidar momentos libres de pantallas para disfrutar de una salida, el club o una charla en familia."
      ],
      uruguayContext: "La Sociedad Uruguaya de Pediatría (SUP) insiste en apagar pantallas al menos 1 hora antes de acostarse para no alterar la melatonina y el sueño profundo que los hijos precisan para rendir al otro día."
    },
    {
      id: 'C',
      letter: 'C',
      title: 'Comunicación',
      subtitle: 'Dialogar periódicamente sobre temas relacionados a la ciudadanía digital.',
      color: 'bg-teal-500',
      lightColor: 'bg-teal-50 text-teal-700 border-teal-200',
      activeTabColor: 'border-teal-500 text-teal-600 bg-teal-50/50',
      textColor: 'text-teal-600',
      icon: MessageSquare,
      practicalTips: [
        "Crear un canal de confianza donde equivocarse no sea motivo de castigo o de quitarles el teléfono.",
        "Preguntar con ganas de escuchar: '¿A qué anduviste jugando? ¿Viste algo raro o que te haya hecho ruido en redes?'.",
        "Recordar que las redes sociales exigen un mínimo de 14 años y charlar en casa el porqué de esa regla.",
        "Decirles seguido: 'Si alguien te pide fotos, te incomoda o te asusta, vení a contarnos que te vamos a apoyar sin juzgarte'."
      ],
      uruguayContext: "La confianza en la familia es la barrera más efectiva contra el grooming y el ciberbullying. Si el hijo teme que le saquen el celular, oculta el problema hasta que escala."
    }
  ];

  const currentPillarData = pillars.find(p => p.id === activePillar);

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-slate-200" id="modelo-serc">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pautas de convivencia digital</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            El modelo <span className="text-indigo-600">S.E.R.C.</span> en casa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Cuatro pilares sencillos para acompañar a los hijos sin caer en la prohibición total ni en el descontrol:
          </p>
        </div>

        {/* Clean 4 Pillar Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            return (
              <button
                type="button"
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`text-left rounded-2xl p-4 transition-all border cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-slate-50/70 text-slate-700 border-slate-200/90 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isSelected ? 'bg-white text-slate-900' : `${pillar.color} text-white`
                  }`}>
                    {pillar.letter}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      Activo
                    </span>
                  )}
                </div>
                <h4 className={`font-heading font-bold text-sm leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {pillar.title}
                </h4>
                <p className={`text-[11px] leading-snug mt-1 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {pillar.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content Box */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg ${currentPillarData.color} text-white text-xs font-bold flex items-center justify-center`}>
                  {currentPillarData.letter}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                  {currentPillarData.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">{currentPillarData.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowOriginalBanner(!showOriginalBanner)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>{showOriginalBanner ? 'Ocultar afiche original' : 'Ver afiche original'}</span>
            </button>
          </div>

          {/* Original Banner toggle */}
          {showOriginalBanner && (
            <div className="p-3 bg-white rounded-xl border border-slate-200 animate-in fade-in duration-200">
              <img 
                src={`${import.meta.env.BASE_URL}RESPOSABILIDAD.png`} 
                alt="Infografía SERC original de Santiago Hernández y Ruben Puentedura" 
                className="w-full max-h-80 object-contain rounded-lg mx-auto"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Practical tips */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pautas cotidianas para casa</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentPillarData.practicalTips.map((tip, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local context card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
              <div>
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Enfoque en Uruguay</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentPillarData.uruguayContext}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Uruguay Educa</span>
                <span>DGES / Ceibal</span>
              </div>
            </div>
          </div>

          {/* Golden Rule */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-amber-950">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-amber-900">
                <strong>Regla de oro:</strong> "Tu ejemplo es su mejor lección. Si los adultos no soltamos el celular durante la cena o cuando nos hablan, ningún control técnico va a funcionar."
              </p>
            </div>
            <a
              href="https://exportcvuy.anii.org.uy/cv/?8242b38f35c3b4fc9b8d3442700f810e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-wider text-amber-900 hover:text-indigo-700 bg-white px-2.5 py-1 rounded-md border border-amber-200 shrink-0 transition-colors"
              title="Ver CVuy (ANII) del Prof. Esp. Santiago Hernández"
            >
              Prof. Esp. Santiago Hernández · CVuy ↗
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
