import React, { useState, useEffect } from 'react';
import ReadinessQuiz from './ReadinessQuiz';
import ProtocolSection from './ProtocolSection';
import FamilyResearchSurvey from './FamilyResearchSurvey';
import { FileText, Award, Sparkles, GraduationCap, ClipboardList } from 'lucide-react';

export default function OptionalToolsSection({ 
  initialTool = 'acuerdo-familiar', 
  userProfile = 'familia',
  onNavigateTab, 
  onOpenResearcherDashboard 
}) {
  const [activeTool, setActiveTool] = useState(initialTool); // 'encuesta' | 'acuerdo-familiar' | 'contrato-aula' | 'test'

  useEffect(() => {
    if (initialTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool]);

  return (
    <section className="py-8 sm:py-12 bg-slate-50/60 border-b border-slate-200" id="herramientas-opcionales">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Simple & Clean Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 no-print">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Herramientas prácticas</span>
          </div>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {userProfile === 'familia' ? 'Acuerdo familiar, autodiagnóstico y encuesta' : 'Contrato de aula y encuesta de investigación'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {userProfile === 'familia'
              ? 'Personalizá el pacto de uso de celular para imprimir, sumá tu voz en la encuesta anónima o evaluá el grado de autonomía.'
              : 'Descargá el acuerdo pedagógico de aula o participá en el relevamiento académico sobre hábitos digitales.'}
          </p>
        </div>

        {/* Clean Segmented Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs no-print">
          <button
            type="button"
            onClick={() => setActiveTool('encuesta')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTool === 'encuesta'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <span>Encuesta familiar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('acuerdo-familiar')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTool === 'acuerdo-familiar'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Acuerdo familiar (PDF)</span>
          </button>

          {userProfile === 'docente' && (
            <button
              type="button"
              onClick={() => setActiveTool('contrato-aula')}
              className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTool === 'contrato-aula'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Contrato de aula (PDF)</span>
            </button>
          )}

          {userProfile === 'familia' && (
            <button
              type="button"
              onClick={() => setActiveTool('test')}
              className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTool === 'test'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Test de madurez</span>
            </button>
          )}
        </div>

        {/* Content View */}
        <div className="mt-4">
          {activeTool === 'encuesta' ? (
            <FamilyResearchSurvey
              onNavigateTab={onNavigateTab}
              onProceedToAgreement={() => setActiveTool('acuerdo-familiar')}
              onOpenResearcherDashboard={onOpenResearcherDashboard}
            />
          ) : activeTool === 'acuerdo-familiar' ? (
            <ProtocolSection initialMode="familiar" />
          ) : activeTool === 'contrato-aula' ? (
            <ProtocolSection initialMode="aula" />
          ) : (
            <ReadinessQuiz onProceedToAgreement={() => setActiveTool('acuerdo-familiar')} />
          )}
        </div>

      </div>
    </section>
  );
}
