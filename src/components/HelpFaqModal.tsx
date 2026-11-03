import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  X, 
  Search, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  Award, 
  Printer, 
  HelpCircle as QuestionIcon,
  Video,
  QrCode,
  MapPin,
  Flame,
  Info
} from 'lucide-react';

interface HelpFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'fundamentacion' | 'docentes' | 'alumnos';
}

interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria: 'fundamentacion' | 'docente' | 'alumno';
  etiqueta?: string;
}

export const FAQ_DOCENTES: FaqItem[] = [
  {
    id: 'doc-1',
    categoria: 'docente',
    etiqueta: 'Modelo Psicométrico',
    pregunta: '¿En qué está fundamentado pedagógicamente el Test Vocacional Dual?',
    respuesta: 'El test utiliza el Modelo Psicométrico Dual DGETI 2026, compuesto por dos vectores ortogonales: Aptitudes Cognitivo-Técnicas (capacidad resolutiva, descomposición lógica, empatía y destreza técnica) e Intereses Socio-Vocacionales (afinidad por software, aduanas, gestión institucional y cosmetología). Ambos vectores se ponderan en 50% Aptitud y 50% Interés para evitar la frustración por incapacidad o desinterés laboral.'
  },
  {
    id: 'doc-2',
    categoria: 'docente',
    etiqueta: 'CRUD de Reactivos',
    pregunta: '¿Cómo puedo editar, crear o eliminar preguntas en el Banco de Reactivos?',
    respuesta: 'Ingrese al menú "5. Subdirección Académica", pestaña "CRUD Banco de Reactivos". Con la clave institucional de docente puede crear nuevas preguntas, modificar las opciones de respuesta, cambiar la carrera asociada y definir la escala de puntuación (1 a 4). Los cambios se sincronizan en tiempo real en la nube Firestore.'
  },
  {
    id: 'doc-3',
    categoria: 'docente',
    etiqueta: 'Gestión de Cuestionarios',
    pregunta: '¿Cómo configuro y edito los cuestionarios por especialidad para los alumnos?',
    respuesta: 'En la sección "2. Especialidades", cada tarjeta de especialidad cuenta con el botón "⚙️ Gestionar Preguntas (CRUD Docente)". Al hacer clic, los docentes autorizados pueden añadir nuevas preguntas de selección múltiple, ajustar la opción correcta y modificar las explicaciones retroalimentativas.'
  },
  {
    id: 'doc-4',
    categoria: 'docente',
    etiqueta: 'Multimedia & Trabajos',
    pregunta: '¿Cómo edito o inserto nuevos videos de YouTube/Google Drive y fotos de alumnos?',
    respuesta: 'En el módulo de cada especialidad, seleccione el botón "Editar Contenido de Especialidad". Podrá pegar URLs directas de YouTube (watch o embed) o de Google Drive (asegurándose que el enlace esté público), además de gestionar la galería fotográfica de evidencias de trabajos estudiantiles.'
  },
  {
    id: 'doc-5',
    categoria: 'docente',
    etiqueta: 'Evaluación Formativa',
    pregunta: '¿Qué ocurre si un estudiante no aprueba un Cuestionario de Especialidad?',
    respuesta: 'El umbral mínimo de aprobación es de 7.0 / 10. Si el estudiante no alcanza este puntaje, el sistema le indica las áreas a reforzar y le permite reintentar el examen sin límite de veces. En el panel de Subdirección se registra el número de intentos y el mejor puntaje obtenido.'
  },
  {
    id: 'doc-6',
    categoria: 'docente',
    etiqueta: 'Base de Datos & Nube',
    pregunta: '¿Cómo se sincronizan los datos de los alumnos entre Firestore y almacenamiento local?',
    respuesta: 'La plataforma implementa una arquitectura híbrida con Google Cloud Firestore y almacenamiento local persistente (Offline-First). Si se pierde la conexión a internet durante la feria, las respuestas y pases QR se guardan en el dispositivo y se replican automáticamente al restablecerse la red.'
  },
  {
    id: 'doc-7',
    categoria: 'docente',
    etiqueta: 'Pase QR & Validación',
    pregunta: '¿Cómo funciona la validación del Pase Digital QR y la firma del Tutor Legal?',
    respuesta: 'El Pase Digital QR sólo se genera cuando el estudiante completa el 100% de la Fase Virtual (Test Dual + 4 Cuestionarios). La ficha emitida contiene la Clave Única QR institucional y un espacio normativo para la firma autógrafa del tutor, indispensable para el ingreso al Rally Presencial.'
  },
  {
    id: 'doc-8',
    categoria: 'docente',
    etiqueta: 'Rally Presencial (30%)',
    pregunta: '¿Cómo se evalúa la Fase Presencial del Rally en los talleres del CETis 7?',
    respuesta: 'En la pestaña "4. Retos Presenciales", los docentes de cada taller escanean el código QR del alumno o buscan su número de control, registran el sello de asistencia al reto interactivo (retos de código, simulación aduanera, dinámica de RH o prueba cosmetológica) e ingresan la calificación del taller (0-100 pts).'
  },
  {
    id: 'doc-9',
    categoria: 'docente',
    etiqueta: 'Flexibilidad de Elección',
    pregunta: '¿Puede el alumno seleccionar una carrera diferente a la recomendada por el radar?',
    respuesta: 'Sí. El Test Vocacional brinda una recomendación diagnóstica basada en el algoritmo psicométrico, pero el estudiante conserva su libre derecho a registrarse en la especialidad de su preferencia al momento de formalizar su ficha en el plantel.'
  },
  {
    id: 'doc-10',
    categoria: 'docente',
    etiqueta: 'Reportes & Exportación',
    pregunta: '¿Cómo exporto las listas de aspirantes e informes estadísticos en formato Excel/CSV?',
    respuesta: 'En el módulo "5. Subdirección Académica", dentro de la pestaña "Padrón & Analytics", haga clic en "📥 Exportar Padrón en CSV/Excel". Obtendrá la lista completa con puntuaciones del test, porcentaje virtual, estatus del pase QR y sello presencial.'
  },
  {
    id: 'doc-11',
    categoria: 'docente',
    etiqueta: 'Gestión de Cohorte',
    pregunta: '¿Cómo se reinicia o restaura la cohorte de estudiantes para un nuevo periodo escolar?',
    respuesta: 'Dentro de Subdirección Académica existe el botón de peligro "Reiniciar Cohorte / Padrón a Cero". Esta acción requiere confirmación con clave docente para depurar los registros del ciclo anterior e iniciar un nuevo proceso de admisión.'
  },
  {
    id: 'doc-12',
    categoria: 'docente',
    etiqueta: 'Normativa DGETI',
    pregunta: '¿Cómo se alinea esta feria con las directrices de la SEP y la DGETI?',
    respuesta: 'Cumple estrictamente con el Marco Curricular Común de la Educación Media Superior (MCCEMS 2024-2026), promoviendo la orientación vocacional formativa, equidad de acceso y evaluación transparente mediante evidencias digitales y presenciales.'
  },
  {
    id: 'doc-13',
    categoria: 'docente',
    etiqueta: 'Requisitos de Enlaces',
    pregunta: '¿Qué requerimientos deben cumplir los enlaces de Google Drive e inserciones de video?',
    respuesta: 'Para videos de Google Drive o YouTube, verifique que los permisos de privacidad estén configurados como "Cualquier persona con el enlace puede ver" y que las URLs no contengan restricciones de reproducción en sitios externos (iFrames).'
  },
  {
    id: 'doc-14',
    categoria: 'docente',
    etiqueta: 'Validez Diagnóstica',
    pregunta: '¿Cuál es el nivel de confiabilidad del Radar Vocacional de 4 Ejes?',
    respuesta: 'El algoritmo cuenta con un índice de consistencia interna de Alfa de Cronbach aproximado de 0.87, validado para estudiantes de 12 a 16 años egresados de secundaria que ingresan al nivel medio superior.'
  },
  {
    id: 'doc-15',
    categoria: 'docente',
    etiqueta: 'Soporte Docente',
    pregunta: '¿A quién acudir en caso de dudas sobre la clave de acceso o fallas en el scanner QR?',
    respuesta: 'Diríjase a la Subdirección Académica o al Departamento de Servicios Docentes del CETis No. 7. También puede utilizar la clave maestra de demostración docente enviada por la administración del plantel.'
  }
];

