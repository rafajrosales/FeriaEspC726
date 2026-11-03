import React, { useState } from 'react';
import { ESPECIALIDADES } from '../data/mockData';
import { SpecialtyId, SpecialtyInfo, ProgresoVirtual } from '../types';
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
  MessageSquare
} from 'lucide-react';
import { COMIC_ASSETS } from '../assets/comicAssets';

interface SpecialtyModulesProps {
  progreso: ProgresoVirtual;
  onUpdateProgreso: (nuevoProgreso: ProgresoVirtual) => void;
  sugeridaId?: SpecialtyId;
}

export const SpecialtyModules: React.FC<SpecialtyModulesProps> = ({
  progreso,
  onUpdateProgreso,
  sugeridaId
}) => {
  const [selectedId, setSelectedId] = useState<SpecialtyId>(sugeridaId || 'programacion');
  const [activeTab, setActiveTab] = useState<'curricular' | 'video' | 'proyectos' | 'quiz' | 'reto'>('curricular');
  
  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [simulatedVideoPlaying, setSimulatedVideoPlaying] = useState<boolean>(false);

  const currentSpecialty = ESPECIALIDADES.find(s => s.id === selectedId) || ESPECIALIDADES[0];
  const currentProgress = progreso.progreso_especialidades[selectedId];

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
    let correctCount = 0;
    currentSpecialty.preguntas_quiz.forEach(q => {
      if (quizAnswers[q.id] === q.respuesta_correcta) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / currentSpecialty.preguntas_quiz.length) * 100);
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
            4. Cuestionario de Comprobación (5 Reactivos)
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

        {/* Tab 2: Video Didáctico */}
        {activeTab === 'video' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="relative aspect-video bg-stone-900 rounded-xl overflow-hidden shadow-md flex items-center justify-center text-white p-6">
              {!simulatedVideoPlaying ? (
                <div className="text-center space-y-3 z-10">
                  <button
                    onClick={handlePlayVideo}
                    className="w-16 h-16 rounded-full bg-[#721B32] text-white flex items-center justify-center mx-auto hover:scale-105 transition-transform shadow-lg cursor-pointer"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                  <h4 className="text-lg font-bold">{currentSpecialty.video_demo.titulo}</h4>
                  <div className="text-xs text-stone-300 flex items-center justify-center gap-3">
                    <span>Duración: {currentSpecialty.video_demo.duracion}</span>
                    <span>·</span>
                    <span>{currentSpecialty.video_demo.presentador}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span className="font-semibold text-white">{currentSpecialty.video_demo.titulo}</span>
                    <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">REPRODUCIENDO</span>
                  </div>
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-[#721B32] rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm font-medium">Transmitiendo cápsula de orientación técnica...</p>
                    <p className="text-xs text-stone-400 mt-1">{currentSpecialty.video_demo.descripcion}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#721B32] w-3/4 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span>02:15</span>
                      <span>{currentSpecialty.video_demo.duracion}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs text-stone-600">
              <span className="font-bold text-stone-900 block mb-1">Sinopsis Pedagógica:</span>
              <p>{currentSpecialty.video_demo.descripcion}</p>
              {currentProgress.video_visto && (
                <div className="mt-2 text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Requisito audiovisual completado satisfactoriamente.
                </div>
              )}
            </div>
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

        {/* Tab 4: Cuestionario de Comprobación de Lectura (5 Reactivos) */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Evaluación Formativa</span>
                <h4 className="text-sm font-bold text-stone-900">Cuestionario de 5 Preguntas · {currentSpecialty.titulo_corto}</h4>
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

            <div className="space-y-6">
              {currentSpecialty.preguntas_quiz.map((q, qIdx) => {
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

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <span className="text-xs text-stone-500">
                Se requiere un mínimo de 60 pts (3 respuestas correctas) para aprobar el módulo.
              </span>
              <button
                disabled={Object.keys(quizAnswers).length < currentSpecialty.preguntas_quiz.length}
                onClick={handleGradeQuiz}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  Object.keys(quizAnswers).length === currentSpecialty.preguntas_quiz.length
                    ? 'bg-[#721B32] text-white hover:bg-[#5b1528]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {quizSubmitted ? 'Volver a Evaluar Cuestionario' : 'Enviar Respuestas y Calificar'}
              </button>
            </div>
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
