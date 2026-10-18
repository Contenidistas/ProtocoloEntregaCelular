const base = import.meta.env.BASE_URL;

export const officialDocuments = [
  {
    id: "folleto-santiago",
    title: "Guía de Uso Responsable del Primer Celular",
    author: "Prof. Esp. Santiago Hernández",
    entity: "Portal Uruguay Educa · DGES",
    fileUrl: `${base}documentos/Folleto-Celular-Santiago-Hernandez.pdf`,
    category: "Familias y Docentes",
    badge: "Folleto Oficial de Referencia",
    description: "El folleto base de esta plataforma: Modelo S.E.R.C., pautas claras de entrega, límites en la mesa y supervisión activa hacia la adolescencia."
  },
  {
    id: "unicef-ceibal",
    title: "Pantallas en Casa: Orientaciones para Acompañar una Navegación Segura",
    author: "Lorena Estefanell",
    entity: "UNICEF · Plan Ceibal · ANEP",
    fileUrl: `${base}documentos/UNICEF-Ceibal-Pantallas-en-Casa.pdf`,
    category: "Familias",
    badge: "Imprescindible para Familias",
    description: "Orientaciones fundamentales para acompañar a los chiquilines en el uso de pantallas sin caer en prohibiciones estériles, cuidando el vínculo y la salud emocional."
  },
  {
    id: "unesco-morduchowicz",
    title: "Ciudadanía Digital: Currículum para la Formación Docente y Familiar",
    author: "Dra. Roxana Morduchowicz (2020)",
    entity: "UNESCO",
    fileUrl: `${base}documentos/UNESCO-Ciudadania-Digital-Morduchowicz.pdf`,
    category: "Familias y Docentes",
    badge: "Marco Conceptual UNESCO",
    description: "Obra de referencia internacional sobre cómo formar el pensamiento crítico, la lectura reflexiva de pantallas y la convivencia democrática en entornos digitales."
  },
  {
    id: "ciudadania-guia",
    title: "Guía de Ciudadanía Digital: Derechos y Responsabilidades en Internet",
    author: "Grupo de Trabajo de Ciudadanía Digital",
    entity: "AGESIC · Plan Ceibal · ANEP",
    fileUrl: `${base}documentos/Ciudadania-Digital-Guia.pdf`,
    category: "Familias y Docentes",
    badge: "Estrategia Nacional UY",
    description: "Marco conceptual uruguayo sobre construcción de huella digital, uso crítico, seguro y participativo de las tecnologías para niños, niñas y adolescentes."
  },
  {
    id: "ciudadania-actividades",
    title: "Ciudadanía Digital: Propuestas y Actividades Prácticas",
    author: "Programa de Ciudadanía Digital",
    entity: "AGESIC · Plan Ceibal",
    fileUrl: `${base}documentos/Ciudadania-Digital-Actividades.pdf`,
    category: "Familias y Docentes",
    badge: "Talleres y Actividades",
    description: "Fichas didácticas listas para usar en el hogar o en el aula para reflexionar sobre huella digital, reputación online y empatía."
  },
  {
    id: "anep-agesic",
    title: "Seguridad de la Información: Guía Didáctica",
    author: "Equipo Técnico ANEP & AGESIC",
    entity: "AGESIC · ANEP",
    fileUrl: `${base}documentos/ANEP-AGESIC-Guia-Didactica-Seguridad.pdf`,
    category: "Docentes",
    badge: "Guía Didáctica Oficial",
    description: "Manual completo para trabajar en escuelas y liceos conceptos de contraseñas seguras, phishing, privacidad y protección en redes."
  },
  {
    id: "urcdp-ceip",
    title: "Protección de Datos Personales en el Ámbito Educativo",
    author: "URCDP (Unidad Reguladora de Datos Personales)",
    entity: "URCDP · AGESIC · CEIP",
    fileUrl: `${base}documentos/URCDP-CEIP-Proteccion-Datos-Personales.pdf`,
    category: "Docentes y Familias",
    badge: "Marco Normativo Ley 18.331",
    description: "Explicación práctica de la Ley 18.331 aplicada a fotos escolares, uso de plataformas digitales y consentimiento de los adultos responsables."
  },
  {
    id: "recursos-maestro-limites",
    title: "Recursos para el Maestro: Puesta de Límites y Convivencia",
    author: "ANEP - CEIP",
    entity: "ANEP · DGEIP",
    fileUrl: `${base}documentos/Recursos-Maestro-Limites.pdf`,
    category: "Familias y Docentes",
    badge: "Crianza y Límites",
    description: "Orientaciones psicopedagógicas sobre la importancia de los límites claros, afectivos y firmes como estructura de cuidado para el desarrollo infantil."
  },
  {
    id: "hostigamiento-escolar",
    title: "Guía General ante Situaciones de Hostigamiento Escolar",
    author: "Consejo de Educación Inicial y Primaria",
    entity: "ANEP · DGEIP",
    fileUrl: `${base}documentos/Guia-General-Hostigamiento-Escolar.pdf`,
    category: "Docentes",
    badge: "Protocolo de Actuación",
    description: "Pautas de intervención institucional frente a dinámicas de acoso entre pares, tanto presencial como mediado por tecnologías."
  },
  {
    id: "recursos-maestro-hostigamiento",
    title: "Recursos para el Maestro: Abordaje del Hostigamiento entre Pares",
    author: "ANEP - CEIP",
    entity: "ANEP · DGEIP",
    fileUrl: `${base}documentos/Recursos-Maestro-Hostigamiento.pdf`,
    category: "Docentes",
    badge: "Intervención Áulica",
    description: "Herramientas concretas para desarticular roles de agresor, víctima y espectadores en el grupo clase y fortalecer la empatía."
  },
  {
    id: "recursos-maestro-maltrato",
    title: "Recursos para el Maestro: Detección y Abordaje de Maltrato",
    author: "ANEP - CEIP",
    entity: "ANEP · DGEIP",
    fileUrl: `${base}documentos/Recursos-Maestro-Maltrato.pdf`,
    category: "Docentes",
    badge: "Detección Temprana",
    description: "Herramientas para identificar señales de alarma físicas y emocionales en el alumnado y activar las redes de protección institucional."
  },
  {
    id: "recursos-maestro-abuso",
    title: "Recursos para el Maestro: Prevención y Detección de Abuso",
    author: "ANEP - CEIP",
    entity: "ANEP · DGEIP · SIPIAV",
    fileUrl: `${base}documentos/Recursos-Maestro-Abuso.pdf`,
    category: "Docentes",
    badge: "Protección Integral",
    description: "Pautas de escucha protegida, indicadores de alerta y protocolos de articulación con INAU y SIPIAV ante situaciones de vulneración de derechos."
  }
];