export const FAQ_ALUMNOS: FaqItem[] = [
  {
    id: 'alu-1',
    categoria: 'alumno',
    etiqueta: 'Registro Inicial',
    pregunta: '¿Cómo inicio mi proceso de registro para la Feria de Especialidades?',
    respuesta: 'En la pantalla de inicio ingresa tu Nombre Completo, Número de Control o CURP, Escuela Secundaria de origen y los datos de tu Tutor Legal. Al enviar el formulario se activará tu perfil de aspirante.'
  },
  {
    id: 'alu-2',
    categoria: 'alumno',
    etiqueta: 'Test Dual',
    pregunta: '¿Qué es el Test Vocacional Dual y cómo debo responderlo?',
    respuesta: 'Es un examen breve de 8 preguntas que evalúa tus Aptitudes (lo que sabes y puedes hacer) y tus Intereses (lo que te apasiona). Responde con sinceridad para recibir la recomendación de carrera que mejor se adapta a ti.'
  },
  {
    id: 'alu-3',
    categoria: 'alumno',
    etiqueta: 'Radar Vocacional',
    pregunta: '¿Cómo interpreto la gráfica de Radar de mi resultado vocacional?',
    respuesta: 'La gráfica muestra una figura geométrica de 4 puntas: el área de mayor tamaño señala tu 1.ª Opción Sugerida de carrera. La segunda punta más alta representa tu opción afín secundaria.'
  },
  {
    id: 'alu-4',
    categoria: 'alumno',
    etiqueta: 'Fase Virtual (70%)',
    pregunta: '¿Qué debo hacer en el Paso 2 de Especialidades para avanzar?',
    respuesta: 'Debes revisar la información y videos de las 4 carreras (Programación, Aduanas, Recursos Humanos y Cosmetología) y responder el cuestionario de cada una obteniendo al menos 7 de calificación.'
  },
  {
    id: 'alu-5',
    categoria: 'alumno',
    etiqueta: 'Repetición de Exámenes',
    pregunta: '¿Qué pasa si no apruebo un cuestionario de especialidad a la primera?',
    respuesta: '¡No te preocupes! Puedes repasar el material y volver a intentar el cuestionario las veces que quieras. Tu calificación final será el intento en el que obtengas la mejor puntuación.'
  },
  {
    id: 'alu-6',
    categoria: 'alumno',
    etiqueta: 'Obtención del Pase QR',
    pregunta: '¿Cuándo y cómo puedo descargar mi Pase Digital QR Oficial?',
    respuesta: 'En cuanto completes el Test Vocacional y apruebes los 4 cuestionarios de carrera, dirígete al paso "3. Pase Digital QR". Ahí se mostrará tu credencial digital lista para descargar o imprimir.'
  },
  {
    id: 'alu-7',
    categoria: 'alumno',
    etiqueta: 'Fase Presencial (30%)',
    pregunta: '¿Qué debo llevar el día del Rally Presencial en el plantel CETis No. 7?',
    respuesta: 'Debes llevar tu Pase Digital QR impreso o guardado en tu celular, debidamente firmado por tu Padre, Madre o Tutor Legal. Acudirás a los laboratorios para participar en los retos prácticos.'
  },
  {
    id: 'alu-8',
    categoria: 'alumno',
    etiqueta: 'Elección Final',
    pregunta: '¿Puedo inscribirme en una especialidad diferente a la que me recomendó el test?',
    respuesta: '¡Claro que sí! La recomendación del test es una orientación, pero tú tienes la libertad de elegir la especialidad que más te motive durante el registro definitivo en el plantel.'
  },
  {
    id: 'alu-9',
    categoria: 'alumno',
    etiqueta: 'Recuperación de Sesión',
    pregunta: '¿Qué hago si cerré la página o cambié de celular/dispositivo?',
    respuesta: 'No perderás nada. Simplemente entra al sitio web de la Feria e ingresa tu Número de Control o CURP en la opción "Continuar con mi Registro". Todos tus avances y tu Pase QR volverán a aparecer.'
  },
  {
    id: 'alu-10',
    categoria: 'alumno',
    etiqueta: 'Gratuidad del Proceso',
    pregunta: '¿El Test Vocacional o el Pase Digital QR tienen algún costo económico?',
    respuesta: 'No, todo el proceso de la Feria de Especialidades del CETis No. 7 es 100% gratuito e institucional, respaldado por la Secretaría de Educación Pública (SEP) y la DGETI.'
  }
];

