export const scientificEvidenceList = [
  {
    id: 'horas-promedio',
    category: 'Tiempo de uso',
    shortTitle: 'Horas promedio y notificaciones',
    headline: 'Entre 4,5 y 8,5 horas diarias frente a pantallas',
    highlightMetric: '88%',
    highlightLabel: 'de los niños y adolescentes en Uruguay se conecta todos los días desde el celular',
    color: 'amber',
    summary:
      'Los relevamientos nacionales e internacionales muestran que el tiempo frente al celular supera ampliamente las recomendaciones pediátricas (máximo 1 a 2 horas recreativas diarias en edad escolar), desplazando horas de sueño, lectura y actividad física.',
    bars: [
      { label: 'Máximo recomendado por pediatría (6 a 12 años)', value: 1.5, max: 10, display: '1 a 2 h / día', colorClass: 'bg-emerald-500' },
      { label: 'Promedio en niños y adolescentes en Uruguay (Kids Online)', value: 5.5, max: 10, display: '4,5 a 6 h / día', colorClass: 'bg-amber-500' },
      { label: 'Promedio en adolescentes de 13 a 17 años (Fines de semana / Global)', value: 8.6, max: 10, display: '8 h 39 min / día', colorClass: 'bg-rose-500' }
    ],
    extraFacts: [
      'Un adolescente recibe en promedio 237 notificaciones por día; casi el 25% llega durante el horario escolar o de madrugada.',
      'Desbloquear el celular más de 80 a 100 veces al día fragmenta la atención continua en microbloques de pocos minutos.'
    ],
    sources: [
      {
        title: 'Informe Kids Online Uruguay (UNICEF · Plan Ceibal · AGESIC · UNESCO)',
        url: 'https://www.unicef.org/uruguay/informes/kids-online-uruguay',
        institution: 'UNICEF Uruguay / Ceibal'
      },
      {
        title: 'Repositorio Académico Kids Online Uruguay (PDF Oficial)',
        url: 'https://hdl.handle.net/20.500.12381/359',
        institution: 'ANII / Redi Uruguay'
      }
    ]
  },
  {
    id: 'afectacion-neuronal',
    category: 'Neurociencia',
    shortTitle: 'Afectaciones neuronales',
    headline: 'Impacto en corteza prefrontal, sustancia blanca y atención',
    highlightMetric: '20 min',
    highlightLabel: 'tarda el cerebro en recuperar el enfoque profundo tras una sola notificación',
    color: 'indigo',
    summary:
      'Estudios de neuroimagen por resonancia magnética (como el proyecto ABCD de los Institutos Nacionales de Salud de EE. UU. con más de 11.000 niños) evidencian cambios estructurales cuando la sobreestimulación digital reemplaza la lectura, el juego y la interacción humana.',
    bars: [
      { label: 'Maduración completa de la corteza prefrontal (control de impulsos)', value: 25, max: 25, display: 'Recién a los 25 años', colorClass: 'bg-indigo-500' },
      { label: 'Integridad de sustancia blanca (lenguaje y funciones ejecutivas)', value: 68, max: 100, display: 'Disminución significativa con >2h/día en infancia', colorClass: 'bg-purple-500' },
      { label: 'Pérdida de memoria de trabajo por presencia del celular en la mesa', value: 80, max: 100, display: 'Efecto "Brain Drain" documentado', colorClass: 'bg-rose-500' }
    ],
    extraFacts: [
      'El estudio de Hutton et al. (JAMA Pediatrics) demostró mediante imágenes por tensor de difusión (DTI) una menor mielinización en los tractos cerebrales del lenguaje y la lectoescritura en niños con alto uso de pantallas.',
      'El estudio longitudinal ABCD detectó adelgazamiento prematuro de la corteza cerebral asociado a más de 7 horas diarias de pantallas.'
    ],
    sources: [
      {
        title: 'Hutton et al. (2020) - Uso de pantallas e integridad de la sustancia blanca cerebral (JAMA Pediatrics)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31682712/',
        institution: 'PubMed / NIH (PMID: 31682712)'
      },
      {
        title: 'Estudio ABCD (Adolescent Brain Cognitive Development - NIH)',
        url: 'https://abcdstudy.org/',
        institution: 'National Institutes of Health (NIH)'
      }
    ]
  },
  {
    id: 'vision-miopia',
    category: 'Salud visual',
    shortTitle: 'Problemas de visión y miopía',
    headline: 'Aumento del 30% al 80% en el riesgo de miopía infantil',
    highlightMetric: '+80%',
    highlightLabel: 'mayor riesgo de miopía al combinar pantallas de cerca con poca luz solar exterior',
    color: 'sky',
    summary:
      'Mirar una pantalla luminosa a menos de 30 centímetros durante horas obliga al músculo ciliar del ojo a una contracción sostenida (espasmo de acomodación) y reduce drásticamente el parpadeo natural, favoreciendo el alargamiento del globo ocular (miopía axial).',
    bars: [
      { label: 'Parpadeo normal conversando cara a cara', value: 18, max: 20, display: '18 parpadeos / min', colorClass: 'bg-emerald-500' },
      { label: 'Parpadeo mirando el celular (causa de ojo seco y fatiga)', value: 7, max: 20, display: '6 a 7 parpadeos / min (-60%)', colorClass: 'bg-amber-500' },
      { label: 'Proyección mundial de jóvenes con miopía hacia 2050 (OMS / Lancet)', value: 50, max: 100, display: '50% de la población', colorClass: 'bg-sky-500' }
    ],
    extraFacts: [
      'La luz solar natural estimula la dopamina retiniana, que evita la deformación del ojo. Por eso son claves al menos 90 a 120 minutos diarios al aire libre.',
      'Hacer pausas cada 20 minutos mirando a 6 metros de distancia durante 20 segundos relaja el sistema de enfoque ocular.'
    ],
    sources: [
      {
        title: 'Foreman et al. (2021) - Uso de dispositivos inteligentes y miopía: Meta-análisis (The Lancet Digital Health)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34625399/',
        institution: 'PubMed / The Lancet (PMID: 34625399)'
      }
    ]
  },
  {
    id: 'postura-cervical',
    category: 'Postura física',
    shortTitle: 'Postura y columna cervical',
    headline: 'Hasta 27 kg de presión sobre el cuello al mirar el celular',
    highlightMetric: '27 kg',
    highlightLabel: 'de carga soporta la columna cervical al inclinar la cabeza 60° hacia la pantalla',
    color: 'orange',
    summary:
      'El estudio biomecánico del cirujano de columna Dr. Kenneth Hansraj demostró que a medida que inclinamos la cabeza hacia adelante para mirar el teléfono ("Text Neck" o cuello de texto), el peso efectivo sobre las vértebras cervicales se multiplica por cinco.',
    bars: [
      { label: '0° · Posición neutra (mirando al frente)', value: 5, max: 27, display: '4,5 a 5,5 kg', colorClass: 'bg-emerald-500' },
      { label: '15° · Inclinación leve', value: 12, max: 27, display: '12 kg de carga', colorClass: 'bg-sky-500' },
      { label: '30° · Inclinación moderada', value: 18, max: 27, display: '18 kg de carga', colorClass: 'bg-amber-500' },
      { label: '45° · Inclinación pronunciada', value: 22, max: 27, display: '22 kg de carga', colorClass: 'bg-orange-500' },
      { label: '60° · Postura habitual usando el celular', value: 27, max: 27, display: '27 kg de carga cervical', colorClass: 'bg-rose-600' }
    ],
    extraFacts: [
      'En consultorios pediátricos y traumatológicos se observa un aumento de cefaleas tensionales, contracturas crónicas y rectificación temprana de la lordosis cervical en adolescentes.',
      'Consejo práctico: subir el teléfono a la altura de los ojos en lugar de bajar la cabeza.'
    ],
    sources: [
      {
        title: 'Hansraj KK (2014) - Evaluación del estrés en la columna cervical causado por la postura (Surgical Tech Int)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25393825/',
        institution: 'PubMed / NIH (PMID: 25393825)'
      }
    ]
  },
  {
    id: 'salud-mental-relacionamiento',
    category: 'Salud mental y vínculos',
    shortTitle: 'Salud mental y relacionamiento',
    headline: 'Doble riesgo de ansiedad/depresión y 45% menos tiempo presencial',
    highlightMetric: '2x',
    highlightLabel: 'se duplica el riesgo de síntomas depresivos y ansiosos con más de 3 h/día en redes',
    color: 'purple',
    summary:
      'Los estudios de cohorte longitudinales (JAMA Psychiatry) y el informe oficial del Cirujano General de EE. UU. advierten que el reemplazo de la vida presencial por redes sociales incrementa la soledad, la comparación social constante (FOMO) y el sufrimiento emocional.',
    bars: [
      { label: 'Riesgo de síntomas de ansiedad y depresión (>3 h/día en redes)', value: 100, max: 100, display: '+100% (Doble de riesgo)', colorClass: 'bg-rose-500' },
      { label: 'Caída del tiempo diario en persona con amigos (2010 vs. actualidad)', value: 45, max: 100, display: '-45% de encuentro cara a cara', colorClass: 'bg-purple-500' },
      { label: 'Adolescentes que sienten que las redes empeoran su imagen corporal', value: 46, max: 100, display: '46% (13 a 17 años)', colorClass: 'bg-amber-500' }
    ],
    extraFacts: [
      'La hiperconexión paradójicamente aumenta el sentimiento de aislamiento: estar en decenas de grupos pero sentir que no hay una escucha real.',
      'En mayores de edad y adolescentes tardíos, el impacto suele expresarse en procesos de angustia, crisis de ansiedad y fatiga emocional.'
    ],
    sources: [
      {
        title: 'Riehm et al. (2019) - Tiempo en redes sociales y riesgo de problemas de salud mental en jóvenes (JAMA Psychiatry)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31509167/',
        institution: 'PubMed / JAMA Psychiatry (PMID: 31509167)'
      },
      {
        title: 'U.S. Surgeon General Advisory (2023) - Redes Sociales y Salud Mental Juvenil (Libro Oficial NCBI)',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK594761/',
        institution: 'NCBI Bookshelf / HHS'
      }
    ]
  },
  {
    id: 'sueno-medicacion',
    category: 'Sueño y medicación',
    shortTitle: 'Sueño y consumo de medicaciones',
    headline: 'Supresión de melatonina y suba en prescripción de psicofármacos',
    highlightMetric: '+50%',
    highlightLabel: 'de aumento documentado en prescripciones de psicofármacos e inductores del sueño en jóvenes',
    color: 'rose',
    summary:
      'La radiación azul de la pantalla a centímetros de la retina durante la noche inhibe la melatonina natural y desregula el ritmo circadiano. La falta crónica de sueño profundo y la hiperactivación dopaminérgica derivan cada vez con mayor frecuencia en consultas psiquiátricas y uso de medicación.',
    bars: [
      { label: 'Inhibición de melatonina por uso de pantalla antes de dormir', value: 65, max: 100, display: 'Hasta 55% - 80% menos melatonina', colorClass: 'bg-rose-500' },
      { label: 'Adolescentes que duermen menos de las 8-9 horas necesarias', value: 72, max: 100, display: 'Más del 70% en días de clase', colorClass: 'bg-amber-500' },
      { label: 'Aumento en prescripción de ansiolíticos, antidepresivos y melatonina en jóvenes', value: 58, max: 100, display: '+40% a +65% en la última década', colorClass: 'bg-purple-500' }
    ],
    extraFacts: [
      'Muchos cuadros que se confunden con déficit de atención (TDAH), irritabilidad severa o apatía matutina tienen en su base una privación crónica de sueño por uso nocturno del celular ("vamping").',
      'Retirar el celular del dormitorio a la noche es la intervención no farmacológica más efectiva y gratuita para recuperar el descanso.'
    ],
    sources: [
      {
        title: 'Twenge et al. (2020) - Tiempo de pantalla, trastornos del sueño y diagnósticos/tratamientos de salud mental en jóvenes',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32743778/',
        institution: 'PubMed / NIH (PMID: 32743778)'
      },
      {
        title: 'Estudio sobre medios digitales, sueño y bienestar psicológico adolescente (PubMed)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/35101738/',
        institution: 'PubMed / NIH (PMID: 35101738)'
      }
    ]
  }
];
