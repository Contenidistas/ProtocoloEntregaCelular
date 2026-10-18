import React, { useState } from 'react';
import { videosList } from '../data/videosData';
import { Video, Play, MessageSquare, Users, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function VideoLibrarySection() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const categories = [
    'Todos',
    'AGESIC Uruguay',
    'El dilema de las redes',
    'Neurociencia y salud',
    'Crianza digital',
    'Huella digital',
    'Convivencia',
    'Grooming',
    'Sexting y ley',
    'Prevención',
    'Docentes y taller'
  ];

  const filteredVideos = activeCategory === 'Todos'
    ? videosList
    : activeCategory === 'AGESIC Uruguay'
    ? videosList.filter(v => v.isAgesic)
    : activeCategory === 'El dilema de las redes'
    ? videosList.filter(v => v.isSocialDilemma)
    : videosList.filter(v => v.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-8 sm:py-14 bg-slate-50 border-b border-slate-200" id="videoteca">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header - Mobile Friendly */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-indigo-700" />
            <span>Videoteca formativa y cortometrajes</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Videos para mirar y charlar en familia o en clase
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            El video es el mejor disparador para abrir una conversación sincera. No se trata de generar miedo, sino de ponerle pienso y reflexionar juntos sobre situaciones reales.
          </p>
        </div>

        {/* Filter Pills Carousel on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Video Player Container (Supports YouTube or local MP4) */}
              <div className="relative bg-black aspect-video flex items-center justify-center">
                {item.isYouTube ? (
                  <iframe
                    src={item.embedUrl}
                    title={item.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                    onPlay={() => setPlayingVideoId(item.id)}
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                    Tu navegador no soporta reproducción directa de video.
                  </video>
                )}
              </div>

              {/* Video Info & Family Guide */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${item.badgeColor}`}>
                        {item.category}
                      </span>
                      {item.isAgesic && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-sky-900 text-white">
                          🇺🇾 AGESIC Oficial
                        </span>
                      )}
                      {item.isSocialDilemma && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-red-900 text-white">
                          🎬 El Dilema de las Redes
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      🎯 {item.target}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    {item.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Family Discussion Box */}
                <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>¿Qué charlar después de verlo?</span>
                  </div>
                  <p className="italic text-indigo-900/90 leading-relaxed text-[11px] sm:text-xs">
                    {item.discussionPrompt}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom pedagogical footnote */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs text-center max-w-2xl mx-auto space-y-1">
          <p className="font-bold">
            🇺🇾 Recomendación del Modelo S.E.R.C. (Uruguay Educa DGES):
          </p>
          <p className="text-[11px] sm:text-xs text-amber-900/90 leading-relaxed">
            Mirá estos cortometrajes junto a tus hijos o en la hora de clase. Haceles preguntas abiertas: ¿Qué hubieras hecho vos en su lugar? ¿Cómo te parece que se sintió? La empatía es el mejor filtro de seguridad.
          </p>
        </div>

      </div>
    </section>
  );
}