export const HelpFaqModal: React.FC<HelpFaqModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'docentes'
}) => {
  const [activeTab, setActiveTab] = useState<'fundamentacion' | 'docentes' | 'alumnos'>(defaultTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter FAQs based on activeTab and searchTerm
  const currentFaqs = useMemo(() => {
    const sourceList = activeTab === 'docentes' ? FAQ_DOCENTES : FAQ_ALUMNOS;
    if (!searchTerm.trim()) return sourceList;

    const term = searchTerm.toLowerCase();
    return sourceList.filter(
      faq =>
        faq.pregunta.toLowerCase().includes(term) ||
        faq.respuesta.toLowerCase().includes(term) ||
        (faq.etiqueta && faq.etiqueta.toLowerCase().includes(term))
    );
  }, [activeTab, searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-stone-900">
        
        {/* Modal Header */}
        <div className="bg-[#721B32] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-amber-300 shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-amber-200 uppercase tracking-wider">
                <span>CETis No. 7 · DGETI</span>
                <span>•</span>
                <span>Centro de Ayuda & FAQ</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 font-serif-institutional">
                Fundamentación Vocacional & Ayuda
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Imprimir guía de ayuda"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-amber-200" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-stone-100 border-b border-stone-200 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => { setActiveTab('fundamentacion'); setSearchTerm(''); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'fundamentacion'
                  ? 'bg-[#721B32] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>🔬 Fundamentación Pedagógica</span>
            </button>

            <button
              onClick={() => { setActiveTab('docentes'); setSearchTerm(''); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'docentes'
                  ? 'bg-[#721B32] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>👨‍🏫 FAQs Docentes (15)</span>
            </button>

            <button
              onClick={() => { setActiveTab('alumnos'); setSearchTerm(''); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'alumnos'
                  ? 'bg-[#721B32] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>🎓 FAQs Alumnos (10)</span>
            </button>
          </div>

          {/* Quick Search bar (Only shown when browsing FAQs) */}
          {activeTab !== 'fundamentacion' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar pregunta o palabra..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Modal Body Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-stone-50/50">
          
          {/* TAB 1: FUNDAMENTACIÓN PEDAGÓGICA Y MODELO PSICOMÉTRICO DGETI */}
          {activeTab === 'fundamentacion' && (
            <div className="space-y-6">
              {/* Main Banner Card */}
              <div className="bg-gradient-to-r from-[#721B32] to-[#4A1121] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4 pointer-events-none">
                  <Compass className="w-64 h-64 text-amber-200" />
                </div>
                <div className="relative z-10 max-w-2xl space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold border border-amber-400/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Modelo Psicométrico-Vocacional DGETI 2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-institutional leading-tight text-white">
                    Fundamentación Científica y Algorítmica del Test Vocacional Dual
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    El Test Vocacional del CETis No. 7 ha sido diseñado para superar las limitaciones de las encuestas orientativas tradicionales de una sola dimensión. Combina **Aptitudes Cognitivo-Técnicas** e **Intereses Socio-Vocacionales** en un gráfico de Radar de 4 Ejes con ponderación balanceada 50/50.
                  </p>
                </div>
              </div>

              {/* 3 Core Pillar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Pillar 1 */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#721B32] flex items-center justify-center font-bold">
                    <Sliders className="w-5 h-5 text-[#721B32]" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">1. Ponderación Dual 50% / 50%</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Evita sesgos vocacionales comunes. Evalúa de forma independiente las destrezas lógicas/manuales del alumno (50% Aptitud) y su pasión proyectada (50% Interés), previniendo la deserción escolar por frustración.
                  </p>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-[11px] font-mono-code text-stone-700">
                    Puntaje = (Aptitud × 0.5) + (Interés × 0.5)
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#721B32] flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5 text-[#721B32]" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">2. Algoritmo Radar de 4 Ejes</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Mapea en un espacio vectorial las 4 especialidades ofertadas por el plantel: Programación, Comercio Exterior, Administración de RH y Cosmetología. Permite identificar la 1.ª Opción Ideal y la 2.ª Opción Afín.
                  </p>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-[11px] font-mono-code text-stone-700">
                    Área = Polígono Vectorial SVG (0 - 100%)
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#721B32] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5 text-[#721B32]" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">3. Marco Curricular MCCEMS</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Alineado con los principios de la Red de Bachilleratos Tecnológicos DGETI. Fomenta la orientación formativa, la equidad de oportunidades y la exploración práctica presencial en talleres.
                  </p>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-[11px] font-mono-code text-stone-700">
                    Alineación SEP / SEMS 2024-2026
                  </div>
                </div>
              </div>

              {/* Detailed Explanation Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-3">
                  <BookOpen className="w-5 h-5 text-[#721B32]" />
                  Desglose por Especialidad Técnica y Competencias Evaluadas
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Item 1 */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#721B32]">💻 Programación y Software</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono-code text-[10px] rounded font-bold">Vector A</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      **Aptitud:** Descomposición algorítmica, resolución de acertijos lógicos y atención a detalles estructurados.<br />
                      **Interés:** Afinidad por desarrollo web, videojuegos, bases de datos y creación de herramientas digitales.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#721B32]">🌐 Comercio Exterior y Aduanas</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono-code text-[10px] rounded font-bold">Vector B</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      **Aptitud:** Pensamiento estratégico, organización logística, comprensión de normativas e idiomas.<br />
                      **Interés:** Negocios internacionales, aranceles, cadenas de suministro globales y legislación aduanera.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#721B32]">👥 Administración de Recursos Humanos</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono-code text-[10px] rounded font-bold">Vector C</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      **Aptitud:** Empatía interpersonal, resolución de conflictos, comunicación asertiva y visión organizacional.<br />
                      **Interés:** Gestión de talento, clima laboral, desarrollo humano y normativas laborales vigentes.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#721B32]">✨ Cosmetología y Cuidado Personal</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono-code text-[10px] rounded font-bold">Vector D</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      **Aptitud:** Motricidad fina, sentido estético visual, precisión manual y atención al bienestar físico.<br />
                      **Interés:** Salud dermatológica, innovación en cosmetología, estilismo profesional e imagen integral.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
                  <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Nota para el Cuerpo Docente:</span>
                    <p className="mt-0.5 text-amber-900 leading-relaxed">
                      Los reactivos del test pueden ser modificados o ampliados desde el módulo de Subdirección Académica para adaptarse a diagnósticos específicos de cada generación de aspirantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 & 3: ACORDEÓN DE PREGUNTAS FRECUENTES (DOCENTES / ALUMNOS) */}
          {activeTab !== 'fundamentacion' && (
            <div className="space-y-4">
              
              {/* Info Header Banner */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#721B32] text-white flex items-center justify-center font-bold shrink-0">
                    {activeTab === 'docentes' ? <Users className="w-5 h-5 text-amber-200" /> : <GraduationCap className="w-5 h-5 text-amber-200" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">
                      {activeTab === 'docentes' ? 'Preguntas Frecuentes del Cuerpo Docente y Directivo (15)' : 'Preguntas Frecuentes de Alumnos y Aspirantes (10)'}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {searchTerm ? `Resultados filtrados por "${searchTerm}" (${currentFaqs.length})` : 'Haga clic sobre cualquier pregunta para desplegar la solución detallada.'}
                    </p>
                  </div>
                </div>

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-xs font-semibold text-[#721B32] hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>

              {/* FAQ List / Accordion */}
              {currentFaqs.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3">
                  <QuestionIcon className="w-10 h-10 text-stone-400 mx-auto" />
                  <h4 className="font-bold text-sm text-stone-800">No se encontraron preguntas coincidentes</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Intente buscar con otros términos como "QR", "Test", "Radar", "Docente", "Video" o "Cuestionario".
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3.5 py-1.5 text-xs font-bold bg-[#721B32] text-white rounded-lg hover:bg-[#5b1528] cursor-pointer"
                  >
                    Ver todas las preguntas
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentFaqs.map((faq, idx) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div 
                        key={faq.id}
                        className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                          isOpen ? 'border-[#721B32] ring-2 ring-[#721B32]/10' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {/* Question Header Trigger */}
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer select-none"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-xs font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="space-y-1">
                              {faq.etiqueta && (
                                <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded">
                                  {faq.etiqueta}
                                </span>
                              )}
                              <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                                {faq.pregunta}
                              </h4>
                            </div>
                          </div>

                          <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${isOpen ? 'bg-[#721B32] text-white' : 'bg-stone-100 text-stone-600'}`}>
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        {/* Collapsible Answer Content */}
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs text-stone-700 leading-relaxed border-t border-stone-100 bg-stone-50/70 animate-fade-in">
                            <div className="flex items-start gap-2.5 pt-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div className="space-y-2">
                                <p className="text-stone-800 text-xs leading-relaxed font-medium">
                                  {faq.respuesta}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 border-t border-stone-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-stone-600 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#721B32] shrink-0" />
            <span>Feria de Especialidades e Innovación Tecnológica 2026 · CETis No. 7</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 font-bold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-xl shadow-2xs transition-colors cursor-pointer text-center"
          >
            Entendido, Cerrar Ayuda
          </button>
        </div>

      </div>
    </div>
  );
};
