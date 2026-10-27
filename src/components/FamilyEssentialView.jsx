import React, { useState } from 'react';
import { 
  Moon, 
  UtensilsCrossed, 
  HeartHandshake, 
  Smartphone, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Lock, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';

export default function FamilyEssentialView({ 
  onNavigateTab, 
  onSwitchToCompleteView 
}) {
  const [selectedOS, setSelectedOS] = useState('android'); // 'android' | 'ios'

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. Header Minimalista */}
      <section className="pt-8 sm:pt-14 pb-4 text-center max-w-3xl mx-auto px-4 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vista Esencial para Familias</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Acompañar a los hijos con su{' '}
          <span className="text-indigo-600">primer celular</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tres acuerdos claros de convivencia en casa y los pasos básicos para proteger su equipo. Sin términos técnicos ni complicaciones.
        </p>
      </section>

      {/* 2. Las 3 Reglas de Oro en Casa */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Paso 1</span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Las 3 reglas de oro en el hogar
          </h2>
          <p className="text-xs text-slate-500">
            Pautas simples recomendadas por pediatras y educadores para cuidar el descanso y el vínculo:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Regla 1: Dormitorio */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Moon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">Regla 1 · Descanso</span>
              <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                El celular duerme fuera del cuarto
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                A las 21:30 hs todos los celulares (incluidos los de los padres) se cargan en la cocina o el living. El sueño profundo es sagrado para crecer y rendir al otro día.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Evita desvelos y ansiedad</span>
            </div>
          </div>

          {/* Regla 2: La mesa */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">Regla 2 · Convivencia</span>
              <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                Cero pantallas en la mesa
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                El almuerzo y la cena son momentos para charlar, mirarse a los ojos y contar cómo estuvo el día. La mesa familiar es un espacio libre de notificaciones.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fomenta la comunicación</span>
            </div>
          </div>

          {/* Regla 3: El ejemplo y la confianza */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">Regla 3 · Confianza</span>
              <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                Ejemplo adulto y canal abierto
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Los hijos aprenden de lo que nos ven hacer. Si ven algo raro o incómodo en internet, que sepan que pueden pedirnos ayuda sin miedo a que les quitemos el celular.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Protección ante riesgos</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Poner el Celular a Punto (3 pasos rápidos) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Paso 2</span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Poner el celular a punto en 3 minutos
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configurá los límites básicos en el equipo antes de entregarlo:
              </p>
            </div>

            {/* Selector Android / iPhone */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedOS('android')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedOS === 'android'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🤖</span>
                <span>Android (Family Link)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOS('ios')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedOS === 'ios'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🍎</span>
                <span>iPhone / iPad</span>
              </button>
            </div>
          </div>

          {/* 3 Pasos Clave */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <Clock className="w-4 h-4 text-indigo-600" />
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                  Horario de descanso
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {selectedOS === 'android'
                  ? 'Instalá Google Family Link en tu celu y en el del menor. Fijá el "Horario de descanso" a las 21:30 para que el teléfono se bloquee solo.'
                  : 'En el iPhone: Configuración > Tiempo de uso > "Tiempo desactivado". Programá el corte nocturno para bloquear apps a la hora de dormir.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <Lock className="w-4 h-4 text-indigo-600" />
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                  Bloqueo de compras y descargas
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {selectedOS === 'android'
                  ? 'En Google Play Store: Ajustes > Control parental y activá que cualquier descarga o compra requiera tu contraseña o huella.'
                  : 'En iPhone: Tiempo de uso > Restricciones > Compras en iTunes y App Store > poner "No permitir" compras dentro de la app.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                  Filtro y ubicación familiar
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {selectedOS === 'android'
                  ? 'Activá Google SafeSearch en Chrome y la ubicación compartida en Family Link para saber cuándo llega a la escuela o al liceo.'
                  : 'Activá "Contenido web > Limitar sitios para adultos" y compartí la ubicación mediante la app "Encontrar".'}
              </p>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-slate-500">
              ¿Querés ver la guía técnica completa con fotos y opciones avanzadas?
            </span>
            <button
              type="button"
              onClick={() => onNavigateTab('controles')}
              className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver guía detallada</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Acuerdo Familiar y Encuesta (2 Tarjetas Claras) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 space-y-1">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Paso 3</span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Acordar y evaluar en familia
          </h2>
          <p className="text-xs text-slate-500">
            Dos herramientas prácticas para charlar y formalizar el compromiso:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Tarjeta Acuerdo en PDF */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Acuerdo Familiar de Entrega (PDF)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Un documento breve y personalizable para charlar en casa, definir las responsabilidades y firmarlo simbólicamente en familia.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('opcionales')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Personalizar y descargar acuerdo en PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tarjeta Encuesta Familiar Anónima */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Encuesta Familiar Anónima (2 min)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Participá del relevamiento nacional anónimo y recibí al instante recomendaciones personalizadas de pediatras y ANEP sobre sueño y pantallas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('encuesta')}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Hacer encuesta con devolución inmediata</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Banner discreto para pasar a Vista Completa */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              ¿Querés ver cortometrajes para debatir, casos de estudio interactivos o guías oficiales de ANEP y AGESIC?
            </span>
          </div>
          <button
            type="button"
            onClick={onSwitchToCompleteView}
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 font-bold text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            Activar Vista Completa
          </button>
        </div>
      </section>

    </div>
  );
}