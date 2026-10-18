export const diagnosticAgeGroups = [
  {
    id: 'menores-9',
    label: 'Menos de 9 años',
    sublabel: '0 a 8 años · Infancia',
    minAge: 0,
    maxAge: 8,
    defaultAge: 7,
    alertType: 'warning',
    alertTitle: 'Advertencia importante: Edad temprana para un celular propio',
    alertMessage:
      'Los teléfonos inteligentes (smartphones) y las redes sociales NO están pensados para niños de esta edad. Por normativa internacional (COPPA) y términos de servicio, las redes sociales exigen un mínimo de 13 años, y las guías pediátricas en Uruguay (SUP, UNICEF y Plan Ceibal) recomiendan postergar el primer smartphone propio al menos hasta los 11-13 años (etapa de transición a Educación Media). Si utiliza pantallas en esta etapa, lo recomendable es que sea un dispositivo familiar compartido, en espacios comunes y con acompañamiento adulto.',
    questions: [
      {
        id: 'm9-1',
        question: 'Antes de prestarle un celular o tablet a tu hijo/a, ¿realizaste la configuración de control parental o perfil infantil?',
        workshopTopic: 'Buenas prácticas y controles parentales',
        targetSlideIndex: 5,
        topicNote: 'Veremos cómo activar filtros gratuitos en menos de 10 minutos para evitar contenidos inapropiados.'
      },
      {
        id: 'm9-2',
        question: '¿Sabés con exactitud qué aplicaciones, videos o juegos utiliza cuando está frente a una pantalla?',
        workshopTopic: 'El dilema de las redes y algoritmos',
        targetSlideIndex: 3,
        topicNote: 'Analizaremos cómo funcionan las recomendaciones automáticas y por qué no conviene dejar la reproducción continua.'
      },
      {
        id: 'm9-3',
        question: '¿Tenés acceso directo al dispositivo que usa para verificar que sus juegos no tengan chat abierto con desconocidos?',
        workshopTopic: 'Cine-foro y prevención en juegos online',
        targetSlideIndex: 6,
        topicNote: 'Abordaremos casos reales en plataformas infantiles (como Roblox o YouTube) y cómo prevenir contactos extraños.'
      },
      {
        id: 'm9-4',
        question: '¿El uso de pantallas se realiza únicamente en espacios comunes de la casa (living o comedor) y lejos de la hora de dormir?',
        workshopTopic: 'Neurociencia y desarrollo cerebral',
        targetSlideIndex: 2,
        topicNote: 'Revisaremos el impacto de la luz azul y la sobreestimulación en la corteza prefrontal durante la infancia.'
      },
      {
        id: 'm9-5',
        question: '¿En casa suelen atravesar los momentos de espera, aburrimiento o comidas sin recurrir al teléfono celular?',
        workshopTopic: 'El aburrimiento como motor creativo',
        targetSlideIndex: 2,
        topicNote: 'Conoceremos los aportes de la Dra. Marián Rojas Estapé sobre por qué el aburrimiento es clave para la inteligencia.'
      },
      {
        id: 'm9-6',
        question: '¿Los adultos del hogar logramos dejar nuestros celulares de lado durante el almuerzo, la cena y el juego con ellos?',
        workshopTopic: 'Estrategias y ejemplo adulto en el hogar',
        targetSlideIndex: 5,
        topicNote: 'Trabajaremos el modelado adulto: en la infancia los hábitos se aprenden principalmente por imitación.'
      }
    ]
  },
  {
    id: '9-a-12',
    label: '9 a 12 años',
    sublabel: 'Etapa primer celular',
    minAge: 9,
    maxAge: 12,
    defaultAge: 11,
    alertType: 'info',
    alertTitle: 'Etapa de transición: Entrega acompañada y progresiva',
    alertMessage:
      'Aunque las redes sociales (TikTok, Instagram, WhatsApp) están diseñadas legalmente para mayores de 13 años, entre los 9 y 12 años (fin de Primaria o inicio de Liceo/UTU) muchas familias evalúan entregar el primer celular por comunicación en traslados. En esta edad el teléfono no debe entregarse con "vía libre": requiere configuración previa y acompañamiento cercano.',
    questions: [
      {
        id: 'e10-1',
        question: 'Antes de entregar el celular a tu hijo/a, ¿realizaste la configuración de control parental (Google Family Link o Apple En Familia)?',
        workshopTopic: 'Controles parentales y configuración previa',
        targetSlideIndex: 5,
        topicNote: 'Veremos cómo los controles parentales funcionan como barandas de cuidado para aprobar apps y fijar horarios.'
      },
      {
        id: 'e10-2',
        question: '¿Sabés cuántas redes sociales o juegos con chat tiene tu hijo/a instalados hoy en su teléfono?',
        workshopTopic: 'El dilema de las redes y diseño persuasivo',
        targetSlideIndex: 3,
        topicNote: 'Conversaremos sobre las edades mínimas de cada red y cómo están diseñadas para capturar su atención.'
      },
      {
        id: 'e10-3',
        question: '¿Tenés acceso a las redes sociales y al dispositivo de tu hijo/a como parte de un acuerdo de supervisión?',
        workshopTopic: 'Ciudadanía digital y Modelo S.E.R.C.',
        targetSlideIndex: 1,
        topicNote: 'En los primeros pasos digitales la privacidad es con respecto a extraños, no frente a los padres que los cuidan.'
      },
      {
        id: 'e10-4',
        question: '¿El celular queda cargando fuera de su dormitorio durante toda la noche para proteger su descanso?',
        workshopTopic: 'Neurociencia, sueño y FOMO nocturno',
        targetSlideIndex: 2,
        topicNote: 'Abordaremos por qué dormir con el celular en el cuarto altera el sueño profundo y el rendimiento escolar.'
      },
      {
        id: 'e10-5',
        question: '¿Suelen charlar sobre lo que ocurre en los grupos de WhatsApp de la clase (burlas, stickers, exclusiones)?',
        workshopTopic: 'Cine-foro y dilemas reales en sala',
        targetSlideIndex: 6,
        topicNote: 'Analizaremos casos prácticos de convivencia escolar en grupos de mensajería y cómo intervenir sin juzgar.'
      },
      {
        id: 'e10-6',
        question: '¿Acordaron juntos reglas claras sobre cuándo no usar el celular (en la mesa, estudiando) antes o después de dárselo?',
        workshopTopic: 'Pacto familiar y compromiso mutuo',
        targetSlideIndex: 7,
        topicNote: 'Al cierre del taller veremos cómo firmar o renovar un Acuerdo Familiar de convivencia digital.'
      }
    ]
  },
  {
    id: '13-a-17',
    label: '13 a 17 años',
    sublabel: 'Adolescencia · Liceo / UTU',
    minAge: 13,
    maxAge: 17,
    defaultAge: 14,
    alertType: 'purple',
    alertTitle: 'Adolescencia: De la supervisión técnica al diálogo y el criterio propio',
    alertMessage:
      'A partir de los 13 años los adolescentes alcanzan la edad mínima prevista por la mayoría de las plataformas, pero su corteza prefrontal (encargada del control de impulsos y la regulación emocional) sigue en maduración. El acompañamiento combina acuerdos de horarios y privacidad con mucha escucha y pensamiento crítico.',
    questions: [
      {
        id: 'ad-1',
        question: 'Antes de entregar el celular o habilitarle nuevas aplicaciones, ¿realizaron alguna configuración de control parental o de privacidad?',
        workshopTopic: 'Buenas prácticas de privacidad y seguridad',
        targetSlideIndex: 5,
        topicNote: 'Repasaremos configuraciones clave en redes (cuentas privadas, ocultar ubicación y desactivar notificaciones).'
      },
      {
        id: 'ad-2',
        question: '¿Sabés cuántas redes sociales tiene tu hijo/a actualmente y cuáles utiliza con mayor frecuencia?',
        workshopTopic: 'Economía de la atención y redes sociales',
        targetSlideIndex: 3,
        topicNote: 'Exploraremos cómo operan los algoritmos de scroll infinito y recompensa variable en la adolescencia.'
      },
      {
        id: 'ad-3',
        question: '¿Tenés acceso o conocés los perfiles en redes sociales de tu hijo/a para acompañar su huella digital?',
        workshopTopic: 'Construcción de ciudadanía y huella digital',
        targetSlideIndex: 1,
        topicNote: 'Veremos cómo acompañar progresivamente sin caer ni en la invasión sin diálogo ni en el abandono digital.'
      },
      {
        id: 'ad-4',
        question: '¿Logra desconectarse de noche sin quedarse hasta la madrugada pendiente de mensajes o historias (FOMO / vamping)?',
        workshopTopic: 'Del FOMO al JOMO y descanso adolescente',
        targetSlideIndex: 4,
        topicNote: 'Profundizaremos en el miedo a quedar afuera (FOMO) y cómo recuperar el placer de desconectar (JOMO).'
      },
      {
        id: 'ad-5',
        question: '¿Han conversado sobre los riesgos de compartir fotos íntimas, apuestas online o trato respetuoso en redes?',
        workshopTopic: 'Casos prácticos y normativa en Uruguay',
        targetSlideIndex: 6,
        topicNote: 'Debatiremos dilemas reales sobre sexting, Ley 19.580, datos personales (Ley 18.331) y canales de ayuda.'
      },
      {
        id: 'ad-6',
        question: '¿Sentís que si hoy atravesara un problema en internet (acoso, presión o chantaje) acudiría a vos sin miedo al reto?',
        workshopTopic: 'Confianza familiar y canales de ayuda',
        targetSlideIndex: 7,
        topicNote: 'Trabajaremos cómo construir un canal de escucha segura para que siempre pidan ayuda a tiempo.'
      }
    ]
  },
  {
    id: 'mayores-18',
    label: '18 años o más',
    sublabel: 'Mayor de edad · Juventud',
    minAge: 18,
    maxAge: 99,
    defaultAge: 19,
    alertType: 'emerald',
    alertTitle: 'Mayoría de edad: Acompañamiento afectivo y atención a procesos de angustia',
    alertMessage:
      'Cuando el hijo/a es mayor de edad ya cuenta con plena autonomía legal sobre sus dispositivos y cuentas, por lo que no aplican controles parentales técnicos. En esta etapa, lo fundamental desde la familia es sostener la cercanía vincular y estar atentos a posibles procesos de angustia, ansiedad, aislamiento, alteraciones del sueño, apuestas en línea o malestar emocional asociados a la hiperconexión.',
    questions: [
      {
        id: 'my-1',
        question: '¿Observás si el uso intenso de redes sociales o del celular se asocia en él/ella a momentos de angustia, irritabilidad o bajón anímico?',
        workshopTopic: 'FOMO, comparación social y salud mental',
        targetSlideIndex: 4,
        topicNote: 'Abordaremos cómo la comparación constante con vidas editadas en redes impacta en la autoestima y el ánimo.'
      },
      {
        id: 'my-2',
        question: '¿Percibís que logra descansar adecuadamente de noche sin que la pantalla altere su ciclo de sueño?',
        workshopTopic: 'Neurociencia, descanso y atención profunda',
        targetSlideIndex: 2,
        topicNote: 'Revisaremos cómo la hiperconexión nocturna afecta las funciones ejecutivas, el estudio y la regulación emocional.'
      },
      {
        id: 'my-3',
        question: '¿Mantiene espacios de encuentro cara a cara con amigos, actividades físicas o proyectos fuera de la pantalla?',
        workshopTopic: 'FOMO vs. JOMO y desconexión activa',
        targetSlideIndex: 4,
        topicNote: 'Veremos la importancia de preservar vínculos presenciales y espacios libres de exigencia digital.'
      },
      {
        id: 'my-4',
        question: '¿En la convivencia cotidiana (como las comidas familiares) logran compartir charlas sin pantallas de por medio?',
        workshopTopic: 'Buenas prácticas de convivencia en el hogar',
        targetSlideIndex: 5,
        topicNote: 'Repasaremos acuerdos de convivencia hogareña donde todos los adultos predicamos con el ejemplo.'
      },
      {
        id: 'my-5',
        question: '¿Han podido conversar sobre cuidados en la vida adulta digital (reputación laboral, estafas virtuales o apuestas online)?',
        workshopTopic: 'Economía de la atención y huella digital',
        targetSlideIndex: 3,
        topicNote: 'Analizaremos cómo los algoritmos comerciales y las plataformas de apuestas buscan captar a los jóvenes.'
      },
      {
        id: 'my-6',
        question: '¿Sentís que en casa cuenta con un espacio de escucha sin juicios para hablar si atraviesa un proceso de angustia o desborde?',
        workshopTopic: 'Cierre, sostén familiar y canales en Uruguay',
        targetSlideIndex: 7,
        topicNote: 'Conoceremos las pautas de contención familiar y las líneas oficiales de orientación y ayuda en Uruguay.'
      }
    ]
  }
];

export const responseOptions = [
  { id: 'si', label: 'Sí', shortLabel: 'Sí' },
  { id: 'no', label: 'No', shortLabel: 'No' },
  { id: 'a_veces', label: 'A veces', shortLabel: 'A veces' },
  { id: 'no_aplica', label: 'No aplica', shortLabel: 'No aplica' }
];

export function getGroupByExactAge(age) {
  const num = Number(age);
  if (isNaN(num) || num < 9) return diagnosticAgeGroups[0];
  if (num <= 12) return diagnosticAgeGroups[1];
  if (num <= 17) return diagnosticAgeGroups[2];
  return diagnosticAgeGroups[3];
}
