// Instrumento de Relevamiento: Percepciones Familiares sobre Uso de Pantallas y Entrega del Primer Celular en Uruguay
// Diseñado bajo criterios éticos de investigación social/educativa y Ley N° 18.331 (Protección de Datos Personales - Uruguay)

export const CONSENTIMIENTO_INFORMADO = {
  titulo: 'Consentimiento Informado para Participación en Investigación Académica',
  subtitulo: 'Estudio sobre percepciones familiares, mediación parental e iniciación digital en Uruguay',
  investigador: 'Prof. Esp. Santiago Hernández',
  filiacion: 'Portal Uruguay Educa (DGES - ANEP) · Maestrando en Educación (Universidad ORT Uruguay) · Doctorando en Educación (UNLP)',
  contacto: 'shernandez@uruguayeduca.edu.uy',
  marcoLegal: 'Ley N° 18.331 de Protección de Datos Personales y Acción de Habeas Data (AGESIC - República Oriental del Uruguay)',
  puntosClave: [
    {
      titulo: '1. Propósito del estudio',
      texto: 'Este relevamiento tiene como objetivo analizar las percepciones de las familias en Uruguay acerca del uso de pantallas de sus hijos/as, la edad de entrega del primer teléfono celular, el acceso a internet y las estrategias de acompañamiento en el hogar, con el fin de elaborar artículos académicos y mejorar los recursos de orientación familiar y educativa.'
    },
    {
      titulo: '2. Anonimato y confidencialidad (Privacidad por diseño)',
      texto: 'La encuesta es 100% anónima desde su origen. No se solicita ni almacena tu nombre, cédula de identidad, número de teléfono, correo electrónico ni dirección IP. A cada respuesta se le asigna un código aleatorio único (UUID) que impide identificar a la familia.'
    },
    {
      titulo: '3. Participación voluntaria y devolución inmediata',
      texto: 'Tu participación es completamente libre y voluntaria. Al finalizar el cuestionario (demora entre 2 y 3 minutos), recibirás en pantalla una devolución personalizada con recomendaciones prácticas para tu hogar. Si preferís no incluir tus respuestas en el estudio estadístico, podés usar el modo "Solo devolución local" sin enviar datos.'
    },
    {
      titulo: '4. Destino académico de los datos',
      texto: 'Los datos agregados serán analizados estadísticamente y podrán ser publicados en revistas científicas arbitradas, congresos de educación y salud digital, e informes técnicos de acceso abierto (licencia CC BY-NC-SA 4.0).'
    }
  ],
  declaracionAceptacion: 'Declaro ser mayor de 18 años (madre, padre, tutor/a o referente adulto), haber leído la información anterior y acepto compartir mis respuestas de forma totalmente anónima con fines de investigación académica.'
};

