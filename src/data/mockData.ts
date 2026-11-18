import { SpecialtyInfo, Estudiante, EvaluacionVocacional, ProgresoVirtual, AsistenciaPresencial, FichaAcademiaReq, OficioCircular, CuestionarioEspecialidad, ReactivoExamen } from '../types';

export const COSMETOLOGIA_DIAGNOSTICO_REACTIVOS: ReactivoExamen[] = [
  {
    id: 1,
    bloque: 'I. Intereses y conocimiento inicial',
    pregunta: '¿Cuál es tu principal interés al estudiar la carrera técnica de Cosmetología?',
    opciones: [
      'Aprender sobre el cuidado de la piel y los tratamientos faciales y corporales.',
      'Conocer únicamente sobre maquillaje y arreglo personal.',
      'Tener una actividad para ocupar mi tiempo libre.',
      'Estudiar la carrera porque fue la opción que eligieron por mí.'
    ],
    correcta: 'a',
    aspecto_evaluado: 'Interés real por el cuidado estético integral de la piel.',
    explicacion: 'Interés real por el cuidado estético integral de la piel y los tratamientos faciales y corporales (1 pt).'
  },
  {
    id: 2,
    bloque: 'I. Intereses y conocimiento inicial',
    pregunta: '¿Cómo te sentirías al tener contacto directo con la piel de diferentes clientes durante las prácticas?',
    opciones: [
      'Me sentiría incómodo(a) y evitaría hacerlo.',
      'Tendría disposición para aprender y realizar los procedimientos con respeto e higiene.',
      'Preferiría trabajar solamente con productos y no con personas.',
      'No estoy interesado(a) en realizar este tipo de actividades.'
    ],
    correcta: 'b',
    aspecto_evaluado: 'Disposición al contacto profesional y trato humano.',
    explicacion: 'Disposición al contacto profesional directo y trato humano con respeto e higiene (1 pt).'
  },
  {
    id: 3,
    bloque: 'I. Intereses y conocimiento inicial',
    pregunta: '¿Cuál de las siguientes opciones describe correctamente qué estudia la carrera técnica de Cosmetología, a qué se dedica y qué necesitas para realizar tus prácticas en el CETis No. 7?',
    opciones: [
      'Estudia principalmente maquillaje, peinados y arreglo personal; para las prácticas solamente se necesita maquillaje y ropa cómoda.',
      'Estudia el cuidado estético de la piel, tratamientos cosmetológicos faciales y corporales, higiene, protocolos de atención y uso de productos y equipos especializados; requiere materiales, accesorios, productos cosmetológicos y uniforme de prácticas, conforme a las indicaciones de la escuela.',
      'Estudia medicina, dermatología y procedimientos quirúrgicos; requiere instrumental médico y uniforme hospitalario.',
      'Estudia exclusivamente la venta de productos de belleza y administración de establecimientos; requiere únicamente una libreta y una calculadora.'
    ],
    correcta: 'b',
    aspecto_evaluado: 'Conocimiento real del campo de estudio y requerimientos.',
    explicacion: 'Conocimiento real del campo de estudio estético de la piel y requerimientos oficiales de práctica en el CETis No. 7 (1 pt).'
  },
  {
    id: 4,
    bloque: 'I. Intereses y conocimiento inicial',
    pregunta: 'Durante tu formación en la carrera técnica de Cosmetología necesitarás conseguir cuatro modelos por semana para realizar tus prácticas de tratamientos faciales y corporales. ¿Tienes la posibilidad de conseguirlos?',
    opciones: [
      'Sí, puedo conseguir cuatro modelos por semana.',
      'Puedo conseguir entre dos y tres modelos por semana.',
      'Solamente puedo conseguir un modelo por semana.',
      'Actualmente no tengo la posibilidad de conseguir modelos.'
    ],
    correcta: 'na',
    es_informativa: true,
    aspecto_evaluado: 'Disponibilidad logística de modelos (no penaliza puntaje).',
    explicacion: 'Pregunta de contexto logístico (0 pts · No penaliza puntaje). Permite a los docentes prever prácticas cruzadas o banco de voluntarios si seleccionas C o D.'
  },
  {
    id: 5,
    bloque: 'I. Intereses y conocimiento inicial',
    pregunta: 'En las prácticas de cosmetología es necesario permanecer de pie aproximadamente dos horas. ¿Cómo actuarías?',
    opciones: [
      'Mantendría una postura ergonómica y seguiría las indicaciones para realizar la actividad de manera segura.',
      'Me negaría a realizar la práctica.',
      'Realizaría la actividad sin cuidar mi postura.',
      'Buscaría evitar las prácticas que requieren permanecer de pie.'
    ],
    correcta: 'a',
    aspecto_evaluado: 'Disposición física y cuidado ergonómico en taller.',
    explicacion: 'Disposición física para el trabajo en cabina y cuidado ergonómico seguro durante las prácticas (1 pt).'
  },
  {
    id: 6,
    bloque: 'II. Actitudes y disposición para las prácticas',
    pregunta: 'Durante las prácticas podrías trabajar con personas que presentan acné, manchas, sensibilidad u otras condiciones de la piel. ¿Cuál sería tu actitud?',
    opciones: [
      'Evitaría atender a las personas que presentan estas condiciones.',
      'Haría comentarios sobre el aspecto de su piel.',
      'Las atendería con respeto, siguiendo los protocolos de higiene y las indicaciones de mi docente.',
      'Recomendaría productos sin conocer previamente sus características.'
    ],
    correcta: 'c',
    aspecto_evaluado: 'Empatía, respeto al cliente y apego a protocolos.',
    explicacion: 'Empatía, respeto hacia la condición cutánea del cliente y apego estricto a los protocolos e indicaciones docentes (1 pt).'
  },
  {
    id: 7,
    bloque: 'II. Actitudes y disposición para las prácticas',
    pregunta: 'Si una técnica de masaje o tratamiento facial no te sale correctamente, ¿qué harías?',
    opciones: [
      'Dejaría de intentarlo.',
      'Culparía a mis compañeros.',
      'Pediría orientación a mi docente y practicaría en casa hasta mejorar.',
      'Evitaría volver a realizar esa técnica.'
    ],
    correcta: 'c',
    aspecto_evaluado: 'Perseverancia, tolerancia a la frustración y apertura.',
    explicacion: 'Perseverancia, tolerancia a la frustración y apertura para recibir orientación y practicar hasta dominar la técnica (1 pt).'
  },
  {
    id: 8,
    bloque: 'II. Actitudes y disposición para las prácticas',
    pregunta: '¿Qué importancia tiene para ti la limpieza y desinfección de los materiales y áreas cosmetológicas?',
    opciones: [
      'Es una actividad que puede realizarse solamente cuando se observa suciedad.',
      'Es fundamental antes y después de cada práctica para prevenir riesgos y proteger tanto al cliente como al profesional.',
      'Es responsabilidad exclusiva del docente o del personal de limpieza.',
      'Solo es necesaria cuando se utilizan aparatos eléctricos especializados.'
    ],
    correcta: 'b',
    aspecto_evaluado: 'Cultura de higiene, bioseguridad y prevención de riesgos.',
    explicacion: 'Cultura de higiene, asepsia, bioseguridad y prevención de riesgos antes y después de cada práctica (1 pt).'
  },
  {
    id: 9,
    bloque: 'II. Actitudes y disposición para las prácticas',
    pregunta: 'Si durante un tratamiento facial un cliente manifiesta molestias, ¿qué harías?',
    opciones: [
      'Continuaría el tratamiento para terminarlo.',
      'Ignoraría sus comentarios.',
      'Suspendería el procedimiento y comunicaría la situación al docente o responsable.',
      'Le pediría que soportara las molestias.'
    ],
    correcta: 'c',
    aspecto_evaluado: 'Atención oportuna al usuario y comunicación con docente.',
    explicacion: 'Atención oportuna ante cualquier molestia del usuario, suspensión preventiva y aviso inmediato al docente (1 pt).'
  },
  {
    id: 10,
    bloque: 'III. Responsabilidad y materiales de trabajo',
    pregunta: 'Para realizar las prácticas necesitarás accesorios, productos y materiales cosmetológicos. ¿Qué actitud asumirías ante esta responsabilidad?',
    opciones: [
      'Consideraría que la escuela debe proporcionar absolutamente todos los materiales.',
      'Me organizaría para conocer las listas de materiales y planear su adquisición gradual con apoyo de mis padres o tutores.',
      'No compraría ningún material.',
      'Esperaría hasta el día de la práctica para conseguirlos.'
    ],
    correcta: 'b',
    aspecto_evaluado: 'Planeación y organización familiar para insumos.',
    explicacion: 'Planeación y organización gradual con padres o tutores para contar oportunamente con los insumos requeridos (1 pt).'
  },
  {
    id: 11,
    bloque: 'III. Responsabilidad y materiales de trabajo',
    pregunta: 'Si te solicitan un producto cosmetológico específico (por ejemplo, una ampolleta y una mascarilla para acné), ¿qué harías?',
    opciones: [
      'Compraría cualquier producto económico, aunque no cumpla con las indicaciones.',
      'No participaría en las prácticas.',
      'Consultaría con mi docente las especificaciones exactas y me organizaría con mis padres o tutores para adquirirlo.',
      'Sustituiría el producto por otro casero sin consultar.'
    ],
    correcta: 'c',
    aspecto_evaluado: 'Toma de decisiones responsable y consulta docente/familiar.',
    explicacion: 'Toma de decisiones responsable verificando especificaciones técnicas con la docente y organizando con padres/tutores (1 pt).'
  },
  {
    id: 12,
    bloque: 'III. Responsabilidad y materiales de trabajo',
    pregunta: '¿Cómo cuidarías los accesorios y equipos que utilizarás durante las prácticas?',
    opciones: [
      'Los utilizaría sin preocuparme por su conservación.',
      'Los limpiaría, almacenaría y utilizaría siguiendo las indicaciones correspondientes.',
      'Los dejaría en cualquier lugar después de utilizarlos.',
      'Esperaría a que otra persona se encargara de ellos.'
    ],
    correcta: 'b',
    aspecto_evaluado: 'Cuidado, mantenimiento y conservación de equipo.',
    explicacion: 'Cuidado, limpieza, almacenamiento y conservación responsable del equipo y accesorios de taller (1 pt).'
  },
  {
    id: 13,
    bloque: 'IV. Habilidades personales y ética profesional',
    pregunta: '¿Cómo consideras tu disposición para realizar actividades manuales que requieren precisión y coordinación?',
    opciones: [
      'Tengo disposición para aprender y mejorar mis habilidades manuales.',
      'No me gustan las actividades manuales.',
      'Prefiero realizar únicamente actividades teóricas.',
      'No tengo interés en desarrollar estas habilidades.'
    ],
    correcta: 'a',
    aspecto_evaluado: 'Disposición para desarrollar destreza motriz fina.',
    explicacion: 'Disposición y apertura para entrenar precisión manual y coordinación motriz fina en cabina (1 pt).'
  },
  {
    id: 14,
    bloque: 'IV. Habilidades personales y ética profesional',
    pregunta: 'Cuando recibes una observación de tu docente para mejorar una práctica, ¿cómo reaccionas?',
    opciones: [
      'Me molesto porque considero que mi trabajo está bien.',
      'Ignoro las observaciones.',
      'Escucho las recomendaciones y las aplico para mejorar.',
      'Dejo de participar en la actividad.'
    ],
    correcta: 'c',
    aspecto_evaluado: 'Apertura a la retroalimentación y mejora continua.',
    explicacion: 'Apertura a la retroalimentación docente y actitud de mejora continua en procedimientos (1 pt).'
  },
  {
    id: 15,
    bloque: 'IV. Habilidades personales y ética profesional',
    pregunta: 'Durante una práctica debes trabajar con un compañero. ¿Qué comportamiento consideras más adecuado?',
    opciones: [
      'Realizar solamente la parte que me corresponde y desentenderme del resto.',
      'Colaborar, respetar las funciones y compartir responsabilidades.',
      'Esperar a que mi compañero realice toda la actividad.',
      'Trabajar sin tomar en cuenta las indicaciones del equipo.'
    ],
    correcta: 'b',
    aspecto_evaluado: 'Trabajo colaborativo y corresponsabilidad en taller.',
    explicacion: 'Trabajo colaborativo, respeto a las funciones y corresponsabilidad dentro de las prácticas en taller (1 pt).'
  },
  {
    id: 16,
    bloque: 'IV. Habilidades personales y ética profesional',
    pregunta: 'Si un cliente presenta una condición de la piel que requiere valoración médica, ¿qué harías?',
    opciones: [
      'Le recomendaría un tratamiento médico sin tener preparación para ello.',
      'Aplicaría cualquier producto para solucionar el problema.',
      'Le explicaría los límites de mi intervención cosmetológica y recomendaría acudir con un profesional de la salud.',
      'Ignoraría la situación y continuaría el tratamiento.'
    ],
    correcta: 'c',
    aspecto_evaluado: 'Ética profesional y reconocimiento de límites de intervención.',
    explicacion: 'Ética profesional y reconocimiento responsable de los límites de la intervención cosmetológica frente a padecimientos médicos (1 pt).'
  },
  {
    id: 17,
    bloque: 'V. Expectativas profesionales',
    pregunta: '¿Cuál es tu principal expectativa al concluir la carrera técnica de Cosmetología?',
    opciones: [
      'Contar con conocimientos y habilidades para desempeñarme profesionalmente en el área de cosmetología.',
      'Obtener únicamente un certificado de bachillerato.',
      'Aprender solamente técnicas de belleza superficial.',
      'Todavía no tengo interés en desarrollarme en esta especialidad.'
    ],
    correcta: 'a',
    aspecto_evaluado: 'Proyección y expectativa de desarrollo profesional.',
    explicacion: 'Proyección vocacional sólida y expectativa de desarrollo profesional en el campo de la cosmetología (1 pt).'
  }
];

