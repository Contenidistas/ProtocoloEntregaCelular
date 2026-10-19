import React from 'react';
import { Smartphone, ExternalLink, ArrowUp, Presentation, GraduationCap, Award, Lock } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenWorkshopMode, onOpenResearcherDashboard }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Attribution */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Primer Celular Uruguay 🇺🇾
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Plataforma orientadora para la entrega saludable del primer celular a niñas, niños y adolescentes en Uruguay. 
              Promoviendo la ciudadanía digital desde la familia y los centros educativos.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/85 border border-slate-700/90 text-xs space-y-2.5 text-slate-300 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                  <p className="text-sm text-white">
                    <strong>Autoría:</strong> Prof. Esp. Santiago Hernández
                  </p>
                </div>
                <a
                  href="https://exportcvuy.anii.org.uy/cv/?8242b38f35c3b4fc9b8d3442700f810e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-bold text-[11px] transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ver CVuy (ANII)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-slate-300 font-medium leading-relaxed">
                Contenidista de informática en el portal Uruguay Educa, espacio Educación y TIC de la DGES (ANEP).
              </p>

              <p className="text-slate-400 leading-relaxed border-t border-slate-700/70 pt-2">
                Santiago es candidato a Magíster en Educación por la Universidad ORT Uruguay, Doctorando en la Universidad Nacional de La Plata (UNLP, Argentina) e investigador en diversos equipos nacionales e internacionales. Sus líneas de investigación están relacionadas con las tecnologías emergentes, la inteligencia artificial y la educación.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
                <span className="text-indigo-400 font-mono">
                  shernandez@uruguayeduca.edu.uy
                </span>
                <a
                  href="https://exportcvuy.anii.org.uy/cv/?8242b38f35c3b4fc9b8d3442700f810e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>exportcvuy.anii.org.uy/cv</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links - Strict Sentence Case */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveTab('inicio'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Inicio y modelo S.E.R.C.
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('controles'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Controles en Android e iPhone
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('videos'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Videoteca y cortometrajes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('encuesta'); scrollToTop(); }}
                  className="hover:text-white text-emerald-400 font-semibold transition-colors"
                >
                  Encuesta familiar anónima (Estudio)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('opcionales'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Acuerdo familiar y test (opcional)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('documentos'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Guías didácticas oficiales en PDF
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('docentes'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Herramientas para docentes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('uruguay'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Normativa y teléfonos de ayuda
                </button>
              </li>
            </ul>
          </div>

          {/* Official Entities */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              Organismos oficiales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://uruguayeduca.anep.edu.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Portal Uruguay Educa (DGES)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://ceibal.edu.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Plan Ceibal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gub.uy/agesic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>AGESIC (Presidencia)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.inau.gub.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>INAU · Línea Azul 0800 5050</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://denuncias.minterior.gub.uy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Cibercrimen (Ministerio del Interior)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: License, Discreet Workshop & Researcher Links & Back to Top */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>Licencia abierta</span>
            <a 
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline font-semibold"
            >
              CC BY-NC-SA 4.0
            </a>
            <span>· Modelo S.E.R.C.: Dr. Ruben Puentedura</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Discreet Researcher Profile Link */}
            {onOpenResearcherDashboard && (
              <button
                onClick={onOpenResearcherDashboard}
                className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-300 transition-colors text-xs"
                title="Acceso con contraseña al panel de datos de investigación"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Perfil investigador</span>
              </button>
            )}

            {/* Discreet Workshop Mode Link */}
            <button
              onClick={onOpenWorkshopMode}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-xs"
              title="Iniciar vista de presentación para proyector"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Modo taller</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
