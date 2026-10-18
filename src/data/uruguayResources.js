export const uruguayContacts = [
  {
    name: "Línea Azul - INAU",
    description: "Línea gratuita nacional y confidencial para la atención y denuncia de situaciones de vulneración de derechos de niñas, niños y adolescentes en Uruguay.",
    number: "0800 5050",
    mobileShort: "*5050",
    free: true,
    badge: "Prioridad Urgente",
    type: "phone",
    website: "https://www.inau.gub.uy",
    details: "Disponible en todo el territorio nacional. Ante sospechas fundadas de grooming, maltrato o explotación en línea."
  },
  {
    name: "Unidad de Cibercrimen - Policía Nacional",
    description: "Dirección de Investigaciones de la Policía Nacional (Ministerio del Interior) especializada en delitos informáticos y ciberdelincuencia.",
    number: "2030 4625",
    email: "delitosinformaticos@minterior.gub.uy",
    badge: "Delitos Penales",
    type: "police",
    website: "https://denuncias.minterior.gub.uy",
    details: "Para radicar denuncias de estafas, extorsión digital, difusión de imágenes privadas o perfiles falsos que atenten contra menores."
  },
  {
    name: "CERTuy (AGESIC)",
    description: "Centro Nacional de Respuesta a Incidentes de Seguridad Informática del Uruguay, dependiente de Presidencia de la República.",
    email: "cert@cert.uy",
    number: "2901 0065",
    badge: "Ciberseguridad",
    type: "gov",
    website: "https://www.gub.uy/agesic/certuy",
    details: "Reportes de vulnerabilidades, suplantación masiva de identidad institucional (phishing) y brechas de seguridad digital pública."
  },
  {
    name: "Plan Ceibal - Seguridad & Ciudadanía Digital",
    description: "Centro de soporte, guías formativas para estudiantes y docentes sobre uso seguro de tecnología educativa y dispositivos.",
    number: "0800 2342",
    mobileShort: "*2342",
    badge: "Educativo",
    type: "education",
    website: "https://ceibal.edu.uy",
    details: "Consultas sobre seguridad en plataformas Ceibal (CREA, Matific), bloqueos en tablets Ceibal y recursos de ciudadanía digital."
  },
  {
    name: "Uruguay Educa (DGES - ANEP)",
    description: "Portal educativo de la Administración Nacional de Educación Pública con recursos pedagógicos y orientaciones en TIC.",
    email: "shernandez@uruguayeduca.edu.uy",
    badge: "Pedagógico",
    type: "portal",
    website: "https://uruguayeduca.anep.edu.uy",
    details: "Espacio de Educación y TIC coordinado con la Dirección General de Educación Secundaria."
  }
];

export const legalFramework = [
  {
    id: "ley18331",
    title: "Ley N° 18.331: Protección de Datos Personales y Habeas Data",
    summary: "Regula el tratamiento de la información personal en Uruguay, garantizando los derechos de acceso, rectificación y supresión.",
    keyPoints: [
      "Los datos de niñas, niños y adolescentes gozan de especial tutela por su condición de vulnerabilidad.",
      "El consentimiento para la recolección y uso comercial de datos de menores de edad debe ser otorgado obligatoriamente por sus padres o tutores legales.",
      "Vigila que las empresas y aplicaciones extranjeras no exploten la información de navegación de los niños."
    ],
    entity: "URCDP (Unidad Reguladora y de Control de Datos Personales) - AGESIC"
  },
  {
    id: "cna",
    title: "Código de la Niñez y la Adolescencia (CNA - Uruguay)",
    summary: "Marco jurídico de los derechos y deberes inherentes a la patria potestad y la responsabilidad de crianza.",
    keyPoints: [
      "Establece el 'interés superior del niño' como principio rector inquebrantable.",
      "Los padres tienen el deber ineludible de orientación, vigilancia y educación integral.",
      "La supervisión del uso del celular no constituye una vulneración ilegítima de privacidad cuando responde a la protección frente a peligros ciertos del entorno digital.",
      "A partir de los 13 años rige el régimen de responsabilidad penal juvenil frente a conductas ilícitas tipificadas."
    ],
    entity: "Poder Judicial e INAU"
  },
  {
    id: "ley19580",
    title: "Ley N° 19.580 y Código Penal (Art. 272 ter)",
    summary: "Protección integral contra la violencia hacia las mujeres basada en género y difusión no consentida de imágenes íntimas.",
    keyPoints: [
      "Tipifica penalmente la divulgación o exhibición no autorizada de fotos o videos íntimos sin consentimiento expreso (hasta 3 años de penitenciaría).",
      "Sanciona el acoso cibernético, la extorsión con imágenes sexuales (sextorsión) y la violencia en redes sociales.",
      "Incluso el mero reenvío o almacenamiento en chats colectivos constituye una infracción legal sancionable."
    ],
    entity: "Fiscalía General de la Nación"
  },
  {
    id: "ley20252",
    title: "Ley N° 20.252: Ciberdelitos y Cibercrimen en Uruguay",
    summary: "Actualización de las figuras delictivas vinculadas al fraude digital, acceso ilícito a sistemas y daño informático.",
    keyPoints: [
      "Sanciona el acceso indebido a cuentas de redes sociales o correos ajenos mediante suplantación de identidad o robo de contraseñas.",
      "Establece penas específicas para estafas informáticas y suplantación de identidad en plataformas de mensajería.",
      "Permite a los fiscales y jueces la incautación y peritaje forense de dispositivos tecnológicos."
    ],
    entity: "Ministerio del Interior y Poder Judicial"
  }
];
