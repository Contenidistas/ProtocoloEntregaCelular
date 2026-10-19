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
    consentVersion: '1.1-UY-18331',
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

  // Midpoint hours estimation (excluding "no_tengo_idea" where midpointHours is null)
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

  // Parents who admit not knowing screen time ("no_tengo_idea")
  const unknownScreenTimeCount = records.filter(
    r => r.horas_semana === 'no_tengo_idea' || r.horas_fin_semana === 'no_tengo_idea'
  ).length;

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
    unknownScreenTimeCount,
    unknownScreenTimePct: n > 0 ? Number(((unknownScreenTimeCount / n) * 100).toFixed(1)) : 0,
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
    ...allQuestions.map(q => q.code),
    'DETALLES_OTROS_ESPECIFICADOS'
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

    // Collect any custom "Otro" text specifications entered by the user
    const otherDetails = Object.entries(r)
      .filter(([k, v]) => k.endsWith('_otro_detalle') && v && String(v).trim().length > 0)
      .map(([k, v]) => `${k.replace('_otro_detalle', '')}: ${String(v).trim()}`)
      .join(' | ');

    return [
      escapeCsv(r.id),
      escapeCsv(r.timestamp),
      escapeCsv(r.consentAccepted ? 1 : 0),
      escapeCsv(r.workshopCode || 'WEB-PUBLICA'),
      ...questionCells.map(escapeCsv),
      escapeCsv(otherDetails)
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
    `**Respaldo Científico de Devolución:** ${CONSENTIMIENTO_INFORMADO.respaldoEvidencia}`,
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

// Personalized feedback generator for families strictly grounded in official scientific evidence
export function generateFamilyFeedback(answers) {
  const recommendations = [];
  const impacts = Array.isArray(answers.impacto_fisico_emocional) ? answers.impacto_fisico_emocional : [];
  const acts = Array.isArray(answers.actividades_percibidas) ? answers.actividades_percibidas : [];

  // 1. Unknown Screen Time ("No tengo idea")
  if (answers.horas_semana === 'no_tengo_idea' || answers.horas_fin_semana === 'no_tengo_idea' || acts.includes('no_estoy_seguro')) {
    recommendations.push({
      category: 'Monitoreo objetivo del tiempo en pantalla',
      level: 'prioritario',
      title: 'Cómo pasar de la estimación a conocer el tiempo real de uso',
      evidenciaOficial: 'Guías de Ciudadanía Digital AGESIC / Plan Ceibal y Sociedad Uruguaya de Pediatría (SUP)',
      text: 'Indicaste que resulta difícil calcular cuánto tiempo pasa tu hijo/a frente a las pantallas o qué aplicaciones usa más. La evidencia muestra que las familias suelen subestimar hasta en un 50% el tiempo real de conexión. Tanto Android (Bienestar Digital / Family Link) como iPhone (Tiempo en Pantalla) incluyen un reporte diario automático que muestra exactamente cuántos minutos se usó cada juego o red social.',
      actionTab: 'controles',
      actionLabel: 'Ver cómo activar el reporte de tiempo en Android e iPhone'
    });
  }

  // 2. Anger / Frustration in Online Games ("ira_frustracion_juegos")
  if (
    impacts.includes('ira_frustracion_juegos') ||
    answers.frecuencia_conflictos === 'frecuente' ||
    answers.frecuencia_conflictos === 'muy_frecuente' ||
    answers.principal_preocupacion === 'ira_salud_postura'
  ) {
    recommendations.push({
      category: 'Regulación emocional y manejo de la ira ante juegos en línea',
      level: 'prioritario',
      title: 'Por qué ocurren los estallidos de ira al perder o apagar el juego (y cómo prevenirlos)',
      evidenciaOficial: 'Organización Mundial de la Salud (OMS - CIE-11) y Sociedad Uruguaya de Pediatría (SUP)',
      text: 'Los videojuegos competitivos en línea liberan picos intensos de dopamina y adrenalina; como la corteza prefrontal (encargada de frenar los impulsos) sigue madurando hasta después de los 20 años, cortar una partida en seco o perder genera una frustración aguda similar a un síndrome de abstinencia breve. La evidencia clínica recomienda: (1) Avisar siempre 10 minutos antes de apagar ("última partida"), (2) No usar el celular como calmante emocional, y (3) Si hay gritos o agresividad, aplicar una pausa deportiva o física de 24 horas sobre ese juego específico.',
      actionTab: 'formacion',
      actionLabel: 'Ver guía de Salud Digital y regulación emocional'
    });
  }

  // 3. Posture ("postura_cuello_espalda") & Vision ("fatiga_visual")
  if (impacts.includes('postura_cuello_espalda') || impacts.includes('fatiga_visual')) {
    recommendations.push({
      category: 'Salud física: Postura cervical y protección de la visión',
      level: 'prioritario',
      title: 'Prevención del "Cuello de Texto" y fatiga visual (Regla 20-20-20)',
      evidenciaOficial: 'Organización Mundial de la Salud (OMS), Academia Americana de Oftalmología (AAO) y MSP Uruguay',
      text: 'Inclinar la cabeza 45° a 60° hacia abajo para mirar el celular multiplica el peso sobre la columna cervical hasta equivaler a 20–27 kg de presión, provocando contracturas y cambios posturales en edades de crecimiento. Asimismo, la fijación visual cercana continua acelera la miopía infantil. Las pautas médicas oficiales recomiendan: (1) Elevar la pantalla a la altura de los ojos o usar soporte en mesa (nunca acostado boca abajo), (2) Mantener al menos 35 cm de distancia de los ojos, (3) Aplicar la Regla 20-20-20 (cada 20 minutos, mirar a 6 metros de distancia durante 20 segundos) y (4) Garantizar al menos 1 a 2 horas diarias de luz natural al aire libre.',
      actionTab: 'formacion',
      actionLabel: 'Explorar pautas de Salud Digital y bienestar físico'
    });
  }

  // 4. Social Isolation & Boredom Intolerance ("aislamiento_social" / "ansiedad_aburrimiento")
  if (impacts.includes('aislamiento_social') || impacts.includes('ansiedad_aburrimiento') || answers.principal_preocupacion === 'aislamiento_estudio') {
    recommendations.push({
      category: 'Prevención del aislamiento y vínculo familiar',
      level: 'prioritario',
      title: 'Zonas libres de pantallas y recuperación del tiempo cara a cara',
      evidenciaOficial: 'Sociedad Uruguaya de Pediatría (SUP), UNICEF (Kids Online Uruguay) y Modelo S.E.R.C.',
      text: 'El aislamiento en el dormitorio con pantallas reduce el diálogo familiar y desplaza actividades protectoras de la salud mental (deporte, lectura, juego presencial con pares). La evidencia pediátrica sugiere acordar que el uso recreativo de pantallas ocurra preferentemente en espacios comunes de la casa y preservar momentos 100% libres de dispositivos, especialmente el almuerzo/cena familiar.',
      actionTab: 'inicio',
      actionLabel: 'Ver los 4 pilares del Modelo S.E.R.C. en casa'
    });
  }

  // 5. Sleep & Bedroom feedback
  if (answers.lugar_dormir_celular === 'dentro_cama' || answers.lugar_dormir_celular === 'dentro_apagado' || impacts.includes('cansancio_sueno')) {
    recommendations.push({
      category: 'Higiene del sueño y desarrollo neurocognitivo',
      level: 'prioritario',
      title: 'Sacar el celular del dormitorio durante la noche',
      evidenciaOficial: 'Sociedad Uruguaya de Pediatría (SUP) y Academia Americana de Pediatría (AAP)',
      text: 'La luz azul de la pantalla inhibe la secreción de melatonina (hormona del sueño) y, aun cuando el equipo queda en silencio dentro del cuarto, el estado de "alerta inconsciente" ante posibles mensajes fragmenta el sueño profundo y reduce entre 45 y 60 minutos el descanso reparador necesario para la memoria y el crecimiento. La pauta oficial recomienda apagar pantallas 60 minutos antes de dormir y cargar todos los celulares fuera de los dormitorios.',
      actionTab: 'inicio',
      actionLabel: 'Ver pauta S.E.R.C. de descanso nocturno'
    });
  } else if (answers.lugar_dormir_celular === 'fuera_cuarto') {
    recommendations.push({
      category: 'Higiene del sueño y desarrollo neurocognitivo',
      level: 'positivo',
      title: '¡Hábito protector validado por la evidencia!',
      evidenciaOficial: 'Sociedad Uruguaya de Pediatría (SUP) y Organización Mundial de la Salud (OMS)',
      text: 'Que el celular o pantalla cargue fuera del dormitorio durante la noche coincide exactamente con la recomendación principal de las sociedades de pediatría para proteger el sueño profundo, el estado de ánimo y la atención escolar.'
    });
  }

  // 6. Parental Control & Supervision gap
  if (answers.uso_control_parental === 'no_desconoce' || answers.uso_control_parental === 'si_parcial') {
    recommendations.push({
      category: 'Mediación técnica acompañada',
      level: 'prioritario',
      title: 'Configuración de límites horarios y bloqueo nocturno automático',
      evidenciaOficial: 'AGESIC (Ciudadanía Digital Uruguay) y Plan Ceibal',
      text: 'Configurar el bloqueo nocturno automático y el límite de horas diarias en Google Family Link (Android) o Tiempo en Pantalla (iPhone) lleva menos de 10 minutos y disminuye drásticamente los conflictos diarios, ya que el corte del tiempo lo realiza el sistema de forma previsible y no depende de una discusión en el momento.',
      actionTab: 'controles',
      actionLabel: 'Ir a la guía paso a paso de Controles Parentales'
    });
  }

  // 7. Grooming / Online Games safety
  if (acts.includes('juegos_online') || answers.principal_preocupacion === 'grooming_desconocidos') {
    recommendations.push({
      category: 'Prevención de riesgos relacionales (Grooming y chats abiertos)',
      level: 'prioritario',
      title: 'Configuración de privacidad en videojuegos en línea y redes',
      evidenciaOficial: 'AGESIC, INAU (Línea Azul 0800 5050) y Ministerio del Interior',
      text: 'De acuerdo con los reportes oficiales de seguridad digital en Uruguay, los chats abiertos dentro de videojuegos multijugador (como Roblox, Minecraft o Free Fire) son una de las vías más frecuentes de contacto por parte de desconocidos. Se recomienda configurar las cuentas en modo privado (solo amigos conocidos en la vida real) y dialogar en familia apoyándose en los videos educativos de esta plataforma.',
      actionTab: 'videos',
      actionLabel: 'Ver cortometrajes de prevención para charlar en casa'
    });
  }

  // 8. Family Agreement (Always included as actionable synthesis)
  recommendations.push({
    category: 'Acuerdo de convivencia familiar basado en evidencia',
    level: 'sugerencia',
    title: 'Plasmar las pautas por escrito en un Acuerdo Familiar',
    evidenciaOficial: 'Guías de Convivencia Digital ANEP / Uruguay Educa y Modelo S.E.R.C.',
    text: `Los estudios sobre mediación parental demuestran que las reglas explícitas, acordadas por anticipado y firmadas en conjunto (incluyendo horarios, postura/descanso visual y trato respetuoso), generan mucha mayor adherencia que las órdenes improvisadas. Podés generar e imprimir ahora mismo el acuerdo adaptado para tu hijo/a (${answers.edad_hijo || 10} años).`,
    actionTab: 'acuerdo-familiar',
    actionLabel: 'Crear Acuerdo Familiar en PDF'
  });

  return recommendations;
}
