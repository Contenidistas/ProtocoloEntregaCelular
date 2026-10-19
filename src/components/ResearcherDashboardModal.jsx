import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  getResearchRecords,
  getResearchConfig,
  saveResearchConfig,
  verifyResearcherPassword,
  loadSampleResearchData,
  clearAllResearchRecords,
  deleteSingleResearchRecord,
  importResearchRecordsFromJson,
  computeResearchAnalytics,
  exportResearchToCSV,
  generateAcademicCodebookMarkdown
} from '../utils/researchStorage';
import {
  Lock,
  Unlock,
  X,
  Download,
  Upload,
  Database,
  BarChart3,
  FileSpreadsheet,
  BookOpen,
  QrCode,
  Settings,
  Trash2,
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  MessageSquareQuote,
  Cloud,
  Filter,
  KeyRound
} from 'lucide-react';

export default function ResearcherDashboardModal({ isOpen, onClose, onOpenSurvey }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('analytics'); // 'analytics' | 'records' | 'qr_workshop' | 'export_cloud'

  const [records, setRecords] = useState([]);
  const [cohortFilter, setCohortFilter] = useState('ALL');
  const [config, setConfig] = useState(() => getResearchConfig());
  const [newPassword, setNewPassword] = useState('');
  const [webhookInput, setWebhookInput] = useState('');
  const [workshopCodeInput, setWorkshopCodeInput] = useState('TALLER-FAMILIAS');
  const [statusBanner, setStatusBanner] = useState('');
  const [copiedApa, setCopiedApa] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadedRecords = getResearchRecords();
      const loadedConfig = getResearchConfig();
      setRecords(loadedRecords);
      setConfig(loadedConfig);
      setWebhookInput(loadedConfig.cloudWebhookUrl || '');
      setWorkshopCodeInput(
        loadedConfig.activeWorkshopCode && loadedConfig.activeWorkshopCode !== 'WEB-PUBLICA'
          ? loadedConfig.activeWorkshopCode
          : 'TALLER-FAMILIAS'
      );
    }
  }, [isOpen]);

  const filteredRecords = useMemo(() => {
    if (!Array.isArray(records)) return [];
    if (cohortFilter === 'ALL') return records;
    return records.filter(r => (r.workshopCode || 'WEB-PUBLICA') === cohortFilter);
  }, [records, cohortFilter]);

  const analytics = useMemo(() => computeResearchAnalytics(filteredRecords), [filteredRecords]);
  const allCohorts = useMemo(() => computeResearchAnalytics(records).cohorts || [], [records]);

  // Automatic APA 7 Draft Paragraph based on live data
  const apaDraftText = useMemo(() => {
    if (!analytics || analytics.n === 0) {
      return 'Aún no hay registros en la muestra seleccionada para redactar el resumen estadístico. Podés cargar la muestra de prueba (N=8) con el botón superior para previsualizar este texto automático en formato APA 7.';
    }
    const topMotive = [...(analytics.frequencies?.motivo_principal_entrega || [])].sort((a, b) => b.count - a.count)[0];
    const topActivity = (analytics.frequencies?.actividades_percibidas || [])[0];
    const topImpact = (analytics.frequencies?.impacto_fisico_emocional || [])[0];
    const topConcern = [...(analytics.frequencies?.principal_preocupacion || [])].sort((a, b) => b.count - a.count)[0];

    return `En una muestra de N = ${analytics.n} referentes familiares en Uruguay (edad media de los hijos/as M = ${analytics.childAgeStats?.mean ?? 0} años, DE = ${analytics.childAgeStats?.sd ?? 0}), la edad promedio reportada o proyectada para la entrega del primer smartphone propio fue de M = ${analytics.firstPhoneAgeStats?.mean ?? 0} años (DE = ${analytics.firstPhoneAgeStats?.sd ?? 0}; Mdn = ${analytics.firstPhoneAgeStats?.median ?? 0}). Entre quienes ya entregaron el dispositivo, la edad media de acceso fue de M = ${analytics.alreadyHasPhoneAgeStats?.mean ?? 0} años (DE = ${analytics.alreadyHasPhoneAgeStats?.sd ?? 0}), mientras que las familias en etapa previa planifican la entrega a una media de M = ${analytics.plannedPhoneAgeStats?.mean ?? 0} años. El motivo principal de entrega más frecuente fue "${topMotive?.label || '-'}" (${topMotive?.percentage || 0}%). Respecto a la percepción parental del tiempo en pantalla recreativo, el ${analytics.unknownScreenTimePct ?? 0}% de las familias manifestó desconocer la cantidad de horas de consumo; entre quienes lograron estimarlo, el promedio fue de M = ${analytics.weekdayHoursStats?.mean ?? 0} horas diarias (DE = ${analytics.weekdayHoursStats?.sd ?? 0}) de lunes a viernes y M = ${analytics.weekendHoursStats?.mean ?? 0} horas diarias (DE = ${analytics.weekendHoursStats?.sd ?? 0}) los fines de semana, destacándose como principal actividad percibida "${topActivity?.label || '-'}" (${topActivity?.percentage || 0}%). En relación con los efectos psicofísicos observados (postura, visión, aislamiento y manejo de la ira en juegos en línea), el síntoma más reportado fue "${topImpact?.label || '-'}" (${topImpact?.percentage || 0}%). Finalmente, solo el ${analytics.activeParentalControlPct ?? 0}% utiliza controles parentales técnicos de forma activa (certeza media de supervisión M = ${analytics.certaintyStats?.mean ?? 0}/5, DE = ${analytics.certaintyStats?.sd ?? 0}), en el ${analytics.sleepsInBedroomPct ?? 0}% de los hogares el dispositivo permanece dentro del dormitorio durante la noche, y la mayor preocupación familiar fue "${topConcern?.label || '-'}" (${topConcern?.percentage || 0}%).`;
  }, [analytics]);

  if (!isOpen) return null;

  const showTempBanner = (msg) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(''), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyResearcherPassword(passwordInput.trim())) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Contraseña incorrecta. Verificá tu clave de investigador.');
    }
  };

  const handleLoadSample = () => {
    const updated = loadSampleResearchData();
    setRecords(updated);
    showTempBanner('Se cargaron 8 registros simulados de Uruguay para pruebas estadísticas.');
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de eliminar todos los registros guardados en este navegador? Asegurate de haber descargado el CSV o JSON antes.')) {
      const updated = clearAllResearchRecords();
      setRecords(updated);
      setCohortFilter('ALL');
      showTempBanner('Base de datos local vaciada correctamente.');
    }
  };

  const handleDeleteRecord = (id) => {
    const updated = deleteSingleResearchRecord(id);
    setRecords(updated);
  };

  const handleDownloadCSV = (numericMode = false) => {
    const csvContent = exportResearchToCSV(filteredRecords, numericMode);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const suffix = numericMode ? 'codificado_SPSS_R' : 'etiquetas_Excel';
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `estudio_primer_celular_uy_${suffix}_${dateStr}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCodebook = () => {
    const md = generateAcademicCodebookMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diccionario_variables_codebook_primer_celular_uy.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(filteredRecords, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo_investigacion_primer_celular_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const res = importResearchRecordsFromJson(ev.target.result);
        setRecords(getResearchRecords());
        showTempBanner(`Importación exitosa: ${res.added} registros nuevos añadidos (Total: ${res.total}).`);
      } catch (err) {
        alert('Error al importar el archivo JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveCloudAndPassword = (e) => {
    e.preventDefault();
    const updates = {
      cloudWebhookUrl: webhookInput.trim(),
      activeWorkshopCode: workshopCodeInput.trim().toUpperCase() || 'WEB-PUBLICA'
    };
    if (newPassword.trim().length >= 4) {
      updates.password = newPassword.trim();
    }
    const updatedCfg = saveResearchConfig(updates);
    setConfig(updatedCfg);
    setNewPassword('');
    showTempBanner('Configuración de investigador guardada correctamente.');
  };

  const handleCopyApa = () => {
    navigator.clipboard.writeText(apaDraftText);
    setCopiedApa(true);
    setTimeout(() => setCopiedApa(false), 2500);
  };

  const googleAppsScriptSnippet = `// Pegar en Extensiones > Apps Script dentro de una planilla Google Sheets nueva
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "ID", "Fecha_ISO", "Consentimiento", "Codigo_Taller", "Parentesco",
      "Region", "Centro_Educativo", "Edad_Hijo", "Genero_Hijo", "Estado_Celular",
      "Edad_1er_Celular", "Edad_Internet", "Otros_Dispositivos", "Motivo_Entrega",
      "Horas_LunVie", "Horas_Finde", "Actividades_Percibidas", "Certeza_1a5",
      "Control_Parental", "Lugar_Dormir_Celular", "Frecuencia_Conflictos",
      "Impacto_Fisico_Emocional", "Principal_Preocupacion", "Relato_Cualitativo"
    ]);
  }
  sheet.appendRow([
    data.id, data.timestamp, data.consentAccepted, data.workshopCode, data.parentesco,
    data.departamento_region, data.tipo_centro, data.edad_hijo, data.genero_hijo, data.estado_celular,
    data.edad_primer_celular, data.edad_acceso_internet, (data.otros_dispositivos || []).join(";"),
    data.motivo_principal_entrega, data.horas_semana, data.horas_fin_semana,
    (data.actividades_percibidas || []).join(";"), data.certeza_supervision,
    data.uso_control_parental, data.lugar_dormir_celular, data.frecuencia_conflictos,
    (data.impacto_fisico_emocional || []).join(";"), data.principal_preocupacion, data.comentario_abierto || ""
  ]);
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
}`;

  const originUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const surveyShareUrl = `${originUrl}?taller=${encodeURIComponent(workshopCodeInput.trim().toUpperCase() || 'TALLER')}#encuesta`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-6">
      <div className="bg-white text-slate-800 rounded-3xl max-w-6xl w-full mx-auto my-2 sm:my-6 shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Modal Header (Sticky inside scroll) */}
        <div className="px-5 sm:px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading font-extrabold text-sm sm:text-lg text-white">
                  Perfil de Investigador · Base de Datos Anónima
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                  Ley N° 18.331 UY
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Prof. Esp. Santiago Hernández · Relevamiento sobre Percepciones Familiares y Primer Celular
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Cerrar panel de investigador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* PASSWORD LOGIN GATE                                                 */}
        {/* ------------------------------------------------------------------- */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 max-w-md mx-auto w-full space-y-6 text-center bg-white">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <KeyRound className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-heading text-xl font-extrabold text-slate-900">
                Acceso protegido por contraseña
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingresá tu clave de investigador para visualizar las estadísticas descriptivas, tablas de contingencia y exportar la matriz de datos (CSV / SPSS / R).
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña del perfil investigador
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Ingresá la contraseña..."
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-indigo-600 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Clave inicial por defecto: <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold">investiga2026</code> (podés cambiarla dentro del panel).
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-sm transition-all"
              >
                Desbloquear Perfil de Investigador
              </button>
            </form>
          </div>
        ) : (
          /* ------------------------------------------------------------------- */
          /* AUTHENTICATED RESEARCHER DASHBOARD (Natural block flow, no collapse)*/
          /* ------------------------------------------------------------------- */
          <div className="bg-white text-slate-800">
            
            {/* Sub-navigation bar & Cohort filter */}
            <div className="px-4 sm:px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('analytics')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === 'analytics'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Resultados y Cruces (Paper)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('records')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === 'records'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Matriz y Voces ({filteredRecords.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('qr_workshop')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === 'qr_workshop'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR para Talleres</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('export_cloud')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === 'export_cloud'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Exportar (SPSS/CSV) y Nube</span>
                </button>
              </div>

              {/* Cohort Filter & Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 font-medium">Cohorte:</span>
                  <select
                    value={cohortFilter}
                    onChange={(e) => setCohortFilter(e.target.value)}
                    className="font-bold text-slate-800 bg-transparent focus:outline-none"
                  >
                    <option value="ALL">Todas ({records.length})</option>
                    {allCohorts.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.count})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadCSV(false)}
                  disabled={filteredRecords.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {statusBanner && (
              <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
                <span>✓ {statusBanner}</span>
                <button type="button" onClick={() => setStatusBanner('')} className="text-emerald-700 underline">
                  cerrar
                </button>
              </div>
            )}

            {/* Main Content Body */}
            <div className="p-4 sm:p-6 space-y-6">
              
              {/* Empty State Helper if 0 records */}
              {records.length === 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-base text-slate-900">
                      La base de datos está lista para recibir respuestas
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                      Todavía no hay encuestas guardadas en este navegador. Podés cargar una <strong>muestra simulada de Uruguay (N = 8)</strong> con un clic para explorar las tablas de contingencia, los gráficos, el redactor APA y probar la exportación a Excel/SPSS.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Cargar muestra de prueba (N=8)</span>
                    </button>
                    {onOpenSurvey && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenSurvey();
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"
                      >
                        <span>Ir a la encuesta</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* =============================================================== */}
              {/* SUBTAB 1: ANALYTICS & CROSS-TABS FOR ACADEMIC ARTICLE           */}
              {/* =============================================================== */}
              {activeSubTab === 'analytics' && (
                <div className="space-y-6">
                  
                  {/* Top Summary KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Muestra Válida (N)</span>
                      <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                        {analytics.n}
                      </div>
                      <span className="text-[11px] text-emerald-400 block">
                        100% Consentimiento Ley 18.331
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Edad 1er Celular</span>
                      <div className="text-xl sm:text-2xl font-heading font-extrabold text-indigo-700">
                        {analytics.firstPhoneAgeStats?.mean ?? 0} años
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        DE = {analytics.firstPhoneAgeStats?.sd ?? 0} · Mediana = {analytics.firstPhoneAgeStats?.median ?? 0}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Pantalla Lun-Vie vs Finde</span>
                      <div className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                        {analytics.weekdayHoursStats?.mean ?? 0}h <span className="text-slate-400 text-sm">/</span> {analytics.weekendHoursStats?.mean ?? 0}h
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        No tiene idea: <strong>{analytics.unknownScreenTimePct ?? 0}%</strong> ({analytics.unknownScreenTimeCount ?? 0})
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Duerme en el Cuarto</span>
                      <div className="text-xl sm:text-2xl font-heading font-extrabold text-amber-600">
                        {analytics.sleepsInBedroomPct ?? 0}%
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Fuera del cuarto: {analytics.sleepsOutsidePct ?? 0}%
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Control Parental Activo</span>
                      <div className="text-xl sm:text-2xl font-heading font-extrabold text-emerald-700">
                        {analytics.activeParentalControlPct ?? 0}%
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        No sabe configurarlo: {analytics.doesntKnowControlPct ?? 0}%
                      </span>
                    </div>
                  </div>

                  {/* Key Comparison: Real Age of Delivery vs Planned Age */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                        Hallazgo 1: Edad real de entrega vs. Edad proyectada (Intención parental)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Comparación entre familias que <strong>ya entregaron el celular</strong> y la edad a la que planean entregarlo quienes <strong>aún no lo hicieron</strong>:
                      </p>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                          <span className="text-[11px] font-bold text-indigo-800 uppercase">Ya tienen celular (n={analytics.alreadyHasPhoneAgeStats?.count ?? 0})</span>
                          <div className="text-xl font-heading font-extrabold text-indigo-950 mt-1">
                            M = {analytics.alreadyHasPhoneAgeStats?.mean ?? 0} años
                          </div>
                          <span className="text-[11px] text-indigo-700">
                            DE = {analytics.alreadyHasPhoneAgeStats?.sd ?? 0} (Rango {analytics.alreadyHasPhoneAgeStats?.min ?? 0}–{analytics.alreadyHasPhoneAgeStats?.max ?? 0})
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                          <span className="text-[11px] font-bold text-emerald-800 uppercase">Aún sin celular (n={analytics.plannedPhoneAgeStats?.count ?? 0})</span>
                          <div className="text-xl font-heading font-extrabold text-emerald-950 mt-1">
                            M = {analytics.plannedPhoneAgeStats?.mean ?? 0} años
                          </div>
                          <span className="text-[11px] text-emerald-700">
                            DE = {analytics.plannedPhoneAgeStats?.sd ?? 0} (Rango {analytics.plannedPhoneAgeStats?.min ?? 0}–{analytics.plannedPhoneAgeStats?.max ?? 0})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contingency Table: Bedroom Phone vs Conflict */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                        Hallazgo 2: Cruce Lugar donde duerme el celular × Conflictos diarios
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-500">
                              <th className="py-2 pr-2 font-bold">Ubicación nocturna</th>
                              <th className="py-2 px-2 font-bold text-center">n</th>
                              <th className="py-2 px-2 font-bold text-amber-700">Conflicto alto/diario</th>
                              <th className="py-2 pl-2 font-bold text-emerald-700">Conflicto bajo/ocasional</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {(analytics.sleepVsConflictTable || []).map((row, i) => (
                              <tr key={i}>
                                <td className="py-2 pr-2 font-medium text-slate-800">{row.category}</td>
                                <td className="py-2 px-2 text-center font-mono text-slate-500">{row.total}</td>
                                <td className="py-2 px-2 font-bold text-amber-700">
                                  {row.highConflictPct}% ({row.highConflictCount})
                                </td>
                                <td className="py-2 pl-2 font-bold text-emerald-700">
                                  {row.lowConflictPct}% ({row.lowConflictCount})
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Frequency Distributions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Motivo principal de entrega */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <h4 className="font-heading font-extrabold text-sm text-slate-900">
                        Motivo principal de entrega del primer celular
                      </h4>
                      <div className="space-y-2.5">
                        {(analytics.frequencies?.motivo_principal_entrega || []).map((item) => (
                          <div key={item.value} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-700 font-medium truncate pr-2">{item.label}</span>
                              <span className="font-mono font-bold text-slate-900 shrink-0">
                                {item.percentage}% ({item.count})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actividades percibidas por los padres */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <h4 className="font-heading font-extrabold text-sm text-slate-900">
                        Actividades percibidas por los padres (Respuesta múltiple)
                      </h4>
                      <div className="space-y-2.5">
                        {(analytics.frequencies?.actividades_percibidas || []).map((item) => (
                          <div key={item.value} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-700 font-medium truncate pr-2">{item.label}</span>
                              <span className="font-mono font-bold text-slate-900 shrink-0">
                                {item.percentage}% ({item.count})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-sky-600 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Principal preocupación familiar */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <h4 className="font-heading font-extrabold text-sm text-slate-900">
                        Principal preocupación de las familias
                      </h4>
                      <div className="space-y-2.5">
                        {(analytics.frequencies?.principal_preocupacion || []).map((item) => (
                          <div key={item.value} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-700 font-medium truncate pr-2">{item.label}</span>
                              <span className="font-mono font-bold text-slate-900 shrink-0">
                                {item.percentage}% ({item.count})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-600 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Otros dispositivos en el hogar */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <h4 className="font-heading font-extrabold text-sm text-slate-900">
                        Ecosistema de dispositivos en el hogar (Respuesta múltiple)
                      </h4>
                      <div className="space-y-2.5">
                        {(analytics.frequencies?.otros_dispositivos || []).map((item) => (
                          <div key={item.value} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-700 font-medium truncate pr-2">{item.label}</span>
                              <span className="font-mono font-bold text-slate-900 shrink-0">
                                {item.percentage}% ({item.count})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-600 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impacto físico y emocional observado (Postura, visión, ira en juegos, aislamiento) */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 md:col-span-2">
                      <h4 className="font-heading font-extrabold text-sm text-slate-900">
                        Efectos físicos, posturales, visuales y manejo de la ira observados (Respuesta múltiple)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {(analytics.frequencies?.impacto_fisico_emocional || []).map((item) => (
                          <div key={item.value} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-700 font-medium truncate pr-2">{item.label}</span>
                              <span className="font-mono font-bold text-slate-900 shrink-0">
                                {item.percentage}% ({item.count})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Auto-generated APA 7 Results Paragraph */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-heading font-extrabold text-sm text-slate-900">
                          Borrador automático de Resultados Descriptivos (Estilo APA 7)
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyApa}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors"
                      >
                        {copiedApa ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedApa ? '¡Copiado al portapapeles!' : 'Copiar párrafo APA'}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 font-serif">
                      {apaDraftText}
                    </p>
                  </div>

                </div>
              )}

              {/* =============================================================== */}
              {/* SUBTAB 2: RAW RECORDS TABLE & QUALITATIVE VOICES                */}
              {/* =============================================================== */}
              {activeSubTab === 'records' && (
                <div className="space-y-6">
                  
                  {/* Qualitative Voices Section */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <MessageSquareQuote className="w-5 h-5 text-indigo-600" />
                      <span>Relatos y preocupaciones abiertas de las familias ({(analytics.qualitativeQuotes || []).length})</span>
                    </h4>
                    {(analytics.qualitativeQuotes || []).length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No hay comentarios cualitativos en la selección actual.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(analytics.qualitativeQuotes || []).map((q) => (
                          <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                            <p className="text-xs sm:text-sm text-slate-800 italic">“{q.quote}”</p>
                            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                              <span>Hijo/a: {q.edadHijo} años · 1er Cel: {q.edadPrimerCelular} años</span>
                              <span className="font-mono">{q.workshopCode} · {q.id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Data Matrix Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-extrabold text-base text-slate-900">
                        Matriz de registros anónimos ({filteredRecords.length})
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleLoadSample}
                          className="text-xs font-bold text-indigo-600 hover:underline"
                        >
                          + Añadir muestra simulada
                        </button>
                        {records.length > 0 && (
                          <button
                            type="button"
                            onClick={handleClearAll}
                            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline ml-3"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Vaciar todo</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3 font-bold">ID / Fecha</th>
                            <th className="py-2.5 px-3 font-bold">Cohorte</th>
                            <th className="py-2.5 px-3 font-bold">Hijo/a</th>
                            <th className="py-2.5 px-3 font-bold">1er Celular</th>
                            <th className="py-2.5 px-3 font-bold">Motivo</th>
                            <th className="py-2.5 px-3 font-bold">Horas L-V / Finde</th>
                            <th className="py-2.5 px-3 font-bold">Dormir</th>
                            <th className="py-2.5 px-3 font-bold text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {filteredRecords.map((r) => (
                            <tr key={r.id} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-mono text-[11px]">
                                <div className="font-bold text-slate-800">{r.id}</div>
                                <div className="text-slate-400">{r.timestamp?.slice(0, 10)}</div>
                              </td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                                  {r.workshopCode || 'WEB-PUBLICA'}
                                </span>
                              </td>
                              <td className="py-2.5 px-3">
                                {r.edad_hijo} años ({r.genero_hijo})
                              </td>
                              <td className="py-2.5 px-3 font-bold text-indigo-700">
                                {r.edad_primer_celular} años ({r.estado_celular})
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">
                                {r.motivo_principal_entrega}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">
                                {r.horas_semana} / {r.horas_fin_semana}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">
                                {r.lugar_dormir_celular}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRecord(r.id)}
                                  className="text-slate-400 hover:text-red-600 p-1"
                                  title="Eliminar este registro"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* =============================================================== */}
              {/* SUBTAB 3: QR CODE FOR LIVE FAMILY WORKSHOPS                     */}
              {/* =============================================================== */}
              {activeSubTab === 'qr_workshop' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Relevamiento en vivo durante talleres</span>
                      </span>
                      <h4 className="font-heading text-xl font-extrabold text-slate-900">
                        Proyectá este QR en tus talleres con familias
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Definí una etiqueta para identificar la cohorte (por ejemplo, <code className="bg-white px-1.5 py-0.5 rounded border">ESCUELA-45</code> o <code className="bg-white px-1.5 py-0.5 rounded border">LICEO-12</code>). Al escanear el código QR, las familias entrarán directo al Consentimiento Informado y sus respuestas quedarán etiquetadas con ese código sin perder el anonimato.
                      </p>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Código identificador del taller o cohorte:
                        </label>
                        <input
                          type="text"
                          value={workshopCodeInput}
                          onChange={(e) => setWorkshopCodeInput(e.target.value.toUpperCase())}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm uppercase bg-white focus:border-indigo-600 focus:outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-600 break-all">
                        {surveyShareUrl}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <QRCodeSVG
                        value={surveyShareUrl}
                        size={210}
                        level="M"
                        includeMargin={true}
                      />
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                        Cohorte: {workshopCodeInput || 'TALLER'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================== */}
              {/* SUBTAB 4: SCIENTIFIC EXPORT (SPSS/R/CSV) & CLOUD SYNC           */}
              {/* =============================================================== */}
              {activeSubTab === 'export_cloud' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Export Column */}
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                      <h4 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                        <span>Exportación para análisis estadístico</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Descargá la matriz de datos en formato CSV (con codificación UTF-8 BOM para tildes en Excel) o con códigos numéricos para importar directamente en <strong>SPSS, R, Jamovi o Python</strong>.
                      </p>

                      <div className="grid grid-cols-1 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleDownloadCSV(false)}
                          disabled={filteredRecords.length === 0}
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-between transition-colors"
                        >
                          <span>1. Descargar CSV con etiquetas (Excel / Google Sheets)</span>
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadCSV(true)}
                          disabled={filteredRecords.length === 0}
                          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-between transition-colors"
                        >
                          <span>2. Descargar CSV codificado numérico (SPSS / R / Jamovi)</span>
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadCodebook}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-between transition-colors"
                        >
                          <span>3. Descargar Diccionario de Variables / Codebook (.md)</span>
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={handleDownloadJSON}
                          disabled={filteredRecords.length === 0}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Respaldar JSON</span>
                        </button>

                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-indigo-700 hover:bg-indigo-50 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Importar / Unificar JSON</span>
                          <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Sync & Researcher Security Column */}
                  <div className="space-y-4">
                    <form onSubmit={handleSaveCloudAndPassword} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                      <h4 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-sky-600" />
                        <span>Recolección multi-dispositivo en la nube y seguridad</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Para que las respuestas enviadas por las familias desde sus propios celulares lleguen automáticamente a tu planilla central en la nube, podés pegar aquí la URL de un <strong>Webhook / Google Apps Script</strong>:
                      </p>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          URL de Webhook / Google Apps Script (Opcional)
                        </label>
                        <input
                          type="url"
                          value={webhookInput}
                          onChange={(e) => setWebhookInput(e.target.value)}
                          placeholder="https://script.google.com/macros/s/.../exec"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-indigo-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cambiar contraseña de este Perfil Investigador (Opcional)
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Dejar en blanco para mantener la actual..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-indigo-600 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                      >
                        Guardar configuración de investigador
                      </button>

                      {/* Copy-pasteable Google Sheets script */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-700">
                            Script gratuito para conectar con tu Google Sheets en 1 minuto:
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(googleAppsScriptSnippet);
                              setCopiedScript(true);
                              setTimeout(() => setCopiedScript(false), 2500);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline"
                          >
                            {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedScript ? 'Script copiado' : 'Copiar código'}</span>
                          </button>
                        </div>
                        <pre className="p-2.5 rounded-xl bg-slate-900 text-slate-200 text-[10px] font-mono overflow-x-auto max-h-32">
                          {googleAppsScriptSnippet}
                        </pre>
                      </div>
                    </form>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
