import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  defaultCommitmentsKid, 
  defaultCommitmentsParents, 
  defaultBreachClauses,
  defaultCommitmentsTeacher,
  defaultCommitmentsStudents,
  defaultClassroomReviewClauses
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
  Eye,
  Home,
  GraduationCap,
  Plus
} from 'lucide-react';

export default function ProtocolSection({ initialMode = 'familiar' }) {
  // Agreement Mode: 'familiar' (Padres e Hijos/as) | 'aula' (Contrato Pedagógico Docente y Estudiantes)
  const [agreementMode, setAgreementMode] = useState(initialMode);

  useEffect(() => {
    if (initialMode) {
      setAgreementMode(initialMode);
    }
  }, [initialMode]);

  // Mobile view tab: 'editor' | 'preview'
  const [mobileTab, setMobileTab] = useState('editor');

  // --- FAMILY AGREEMENT STATE ---
  const [kidName, setKidName] = useState('Joaquín');
  const [parentsNames, setParentsNames] = useState('Mamá y Papá');
  const [deviceModel, setDeviceModel] = useState('Smartphone Android / iOS');
  const [bedtimeHour, setBedtimeHour] = useState('21:30');
  const [chargingLocation, setChargingLocation] = useState('Mueble del living / espacio común');
  
  const [kidCommitments, setKidCommitments] = useState(defaultCommitmentsKid);
  const [parentCommitments, setParentCommitments] = useState(defaultCommitmentsParents);
  const [customKidRuleText, setCustomKidRuleText] = useState('');
  const [customParentRuleText, setCustomParentRuleText] = useState('');

  // --- CLASSROOM PEDAGOGICAL CONTRACT STATE ---
  const [schoolName, setSchoolName] = useState('Liceo / Escuela / UTU');
  const [groupName, setGroupName] = useState('8° Año EBI');
  const [teacherName, setTeacherName] = useState('Prof. / Mtro.');
  const [subjectName, setSubjectName] = useState('Informática / Tutoría');
  const [classroomStorage, setClassroomStorage] = useState('En silencio dentro de la mochila');

  const [teacherCommitments, setTeacherCommitments] = useState(defaultCommitmentsTeacher);
  const [studentCommitments, setStudentCommitments] = useState(defaultCommitmentsStudents);
  const [customTeacherRuleText, setCustomTeacherRuleText] = useState('');
  const [customStudentRuleText, setCustomStudentRuleText] = useState('');
  
  // Feedback
  const [copied, setCopied] = useState(false);
  const [signedCelebration, setSignedCelebration] = useState(false);

  // --- FAMILY HANDLERS ---
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

  const handleAddCustomKidRule = (e) => {
    e.preventDefault();
    if (!customKidRuleText.trim()) return;
    const newRule = {
      id: `custom_kid_${Date.now()}`,
      text: customKidRuleText.trim(),
      active: true,
      isCustom: true
    };
    setKidCommitments([...kidCommitments, newRule]);
    setCustomKidRuleText('');
  };

  const handleRemoveCustomKidRule = (id) => {
    setKidCommitments(kidCommitments.filter(item => item.id !== id));
  };

  const handleAddCustomParentRule = (e) => {
    e.preventDefault();
    if (!customParentRuleText.trim()) return;
    const newRule = {
      id: `custom_parent_${Date.now()}`,
      text: customParentRuleText.trim(),
      active: true,
      isCustom: true
    };
    setParentCommitments([...parentCommitments, newRule]);
    setCustomParentRuleText('');
  };

  const handleRemoveCustomParentRule = (id) => {
    setParentCommitments(parentCommitments.filter(item => item.id !== id));
  };

  // --- CLASSROOM HANDLERS ---
  const toggleTeacherCommitment = (id) => {
    setTeacherCommitments(
      teacherCommitments.map(item => item.id === id ? { ...item, active: !item.active } : item)
    );
  };

  const toggleStudentCommitment = (id) => {
    setStudentCommitments(
      studentCommitments.map(item => item.id === id ? { ...item, active: !item.active } : item)
    );
  };

  const handleAddCustomTeacherRule = (e) => {
    e.preventDefault();
    if (!customTeacherRuleText.trim()) return;
    const newRule = {
      id: `custom_teacher_${Date.now()}`,
      text: customTeacherRuleText.trim(),
      active: true,
      isCustom: true
    };
    setTeacherCommitments([...teacherCommitments, newRule]);
    setCustomTeacherRuleText('');
  };

  const handleRemoveCustomTeacherRule = (id) => {
    setTeacherCommitments(teacherCommitments.filter(item => item.id !== id));
  };

  const handleAddCustomStudentRule = (e) => {
    e.preventDefault();
    if (!customStudentRuleText.trim()) return;
    const newRule = {
      id: `custom_student_${Date.now()}`,
      text: customStudentRuleText.trim(),
      active: true,
      isCustom: true
    };
    setStudentCommitments([...studentCommitments, newRule]);
    setCustomStudentRuleText('');
  };

  const handleRemoveCustomStudentRule = (id) => {
    setStudentCommitments(studentCommitments.filter(item => item.id !== id));
  };

  // --- ACTIONS (PRINT / CELEBRATE / COPY) ---
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
    let textToCopy = '';
    if (agreementMode === 'familiar') {
      textToCopy = `ACUERDO FAMILIAR DE USO DEL PRIMER CELULAR
Entre: ${parentsNames} (Adultos Referentes) y ${kidName} (Titular en Aprendizaje)
Dispositivo: ${deviceModel}
Horario de desconexión nocturna: ${bedtimeHour} hs. Lugar de recarga: ${chargingLocation}.

COMPROMISOS DE ${kidName.toUpperCase()}:
${kidCommitments.filter(c => c.active).map((c, i) => `${i + 1}. ${c.text}`).join('\n')}

COMPROMISOS DE LOS ADULTOS (${parentsNames.toUpperCase()}):
${parentCommitments.filter(c => c.active).map((c, i) => `${i + 1}. ${c.text}`).join('\n')}

PAUTAS DE REVISIÓN Y RESPONSABILIDAD:
${defaultBreachClauses.map((b) => `- ${b}`).join('\n')}

Firmado en Uruguay, a los ______ días del mes de ____________ de 2026.
Firma del hijo/a: __________________   Firma de los adultos: __________________`;
    } else {
      textToCopy = `CONTRATO PEDAGÓGICO DE CONVIVENCIA DIGITAL EN EL AULA
Centro Educativo: ${schoolName} · Grupo: ${groupName}
Espacio / Asignatura: ${subjectName} · Docente referente: ${teacherName}
Modalidad acordada para el celular en clase: ${classroomStorage}

1. EL/LA DOCENTE (${teacherName.toUpperCase()}) SE COMPROMETE A:
${teacherCommitments.filter(c => c.active).map((c, i) => `${i + 1}. ${c.text}`).join('\n')}

2. LOS/AS ESTUDIANTES DEL GRUPO (${groupName.toUpperCase()}) NOS COMPROMETEMOS A:
${studentCommitments.filter(c => c.active).map((c, i) => `${i + 1}. ${c.text}`).join('\n')}

3. PAUTAS DE CONVIVENCIA Y REVISIÓN ÁULICA:
${defaultClassroomReviewClauses.map((b) => `- ${b}`).join('\n')}

Firmado en Uruguay, a los ______ días del mes de ____________ de 2026.
Firma del/de la Docente: __________________   Firmas de Delegados/as y Grupo: __________________`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-slate-200" id="protocolo-acuerdo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Agreement Mode Switcher */}
        <div className="text-center max-w-3xl mx-auto space-y-4 no-print">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Acuerdos personalizables e imprimibles en PDF</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {agreementMode === 'familiar'
              ? 'Protocolo de entrega y acuerdo familiar'
              : 'Contrato pedagógico de convivencia digital en el aula'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {agreementMode === 'familiar'
              ? 'El celular no es un regalo sorpresa que se entrega en una caja y listo. Personalizá los compromisos tanto del hijo/a como de los padres y firmalo en familia.'
              : 'Construí junto a tus estudiantes un acuerdo pedagógico de aula donde tanto el/la docente como el grupo asumen compromisos claros de respeto, atención y uso con sentido educativo.'}
          </p>

          {/* Switcher between Family Agreement & Classroom Pedagogical Contract */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setAgreementMode('familiar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                agreementMode === 'familiar'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>🏠 Acuerdo Familiar (Padres e Hijos/as)</span>
            </button>
            <button
              onClick={() => setAgreementMode('aula')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                agreementMode === 'aula'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>🏫 Contrato Pedagógico de Aula (Docente y Estudiantes)</span>
            </button>
          </div>
        </div>

        {/* 4 Protocol Steps (Contextual to Mode) - NO-PRINT */}
        {agreementMode === 'familiar' ? (
          <div key="steps-familiar" className="grid grid-cols-2 lg:grid-cols-4 gap-3 no-print tab-panel-transition stagger-grid">
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
                Poner Family Link o Tiempo de Uso, horario de apagado y sin tarjetas guardadas antes de que tu hijo/a lo estrene.
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
                Personalizar los compromisos del hijo/a y de los padres, imprimir el pacto y firmarlo juntos en casa.
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
        ) : (
          <div key="steps-aula" className="grid grid-cols-2 lg:grid-cols-4 gap-3 no-print tab-panel-transition stagger-grid">
            <div className="bg-purple-50/60 rounded-2xl p-3.5 sm:p-4 border border-purple-200 relative">
              <span className="bg-purple-700 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
                PASO 1 · AULA
              </span>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
                Debatir con el grupo
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                Conversar en los primeros días de clase o en hora de tutoría sobre cómo nos afecta la distracción constante.
              </p>
            </div>

            <div className="bg-purple-50/60 rounded-2xl p-3.5 sm:p-4 border border-purple-200 relative">
              <span className="bg-purple-700 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
                PASO 2 · AULA
              </span>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
                Compromiso docente
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                El contrato pedagógico es recíproco: el/la docente también se compromete a dar el ejemplo y cuidar la privacidad.
              </p>
            </div>

            <div className="bg-purple-50/60 rounded-2xl p-3.5 sm:p-4 border border-purple-200 relative">
              <span className="bg-purple-700 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
                PASO 3 · AULA
              </span>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
                Sumar reglas de la clase
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                Agregar los compromisos propuestos por los propios estudiantes y por el docente e imprimir una copia para la cartelera.
              </p>
            </div>

            <div className="bg-purple-50/60 rounded-2xl p-3.5 sm:p-4 border border-purple-200 relative">
              <span className="bg-purple-700 text-white font-black text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5">
                PASO 4 · AULA
              </span>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 mb-1">
                Evaluar a mitad de año
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                Revisar el acuerdo junto al grupo y adscripción para celebrar avances y reajustar lo que haga falta.
              </p>
            </div>
          </div>
        )}

        {/* Mobile View Switcher (Editor vs Previsualización) */}
        <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl no-print max-w-xs mx-auto">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'editor' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>1. Personalizar</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'preview' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>2. Ver documento</span>
          </button>
        </div>

        {/* Contract Workspace (Form vs Preview) */}
        <div key={agreementMode} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start tab-panel-transition">
          
          {/* Left Column: Form & Clauses (5 cols) */}
          <div className={`lg:col-span-5 bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 space-y-5 no-print ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}>
            {agreementMode === 'familiar' ? (
              <>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-indigo-600" />
                    <span>Personalizar acuerdo familiar</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ajustá nombres, horarios y sumá compromisos propios tanto del hijo/a como de los padres.
                  </p>
                </div>

                {/* Family Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del hijo/a:</label>
                    <input
                      type="text"
                      value={kidName}
                      onChange={(e) => setKidName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Ej: Joaquín, Valentina..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Padres / Adultos responsables:</label>
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

                {/* 1. Kid Commitments Checklist + Custom Input */}
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <span className="text-xs uppercase font-extrabold text-indigo-900 tracking-wider flex items-center justify-between">
                    <span>1. Compromisos de {kidName || 'el/la hijo/a'}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {kidCommitments.filter(c => c.active).length} activos
                    </span>
                  </span>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
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
                            onClick={(e) => { e.stopPropagation(); handleRemoveCustomKidRule(clause.id); }}
                            className="text-slate-400 hover:text-red-500 ml-1"
                            title="Eliminar compromiso personalizado"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add custom kid commitment */}
                  <form onSubmit={handleAddCustomKidRule} className="pt-1.5 space-y-1">
                    <label className="block text-[11px] font-bold text-indigo-800">
                      + Agregar compromiso personalizado por parte de {kidName || 'el/la hijo/a'}:
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={customKidRuleText}
                        onChange={(e) => setCustomKidRuleText(e.target.value)}
                        placeholder="Ej: Avisar por WhatsApp cuando llego al club..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shrink-0 inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Sumar</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* 2. Parent Commitments Checklist + Custom Input */}
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <span className="text-xs uppercase font-extrabold text-purple-900 tracking-wider flex items-center justify-between">
                    <span>2. Compromisos de los padres ({parentsNames || 'Adultos'})</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {parentCommitments.filter(c => c.active).length} activos
                    </span>
                  </span>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
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
                        {clause.isCustom && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRemoveCustomParentRule(clause.id); }}
                            className="text-slate-400 hover:text-red-500 ml-1"
                            title="Eliminar compromiso personalizado de los padres"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add custom parent commitment */}
                  <form onSubmit={handleAddCustomParentRule} className="pt-1.5 space-y-1">
                    <label className="block text-[11px] font-bold text-purple-800">
                      + Agregar compromiso personalizado por parte de los padres ({parentsNames || 'adultos'}):
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={customParentRuleText}
                        onChange={(e) => setCustomParentRuleText(e.target.value)}
                        placeholder="Ej: Dejar nuestros celulares cargando fuera del cuarto..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-purple-700 text-white rounded-lg text-xs font-bold hover:bg-purple-800 shrink-0 inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Sumar</span>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              /* --- CLASSROOM PEDAGOGICAL CONTRACT EDITOR --- */
              <>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-700" />
                    <span>Personalizar contrato pedagógico de aula</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Completá los datos del grupo y personalizá los compromisos del docente y de los estudiantes.
                  </p>
                </div>

                {/* Classroom Inputs */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Centro educativo:</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Ej: Liceo N° 1 / Escuela..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Grupo / Clase:</label>
                      <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Ej: 8° 2 EBI / 6° Año B"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Docente / Referente:</label>
                      <input
                        type="text"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Ej: Prof. Laura Gómez"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Asignatura o Espacio:</label>
                      <input
                        type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Ej: Informática / Tutoría"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Modalidad de resguardo durante la clase:</label>
                    <input
                      type="text"
                      value={classroomStorage}
                      onChange={(e) => setClassroomStorage(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Ej: En silencio dentro de la mochila / Organizador del aula"
                    />
                  </div>
                </div>

                {/* 1. Teacher Commitments Checklist + Custom Input */}
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <span className="text-xs uppercase font-extrabold text-purple-900 tracking-wider flex items-center justify-between">
                    <span>1. El/la docente se compromete a...</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {teacherCommitments.filter(c => c.active).length} activos
                    </span>
                  </span>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {teacherCommitments.map((clause) => (
                      <div
                        key={clause.id}
                        onClick={() => toggleTeacherCommitment(clause.id)}
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
                        {clause.isCustom && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRemoveCustomTeacherRule(clause.id); }}
                            className="text-slate-400 hover:text-red-500 ml-1"
                            title="Eliminar compromiso personalizado del docente"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add custom teacher commitment */}
                  <form onSubmit={handleAddCustomTeacherRule} className="pt-1.5 space-y-1">
                    <label className="block text-[11px] font-bold text-purple-800">
                      + Agregar compromiso personalizado por parte del/de la docente:
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={customTeacherRuleText}
                        onChange={(e) => setCustomTeacherRuleText(e.target.value)}
                        placeholder="Ej: Dedicar los últimos 5 min a dudas o agenda..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-purple-700 text-white rounded-lg text-xs font-bold hover:bg-purple-800 shrink-0 inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Sumar</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* 2. Students Commitments Checklist + Custom Input */}
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <span className="text-xs uppercase font-extrabold text-indigo-900 tracking-wider flex items-center justify-between">
                    <span>2. Los/as estudiantes se comprometen a...</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {studentCommitments.filter(c => c.active).length} activos
                    </span>
                  </span>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {studentCommitments.map((clause) => (
                      <div
                        key={clause.id}
                        onClick={() => toggleStudentCommitment(clause.id)}
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
                            onClick={(e) => { e.stopPropagation(); handleRemoveCustomStudentRule(clause.id); }}
                            className="text-slate-400 hover:text-red-500 ml-1"
                            title="Eliminar compromiso personalizado de los estudiantes"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add custom student commitment */}
                  <form onSubmit={handleAddCustomStudentRule} className="pt-1.5 space-y-1">
                    <label className="block text-[11px] font-bold text-indigo-800">
                      + Agregar compromiso personalizado por parte de los/as estudiantes:
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={customStudentRuleText}
                        onChange={(e) => setCustomStudentRuleText(e.target.value)}
                        placeholder="Ej: Ayudar al compañero que faltó pasándole la tarea..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shrink-0 inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Sumar</span>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* Mobile: button to jump to preview */}
            <div className="pt-2 lg:hidden">
              <button
                onClick={() => setMobileTab('preview')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Ver documento final para imprimir</span>
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
                <span>
                  {agreementMode === 'familiar'
                    ? 'Vista previa · Pacto familiar imprimible'
                    : 'Vista previa · Contrato pedagógico de aula'}
                </span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar texto'}</span>
                </button>

                <button
                  onClick={handleCelebrate}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{signedCelebration ? '¡Acordado!' : 'Celebrar'}</span>
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
            {agreementMode === 'familiar' ? (
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
                    1. {kidName || 'El/la hijo/a'} se compromete a:
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
                    2. Los padres / adultos ({parentsNames || 'Adultos responsables'}) nos comprometemos a:
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
                  <span>Modelo SERC · Prof. Esp. Santiago Hernández</span>
                  <span>•</span>
                  <span>Uruguay Educa DGES</span>
                  <span>•</span>
                  <span>AGESIC Ciudadanía Digital</span>
                </div>

              </div>
            ) : (
              /* --- CLASSROOM PEDAGOGICAL CONTRACT PRINTABLE SHEET --- */
              <div className="print-contract bg-white border-2 border-slate-300 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden text-slate-900">
                
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 mb-4 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-purple-800">
                    <span>🇺🇾 Uruguay</span>
                    <span>·</span>
                    <span>Convivencia y Ciudadanía Digital en el Aula</span>
                  </div>
                  <h2 className="font-heading text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                    Contrato pedagógico de uso responsable del celular
                  </h2>
                  <p className="text-[11px] text-slate-600 italic">
                    "Acuerdo recíproco de atención, respeto y aprendizaje entre docente y estudiantes"
                  </p>
                </div>

                {/* Preamble */}
                <div className="text-xs text-slate-700 leading-relaxed space-y-1.5 mb-5 bg-purple-50/50 p-3.5 rounded-xl border border-purple-200">
                  <p>
                    En el centro educativo <strong className="text-slate-900">{schoolName || 'Institución Educativa'}</strong>, el grupo{' '}
                    <strong className="text-slate-900">{groupName || 'Grupo'}</strong> y{' '}
                    <strong className="text-slate-900">{teacherName || 'el/la Docente'}</strong> (espacio <strong className="text-slate-900">{subjectName || 'Aula'}</strong>) acuerdan las siguientes pautas de convivencia digital.
                  </p>
                  <p>
                    Durante las clases, la modalidad habitual para los dispositivos personales será: <strong className="text-slate-900">{classroomStorage}</strong>, habilitándose su uso cuando la actividad pedagógica así lo requiera.
                  </p>
                </div>

                {/* 1. Teacher commitments */}
                <div className="mb-4 space-y-1.5">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-purple-900 border-b border-purple-100 pb-0.5">
                    1. El/la docente ({teacherName || 'Docente'}) se compromete a:
                  </h4>
                  <div className="space-y-1">
                    {teacherCommitments.filter(c => c.active).map((c, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-800 leading-snug">
                        <span className="font-bold text-purple-700 shrink-0">{idx + 1}.</span>
                        <span>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Students commitments */}
                <div className="mb-4 space-y-1.5">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-0.5">
                    2. Los/as estudiantes del grupo ({groupName || 'Estudiantes'}) nos comprometemos a:
                  </h4>
                  <div className="space-y-1">
                    {studentCommitments.filter(c => c.active).map((c, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-800 leading-snug">
                        <span className="font-bold text-indigo-700 shrink-0">{idx + 1}.</span>
                        <span>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Classroom Review */}
                <div className="mb-6 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[10px] sm:text-[11px] text-amber-950 space-y-0.5">
                  <span className="font-bold tracking-wider block text-amber-900">3. Seguimiento y corresponsabilidad en el aula</span>
                  {defaultClassroomReviewClauses.map((clause, idx) => (
                    <p key={idx}>• {clause}</p>
                  ))}
                </div>

                {/* Signatures */}
                <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-6 text-center mt-4">
                  <div className="space-y-1">
                    <div className="h-8 border-b border-dashed border-slate-400 mx-2" />
                    <p className="text-xs font-bold text-slate-900 uppercase">{teacherName || 'Firma Docente / Tutor/a'}</p>
                    <p className="text-[9px] text-slate-500">"Me comprometo a enseñar con el ejemplo y el diálogo"</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-8 border-b border-dashed border-slate-400 mx-2" />
                    <p className="text-xs font-bold text-slate-900 uppercase">Representantes / Grupo {groupName}</p>
                    <p className="text-[9px] text-slate-500">"Nos comprometemos a cuidar la atención y la convivencia"</p>
                  </div>
                </div>

                {/* Stamp */}
                <div className="mt-6 text-center text-[9px] text-slate-400 flex items-center justify-center gap-2">
                  <span>Contrato Pedagógico · Prof. Esp. Santiago Hernández</span>
                  <span>•</span>
                  <span>Uruguay Educa DGES</span>
                  <span>•</span>
                  <span>ANEP · AGESIC</span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
