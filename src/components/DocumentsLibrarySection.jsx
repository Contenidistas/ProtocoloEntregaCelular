import React, { useState } from 'react';
import { officialDocuments } from '../data/documentsData';
import { FileText, Download, ExternalLink, BookOpen, ShieldCheck, Filter } from 'lucide-react';

export default function DocumentsLibrarySection() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredDocs = activeFilter === 'Todos'
    ? officialDocuments
    : officialDocuments.filter(d => d.category.includes(activeFilter));

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-slate-200" id="documentos-oficiales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Biblioteca oficial de recursos en PDF</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Guías didácticas, protocolos y materiales oficiales
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Documentos elaborados por ANEP, AGESIC, Plan Ceibal, UNICEF y Uruguay Educa. Podés leerlos online o descargarlos para usarlos en el hogar o la institución educativa.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2">
          {['Todos', 'Familias', 'Docentes'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-indigo-700">
                    {doc.badge}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500">
                    PDF Oficial
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs font-semibold text-slate-500">
                  {doc.author} · <span className="text-indigo-600">{doc.entity}</span>
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ver / Descargar PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
