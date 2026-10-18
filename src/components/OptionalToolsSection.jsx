import React, { useState } from 'react';
import ReadinessQuiz from './ReadinessQuiz';
import ProtocolSection from './ProtocolSection';
import { FileText, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function OptionalToolsSection() {
  const [activeTool, setActiveTool] = useState('acuerdo'); // 'acuerdo' | 'test'

  return (
    <section className="py-6 sm:py-12 bg-slate-50 border-b border-slate-200" id="herramientas-opcionales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Simple & Clean Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>Herramientas opcionales</span>
          </span>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Extras para profundizar en casa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            No son obligatorias. Si tenés ganas de formalizar pautas por escrito o evaluar la madurez de tu hijo/a, acá tenés estas dos herramientas listas:
          </p>
        </div>

        {/* Clean Pill Selector */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTool('acuerdo')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTool === 'acuerdo'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Acuerdo familiar (PDF)</span>
          </button>

          <button
            onClick={() => setActiveTool('test')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTool === 'test'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Test de madurez</span>
          </button>
        </div>

        {/* Content View */}
        <div className="mt-4">
          {activeTool === 'acuerdo' ? (
            <ProtocolSection />
          ) : (
            <ReadinessQuiz onProceedToAgreement={() => setActiveTool('acuerdo')} />
          )}
        </div>

      </div>
    </section>
  );
}
