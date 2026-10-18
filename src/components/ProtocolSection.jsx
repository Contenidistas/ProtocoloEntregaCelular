import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  defaultCommitmentsKid, 
  defaultCommitmentsParents, 
  defaultBreachClauses 
} from '../data/contractTemplate';
import { 
  FileText, 
  Printer, 
  Sparkles, 
  Copy, 
  Check, 
  CheckCircle2, 
  PenTool,
  Trash2,
  Calendar,
  Smartphone,
  Eye
} from 'lucide-react';

export default function ProtocolSection() {
  // Mobile view tab: 'editor' | 'preview'
  const [mobileTab, setMobileTab] = useState('editor');

  // Form State
  const [kidName, setKidName] = useState('Joaquín');
  const [parentsNames, setParentsNames] = useState('Mamá y Papá');
  const [deviceModel, setDeviceModel] = useState('Smartphone Android / iOS');
  const [bedtimeHour, setBedtimeHour] = useState('21:30');
  const [chargingLocation, setChargingLocation] = useState('Mueble del living / espacio común');
  
  // Clauses State
  const [kidCommitments, setKidCommitments] = useState(defaultCommitmentsKid);
  const [parentCommitments, setParentCommitments] = useState(defaultCommitmentsParents);
  const [customRuleText, setCustomRuleText] = useState('');
  
  // Feedback
  const [copied, setCopied] = useState(false);
  const [signedCelebration, setSignedCelebration] = useState(false);

  const toggleKidCommitment = (id) => {
    setKidCommitments(
      kidCommitments.map(item => item.id === id ? { ...item, active: !item.active } : item)
    );
  };

  const toggleParentCommitment = (id) => {
    setParentCommitments(
      parentCommitments.map(item => item.id === id ? { ...item, active: !item.active } : item)
    );
  };

  const handleAddCustomRule = (e) => {
    e.preventDefault();
    if (!customRuleText.trim()) return;
    const newRule = {
      id: `custom_${Date.now()}`,
      text: customRuleText.trim(),
      active: true,
      isCustom: true
    };
    setKidCommitments([...kidCommitments, newRule]);
    setCustomRuleText('');
  };

  const handleRemoveCustomRule = (id) => {
    setKidCommitments(kidCommitments.filter(item => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCelebrate = () => {
    setSignedCelebration(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSignedCelebration(false), 3500);
  };

  const handleCopyText = () => {
    const textToCopy = `ACUERDO FAMILIAR DE USO DEL PRIMER CELULAR
Entre: ${parentsNames} (Adultos Referentes) y ${kidName} (Titular en Aprendizaje)
Dispositivo: ${deviceModel}
Horario de desconexión nocturna: ${bedtimeHour} hs. Lugar de recarga: ${chargingLocation}.

COMPROMISOS DE ${kidName.toUpperCase()}:
${kidCommitments.filter(c => c.active).map((c, i) => `${i + 1}. ${c.text}`).join('\n')}

COMPROMISOS DE LOS ADULTOS (${parentsNames.toUpperCase()}):
${parentCommitments.filter(c => c.active).map((c, i) => `${i + 1}. ${c.text}`).join('\n')}

PAUTAS DE REVISIÓN Y RESPONSABILIDAD:
${defaultBreachClauses.map((b, i) => `- ${b}`).join('\n')}

Firmado en Uruguay, a los ______ días del mes de ____________ de 2026.
Firma del hijo/a: __________________   Firma de los adultos: __________________`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-slate-200" id="protocolo-acuerdo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 no-print">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Paso a paso y acuerdo imprimible</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Protocolo de entrega y acuerdo familiar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            El celular no es un regalo sorpresa que se entrega en una caja y listo. Requiere charlar antes, poner límites claros de entrada y firmar un pacto de mutua confianza.
          </p>
        </div>

        {/* 4 Protocol Steps (2 cols on mobile, 4 on desktop) - NO-PRINT */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 no-print">
          
          <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-200 relative">
            <span className="bg-indigo-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
              PASO 1
            </span>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
              Charlar antes
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
              Explicar que el equipo es un préstamo de la familia para comunicarse y aprender, no un territorio privado incontrolable.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-200 relative">
            <span className="bg-indigo-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
              PASO 2
            </span>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
              Configurar antes
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
              Poner Family Link o Tiempo de Uso, horario de apagado y sin tarjetas guardadas antes de que el chiquilín lo estrene.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-200 relative">
            <span className="bg-indigo-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
              PASO 3
            </span>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
              Firmar el acuerdo
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
              Personalizar las reglas de casa, imprimir el contrato y firmarlo juntos en un momento de encuentro familiar.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-200 relative">
            <span className="bg-indigo-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
              PASO 4
            </span>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
              Revisar cada 3 meses
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
              A medida que demuestre responsabilidad, se flexibilizan horarios y se da más autonomía. La confianza se construye.
            </p>
          </div>

        </div>

        {/* Mobile View Switcher (Editor vs Previsualización) */}
        <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl no-print max-w-xs mx-auto">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'editor' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>1. Reglas y datos</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'preview' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>2. Ver contrato</span>
          </button>
        </div>

        {/* Contract Workspace (Form vs Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form & Clauses (5 cols) */}
          <div className={`lg:col-span-5 bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 space-y-5 no-print ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-indigo-600" />
                <span>Personalizar datos de tu hogar</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ajustá nombres y horarios según las costumbres de tu familia.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del chiquilín/a:</label>
                <input
                  type="text"
                  value={kidName}
                  onChange={(e) => setKidName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Ej: Joaquín, Valentina..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adultos responsables:</label>
                <input
                  type="text"
                  value={parentsNames}
                  onChange={(e) => setParentsNames(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Ej: Mamá y Papá / Laura"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hora corte nocturno:</label>
                  <input
                    type="text"
                    value={bedtimeHour}
                    onChange={(e) => setBedtimeHour(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Ej: 21:30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lugar de carga:</label>
                  <input
                    type="text"
                    value={chargingLocation}
                    onChange={(e) => setChargingLocation(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Ej: En el living"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Modelo del equipo:</label>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Ej: Samsung A15 / Motorola / iPhone"
                />
              </div>
            </div>

            {/* Kid Commitments Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-xs uppercase font-extrabold text-slate-700 tracking-wider flex items-center justify-between">
                <span>Compromisos de {kidName || 'el/la menor'}</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {kidCommitments.filter(c => c.active).length} activos
                </span>
              </span>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {kidCommitments.map((clause) => (
                  <div
                    key={clause.id}
                    onClick={() => toggleKidCommitment(clause.id)}
                    className={`flex items-start gap-2 p-2 rounded-xl border text-[11px] sm:text-xs cursor-pointer transition-all ${
                      clause.active 
                        ? 'bg-white border-indigo-200 text-slate-800' 
                        : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={clause.active}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-0 cursor-pointer shrink-0"
                    />
                    <span className="flex-1 leading-snug">{clause.text}</span>
                    {clause.isCustom && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveCustomRule(clause.id); }}
                        className="text-slate-400 hover:text-red-500 ml-1"
                        title="Eliminar regla personalizada"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add custom rule */}
              <form onSubmit={handleAddCustomRule} className="pt-1.5 flex gap-1.5">
                <input
                  type="text"
                  value={customRuleText}
                  onChange={(e) => setCustomRuleText(e.target.value)}
                  placeholder="Agregar regla propia..."
                  className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shrink-0"
                >
                  Sumar
                </button>
              </form>
            </div>

            {/* Parent Commitments Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-xs uppercase font-extrabold text-slate-700 tracking-wider flex items-center justify-between">
                <span>Compromisos de los adultos</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {parentCommitments.filter(c => c.active).length} activos
                </span>
              </span>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {parentCommitments.map((clause) => (
                  <div
                    key={clause.id}
                    onClick={() => toggleParentCommitment(clause.id)}
                    className={`flex items-start gap-2 p-2 rounded-xl border text-[11px] sm:text-xs cursor-pointer transition-all ${
                      clause.active 
                        ? 'bg-white border-purple-200 text-slate-800' 
                        : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={clause.active}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-purple-600 focus:ring-0 cursor-pointer shrink-0"
                    />
                    <span className="flex-1 leading-snug">{clause.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: button to jump to preview */}
            <div className="pt-2 lg:hidden">
              <button
                onClick={() => setMobileTab('preview')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Ver contrato final para firmar</span>
                <span>→</span>
              </button>
            </div>

          </div>

          {/* Right Column: Live Printable Sheet / Contract (7 cols) */}
          <div className={`lg:col-span-7 ${mobileTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Action Bar - NO-PRINT */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 no-print">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pacto familiar oficial</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>

                <button
                  onClick={handleCelebrate}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{signedCelebration ? '¡Firmado!' : 'Celebrar'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                >
                  <Printer className="w-3 h-3" />
                  <span>Imprimir / PDF</span>
                </button>
              </div>
            </div>

            {/* The Document Sheet */}
            <div className="print-contract bg-white border-2 border-slate-300 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden text-slate-900">
              
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-4 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-indigo-800">
                  <span>🇺🇾 Uruguay</span>
                  <span>·</span>
                  <span>Ciudadanía digital en familia</span>
                </div>
                <h2 className="font-heading text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  Pacto familiar de uso del primer celular
                </h2>
                <p className="text-[11px] text-slate-600 italic">
                  "Un acuerdo de mutua confianza, cuidado y respeto"
                </p>
              </div>

              {/* Preamble */}
              <div className="text-xs text-slate-700 leading-relaxed space-y-1.5 mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p>
                  El presente pacto se celebra entre <strong className="text-slate-900">{parentsNames || 'Los adultos responsables'}</strong> y{' '}
                  <strong className="text-slate-900">{kidName || 'El/la menor'}</strong>, por el uso del dispositivo{' '}
                  <strong className="text-slate-900">{deviceModel}</strong>.
                </p>
                <p>
                  El celular es un préstamo familiar para estar comunicados y aprender.
                  Se fija como horario de desconexión las <strong className="text-slate-900">{bedtimeHour} hs</strong>, momento en el cual el equipo quedará cargándose en <strong className="text-slate-900">{chargingLocation}</strong>.
                </p>
              </div>

              {/* Kid commitments */}
              <div className="mb-4 space-y-1.5">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-0.5">
                  1. Compromisos de {kidName || 'el/la titular'}
                </h4>
                <div className="space-y-1">
                  {kidCommitments.filter(c => c.active).map((c, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-800 leading-snug">
                      <span className="font-bold text-indigo-700 shrink-0">{idx + 1}.</span>
                      <span>{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent commitments */}
              <div className="mb-4 space-y-1.5">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-purple-900 border-b border-purple-100 pb-0.5">
                  2. Compromisos de los adultos ({parentsNames})
                </h4>
                <div className="space-y-1">
                  {parentCommitments.filter(c => c.active).map((c, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-800 leading-snug">
                      <span className="font-bold text-purple-700 shrink-0">{idx + 1}.</span>
                      <span>{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Convivencia */}
              <div className="mb-6 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[10px] sm:text-[11px] text-amber-950 space-y-0.5">
                <span className="font-bold tracking-wider block text-amber-900">3. Revisión y convivencia</span>
                <p>
                  • Si se rompen las pautas, el teléfono descansa 48 horas en un cajón para recalibrar hábitos.
                  • Este acuerdo se revisa juntos cada 3 meses para ajustar permisos según la madurez demostrada.
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-6 text-center mt-4">
                <div className="space-y-1">
                  <div className="h-8 border-b border-dashed border-slate-400 mx-2" />
                  <p className="text-xs font-bold text-slate-900 uppercase">{kidName || 'Firma del Hijo/a'}</p>
                  <p className="text-[9px] text-slate-500">"Me comprometo a cuidar mi huella"</p>
                </div>
                <div className="space-y-1">
                  <div className="h-8 border-b border-dashed border-slate-400 mx-2" />
                  <p className="text-xs font-bold text-slate-900 uppercase">{parentsNames || 'Firma de los Padres'}</p>
                  <p className="text-[9px] text-slate-500">"Nos comprometemos a guiarte con cariño"</p>
                </div>
              </div>

              {/* Stamp */}
              <div className="mt-6 text-center text-[9px] text-slate-400 flex items-center justify-center gap-2">
                <span>Modelo SERC</span>
                <span>•</span>
                <span>Uruguay Educa DGES</span>
                <span>•</span>
                <span>AGESIC Ciudadanía Digital</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
