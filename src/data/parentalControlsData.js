export const parentalControlsData = {
  android: {
    name: "Android (Google Family Link)",
    osName: "Android 10 o superior",
    tagline: "El estándar oficial de Google para supervisar cuentas y dispositivos de menores de 14 años en Uruguay.",
    depths: [
      {
        id: "basico",
        level: "Nivel 1: Esencial (10 minutos)",
        description: "Configuración mínima obligatoria antes de entregar el teléfono.",
        steps: [
          {
            title: "Crear una cuenta de Google para el menor con su fecha real",
            description: "Nunca crees la cuenta con una fecha de nacimiento falsa de adulto. En Uruguay y según Google, las cuentas de menores de 13/14 años requieren vinculación a un tutor legal.",
            howTo: "En el celular de mamá/papá, abre la app Google Family Link (disponible en Play Store y App Store) > Pulsa '+' o 'Agregar hijo' > Sigue los pasos para crear su correo @gmail.com supervisado.",
            tip: "Al usar su fecha de nacimiento real, YouTube Kids y la Play Store filtran por defecto contenidos inadecuados sin que tengas que bloquear todo manualmente."
          },
          {
            title: "Configurar el 'Horario de Descanso' (Bloqueo nocturno)",
            description: "El celular se bloqueará automáticamente a la hora pactada para cenar o dormir, evitando el 'vamping' (uso a oscuras en la cama).",
            howTo: "Abre Family Link > Selecciona el perfil del hijo/a > 'Límites' > 'Horario de descanso' > Fija el horario (ej. Domingos a Jueves de 21:30 a 07:00, Viernes y Sábados de 22:30 a 08:30).",
            tip: "Durante el horario de descanso, el celular aún permite hacer llamadas telefónicas de emergencia a los padres."
          },
          {
            title: "Exigir aprobación para descargas de aplicaciones",
            description: "Cada vez que tu hijo/a quiera instalar un juego o app (incluso gratuita), te llegará una notificación a tu celular para autorizarla o rechazarla.",
            howTo: "En Family Link > Perfil del hijo > 'Ajustes de cuenta' > 'Controles en Google Play' > 'Aprobaciones de compra' > Selecciona 'Todo el contenido'.",
            tip: "Aprovecha cada solicitud como una oportunidad de diálogo: '¿Por qué quieres este juego? ¿Qué datos te pide?'"
          }
        ]
      },
      {
        id: "intermedio",
        level: "Nivel 2: Intermedio (paso a paso)",
        description: "Regulación de aplicaciones específicas, filtros web y geolocalización.",
        steps: [
          {
            title: "Fijar límites de tiempo por aplicación individual",
            description: "Evita que pasen 4 horas en TikTok o Roblox mientras necesitan usar WhatsApp o Duolingo.",
            howTo: "En Family Link > 'Límites de apps' > Elige una aplicación (ej. TikTok, YouTube o Roblox) > Toca 'Establecer límite' (ej. 45 min/día). Puedes además bloquearla completamente en días lectivos.",
            tip: "Las aplicaciones educativas o de comunicación familiar pueden dejarse como 'Siempre permitidas'."
          },
          {
            title: "Activar SafeSearch y filtro de sitios web para adultos en Chrome",
            description: "Filtra resultados explícitos en búsquedas de Google y bloquea páginas de apuestas, violencia o pornografía.",
            howTo: "En Family Link > 'Ajustes' > 'Google Chrome' > Selecciona 'Intentar bloquear sitios web para adultos' o crea una lista blanca de sitios aprobados.",
            tip: "Ningún filtro técnico es 100% infalible; acompáñalo siempre con la regla: 'Si ves algo raro o que te asuste, dímelo de inmediato y nunca te culparé'."
          },
          {
            title: "Ubicación en tiempo real compartida responsablemente",
            description: "Permite ver dónde se encuentra el dispositivo cuando el joven viaja en transporte público o regresa del liceo.",
            howTo: "En Family Link > 'Ubicación' > 'Activar ubicación' > Configura alertas de llegada al centro educativo o al hogar.",
            tip: "Explícale al joven que esto es por su seguridad física en el trayecto, no para espiar cada minuto de su vida."
          }
        ]
      },
      {
        id: "avanzado",
        level: "Nivel 3: Privacidad avanzada y redes",
        description: "Protección de datos personales, permisos de hardware y compras in-app.",
        steps: [
          {
            title: "Revisar permisos de Cámara, Micrófono y Contactos",
            description: "Muchas apps y juegos acceden a la agenda familiar o escuchan en segundo plano sin justificación técnica.",
            howTo: "En el teléfono del menor > Ajustes > 'Privacidad y seguridad' > 'Administrador de permisos' > Revisa qué apps tienen acceso continuo al micrófono o a la ubicación exacta y desactívalo.",
            tip: "Aplica el principio de privilegio mínimo: un juego de rompecabezas no necesita acceso a los contactos ni a la cámara."
          },
          {
            title: "Bloqueo estricto de microtransacciones y compras con factura telefónica (Antel/Claro/Movistar)",
            description: "Evita sorpresas de cobros agregados en la factura mensual uruguaya por compras de 'diamantes' o suscripciones SMS.",
            howTo: "En la app Play Store del teléfono del menor > Ajustes > Autenticación > Exigir autenticación biométrica o contraseña para todas las compras. Además, contacta a la operadora para bloquear servicios de valor agregado (SMS premium).",
            tip: "Enseña el valor del dinero: los juegos 'free-to-play' están diseñados para frustrar al jugador e incitarlo a gastar dinero real."
          }
        ]
      }
    ]
  },
  ios: {
    name: "iPhone / iPad (Apple 'En familia')",
    osName: "iOS 16 o superior",
    tagline: "El ecosistema integrado de Apple para gestionar dispositivos familiares con alta protección de privacidad.",
    depths: [
      {
        id: "basico",
        level: "Nivel 1: Esencial (10 minutos)",
        description: "Configuración inicial indispensable a través de un grupo 'En familia'.",
        steps: [
          {
            title: "Crear una cuenta Apple ID para el menor dentro de tu grupo 'En familia'",
            description: "Nunca inicies sesión con tu propio Apple ID de adulto en el iPhone de tu hijo/a (eso mezclaría tus fotos, mensajes, historial y tarjetas de crédito).",
            howTo: "En tu iPhone > Configuración > Toca tu nombre > 'En familia' > Pulsa el ícono '+' (Agregar miembro) > 'Crear una cuenta para niños'. Sigue las instrucciones e ingresa su edad real.",
            tip: "El ID de menor queda protegido y no permite ser desvinculado sin autorización del representante de la familia."
          },
          {
            title: "Activar 'Tiempo Desactivado' (Downtime nocturno)",
            description: "Programa una ventana de tiempo en la que sólo las llamadas esenciales y mensajes con los padres estén disponibles.",
            howTo: "En tu iPhone > Configuración > 'Tiempo en pantalla' > Selecciona a tu hijo/a > 'Tiempo desactivado' > Activa 'Programado' (ej. 21:30 a 07:00 hs) y marca 'Bloquear al finalizar el tiempo'.",
            tip: "Evita que el iPhone quede cargándose en la mesa de luz del dormitorio del menor."
          },
          {
            title: "Activar 'Solicitar Compra' (Ask to Buy)",
            description: "Cualquier intento de descarga en App Store requerirá una aprobación inmediata desde el iPhone del adulto tutor.",
            howTo: "En tu iPhone > Configuración > 'En familia' > Selecciona el perfil del hijo/a > 'Solicitar compra' > Activar.",
            tip: "Te llegará una notificación emergente con los detalles de la app, su clasificación de edad y política de privacidad."
          }
        ]
      },
      {
        id: "intermedio",
        level: "Nivel 2: Intermedio (paso a paso)",
        description: "Filtros de contenido web explícito, límites de apps y seguridad en mensajes.",
        steps: [
          {
            title: "Límites de uso para redes sociales y entretenimiento",
            description: "Fija un cupo diario máximo para categorías completas (ej. Redes sociales) o apps puntuales como Instagram o TikTok.",
            howTo: "En 'Tiempo en pantalla' > Nombre de tu hijo > 'Límites para apps' > 'Agregar límite' > Marca las apps o categorías deseadas (ej. Redes sociales: 1 hora) y activa 'Bloquear al llegar al límite'.",
            tip: "El joven puede solicitar más tiempo desde su pantalla, y tú decides si concederle 15 minutos más o declinar."
          },
          {
            title: "Activar 'Seguridad en las Comunicaciones' de Apple",
            description: "El sistema analiza en el propio dispositivo si el menor recibe o intenta enviar fotos con desnudez en Mensajes, AirDrop o FaceTime, difuminándolas y mostrando un mensaje de advertencia con opciones de ayuda.",
            howTo: "En 'Tiempo en pantalla' > Nombre del hijo > 'Seguridad en las comunicaciones' > Activar 'Buscar fotos delicadas'.",
            tip: "Esta función protege su privacidad: Apple no ve las fotos, el procesamiento se hace 100% de manera local en el teléfono."
          },
          {
            title: "Restricción de contenido web para adultos en Safari",
            description: "Bloquea páginas con contenidos pornográficos y permite limitar la búsqueda web.",
            howTo: "En 'Tiempo en pantalla' > 'Restricciones de contenido y privacidad' > 'Contenido de las tiendas, la web, Siri...' > 'Contenido web' > Selecciona 'Limitar sitios para adultos'.",
            tip: "Puedes agregar sitios específicos que desees bloquear o autorizar permanentemente."
          }
        ]
      },
      {
        id: "avanzado",
        level: "Nivel 3: Privacidad avanzada y anti-rastreo",
        description: "Bloqueo de cambios de cuenta, código parental y reporte de privacidad.",
        steps: [
          {
            title: "Proteger los cambios de cuenta y código de acceso",
            description: "Evita que el menor intente cambiar la contraseña de su Apple ID o cerrar la sesión de supervisión.",
            howTo: "En 'Restricciones de contenido y privacidad' > Ve al final hasta 'Permitir cambios' > Configura 'Cambios de cuenta' en 'No permitir' y 'Cambios de código' en 'No permitir'.",
            tip: "Asegúrate de recordar o anotar en un lugar seguro el Código de Tiempo en Pantalla de 4 dígitos (que debe ser DISTINTO al PIN de desbloqueo del teléfono)."
          },
          {
            title: "Desactivar el Rastreo entre aplicaciones (App Tracking Transparency)",
            description: "Impide que empresas de publicidad perfilen las preferencias y hábitos de tu hijo a través de múltiples aplicaciones.",
            howTo: "En el iPhone del menor > Configuración > 'Privacidad y seguridad' > 'Rastreo' > Desactiva 'Permitir que las apps soliciten rastrear'.",
            tip: "Cumple directamente con las mejores prácticas sugeridas por la Unidad Reguladora y de Control de Datos Personales (URCDP / AGESIC) en Uruguay."
          }
        ]
      }
    ]
  }
};
