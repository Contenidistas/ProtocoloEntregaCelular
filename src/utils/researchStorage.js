import { SURVEY_BLOCKS, SAMPLE_RESEARCH_RECORDS, CONSENTIMIENTO_INFORMADO } from '../data/familyResearchSurveyData';

const STORAGE_KEY_RECORDS = 'primer_celular_research_records_v1';
const STORAGE_KEY_CONFIG = 'primer_celular_research_config_v1';
const DEFAULT_PASSWORD = 'investiga2026';

export function generateAnonymousId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return 'uy-' + crypto.randomUUID().slice(0, 12);
  }
  return 'uy-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
}

export function getResearchConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) {
      return {
        password: DEFAULT_PASSWORD,
        cloudWebhookUrl: '',
        activeWorkshopCode: 'WEB-PUBLICA',
        studyTitle: 'Percepciones Familiares sobre Uso de Pantallas y Entrega del Primer Celular en Uruguay'
      };
    }
    const parsed = JSON.parse(raw);
    return {
      password: parsed.password || DEFAULT_PASSWORD,
      cloudWebhookUrl: parsed.cloudWebhookUrl || '',
      activeWorkshopCode: parsed.activeWorkshopCode || 'WEB-PUBLICA',
      studyTitle: parsed.studyTitle || 'Percepciones Familiares sobre Uso de Pantallas y Entrega del Primer Celular en Uruguay'
    };
  } catch {
    return {
      password: DEFAULT_PASSWORD,
      cloudWebhookUrl: '',
      activeWorkshopCode: 'WEB-PUBLICA',
      studyTitle: 'Percepciones Familiares sobre Uso de Pantallas y Entrega del Primer Celular en Uruguay'
    };
  }
}

export function saveResearchConfig(newConfig) {
  const current = getResearchConfig();
  const merged = { ...current, ...newConfig };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(merged));
  return merged;
}

export function verifyResearcherPassword(inputPassword) {
  const config = getResearchConfig();
  return inputPassword === config.password;
}

export function getResearchRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveResearchRecord(answers, metadata = {}) {
  const config = getResearchConfig();
  const record = {
    id: generateAnonymousId(),
    timestamp: new Date().toISOString(),
    consentAccepted: Boolean(metadata.consentAccepted),
    consentVersion: '1.0-UY-18331',
    workshopCode: (metadata.workshopCode || config.activeWorkshopCode || 'WEB-PUBLICA').trim().toUpperCase(),
    readinessScore: metadata.readinessScore ?? null,
    ...answers
  };

  // Only persist to the research dataset if Informed Consent was accepted
  if (record.consentAccepted) {
    const existing = getResearchRecords();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(updated));

    // If a cloud webhook (e.g., Google Apps Script / Supabase / Make) is configured, send asynchronously
    if (config.cloudWebhookUrl && config.cloudWebhookUrl.startsWith('http')) {
      try {
        await fetch(config.cloudWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        });
      } catch (err) {
        console.warn('Aviso: El registro quedó guardado localmente, pero falló el envío al webhook remoto:', err);
      }
    }
  }

  return record;
}

export function loadSampleResearchData() {
  const existing = getResearchRecords();
  const existingIds = new Set(existing.map(r => r.id));
  const toAdd = SAMPLE_RESEARCH_RECORDS.filter(r => !existingIds.has(r.id));
  const combined = [...existing, ...toAdd];
  localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(combined));
  return combined;
}

export function clearAllResearchRecords() {
  localStorage.removeItem(STORAGE_KEY_RECORDS);
  return [];
}

export function deleteSingleResearchRecord(id) {
  const existing = getResearchRecords().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(existing));
  return existing;
}