export const ESPECIALIDADES: SpecialtyInfo[] = [
  {
    id: 'programacion',
    nombre: 'Técnico en Programación',
    titulo_corto: 'Programación',
    area: 'Tecnologías de la Información y Comunicación',
    color_acento: '#1d4ed8',
    color_badge: 'bg-blue-50 text-blue-700 border-blue-200',
    icono: 'Code2',
    resumen_ejecutivo: 'Forma técnicos con capacidades analíticas sólidas para diseñar, codificar, depurar, implementar y administrar sistemas informáticos, soluciones web de alto impacto, bases de datos relacionales y aplicaciones móviles para el sector productivo.',
    perfil_ingreso: [
      'Razonamiento lógico-matemático y abstracción.',
      'Atracción por la resolución de acertijos y algoritmos.',
      'Interés en el funcionamiento interno del software y la web.'
    ],
    perfil_egreso: [
      'Desarrollo de software en múltiples lenguajes (Python, JavaScript, Java, C#).',
      'Construcción y modelado de bases de datos relacionales y no relacionales.',
      'Despliegue de aplicaciones web frontend/backend y móviles seguras.'
    ],
    campo_laboral: [
      'Empresas de desarrollo de software y startups tecnológicas.',
      'Departamentos de sistemas e infraestructura TI en el sector público y privado.',
      'Consultor independiente o freelance en desarrollo web y automatización.'
    ],
    submodulos: [
      { semestre: '2° Semestre', nombre: 'Módulo I: Desarrollo de software estructurado', competencia: 'Aplica algoritmos estructurados y conceptos de programación modular.' },
      { semestre: '3° Semestre', nombre: 'Módulo II: Programación orientada a objetos', competencia: 'Diseña interfaces visuales y modelado POO con persistencia de datos.' },
      { semestre: '4° Semestre', nombre: 'Módulo III: Soluciones web dinámicas', competencia: 'Implementa servicios web, APIs y clientes interactivos.' },
      { semestre: '5° Semestre', nombre: 'Módulo IV: Bases de datos y seguridad', competencia: 'Administra motores SQL, integridad transaccional y ciberseguridad básica.' },
      { semestre: '6° Semestre', nombre: 'Módulo V: Aplicaciones móviles multiplataforma', competencia: 'Desarrolla e implementa apps para Android/iOS con arquitectura en la nube.' }
    ],
    proyectos_destacados: [
      {
        titulo: 'Sistema Escolar Web "LerdoConecta"',
        alumnos: 'Alumnos de 5° Semestre - Grupo 5°A Programación',
        semestre: '5° Semestre',
        descripcion: 'Plataforma web para gestión de calificaciones, reportes tutoriales y asesorías entre pares estudiantiles del CETis 7.',
        impacto: 'Redujo el tiempo de entrega de boletas internas de 5 días a 10 minutos.'
      },
      {
        titulo: 'App Móvil SOS Comunitaria Cuautepec',
        alumnos: 'Equipo Innovatec - 6° Semestre',
        semestre: '6° Semestre',
        descripcion: 'Aplicación para teléfonos móviles con geolocalización para alertar sobre incidentes viales y luminarias en la zona alta de GAM.',
        impacto: 'Reconocimiento en el Concurso de Prototipos DGETI CDMX 2025.'
      },
      {
        titulo: 'Simulador de Encriptación y Ciberdefensa',
        alumnos: 'Academia de TIC - Alumnos de 4° Semestre',
        semestre: '4° Semestre',
        descripcion: 'Herramienta interactiva para enseñar a alumnos de nuevo ingreso los riesgos de contraseñas débiles y técnicas de hashing seguro.',
        impacto: 'Utilizado en talleres de inducción para 850 alumnos.'
      }
    ],
    video_demo: {
      titulo: 'Descubre el Código que Transforma al CETis 7',
      duracion: '2:45 min',
      presentador: 'Ing. Marco Antonio Estrada (Docente Titular de Programación)',
      descripcion: 'Recorrido por el Laboratorio de Cómputo 3, demostración de arquitectura de software y testimonios de egresados que hoy laboran en empresas tecnológicas.',
      url_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    video_academia: {
      titulo: 'Video Oficial de la Academia de Programación CETis 7',
      duracion: '4:15 min',
      presentador: 'Ing. Marco Antonio Estrada Ruiz y Colegiado de Docentes',
      descripcion: 'Los profesores de la academia explican el modelo de proyectos integradores, la ruta de aprendizaje en desarrollo Web y Móvil, y los requerimientos para el campo laboral.',
      url_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    galeria_alumnos: [
      {
        id: 'prog-gal-1',
        titulo: 'Sistema Escolar Web LerdoConecta',
        alumnos: 'Sofía Martínez y Carlos Ruiz',
        semestre: '5° Semestre',
        tipo: 'video',
        url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        descripcion: 'Demostración en vivo del sistema de calificaciones con Firebase Firestore y panel reactivo.'
      },
      {
        id: 'prog-gal-2',
        titulo: 'App Móvil SOS Comunitaria Cuautepec',
        alumnos: 'Equipo Innovatec 6°A',
        semestre: '6° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Alumnos exponiendo el prototipo galardonado en el Concurso DGETI 2025.'
      },
      {
        id: 'prog-gal-3',
        titulo: 'Laboratorio de Algoritmos e Inteligencia Artificial',
        alumnos: 'Comunidad de Alumnos de 4° Semestre',
        semestre: '4° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Sesión práctica de desarrollo en el Laboratorio de Cómputo 3.'
      }
    ],
    preguntas_quiz: [
      {
        id: 1,
        pregunta: '¿Cuál es el objetivo principal de la especialidad de Programación en el CETis No. 7?',
        opciones: [
          'Únicamente armar y reparar computadoras físicamente.',
          'Diseñar, programar, implementar y mantener sistemas de software y aplicaciones web/móviles.',
          'Gestionar trámites de nóminas y contratos colectivos.'
        ],
        respuesta_correcta: 1,
        explicacion: 'Programación se enfoca en el desarrollo de software, modelado algorítmico y aplicaciones web/móviles integrales.'
      },
      {
        id: 2,
        pregunta: '¿En qué semestre se imparte el Módulo de desarrollo de aplicaciones para móviles en el mapa curricular DGETI?',
        opciones: ['1° Semestre', '3° Semestre', '6° Semestre'],
        respuesta_correcta: 2,
        explicacion: 'El Módulo V se cursa en 6° semestre y consolida las competencias de desarrollo móvil y computación en la nube.'
      },
      {
        id: 3,
        pregunta: '¿Qué destreza principal desarrolla un alumno en esta carrera?',
        opciones: [
          'Razonamiento lógico, análisis de algoritmos y solución estructurada de problemas.',
          'Clasificación arancelaria y despacho aduanero.',
          'Elaboración de cremas hidratantes y cosméticos botánicos.'
        ],
        respuesta_correcta: 0,
        explicacion: 'El perfil de egreso destaca el pensamiento algorítmico, lógica matemática y modularidad.'
      },
      {
        id: 4,
        pregunta: '¿Cuál es uno de los proyectos destacados presentados por la Academia de Programación?',
        opciones: [
          'Póliza de importación de granos a Centroamérica.',
          'Sistema Escolar Web "LerdoConecta" para gestión de calificaciones y tutorías.',
          'Protocolo de drenaje linfático de cabina.'
        ],
        respuesta_correcta: 1,
        explicacion: 'LerdoConecta fue desarrollado por alumnos de 5° semestre para agilizar la entrega de reportes del plantel.'
      },
      {
        id: 5,
        pregunta: '¿Cuál es un campo laboral directo para el egresado técnico de esta especialidad?',
        opciones: [
          'Empresas de desarrollo tecnológico, áreas de sistemas y soporte de software.',
          'Aduanas fronterizas de Manzanillo y Veracruz.',
          'Spas y clínicas dermatológicas exclusivamente.'
        ],
        respuesta_correcta: 0,
        explicacion: 'Los egresados se integran con éxito en industrias de software, departamentos de TI y consultorías digitales.'
      }
    ],
    reto_presencial: {
      nombre: 'Escape Room: El Algoritmo Perdido',
      objetivo: 'Resolver acertijos lógicos y depurar bloques de código visual para desbloquear una terminal cifrada en menos de 10 minutos.',
      duracion_min: 15,
      dinamica: 'Los alumnos reciben una pista en forma de diagrama de flujo con errores de bifurcación condicional. Al corregir la secuencia, obtienen una clave que introduce en la terminal para abrir el contenedor de premio de la academia.',
      espacio: 'Laboratorio de Cómputo 2 (Edificio B)',
      materiales: 'Tarjetas magnéticas de pseudocódigo, pantalla de pruebas, caja criptográfica didáctica con cerradura numérica.'
    }
  },
  {
    id: 'comercio',
    nombre: 'Bachillerato Tecnológico en Comercio Internacional y Aduanas',
    titulo_corto: 'Comercio Int. y Aduanas',
    area: 'Ciencias Económico-Administrativas y Logística Global',
    color_acento: '#047857',
    color_badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icono: 'Globe2',
    resumen_ejecutivo: 'Bachillerato Tecnológico en Comercio Internacional y Aduanas. Transmite competencias profesionales para la gestión de importaciones y exportaciones, estimación de costos y planes de exportación, clasificación arancelaria, procesos aduaneros, empleabilidad y economía ecológica con desarrollo sostenible.',
    infografia_url: '/assets/aistudio/image_ed736886.png',
    perfil_ingreso: [
      'Gusto por la geografía económica, monedas y logística internacional.',
      'Habilidad negociadora y capacidad organizativa en flujos de suministros.',
      'Curiosidad por tratados comerciales y regulaciones aduaneras.'
    ],
    perfil_egreso: [
      'Gestión de importaciones y exportaciones.',
      'Estimación de costos y planes de exportación.',
      'Clasificación arancelaria y procesos aduaneros.',
      'Desarrollo de empleabilidad, liderazgo y trabajo en equipo.',
      'Aplicación de economía ecológica y desarrollo sostenible.'
    ],
    campo_laboral: [
      'Auxiliar de aduanas.',
      'Auxiliar de comercio exterior.',
      'Auxiliar de logística internacional.',
      'Auxiliar de tráfico o embarques.',
      'Auxiliar de clasificación arancelaria.'
    ],
    submodulos: [
      { semestre: '2° Semestre', nombre: 'Módulo I: Fundamentos del comercio exterior y aduanas', competencia: 'Identifica la estructura del sistema aduanero mexicano y procesos aduaneros.' },
      { semestre: '3° Semestre', nombre: 'Módulo II: Clasificación arancelaria y tratados', competencia: 'Aplica la clasificación arancelaria y tarifa de impuestos de importación y exportación (TIGIE).' },
      { semestre: '4° Semestre', nombre: 'Módulo III: Logística y transporte multimodal', competencia: 'Coordina operaciones de tráfico o embarques y logística internacional con Incoterms.' },
      { semestre: '5° Semestre', nombre: 'Módulo IV: Despacho aduanal y pedimento digital', competencia: 'Ejecuta gestión de importaciones y exportaciones y valida procesos aduaneros ante SAT/ANAM.' },
      { semestre: '6° Semestre', nombre: 'Módulo V: Plan de negocios y proyectos de exportación', competencia: 'Realiza estimación de costos, planes de exportación y economía ecológica con desarrollo sostenible.' }
    ],
    proyectos_destacados: [
      {
        titulo: 'Ruta de Exportación: Miel de Agave a la Unión Europea',
        alumnos: 'Alumnos de 5° Semestre - Grupo 5°B Comercio',
        semestre: '5° Semestre',
        descripcion: 'Proyecto integral de trazabilidad logística marítima (Veracruz - Rotterdam) con cálculo de flete, aranceles cero por TLCUEM y embalaje térmico.',
        impacto: 'Primer Lugar en la Muestra Emprendedora DGETI Zona Norte CDMX.'
      },
      {
        titulo: 'Simulador Digital de Cubicaje de Contenedores (40ft High Cube)',
        alumnos: 'Equipo Logistix CETis 7',
        semestre: '6° Semestre',
        descripcion: 'Herramienta de cálculo para optimizar el espacio físico de cajas palletizadas evitando mermas y sobrecostos por peso vehicular.',
        impacto: 'Ahorro proyectado de 18% en costos logísticos simulados.'
      },
      {
        titulo: 'Manual de Cumplimiento Arancelario para PYMES Artesanales',
        alumnos: 'Academia de Comercio Internacional y Aduanas',
        semestre: '4° Semestre',
        descripcion: 'Guía paso a paso para artesanos del Valle de México sobre cómo exportar a Estados Unidos bajo facilidades del T-MEC.',
        impacto: 'Distribuido a 45 talleres cooperativos locales.'
      }
    ],
    video_demo: {
      titulo: 'Comercio Internacional y Aduanas · Video Oficial DGETI',
      duracion: '0:45 min',
      presentador: 'Lic. Claudia Becerril (Presidenta de Academia de Comercio Internacional y Aduanas)',
      descripcion: 'Domina las reglas que rigen el comercio mundial: gestión de importaciones y exportaciones, logística internacional y doble ventaja DGETI (certificado de bachillerato y título técnico).',
      url_video: '/assets/aistudio/Comercio_internacional_y_aduanas_video_principal_979d88d2.mp4'
    },
    video_academia: {
      titulo: 'Video Principal: Comercio Internacional y Aduanas',
      duracion: '0:45 min',
      presentador: 'DGETI · Academia de Comercio Internacional y Aduanas CETis 7',
      descripcion: 'Cada producto que usas y cada mercancía que llega necesita un estratega. Conoce la carrera técnica en Comercio Internacional y Aduanas y sus oportunidades laborales y universitarias.',
      url_video: '/assets/aistudio/Comercio_internacional_y_aduanas_video_principal_979d88d2.mp4'
    },
    galeria_alumnos: [
      {
        id: 'com-infografia-oficial',
        titulo: 'Infografía Oficial: Perfil de Egreso y Puestos de Trabajo',
        alumnos: 'Academia de Comercio Internacional y Aduanas',
        semestre: 'Material Oficial',
        tipo: 'foto',
        url_media: '/assets/aistudio/image_ed736886.png',
        descripcion: 'Infografía institucional con las competencias laborales principales, formación integral y principales puestos de trabajo de Comercio Internacional y Aduanas.'
      },
      {
        id: 'com-gal-1',
        titulo: 'Simulador Digital de Cubicaje de Contenedores 40ft',
        alumnos: 'Equipo Logistix 6°A',
        semestre: '6° Semestre',
        tipo: 'video',
        url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        descripcion: 'Video demostrativo de estiba y optimización de espacio volumétrico en transporte marítimo.'
      },
      {
        id: 'com-gal-2',
        titulo: 'Maqueta de Garita Aduanal y Puerto de Veracruz',
        alumnos: 'Alumnos de 3° Semestre',
        semestre: '3° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Representación física a escala del proceso de desaduanamiento y semáforo fiscal.'
      },
      {
        id: 'com-gal-3',
        titulo: 'Ruta de Exportación de Miel de Agave a la UE',
        alumnos: 'Grupo 5°B Comercio',
        semestre: '5° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Exposición de la carpeta técnica con Incoterms y certificado de origen bajo TLCUEM.'
      }
    ],
    preguntas_quiz: [
      {
        id: 1,
        pregunta: '¿Qué documento oficial legaliza el tránsito y nacionalización de mercancías en las aduanas mexicanas?',
        opciones: ['El Pedimento Aduanal', 'La Credencial Escolar', 'El Comprobante de Domicilio'],
        respuesta_correcta: 0,
        explicacion: 'El pedimento aduanal avala el cumplimiento de contribuciones y regulaciones no arancelarias ante la ANAM/SAT.'
      },
      {
        id: 2,
        pregunta: '¿Para qué se utilizan los términos internacionales de comercio conocidos como Incoterms?',
        opciones: [
          'Para calcular el promedio escolar de los alumnos.',
          'Para definir los derechos, costos y riesgos de entrega entre comprador y vendedor a nivel mundial.',
          'Para programar código de páginas web.'
        ],
        respuesta_correcta: 1,
        explicacion: 'Los Incoterms establecen con precisión quién paga transporte, seguro y asume riesgos en la cadena logística.'
      },
      {
        id: 3,
        pregunta: '¿En qué consiste el cubicaje en la logística de comercio exterior?',
        opciones: [
          'Optimizar el volumen y acomodo de mercancías dentro de un contenedor o transporte para reducir costos.',
          'Contar el número de horas trabajadas por los empleados.',
          'Aplicar mascarillas faciales.'
        ],
        respuesta_correcta: 0,
        explicacion: 'El cubicaje maximiza el aprovechamiento volumétrico y de peso de los contenedores (20ft, 40ft).'
      },
      {
        id: 4,
        pregunta: '¿Cuál es uno de los principales tratados comerciales que estudia la especialidad en México?',
        opciones: ['Tratado de Tordesillas', 'T-MEC (México, Estados Unidos y Canadá)', 'Pacto de Varsovia'],
        respuesta_correcta: 1,
        explicacion: 'El T-MEC es el pilar de exportaciones e importaciones de manufactura y servicios de nuestro país.'
      },
      {
        id: 5,
        pregunta: '¿Cuáles son algunos de los principales puestos de trabajo para el egresado de Comercio Internacional y Aduanas?',
        opciones: [
          'Auxiliar de aduanas, de comercio exterior, logística internacional, tráfico o clasificación arancelaria.',
          'Únicamente en salones de belleza.',
          'Instalando cableado eléctrico en hogares.'
        ],
        respuesta_correcta: 0,
        explicacion: 'El perfil de egreso prepara al estudiante como auxiliar de aduanas, comercio exterior, logística internacional, tráfico o embarques y clasificación arancelaria.'
      }
    ],
    reto_presencial: {
      nombre: 'Rally Aduanero: Despacho Express',
      objetivo: 'Inspeccionar un lote de mercancías, verificar documentos y asignar el semáforo fiscal (verde/rojo) en menos de 12 minutos.',
      duracion_min: 15,
      dinamica: 'Los estudiantes reciben fichas técnicas de mercancías (ej. componentes electrónicos, ropa, productos perecederos). Deben cotejar factura comercial contra packing list e identificar si cumple las NOMs de etiquetado para dar salida.',
      espacio: 'Aula Tipo Taller 4 (Edificio C)',
      materiales: 'Réplicas de pedimentos simplificados, sellos de aduana ANAM didácticos, contenedores en miniatura a escala y balanza digital.'
    }
  },
  {
    id: 'rrhh',
    nombre: 'Técnico en Administración de Recursos Humanos',
    titulo_corto: 'Recursos Humanos',
    area: 'Gestión Organizacional, Capital Humano y Normatividad Laboral',
    color_acento: '#7c3aed',
    color_badge: 'bg-purple-50 text-purple-700 border-purple-200',
    icono: 'Users2',
    resumen_ejecutivo: 'Capacita al alumno en la atracción, selección, contratación, capacitación, evaluación y bienestar del talento humano en organizaciones productivas, con estricto apego a la Ley Federal del Trabajo y la NOM-035-STPS.',
    perfil_ingreso: [
      'Empatía, facilidad de comunicación asertiva y liderazgo colaborativo.',
      'Interés en la psicología del trabajo, dinámicas de equipo y resolución de conflictos.',
      'Responsabilidad ética en el manejo de expedientes confidenciales.'
    ],
    perfil_egreso: [
      'Publicación de vacantes, filtrado curricular y aplicación de entrevistas por competencias.',
      'Elaboración de nóminas quincenales, cálculo de finiquitos, IMSS e INFONAVIT.',
      'Diseño de planes de capacitación y evaluación del clima organizacional (NOM-035).'
    ],
    campo_laboral: [
      'Departamentos de Capital Humano en empresas comerciales, de servicios e industriales.',
      'Agencias de reclutamiento y consultorías de headhunting.',
      'Instituciones públicas en áreas de personal, capacitación y desarrollo organizacional.'
    ],
    submodulos: [
      { semestre: '2° Semestre', nombre: 'Módulo I: Integración del personal a la organización', competencia: 'Aplica técnicas de reclutamiento, selección y contratos de trabajo.' },
      { semestre: '3° Semestre', nombre: 'Módulo II: Capacitación y desarrollo del talento humano', competencia: 'Elabora diagnósticos de necesidades de capacitación (DNC) y manuales.' },
      { semestre: '4° Semestre', nombre: 'Módulo III: Nóminas y prestaciones de ley', competencia: 'Calcula percepciones, deducciones, ISR retenido, cuotas obrero-patronales y finiquitos.' },
      { semestre: '5° Semestre', nombre: 'Módulo IV: Clima organizacional y normatividad laboral', competencia: 'Aplica encuestas de factores psicosociales bajo la NOM-035-STPS.' },
      { semestre: '6° Semestre', nombre: 'Módulo V: Auditoría y gestión estratégica del talento', competencia: 'Evalúa la productividad laboral y la retención del talento clave.' }
    ],
    proyectos_destacados: [
      {
        titulo: 'Diagnóstico de Clima Laboral y Bienestar Escolar NOM-035',
        alumnos: 'Alumnos de 5° Semestre - Grupo 5°D RRHH',
        semestre: '5° Semestre',
        descripcion: 'Implementación de encuestas analíticas para identificar factores de estrés académico y propuestas de pausas activas para el plantel.',
        impacto: 'Adoptado por el Departamento de Orientación Educativa del CETis 7.'
      },
      {
        titulo: 'Simulador Digital de Entrevistas STAR con Inteligencia de Datos',
        alumnos: 'Equipo Capital Humano Lerdo',
        semestre: '6° Semestre',
        descripcion: 'Guía interactiva que entrena a estudiantes en cómo responder y conducir entrevistas por competencias laborales reales.',
        impacto: 'Más de 300 alumnos de 6° semestre entrenados para su ingreso laboral.'
      },
      {
        titulo: 'Manual de Inducción Digital "Orgullo Lerdo"',
        alumnos: 'Academia de Recursos Humanos',
        semestre: '3° Semestre',
        descripcion: 'Material audiovisual y gráfico para la bienvenida formal y capacitación de nuevos integrantes de la comunidad técnica.',
        impacto: 'Reconocido por la Dirección del Plantel como material institucional.'
      }
    ],
    video_demo: {
      titulo: 'El Corazón de Toda Empresa: El Talento Humano',
      duracion: '2:50 min',
      presentador: 'Mtra. Patricia Mendoza (Docente de Recursos Humanos)',
      descripcion: 'Recorrido por las dinámicas de entrevista, resolución de dilemas éticos y cálculo de nómina en laboratorios administrativos.',
      url_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    video_academia: {
      titulo: 'Video Oficial de la Academia de Recursos Humanos',
      duracion: '3:15 min',
      presentador: 'Mtra. Patricia Mendoza Garduño y Docentes Tutores',
      descripcion: 'Explicación del rol estratégico del capital humano, aplicación de la NOM-035-STPS y talleres de entrevistas por competencias laborales.',
      url_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    galeria_alumnos: [
      {
        id: 'rrhh-gal-1',
        titulo: 'Roleplay de Entrevistas Estructuradas por Competencias',
        alumnos: 'Alumnos de 4° Semestre',
        semestre: '4° Semestre',
        tipo: 'video',
        url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        descripcion: 'Simulación interactiva de reclutamiento y selección de personal con retroalimentación en vivo.'
      },
      {
        id: 'rrhh-gal-2',
        titulo: 'Jornada de Diagnóstico de Clima Laboral NOM-035',
        alumnos: 'Grupo 5°D RRHH',
        semestre: '5° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Aplicación de cuestionarios de bienestar organizacional y pausas activas para la comunidad.'
      },
      {
        id: 'rrhh-gal-3',
        titulo: 'Taller Practico de Nóminas y Contratos LFT',
        alumnos: 'Alumnos de 6° Semestre',
        semestre: '6° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Cálculo de finiquitos y elaboración de contratos individuales de trabajo.'
      },
      {
        id: 'rrhh-drive-1',
        titulo: 'Galería Recursos Humanos 1',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1z1J_aJjy2Q-T_45u8diRfxJ2FjV76K-s/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-2',
        titulo: 'Galería Recursos Humanos 2',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1gXIDhbqHZF4sUiMBqqGGqLZGA75bXcCM/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-3',
        titulo: 'Galería Recursos Humanos 3',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1SFHJ40OSkVZ74LUJqcDkB2E11nX7UMAC/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-4',
        titulo: 'Galería Recursos Humanos 4',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/179DDIy40OcR_hkXvmlMxiGydn1V0NpYx/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-5',
        titulo: 'Galería Recursos Humanos 5',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/11TDlo7eCej-l_zLDpdIKF4X8S78Zips5/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-6',
        titulo: 'Galería Recursos Humanos 6',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/10Q259Ru8A2Bs5VEdpd9rcVMULM6WfjEk/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-7',
        titulo: 'Galería Recursos Humanos 7',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1pw5POoViC6fBeAAUzu1KI6n8YMXXjOQQ/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-8',
        titulo: 'Galería Recursos Humanos 8',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1XgCf4NtjSegIhgVVb_muuRSK7c5rXZid/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-9',
        titulo: 'Galería Recursos Humanos 9',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1FYeCnE67aYON3B5tHurZk-0k4JCocWmG/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-10',
        titulo: 'Galería Recursos Humanos 10',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1ta8qYsEK4XymD3RN1j-uMChpphfMQt_q/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-11',
        titulo: 'Galería Recursos Humanos 11',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1XM14-DMZIwI2y3F7Zw-im-wWSdxhSIhM/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-12',
        titulo: 'Galería Recursos Humanos 12',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1BN2fwadPlO41zECa_swTQM0gpYDZYAtz/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      },
      {
        id: 'rrhh-drive-13',
        titulo: 'Galería Recursos Humanos 13',
        alumnos: 'Academia de Recursos Humanos',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1RyHLrFkcBoU5eqfqzxP5agv_gHdDBWRs/view',
        descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
      }
    ],
    preguntas_quiz: [
      {
        id: 1,
        pregunta: '¿Cuál es la función medular del área de Recursos Humanos en una empresa?',
        opciones: [
          'Administrar, potenciar, capacitar y cuidar el bienestar del personal de la organización.',
          'Reparar impresoras y servidores de red.',
          'Vender boletos de avión a pasajeros.'
        ],
        respuesta_correcta: 0,
        explicacion: 'Recursos Humanos gestiona el talento desde su atracción hasta su desarrollo y retiro digno.'
      },
      {
        id: 2,
        pregunta: '¿Qué ley en México regula los derechos, jornadas, salarios y prestaciones de los trabajadores?',
        opciones: ['Ley Federal del Trabajo (LFT)', 'Código Penal Federal', 'Ley de Aguas Nacionales'],
        respuesta_correcta: 0,
        explicacion: 'La LFT rige los vínculos laborales bajo el Artículo 123 constitucional.'
      },
      {
        id: 3,
        pregunta: '¿Qué aspecto evalúa prioritariamente la NOM-035-STPS en los centros de trabajo?',
        opciones: [
          'La velocidad de la conexión a internet.',
          'Los factores de riesgo psicosocial y la promoción de un entorno organizacional favorable.',
          'El color de la pintura de las fachadas.'
        ],
        respuesta_correcta: 1,
        explicacion: 'La NOM-035 protege la salud mental, combate la violencia laboral y previene el estrés severo.'
      },
      {
        id: 4,
        pregunta: '¿Qué es el DNC en la gestión de capital humano?',
        opciones: [
          'Detección de Necesidades de Capacitación.',
          'Dirección Nacional de Cómputo.',
          'Documento Nacional de Contabilidad.'
        ],
        respuesta_correcta: 0,
        explicacion: 'El DNC permite identificar en qué áreas requiere entrenamiento y actualización el personal.'
      },
      {
        id: 5,
        pregunta: '¿Cuál de las siguientes es una prestación de ley obligatoria para los trabajadores en México?',
        opciones: ['Aguinaldo, vacaciones y prima vacacional', 'Viajes recreativos mensuales a la playa', 'Coche último modelo de la empresa'],
        respuesta_correcta: 0,
        explicacion: 'El aguinaldo anual, las vacaciones pagadas y la prima vacacional son derechos irrenunciables en la LFT.'
      }
    ],
    reto_presencial: {
      nombre: 'Match Laboral & Dinámica de Integración',
      objetivo: 'Entrevistar a 2 candidatos ficticios, cotejar competencias y seleccionar al perfil idóneo para un puesto crítico.',
      duracion_min: 15,
      dinamica: 'Los alumnos trabajan en parejas: uno asume el rol de reclutador y otro de supervisor de área. Analizan currículums vitae con dilemas éticos y seleccionan al candidato que demuestre mejor actitud y adaptabilidad.',
      espacio: 'Aula de Negocios y Administración (Edificio A)',
      materiales: 'Tarjetas de roles con casos de estudio, rúbrica de competencias laborales y reloj de arena de 3 minutos.'
    }
  },
  {
    id: 'cosmetologia',
    nombre: 'Técnico en Cosmetología',
    titulo_corto: 'Cosmetología',
    area: 'Ciencias de la Salud, Dermocosmiatría y Bienestar Integral',
    color_acento: '#be185d',
    color_badge: 'bg-pink-50 text-pink-700 border-pink-200',
    icono: 'Sparkles',
    resumen_ejecutivo: 'La Cosmetología se encarga de los cuidados estéticos del rostro y cuerpo, asepsia, rejuvenecimiento y embellecimiento saludable de la piel, conocimiento de activos cosméticos y técnicas de relajación que generan bienestar integral.',
    infografia_url: '/assets/aistudio/infografia_cosmetologia_cetis7.jpg',
    perfil_ingreso: [
      'Interés por las ciencias biológicas, dermatología preventiva y cuidado de la salud.',
      'Destreza manual fina, pulcritud, higiene y sensibilidad estética.',
      'Vocación de servicio al cliente y empatía con el bienestar de las personas.'
    ],
    perfil_egreso: [
      'Identificación precisa de biotipos cutáneos y aplicación de procesos de cosmetología básica facial y corporal.',
      'Aplicación de técnicas de activación facial profunda (antienvejecimiento y despigmentantes) y masaje relajante corporal.',
      'Ejecución de técnicas drenantes faciales (acné y piel sensible) y corporales (celulitis, estrías, depilación y epilación).',
      'Manipulación facial reafirmante (lifting), tratamientos corporales remodelantes y diseño de imagen y servicios de SPA.'
    ],
    campo_laboral: [
      "SPA's de gran turismo y de ciudad, centros de bienestar y cabinas estéticas.",
      'Clínicas dermatológicas, de cirugía estética y empresas de aparatología estética.',
      'Laboratorios de cosmética profesional y aplicaciones digitales de bienestar y belleza.',
      'Eventos sociales, servicios a domicilio y autoempleo.'
    ],
    submodulos: [
      { semestre: '2° Semestre', nombre: 'Módulo I: Realiza procesos de Cosmetología básica', competencia: 'M1S1 Limpia el rostro (faciales hidratantes y oxigenantes) · M1S2 Limpia el cuerpo (hidratación y maniobras básicas de masaje).' },
      { semestre: '3° Semestre', nombre: 'Módulo II: Aplica técnicas de activación facial y relajación corporal', competencia: 'M2S1 Faciales de activación profunda (antienvejecimiento y despigmentantes) · M2S2 Masaje relajante y tratamientos relajantes.' },
      { semestre: '4° Semestre', nombre: 'Módulo III: Aplica técnica y proceso drenante facial y corporal', competencia: 'M3S1 Drenante facial (acné y piel sensible) · M3S2 Drenante corporal (celulitis, estrías, piernas cansadas, depilación y epilación).' },
      { semestre: '5° Semestre', nombre: 'Módulo IV: Manipula el rostro y cuerpo con fines estéticos', competencia: 'M4S1 Manipula el rostro con fines reafirmantes (lifting) · M4S2 Tratamientos corporales remodelantes, reafirmantes y postoperatorios.' },
      { semestre: '6° Semestre', nombre: 'Módulo V: Implementa el diseño de imagen y servicios de SPA', competencia: 'M5S1 Maquillaje y diseño de imagen · M5S2 Técnicas de SPA y supervisión de los procesos de SPA.' }
    ],
    proyectos_destacados: [
      {
        titulo: 'Línea Dermocosmética Botánica "Xochitl-Lerdo"',
        alumnos: 'Alumnas de 5° Semestre - Grupo 5°F Cosmetología',
        semestre: '5° Semestre',
        descripcion: 'Formulación de gel hidratante y tónico calmante a base de nopal, caléndula y aloe vera cosechados sustentablemente en la alcaldía Gustavo A. Madero.',
        impacto: 'Validación de pH neutro (5.5) y cero irritación en pruebas de laboratorio.'
      },
      {
        titulo: 'Protocolo de Drenaje Linfático Manual para Alivio de Tensión',
        alumnos: 'Equipo Salud y Bienestar CETis 7',
        semestre: '4° Semestre',
        descripcion: 'Guía clínica de maniobras suaves de estimulación ganglionar para desinflamación facial y descongestión ocular.',
        impacto: 'Aplicado en jornadas comunitarias de salud del plantel a más de 200 vecinos.'
      },
      {
        titulo: 'Atlas Interactivo de Biotipos y Lesiones Cutáneas Básicas',
        alumnos: 'Academia de Cosmetología',
        semestre: '3° Semestre',
        descripcion: 'Fichas fotográficas ampliadas para la diferenciación entre piel alípica, seborreica y con rosácea para el uso didáctico de 1.er semestre.',
        impacto: 'Material de consulta permanente en la Cabina Didáctica 1.'
      }
    ],
    video_demo: {
      titulo: 'Ciencia, Salud y Belleza: Cosmetología CETis 7',
      duracion: '3:05 min',
      presentador: 'Cosmiatra Lic. Rosa Isela Romero (Titular de Cosmetología)',
      descripcion: 'Conoce lo que aprenderás en la carrera de Cosmetología en el canal oficial Cosmetología CETis 7.',
      url_video: 'https://www.youtube.com/channel/UCWMj1ilClTm5xxW_t6FZ7mg'
    },
    video_academia: {
      titulo: 'Canal Oficial de la Academia de Cosmetología CETis 7',
      duracion: '4:00 min',
      presentador: 'Cosmiatra Lic. Rosa Isela Romero Vargas y Colegiado',
      descripcion: 'Visita el canal oficial de Cosmetología CETis 7 para conocer las prácticas en cabina, protocolos faciales y corporales, drenaje y servicios de SPA.',
      url_video: 'https://www.youtube.com/channel/UCWMj1ilClTm5xxW_t6FZ7mg'
    },
    galeria_alumnos: [
      {
        id: 'cos-infografia-oficial',
        titulo: 'Infografía Oficial: Qué se estudia en Cosmetología',
        alumnos: 'Academia de Cosmetología CETis 7',
        semestre: 'Material Oficial',
        tipo: 'foto',
        url_media: '/assets/aistudio/infografia_cosmetologia_cetis7.jpg',
        descripcion: 'Infografía estandarizada con los 5 módulos profesionales (M1 a M5) y campo laboral de Cosmetología.'
      },
      {
        id: 'cos-gal-1',
        titulo: 'Demostración de Drenaje Linfático y Masaje Facial',
        alumnos: 'Alumnas de 6° Semestre',
        semestre: '6° Semestre',
        tipo: 'video',
        url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        descripcion: 'Técnica de maniobras suaves de descongestión ganglionar en cabina didáctica.'
      },
      {
        id: 'cos-gal-2',
        titulo: 'Línea Dermocosmética Botánica Xochitl-Lerdo',
        alumnos: 'Grupo 5°F Cosmetología',
        semestre: '5° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Presentación de lociones, tónicos y mascarillas con aloe vera y caléndula.'
      },
      {
        id: 'cos-gal-3',
        titulo: 'Análisis Cutáneo con Lupa Dermatológica y Luz LED',
        alumnos: 'Alumnos de 3° Semestre',
        semestre: '3° Semestre',
        tipo: 'foto',
        url_media: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
        descripcion: 'Evaluación del pH y biotipo cutáneo en modelos con estándares de higiene COFEPRIS.'
      },
      {
        id: 'cos-drive-1',
        titulo: 'Galería Cosmetología 1A',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1-mf-kQ3XbtJhhqXjIbQXBUMufRVzH3KE/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-1b',
        titulo: 'Galería Cosmetología 1B',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1Qga3N-jPbgvzkxP77YIonj4kfGQoEgvH/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-2',
        titulo: 'Galería Cosmetología 2',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1GZr1qoER1RcQoLmdAKxRONuaRAIiX5nN/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-3',
        titulo: 'Galería Cosmetología 3',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/12-iS6SE6f9CguqfYH92-ulmSMAVV_yGA/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-4',
        titulo: 'Galería Cosmetología 4',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1MMdvqBJ-CMc028BqFEh4GSt8oS8HcH4x/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-5',
        titulo: 'Galería Cosmetología 5',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1RA2LJwdg43BxzABTTB9YGgah1fPGhcuU/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-6',
        titulo: 'Galería Cosmetología 6',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1WQ5oFJYIkGflMEyhIPCwvO3AZoxolErR/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-7',
        titulo: 'Galería Cosmetología 7',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1UBGaafhZAX1mIBLETmmbSzROR-fqOB1r/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-8',
        titulo: 'Galería Cosmetología 8',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1f-KwkMWiVBswbk62sK4r2bEVniDFLHxj/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-9',
        titulo: 'Galería Cosmetología 9',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/17dtK-zvRd_VHlqRYPgLQ-RJEX2XtJxlq/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-10',
        titulo: 'Galería Cosmetología 10',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1xMoy_N002pDv3mR6ubB3Wbh-AdRyuVLj/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-11',
        titulo: 'Galería Cosmetología 11',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1jRyBM7jml-3uz6iLR3bKrICY4-5SMNAW/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-12',
        titulo: 'Galería Cosmetología 12',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1WWlLoJxj1pHA-mHWKyXwLhYH_9iSJ8cd/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-13',
        titulo: 'Galería Cosmetología 13',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1CoucVHk_ABYd27Rdwr3V-oYwR32vVEl_/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-14',
        titulo: 'Galería Cosmetología 14',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1jOp4ZvOUseoisRepWisipoUyXmfOszqO/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-15',
        titulo: 'Galería Cosmetología 15',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1Q7tSK_1qmNFK4nhOSfXHvd_Ya5ipHnQK/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-16',
        titulo: 'Galería Cosmetología 16',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1v4nceILyr_Be2KoQycLDxtD5LqLYbC37/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-17',
        titulo: 'Galería Cosmetología 17',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1LVH1_DmcYhWYwvZaTJHV1kq6CwQGg0dJ/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      },
      {
        id: 'cos-drive-18',
        titulo: 'Galería Cosmetología 18',
        alumnos: 'Academia de Cosmetología',
        semestre: 'Evidencia Estudiantil',
        tipo: 'foto',
        url_media: 'https://drive.google.com/file/d/1D-Gpsqx7k2zzvH9L5f9Hr_vIQsBUFOiV/view',
        descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
      }
    ],
    preguntas_quiz: COSMETOLOGIA_DIAGNOSTICO_REACTIVOS.map((r, idx) => ({
      id: typeof r.id === 'number' ? r.id : idx + 1,
      bloque: r.bloque,
      pregunta: r.pregunta,
      opciones: r.opciones,
      respuesta_correcta: r.es_informativa ? -1 : ({ a: 0, b: 1, c: 2, d: 3 }[r.correcta] ?? 0),
      explicacion: r.explicacion || '',
      es_informativa: r.es_informativa,
      aspecto_evaluado: r.aspecto_evaluado
    })),
    reto_presencial: {
      nombre: 'Taller Sensorial de Biotipos Cutáneos',
      objetivo: 'Identificar el biotipo cutáneo en modelos didácticos y formular un tónico botánico equilibrante con hidrolatos naturales en 10 minutos.',
      duracion_min: 15,
      dinamica: 'Los alumnos tocan y observan muestras texturizadas con lupa dermatológica para clasificar si es piel grasa o alípica, miden el pH con tiras reactivas y agregan activos de caléndula o hamamelis.',
      espacio: 'Cabina Didáctica de Cosmetología (Edificio D)',
      materiales: 'Lupa dermatológica con luz LED, tiras medidoras de pH, hidrolatos botánicos de lavanda y manzanilla, probetas graduadas.'
    }
  }
];

export const BANCO_PREGUNTAS_VOCACIONALES = {
  aptitudes: [
    {
      id: 1,
      enunciado: 'Frente a un problema complejo o un fallo técnico, prefieres:',
      opciones: [
        { texto: 'Descomponerlo paso a paso en un diagrama lógico hasta hallar el origen del error algorítmico.', specialty: 'programacion', valor: 25 },
        { texto: 'Investigar las normas, costos y rutas de solución más eficientes para no detener el flujo.', specialty: 'comercio', valor: 25 },
        { texto: 'Hablar con las personas involucradas para escuchar sus versiones y mediar una solución justa.', specialty: 'rrhh', valor: 25 },
        { texto: 'Observar con precisión visual los detalles físicos, texturas y aplicar una técnica manual cuidadosa.', specialty: 'cosmetologia', valor: 25 }
      ]
    },
    {
      id: 2,
      enunciado: 'En tus materias de secundaria y 1.er semestre, tu mayor destreza natural se demuestra en:',
      opciones: [
        { texto: 'Matemáticas aplicadas, lógica computacional y resolución de patrones numéricos.', specialty: 'programacion', valor: 25 },
        { texto: 'Geografía mundial, cálculo de presupuestos y comprensión de monedas e intercambios.', specialty: 'comercio', valor: 25 },
        { texto: 'Comunicación oral y escrita, liderazgo de equipos y organización de eventos cívicos.', specialty: 'rrhh', valor: 25 },
        { texto: 'Biología, química práctica, motricidad fina y apreciación de la estética y salud.', specialty: 'cosmetologia', valor: 25 }
      ]
    },
    {
      id: 3,
      enunciado: 'Cuando tienes que organizar un proyecto escolar desde cero, tu punto fuerte es:',
      opciones: [
        { texto: 'Construir la estructura técnica, bases de datos o automatizar la recolección de archivos.', specialty: 'programacion', valor: 25 },
        { texto: 'Planificar los recursos materiales, transporte y cronograma de entrega puntual.', specialty: 'comercio', valor: 25 },
        { texto: 'Asignar roles según las habilidades de cada compañero y mantener la motivación del grupo.', specialty: 'rrhh', valor: 25 },
        { texto: 'Cuidar la presentación sensorial, los protocolos de higiene y el acabado visual impecable.', specialty: 'cosmetologia', valor: 25 }
      ]
    },
    {
      id: 4,
      enunciado: '¿Qué tipo de herramienta o destreza manipulativa dominas con mayor soltura?',
      opciones: [
        { texto: 'Editores de código, teclado de computadora y comandos de software.', specialty: 'programacion', valor: 25 },
        { texto: 'Hojas de cálculo con fórmulas de costos, mapas de rutas y tablas arancelarias.', specialty: 'comercio', valor: 25 },
        { texto: 'Entrevistas cara a cara, formatos de evaluación del desempeño y encuestas.', specialty: 'rrhh', valor: 25 },
        { texto: 'Instrumental de precisión manual (espátulas, pipetas, aplicadores, lupas estéticas).', specialty: 'cosmetologia', valor: 25 }
      ]
    }
  ],
  intereses: [
    {
      id: 5,
      enunciado: '¿En qué entorno de trabajo te visualizas disfrutando plenamente tu jornada?',
      opciones: [
        { texto: 'En un centro de desarrollo de software o espacio tecnológico creando aplicaciones innovadoras.', specialty: 'programacion', valor: 25 },
        { texto: 'En una aduana fronteriza, puerto marítimo o corporativo multinacional coordinando envíos mundiales.', specialty: 'comercio', valor: 25 },
        { texto: 'En el área de talento y bienestar de una gran empresa fomentando un clima laboral sano.', specialty: 'rrhh', valor: 25 },
        { texto: 'En una clínica dermatológica, cabina de cosmiatría avanzada o spa de alta especialidad.', specialty: 'cosmetologia', valor: 25 }
      ]
    },
    {
      id: 6,
      enunciado: '¿Qué tema o lectura despierta espontáneamente tu curiosidad en tu tiempo libre?',
      opciones: [
        { texto: 'Novedades de inteligencia artificial, videojuegos, ciberseguridad y nuevos lenguajes.', specialty: 'programacion', valor: 25 },
        { texto: 'Comercio global, canales de navegación (Panamá/Suez), tratados y economía internacional.', specialty: 'comercio', valor: 25 },
        { texto: 'Comportamiento humano, liderazgo inspirador, derechos laborales y psicología social.', specialty: 'rrhh', valor: 25 },
        { texto: 'Cuidado de la piel, ingredientes botánicos activos, química cosmética y salud dérmica.', specialty: 'cosmetologia', valor: 25 }
      ]
    },
    {
      id: 7,
      enunciado: '¿Cuál sería tu mayor satisfacción al graduarte del CETis 7?',
      opciones: [
        { texto: 'Haber programado una aplicación que resuelva un problema real para miles de usuarios.', specialty: 'programacion', valor: 25 },
        { texto: 'Haber gestionado exitosamente la exportación de un producto mexicano al extranjero.', specialty: 'comercio', valor: 25 },
        { texto: 'Haber ayudado a personas a encontrar un trabajo digno y crecer profesionalmente.', specialty: 'rrhh', valor: 25 },
        { texto: 'Transformar la salud cutánea y autoestima de las personas con tratamientos profesionales.', specialty: 'cosmetologia', valor: 25 }
      ]
    },
    {
      id: 8,
      enunciado: '¿Con cuál de estos retos te sentirías más motivado y apasionado:',
      opciones: [
        { texto: 'Diseñar un algoritmo que optimice la seguridad de datos de una institución.', specialty: 'programacion', valor: 25 },
        { texto: 'Negociar los términos de envío y aranceles de un contenedor con compradores extranjeros.', specialty: 'comercio', valor: 25 },
        { texto: 'Diseñar un programa de bienestar que erradique el acoso y reduzca el estrés en un equipo.', specialty: 'rrhh', valor: 25 },
        { texto: 'Formular una línea de cremas botánicas hipoalergénicas con extractos naturales mexicanos.', specialty: 'cosmetologia', valor: 25 }
      ]
    }
  ]
};

export const ESTUDIANTES_INICIALES: Estudiante[] = [
  {
    num_control: '26316070010042',
    nombre_completo: 'Gael Emiliano Morales Sánchez',
    grupo: '1°A',
    turno: 'MATUTINO',
    correo_institucional: 'gael.morales.26@cetis7.edu.mx',
    curp: 'MOSG090314HDFRLA01',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    telefono_alumno: '55 4123 8901',
    tutor: {
      nombre_tutor: 'Ing. Fernando Morales Silva',
      parentesco: 'Padre',
      correo_tutor: 'fernando.morales.padre@gmail.com',
      telefono_tutor: '55 1234 5678',
      verificado: true,
      fecha_verificacion: '2026-10-31T18:30:00Z',
      firma_digital: 'Fdo. Fernando Morales S. - Firma Digital Tutor DGETI'
    }
  },
  {
    num_control: '26316070010118',
    nombre_completo: 'Valeria Sofía Hernández Mendoza',
    grupo: '1°B',
    turno: 'MATUTINO',
    correo_institucional: 'valeria.hernandez.26@cetis7.edu.mx',
    curp: 'HEMV090822MDFRNS04',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    telefono_alumno: '55 6789 1234',
    tutor: {
      nombre_tutor: 'Lic. Laura Mendoza Rivas',
      parentesco: 'Madre',
      correo_tutor: 'laura.mendoza.tutora@gmail.com',
      telefono_tutor: '55 8765 4321',
      verificado: true,
      fecha_verificacion: '2026-10-31T19:00:00Z',
      firma_digital: 'Fdo. Laura Mendoza R. - Firma Digital Tutor DGETI'
    }
  },
  {
    num_control: '26316070010205',
    nombre_completo: 'Diego Alejandro Ramírez Ortiz',
    grupo: '1°C',
    turno: 'VESPERTINO',
    correo_institucional: 'diego.ramirez.26@cetis7.edu.mx',
    curp: 'RAOD091105HDFMRG09',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    telefono_alumno: '55 3344 5566',
    tutor: {
      nombre_tutor: 'Prof. Jorge Ramírez Ortiz',
      parentesco: 'Padre',
      correo_tutor: 'jorge.ramirez.tutor@gmail.com',
      telefono_tutor: '55 9876 5432',
      verificado: false
    }
  },
  {
    num_control: '26316070010312',
    nombre_completo: 'Ximena Guadalupe Torres Castillo',
    grupo: '1°D',
    turno: 'VESPERTINO',
    correo_institucional: 'ximena.torres.26@cetis7.edu.mx',
    curp: 'TOCX090518MDFRTL03',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    telefono_alumno: '55 7788 9900',
    tutor: {
      nombre_tutor: 'Sra. Beatriz Castillo Peza',
      parentesco: 'Madre',
      correo_tutor: 'beatriz.castillo.tutora@gmail.com',
      telefono_tutor: '55 6543 2109',
      verificado: false
    }
  },
  {
    num_control: '26316070010419',
    nombre_completo: 'Mateo Sebastián Cruz Pineda',
    grupo: '1°E',
    turno: 'MATUTINO',
    correo_institucional: 'mateo.cruz.26@cetis7.edu.mx',
    curp: 'CUPM090129HDFRND02',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    telefono_alumno: '55 2211 4433',
    tutor: {
      nombre_tutor: 'Sr. Roberto Cruz Navarro',
      parentesco: 'Padre',
      correo_tutor: 'roberto.cruz.tutor@gmail.com',
      telefono_tutor: '55 4321 0987',
      verificado: false
    }
  },
  {
    num_control: '26316070010523',
    nombre_completo: 'Camila Fernanda Reyes Aguilar',
    grupo: '1°F',
    turno: 'VESPERTINO',
    correo_institucional: 'camila.reyes.26@cetis7.edu.mx',
    curp: 'REAC090412MDFRLS03',
    telefono_alumno: '55 6677 8899',
    tutor: {
      nombre_tutor: 'Sra. Patricia Aguilar Reyes',
      parentesco: 'Madre',
      correo_tutor: 'patricia.aguilar.tutora@gmail.com',
      telefono_tutor: '55 3210 9876',
      verificado: false
    }
  },
  {
    num_control: '26316070010631',
    nombre_completo: 'Leonardo Daniel Gómez Varela',
    grupo: '1°A',
    turno: 'MATUTINO',
    correo_institucional: 'leonardo.gomez.26@cetis7.edu.mx',
    curp: 'GOVL091003HDFRMD05',
    telefono_alumno: '55 1199 8822',
    tutor: {
      nombre_tutor: 'Dr. Alejandro Gómez Varela',
      parentesco: 'Padre',
      correo_tutor: 'alejandro.gomez.tutor@gmail.com',
      telefono_tutor: '55 2109 8765',
      verificado: true,
      fecha_verificacion: '2026-10-30T14:20:00Z',
      firma_digital: 'Fdo. Alejandro Gómez V. - Firma Digital Tutor DGETI'
    }
  },
  {
    num_control: '26316070010744',
    nombre_completo: 'Renata Nicole Domínguez Silva',
    grupo: '1°B',
    turno: 'MATUTINO',
    correo_institucional: 'renata.dominguez.26@cetis7.edu.mx',
    curp: 'DOSR090620MDFRNL01',
    telefono_alumno: '55 4433 2211',
    tutor: {
      nombre_tutor: 'Lic. Carmen Silva Domínguez',
      parentesco: 'Madre',
      correo_tutor: 'carmen.silva.tutora@gmail.com',
      telefono_tutor: '55 1098 7654',
      verificado: true,
      fecha_verificacion: '2026-10-30T16:45:00Z',
      firma_digital: 'Fdo. Carmen Silva D. - Firma Digital Tutor DGETI'
    }
  },
  {
    num_control: '26316070010852',
    nombre_completo: 'Santiago Jesús Méndez Rangel',
    grupo: '1°C',
    turno: 'VESPERTINO',
    correo_institucional: 'santiago.mendez.26@cetis7.edu.mx',
    curp: 'MERS091215HDFRGP08',
    telefono_alumno: '55 9988 7766',
    tutor: {
      nombre_tutor: 'Sr. Javier Méndez Rangel',
      parentesco: 'Padre',
      correo_tutor: 'javier.mendez.tutor@gmail.com',
      telefono_tutor: '55 0987 6543',
      verificado: false
    }
  },
  {
    num_control: '26316070010967',
    nombre_completo: 'Andrea Jimena Salazar Flores',
    grupo: '1°D',
    turno: 'VESPERTINO',
    correo_institucional: 'andrea.salazar.26@cetis7.edu.mx',
    curp: 'SAFA090708MDFRNT06',
    telefono_alumno: '55 8877 6655',
    tutor: {
      nombre_tutor: 'Sra. Rocío Flores Salazar',
      parentesco: 'Madre',
      correo_tutor: 'rocio.flores.tutora@gmail.com',
      telefono_tutor: '55 9876 1234',
      verificado: false
    }
  }
];

export const FICHAS_ACADEMIA_DEFAULT: Record<string, FichaAcademiaReq> = {
  programacion: {
    especialidad_id: 'programacion',
    nombre_especialidad: 'Técnico en Programación',
    presidente_academia: 'Ing. Carlos Alberto Navarrete Silva',
    integrantes_academia: [
      'Ing. Marco Antonio Estrada',
      'Mtra. Laura Patricia Guadarrama',
      'Ing. Roberto Zepeda Morales'
    ],
    fecha_entrega: '2026-11-15',
    resumen_ejecutivo: 'Forma técnicos con capacidades analíticas sólidas para diseñar, codificar, depurar e implementar sistemas informáticos, soluciones web de alto impacto, bases de datos relacionales y aplicaciones móviles para el sector productivo nacional e internacional.',
    recursos_multimedia: {
      video_url_o_estado: 'Grabación de 2:45 min en Laboratorio 3 en MP4 1080p con demostración de proyectos.',
      infografia_formato: 'Infografía en PDF vectorizado alta resolución con mapa modular I al V y salidas ocupacionales.',
      proyectos_registrados: [
        'Sistema Escolar Web LerdoConecta',
        'App Móvil SOS Comunitaria Cuautepec',
        'Simulador de Encriptación y Ciberdefensa'
      ],
      video_academia: {
        titulo: 'Video Oficial de la Academia de Programación CETis 7',
        duracion: '4:15 min',
        presentador: 'Ing. Marco Antonio Estrada Ruiz y Colegiado de Docentes',
        descripcion: 'Los profesores de la academia explican el modelo de proyectos integradores, la ruta de aprendizaje en desarrollo Web y Móvil, y los requerimientos para el campo laboral.',
        url_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      galeria_alumnos: [
        {
          id: 'prog-gal-1',
          titulo: 'Sistema Escolar Web LerdoConecta',
          alumnos: 'Sofía Martínez y Carlos Ruiz',
          semestre: '5° Semestre',
          tipo: 'video',
          url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          descripcion: 'Demostración en vivo del sistema de calificaciones con Firebase Firestore y panel reactivo.'
        },
        {
          id: 'prog-gal-2',
          titulo: 'App Móvil SOS Comunitaria Cuautepec',
          alumnos: 'Equipo Innovatec 6°A',
          semestre: '6° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Alumnos exponiendo el prototipo galardonado en el Concurso DGETI 2025.'
        },
        {
          id: 'prog-gal-3',
          titulo: 'Laboratorio de Algoritmos e Inteligencia Artificial',
          alumnos: 'Comunidad de Alumnos de 4° Semestre',
          semestre: '4° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Sesión práctica de desarrollo en el Laboratorio de Cómputo 3.'
        }
      ]
    },
    banco_reactivos: [
      {
        pregunta: '¿Cuál es el objetivo principal de la especialidad de Programación en el CETis No. 7?',
        opciones: ['Armar computadoras físicas exclusivamente', 'Diseñar, codificar, implementar y mantener sistemas de software y apps', 'Elaborar contratos de trabajo'],
        correcta: 'b'
      },
      {
        pregunta: '¿En qué semestre se cursa el módulo de desarrollo de aplicaciones móviles?',
        opciones: ['2° Semestre', '4° Semestre', '6° Semestre'],
        correcta: 'c'
      },
      {
        pregunta: '¿Qué destreza principal desarrolla el estudiante en esta carrera técnica?',
        opciones: ['Pensamiento lógico, razonamiento algorítmico y modularidad', 'Clasificación arancelaria y despacho aduanero', 'Drenaje linfático facial'],
        correcta: 'a'
      },
      {
        pregunta: '¿Cuál de los proyectos destacados presentados fue reconocido en el Concurso de Prototipos DGETI 2025?',
        opciones: ['Pase de lista con credencial', 'App Móvil SOS Comunitaria Cuautepec', 'Catálogo de cremas de sábila'],
        correcta: 'b'
      },
      {
        pregunta: '¿Cuál es un campo de inserción profesional directo para los egresados?',
        opciones: ['Empresas de desarrollo tecnológico, áreas de sistemas y soporte de software', 'Agencias aduanales marítimas', 'Spas de belleza'],
        correcta: 'a'
      }
    ],
    reto_ludico: {
      nombre: 'Escape Room: El Algoritmo Perdido',
      objetivo: 'Resolver acertijos lógicos y depurar bloques de código visual para desbloquear una terminal cifrada en menos de 10 minutos.',
      dinamica: 'Los alumnos reciben una pista en forma de diagrama de flujo con errores de bifurcación condicional. Al corregir la secuencia, obtienen una clave que introduce en la terminal para abrir el contenedor de premio de la academia.',
      espacio: 'Laboratorio',
      mobiliario_conexiones: '20 computadoras con conexión a red local, pantalla para proyección y tomas de corriente reguladas.',
      materiales_insumos: 'Tarjetas didácticas plastificadas con bloques de pseudocódigo, cronómetro digital y caja de seguridad didáctica.'
    }
  },
  comercio: {
    especialidad_id: 'comercio',
    nombre_especialidad: 'Bachillerato Tecnológico en Comercio Internacional y Aduanas',
    presidente_academia: 'Lic. Claudia Becerril Morales',
    integrantes_academia: [
      'Lic. Fernando Reyes Arredondo',
      'Mtro. Jorge Luis Santillán',
      'Lic. Ana María Padrón'
    ],
    fecha_entrega: '2026-11-15',
    resumen_ejecutivo: 'Forma técnicos en Comercio Internacional y Aduanas con competencias en gestión de importaciones y exportaciones, estimación de costos y planes de exportación, clasificación arancelaria, procesos aduaneros, empleabilidad y economía ecológica.',
    recursos_multimedia: {
      video_url_o_estado: 'Video oficial principal MP4 de Comercio Internacional y Aduanas integrado en plataforma.',
      infografia_formato: 'Infografía oficial del Perfil de Egreso: Comercio Internacional y Aduanas (Competencias Laborales, Formación Integral y Principales Puestos de Trabajo).',
      proyectos_registrados: [
        'Ruta de Exportación: Miel de Agave a la Unión Europea',
        'Simulador Digital de Cubicaje de Contenedores 40ft',
        'Manual de Cumplimiento Arancelario para PYMES'
      ],
      video_academia: {
        titulo: 'Video Principal: Comercio Internacional y Aduanas',
        duracion: '0:45 min',
        presentador: 'DGETI · Academia de Comercio Internacional y Aduanas CETis 7',
        descripcion: 'Cada producto que usas y cada mercancía que llega necesita un estratega. Conoce la carrera técnica en Comercio Internacional y Aduanas y sus oportunidades laborales y universitarias.',
        url_video: '/assets/aistudio/Comercio_internacional_y_aduanas_video_principal_979d88d2.mp4'
      },
      galeria_alumnos: [
        {
          id: 'com-infografia-oficial',
          titulo: 'Infografía Oficial: Perfil de Egreso y Puestos de Trabajo',
          alumnos: 'Academia de Comercio Internacional y Aduanas',
          semestre: 'Material Oficial',
          tipo: 'foto',
          url_media: '/assets/aistudio/image_ed736886.png',
          descripcion: 'Infografía institucional con las competencias laborales principales, formación integral y principales puestos de trabajo de Comercio Internacional y Aduanas.'
        },
        {
          id: 'com-gal-1',
          titulo: 'Simulador Digital de Cubicaje de Contenedores 40ft',
          alumnos: 'Equipo Logistix 6°A',
          semestre: '6° Semestre',
          tipo: 'video',
          url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          descripcion: 'Video demostrativo de estiba y optimización de espacio volumétrico en transporte marítimo.'
        },
        {
          id: 'com-gal-2',
          titulo: 'Maqueta de Garita Aduanal y Puerto de Veracruz',
          alumnos: 'Alumnos de 3° Semestre',
          semestre: '3° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Representación física a escala del proceso de desaduanamiento y semáforo fiscal.'
        },
        {
          id: 'com-gal-3',
          titulo: 'Ruta de Exportación de Miel de Agave a la UE',
          alumnos: 'Grupo 5°B Comercio',
          semestre: '5° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Exposición de la carpeta técnica con Incoterms y certificado de origen bajo TLCUEM.'
        }
      ]
    },
    banco_reactivos: [
      {
        pregunta: '¿Qué documento oficial legaliza el tránsito y desaduanamiento de mercancías en México?',
        opciones: ['Pedimento Aduanal', 'Carta de recomendación escolar', 'Credencial de elector'],
        correcta: 'a'
      },
      {
        pregunta: '¿Para qué sirven los Incoterms en el comercio mundial?',
        opciones: ['Calcular el promedio escolar', 'Determinar costos, riesgos y obligaciones entre comprador y vendedor', 'Escribir código de software'],
        correcta: 'b'
      },
      {
        pregunta: '¿En qué consiste el cubicaje en la logística?',
        opciones: ['Maximizar el aprovechamiento de espacio en contenedores', 'Pintar contenedores de colores', 'Calcular el aguinaldo'],
        correcta: 'a'
      },
      {
        pregunta: '¿Cuál es el tratado comercial clave de México con América del Norte?',
        opciones: ['Pacto Andino', 'T-MEC', 'Tratado de Kioto'],
        correcta: 'b'
      },
      {
        pregunta: '¿Cuáles son los principales puestos de trabajo de un egresado de Comercio Internacional y Aduanas?',
        opciones: ['Auxiliar de aduanas, comercio exterior, logística internacional, tráfico o clasificación arancelaria', 'Laboratorios clínicos únicamente', 'Salones de manicura'],
        correcta: 'a'
      }
    ],
    reto_ludico: {
      nombre: 'Rally Aduanero: Despacho Express',
      objetivo: 'Inspeccionar un lote de mercancías, verificar documentos y asignar el semáforo fiscal (verde/rojo) en menos de 12 minutos.',
      dinamica: 'Los estudiantes reciben fichas técnicas de mercancías (ej. componentes electrónicos, ropa, productos perecederos). Deben cotejar factura comercial contra packing list e identificar si cumple las NOMs de etiquetado para dar salida.',
      espacio: 'Taller',
      mobiliario_conexiones: '4 mesas de trabajo tipo mesón aduanal, báscula de pesaje y computadoras para consulta de fracción arancelaria.',
      materiales_insumos: 'Réplicas de pedimentos simplificados, sellos de aduana ANAM didácticos, contenedores en miniatura a escala y balanza digital.'
    }
  },
  rrhh: {
    especialidad_id: 'rrhh',
    nombre_especialidad: 'Técnico en Administración de Recursos Humanos',
    presidente_academia: 'Mtra. Patricia Mendoza Garduño',
    integrantes_academia: [
      'Lic. Héctor Hugo Benítez',
      'Mtra. Rocío Salgado Fuentes',
      'Lic. Silvia Ortega Galindo'
    ],
    fecha_entrega: '2026-11-15',
    resumen_ejecutivo: 'Capacita al alumno en la atracción, selección, contratación, capacitación, evaluación y bienestar del talento humano en organizaciones productivas, con estricto apego a la Ley Federal del Trabajo y la NOM-035-STPS.',
    recursos_multimedia: {
      video_url_o_estado: 'Video explicativo 2:50 min con dramatización de entrevistas por competencias y dinámicas grupales.',
      infografia_formato: 'Infografía interactiva sobre cálculo de nómina y los 5 módulos de especialidad.',
      proyectos_registrados: [
        'Diagnóstico de Clima Laboral NOM-035',
        'Simulador Digital de Entrevistas STAR',
        'Manual de Inducción Digital Orgullo Lerdo'
      ],
      galeria_alumnos: [
        {
          id: 'rrhh-gal-1',
          titulo: 'Roleplay de Entrevistas Estructuradas por Competencias',
          alumnos: 'Alumnos de 4° Semestre',
          semestre: '4° Semestre',
          tipo: 'video',
          url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          descripcion: 'Simulación interactiva de reclutamiento y selección de personal con retroalimentación en vivo.'
        },
        {
          id: 'rrhh-gal-2',
          titulo: 'Jornada de Diagnóstico de Clima Laboral NOM-035',
          alumnos: 'Grupo 5°D RRHH',
          semestre: '5° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Aplicación de cuestionarios de bienestar organizacional y pausas activas para la comunidad.'
        },
        {
          id: 'rrhh-gal-3',
          titulo: 'Taller Practico de Nóminas y Contratos LFT',
          alumnos: 'Alumnos de 6° Semestre',
          semestre: '6° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Cálculo de finiquitos y elaboración de contratos individuales de trabajo.'
        },
        {
          id: 'rrhh-drive-1',
          titulo: 'Galería Recursos Humanos 1',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1z1J_aJjy2Q-T_45u8diRfxJ2FjV76K-s/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-2',
          titulo: 'Galería Recursos Humanos 2',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1gXIDhbqHZF4sUiMBqqGGqLZGA75bXcCM/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-3',
          titulo: 'Galería Recursos Humanos 3',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1SFHJ40OSkVZ74LUJqcDkB2E11nX7UMAC/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-4',
          titulo: 'Galería Recursos Humanos 4',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/179DDIy40OcR_hkXvmlMxiGydn1V0NpYx/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-5',
          titulo: 'Galería Recursos Humanos 5',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/11TDlo7eCej-l_zLDpdIKF4X8S78Zips5/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-6',
          titulo: 'Galería Recursos Humanos 6',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/10Q259Ru8A2Bs5VEdpd9rcVMULM6WfjEk/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-7',
          titulo: 'Galería Recursos Humanos 7',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1pw5POoViC6fBeAAUzu1KI6n8YMXXjOQQ/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-8',
          titulo: 'Galería Recursos Humanos 8',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1XgCf4NtjSegIhgVVb_muuRSK7c5rXZid/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-9',
          titulo: 'Galería Recursos Humanos 9',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1FYeCnE67aYON3B5tHurZk-0k4JCocWmG/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-10',
          titulo: 'Galería Recursos Humanos 10',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1ta8qYsEK4XymD3RN1j-uMChpphfMQt_q/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-11',
          titulo: 'Galería Recursos Humanos 11',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1XM14-DMZIwI2y3F7Zw-im-wWSdxhSIhM/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-12',
          titulo: 'Galería Recursos Humanos 12',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1BN2fwadPlO41zECa_swTQM0gpYDZYAtz/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        },
        {
          id: 'rrhh-drive-13',
          titulo: 'Galería Recursos Humanos 13',
          alumnos: 'Academia de Recursos Humanos',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1RyHLrFkcBoU5eqfqzxP5agv_gHdDBWRs/view',
          descripcion: 'Fotografía de actividades y trabajos realizados por alumnos de la especialidad de Recursos Humanos.'
        }
      ]
    },
    banco_reactivos: [
      {
        pregunta: '¿Cuál es la función medular de la administración de Recursos Humanos?',
        opciones: ['Gestionar el talento, potenciar el clima laboral y velar por el bienestar del personal', 'Armar piezas automotrices', 'Programar bases de datos'],
        correcta: 'a'
      },
      {
        pregunta: '¿Qué ley tutela los derechos laborales en México bajo el artículo 123 constitucional?',
        opciones: ['Ley Federal del Trabajo (LFT)', 'Código Fiscal de la Federación', 'Ley de Aviación Civil'],
        correcta: 'a'
      },
      {
        pregunta: '¿Qué norma oficial mexicana previene los factores de riesgo psicosocial en el trabajo?',
        opciones: ['NOM-001-SEDE', 'NOM-035-STPS', 'NOM-025-SCFI'],
        correcta: 'b'
      },
      {
        pregunta: '¿Qué significa la sigla DNC en capacitación laboral?',
        opciones: ['Diagnóstico / Detección de Necesidades de Capacitación', 'Dirección Nacional de Cómputo', 'Documento de Nómina Colectiva'],
        correcta: 'a'
      },
      {
        pregunta: '¿Cuál es una prestación laboral obligatoria por ley en México?',
        opciones: ['Aguinaldo y prima vacacional', 'Bono de telefonía satelital', 'Auto deportivo de lujo'],
        correcta: 'a'
      }
    ],
    reto_ludico: {
      nombre: 'Match Laboral & Dinámica de Integración',
      objetivo: 'Entrevistar a 2 candidatos ficticios, cotejar competencias y seleccionar al perfil idóneo para un puesto crítico.',
      dinamica: 'Los alumnos trabajan en parejas: uno asume el rol de reclutador y otro de supervisor de área. Analizan currículums vitae con dilemas éticos y seleccionan al candidato que demuestre mejor actitud y adaptabilidad.',
      espacio: 'Aula',
      mobiliario_conexiones: 'Escritorios modulares para simulación de cabinas de entrevista, pantalla interactiva para presentación de perfiles.',
      materiales_insumos: 'Tarjetas de roles con casos de estudio, rúbrica de competencias laborales y reloj de arena de 3 minutos.'
    }
  },
  cosmetologia: {
    especialidad_id: 'cosmetologia',
    nombre_especialidad: 'Técnico en Cosmetología',
    presidente_academia: 'Cosmiatra Lic. Rosa Isela Romero Vargas',
    integrantes_academia: [
      'Lic. Mayra Janet González',
      'Téc. Martha Elena Solís',
      'Q.F.B. Andrés Delgado Cruz'
    ],
    fecha_entrega: '2026-11-15',
    resumen_ejecutivo: 'La Cosmetología se encarga de los cuidados estéticos del rostro y cuerpo, asepsia, rejuvenecimiento y embellecimiento saludable de la piel, conocimiento de activos cosméticos y técnicas de relajación que generan bienestar integral.',
    recursos_multimedia: {
      video_url_o_estado: 'Canal oficial de YouTube Cosmetología CETis 7 (https://www.youtube.com/channel/UCWMj1ilClTm5xxW_t6FZ7mg) y videos de cabina.',
      infografia_formato: 'Infografía oficial estandarizada CETis 7 con los 5 módulos profesionales (M1 a M5) y campo de trabajo.',
      proyectos_registrados: [
        'Línea Dermocosmética Botánica Xochitl-Lerdo',
        'Protocolo de Drenaje Linfático Manual',
        'Atlas Interactivo de Biotipos y Lesiones Dérmicas'
      ],
      galeria_alumnos: [
        {
          id: 'cos-infografia-oficial',
          titulo: 'Infografía Oficial: Qué se estudia en Cosmetología',
          alumnos: 'Academia de Cosmetología CETis 7',
          semestre: 'Material Oficial',
          tipo: 'foto',
          url_media: '/assets/aistudio/infografia_cosmetologia_cetis7.jpg',
          descripcion: 'Infografía estandarizada con los 5 módulos profesionales (M1 a M5) y campo laboral de Cosmetología.'
        },
        {
          id: 'cos-gal-1',
          titulo: 'Demostración de Drenaje Linfático y Masaje Facial',
          alumnos: 'Alumnas de 6° Semestre',
          semestre: '6° Semestre',
          tipo: 'video',
          url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          descripcion: 'Técnica de maniobras suaves de descongestión ganglionar en cabina didáctica.'
        },
        {
          id: 'cos-gal-2',
          titulo: 'Línea Dermocosmética Botánica Xochitl-Lerdo',
          alumnos: 'Grupo 5°F Cosmetología',
          semestre: '5° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Presentación de lociones, tónicos y mascarillas con aloe vera y caléndula.'
        },
        {
          id: 'cos-gal-3',
          titulo: 'Análisis Cutáneo con Lupa Dermatológica y Luz LED',
          alumnos: 'Alumnos de 3° Semestre',
          semestre: '3° Semestre',
          tipo: 'foto',
          url_media: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
          descripcion: 'Evaluación del pH y biotipo cutáneo en modelos con estándares de higiene COFEPRIS.'
        },
        {
          id: 'cos-drive-1',
          titulo: 'Galería Cosmetología 1A',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1-mf-kQ3XbtJhhqXjIbQXBUMufRVzH3KE/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-1b',
          titulo: 'Galería Cosmetología 1B',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1Qga3N-jPbgvzkxP77YIonj4kfGQoEgvH/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-2',
          titulo: 'Galería Cosmetología 2',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1GZr1qoER1RcQoLmdAKxRONuaRAIiX5nN/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-3',
          titulo: 'Galería Cosmetología 3',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/12-iS6SE6f9CguqfYH92-ulmSMAVV_yGA/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-4',
          titulo: 'Galería Cosmetología 4',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1MMdvqBJ-CMc028BqFEh4GSt8oS8HcH4x/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-5',
          titulo: 'Galería Cosmetología 5',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1RA2LJwdg43BxzABTTB9YGgah1fPGhcuU/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-6',
          titulo: 'Galería Cosmetología 6',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1WQ5oFJYIkGflMEyhIPCwvO3AZoxolErR/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-7',
          titulo: 'Galería Cosmetología 7',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1UBGaafhZAX1mIBLETmmbSzROR-fqOB1r/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-8',
          titulo: 'Galería Cosmetología 8',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1f-KwkMWiVBswbk62sK4r2bEVniDFLHxj/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-9',
          titulo: 'Galería Cosmetología 9',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/17dtK-zvRd_VHlqRYPgLQ-RJEX2XtJxlq/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-10',
          titulo: 'Galería Cosmetología 10',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1xMoy_N002pDv3mR6ubB3Wbh-AdRyuVLj/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-11',
          titulo: 'Galería Cosmetología 11',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1jRyBM7jml-3uz6iLR3bKrICY4-5SMNAW/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-12',
          titulo: 'Galería Cosmetología 12',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1WWlLoJxj1pHA-mHWKyXwLhYH_9iSJ8cd/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-13',
          titulo: 'Galería Cosmetología 13',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1CoucVHk_ABYd27Rdwr3V-oYwR32vVEl_/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-14',
          titulo: 'Galería Cosmetología 14',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1jOp4ZvOUseoisRepWisipoUyXmfOszqO/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-15',
          titulo: 'Galería Cosmetología 15',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1Q7tSK_1qmNFK4nhOSfXHvd_Ya5ipHnQK/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-16',
          titulo: 'Galería Cosmetología 16',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1v4nceILyr_Be2KoQycLDxtD5LqLYbC37/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-17',
          titulo: 'Galería Cosmetología 17',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1LVH1_DmcYhWYwvZaTJHV1kq6CwQGg0dJ/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        },
        {
          id: 'cos-drive-18',
          titulo: 'Galería Cosmetología 18',
          alumnos: 'Academia de Cosmetología',
          semestre: 'Evidencia Estudiantil',
          tipo: 'foto',
          url_media: 'https://drive.google.com/file/d/1D-Gpsqx7k2zzvH9L5f9Hr_vIQsBUFOiV/view',
          descripcion: 'Fotografía de prácticas en cabina y trabajos realizados por alumnos de Cosmetología.'
        }
      ]
    },
    banco_reactivos: COSMETOLOGIA_DIAGNOSTICO_REACTIVOS,
    reto_ludico: {
      nombre: 'Taller Sensorial de Biotipos Cutáneos',
      objetivo: 'Identificar el biotipo cutáneo en modelos didácticos y formular un tónico botánico equilibrante con hidrolatos naturales en 10 minutos.',
      dinamica: 'Los alumnos tocan y observan muestras texturizadas con lupa dermatológica para clasificar si es piel grasa o alípica, miden el pH con tiras reactivas y agregan activos de caléndula o hamamelis.',
      espacio: 'Taller',
      mobiliario_conexiones: 'Mesas inoxidables de laboratorio, lavabos con agua corriente, esterilizador autoclave y conexiones para lupas con luz.',
      materiales_insumos: 'Lupa dermatológica con luz LED, tiras medidoras de pH, hidrolatos botánicos de lavanda y manzanilla, probetas graduadas.'
    }
  }
};

export const OFICIO_CIRCULAR_DEFAULT: OficioCircular = {
  clave_oficio: 'DGETI/CDMX/CETIS007/SA/028/2026',
  asunto: 'Convocatoria y Lineamientos Operativos para la Feria de Especialidades e Innovación Tecnológica 2026 (Modelo Híbrido 70/30)',
  lugar_fecha: 'Ciudad de México, a 03 de Noviembre de 2026',
  destinatarios: 'A toda la Comunidad Escolar de 1.er Semestre, Presidentes de Academia, Docentes Tutores y Padres de Familia del CETis No. 7',
  cuerpo: [
    'Con fundamento en las directrices emitidas por la Dirección General de Educación Tecnológica Industrial y de Servicios (DGETI) relativas al fortalecimiento de la orientación vocacional y la elección informada de trayectoria técnica para el alumnado de primer semestre, se emite la presente CONVOCATORIA OFICIAL.',
    'La Feria de Especialidades e Innovación Tecnológica ciclo 2026 operará bajo el MODELO HÍBRIDO OBLIGATORIO (70% Virtual / 30% Presencial):',
    '1. ETAPA VIRTUAL (70%): Los alumnos deberán registrarse con su Número de Control en la plataforma oficial, completar la Evaluación Diagnóstica Dual (Aptitudes vs. Intereses), explorar los contenidos de las cuatro carreras (Programación, Comercio Internacional y Aduanas, Recursos Humanos y Cosmetología) y aprobar los cuestionarios de comprensión. Al concluir, el sistema emitirá el Pase Digital QR y Clave Única Token.',
    '2. ETAPA PRESENCIAL (30%): Presentándose en las instalaciones del plantel, el alumno validará su Pase Digital QR en el filtro de acceso y participará en el Rally de Retos Lúdicos Integradores en los talleres y laboratorios asignados.',
    '3. ACREDITACIÓN FINAL: Una vez selladas las estaciones presenciales, la Subdirección Académica y la Coordinación de Tutorías emitirán la Cédula Oficial de Acreditación Integral 100%, requisito indispensable para el registro definitivo de carrera técnica.',
    'Se instruye a las Academias de Especialidad y al personal docente a brindar todas las facilidades didácticas requeridas conforme a la ficha técnica estandarizada.'
  ],
  firmante_nombre: 'Mtro. José Luis Rodríguez Arredondo',
  firmante_cargo: 'Subdirector Académico del CETis No. 7 "Miguel Lerdo de Tejada"',
  sello_oficial: 'CETIS 007 - SUBDIRECCIÓN ACADÉMICA - DGETI CDMX'
};

export const CUESTIONARIOS_DEFAULT: CuestionarioEspecialidad[] = [
  {
    id: 'quiz-programacion-oficial',
    especialidad_id: 'programacion',
    titulo: 'Evaluación Formativa de Programación y Software',
    descripcion: 'Comprobación de competencias sobre desarrollo de software, POO, aplicaciones móviles y campo laboral.',
    instrucciones: 'Lee atentamente cada reactivo y selecciona la opción correcta. Se requiere 60% para aprobar.',
    porcentaje_aprobatorio: 60,
    tiempo_limite_min: 15,
    activo: true,
    fecha_actualizacion: '2026-11-03T09:00:00.000Z',
    autor_docente: 'Ing. Marco Antonio Estrada Ruiz (Jefe de Academia)',
    preguntas: [
      {
        id: 1,
        pregunta: '¿Cuál es el objetivo principal de la especialidad de Programación en el CETis No. 7?',
        opciones: [
          'Únicamente armar y reparar computadoras físicamente.',
          'Diseñar, programar, implementar y mantener sistemas de software y aplicaciones web/móviles.',
          'Gestionar trámites de nóminas y contratos colectivos.'
        ],
        correcta: 'b',
        explicacion: 'Programación se enfoca en el desarrollo de software, modelado algorítmico y aplicaciones web/móviles integrales.'
      },
      {
        id: 2,
        pregunta: '¿En qué semestre se imparte el Módulo de desarrollo de aplicaciones para móviles en el mapa curricular DGETI?',
        opciones: ['1° Semestre', '3° Semestre', '6° Semestre'],
        correcta: 'c',
        explicacion: 'El Módulo V se cursa en 6° semestre y consolida las competencias de desarrollo móvil y computación en la nube.'
      },
      {
        id: 3,
        pregunta: '¿Qué destreza analítica básica se requiere prioritariamente para esta carrera técnica?',
        opciones: [
          'Razonamiento lógico-matemático y descomposición de problemas.',
          'Conocimiento de aranceles y aduanas internacionales.',
          'Protocolos de aparatología estética.'
        ],
        correcta: 'a',
        explicacion: 'La abstracción algorítmica y el pensamiento estructurado son la base formativa del programador.'
      },
      {
        id: 4,
        pregunta: '¿Qué tecnología se aprende en el Módulo IV de la carrera técnica?',
        opciones: [
          'Bases de datos relacionales, lenguaje SQL y seguridad de datos.',
          'Clasificación arancelaria de mercancías.',
          'Tratamientos faciales con vapor de ozono.'
        ],
        correcta: 'a',
        explicacion: 'En 5° semestre se profundiza en modelado de datos relacionales, consultas estructuradas e integridad transaccional.'
      },
      {
        id: 5,
        pregunta: '¿Cuál de los siguientes es un campo de inserción profesional directo para los egresados de Programación?',
        opciones: [
          'Empresas de desarrollo de software, startups tecnológicas y áreas de TI.',
          'Agencias aduanales marítimas.',
          'Spas y clínicas dermocosméticas.'
        ],
        correcta: 'a',
        explicacion: 'El sector de desarrollo de software y servicios de computación en la nube ofrece alta demanda de técnicos calificados.'
      }
    ]
  },
  {
    id: 'quiz-comercio-oficial',
    especialidad_id: 'comercio',
    titulo: 'Evaluación Formativa de Comercio Internacional y Aduanas',
    descripcion: 'Validación de competencias sobre gestión de importaciones/exportaciones, costos, clasificación arancelaria, procesos aduaneros y tratados.',
    instrucciones: 'Analiza cada escenario de importación/exportación y marca la respuesta acertada. Mínimo 60% aprobatorio.',
    porcentaje_aprobatorio: 60,
    tiempo_limite_min: 15,
    activo: true,
    fecha_actualizacion: '2026-11-03T09:00:00.000Z',
    autor_docente: 'Lic. Claudia Becerril Morales (Presidenta de Academia)',
    preguntas: [
      {
        id: 1,
        pregunta: '¿Qué documento oficial legaliza el tránsito y desaduanamiento de mercancías en México?',
        opciones: ['Pedimento Aduanal', 'Carta de recomendación escolar', 'Credencial de elector'],
        correcta: 'a',
        explicacion: 'El Pedimento Aduanal es la declaración fiscal y legal obligatoria ante la Agencia Nacional de Aduanas de México (ANAM).'
      },
      {
        id: 2,
        pregunta: '¿Para qué sirven los Incoterms en el comercio mundial?',
        opciones: ['Calcular el promedio escolar', 'Determinar costos, riesgos y obligaciones entre comprador y vendedor', 'Escribir código de software'],
        correcta: 'b',
        explicacion: 'Los Incoterms (ICC) estandarizan internacionalmente la entrega de mercancías y delimitación de riesgos.'
      },
      {
        id: 3,
        pregunta: '¿En qué consiste el cubicaje en la logística?',
        opciones: ['Maximizar el aprovechamiento de espacio en contenedores', 'Pintar contenedores de colores', 'Calcular el aguinaldo'],
        correcta: 'a',
        explicacion: 'El cubicaje optimiza la distribución volumétrica y peso para reducir fletes marítimos y terrestres.'
      },
      {
        id: 4,
        pregunta: '¿Cuál es el tratado comercial clave de México con América del Norte?',
        opciones: ['Pacto Andino', 'T-MEC', 'Tratado de Kioto'],
        correcta: 'b',
        explicacion: 'El T-MEC es el pilar de intercambio comercial y cadenas de suministro entre México, Estados Unidos y Canadá.'
      },
      {
        id: 5,
        pregunta: '¿Cuáles son los principales puestos de trabajo de un egresado en Comercio Internacional y Aduanas?',
        opciones: ['Auxiliar de aduanas, comercio exterior, logística internacional, tráfico o clasificación arancelaria', 'Laboratorios clínicos únicamente', 'Salones de manicura'],
        correcta: 'a',
        explicacion: 'El egresado se desempeña como auxiliar de aduanas, comercio exterior, logística internacional, tráfico o embarques y clasificación arancelaria.'
      }
    ]
  },
  {
    id: 'quiz-rrhh-oficial',
    especialidad_id: 'rrhh',
    titulo: 'Evaluación Formativa de Administración de Recursos Humanos',
    descripcion: 'Comprensión de normas laborales LFT, NOM-035, nómina, reclutamiento y bienestar organizacional.',
    instrucciones: 'Responde de acuerdo a las directrices de la gestión del talento humano. Se requiere 60% para acreditar.',
    porcentaje_aprobatorio: 60,
    tiempo_limite_min: 15,
    activo: true,
    fecha_actualizacion: '2026-11-03T09:00:00.000Z',
    autor_docente: 'Mtra. Patricia Mendoza Garduño (Presidenta de Academia)',
    preguntas: [
      {
        id: 1,
        pregunta: '¿Qué ley en México regula las relaciones laborales y los derechos mínimos de los trabajadores?',
        opciones: ['Ley Federal del Trabajo (LFT)', 'Código Penal Federal', 'Ley de Tránsito'],
        correcta: 'a',
        explicacion: 'La LFT establece la jornada legal, salario, aguinaldo, vacaciones dignas y seguridad social.'
      },
      {
        id: 2,
        pregunta: '¿Cuál es el objetivo primordial de la NOM-035-STPS en las empresas?',
        opciones: ['Identificar, prevenir y mitigar factores de riesgo psicosocial en el trabajo', 'Prohibir el uso de uniformes', 'Aumentar las horas extras obligatorias'],
        correcta: 'a',
        explicacion: 'La NOM-035 promueve un entorno organizacional favorable y previene estrés crónico o acoso laboral.'
      },
      {
        id: 3,
        pregunta: '¿Qué fase inicial del proceso de reclutamiento define el perfil del puesto deseado?',
        opciones: ['Análisis y descripción de puestos', 'Firma de renuncia previa', 'Despido injustificado'],
        correcta: 'a',
        explicacion: 'El análisis de puestos detalla competencias, responsabilidades y requisitos del colaborador idóneo.'
      },
      {
        id: 4,
        pregunta: '¿Qué deducciones obligatorias por ley se reflejan comúnmente en un recibo de nómina?',
        opciones: ['IMSS e ISR', 'Préstamo entre amigos', 'Cuota de graduación'],
        correcta: 'a',
        explicacion: 'Las retenciones oficiales obligatorias son el Impuesto Sobre la Renta (SAT) y cuotas obreras de seguridad social (IMSS).'
      },
      {
        id: 5,
        pregunta: '¿En qué áreas se desempeñan los técnicos en Recursos Humanos?',
        opciones: ['Departamentos de Talento Humano, Reclutamiento, Capacitación y Nómina', 'Cabinas de belleza exclusivamente', 'Muelle de carga marítima'],
        correcta: 'a',
        explicacion: 'Gestionan el personal en empresas corporativas, fábricas, organismos de gobierno y consultorías de RH.'
      }
    ]
  },
  {
    id: 'quiz-cosmetologia-oficial',
    especialidad_id: 'cosmetologia',
    titulo: 'Test Diagnóstico de Intereses, Actitudes y Perfil Vocacional · Cosmetología',
    descripcion: '17 reactivos (16 puntuables + 1 reactivo logístico de disponibilidad de modelos sin puntaje) distribuidos en 5 bloques vocacionales.',
    instrucciones: 'Lee cada pregunta y selecciona la respuesta que mejor represente tu opinión, conocimiento o disponibilidad. Es diagnóstico y de orientación vocacional.',
    porcentaje_aprobatorio: 56,
    tiempo_limite_min: 15,
    activo: true,
    fecha_actualizacion: '2026-11-17T09:00:00.000Z',
    autor_docente: 'Cosmiatra Rosa Isela Romero Vargas (Jefa de Academia)',
    preguntas: COSMETOLOGIA_DIAGNOSTICO_REACTIVOS
  }
];
