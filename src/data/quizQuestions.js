export const quizQuestions = [
  {
    id: 1,
    question: "¿Tu hijo/a demuestra responsabilidad con sus pertenencias cotidianas?",
    explanation: "Cuidar la mochila, la túnica/uniforme, los libros o las llaves del hogar es el primer indicador de si podrá cuidar un dispositivo de alto valor.",
    options: [
      { text: "Rara vez; pierde u olvida cosas con frecuencia.", score: 0 },
      { text: "A veces necesita recordatorios, pero en general cuida lo suyo.", score: 1 },
      { text: "Sí, es sumamente cuidadoso/a y ordenado/a con sus cosas.", score: 2 }
    ]
  },
  {
    id: 2,
    question: "¿Cómo reacciona habitualmente cuando llega el momento de apagar pantallas (TV, tablet, consola)?",
    explanation: "La capacidad de autorregulación emocional es clave para evitar conflictos constantes por el uso de pantallas.",
    options: [
      { text: "Suele tener rabietas intensas, protestar o negarse a apagar.", score: 0 },
      { text: "Negocia o pide '5 minutos más', pero tras advertencia cumple la regla.", score: 1 },
      { text: "Acepta el límite acordado sin mayor conflicto.", score: 2 }
    ]
  },
  {
    id: 3,
    question: "¿Comprende que en internet las personas no siempre son quienes dicen ser?",
    explanation: "Es fundamental que distinga entre contactos de la vida real (familia, compañeros de clase) y perfiles desconocidos en juegos o redes.",
    options: [
      { text: "No, suele confiar plenamente en cualquiera que le hable en un juego.", score: 0 },
      { text: "Tiene una noción básica, pero a veces se muestra ingenuo/a.", score: 1 },
      { text: "Sí, entiende que nunca debe compartir datos personales, fotos ni ubicaciones con extraños.", score: 2 }
    ]
  },
  {
    id: 4,
    question: "¿Suele acudir a ti cuando se siente incómodo/a, asustado/a o comete un error?",
    explanation: "El canal de comunicación abierta es la mayor barrera de seguridad ante ciberacoso o grooming.",
    options: [
      { text: "Tiende a ocultar las cosas por miedo a ser castigado/a.", score: 0 },
      { text: "A veces tarda en contar, pero finalmente busca apoyo.", score: 1 },
      { text: "Sí, existe un diálogo fluido y de confianza ante situaciones complejas.", score: 2 }
    ]
  },
  {
    id: 5,
    question: "¿Por qué motivo principal se está considerando entregarle un celular en este momento?",
    explanation: "El motivo debe responder a una necesidad real de comunicación o autonomía progresiva, no sólo a la presión de pares.",
    options: [
      { text: "'Porque todos sus compañeros ya tienen uno y no quiero que quede afuera'.", score: 0 },
      { text: "Empieza a trasladarse solo/a (liceo, club, ómnibus) y necesitamos coordinar llegadas.", score: 2 },
      { text: "Para que juegue y se entretenga en los ratos libres del hogar.", score: 1 }
    ]
  },
  {
    id: 6,
    question: "¿Como adultos en el hogar, tienen el tiempo y la disposición para configurar controles parentales y supervisar activamente?",
    explanation: "El protocolo SERC exige presencia adulta activa; el celular no debe sustituir la supervisión.",
    options: [
      { text: "Sinceramente estamos con poco tiempo y nos cuesta dominar la tecnología.", score: 0 },
      { text: "Estamos dispuestos a aprender y dedicar tiempo a revisar periódicamente.", score: 2 },
      { text: "Preferimos que aprenda solo/a confiando en su buen criterio.", score: 0 }
    ]
  }
];

export const getQuizResult = (totalScore) => {
  if (totalScore <= 4) {
    return {
      status: "Aún es pronto para un smartphone propio",
      color: "red",
      badge: "Etapa Previa",
      summary: "Los indicadores sugieren que aún faltan afianzar hábitos de autorregulación y responsabilidad. Un smartphone conectado 24/7 podría generar más estrés familiar que beneficios.",
      recommendations: [
        "Si necesitas comunicación en traslados, evalúa un celular básico ('de teclas' sin internet) o un reloj inteligente con llamadas a contactos autorizados.",
        "Trabaja primero en el cumplimiento de horarios de descanso y el cuidado de pertenencias personales.",
        "Comienza prestando un dispositivo familiar en espacios comunes (living, cocina) con supervisión directa."
      ]
    };
  } else if (totalScore <= 8) {
    return {
      status: "Momento de Transición: Entrega con Supervisión Estrecha",
      color: "amber",
      badge: "Etapa de Aprendizaje Guiado",
      summary: "Tu hijo/a muestra indicios favorables de madurez, pero requerirá un acompañamiento cercano y límites técnicos muy claros desde el minuto cero.",
      recommendations: [
        "Implementar el 'Acuerdo Familiar' por escrito antes de encender el equipo.",
        "Configurar Google Family Link o Apple Tiempo de Uso con aprobación obligatoria de descargas y horario de apagado nocturno.",
        "Sin celulares en el dormitorio a la hora de dormir; el cargador debe estar en una zona común del hogar.",
        "Supervisión activa sin invadir desmedidamente: revisar juntos una vez por semana la actividad del equipo."
      ]
    };
  } else {
    return {
      status: "Listo/a para su Primer Celular en clave de Ciudadanía Digital",
      color: "emerald",
      badge: "Etapa de Autonomía Acompañada",
      summary: "Existe un nivel adecuado de responsabilidad y diálogo familiar para dar este paso. La clave será mantener el pacto de confianza y revisar acuerdos a medida que crezca.",
      recommendations: [
        "Firmar el Acuerdo Familiar del Primer Celular con compromisos mutuos de ambas partes.",
        "Establecer que la privacidad se gana con responsabilidad demostrada.",
        "Definir juntos las aplicaciones iniciales y fijar momentos libres de pantallas para toda la familia (comidas, salidas).",
        "Recordar que el ejemplo de los adultos es la principal lección: si nosotros estamos pegados a la pantalla, ellos lo imitarán."
      ]
    };
  }
};