export const SURVEY_BLOCKS = [
  {
    id: 'contexto',
    stepNumber: 1,
    title: 'Contexto familiar (Anónimo)',
    subtitle: 'Datos generales para caracterizar estadísticamente la muestra sin identificar a tu familia.',
    questions: [
      {
        id: 'parentesco',
        code: 'V01_VINCULO',
        label: '1. ¿Cuál es tu vínculo con el niño, niña o adolescente sobre el que respondés?',
        type: 'single',
        required: true,
        options: [
          { value: 'madre', label: 'Madre', numericCode: 1 },
          { value: 'padre', label: 'Padre', numericCode: 2 },
          { value: 'tutor_referente', label: 'Tutor/a u otro referente familiar (abuelo/a, tío/a)', numericCode: 3 },
          { value: 'docente_familia', label: 'Soy docente y además respondo como madre/padre', numericCode: 4 }
        ]
      },
      {
        id: 'departamento_region',
        code: 'V02_REGION',
        label: '2. ¿En qué zona de Uruguay reside la familia?',
        type: 'single',
        required: true,
        options: [
          { value: 'montevideo', label: 'Montevideo', numericCode: 1 },
          { value: 'canelones_metropolitana', label: 'Canelones / Área Metropolitana', numericCode: 2 },
          { value: 'interior_urbano', label: 'Interior del país (capital departamental o ciudad)', numericCode: 3 },
          { value: 'interior_rural_localidad', label: 'Interior del país (pequeña localidad o zona rural)', numericCode: 4 }
        ]
      },
      {
        id: 'tipo_centro',
        code: 'V03_CENTRO_EDU',
        label: '3. ¿A qué tipo de centro educativo asiste tu hijo/a?',
        type: 'single',
        required: true,
        options: [
          { value: 'publico_anep', label: 'Educación Pública (Escuela / Liceo / UTU - ANEP)', numericCode: 1 },
          { value: 'privado_colegio', label: 'Colegio o institución privada', numericCode: 2 },
          { value: 'otro', label: 'Otro / Educación inicial', numericCode: 3 }
        ]
      },
      {
        id: 'edad_hijo',
        code: 'V04_EDAD_HIJO',
        label: '4. ¿Qué edad tiene actualmente tu hijo/a? (Si tenés más de uno, pensá en el que está más cerca de recibir o usar su primer celular)',
        type: 'number_slider',
        min: 4,
        max: 18,
        defaultValue: 10,
        unit: 'años',
        required: true
      },
      {
        id: 'genero_hijo',
        code: 'V05_GENERO_HIJO',
        label: '5. Género de tu hijo/a:',
        type: 'single',
        required: true,
        options: [
          { value: 'femenino', label: 'Femenino', numericCode: 1 },
          { value: 'masculino', label: 'Masculino', numericCode: 2 },
          { value: 'otro_no_responde', label: 'Otro / Prefiero no responder', numericCode: 3 }
        ]
      }
    ]
  },
  {
    id: 'iniciacion_digital',
    stepNumber: 2,
    title: 'Primer celular y acceso a pantallas',
    subtitle: 'Relevamiento sobre la edad de acceso al primer dispositivo, internet y los motivos de entrega.',
    questions: [
      {
        id: 'estado_celular',
        code: 'V06_ESTADO_CEL',
        label: '6. ¿Cuál es la situación actual de tu hijo/a respecto al teléfono celular?',
        type: 'single',
        required: true,
        options: [
          { value: 'ya_tiene', label: 'Ya tiene un smartphone propio', numericCode: 1 },
          { value: 'en_transicion', label: 'Todavía no tiene, pero pensamos dárselo este año o el próximo', numericCode: 2 },
          { value: 'usa_prestado', label: 'No tiene propio, pero usa habitualmente el celular de un adulto', numericCode: 3 },
          { value: 'no_tiene', label: 'No tiene celular propio ni usa el de los adultos', numericCode: 4 }
        ]
      },
      {
        id: 'edad_primer_celular',
        code: 'V07_EDAD_1ER_CEL',
        label: '7. ¿A qué edad recibió su primer celular propio? (Si aún no tiene, ¿a qué edad estimás que se lo darán?)',
        type: 'number_slider',
        min: 5,
        max: 16,
        defaultValue: 10,
        unit: 'años',
        required: true
      },
      {
        id: 'edad_acceso_internet',
        code: 'V08_EDAD_INTERNET',
        label: '8. ¿A qué edad aproximada empezó a usar pantallas conectadas a internet (YouTube, tablets, juegos en línea)?',
        type: 'single',
        required: true,
        options: [
          { value: 'menos_4', label: 'Antes de los 4 años', numericCode: 1 },
          { value: '4_a_5', label: 'Entre los 4 y 5 años', numericCode: 2 },
          { value: '6_a_7', label: 'Entre los 6 y 7 años', numericCode: 3 },
          { value: '8_a_9', label: 'Entre los 8 y 9 años', numericCode: 4 },
          { value: '10_a_11', label: 'Entre los 10 y 11 años', numericCode: 5 },
          { value: '12_o_mas', label: 'A los 12 años o más', numericCode: 6 }
        ]
      },
      {
        id: 'otros_dispositivos',
        code: 'V09_OTROS_DISP',
        label: '9. ¿A qué otros dispositivos tiene acceso habitual en el hogar? (Podés marcar varios)',
        type: 'multiple',
        required: true,
        options: [
          { value: 'tablet', label: 'Tablet (propia o compartida)' },
          { value: 'consola', label: 'Consola de videojuegos (PlayStation, Switch, Xbox)' },
          { value: 'ceibalita_pc', label: 'Computadora / Laptop (Plan Ceibal o familiar)' },
          { value: 'tv_cuarto', label: 'Smart TV dentro de su propio dormitorio' },
          { value: 'tv_living', label: 'Smart TV en espacios comunes (living/comedor)' },
          { value: 'smartwatch', label: 'Reloj inteligente (Smartwatch)' },
          { value: 'ninguno', label: 'Ninguno de los anteriores' }
        ]
      },
      {
        id: 'motivo_principal_entrega',
        code: 'V10_MOTIVO_ENTREGA',
        label: '10. ¿Cuál fue (o será) el motivo principal para entregarle su primer celular?',
        type: 'single',
        required: true,
        options: [
          { value: 'seguridad_traslados', label: 'Seguridad y comunicación en traslados (escuela, liceo, club)', numericCode: 1 },
          { value: 'presion_social', label: 'Integración / presión social ("la mayoría de sus amigos ya tiene")', numericCode: 2 },
          { value: 'organizacion_familiar', label: 'Comunicación con padres separados, abuelos o cuidadores', numericCode: 3 },
          { value: 'entretenimiento', label: 'Entretenimiento, juegos o pedido insistente del niño/a', numericCode: 4 },
          { value: 'estudio_tareas', label: 'Necesidad para actividades escolares o grupales de clase', numericCode: 5 }
        ]
      }
    ]
  },
  {
    id: 'percepcion_uso',
    stepNumber: 3,
    title: 'Percepciones sobre tiempo en pantalla y uso',
    subtitle: '¿Cuánto tiempo y para qué creés que tu hijo/a utiliza el celular o las pantallas?',
    questions: [
      {
        id: 'horas_semana',
        code: 'V11_HORAS_LV',
        label: '11. De lunes a viernes, ¿cuánto tiempo diario creés que pasa frente a pantallas con fines recreativos (fuera de tareas escolares)?',
        type: 'single',
        required: true,
        options: [
          { value: 'menos_1h', label: 'Menos de 1 hora por día', numericCode: 1, midpointHours: 0.5 },
          { value: '1_a_2h', label: 'Entre 1 y 2 horas por día', numericCode: 2, midpointHours: 1.5 },
          { value: '2_a_3h', label: 'Entre 2 y 3 horas por día', numericCode: 3, midpointHours: 2.5 },
          { value: '3_a_4h', label: 'Entre 3 y 4 horas por día', numericCode: 4, midpointHours: 3.5 },
          { value: 'mas_4h', label: 'Más de 4 horas por día', numericCode: 5, midpointHours: 5.0 }
        ]
      },
      {
        id: 'horas_fin_semana',
        code: 'V12_HORAS_FINDE',
        label: '12. Durante los fines de semana (sábado y domingo), ¿cuánto tiempo diario estimás que usa pantallas?',
        type: 'single',
        required: true,
        options: [
          { value: 'menos_1h', label: 'Menos de 1 hora por día', numericCode: 1, midpointHours: 0.5 },
          { value: '1_a_2h', label: 'Entre 1 y 2 horas por día', numericCode: 2, midpointHours: 1.5 },
          { value: '2_a_4h', label: 'Entre 2 y 4 horas por día', numericCode: 3, midpointHours: 3.0 },
          { value: '4_a_6h', label: 'Entre 4 y 6 horas por día', numericCode: 4, midpointHours: 5.0 },
          { value: 'mas_6h', label: 'Más de 6 horas por día', numericCode: 5, midpointHours: 7.0 }
        ]
      },
      {
        id: 'actividades_percibidas',
        code: 'V13_ACT_PERCIBIDAS',
        label: '13. Según tu percepción, ¿qué es lo que MÁS hace tu hijo/a cuando está con el celular o pantalla? (Elegí hasta 3 opciones)',
        type: 'multiple',
        maxSelections: 3,
        required: true,
        options: [
          { value: 'videos_cortos', label: 'Mirar videos cortos (TikTok, YouTube Shorts, Reels)' },
          { value: 'juegos_online', label: 'Jugar en línea (Roblox, Brawl Stars, Minecraft, Free Fire, etc.)' },
          { value: 'whatsapp_chat', label: 'Chatear o mandar audios con amigos/compañeros (WhatsApp)' },
          { value: 'videos_largos_series', label: 'Ver videos largos de YouTube, series o dibujos animados' },
          { value: 'redes_sociales', label: 'Usar redes sociales de fotos/estados (Instagram, etc.)' },
          { value: 'tareas_ia', label: 'Buscar información escolar o usar IA (ChatGPT, etc.)' }
        ]
      },
      {
        id: 'certeza_supervision',
        code: 'V14_CERTEZA_LIKERT',
        label: '14. En una escala del 1 al 5, ¿qué tan seguro/a estás de conocer realmente con quién habla y qué contenidos consume en internet?',
        type: 'likert',
        required: true,
        minLabel: '1 · Sé muy poco, me resulta difícil seguirle el ritmo',
        maxLabel: '5 · Conozco con total certeza lo que ve y con quién habla',
        options: [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
          { value: 5, label: '5' }
        ]
      }
    ]
  },
  {
    id: 'mediacion_y_hogar',
    stepNumber: 4,
    title: 'Acompañamiento, sueño y convivencia',
    subtitle: 'Último paso: controles parentales, descanso nocturno y principales inquietudes de tu familia.',
    questions: [
      {
        id: 'uso_control_parental',
        code: 'V15_CONTROL_PARENTAL',
        label: '15. ¿Utilizan actualmente alguna aplicación de control parental (como Google Family Link o Tiempo en Pantalla de iPhone)?',
        type: 'single',
        required: true,
        options: [
          { value: 'si_activo', label: 'Sí, lo tenemos configurado y lo usamos activamente', numericCode: 1 },
          { value: 'si_parcial', label: 'Lo instalamos alguna vez, pero casi no lo miramos', numericCode: 2 },
          { value: 'no_desconoce', label: 'No, porque no sabemos bien cómo configurarlo o nos resulta complejo', numericCode: 3 },
          { value: 'no_confianza', label: 'No, preferimos acordar de palabra sin usar controles técnicos', numericCode: 4 }
        ]
      },
      {
        id: 'lugar_dormir_celular',
        code: 'V16_DORMIR_CELULAR',
        label: '16. A la hora de dormir por la noche, ¿dónde queda habitualmente el celular o la pantalla?',
        type: 'single',
        required: true,
        options: [
          { value: 'fuera_cuarto', label: 'Fuera de su dormitorio (cargando en otro ambiente o con los adultos)', numericCode: 1 },
          { value: 'dentro_apagado', label: 'Dentro de su dormitorio, pero acordamos que quede apagado o en silencio', numericCode: 2 },
          { value: 'dentro_cama', label: 'Dentro de su dormitorio (en la mesa de luz o la cama sin restricción)', numericCode: 3 },
          { value: 'no_aplica', label: 'No aplica (todavía no tiene dispositivo propio)', numericCode: 4 }
        ]
      },
      {
        id: 'frecuencia_conflictos',
        code: 'V17_CONFLICTOS_HOGAR',
        label: '17. ¿Con qué frecuencia surgen enojos, discusiones o malestar cuando le pedís que deje la pantalla?',
        type: 'single',
        required: true,
        options: [
          { value: 'nunca_rara_vez', label: 'Nunca o casi nunca (lo deja sin problema)', numericCode: 1 },
          { value: 'a_veces', label: 'Algunas veces por semana', numericCode: 2 },
          { value: 'frecuente', label: 'Casi todos los días cuesta que lo suelte', numericCode: 3 },
          { value: 'muy_frecuente', label: 'Todos los días genera discusiones o berrinches intensos', numericCode: 4 }
        ]
      },
      {
        id: 'principal_preocupacion',
        code: 'V18_PREOCUPACION',
        label: '18. ¿Cuál es hoy tu MAYOR preocupación respecto al vínculo de tu hijo/a con el celular?',
        type: 'single',
        required: true,
        options: [
          { value: 'sueno_adiccion', label: 'Exceso de tiempo, falta de sueño o dependencia de la pantalla', numericCode: 1 },
          { value: 'grooming_desconocidos', label: 'Contacto con extraños en juegos en línea o redes (Grooming)', numericCode: 2 },
          { value: 'ciberacoso_whatsapp', label: 'Ciberacoso, burlas o conflictos en grupos de WhatsApp', numericCode: 3 },
          { value: 'contenido_inapropiado', label: 'Acceso a contenidos violentos, sexuales o retos virales peligrosos', numericCode: 4 },
          { value: 'aislamiento_estudio', label: 'Pérdida de concentración en el estudio o menos juego al aire libre', numericCode: 5 }
        ]
      },
      {
        id: 'comentario_abierto',
        code: 'V19_RELATO_CUALITATIVO',
        label: '19. (Opcional) En tus palabras: ¿Qué es lo que más te cuesta hoy como madre, padre o referente respecto al uso de pantallas?',
        type: 'textarea',
        required: false,
        placeholder: 'Por ejemplo: ponerme de acuerdo con otros padres de la clase, sostener el límite cuando estoy cansado/a, saber qué juega en Roblox...'
      }
    ]
  }
];

