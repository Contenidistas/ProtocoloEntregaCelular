export const usageTrackerGuides = {
  android: {
    name: 'Android · Bienestar Digital',
    badge: 'Integrado de fábrica en todos los Android',
    route: 'Ajustes ⚙️ ➔ Bienestar digital y controles parentales',
    description:
      'Todos los teléfonos Android modernos traen instalado un panel que registra minuto a minuto cuánto tiempo estuvo encendida la pantalla, qué aplicaciones usamos más, cuántas veces desbloqueamos el teléfono y cuántas notificaciones recibimos.',
    metricsToLook: [
      {
        title: 'Gráfico circular del día',
        detail: 'Muestra el tiempo total de pantalla de hoy y el desglose por colores de las 3 o 4 apps que más horas consumieron.'
      },
      {
        title: 'Contador de desbloqueos',
        detail: 'Permite ver cuántas veces agarramos el celular por impulso (muchas personas se sorprenden al ver entre 70 y 120 desbloqueos diarios).'
      },
      {
        title: 'Notificaciones recibidas',
        detail: 'Identifica qué aplicación nos está interrumpiendo todo el día (a veces un solo grupo de WhatsApp o juego genera más de 150 alertas).'
      }
    ],
    widgetTip:
      '💡 Consejo práctico: Mantené apretado el fondo de pantalla de tu celular ➔ tocá "Widgets" ➔ agregá el widget de "Bienestar Digital" en la primera pantalla. Ver las horas en vivo ayuda a autorregularse sin esfuerzo.'
  },
  ios: {
    name: 'iPhone / iPad · Tiempo de Uso',
    badge: 'Integrado de fábrica en iOS',
    route: 'Configuración ⚙️ ➔ Tiempo de uso ➔ Ver toda la actividad',
    description:
      'Apple incluye la herramienta "Tiempo de uso", que entrega un balance diario y semanal comparando si esta semana usamos el celular más o menos que la anterior, tanto para adultos como para los hijos.',
    metricsToLook: [
      {
        title: 'Promedio diario y categorías',
        detail: 'Divide el uso en Redes Sociales, Entretenimiento, Juegos y Productividad, mostrando cuántas horas semanales dedicamos a cada rubro.'
      },
      {
        title: 'Levantadas del teléfono (Pickups)',
        detail: 'Indica cuántas veces levantamos el iPhone de la mesa y cuál fue la primera aplicación que abrimos apenas nos despertamos.'
      },
      {
        title: 'Distancia de la pantalla',
        detail: 'En Configuración > Tiempo de uso > Distancia de la pantalla, usa la cámara frontal para avisarte amablemente cuando acercás el celular a menos de 30 cm de los ojos.'
      }
    ],
    widgetTip:
      '💡 Consejo práctico: Activá "Compartir entre dispositivos" y colocá el widget de "Tiempo de uso" en la pantalla de inicio del iPhone para que toda la familia vea su progreso diario.'
  },
  extraApps: [
    {
      name: 'StayFree (Android / iOS)',
      purpose: 'Estadísticas claras y comparativa saludable',
      description: 'App gratuita y sin publicidad invasiva que muestra el historial de uso, permite comparar con el promedio mundial y envía recordatorios amables cuando llevamos más de 25 minutos seguidos en una red.',
      url: 'https://stayfreeapps.com/'
    },
    {
      name: 'Forest: Mantente enfocado',
      purpose: 'Ideal para estudiar o cenar sin tocar el celular',
      description: 'Transforma la desconexión en un juego positivo: cuando vas a estudiar o cenar en familia, plantás una semilla virtual. Si nadie abre redes durante 45 minutos, crece un árbol en el bosque familiar.',
      url: 'https://www.forestapp.cc/'
    },
    {
      name: 'Olauncher / Minimalist Phone',
      purpose: 'Quitar los íconos coloridos adictivos',
      description: 'Reemplaza la pantalla llena de íconos brillantes y globitos rojos por una lista limpia de texto con las 5 herramientas que realmente necesitás usar.',
      url: 'https://play.google.com/store/apps/details?id=app.olauncher'
    }
  ]
};

export const appTimeLimitPresets = [
  {
    category: 'Redes Sociales y Videos Cortos (TikTok, Instagram, Reels, Shorts)',
    recommendedLimit: '30 a 45 min / día',
    why: 'Son las plataformas con diseño de "máquina tragamonedas" (scroll infinito). Poner un tope diario evita perder horas sin darse cuenta.',
    androidSteps: 'Ajustes > Bienestar digital > Panel > tocar el relojito de arena ⏳ al lado de TikTok/Instagram > fijar 45 min.',
    iosSteps: 'Configuración > Tiempo de uso > Límites de apps > Agregar límite > Redes sociales > fijar 45 min.'
  },
  {
    category: 'Videojuegos en el celular (Roblox, Brawl Stars, Clash Royale, Minecraft)',
    recommendedLimit: '45 a 60 min / día (días de clase)',
    why: 'Permite disfrutar del juego con amigos pero asegura que el temporizador avise 5 minutos antes de cerrarse para terminar la partida sin berrinches.',
    androidSteps: 'Ajustes > Bienestar digital > Panel (o desde Google Family Link en el celular de mamá/papá) > Límites diarios por app.',
    iosSteps: 'Configuración > Tiempo de uso > Límites de apps > Juegos > fijar tiempo y activar "Bloquear al alcanzar el límite".'
  },
  {
    category: 'Mensajería (WhatsApp)',
    recommendedLimit: 'Sin tope rígido de día, pero con bloqueo nocturno y grupos silenciados',
    why: 'Como se usa para comunicarse con la familia o pedir deberes de clase, en vez de cerrarla de día conviene silenciar grupos ruidosos y apagarla de noche.',
    androidSteps: 'En Modo Descanso / Family Link: bloquear a partir de las 21:30 hs dejando solo llamadas telefónicas.',
    iosSteps: 'Configuración > Tiempo de uso > Tiempo de inactividad (21:30 a 07:00 hs).'
  }
];

