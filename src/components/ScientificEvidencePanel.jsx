import React, { useState } from 'react';
import { scientificEvidenceList } from '../data/scientificEvidenceData';
import { 
  Clock, 
  Brain, 
  Eye, 
  Activity, 
  HeartPulse, 
  Pill, 
  ExternalLink, 
  BarChart3, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const iconMap = {
  'horas-promedio': Clock,
  'afectacion-neuronal': Brain,
  'vision-miopia': Eye,
  'postura-cervical': Activity,
  'salud-mental-relacionamiento': HeartPulse,
  'sueno-medicacion': Pill
};

export default function ScientificEvidencePanel({ darkMode = false, defaultExpanded = true }) {
  const [activeId, setActiveId] = useState(scientificEvidenceList[0].id);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const currentItem = scientificEvidenceList.find(item => item.id === activeId) || scientificEvidenceList[0];
  const ActiveIcon = iconMap[currentItem.id] || BarChart3;

  return (
    <div className={`rounded-3xl border transition-all ${
      darkMode 
        ? 'bg-slate-900/95 border-slate-800 text-white shadow-xl' 
        : 'bg-white border-slate-200 text-slate-900 shadow-lg'
    }`}>
      {/* Header Bar with Collapse Toggle */}
      <div className={`p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isExpanded ? (darkMode ? 'border-b border-slate-800' : 'border-b border-slate-100') : ''
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
              darkMode ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-rose-100 text-rose-800'
            }`}>
              <BarChart3 className="w-3.5 h-3.5" />
              Evidencia científica verificable
            </span>
            <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Con acceso directo a los estudios (PubMed · NIH · Lancet · UNICEF)
            </span>
          </div>
          <h3 className={`font-heading text-lg sm:text-xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            ¿Qué muestra la ciencia sobre el uso intensivo de pantallas?
          </h3>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>{isExpanded ? 'Ocultar gráficos' : 'Ver gráficos y fuentes'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5 animate-in fade-in duration-200">
          
          {/* 6 Interactive Metric Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {scientificEvidenceList.map((item) => {
              const Icon = iconMap[item.id] || BarChart3;
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? darkMode
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md ring-1 ring-indigo-400/50'
                        : 'bg-indigo-50 border-indigo-600 text-slate-900 shadow-xs ring-1 ring-indigo-600/20'
                      : darkMode
                      ? 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <Icon className={`w-4 h-4 shrink-0 ${
                      isSelected 
                        ? (darkMode ? 'text-amber-300' : 'text-indigo-600') 
                        : (darkMode ? 'text-slate-400' : 'text-slate-500')
                    }`} />
                    <span className={`text-base sm:text-lg font-black font-heading tracking-tight ${
                      isSelected
                        ? (darkMode ? 'text-amber-300' : 'text-indigo-700')
                        : (darkMode ? 'text-white' : 'text-slate-800')
                    }`}>
                      {item.highlightMetric}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold leading-tight block">
                    {item.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Graphical View & Sources */}
          <div
            key={activeId}
            className={`tab-panel-transition rounded-2xl p-4 sm:p-6 border grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${
              darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200/90'
            }`}
          >
            
            {/* Left Column (7 cols): Dynamic Bar Chart & Headline */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  darkMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    darkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    Dimensión analizada · {currentItem.category}
                  </span>
                  <h4 className={`font-heading text-base sm:text-xl font-black leading-snug ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {currentItem.headline}
                  </h4>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {currentItem.summary}
              </p>

              {/* Visual Bar Chart */}
              <div className="space-y-3 pt-1">
                {currentItem.bars.map((bar, idx) => {
                  const pct = Math.min(100, Math.round((bar.value / bar.max) * 100));
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs gap-2">
                        <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          {bar.label}
                        </span>
                        <span className={`font-extrabold shrink-0 px-2 py-0.5 rounded-md text-[11px] ${
                          darkMode ? 'bg-slate-800 text-amber-300' : 'bg-white border border-slate-200 text-slate-900'
                        }`}>
                          {bar.display}
                        </span>
                      </div>
                      <div className={`w-full h-3 rounded-full overflow-hidden ${
                        darkMode ? 'bg-slate-800' : 'bg-slate-200'
                      }`}>
                        <div
                          className={`h-full rounded-full bar-fill-animate ${bar.colorClass}`}
                          style={{ width: `${pct}%`, animationDelay: `${idx * 80}ms` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (5 cols): Key Clinical Facts & Clickable Source Links */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Highlight Callout */}
              <div className={`p-4 rounded-2xl border ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="flex items-baseline gap-2.5">
                  <span className={`font-heading text-2xl sm:text-3xl font-black ${
                    darkMode ? 'text-amber-400' : 'text-indigo-600'
                  }`}>
                    {currentItem.highlightMetric}
                  </span>
                  <span className={`text-xs font-bold leading-snug ${
                    darkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {currentItem.highlightLabel}
                  </span>
                </div>

                <ul className="mt-3 pt-3 border-t border-slate-700/20 space-y-2">
                  {currentItem.extraFacts.map((fact, fIdx) => (
                    <li key={fIdx} className={`text-[11px] sm:text-xs flex items-start gap-2 leading-relaxed ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        darkMode ? 'text-indigo-400' : 'text-indigo-600'
                      }`} />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verifiable Links Box */}
              <div className="space-y-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                  darkMode ? 'text-sky-400' : 'text-indigo-700'
                }`}>
                  📚 Fuentes científicas (clic para ver la publicación original):
                </span>
                <div className="space-y-2">
                  {currentItem.sources.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 group ${
                        darkMode
                          ? 'bg-slate-900 hover:bg-indigo-950/60 border-slate-700 hover:border-indigo-500/60 text-slate-200'
                          : 'bg-white hover:bg-indigo-50/60 border-slate-200 hover:border-indigo-300 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className={`text-[10px] font-extrabold uppercase block ${
                          darkMode ? 'text-indigo-300' : 'text-indigo-600'
                        }`}>
                          {src.institution}
                        </span>
                        <p className="text-xs font-bold leading-snug group-hover:underline">
                          {src.title}
                        </p>
                      </div>
                      <ExternalLink className={`w-4 h-4 shrink-0 ${
                        darkMode ? 'text-sky-400' : 'text-indigo-600'
                      }`} />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