export function importResearchRecordsFromJson(jsonString) {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) {
    throw new Error('El archivo JSON debe contener un arreglo de registros.');
  }
  const existing = getResearchRecords();
  const existingIds = new Set(existing.map(r => r.id));
  const newItems = parsed.filter(item => item && item.id && !existingIds.has(item.id));
  const merged = [...newItems, ...existing];
  localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(merged));
  return { total: merged.length, added: newItems.length };
}

// Helper to compute mean and SD
function computeNumericStats(numbers) {
  const valid = numbers.filter(n => typeof n === 'number' && !isNaN(n));
  if (valid.length === 0) return { count: 0, mean: 0, sd: 0, min: 0, max: 0, median: 0 };
  const sum = valid.reduce((a, b) => a + b, 0);
  const mean = sum / valid.length;
  const variance = valid.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (valid.length > 1 ? valid.length - 1 : 1);
  const sd = Math.sqrt(variance);
  const sorted = [...valid].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return {
    count: valid.length,
    mean: Number(mean.toFixed(2)),
    sd: Number(sd.toFixed(2)),
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: Number(median.toFixed(1))
  };
}

export function computeResearchAnalytics(records) {
  const n = records.length;
  const allQuestions = SURVEY_BLOCKS.flatMap(b => b.questions);

  // Numeric metrics
  const childAges = records.map(r => Number(r.edad_hijo)).filter(v => !isNaN(v));
  const firstPhoneAges = records.map(r => Number(r.edad_primer_celular)).filter(v => !isNaN(v));
  const alreadyHasPhoneAges = records
    .filter(r => r.estado_celular === 'ya_tiene')
    .map(r => Number(r.edad_primer_celular))
    .filter(v => !isNaN(v));
  const plannedPhoneAges = records
    .filter(r => r.estado_celular !== 'ya_tiene')
    .map(r => Number(r.edad_primer_celular))
    .filter(v => !isNaN(v));
  const certaintyScores = records.map(r => Number(r.certeza_supervision)).filter(v => !isNaN(v));

  // Midpoint hours estimation
  const qSemana = allQuestions.find(q => q.id === 'horas_semana');
  const qFinde = allQuestions.find(q => q.id === 'horas_fin_semana');

  const weekdayHours = records.map(r => {
    const opt = qSemana?.options?.find(o => o.value === r.horas_semana);
    return opt?.midpointHours;
  }).filter(v => typeof v === 'number');

  const weekendHours = records.map(r => {
    const opt = qFinde?.options?.find(o => o.value === r.horas_fin_semana);
    return opt?.midpointHours;
  }).filter(v => typeof v === 'number');

  // Frequency distributions per question
  const frequencies = {};
  allQuestions.forEach(q => {
    if (q.type === 'single' || q.type === 'likert') {
      const counts = {};
      (q.options || []).forEach(opt => {
        counts[opt.value] = 0;
      });
      records.forEach(r => {
        const val = r[q.id];
        if (val !== undefined && val !== null && val !== '') {
          counts[val] = (counts[val] || 0) + 1;
        }
      });
      frequencies[q.id] = (q.options || []).map(opt => ({
        value: opt.value,
        label: opt.label,
        count: counts[opt.value] || 0,
        percentage: n > 0 ? Number((((counts[opt.value] || 0) / n) * 100).toFixed(1)) : 0
      }));
    } else if (q.type === 'multiple') {
      const counts = {};
      (q.options || []).forEach(opt => {
        counts[opt.value] = 0;
      });
      records.forEach(r => {
        const arr = Array.isArray(r[q.id]) ? r[q.id] : [];
        arr.forEach(val => {
          counts[val] = (counts[val] || 0) + 1;
        });
      });
      frequencies[q.id] = (q.options || []).map(opt => ({
        value: opt.value,
        label: opt.label,
        count: counts[opt.value] || 0,
        percentage: n > 0 ? Number((((counts[opt.value] || 0) / n) * 100).toFixed(1)) : 0
      })).sort((a, b) => b.count - a.count);
    }
  });

  // Key academic indicator 1: Bedroom phone rate
  const sleepsInBedroomCount = records.filter(
    r => r.lugar_dormir_celular === 'dentro_apagado' || r.lugar_dormir_celular === 'dentro_cama'
  ).length;
  const sleepsOutsideCount = records.filter(r => r.lugar_dormir_celular === 'fuera_cuarto').length;

  // Key academic indicator 2: Mediation gap (parents who don't use active parental controls)
  const activeParentalControlCount = records.filter(r => r.uso_control_parental === 'si_activo').length;
  const doesntKnowControlCount = records.filter(r => r.uso_control_parental === 'no_desconoce').length;

  // Contingency Table: Sleep location vs. High Conflict ('frecuente' or 'muy_frecuente')
  const sleepCategories = [
    { key: 'fuera_cuarto', label: 'Duerme fuera del dormitorio' },
    { key: 'dentro_apagado', label: 'En el dormitorio (apagado/silencio)' },
    { key: 'dentro_cama', label: 'En el dormitorio (sin restricción)' }
  ];
  const sleepVsConflictTable = sleepCategories.map(cat => {
    const subset = records.filter(r => r.lugar_dormir_celular === cat.key);
    const totalSub = subset.length;
    const highConflict = subset.filter(
      r => r.frecuencia_conflictos === 'frecuente' || r.frecuencia_conflictos === 'muy_frecuente'
    ).length;
    const lowConflict = totalSub - highConflict;
    return {
      category: cat.label,
      total: totalSub,
      highConflictCount: highConflict,
      highConflictPct: totalSub > 0 ? Number(((highConflict / totalSub) * 100).toFixed(1)) : 0,
      lowConflictCount: lowConflict,
      lowConflictPct: totalSub > 0 ? Number(((lowConflict / totalSub) * 100).toFixed(1)) : 0
    };
  });

  // Qualitative quotes
  const qualitativeQuotes = records
    .filter(r => r.comentario_abierto && r.comentario_abierto.trim().length > 3)
    .map(r => ({
      id: r.id,
      date: r.timestamp?.slice(0, 10) || '',
      workshopCode: r.workshopCode || 'WEB-PUBLICA',
      edadHijo: r.edad_hijo,
      edadPrimerCelular: r.edad_primer_celular,
      estadoCelular: r.estado_celular,
      quote: r.comentario_abierto.trim()
    }));

  // Cohorts / Workshop codes
  const cohortMap = {};
  records.forEach(r => {
    const code = r.workshopCode || 'WEB-PUBLICA';
    cohortMap[code] = (cohortMap[code] || 0) + 1;
  });

  return {
    n,
    childAgeStats: computeNumericStats(childAges),
    firstPhoneAgeStats: computeNumericStats(firstPhoneAges),
    alreadyHasPhoneAgeStats: computeNumericStats(alreadyHasPhoneAges),
    plannedPhoneAgeStats: computeNumericStats(plannedPhoneAges),
    certaintyStats: computeNumericStats(certaintyScores),
    weekdayHoursStats: computeNumericStats(weekdayHours),
    weekendHoursStats: computeNumericStats(weekendHours),
    sleepsInBedroomPct: n > 0 ? Number(((sleepsInBedroomCount / n) * 100).toFixed(1)) : 0,
    sleepsOutsidePct: n > 0 ? Number(((sleepsOutsideCount / n) * 100).toFixed(1)) : 0,
    activeParentalControlPct: n > 0 ? Number(((activeParentalControlCount / n) * 100).toFixed(1)) : 0,
    doesntKnowControlPct: n > 0 ? Number(((doesntKnowControlCount / n) * 100).toFixed(1)) : 0,
    frequencies,
    sleepVsConflictTable,
    qualitativeQuotes,
    cohorts: Object.entries(cohortMap).map(([code, count]) => ({ code, count }))
  };
}

