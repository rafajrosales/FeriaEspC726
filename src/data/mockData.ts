import { SpecialtyInfo, Estudiante, EvaluacionVocacional, ProgresoVirtual, AsistenciaPresencial, FichaAcademiaReq, OficioCircular } from '../types';

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
      descripcion: 'Recorrido por el Laboratorio de Cómputo 3, demostración de arquitectura de software y testimonios de egresados que hoy laboran en empresas tecnológicas.'
    },
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
    nombre: 'Técnico en Comercio Internacional',
    titulo_corto: 'Comercio Internacional',
    area: 'Ciencias Económico-Administrativas y Logística Global',
    color_acento: '#047857',
    color_badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icono: 'Globe2',
    resumen_ejecutivo: 'Capacita a técnicos expertos en la gestión de cadenas logísticas globales, despacho y clasificación arancelaria en aduanas mexicanas, regulación de importaciones y exportaciones e interpretación de tratados comerciales internacionales (T-MEC).',
    perfil_ingreso: [
      'Gusto por la geografía económica, monedas y logística internacional.',
      'Habilidad negociadora y capacidad organizativa en flujos de suministros.',
      'Curiosidad por tratados comerciales y regulaciones aduaneras.'
    ],
    perfil_egreso: [
      'Elaboración e integración de pedimentos aduanales y documentación comercial.',
      'Aplicación de Incoterms 2020-2026 y cálculo de impuestos arancelarios.',
      'Supervisión de cadenas de frío, transporte multimodal y almacenamiento logístico.'
    ],
    campo_laboral: [
      'Agencias aduanales en aeropuertos, puertos marítimos y fronteras.',
      'Empresas de logística internacional, paquetería global y transporte multimodal.',
      'Departamentos de importación/exportación de maquiladoras e industrias mexicanas.'
    ],
    submodulos: [
      { semestre: '2° Semestre', nombre: 'Módulo I: Fundamentos del comercio exterior y aduanas', competencia: 'Identifica la estructura del sistema aduanero mexicano y marco legal.' },
      { semestre: '3° Semestre', nombre: 'Módulo II: Clasificación arancelaria y tratados', competencia: 'Aplica la tarifa de los impuestos generales de importación y exportación (TIGIE).' },
      { semestre: '4° Semestre', nombre: 'Módulo III: Logística y transporte multimodal', competencia: 'Coordina rutas terrestres, marítimas, ferroviarias y aéreas con Incoterms.' },
      { semestre: '5° Semestre', nombre: 'Módulo IV: Despacho aduanal y pedimento digital', competencia: 'Genera pedimentos y valida documentación complementaria ante SAT/ANAM.' },
      { semestre: '6° Semestre', nombre: 'Módulo V: Plan de negocios y proyectos de exportación', competencia: 'Estructura planes estratégicos para posicionar productos mexicanos en el extranjero.' }
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
        alumnos: 'Academia de Comercio Internacional',
        semestre: '4° Semestre',
        descripcion: 'Guía paso a paso para artesanos del Valle de México sobre cómo exportar a Estados Unidos bajo facilidades del T-MEC.',
        impacto: 'Distribuido a 45 talleres cooperativos locales.'
      }
    ],
    video_demo: {
      titulo: 'De Cuautepec para el Mundo: Logística y Aduanas 2026',
      duracion: '3:10 min',
      presentador: 'Lic. Claudia Becerril (Presidenta de Academia de Comercio)',
      descripcion: 'Explicación didáctica sobre cómo viaja un producto desde una fábrica hasta el otro lado del mundo pasando por aduanas y verificación fiscal.'
    },
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
        pregunta: '¿Dónde puede desempeñarse profesionalmente un egresado de Comercio Internacional?',
        opciones: [
          'Agencias aduanales, terminales de carga aérea/marítima y empresas exportadoras.',
          'Únicamente en salones de belleza.',
          'Instalando cableado eléctrico en hogares.'
        ],
        respuesta_correcta: 0,
        explicacion: 'Tienen amplia inserción en agencias aduanales, terminales intermodales y aduanas del país.'
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
      descripcion: 'Recorrido por las dinámicas de entrevista, resolución de dilemas éticos y cálculo de nómina en laboratorios administrativos.'
    },
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
    resumen_ejecutivo: 'Especialidad formativa en el diagnóstico integral del órgano cutáneo, técnicas de cabina facial y corporal, química cosmética aplicada, formulación botánica natural y protocolos de bioseguridad bajo estándares sanitarios de COFEPRIS.',
    perfil_ingreso: [
      'Interés por las ciencias biológicas, dermatología preventiva y cuidado de la salud.',
      'Destreza manual fina, pulcritud, higiene y sensibilidad estética.',
      'Vocación de servicio al cliente y empatía con el bienestar de las personas.'
    ],
    perfil_egreso: [
      'Identificación precisa de biotipos (graso, seco, mixto, sensible) y fototipos cutáneos.',
      'Aplicación de protocolos de higiene profunda, drenaje linfático y tratamientos antiedad.',
      'Formulación y preparación de insumos dermocosméticos seguros con ingredientes botánicos.',
      'Manejo de aparatología estética básica y normatividad de bioseguridad sanitaria.'
    ],
    campo_laboral: [
      'Clínicas de dermatología estética y cabinas de bienestar integral.',
      'Spas turísticos, centros de rejuvenecimiento y estética médica.',
      'Emprendimiento de marcas de cosmética natural y dermoconsejería profesional.'
    ],
    submodulos: [
      { semestre: '2° Semestre', nombre: 'Módulo I: Anatomía de la piel y bioseguridad en cabina', competencia: 'Reconoce la histología cutánea, anexos de la piel y esterilización.' },
      { semestre: '3° Semestre', nombre: 'Módulo II: Diagnóstico de biotipos y tratamientos faciales', competencia: 'Ejecuta limpieza facial profunda, exfoliaciones y mascarillas personalizadas.' },
      { semestre: '4° Semestre', nombre: 'Módulo III: Técnicas corporales y drenaje manual', competencia: 'Aplica maniobras de masaje relajante, drenaje linfático y modelado.' },
      { semestre: '5° Semestre', nombre: 'Módulo IV: Química cosmética y formulación natural', competencia: 'Elabora tónicos, emulsiones y sérums con principios activos vegetales.' },
      { semestre: '6° Semestre', nombre: 'Módulo V: Cosmiatría avanzada y gestión de cabina spa', competencia: 'Administra protocolos de cabina con aparatología y mercadotecnia de bienestar.' }
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
      titulo: 'Ciencia, Salud y Belleza: La Cabina Cosmetológica del CETis 7',
      duracion: '3:05 min',
      presentador: 'Cosmiatra Lic. Rosa Isela Romero (Titular de Cosmetología)',
      descripcion: 'Demostración de lámpara de Wood, análisis dérmico de poros, bioseguridad con autoclave y preparación de activos naturales.'
    },
    preguntas_quiz: [
      {
        id: 1,
        pregunta: '¿Cuál es el pH fisiológico promedio de una piel sana en el rostro humano?',
        opciones: ['pH ácido cercano a 5.5', 'pH extremadamente alcalino de 11.0', 'pH neutro idéntico al agua de 7.0'],
        respuesta_correcta: 0,
        explicacion: 'El manto hidrolipídico mantiene un pH ligeramente ácido (4.5 a 5.5) para protegernos contra patógenos.'
      },
      {
        id: 2,
        pregunta: '¿Cuáles son los cuatro biotipos cutáneos fundamentales estudiados en el diagnóstico facial?',
        opciones: [
          'Piel Normal (eutérmica), Grasa (seborreica), Seca (alípica) y Mixta.',
          'Piel Metálica, Plástica, Cerámica y Fibrosa.',
          'Piel Tipo A, Tipo B, Tipo C y Tipo D.'
        ],
        respuesta_correcta: 0,
        explicacion: 'El diagnóstico certero de estos 4 biotipos determina el tratamiento y productos adecuados.'
      },
      {
        id: 3,
        pregunta: '¿Qué instrumento óptico de cabina utiliza luz ultravioleta filtrada para observar la hidratación y manchas no visibles a simple vista?',
        opciones: ['Lámpara de Wood', 'Microscopio de electrones', 'Telescopio reflector'],
        respuesta_correcta: 0,
        explicacion: 'La lámpara de Wood revela fluorescencias características de deshidratación, exceso de sebo o pigmentaciones profundas.'
      },
      {
        id: 4,
        pregunta: '¿Cuál es la diferencia medular entre la cosmiatría y la cosmetología convencional?',
        opciones: [
          'La cosmiatría profundiza en el conocimiento científico de la piel sana y con alteraciones leves bajo respaldo dermatológico.',
          'La cosmiatría no requiere ninguna medida de higiene.',
          'Son sinónimos exactos sin ninguna diferencia técnica.'
        ],
        respuesta_correcta: 0,
        explicacion: 'La formación técnica cosmiátrica dota al alumno de bases científicas sólidas en anatomía, bioquímica y aparatología.'
      },
      {
        id: 5,
        pregunta: '¿Qué organismo sanitario en México regula las condiciones de higiene y productos en establecimientos cosmetológicos?',
        opciones: ['COFEPRIS (Comisión Federal para la Protección contra Riesgos Sanitarios)', 'FIFA', 'NASA'],
        respuesta_correcta: 0,
        explicacion: 'COFEPRIS y la Secretaría de Salud vigilan las normas sanitarias de insumos y cabinas.'
      }
    ],
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
    nombre_especialidad: 'Técnico en Comercio Internacional',
    presidente_academia: 'Lic. Claudia Becerril Morales',
    integrantes_academia: [
      'Lic. Fernando Reyes Arredondo',
      'Mtro. Jorge Luis Santillán',
      'Lic. Ana María Padrón'
    ],
    fecha_entrega: '2026-11-15',
    resumen_ejecutivo: 'Capacita a técnicos expertos en la gestión de cadenas logísticas globales, despacho y clasificación arancelaria en aduanas mexicanas, regulación de importaciones y exportaciones e interpretación de tratados comerciales internacionales.',
    recursos_multimedia: {
      video_url_o_estado: 'Video promocional 3:10 min filmado con réplicas aduanales e infografías de puertos marítimos.',
      infografia_formato: 'Póster infográfico digital con flujo del pedimento aduanal e Incoterms 2026.',
      proyectos_registrados: [
        'Ruta de Exportación: Miel de Agave a la Unión Europea',
        'Simulador Digital de Cubicaje de Contenedores 40ft',
        'Manual de Cumplimiento Arancelario para PYMES'
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
        pregunta: '¿Dónde labora un egresado técnico de Comercio Internacional?',
        opciones: ['Agencias aduanales, terminales marítimas y empresas exportadoras', 'Laboratorios clínicos únicamente', 'Salones de manicura'],
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
    resumen_ejecutivo: 'Especialidad formativa en el diagnóstico integral del órgano cutáneo, técnicas de cabina facial y corporal, química cosmética aplicada, formulación botánica natural y protocolos de bioseguridad bajo estándares sanitarios de COFEPRIS.',
    recursos_multimedia: {
      video_url_o_estado: 'Video 3:05 min grabado en cabina didáctica mostrando bioseguridad, lupa con luz LED y principios activos.',
      infografia_formato: 'Infografía mural en alta definición sobre biotipos y fototipos de piel de Fitzpatrick.',
      proyectos_registrados: [
        'Línea Dermocosmética Botánica Xochitl-Lerdo',
        'Protocolo de Drenaje Linfático Manual',
        'Atlas Interactivo de Biotipos y Lesiones Dérmicas'
      ]
    },
    banco_reactivos: [
      {
        pregunta: '¿Cuál es el valor fisiológico promedio del pH en un cutis facial saludable?',
        opciones: ['pH ligeramente ácido de 4.5 a 5.5', 'pH neutro de 7.0 exacto', 'pH alcalino de 10.0'],
        correcta: 'a'
      },
      {
        pregunta: '¿Cuáles son los 4 biotipos cutáneos fundamentales para el diagnóstico facial?',
        opciones: ['Eutérmica (Normal), Seborreica (Grasa), Alípica (Seca) y Mixta', 'Piel 1, 2, 3 y 4', 'Áspera, Lisa, Dura y Blanda'],
        correcta: 'a'
      },
      {
        pregunta: '¿Qué lámpara con luz ultravioleta permite analizar deshidratación y pigmentaciones en cabina?',
        opciones: ['Lámpara de Wood', 'Lámpara de Halógeno', 'Foco incandescente ordinario'],
        correcta: 'a'
      },
      {
        pregunta: '¿En qué se distingue la Cosmiatría de la cosmetología empírica?',
        opciones: ['Bases científicas de histología, química cosmética y protocolos sanitarios', 'En nada, son exactamente lo mismo', 'En que no usa cosméticos'],
        correcta: 'a'
      },
      {
        pregunta: '¿Qué autoridad sanitaria en México certifica y vigila los establecimientos y productos cosméticos?',
        opciones: ['COFEPRIS (Secretaría de Salud)', 'PROFECO únicamente', 'SECTUR'],
        correcta: 'a'
      }
    ],
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
    '1. ETAPA VIRTUAL (70%): Los alumnos deberán registrarse con su Número de Control en la plataforma oficial, completar la Evaluación Diagnóstica Dual (Aptitudes vs. Intereses), explorar los contenidos de las cuatro carreras (Programación, Comercio Internacional, Recursos Humanos y Cosmetología) y aprobar los cuestionarios de comprensión. Al concluir, el sistema emitirá el Pase Digital QR y Clave Única Token.',
    '2. ETAPA PRESENCIAL (30%): Presentándose en las instalaciones del plantel, el alumno validará su Pase Digital QR en el filtro de acceso y participará en el Rally de Retos Lúdicos Integradores en los talleres y laboratorios asignados.',
    '3. ACREDITACIÓN FINAL: Una vez selladas las estaciones presenciales, la Subdirección Académica y la Coordinación de Tutorías emitirán la Cédula Oficial de Acreditación Integral 100%, requisito indispensable para el registro definitivo de carrera técnica.',
    'Se instruye a las Academias de Especialidad y al personal docente a brindar todas las facilidades didácticas requeridas conforme a la ficha técnica estandarizada.'
  ],
  firmante_nombre: 'Mtro. José Luis Rodríguez Arredondo',
  firmante_cargo: 'Subdirector Académico del CETis No. 7 "Miguel Lerdo de Tejada"',
  sello_oficial: 'CETIS 007 - SUBDIRECCIÓN ACADÉMICA - DGETI CDMX'
};
