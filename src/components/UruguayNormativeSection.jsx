import React, { useState } from 'react';
import { uruguayContacts, legalFramework } from '../data/uruguayResources';
import { 
  Shield, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  Scale, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  FileText
} from 'lucide-react';

export default function UruguayNormativeSection() {
  const [activeLegalTab, setActiveLegalTab] = useState(legalFramework[0].id);

  const currentLegal = legalFramework.find(l => l.id === activeLegalTab) || legalFramework[0];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200" id="normativa-uruguay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="text-base">🇺🇾</span>
            <span>Marco legal y canales oficiales de Uruguay</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Normativa nacional, AGESIC y canales de denuncia
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            En Uruguay no existe un vacío legal en el ciberespacio. Conoce las leyes que protegen a niños, niñas y adolescentes, y guarda los teléfonos de emergencia gratuita ante delitos digitales.
          </p>
        </div>

        {/* Emergency Hotlines Directory (Cards) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-slate-900 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-red-600" />
                <span>Canales oficiales de ayuda y denuncia en Uruguay</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Líneas gratuitas, confidenciales y peritaje policial especializado ante incidentes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {uruguayContacts.map((contact, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {contact.badge}
                    </span>
                    {contact.free && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Llamada Gratuita
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                    {contact.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {contact.description}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <p className="italic text-slate-500">{contact.details}</p>
                  </div>
                </div>

                {/* Direct contact action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {contact.number && (
                    <a
                      href={`tel:${contact.number.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-sm"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                      <span>{contact.number}</span>
                      {contact.mobileShort && <span className="opacity-70">({contact.mobileShort})</span>}
                    </a>
                  )}

                  {contact.website && (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors ml-auto"
                    >
                      <span>Web oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Legal Framework Deep Dive (Tabs + Details) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                Gobernanza Digital
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Leyes clave en lenguaje claro
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Conocer el marco normativo otorga seguridad jurídica a las familias a la hora de intervenir.
            </p>
          </div>

          {/* Legal Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {legalFramework.map((law) => {
              const isSelected = activeLegalTab === law.id;
              return (
                <button
                  key={law.id}
                  onClick={() => setActiveLegalTab(law.id)}
                  className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                  }`}
                >
                  <span className="block truncate">{law.title.split(':')[0]}</span>
                  <span className="text-[10px] font-normal text-slate-500 block truncate mt-0.5">
                    {law.entity.split('-')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Law Details */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-indigo-700 tracking-wider mb-1">
                <Scale className="w-4 h-4 text-indigo-600" />
                <span>{currentLegal.entity}</span>
              </div>
              <h4 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                {currentLegal.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {currentLegal.summary}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Puntos fundamentales para familias:
              </span>
              <div className="space-y-2">
                {currentLegal.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AGESIC & Ceibal Callout Banner */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>
                <strong>Estrategia de Ciudadanía Digital (AGESIC):</strong> Consulta guías didácticas oficiales y materiales en <a href="https://www.gub.uy/agesic" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">gub.uy/agesic</a> y en <a href="https://uruguayeduca.anep.edu.uy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">Uruguay Educa</a>.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
