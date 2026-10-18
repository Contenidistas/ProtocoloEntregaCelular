import React, { useState } from 'react';
import { 
  usageTrackerGuides, 
  appTimeLimitPresets, 
  doNotDisturbProfiles, 
  safeDailyConfigsChecklist 
} from '../data/goodPracticesData';
import { 
  BarChart2, 
  Hourglass, 
  BellOff, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Sliders, 
  Clock 
} from 'lucide-react';

export default function GoodPracticesGuide() {
  const [activeTab, setActiveTab] = useState('medidores'); // 'medidores' | 'limitadores' | 'nomolestar' | 'seguras'
  const [selectedOS, setSelectedOS] = useState('android'); // 'android' | 'ios'
  const [minutesSavedPerDay, setMinutesSavedPerDay] = useState(90); // Default 90 min/day saved
  const [checkedConfigs, setCheckedConfigs] = useState({});

  const toggleConfig = (id) => {
    setCheckedConfigs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedConfigsCount = Object.values(checkedConfigs).filter(Boolean).length;

  // Life time recovered math
  const hoursPerMonth = Math.round((minutesSavedPerDay * 30) / 60);
  const hoursPerYear = Math.round((minutesSavedPerDay * 365) / 60);
  const awakeDaysPerYear = (hoursPerYear / 16).toFixed(1); // 16 waking hours per day

  const currentOSGuide = usageTrackerGuides[selectedOS];

  const tabs = [
    { id: 'medidores', label: '1. ¿Cuánto y qué usamos?', icon: BarChart2 },
    { id: 'limitadores', label: '2. Limitadores de tiempo', icon: Hourglass },
    { id: 'nomolestar', label: '3. Perfil No Molestar', icon: BellOff },
    { id: 'seguras', label: '4. Configuraciones seguras', icon: ShieldCheck }
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm" id="buenas-practicas-cotidianas">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="space-y-1.5 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Buenas prácticas sin alarmar · Para adultos y chicos
          </span>
          <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Todos usamos celular: cómo configurarlo a nuestro favor
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            No se trata de asustarse ni de prohibir la tecnología, sino de aprovechar las herramientas gratuitas que ya trae tu propio teléfono para medir el uso diario, poner topes sanos y proteger la tranquilidad familiar.
          </p>
        </div>

        {/* 4 Tab Selector Pills */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Apps que nos dicen cuánto lo usamos por día y qué usamos */}
      {activeTab === 'medidores' && (
        <div key="tab-medidores" className="space-y-6 tab-panel-transition">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                Mirar juntos el medidor diario del teléfono (sin retos ni culpas)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Elegí tu sistema para ver dónde está el panel nativo que dice cuántas horas por día usamos cada aplicación:
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSelectedOS('android')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedOS === 'android'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🤖 Android (Bienestar Digital)
              </button>
              <button
                onClick={() => setSelectedOS('ios')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedOS === 'ios'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🍎 iPhone (Tiempo de Uso)
              </button>
            </div>
          </div>

          {/* Native OS Guide Card */}
          <div key={selectedOS} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5 tab-panel-transition">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                  {currentOSGuide.badge}
                </span>
                <h5 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900">
                  {currentOSGuide.name}
                </h5>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                📍 Ruta: {currentOSGuide.route}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentOSGuide.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-grid">
              {currentOSGuide.metricsToLook.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-xs font-extrabold text-indigo-700 block">
                    {idx + 1}. {m.title}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium">
              {currentOSGuide.widgetTip}
            </div>
          </div>

          {/* Extra Free Apps */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm sm:text-base text-slate-900 px-1">
              Aplicaciones gratuitas complementarias para medir y gamificar el foco en familia:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-grid">
              {usageTrackerGuides.extraApps.map((app, i) => (
                <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                      {app.purpose}
                    </span>
                    <h6 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                      {app.name}
                    </h6>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    <span>Conocer aplicación oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Limitadores de Tiempo por App + Calculadora de Vida Recuperada */}
      {activeTab === 'limitadores' && (
        <div key="tab-limitadores" className="space-y-6 tab-panel-transition">
          
          {/* Interactive Recovered Time Calculator */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-md">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                <Clock className="w-3.5 h-3.5" />
                Simulador positivo · El valor de poner un limitador diario
              </span>
              <h4 className="font-heading text-lg sm:text-2xl font-extrabold text-white">
                ¿Cuánto tiempo de vida real recuperamos al limitar el scroll pasivo?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mové el deslizador para ver qué ocurre cuando ponemos un temporizador diario en las apps que nos roban tiempo sin darnos cuenta:
              </p>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-indigo-200">Minutos diarios reducidos con limitador:</span>
                  <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-sm">
                    {minutesSavedPerDay} min / día ({(minutesSavedPerDay / 60).toFixed(1)} h)
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={240}
                  step={15}
                  value={minutesSavedPerDay}
                  onChange={(e) => setMinutesSavedPerDay(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>30 min/día</span>
                  <span>90 min/día</span>
                  <span>150 min/día</span>
                  <span>4 horas/día</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-slate-800/90 border border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="font-heading text-2xl sm:text-3xl font-black text-amber-300 block">
                  {hoursPerMonth} h
                </span>
                <span className="text-[11px] text-slate-300 font-bold block leading-tight">
                  libres por mes
                </span>
              </div>
              <div className="bg-slate-800/90 border border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="font-heading text-2xl sm:text-3xl font-black text-emerald-400 block">
                  {hoursPerYear} h
                </span>
                <span className="text-[11px] text-slate-300 font-bold block leading-tight">
                  libres al año
                </span>
              </div>
              <div className="bg-slate-800/90 border border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="font-heading text-2xl sm:text-3xl font-black text-sky-300 block">
                  {awakeDaysPerYear}
                </span>
                <span className="text-[11px] text-slate-300 font-bold block leading-tight">
                  días despiertos al año
                </span>
              </div>
            </div>
          </div>

          {/* 3 Presets by App Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-grid">
            {appTimeLimitPresets.map((preset, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-extrabold">
                    ⏱️ Tope sugerido: {preset.recommendedLimit}
                  </span>
                  <h5 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {preset.category}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {preset.why}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px]">
                  <p className="text-slate-700">
                    <strong className="text-emerald-700">🤖 En Android:</strong> {preset.androidSteps}
                  </p>
                  <p className="text-slate-700">
                    <strong className="text-slate-900">🍎 En iPhone:</strong> {preset.iosSteps}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: Perfil No Molestar y Modos de Enfoque */}
      {activeTab === 'nomolestar' && (
        <div key="tab-nomolestar" className="space-y-4 tab-panel-transition">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-grid">
            {doNotDisturbProfiles.map((prof) => (
              <div key={prof.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase tracking-wider inline-block">
                    {prof.badge}
                  </span>
                  <h5 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                    {prof.title}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prof.summary}
                  </p>
                  <ul className="space-y-2 pt-1">
                    {prof.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700">
                  ⚙️ {prof.howToConfigure}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Checklist de Configuraciones Seguras Cotidianas */}
      {activeTab === 'seguras' && (
        <div key="tab-seguras" className="space-y-4 tab-panel-transition">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                6 ajustes seguros que podés aplicar hoy en menos de 5 minutos
              </h4>
              <p className="text-xs text-slate-600">
                Marcá las configuraciones a medida que las vayas revisando en tu teléfono y en el de tu hijo/a:
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold self-start sm:self-auto shrink-0">
              {completedConfigsCount} de {safeDailyConfigsChecklist.length} aplicadas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 stagger-grid">
            {safeDailyConfigsChecklist.map((item) => {
              const isDone = !!checkedConfigs[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleConfig(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-slate-50'
                  }`}>
                    {isDone && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-indigo-700">
                        {item.category}
                      </span>
                      <h5 className={`font-heading font-bold text-sm ${isDone ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