export const doNotDisturbProfiles = [
  {
    id: 'modo-descanso',
    title: '1. Perfil "Descanso / Sueño" (Programado de 21:30 a 07:00 hs)',
    badge: 'El más importante para el cerebro',
    summary: 'Se activa solo todas las noches sin tener que acordarse. Prepara al cerebro para producir melatonina y evita que el celular suene de madrugada.',
    features: [
      'Cambia la pantalla automáticamente a Escala de Grises (blanco y negro), quitándole el atractivo visual a las redes.',
      'Activa la Luz Nocturna / Night Shift (tono cálido ámbar sin radiación azul).',
      'Silencia todas las notificaciones de grupos, redes y juegos, permitiendo únicamente llamadas de contactos favoritos (emergencias familiares).'
    ],
    howToConfigure: 'Android: Ajustes > Bienestar digital > Modo Descanso. | iPhone: Configuración > Enfoque > Sueño.'
  },
  {
    id: 'modo-estudio',
    title: '2. Perfil "Estudio / Trabajo sin distracciones"',
    badge: 'Para recuperar la atención profunda',
    summary: 'Ideal tanto para cuando los hijos hacen los deberes o preparan un escrito como para cuando los adultos trabajan.',
    features: [
      'Oculta y pausa temporalmente las aplicaciones distractoras (Instagram, TikTok, juegos) mientras sigue permitiendo usar la calculadora, el diccionario o CREA.',
      'Evita el "costo de cambio cognitivo": cada vez que miramos un mensaje mientras estudiamos, perdemos hasta 20 minutos de concentración real.',
      'Se puede activar con un solo toque desde la barra superior del teléfono durante bloques de 45 minutos.'
    ],
    howToConfigure: 'Android: Ajustes > Bienestar digital > Modo sin distracciones. | iPhone: Configuración > Enfoque > Trabajo / Estudio.'
  },
  {
    id: 'modo-mesa',
    title: '3. Perfil "Mesa Familiar y Tiempo Compartido"',
    badge: 'Convivencia en casa',
    summary: 'Un hábito compartido donde grandes y chicos ponemos el celular en silencio antes de sentarnos a almorzar, cenar o conversar.',
    features: [
      'Evita que las vibraciones o sonidos en medio de la comida interrumpan el relato de cómo nos fue en el día.',
      'Da el ejemplo desde el mundo adulto: demuestra con hechos que las personas que tenemos enfrente son más importantes que cualquier notificación.',
      'Se complementa dejando los teléfonos juntos en una panera o estante lejos de la mesa.'
    ],
    howToConfigure: 'Deslizar la barra superior del celular > tocar "No molestar" por 1 hora antes de sentarse a la mesa.'
  }
];

export const safeDailyConfigsChecklist = [
  {
    id: 'cfg-globitos',
    title: 'Apagar los "globitos rojos" con números en los íconos',
    category: 'Menos ansiedad',
    description: 'Esos círculos rojos (ej. "99+ mensajes") fueron diseñados específicamente para disparar urgencia en el cerebro. En Ajustes > Notificaciones > Globos de íconos, desactivalos para entrar a las apps solo cuando vos decidas.'
  },
  {
    id: 'cfg-grupos-wsp',
    title: 'Evitar que desconocidos nos agreguen a grupos de WhatsApp',
    category: 'Seguridad en 30 seg',
    description: 'Abrí WhatsApp > Ajustes > Privacidad > Grupos y elegí "Mis contactos" (o "Mis contactos, excepto..."). Esto frena de raíz estafas, sorteos falsos y grupos masivos con extraños.'
  },
  {
    id: 'cfg-dos-pasos',
    title: 'Activar la Verificación en Dos Pasos (PIN) en WhatsApp e Instagram',
    category: 'Protección de cuenta',
    description: 'En WhatsApp > Ajustes > Cuenta > Verificación en dos pasos, creá un PIN de 6 dígitos. Así, aunque alguien intente clonar el chip o engañar con un código por SMS, no podrá robar la cuenta.'
  },
  {
    id: 'cfg-autoplay',
    title: 'Desactivar la Reproducción Automática (Autoplay) en YouTube y Netflix',
    category: 'Control del tiempo',
    description: 'Apagar el interruptor de "Reproducción automática del siguiente video" le devuelve al cerebro el "punto de frenado" natural para decidir si realmente quiere ver otro video o ir a hacer otra cosa.'
  },
  {
    id: 'cfg-privacidad-redes',
    title: 'Cuentas privadas por defecto y sin ubicación en tiempo real',
    category: 'Huella digital',
    description: 'En Instagram y TikTok: Privacidad > Cuenta privada. Además, revisar en los permisos del teléfono que las redes sociales y la cámara no adjunten el GPS exacto en las historias.'
  },
  {
    id: 'cfg-notificaciones-humanas',
    title: 'Regla de las "Notificaciones solo de personas reales"',
    category: 'Paz mental',
    description: 'Entrar a Ajustes > Notificaciones y dejar activadas únicamente las alertas de mensajes directos de personas reales, apagando todas las alertas promocionales de juegos, tiendas y algoritmos ("Fulanito subió un reel").'
  }
];
