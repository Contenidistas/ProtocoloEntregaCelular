import React, { useState } from 'react';
import ReadinessQuiz from './ReadinessQuiz';
import ProtocolSection from './ProtocolSection';
import { FileText, Award, Sparkles, GraduationCap } from 'lucide-react';

export default function OptionalToolsSection() {
  const [activeTool, setActiveTool] = useState('acuerdo-familiar'); // 'acuerdo-familiar' | 'contrato-aula' | 'test'

  return (
    <section className="py-6 sm:py-12 bg-slate-50 border-b border-slate-200" id="herramientas-opcionales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Simple & Clean Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 no-print">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>Acuerdos imprimibles y autodiagnóstico</span>
          </span>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Acuerdos personalizables (hogar y aula) y autodiagnóstico
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Personalizá e imprimí el <strong>Pacto Familiar</strong> (padres e hijos/as), el <strong>Contrato Pedagógico de Aula</strong> (docente y estudiantes) o realizá el <strong>Autodiagnóstico por Edad</strong>:
          </p>
        </div>

        {/* Clean 3-Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs no-print">
          <button
            onClick={() => setActiveTool('acuerdo-familiar')}
            className={`flex-1 min-w-[160px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTool === 'acuerdo-familiar'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Acuerdo familiar (PDF)</span>
          </button>

          <button
            onClick={() => setActiveTool('contrato-aula')}
            className={`flex-1 min-w-[160px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTool === 'contrato-aula'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Contrato de aula (PDF)</span>
          </button>

          <button
            onClick={() => setActiveTool('test')}
            className={`flex-1 min-w-[160px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTool === 'test'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Autodiagnóstico y test</span>
          </button>
        </div>

        {/* Content View */}
        <div className="mt-4">
          {activeTool === 'acuerdo-familiar' ? (
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