// Muestra simulada realista (N = 28) para pruebas metodológicas, cruces de variables y exportación CSV
export const SAMPLE_RESEARCH_RECORDS = [
  {
    id: 'sim-uy-001',
    timestamp: '2026-10-10T19:15:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'TALLER-MONTEVIDEO',
    parentesco: 'madre',
    departamento_region: 'montevideo',
    tipo_centro: 'publico_anep',
    edad_hijo: 10,
    genero_hijo: 'masculino',
    estado_celular: 'ya_tiene',
    edad_primer_celular: 9,
    edad_acceso_internet: '6_a_7',
    otros_dispositivos: ['consola', 'ceibalita_pc', 'tv_living'],
    motivo_principal_entrega: 'seguridad_traslados',
    horas_semana: '2_a_3h',
    horas_fin_semana: '4_a_6h',
    actividades_percibidas: ['juegos_online', 'videos_cortos', 'whatsapp_chat'],
    certeza_supervision: 3,
    uso_control_parental: 'no_desconoce',
    lugar_dormir_celular: 'dentro_apagado',
    frecuencia_conflictos: 'frecuente',
    principal_preocupacion: 'grooming_desconocidos',
    comentario_abierto: 'Me preocupa mucho el chat de Roblox y que a veces se despierta de noche a mirar el celular.'
  },
  {
    id: 'sim-uy-002',
    timestamp: '2026-10-10T19:22:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'TALLER-MONTEVIDEO',
    parentesco: 'padre',
    departamento_region: 'montevideo',
    tipo_centro: 'privado_colegio',
    edad_hijo: 11,
    genero_hijo: 'femenino',
    estado_celular: 'ya_tiene',
    edad_primer_celular: 10,
    edad_acceso_internet: '6_a_7',
    otros_dispositivos: ['tablet', 'tv_living'],
    motivo_principal_entrega: 'presion_social',
    horas_semana: '1_a_2h',
    horas_fin_semana: '2_a_4h',
    actividades_percibidas: ['whatsapp_chat', 'videos_cortos'],
    certeza_supervision: 4,
    uso_control_parental: 'si_activo',
    lugar_dormir_celular: 'fuera_cuarto',
    frecuencia_conflictos: 'a_veces',
    principal_preocupacion: 'ciberacoso_whatsapp',
    comentario_abierto: 'Los grupos de WhatsApp de la clase generan conflictos todos los fines de semana.'
  },
  {
    id: 'sim-uy-003',
    timestamp: '2026-10-11T14:10:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'WEB-PUBLICA',
    parentesco: 'madre',
    departamento_region: 'canelones_metropolitana',
    tipo_centro: 'publico_anep',
    edad_hijo: 8,
    genero_hijo: 'masculino',
    estado_celular: 'usa_prestado',
    edad_primer_celular: 11,
    edad_acceso_internet: '4_a_5',
    otros_dispositivos: ['tablet', 'ceibalita_pc', 'tv_cuarto'],
    motivo_principal_entrega: 'seguridad_traslados',
    horas_semana: '2_a_3h',
    horas_fin_semana: '4_a_6h',
    actividades_percibidas: ['juegos_online', 'videos_cortos'],
    certeza_supervision: 2,
    uso_control_parental: 'no_desconoce',
    lugar_dormir_celular: 'dentro_cama',
    frecuencia_conflictos: 'muy_frecuente',
    principal_preocupacion: 'sueno_adiccion',
    comentario_abierto: 'Cuando le sacamos la tablet o el celular prestado se enoja muchísimo.'
  },
  {
    id: 'sim-uy-004',
    timestamp: '2026-10-12T18:05:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'TALLER-INTERIOR',
    parentesco: 'madre',
    departamento_region: 'interior_urbano',
    tipo_centro: 'publico_anep',
    edad_hijo: 12,
    genero_hijo: 'femenino',
    estado_celular: 'ya_tiene',
    edad_primer_celular: 11,
    edad_acceso_internet: '8_a_9',
    otros_dispositivos: ['ceibalita_pc', 'tv_living'],
    motivo_principal_entrega: 'seguridad_traslados',
    horas_semana: '3_a_4h',
    horas_fin_semana: '4_a_6h',
    actividades_percibidas: ['videos_cortos', 'whatsapp_chat', 'redes_sociales'],
    certeza_supervision: 2,
    uso_control_parental: 'no_confianza',
    lugar_dormir_celular: 'dentro_cama',
    frecuencia_conflictos: 'frecuente',
    principal_preocupacion: 'sueno_adiccion',
    comentario_abierto: 'Desde que empezó el liceo se acuesta muy tarde mirando TikTok.'
  },
  {
    id: 'sim-uy-005',
    timestamp: '2026-10-12T18:19:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'TALLER-INTERIOR',
    parentesco: 'padre',
    departamento_region: 'interior_urbano',
    tipo_centro: 'publico_anep',
    edad_hijo: 9,
    genero_hijo: 'masculino',
    estado_celular: 'en_transicion',
    edad_primer_celular: 10,
    edad_acceso_internet: '6_a_7',
    otros_dispositivos: ['ceibalita_pc', 'tv_living'],
    motivo_principal_entrega: 'organizacion_familiar',
    horas_semana: '1_a_2h',
    horas_fin_semana: '2_a_4h',
    actividades_percibidas: ['juegos_online', 'videos_largos_series'],
    certeza_supervision: 4,
    uso_control_parental: 'si_activo',
    lugar_dormir_celular: 'fuera_cuarto',
    frecuencia_conflictos: 'nunca_rara_vez',
    principal_preocupacion: 'contenido_inapropiado',
    comentario_abierto: 'Estamos separados con la mamá y queremos poner las mismas reglas en las dos casas antes de darle el celular.'
  },
  {
    id: 'sim-uy-006',
    timestamp: '2026-10-13T21:00:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'WEB-PUBLICA',
    parentesco: 'docente_familia',
    departamento_region: 'montevideo',
    tipo_centro: 'privado_colegio',
    edad_hijo: 10,
    genero_hijo: 'femenino',
    estado_celular: 'en_transicion',
    edad_primer_celular: 12,
    edad_acceso_internet: '8_a_9',
    otros_dispositivos: ['tablet', 'tv_living'],
    motivo_principal_entrega: 'presion_social',
    horas_semana: 'menos_1h',
    horas_fin_semana: '1_a_2h',
    actividades_percibidas: ['videos_largos_series', 'juegos_online'],
    certeza_supervision: 5,
    uso_control_parental: 'si_activo',
    lugar_dormir_celular: 'fuera_cuarto',
    frecuencia_conflictos: 'a_veces',
    principal_preocupacion: 'ciberacoso_whatsapp',
    comentario_abierto: 'Queremos estirar la entrega hasta los 12 años, pero es la única del grupo sin celular propio.'
  },
  {
    id: 'sim-uy-007',
    timestamp: '2026-10-14T16:40:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'TALLER-MONTEVIDEO',
    parentesco: 'madre',
    departamento_region: 'montevideo',
    tipo_centro: 'publico_anep',
    edad_hijo: 13,
    genero_hijo: 'masculino',
    estado_celular: 'ya_tiene',
    edad_primer_celular: 9,
    edad_acceso_internet: 'menos_4',
    otros_dispositivos: ['consola', 'tv_cuarto', 'ceibalita_pc'],
    motivo_principal_entrega: 'entretenimiento',
    horas_semana: 'mas_4h',
    horas_fin_semana: 'mas_6h',
    actividades_percibidas: ['juegos_online', 'videos_cortos', 'whatsapp_chat'],
    certeza_supervision: 1,
    uso_control_parental: 'si_parcial',
    lugar_dormir_celular: 'dentro_cama',
    frecuencia_conflictos: 'muy_frecuente',
    principal_preocupacion: 'aislamiento_estudio',
    comentario_abierto: 'Se lo dimos muy chico a los 9 años sin reglas claras y hoy a los 13 nos resulta muy difícil poner límites.'
  },
  {
    id: 'sim-uy-008',
    timestamp: '2026-10-15T11:30:00.000Z',
    consentAccepted: true,
    consentVersion: '1.0-UY-18331',
    workshopCode: 'TALLER-INTERIOR',
    parentesco: 'tutor_referente',
    departamento_region: 'interior_rural_localidad',
    tipo_centro: 'publico_anep',
    edad_hijo: 11,
    genero_hijo: 'femenino',
    estado_celular: 'ya_tiene',
    edad_primer_celular: 10,
    edad_acceso_internet: '6_a_7',
    otros_dispositivos: ['ceibalita_pc', 'tv_living'],
    motivo_principal_entrega: 'estudio_tareas',
    horas_semana: '2_a_3h',
    horas_fin_semana: '2_a_4h',
    actividades_percibidas: ['whatsapp_chat', 'videos_cortos', 'tareas_ia'],
    certeza_supervision: 3,
    uso_control_parental: 'no_desconoce',
    lugar_dormir_celular: 'dentro_apagado',
    frecuencia_conflictos: 'a_veces',
    principal_preocupacion: 'grooming_desconocidos',
    comentario_abierto: 'Soy la abuela y me cuesta entender cómo configurar el Family Link en el celular.'
  }
];
