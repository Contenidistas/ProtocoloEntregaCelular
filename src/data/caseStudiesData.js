export const caseStudies = [
  {
    id: "ciberbullying",
    title: "Caso 1: El grupo de WhatsApp de la clase",
    category: "Convivencia Escolar / Liceal",
    badgeColor: "bg-purple-100 text-purple-800",
    situation: "Tu hijo/a de 12 años te muestra con timidez que en el grupo de WhatsApp de su grupo de liceo/escuela varios compañeros crearon 'stickers' burlándose de una compañera por su apariencia física, insultándola y excluyéndola de salidas colectivas. Tu hijo/a no creó los stickers, pero está en el grupo y teme que si dice algo 'lo dejen de lado' a él/ella también.",
    dilemma: "¿Cómo reaccionas como adulto referente?",
    conversationStarter: "«Gracias por mostrármelo y confiar en mí. Sé que da miedo quedar pegado frente al grupo, pero pensemos juntos: ¿cómo te sentirías vos si entraras mañana al salón sabiendo que todos se rieron de un sticker tuyo? Busquemos una forma de ayudar a tu compañera sin exponerte.»",
    options: [
      {
        id: "a",
        label: "Reacción A: 'Salte inmediatamente del grupo, borra el chat y no te metas en problemas ajenos.'",
        type: "danger",
        evaluation: "Inadecuada. Fomenta la indiferencia y el aislamiento.",
        feedback: "Aunque protege momentáneamente a tu hijo de represalias, le enseña que la violencia o el acoso son tolerables mientras no le toquen a uno. Además, borra pruebas que podrían ser necesarias si la situación escala.",
        pedagogicalTip: "La pasividad del testigo alimenta al agresor. Más del 70% del acoso escolar y digital se detiene cuando los pares intervienen o piden apoyo a adultos referentes."
      },
      {
        id: "b",
        label: "Reacción B: Escribes tú directamente al grupo de WhatsApp de los chicos o al grupo de madres/padres enfurecido/a exigiendo castigos.",
        type: "warning",
        evaluation: "Poco efectiva y riesgosa. Escala el conflicto y expone al menor.",
        feedback: "Intervenir impulsivamente como adulto en chats de adolescentes o en el grupo de familias de la clase suele generar dinámicas defensivas y poner a tu hijo en la mira como el 'delator'.",
        pedagogicalTip: "Canaliza la intervención a través de las vías institucionales: adscripción, dirección o equipo multidisciplinario del centro educativo."
      },
      {
        id: "c",
        label: "Reacción C: Valoras su confianza, dialogan sobre la empatía con la víctima y coordinan con el centro educativo y las familias sin exponerlo/a.",
        type: "success",
        evaluation: "Excelente (Modelo SERC en acción).",
        feedback: "Primero agradeces que te haya tenido la confianza de contarte. Luego reflexionan: '¿Cómo te sentirías tú si fueras esa compañera?'. Acuerdan no reenviar ni festejar el material, tomar capturas de pantalla de respaldo, enviarle un mensaje privado de apoyo a la compañera y comunicar la situación a la adscripción o dirección para que trabajen la convivencia grupal.",
        pedagogicalTip: "Enseña el rol del 'espectador activo y solidario'. Cumple con las pautas de Ciudadanía Digital de AGESIC y las guías de convivencia de ANEP / DGES."
      }
    ],
    uruguayContext: "En Uruguay, el Protocolo de Convivencia y Actuación ante Situaciones de Acoso Escolar de ANEP prioriza el abordaje institucional y restaurativo sin estigmatizar. Si la situación escala a hostigamiento sistemático grave o amenazas, puede intervenir la Dirección de Convivencia y Seguridad Ciudadana o Fiscalía de Menores."
  },
  {
    id: "grooming",
    title: "Caso 2: El 'amigo de Discord / Roblox' que pide fotos",
    category: "Seguridad y Prevención de Grooming",
    badgeColor: "bg-red-100 text-red-800",
    situation: "Tu hija/hijo de 11 años juega con frecuencia en Roblox y chatea por Discord con alguien que asegura ser un chico de 12 años de la ciudad de Las Piedras (Canelones). Recientemente, este contacto le ofreció regalarle 'Robux' y una cuenta VIP a cambio de que le envíe fotos por chat privado 'para conocerse mejor' y le pidió que mantenga el secreto frente a sus padres.",
    dilemma: "¿Qué medidas tomas de inmediato?",
    conversationStarter: "«Hiciste muy bien en contármelo, estoy orgulloso/a de vos. Vos no hiciste nada malo: en internet hay adultos que mienten sobre su edad para engañar a chiquilines. En casa nunca te vamos a retar ni a quitar el celular por pedirnos ayuda cuando algo te incomoda.»",
    options: [
      {
        id: "a",
        label: "Reacción A: Castigas a tu hijo/a quitándole el celular y la computadora por dos meses.",
        type: "danger",
        evaluation: "Contraproducente. Cierra la puerta a la comunicación futura.",
        feedback: "Castigar a la víctima por una situación de riesgo creada por un tercero hace que nunca más vuelva a pedirte ayuda ante un peligro real por temor al castigo.",
        pedagogicalTip: "La regla de oro del diálogo digital: la honestidad ante una situación extraña debe ser siempre recompensada con contención, nunca con castigos."
      },
      {
        id: "b",
        label: "Reacción B: Conservas la calma, felicitas a tu hijo/a por alertarte, guardas evidencia y radicas denuncia.",
        type: "success",
        evaluation: "Respuesta Óptima y Proteccional.",
        feedback: "Le aseguras que está a salvo y que no hizo nada malo. NO elimines el chat ni bloquees inmediatamente antes de guardar pruebas: realiza capturas de pantalla con fecha, nombre de usuario e ID del perfil. Luego bloquea el contacto, reporta el perfil dentro de la plataforma y realiza la denuncia correspondiente.",
        pedagogicalTip: "Recuerda el lema de Andrew Lewis: 'Tú eres el producto'. Los entornos de juegos son el principal vector de captación de perfiles engañosos."
      },
      {
        id: "c",
        label: "Reacción C: Le dices a tu hijo que lo insulte por chat y le responda cosas feas para que aprenda a defenderse solo.",
        type: "warning",
        evaluation: "Peligrosa. Podría exponer a la familia y no neutraliza el riesgo.",
        feedback: "Provocar o interactuar con un posible agresor sexual infantil puede intensificar el acoso o alertarlo para que borre todas sus huellas digitales antes de que las autoridades puedan rastrear su IP.",
        pedagogicalTip: "No intentes 'hacer justicia propia'. El ciberdelito requiere peritaje informático policial profesional."
      }
    ],
    uruguayContext: "En Uruguay, el grooming está tipificado penalmente. Puedes radicar la denuncia de forma confidencial en la Unidad de Delitos Informáticos de la Policía Nacional (Tel: 2030 4625), en cualquier seccional policial, o a través de la Línea Azul de INAU (0800 5050 / *5050)."
  },
  {
    id: "compras",
    title: "Caso 3: La sorpresa en el resumen de la tarjeta de crédito",
    category: "Consumo Responsable y Videojuegos",
    badgeColor: "bg-amber-100 text-amber-800",
    situation: "Llega el estado de cuenta mensual y aparecen 14 transacciones de Google Play / App Store por un monto total de $18.500 pesos uruguayos en compras de skins de 'Brawl Stars' o 'Free Fire'. Tu hijo/a admite que apretó el botón verde varias veces creyendo que eran 'monedas gratis del juego' porque la tarjeta había quedado guardada por error.",
    dilemma: "¿Cómo resuelves esta contingencia financiera y educativa?",
    conversationStarter: "«Mirá este resumen del banco: cada vez que tocaste ese botón verde en el juego se descontó plata real de nuestro trabajo. Sé que los juegos están diseñados con trampas visuales para confundir, así que vamos a bloquear juntos las compras y acordar cómo vas a colaborar en casa para reparar este gasto.»",
    options: [
      {
        id: "a",
        label: "Reacción A: Asumes la pérdida en silencio, no le dices nada para no traumarlo, pero cambias la tarjeta.",
        type: "warning",
        evaluation: "Omisión educativa. No se genera noción del valor del dinero.",
        feedback: "El menor no aprenderá la conexión entre el 'clic' virtual y el esfuerzo laboral real que cuesta ese dinero en el presupuesto del hogar uruguayo.",
        pedagogicalTip: "Los 'dark patterns' (patrones oscuros) de diseño de videojuegos explotan la inmadurez del lóbulo frontal en niños para inducir al gasto compulsivo."
      },
      {
        id: "b",
        label: "Reacción B: Configuras de inmediato la exigencia de contraseña para cada compra, solicitas reembolso formal y acuerdan un plan de reparación de daño.",
        type: "success",
        evaluation: "Formativa, constructiva y preventiva.",
        feedback: "1) Ajustas inmediatamente la autenticación biométrica/PIN en la tienda para que ninguna transacción se procese sin tu huella. 2) Solicitas el reembolso formal a Google o Apple argumentando compra accidental de menor (en la mayoría de los casos devuelven el monto en compras de menos de 48 horas). 3) Tu hijo/a compensa el error con tareas del hogar o postergando algún gasto lúdico pactado, asumiendo responsabilidad tangible.",
        pedagogicalTip: "La frustración regulada es pedagógica. Aprender que el dinero digital es dinero real es parte de la alfabetización financiera del siglo XXI."
      },
      {
        id: "c",
        label: "Reacción C: Desinstalas todos los juegos para siempre y dices que la tecnología no sirve para nada.",
        type: "danger",
        evaluation: "Prohibicionismo extremo.",
        feedback: "Genera resentimiento y el menor buscará jugar a escondidas en dispositivos de amigos sin ningún tipo de control parental.",
        pedagogicalTip: "La prohibición total es una ilusión; la alfabetización y la regulación técnica son el camino sostenible."
      }
    ],
    uruguayContext: "En Uruguay, el Área de Defensa del Consumidor (MEF) y el marco de comercio electrónico exigen información clara sobre compras integradas. Para compras en tiendas internacionales de Google y Apple, el reclamo se gestiona directamente en reportaproblem.apple.com o play.google.com/store/account/orderhistory."
  },
  {
    id: "sexting",
    title: "Caso 4: Presión grupal y difusión de imágenes íntimas",
    category: "Privacidad, Intimidad y Delitos Digitales",
    badgeColor: "bg-pink-100 text-pink-800",
    situation: "Un adolescente de 14 años te cuenta angustiado que en su grupo de amigos circula una fotografía íntima de una compañera de liceo que fue enviada en confianza a su pareja y luego viralizada por WhatsApp. Algunos compañeros le piden que la guarde o la reenvíe a otros contactos.",
    dilemma: "¿Qué orientación legal y ética le transmites?",
    conversationStarter: "«Qué bueno que me lo contaste enseguida. Quiero que sepas algo fundamental: la culpa nunca es de la persona que confió en su pareja, sino de quien traicionó esa confianza reenviándola. Cortar la cadena ahora mismo es proteger a tu compañera y cuidarte legalmente a vos.»",
    options: [
      {
        id: "a",
        label: "Reacción A: 'Mientras tú no la hayas reenviado, quédatela y no digas nada'.",
        type: "danger",
        evaluation: "Grave error legal y ético.",
        feedback: "La tenencia y almacenamiento de imágenes con contenido sexual de menores de edad puede configurar un delito penal muy grave en Uruguay, aun cuando no haya sido quien originó la foto.",
        pedagogicalTip: "Romper la cadena de viralización es un acto de valentía cívica y un deber legal."
      },
      {
        id: "b",
        label: "Reacción B: Eliminarla de inmediato, no reenviarla jamás, advertir a los amigos de las consecuencias legales y apoyar a la víctima.",
        type: "success",
        evaluation: "Correcta y ajustada a derecho.",
        feedback: "Le explicas con absoluta claridad: 1) Eliminar de inmediato el archivo de su galería y vaciar papelera. 2) Expresar con firmeza en el grupo: 'Chicos, borren esto; compartir fotos íntimas sin consentimiento es un delito grave en Uruguay y puede arruinarle la vida a ella y traer problemas penales a todos'. 3) Aconsejar a la afectada acudir a sus padres y a la dirección del centro educativo.",
        pedagogicalTip: "Diferenciar entre el libre ejercicio de la sexualidad y la violencia digital o la vulneración de la intimidad."
      },
      {
        id: "c",
        label: "Reacción C:La borras del teléfono de tu hijo, pero le dices que 'eso le pasa a la compañera por sacarse fotos así' y que no hable más con ella.",
        type: "warning",
        evaluation: "Revictimizante. Culpabiliza a la víctima y no educa en empatía.",
        feedback: "Aunque haces bien en borrar el archivo del dispositivo, culpar a la víctima refuerza el estigma social y le transmite a tu hijo que si algún día él mismo sufre una extorsión o vulneración de su intimidad, será juzgado en lugar de ayudado.",
        pedagogicalTip: "En educación sexual y digital, el foco siempre debe ponerse en la responsabilidad de no difundir jamás material íntimo ajeno."
      }
    ],
    uruguayContext: "En Uruguay, el Código Penal (art. 272 ter) y la Ley N° 19.580 sancionan la divulgación no consentida de imágenes íntimas ('difusión no consentida de material íntimo'). La responsabilidad penal juvenil en Uruguay rige a partir de los 13 años (Código de la Niñez y la Adolescencia)."
  },
  {
    id: "sharenting",
    title: "Caso 5: 'Sharenting' y el ejemplo de los propios adultos",
    category: "Huella Digital y Responsabilidad Familiar",
    badgeColor: "bg-blue-100 text-blue-800",
    situation: "El abuelo o tú mismo/a tomaste una foto graciosa de tu hijo en malla en la playa o con el uniforme del colegio/liceo visible con el escudo escolar, y la publicas en Facebook o Instagram de forma abierta. Tu hijo de 10 años te pide enojado: '¡Papá/Mamá, borra eso, mis amigos lo van a ver y me da vergüenza!'.",
    dilemma: "¿Cómo respondes ante su reclamo de privacidad?",
    conversationStarter: "«Tenés toda la razón en pedírmelo, te pido disculpas. Es tu imagen y tu historia, así que ya mismo la borro. De ahora en adelante te prometo preguntarte siempre antes de subir una foto tuya a cualquier red.»",
    options: [
      {
        id: "a",
        label: "Reacción A: 'Yo soy tu padre/madre, te mantengo y publico lo que quiero en mi propio muro'.",
        type: "danger",
        evaluation: "Incoherencia educativa absoluta.",
        feedback: "Le estás exigiendo a tu hijo que cuide su huella digital y respete a otros, mientras tú mismo vulneras su intimidad básica y no respetas su consentimiento.",
        pedagogicalTip: "Recuerda el folleto del Prof. Esp. Santiago Hernández: 'Tu ejemplo es su mejor lección sobre el uso de la tecnología'."
      },
      {
        id: "b",
        label: "Reacción B: Escuchas su pedido, pides disculpas, eliminas la foto inmediatamente y reflexionan juntos sobre la huella digital.",
        type: "success",
        evaluation: "Lección magistral de ciudadanía digital y respeto mutuo.",
        feedback: "Borrar la foto y pedirle disculpas modela el respeto al consentimiento y al derecho a la propia imagen. Además, publicar insignias de colegios o fotos en traje de baño en redes abiertas expone a los niños a riesgos de geolocalización y uso indebido de su imagen.",
        pedagogicalTip: "Siempre consultar antes de publicar: '¿Te parece bien que suba esta foto con la tía o prefieres que quede en el álbum familiar privado?'."
      },
      {
        id: "c",
        label: "Reacción C: No la borras de la red social porque ya tiene muchos 'Me gusta' de familiares, pero le prometes que la próxima vez le avisas.",
        type: "warning",
        evaluation: "Insuficiente. Prioriza los 'likes' adultos sobre el malestar del niño.",
        feedback: "Mantener publicada una fotografía que avergüenza a tu hijo por no perder los comentarios de amigos o parientes transmite que la validación en redes importa más que su bienestar emocional.",
        pedagogicalTip: "Respetar el 'No' de un niño o adolescente respecto a su propia imagen fortalece su autoestima y su noción de consentimiento."
      }
    ],
    uruguayContext: "En Uruguay, la Ley N° 18.331 de Protección de Datos Personales reconoce los datos biométricos y la imagen de niños y adolescentes como datos sujetos a especial protección. AGESIC y UNICEF promueven activamente campañas contra el 'Sharenting' (sobreexposición infantil en redes de adultos)."
  },
  {
    id: "vamping-retos",
    title: "Caso 6: 'Vamping' de madrugada y retos virales en TikTok",
    category: "Neurodesarrollo, Sueño y Algoritmos",
    badgeColor: "bg-indigo-100 text-indigo-800",
    situation: "Notas que desde hace dos semanas tu hijo/a de 11 años se levanta con ojeras, irritable y la maestra/adscripta te avisa que se duerme en clase. Al entrar a su cuarto a las 2:15 de la madrugada, descubres que tiene el celular debajo de la sábana mirando videos cortos en bucle y practicando un 'reto viral' para subir con sus compañeros.",
    dilemma: "¿Cómo abordas el descanso nocturno y la presión algorítmica?",
    conversationStarter: "«No te voy a gritar a las dos de la mañana, ahora necesitamos dormir. Mañana en la tarde, tranquilos, vamos a charlar de cómo estos videos están diseñados para que no puedas soltar el teléfono y vamos a armar juntos la estación de carga en el living para cuidar tu sueño.»",
    options: [
      {
        id: "a",
        label: "Reacción A: Le arrancas el celular de las manos a los gritos a las 2:15 AM y amenazas con romperlo.",
        type: "danger",
        evaluation: "Reacción desbordada que genera ocultamiento.",
        feedback: "Una discusión violenta en plena madrugada dispara el cortisol de toda la familia, impide conciliar el sueño y lleva a que el niño busque esconderse mejor sin entender por qué le cuesta tanto apagar la pantalla.",
        pedagogicalTip: "Como explica la Dra. Marián Rojas Estapé, la corteza prefrontal infantil aún es inmadura para frenar por sí sola el torrente de dopamina del scroll infinito nocturno."
      },
      {
        id: "b",
        label: "Reacción B: Retiras el equipo con serenidad para que descanse, y al día siguiente instalan la 'Estación de Carga Familiar' fuera del cuarto junto con bloqueo nocturno automático.",
        type: "success",
        evaluation: "Estrategia neuroeducativa y vincular ejemplar.",
        feedback: "1) Esa noche priorizas el descanso sin sermones eternos. 2) Al día siguiente conversan sobre cómo funciona el algoritmo de TikTok/Reels (la máquina tragamonedas que compite contra su sueño) y qué riesgos tienen los retos virales. 3) Establecen como regla para TODOS en casa (incluidos los adultos) que a las 21:30 hs los teléfonos quedan cargando en el living y activan la 'Hora de dormir' en Family Link / Tiempo de Uso.",
        pedagogicalTip: "La luz azul a la madrugada suprime la melatonina y fragmenta el sueño REM indispensable para consolidar la memoria y regular las emociones."
      },
      {
        id: "c",
        label: "Reacción C: Le dejas el celular en la mesa de luz pero le haces prometer de palabra que mañana lo apagará a las 22:00 hs.",
        type: "warning",
        evaluation: "Ingenuidad frente al diseño persuasivo.",
        feedback: "Pedirle a un niño de 11 años que tenga un celular con conexión e infinitas notificaciones al lado de su almohada y no lo toque es como dejarle un plato de golosinas en la cama y pedirle fuerza de voluntad.",
        pedagogicalTip: "El ambiente vence a la fuerza de voluntad: la regulación del entorno físico (celular fuera del dormitorio) es responsabilidad indelegable del adulto."
      }
    ],
    uruguayContext: "Las guías de 'Pantallas en Casa' (UNICEF - Plan Ceibal - ANEP) y la Sociedad Uruguaya de Pediatría recomiendan retirar toda pantalla al menos 60 minutos antes de dormir y mantener los dormitorios infantiles libres de dispositivos durante la noche."
  }
];
