import React, { useState, useEffect, useMemo } from 'react';
import { ESPECIALIDADES } from '../data/mockData';
import { SpecialtyId, SpecialtyInfo, ProgresoVirtual, ItemGaleriaAlumno } from '../types';
import { parseEmbedMediaUrl } from '../utils/media';
import { SesionUsuario, getFichasAcademia } from '../services/storage';
import { 
  Code2, 
  Globe2, 
  Users2, 
  Sparkles, 
  Play, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  Award,
  Clock,
  MapPin,
  Check,
  Zap,
  MessageSquare,
  Video,
  Image as ImageIcon,
  Film,
  Maximize2,
  X,
  Filter,
  User,
  GraduationCap,
  Lock,
  Edit3,
  ShieldCheck
} from 'lucide-react';
import { COMIC_ASSETS } from '../assets/comicAssets';

interface SpecialtyModulesProps {
  progreso: ProgresoVirtual;
  onUpdateProgreso: (nuevoProgreso: ProgresoVirtual) => void;
  sugeridaId?: SpecialtyId;
  onNavigateToDirection?: () => void;
  sesionActiva?: SesionUsuario | null;
}

export const SpecialtyModules: React.FC<SpecialtyModulesProps> = ({
  progreso,
  onUpdateProgreso,
  sugeridaId,
  onNavigateToDirection,
  sesionActiva
}) => {
  const [selectedId, setSelectedId] = useState<SpecialtyId>(sugeridaId || 'programacion');
  const [activeTab, setActiveTab] = useState<'curricular' | 'video' | 'proyectos' | 'quiz' | 'reto'>('curricular');
  
  // Quiz & Gallery states
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [simulatedVideoPlaying, setSimulatedVideoPlaying] = useState<boolean>(false);
  const [galleryFilter, setGalleryFilter] = useState<'todos' | 'video' | 'foto'>('todos');
  const [activeLightboxItem, setActiveLightboxItem] = useState<ItemGaleriaAlumno | null>(null);

  // Fichas de academia sincronizadas con el Banco de Reactivos (CRUD)
  const [fichas, setFichas] = useState(() => getFichasAcademia());

  useEffect(() => {
    setFichas(getFichasAcademia());
  }, [selectedId, activeTab]);

  const currentSpecialty = ESPECIALIDADES.find(s => s.id === selectedId) || ESPECIALIDADES[0];
  const currentFicha = fichas[selectedId];
  const currentProgress = progreso.progreso_especialidades[selectedId];

  const letraIdxMap: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };

  // Banco de preguntas de evaluación dinámico
  const preguntasQuiz = useMemo(() => {
    if (currentFicha?.banco_reactivos && currentFicha.banco_reactivos.length > 0) {
      return currentFicha.banco_reactivos.map((r, i) => ({
        id: typeof r.id === 'number' ? r.id : (i + 1),
        pregunta: r.pregunta,
        opciones: r.opciones,
        respuesta_correcta: letraIdxMap[r.correcta.toLowerCase()] ?? 0,
        explicacion: r.explicacion || `La opción oficial correcta es la (${r.correcta.toUpperCase()}).`
      }));
    }
    return currentSpecialty.preguntas_quiz;
  }, [currentFicha, currentSpecialty]);

  const handleTabChange = (tab: 'curricular' | 'video' | 'proyectos' | 'quiz' | 'reto') => {
    setActiveTab(tab);
    
    // Automatically flag exploratory progress
    if (tab === 'curricular' && !currentProgress.infografia_explorada) {
      const updated = { ...progreso };
      updated.progreso_especialidades[selectedId].infografia_explorada = true;
      onUpdateProgreso(updated);
    } else if (tab === 'proyectos' && !currentProgress.proyectos_revisados) {
      const updated = { ...progreso };
      updated.progreso_especialidades[selectedId].proyectos_revisados = true;
      onUpdateProgreso(updated);
    }
  };

  const handlePlayVideo = () => {
    setSimulatedVideoPlaying(true);
    setTimeout(() => {
      const updated = { ...progreso };
      updated.progreso_especialidades[selectedId].video_visto = true;
      onUpdateProgreso(updated);
    }, 1500);
  };

  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    if (quizSubmitted && currentProgress.quiz_aprobado) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    if (preguntasQuiz.length === 0) return;
    let correctCount = 0;
    preguntasQuiz.forEach(q => {
      if (quizAnswers[q.id] === q.respuesta_correcta) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / preguntasQuiz.length) * 100);
    const passed = score >= 60; // 60% minimum passing grade

    const updated = { ...progreso };
    updated.progreso_especialidades[selectedId].quiz_aprobado = passed;
    updated.progreso_especialidades[selectedId].calificacion_quiz = score;
    onUpdateProgreso(updated);
    setQuizSubmitted(true);
  };

  const getSpecialtyIcon = (id: SpecialtyId) => {
    switch (id) {
      case 'programacion': return <Code2 className="w-4 h-4" />;
      case 'comercio': return <Globe2 className="w-4 h-4" />;
      case 'rrhh': return <Users2 className="w-4 h-4" />;
      case 'cosmetologia': return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
      {/* 4 Specialties Selector Bar */}
      <div className="p-4 border-b border-stone-200 bg-stone-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Oferta Educativa CETis 7</span>
            <h3 className="text-lg font-bold text-stone-900">Módulos Temáticos de Carrera Técnica</h3>
          </div>
          <div className="text-xs text-stone-600">
            Explora cada especialidad y aprueba sus 5 reactivos para acreditar el 70% virtual
          </div>
        </div>

        {/* Career selection tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ESPECIALIDADES.map(spec => {
            const isSelected = spec.id === selectedId;
            const spProg = progreso.progreso_especialidades[spec.id];
            const isCompleted = spProg.quiz_aprobado && spProg.video_visto && spProg.infografia_explorada;
            const isSuggested = sugeridaId === spec.id;

            return (
              <button
                key={spec.id}
                onClick={() => {
                  setSelectedId(spec.id);
                  setQuizSubmitted(spProg.quiz_aprobado);
                }}
                className={`p-3 rounded-lg text-left transition-all border relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#721B32] shadow-sm'
                    : 'bg-white/60 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-[#721B32] text-white' : 'bg-stone-100 text-stone-600'}`}>
                    {getSpecialtyIcon(spec.id)}
                  </div>
                  {isCompleted ? (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Acreditado
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-500 font-mono-code">
                      {spProg.quiz_aprobado ? 'Quiz ✓' : 'Pendiente'}
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs font-bold text-stone-900 line-clamp-1">{spec.titulo_corto}</div>
                  <div className="text-[11px] text-stone-500 line-clamp-1">{spec.submodulos.length} submódulos</div>
                </div>

                {isSuggested && (
                  <div className="mt-2 text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-center font-medium">
                    ★ Sugerencia Vocacional
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Specialty Content */}
      <div className="p-6">
        {/* Banner with executive summary */}
        <div className="mb-6 pb-6 border-b border-stone-200">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#721B32] uppercase tracking-wider">{currentSpecialty.area}</span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500">Plan de Estudios DGETI 2026</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900">{currentSpecialty.nombre}</h2>
              <p className="text-sm text-stone-600 mt-2 max-w-4xl leading-relaxed">
                {currentSpecialty.resumen_ejecutivo}
              </p>
            </div>

            {/* Status chip */}
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 shrink-0 text-xs space-y-1">
              <div className="text-stone-500 uppercase tracking-wide text-[10px] font-semibold">Estatus del Módulo:</div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${currentProgress.quiz_aprobado ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                <span className="font-semibold text-stone-800">
                  {currentProgress.quiz_aprobado ? `Quiz Aprobado (${currentProgress.calificacion_quiz} pts)` : 'Quiz Pendiente'}
                </span>
              </div>
              <div className="text-[11px] text-stone-500">
                Video: {currentProgress.video_visto ? '✓ Visto' : 'Pendiente'} · Lectura: {currentProgress.infografia_explorada ? '✓ Leída' : 'Pendiente'}
              </div>
            </div>
          </div>
        </div>

        {/* Teen Comic Vignette Showcase */}
        {COMIC_ASSETS.especialidades[selectedId] && (
          <div className="mb-6 rounded-2xl border-2 border-stone-800 bg-stone-900 text-white overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Comic Illustration Image Panel */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[240px] overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-stone-800">
              <img
                src={COMIC_ASSETS.especialidades[selectedId].image}
                alt={currentSpecialty.nombre}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-amber-400 text-stone-950 font-black text-[11px] px-2.5 py-1 rounded shadow-md uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                {COMIC_ASSETS.especialidades[selectedId].badge}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent p-3 text-[11px] font-mono-code text-amber-200">
                {COMIC_ASSETS.especialidades[selectedId].motto}
              </div>
            </div>

            {/* Right: Graphic Vignette Callout & Teen Storyline */}
            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-gradient-to-br from-stone-900 to-stone-950">
              <div>
                {/* Comic Speech Bubble */}
                <div className="relative bg-white text-stone-900 rounded-2xl p-4 shadow-md border-2 border-stone-800 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase text-[#721B32] tracking-wider">
                      ★ Experiencia Técnica Real en CETis 7
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug">
                    "{COMIC_ASSETS.especialidades[selectedId].callout}"
                  </p>
                  {/* Comic Speech Bubble Pointer */}
                  <div className="absolute -bottom-2.5 left-6 w-4 h-4 bg-white border-r-2 border-b-2 border-stone-800 transform rotate-45"></div>
                </div>

                {/* 3 Illustrated Activity Viñetas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                      1. Lo que Creas
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {selectedId === 'programacion' && 'Videojuegos 2D, bases de datos y algoritmos de IA.'}
                      {selectedId === 'comercio' && 'Rutas de navegación marítima y logística internacional.'}
                      {selectedId === 'rrhh' && 'Liderazgo juvenil, dinámicas de equipo y comunicación.'}
                      {selectedId === 'cosmetologia' && 'Dermocosmiatría científica y formulación botánica.'}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1">
                      2. Tu Taller
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {selectedId === 'programacion' && 'Salas de cómputo especializadas y servidores locales.'}
                      {selectedId === 'comercio' && 'Centro de simulación aduanera y software arancelario.'}
                      {selectedId === 'rrhh' && 'Aulas vivenciales de mediación y dinámicas grupales.'}
                      {selectedId === 'cosmetologia' && 'Laboratorio de dermofórmulas y cabinas estéticas.'}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                      3. Reto Presencial
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {selectedId === 'programacion' && 'Resolver reto de lógica interactiva contra reloj.'}
                      {selectedId === 'comercio' && 'Sellar y liberar el pedimento de un contenedor real.'}
                      {selectedId === 'rrhh' && 'Dirigir un mini-sprint colaborativo con compañeros.'}
                      {selectedId === 'cosmetologia' && 'Diagnóstico cutáneo con equipo digital profesional.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action for this Career */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                <span className="text-stone-400">
                  Explora el video didáctico y los reactivos abajo para acreditar tu 70% virtual.
                </span>
                <button
                  onClick={() => handleTabChange('video')}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-black text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Ver Video de Academia
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs for this career */}
        <div className="flex items-center gap-1 border-b border-stone-200 pb-px mb-6 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => handleTabChange('curricular')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'curricular'
                ? 'border-[#721B32] text-[#721B32] font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            1. Mapa Curricular e Infografía
          </button>
          <button
            onClick={() => handleTabChange('video')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'video'
                ? 'border-[#721B32] text-[#721B32] font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            2. Video Didáctico de Academia
          </button>
          <button
            onClick={() => handleTabChange('proyectos')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'proyectos'
                ? 'border-[#721B32] text-[#721B32] font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            3. Proyectos Destacados (3)
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'border-[#721B32] text-[#721B32] font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            4. Cuestionario de Comprobación ({preguntasQuiz.length} Reactivos)
          </button>
          <button
            onClick={() => handleTabChange('reto')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reto'
                ? 'border-[#721B32] text-[#721B32] font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            5. Reto Presencial en Plantel (30%)
          </button>
        </div>

        {/* Tab 1: Mapa Curricular & Infografía */}
        {activeTab === 'curricular' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Submódulos I a V */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span>Estructura de Submódulos Profesionales</span>
                  <span className="text-[11px] font-normal text-stone-500">(2° a 6° Semestre)</span>
                </h4>
                <div className="space-y-2.5">
                  {currentSpecialty.submodulos.map((mod, i) => (
                    <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1">
                        <span className="text-[#721B32]">{mod.semestre}</span>
                        <span className="text-[11px] text-stone-500 font-normal">DGETI Oficial</span>
                      </div>
                      <div className="text-xs font-bold text-stone-900 mb-1">{mod.nombre}</div>
                      <p className="text-[11px] text-stone-600">{mod.competencia}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Perfil de Egreso y Campo Laboral */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                  <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2">
                    Competencias del Perfil de Egreso
                  </h5>
                  <ul className="space-y-2 text-xs text-blue-950">
                    {currentSpecialty.perfil_egreso.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200">
                  <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-2">
                    Campo de Inserción Laboral y Productivo
                  </h5>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {currentSpecialty.campo_laboral.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <span>¿Deseas profundizar en los proyectos reales de los alumnos?</span>
                  <button
                    onClick={() => handleTabChange('proyectos')}
                    className="font-semibold text-[#721B32] hover:underline"
                  >
                    Ver Proyectos Destacados →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Video de la Academia y Galería de Trabajos de Alumnos */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            {/* Permission Control Callout Banner */}
            {sesionActiva?.tipo === 'docente' ? (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-200 text-amber-900 rounded-lg shrink-0">
                    <Edit3 className="w-5 h-5 text-amber-950" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-amber-950 block text-sm">Sesión de Docente Autorizado Activa</span>
                    Estás viendo la interfaz de consulta de los alumnos. Si deseas agregar nuevos enlaces de YouTube, Google Drive o fotos de proyectos, puedes modificarlos en la Ficha de esta especialidad.
                  </div>
                </div>
                {onNavigateToDirection && (
                  <button
                    onClick={onNavigateToDirection}
                    className="px-4 py-2 bg-[#721B32] hover:bg-[#5a1527] text-white rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    Abrir Editor de Ficha →
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 text-blue-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-blue-700 shrink-0" />
                  <div>
                    <span className="font-bold text-blue-900">Vista de Alumno (Solo Lectura):</span> Los estudiantes sólo pueden consultar y reproducir el contenido multimedia.
                  </div>
                </div>
                {onNavigateToDirection && (
                  <button
                    onClick={onNavigateToDirection}
                    className="px-3.5 py-1.5 bg-white border border-blue-300 hover:bg-blue-100/50 text-blue-900 font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#721B32]" />
                    ¿Eres Profesor? Editar Videos y Galería →
                  </button>
                )}
              </div>
            )}

            {/* SECCIÓN 1: Video de la Academia Realizado por los Profesores */}
            <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-lg border border-stone-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
                <div>
                  <span className="text-[10px] font-mono-code uppercase tracking-widest text-amber-400 font-bold block mb-0.5">
                    ★ Video Oficial de Orientación
                  </span>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-amber-400" />
                    Video de la Academia realizado por los profesores
                  </h3>
                </div>
                {currentProgress.video_visto ? (
                  <span className="self-start sm:self-center px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Video Visto ✓
                  </span>
                ) : (
                  <span className="self-start sm:self-center px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-semibold">
                    Requisito de Orientación
                  </span>
                )}
              </div>

              {/* Video Player Box */}
              {(() => {
                const videoInfo = currentFicha?.recursos_multimedia?.video_academia || currentSpecialty.video_academia || {
                  titulo: currentSpecialty.video_demo.titulo,
                  duracion: currentSpecialty.video_demo.duracion,
                  presentador: currentSpecialty.video_demo.presentador,
                  descripcion: currentSpecialty.video_demo.descripcion,
                  url_video: currentSpecialty.video_demo.url_video || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                };

                const parsed = parseEmbedMediaUrl(videoInfo.url_video);

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Embedded Frame / Player */}
                    <div className="lg:col-span-8">
                      <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-stone-800 shadow-inner group">
                        {parsed.type === 'youtube' || parsed.type === 'drive' ? (
                          <iframe
                            src={parsed.embedUrl}
                            title={videoInfo.titulo}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; webshare"
                            allowFullScreen
                            onLoad={() => {
                              if (!currentProgress.video_visto) {
                                const updated = { ...progreso };
                                updated.progreso_especialidades[selectedId].video_visto = true;
                                onUpdateProgreso(updated);
                              }
                            }}
                          ></iframe>
                        ) : !simulatedVideoPlaying ? (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 to-black">
                            <button
                              onClick={handlePlayVideo}
                              className="w-16 h-16 rounded-full bg-[#721B32] hover:bg-[#8b223e] text-white flex items-center justify-center mb-4 transition-transform hover:scale-110 shadow-lg cursor-pointer"
                            >
                              <Play className="w-8 h-8 ml-1 fill-current" />
                            </button>
                            <h4 className="text-base font-bold text-white max-w-md">{videoInfo.titulo}</h4>
                            <p className="text-xs text-stone-400 mt-1">Haz clic para reproducir el video de la academia</p>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col justify-between p-6 bg-stone-950">
                            <div className="flex items-center justify-between text-xs text-stone-400">
                              <span className="font-semibold text-white">{videoInfo.titulo}</span>
                              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">REPRODUCIENDO</span>
                            </div>
                            <div className="text-center py-8">
                              <div className="w-10 h-10 border-4 border-white/20 border-t-[#721B32] rounded-full animate-spin mx-auto mb-3"></div>
                              <p className="text-sm font-medium text-white">Transmitiendo video oficial de docentes...</p>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-[#721B32] w-3/4 rounded-full"></div>
                              </div>
                              <div className="flex justify-between text-[10px] text-stone-400">
                                <span>01:45</span>
                                <span>{videoInfo.duracion}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Metadata & Presenter Info */}
                    <div className="lg:col-span-4 space-y-4">
                      <div>
                        <div className="text-xs font-mono-code text-amber-400 mb-1">
                          Presenta: {videoInfo.presentador}
                        </div>
                        <h4 className="text-base font-bold text-white leading-snug">{videoInfo.titulo}</h4>
                        <div className="mt-2 text-xs text-stone-300 leading-relaxed bg-stone-800/60 p-3 rounded-lg border border-stone-800">
                          {videoInfo.descripcion}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Duración: {videoInfo.duracion}
                        </span>
                        <span className="text-amber-300 font-mono-code text-[11px]">
                          Fuente: {parsed.providerLabel}
                        </span>
                      </div>

                      {videoInfo.url_video && (
                        <a
                          href={videoInfo.url_video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Abrir enlace original ({parsed.providerLabel})
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* SECCIÓN 2: Galería con videos o fotos de los trabajos realizados por los alumnos */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#721B32] font-bold block mb-0.5">
                    ★ Talento Estudiantil CETis 7
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#721B32]" />
                    Galería de videos y fotos de trabajos de alumnos
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Explora los proyectos audiovisuales y evidencias fotográficas desarrolladas en los laboratorios.
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-stone-200 shrink-0 self-start md:self-center">
                  <button
                    onClick={() => setGalleryFilter('todos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      galleryFilter === 'todos'
                        ? 'bg-[#721B32] text-white shadow-xs'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5" /> Todos
                  </button>
                  <button
                    onClick={() => setGalleryFilter('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      galleryFilter === 'video'
                        ? 'bg-[#721B32] text-white shadow-xs'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" /> Videos
                  </button>
                  <button
                    onClick={() => setGalleryFilter('foto')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      galleryFilter === 'foto'
                        ? 'bg-[#721B32] text-white shadow-xs'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Fotos
                  </button>
                </div>
              </div>

              {/* Gallery Cards Grid */}
              {(() => {
                const items = currentFicha?.recursos_multimedia?.galeria_alumnos || currentSpecialty.galeria_alumnos || [];
                const filteredItems = items.filter(item => {
                  if (galleryFilter === 'todos') return true;
                  return item.tipo === galleryFilter;
                });

                if (filteredItems.length === 0) {
                  return (
                    <div className="text-center py-10 bg-white rounded-xl border border-dashed border-stone-300 p-6">
                      <Film className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-bold text-stone-700">No hay elementos en esta categoría aún.</p>
                      <p className="text-xs text-stone-500 mt-1">
                        La academia agregará más evidencias audiovisuales de los alumnos próximamente.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map(item => {
                      const parsed = parseEmbedMediaUrl(item.url_media, item.tipo);

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            {/* Media Thumbnail Box */}
                            <div
                              onClick={() => setActiveLightboxItem(item)}
                              className="relative aspect-video bg-stone-900 cursor-pointer overflow-hidden"
                            >
                              {parsed.thumbnailUrl ? (
                                <img
                                  src={parsed.thumbnailUrl}
                                  alt={item.titulo}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-stone-800 text-stone-400">
                                  {item.tipo === 'video' ? <Video className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                                </div>
                              )}

                              {/* Type Overlay Badge */}
                              <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs flex items-center gap-1 ${
                                  item.tipo === 'video' ? 'bg-red-600' : 'bg-blue-600'
                                }`}>
                                  {item.tipo === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                  {item.tipo === 'video' ? 'Video' : 'Fotografía'}
                                </span>
                              </div>

                              {/* Hover Play/Zoom Overlay */}
                              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                                  {item.tipo === 'video' ? (
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                  ) : (
                                    <Maximize2 className="w-5 h-5" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="p-4 space-y-2">
                              <div className="flex items-center justify-between gap-1 text-[11px] font-mono-code text-stone-500">
                                <span className="text-[#721B32] font-bold">{item.semestre}</span>
                                <span className="bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                                  {parsed.providerLabel}
                                </span>
                              </div>

                              <h4
                                onClick={() => setActiveLightboxItem(item)}
                                className="text-sm font-bold text-stone-900 leading-snug cursor-pointer hover:text-[#721B32] transition-colors"
                              >
                                {item.titulo}
                              </h4>

                              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                                {item.descripcion}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                            <span className="text-stone-600 font-medium line-clamp-1 flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              {item.alumnos}
                            </span>
                            <button
                              onClick={() => setActiveLightboxItem(item)}
                              className="text-[11px] font-bold text-[#721B32] hover:underline shrink-0 ml-2"
                            >
                              Ver {item.tipo === 'video' ? 'Video' : 'Foto'} →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Lightbox / Media Viewer Modal */}
            {activeLightboxItem && (
              <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-stone-900 text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-800 flex flex-col max-h-[90vh]">
                  {/* Modal Header */}
                  <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                          activeLightboxItem.tipo === 'video' ? 'bg-red-600' : 'bg-blue-600'
                        }`}>
                          {activeLightboxItem.tipo === 'video' ? 'Video de Alumno' : 'Trabajo Fotográfico'}
                        </span>
                        <span className="text-xs text-amber-300 font-mono-code">{activeLightboxItem.semestre}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{activeLightboxItem.titulo}</h3>
                    </div>
                    <button
                      onClick={() => setActiveLightboxItem(null)}
                      className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Content Body */}
                  <div className="p-4 overflow-y-auto space-y-4">
                    {(() => {
                      const parsed = parseEmbedMediaUrl(activeLightboxItem.url_media, activeLightboxItem.tipo);

                      if (activeLightboxItem.tipo === 'video' || parsed.type === 'youtube' || parsed.type === 'drive') {
                        return (
                          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-stone-800">
                            {parsed.type === 'youtube' || parsed.type === 'drive' ? (
                              <iframe
                                src={parsed.embedUrl}
                                title={activeLightboxItem.titulo}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; webshare"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <video
                                src={parsed.embedUrl}
                                controls
                                className="w-full h-full"
                                autoPlay
                              ></video>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div className="rounded-xl overflow-hidden border border-stone-800 bg-black flex items-center justify-center max-h-[60vh]">
                          <img
                            src={parsed.embedUrl}
                            alt={activeLightboxItem.titulo}
                            className="max-h-[60vh] w-auto object-contain"
                          />
                        </div>
                      );
                    })()}

                    {/* Metadata */}
                    <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-stone-400 border-b border-stone-800 pb-2">
                        <span className="flex items-center gap-1.5 text-white font-medium">
                          <GraduationCap className="w-4 h-4 text-amber-400" /> Autores: {activeLightboxItem.alumnos}
                        </span>
                        <span className="text-stone-400 font-mono-code">{activeLightboxItem.semestre}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed pt-1">
                        {activeLightboxItem.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                    <span>Muestra de proyectos estudiantiles CETis No. 7</span>
                    <button
                      onClick={() => setActiveLightboxItem(null)}
                      className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                    >
                      Cerrar Vista
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Proyectos Destacados (3) */}
        {activeTab === 'proyectos' && (
          <div className="space-y-4">
            <div className="text-xs text-stone-600">
              Muestra de 3 proyectos reales diseñados y elaborados por estudiantes de 3.º a 6.º semestre en el CETis 7:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentSpecialty.proyectos_destacados.map((proy, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#721B32] mb-1.5">
                      <span>PROYECTO {idx + 1}</span>
                      <span className="text-stone-500 font-mono-code">{proy.semestre}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mb-2 leading-snug">{proy.titulo}</h4>
                    <p className="text-xs text-stone-600 mb-3 leading-relaxed">{proy.descripcion}</p>
                  </div>
                  <div className="pt-3 border-t border-stone-200 space-y-1 text-[11px]">
                    <div className="text-stone-500">
                      <strong className="text-stone-700">Autores:</strong> {proy.alumnos}
                    </div>
                    <div className="text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-medium">
                      <strong className="text-emerald-950">Impacto:</strong> {proy.impacto}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Cuestionario de Comprobación de Lectura (Banco de Reactivos Dinámico) */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Evaluación Formativa</span>
                <h4 className="text-sm font-bold text-stone-900">
                  Cuestionario de {preguntasQuiz.length} {preguntasQuiz.length === 1 ? 'Pregunta' : 'Preguntas'} · {currentSpecialty.titulo_corto}
                </h4>
              </div>
              {quizSubmitted && (
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Calificación Obtenida:</span>
                  <span className={`text-base font-bold font-mono-code ${
                    currentProgress.calificacion_quiz >= 60 ? 'text-emerald-700' : 'text-red-600'
                  }`}>
                    {currentProgress.calificacion_quiz} / 100 pts
                  </span>
                </div>
              )}
            </div>

            {preguntasQuiz.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-stone-300 p-6">
                <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-stone-700">El banco de reactivos está en configuración</p>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  Los profesores de la academia técnica están elaborando los reactivos de evaluación para esta especialidad en la Ficha de Dirección Académica.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {preguntasQuiz.map((q, qIdx) => {
                  const userSelected = quizAnswers[q.id];
                  const isCorrect = userSelected === q.respuesta_correcta;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-stone-900">
                          <span className="text-[#721B32] mr-1.5">{qIdx + 1}.</span>
                          {q.pregunta}
                        </p>
                        {quizSubmitted && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isCorrect ? 'Correcta' : 'Incorrecta'}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {q.opciones.map((opt, optIdx) => {
                          const isChosen = userSelected === optIdx;
                          let itemClass = 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100';

                          if (quizSubmitted) {
                            if (optIdx === q.respuesta_correcta) {
                              itemClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
                            } else if (isChosen) {
                              itemClass = 'bg-red-50 border-red-400 text-red-950';
                            }
                          } else if (isChosen) {
                            itemClass = 'bg-[#721B32]/10 border-[#721B32] text-stone-900 font-medium';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={quizSubmitted && currentProgress.quiz_aprobado}
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg text-xs md:text-sm border transition-all ${itemClass}`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full border border-stone-400 flex items-center justify-center shrink-0 text-xs font-semibold">
                                  {String.fromCharCode(97 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-200 mt-2">
                          <strong className="text-stone-800">Fundamentación:</strong> {q.explicacion}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {preguntasQuiz.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
                <span className="text-xs text-stone-500">
                  Se requiere un mínimo de 60 pts ({Math.ceil(preguntasQuiz.length * 0.6)} de {preguntasQuiz.length} correctas) para aprobar el módulo.
                </span>
                <button
                  disabled={Object.keys(quizAnswers).length < preguntasQuiz.length}
                  onClick={handleGradeQuiz}
                  className={`w-full sm:w-auto px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                    Object.keys(quizAnswers).length === preguntasQuiz.length
                      ? 'bg-[#721B32] text-white hover:bg-[#5b1528] cursor-pointer'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {quizSubmitted ? 'Volver a Evaluar Cuestionario' : 'Enviar Respuestas y Calificar'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Reto Presencial en Plantel (30%) */}
        {activeTab === 'reto' && (
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">Fase Presencial (30% de Cierre)</span>
                <h4 className="text-base font-bold text-stone-900">{currentSpecialty.reto_presencial.nombre}</h4>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-stone-600 bg-white px-2.5 py-1 rounded border border-stone-200">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{currentSpecialty.reto_presencial.duracion_min} min</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-stone-800 block mb-1">Objetivo del Reto:</span>
                  <p className="text-stone-600 leading-relaxed">{currentSpecialty.reto_presencial.objetivo}</p>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block mb-1">Ubicación en el Plantel:</span>
                  <p className="text-stone-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#721B32]" />
                    {currentSpecialty.reto_presencial.espacio}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-stone-800 block mb-1">Dinámica Práctica:</span>
                  <p className="text-stone-600 leading-relaxed">{currentSpecialty.reto_presencial.dinamica}</p>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block mb-1">Materiales y Equipamiento:</span>
                  <p className="text-stone-600">{currentSpecialty.reto_presencial.materiales}</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
              <strong>Nota logística:</strong> Para tener acceso a este reto presencial, deberás presentar tu Pase Digital QR emitido al completar el 70% de la fase virtual.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