// Export CSV formatted for SPSS / R / Jamovi / Excel (UTF-8 with BOM)
export function exportResearchToCSV(records, useNumericCodes = false) {
  const allQuestions = SURVEY_BLOCKS.flatMap(b => b.questions);

  const headers = [
    'ID_ANONIMO',
    'FECHA_HORA_ISO',
    'CONSENTIMIENTO_LEY18331',
    'CODIGO_COHORTE_TALLER',
    ...allQuestions.map(q => q.code)
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = records.map(r => {
    const questionCells = allQuestions.map(q => {
      const rawVal = r[q.id];
      if (rawVal === undefined || rawVal === null) return '';

      if (q.type === 'multiple') {
        const arr = Array.isArray(rawVal) ? rawVal : [];
        if (useNumericCodes) {
          return arr.join(';');
        }
        const labels = arr.map(v => q.options?.find(o => o.value === v)?.label || v);
        return labels.join(' | ');
      }

      if (q.type === 'single') {
        const opt = q.options?.find(o => o.value === rawVal);
        if (useNumericCodes) {
          return opt?.numericCode ?? rawVal;
        }
        return opt?.label || rawVal;
      }

      return rawVal;
    });

    return [
      escapeCsv(r.id),
      escapeCsv(r.timestamp),
      escapeCsv(r.consentAccepted ? 1 : 0),
      escapeCsv(r.workshopCode || 'WEB-PUBLICA'),
      ...questionCells.map(escapeCsv)
    ].join(',');
  });

  // Add UTF-8 BOM so Excel opens Spanish accents properly
  return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
}

// Generate Academic Codebook (Diccionario de Variables) for the paper's Methodology section
export function generateAcademicCodebookMarkdown() {
  const lines = [
    `# Diccionario de Variables y Ficha Metodológica del Instrumento`,
    `**Estudio:** ${CONSENTIMIENTO_INFORMADO.subtitulo}`,
    `**Investigador Responsable:** ${CONSENTIMIENTO_INFORMADO.investigador} (${CONSENTIMIENTO_INFORMADO.contacto})`,
    `**Marco Legal y Ético:** ${CONSENTIMIENTO_INFORMADO.marcoLegal}`,
    `**Diseño de Recolección:** Encuesta autoadministrada con consentimiento informado explícito (opt-in) y anonimización de origen (UUID sin PII ni IP).`,
    ``,
    `## Estructura de Variables para Análisis en SPSS / R / Jamovi / Python`,
    ``
  ];

  SURVEY_BLOCKS.forEach(block => {
    lines.push(`### Bloque ${block.stepNumber}: ${block.title}`);
    block.questions.forEach(q => {
      lines.push(`- **\`${q.code}\`** (*${q.id}*): ${q.label}`);
      lines.push(`  - **Tipo de variable:** ${q.type === 'number_slider' ? 'Cuantitativa discreta (Años)' : q.type === 'likert' ? 'Ordinal Likert (1 a 5)' : q.type === 'multiple' ? 'Categórica de respuesta múltiple' : q.type === 'textarea' ? 'Cualitativa abierta (Texto)' : 'Categórica nominal/ordinal'}`);
      if (q.options) {
        q.options.forEach(opt => {
          const codeStr = opt.numericCode !== undefined ? `[Código ${opt.numericCode}] ` : '';
          lines.push(`    - ${codeStr}\`${opt.value}\`: ${opt.label}`);
        });
      }
    });
    lines.push(``);
  });

  return lines.join('\n');
}

// Personalized feedback generator for families after completing the survey
export function generateFamilyFeedback(answers) {
  const recommendations = [];

  // 1. Sleep & Bedroom feedback
  if (answers.lugar_dormir_celular === 'dentro_cama' || answers.lugar_dormir_celular === 'dentro_apagado') {
    recommendations.push({
      category: 'Descanso nocturno y salud del sueño',
      level: 'prioritario',
      title: 'Sacar las pantallas del dormitorio a la noche',
      text: 'Indicaste que el dispositivo queda dentro del cuarto al dormir. La Sociedad Uruguaya de Pediatría (SUP) y la evidencia internacional muestran que tener el celular en el dormitorio reduce entre 45 y 60 minutos de sueño profundo (incluso apagado, por la "hipervigilancia" de notificaciones) y aumenta los conflictos diarios. Te sugerimos establecer una "estación de carga familiar" en el living o cocina 1 hora antes de dormir.',
      actionTab: 'inicio',
      actionLabel: 'Ver regla S.E.R.C. de sueño'
    });
  } else if (answers.lugar_dormir_celular === 'fuera_cuarto') {
    recommendations.push({
      category: 'Descanso nocturno y salud del sueño',
      level: 'positivo',
      title: '¡Excelente hábito de protección del sueño!',
      text: 'Que el celular o pantalla cargue fuera del dormitorio durante la noche es el factor protector número 1 para cuidar el descanso, el estado de ánimo y el rendimiento escolar de tu hijo/a.'
    });
  }

  // 2. Parental Control & Supervision gap
  if (answers.uso_control_parental === 'no_desconoce' || answers.uso_control_parental === 'si_parcial') {
    recommendations.push({
      category: 'Supervisión técnica acompañada',
      level: 'prioritario',
      title: 'Paso a paso para configurar Family Link o Tiempo en Pantalla',
      text: 'Mencionaste que cuesta configurar o sostener los controles técnicos. Configurar el bloqueo automático nocturno y la aprobación de descargas lleva 10 minutos y evita tener que "pelear" todos los días para apagar la pantalla, porque el límite lo marca el reloj del sistema.',
      actionTab: 'controles',
      actionLabel: 'Ir al tutorial paso a paso (Android / iPhone)'
    });
  } else if (answers.uso_control_parental === 'no_confianza') {
    recommendations.push({
      category: 'Equilibrio entre confianza y cuidado',
      level: 'sugerencia',
      title: 'Por qué combinar el diálogo con filtros técnicos',
      text: 'El diálogo familiar es insustituible, pero los algoritmos de videos cortos y los chats en juegos online están diseñados para superar el autocontrol biológico de un niño o adolescente. Acompañar la confianza con límites horarios automáticos en el equipo disminuye el desgaste en casa.',
      actionTab: 'controles',
      actionLabel: 'Conocer cómo funcionan los controles'
    });
  }

  // 3. Activities & Grooming / Social risks
  const acts = Array.isArray(answers.actividades_percibidas) ? answers.actividades_percibidas : [];
  if (acts.includes('juegos_online') || answers.principal_preocupacion === 'grooming_desconocidos') {
    recommendations.push({
      category: 'Seguridad en juegos en línea (Roblox, Minecraft, etc.)',
      level: 'prioritario',
      title: 'Revisar los chats abiertos en videojuegos multijugador',
      text: 'Los videojuegos en línea con chat abierto son hoy la principal vía de contacto con desconocidos en edades tempranas. Te recomendamos desactivar el chat con extraños dentro de la configuración de cada juego y mirar juntos los cortometrajes de prevención de la pestaña Videos.',
      actionTab: 'videos',
      actionLabel: 'Ver videos para charlar en casa'
    });
  }

  // 4. First phone age & Family Agreement
  recommendations.push({
    category: 'Pacto de convivencia en el hogar',
    level: 'sugerencia',
    title: 'Plasmar las reglas por escrito en un Acuerdo Familiar',
    text: `Para acompañar a tu hijo/a (${answers.edad_hijo || 10} años) sin discusiones diarias, te invitamos a generar e imprimir el Acuerdo Familiar personalizado con horarios, zonas libres de pantallas y compromisos mutuos.`,
    actionTab: 'acuerdo-familiar',
    actionLabel: 'Crear Acuerdo Familiar en PDF'
  });

  return recommendations;
}
