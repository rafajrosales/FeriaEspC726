import React, { useState, useMemo } from 'react';
import { Estudiante, ProgresoVirtual, EvaluacionVocacional, SpecialtyId } from '../types';
import { COSMETOLOGIA_DIAGNOSTICO_REACTIVOS } from '../data/mockData';
import { 
  getEstudiantes, 
  getProgresoVirtual, 
  getEvaluacionVocacional, 
  getAsistenciaPresencialByNC 
} from '../services/storage';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  Filter, 
  Compass, 
  Award,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  ClipboardCheck
} from 'lucide-react';

export const MatriculaDashboard: React.FC = () => {
  const [selectedTurno, setSelectedTurno] = useState<string>('TODOS');
  const [selectedGrupo, setSelectedGrupo] = useState<string>('TODOS');
  const [activeChartMode, setActiveChartMode] = useState<'ambos' | 'vocacional' | 'especialidades'>('ambos');

  const todosEstudiantes = getEstudiantes();

  // Filter students based on selection
  const estudiantesFiltrados = useMemo(() => {
    return todosEstudiantes.filter(est => {
      const matchTurno = selectedTurno === 'TODOS' || est.turno === selectedTurno;
      const matchGrupo = selectedGrupo === 'TODOS' || est.grupo === selectedGrupo;
      return matchTurno && matchGrupo;
    });
  }, [todosEstudiantes, selectedTurno, selectedGrupo]);

  const totalMatricula = estudiantesFiltrados.length;

  // Compute metrics for the filtered cohort
  const metrics = useMemo(() => {
    let testCompletados = 0;
    let virtualCompletados100 = 0;
    let virtualEnProceso = 0;
    let virtualPendientes = 0;
    let tutoresVerificados = 0;

    // Per specialty stats:
    // 1. How many approved the reading quiz for each career
    // 2. How many have 100% virtual completed with that career as suggested
    const especialidadesStats: Record<SpecialtyId, {
      nombre: string;
      color: string;
      quizAprobados: number;
      finalizadosConSugerida: number;
    }> = {
      programacion: { nombre: 'Programación', color: '#1d4ed8', quizAprobados: 0, finalizadosConSugerida: 0 },
      comercio: { nombre: 'Comercio y Aduanas', color: '#047857', quizAprobados: 0, finalizadosConSugerida: 0 },
      rrhh: { nombre: 'Recursos Humanos', color: '#7c3aed', quizAprobados: 0, finalizadosConSugerida: 0 },
      cosmetologia: { nombre: 'Cosmetología', color: '#be185d', quizAprobados: 0, finalizadosConSugerida: 0 }
    };

    // By group breakdown
    const gruposList = ['1°A', '1°B', '1°C', '1°D', '1°E', '1°F'];
    const gruposStats: Record<string, { total: number; testCompletados: number; virtualFinalizados: number; tutoresVerificados: number }> = {};
    gruposList.forEach(g => {
      gruposStats[g] = { total: 0, testCompletados: 0, virtualFinalizados: 0, tutoresVerificados: 0 };
    });

    // Pipeline funnel counts
    let pipelineExploraronModulos = 0;
    let pipelineEmitieronToken = 0;
    let pipelineCheckinPresencial = 0;
    let pipelineAcreditacionFinal = 0;

    // Cosmetología 17-reactivos diagnostic stats (16 scorable + Q4 logistic)
    const letterToIdx: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
    let cosmeEvaluados = 0;
    let cosmeTotalPuntos = 0;
    let cosmeConPuntaje = 0;
    const cosmeNiveles = {
      ALTO: 0,          // 13–16 pts
      EN_DESARROLLO: 0, // 9–12 pts
      EXPLORATORIO: 0   // 0–8 pts
    };
    const cosmeModelosQ4 = [0, 0, 0, 0]; // A:4, B:2-3, C:1, D:0
    let cosmeModelosTotalRespuestas = 0;

    const bloquesMap: Record<string, { nombre: string; correctas: number; posibles: number }> = {
      'I. Intereses y conocimiento inicial': { nombre: 'I. Intereses y Conocimiento (P1–P3, P5)', correctas: 0, posibles: 0 },
      'II. Actitudes y disposición para las prácticas': { nombre: 'II. Actitudes y Disposición (P6–P9)', correctas: 0, posibles: 0 },
      'III. Responsabilidad y materiales de trabajo': { nombre: 'III. Responsabilidad y Materiales (P10–P12)', correctas: 0, posibles: 0 },
      'IV. Habilidades personales y ética profesional': { nombre: 'IV. Habilidades y Ética (P13–P16)', correctas: 0, posibles: 0 },
      'V. Expectativas profesionales': { nombre: 'V. Expectativas Profesionales (P17)', correctas: 0, posibles: 0 }
    };

    estudiantesFiltrados.forEach(est => {
      const prog = getProgresoVirtual(est.num_control);
      const evalVoc = getEvaluacionVocacional(est.num_control);
      const asis = getAsistenciaPresencialByNC(est.num_control);

      // Tutor verification check
      const hasTutorVerified = est.tutor?.verificado === true;
      if (hasTutorVerified) {
        tutoresVerificados++;
      }

      // Group stat accumulation
      if (gruposStats[est.grupo]) {
        gruposStats[est.grupo].total++;
        if (prog.test_vocacional_completado) gruposStats[est.grupo].testCompletados++;
        if (prog.estatus_fase_virtual === 'COMPLETADO') gruposStats[est.grupo].virtualFinalizados++;
        if (hasTutorVerified) gruposStats[est.grupo].tutoresVerificados++;
      }

      // Test vocacional status
      if (prog.test_vocacional_completado) {
        testCompletados++;
      }

      // Virtual phase status
      if (prog.estatus_fase_virtual === 'COMPLETADO' && prog.porcentaje_virtual >= 100) {
        virtualCompletados100++;
        pipelineEmitieronToken++;
      } else if (prog.porcentaje_virtual > 0) {
        virtualEnProceso++;
      } else {
        virtualPendientes++;
      }

      // Check quiz approved per career
      const careers: SpecialtyId[] = ['programacion', 'comercio', 'rrhh', 'cosmetologia'];
      let quizesPassedCount = 0;
      careers.forEach(c => {
        if (prog.progreso_especialidades[c]?.quiz_aprobado) {
          especialidadesStats[c].quizAprobados++;
          quizesPassedCount++;
        }
      });

      if (quizesPassedCount > 0) {
        pipelineExploraronModulos++;
      }

      // Career suggested for students who finished 100% virtual
      if (prog.estatus_fase_virtual === 'COMPLETADO' && evalVoc?.carrera_sugerida) {
        if (especialidadesStats[evalVoc.carrera_sugerida]) {
          especialidadesStats[evalVoc.carrera_sugerida].finalizadosConSugerida++;
        }
      }

      // Presencial pipeline
      if (asis?.checkin_realizado) pipelineCheckinPresencial++;
      if (asis?.estatus_final === 'ACREDITADO') pipelineAcreditacionFinal++;

      // Cosmetología 17-reactivos diagnostic metrics
      const cosme = prog.progreso_especialidades.cosmetologia;
      const hasCosmeData = Boolean(cosme && (cosme.respuestas_detalle || typeof cosme.puntaje_obtenido === 'number' || cosme.quiz_aprobado));
      if (hasCosmeData && cosme) {
        cosmeEvaluados++;
        let puntos = cosme.puntaje_obtenido;

        if (cosme.respuestas_detalle) {
          // Q4 logistic item (id: 4, 0 pts)
          const q4Val = cosme.respuestas_detalle[4];
          if (typeof q4Val === 'number' && q4Val >= 0 && q4Val <= 3) {
            cosmeModelosQ4[q4Val]++;
            cosmeModelosTotalRespuestas++;
          }

          // Block-level performance across 16 scorable items
          let computedPts = 0;
          COSMETOLOGIA_DIAGNOSTICO_REACTIVOS.forEach((item, idx) => {
            if (item.es_informativa || item.correcta === 'na') return;
            const qId = typeof item.id === 'number' ? item.id : idx + 1;
            const selected = cosme.respuestas_detalle?.[qId];
            const expected = letterToIdx[item.correcta.toLowerCase()] ?? 0;
            const bKey = item.bloque || '';
            if (bloquesMap[bKey]) {
              bloquesMap[bKey].posibles++;
              if (selected === expected) {
                bloquesMap[bKey].correctas++;
                computedPts++;
              }
            } else if (selected === expected) {
              computedPts++;
            }
          });
          if (typeof puntos !== 'number') {
            puntos = computedPts;
          }
        }

        if (typeof puntos === 'number') {
          cosmeTotalPuntos += puntos;
          cosmeConPuntaje++;
          const nivel = cosme.nivel_perfil || (puntos >= 13 ? 'ALTO' : puntos >= 9 ? 'EN_DESARROLLO' : 'EXPLORATORIO');
          cosmeNiveles[nivel]++;
        } else if (cosme.nivel_perfil) {
          cosmeNiveles[cosme.nivel_perfil]++;
        }
      }
    });

    const pctTest = totalMatricula > 0 ? Math.round((testCompletados / totalMatricula) * 100) : 0;
    const pctVirtual = totalMatricula > 0 ? Math.round((virtualCompletados100 / totalMatricula) * 100) : 0;
    const pctTutores = totalMatricula > 0 ? Math.round((tutoresVerificados / totalMatricula) * 100) : 0;

    return {
      testCompletados,
      testPendientes: totalMatricula - testCompletados,
      pctTest,
      virtualCompletados100,
      virtualEnProceso,
      virtualPendientes,
      pctVirtual,
      tutoresVerificados,
      tutoresPendientes: totalMatricula - tutoresVerificados,
      pctTutores,
      especialidadesStats,
      gruposStats,
      cosmetologiaDiagnostico: {
        evaluados: cosmeEvaluados,
        promedioPuntos: cosmeConPuntaje > 0 ? (cosmeTotalPuntos / cosmeConPuntaje).toFixed(1) : '0.0',
        niveles: cosmeNiveles,
        modelosQ4: cosmeModelosQ4,
        modelosTotal: cosmeModelosTotalRespuestas,
        requierenApoyoModelos: cosmeModelosQ4[2] + cosmeModelosQ4[3],
        bloques: Object.values(bloquesMap).map(b => ({
          nombre: b.nombre,
          pct: b.posibles > 0 ? Math.round((b.correctas / b.posibles) * 100) : 0,
          correctas: b.correctas,
          posibles: b.posibles
        }))
      },
      funnel: [
        { label: 'Matrícula Padrón', count: totalMatricula, pct: 100, color: 'bg-stone-600' },
        { label: 'Test Vocacional Listo', count: testCompletados, pct: pctTest, color: 'bg-[#721B32]' },
        { label: 'Módulos en Exploración', count: pipelineExploraronModulos, pct: totalMatricula > 0 ? Math.round((pipelineExploraronModulos / totalMatricula) * 100) : 0, color: 'bg-blue-600' },
        { label: 'Fase Virtual 100% (Token QR)', count: virtualCompletados100, pct: pctVirtual, color: 'bg-emerald-600' },
        { label: 'Consentimiento & Firma de Tutor (Habilita Impresión)', count: tutoresVerificados, pct: pctTutores, color: 'bg-indigo-600' },
        { label: 'Check-in Presencial en Plantel', count: pipelineCheckinPresencial, pct: totalMatricula > 0 ? Math.round((pipelineCheckinPresencial / totalMatricula) * 100) : 0, color: 'bg-amber-600' },
        { label: 'Acreditación 100% Integral', count: pipelineAcreditacionFinal, pct: totalMatricula > 0 ? Math.round((pipelineAcreditacionFinal / totalMatricula) * 100) : 0, color: 'bg-teal-700' }
      ]
    };
  }, [estudiantesFiltrados, totalMatricula]);

  // Max value for bar chart scaling
  const maxBarValue = Math.max(
    totalMatricula,
    1,
    ...Object.values(metrics.especialidadesStats).map(s => Math.max(s.quizAprobados, s.finalizadosConSugerida))
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Top Banner & Filter Controls */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#721B32] uppercase tracking-wider">Tablero de Control Académico</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-mono-code">DGETI · CETis No. 7</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              Progreso General de la Matrícula Estudiantil
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Monitoreo analítico de avances: Diagnóstico Vocacional Dual y Conclusión de Fase Virtual por Especialidad Técnica.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>Filtros:</span>
            </div>

            {/* Turno Filter */}
            <select
              value={selectedTurno}
              onChange={e => setSelectedTurno(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium border border-stone-300 rounded-lg bg-stone-50 text-stone-800 focus:bg-white focus:outline-none"
            >
              <option value="TODOS">Todos los Turnos</option>
              <option value="MATUTINO">Turno Matutino</option>
              <option value="VESPERTINO">Turno Vespertino</option>
            </select>

            {/* Grupo Filter */}
            <select
              value={selectedGrupo}
              onChange={e => setSelectedGrupo(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium border border-stone-300 rounded-lg bg-stone-50 text-stone-800 focus:bg-white focus:outline-none font-mono-code"
            >
              <option value="TODOS">Todos los Grupos</option>
              <option value="1°A">Grupo 1°A</option>
              <option value="1°B">Grupo 1°B</option>
              <option value="1°C">Grupo 1°C</option>
              <option value="1°D">Grupo 1°D</option>
              <option value="1°E">Grupo 1°E</option>
              <option value="1°F">Grupo 1°F</option>
            </select>

            {/* Chart Mode view buttons */}
            <div className="flex items-center border border-stone-200 rounded-lg p-0.5 bg-stone-100 text-xs font-medium">
              <button
                onClick={() => setActiveChartMode('ambos')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeChartMode === 'ambos' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Vista Integral
              </button>
              <button
                onClick={() => setActiveChartMode('vocacional')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeChartMode === 'vocacional' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Test Vocacional
              </button>
              <button
                onClick={() => setActiveChartMode('especialidades')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeChartMode === 'especialidades' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Por Especialidad
              </button>
            </div>
          </div>
        </div>

        {/* 5 Summary Stat Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between text-stone-500 text-[11px] uppercase tracking-wider font-semibold">
              <span>Matrícula Filtrada</span>
              <Users className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-stone-900 mt-1">
              {totalMatricula} <span className="text-xs font-normal text-stone-500">alumnos</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-mono-code">
              Turno: {selectedTurno} · {selectedGrupo}
            </div>
          </div>

          <div className="p-3.5 bg-[#721B32]/5 rounded-xl border border-[#721B32]/20">
            <div className="flex items-center justify-between text-[#721B32] text-[11px] uppercase tracking-wider font-semibold">
              <span>Test Vocacional Listo</span>
              <Compass className="w-3.5 h-3.5 text-[#721B32]" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-[#721B32] mt-1">
              {metrics.testCompletados} <span className="text-xs font-medium text-[#721B32]">({metrics.pctTest}%)</span>
            </div>
            <div className="text-[11px] text-[#721B32]/80 mt-0.5 font-mono-code">
              {metrics.testPendientes} alumnos pendientes
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between text-emerald-800 text-[11px] uppercase tracking-wider font-semibold">
              <span>Fase Virtual 100%</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-emerald-700 mt-1">
              {metrics.virtualCompletados100} <span className="text-xs font-medium text-emerald-600">({metrics.pctVirtual}%)</span>
            </div>
            <div className="text-[11px] text-emerald-800 mt-0.5 font-mono-code">
              Token QR emitido
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200">
            <div className="flex items-center justify-between text-indigo-900 text-[11px] uppercase tracking-wider font-semibold">
              <span>Tutores Firmados</span>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-indigo-800 mt-1">
              {metrics.tutoresVerificados} <span className="text-xs font-medium text-indigo-600">({metrics.pctTutores}%)</span>
            </div>
            <div className="text-[11px] text-indigo-700 mt-0.5 font-mono-code flex items-center gap-1">
              <span>Habilita impresión de pase</span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-blue-800 text-[11px] uppercase tracking-wider font-semibold">
              <span>En Proceso</span>
              <Clock className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-blue-700 mt-1">
              {metrics.virtualEnProceso} <span className="text-xs font-normal text-blue-600">alumnos</span>
            </div>
            <div className="text-[11px] text-blue-700 mt-0.5 font-mono-code">
              Resolviendo módulos
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Gráfico de Barras - Avance del Test Vocacional */}
      {(activeChartMode === 'ambos' || activeChartMode === 'vocacional') && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#721B32]" />
                Gráfico de Barras 1 · Diagnóstico Psicopedagógico
              </span>
              <h4 className="text-base font-bold text-stone-900 mt-0.5">
                Estudiantes que han Completado el Test Vocacional (Aptitud vs. Interés)
              </h4>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#721B32] inline-block"></span>
                <span className="text-stone-700">Completado ({metrics.testCompletados})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-stone-300 inline-block"></span>
                <span className="text-stone-700">Pendiente ({metrics.testPendientes})</span>
              </div>
            </div>
          </div>

          {/* Bar Chart 1A: Global Cohort Comparison */}
          <div className="space-y-4">
            <div className="bg-stone-50/60 p-4 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-stone-800">
                  Progreso Global de la Matrícula ({selectedTurno} · {selectedGrupo})
                </span>
                <span className="font-mono-code font-bold text-[#721B32] text-sm">
                  {metrics.testCompletados} de {totalMatricula} ({metrics.pctTest}%)
                </span>
              </div>

              {/* Stacked Proportional Bar */}
              <div className="h-7 w-full bg-stone-200 rounded-lg overflow-hidden flex shadow-2xs border border-stone-300">
                <div
                  className="h-full bg-[#721B32] flex items-center justify-center text-white text-xs font-bold font-mono-code transition-all duration-500"
                  style={{ width: `${metrics.pctTest}%` }}
                  title={`Completados: ${metrics.testCompletados} alumnos (${metrics.pctTest}%)`}
                >
                  {metrics.pctTest > 15 ? `${metrics.pctTest}% Completado` : `${metrics.pctTest}%`}
                </div>
                <div
                  className="h-full bg-stone-300 flex items-center justify-center text-stone-700 text-xs font-bold font-mono-code transition-all duration-500"
                  style={{ width: `${100 - metrics.pctTest}%` }}
                  title={`Pendientes: ${metrics.testPendientes} alumnos (${100 - metrics.pctTest}%)`}
                >
                  {100 - metrics.pctTest > 15 ? `${100 - metrics.pctTest}% Pendiente` : ''}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 font-mono-code">
                <span>0 alumnos</span>
                <span>Meta Institucional DGETI: 100% de 1.er Semestre</span>
                <span>{totalMatricula} alumnos</span>
              </div>
            </div>

            {/* Bar Chart 1B: Desglose Comparativo por Grupo (1°A a 1°F) */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Desglose Comparativo de Cobertura Vocacional por Grupo Escolar
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(metrics.gruposStats).map(([grupo, st]) => {
                  const pct = st.total > 0 ? Math.round((st.testCompletados / st.total) * 100) : 0;
                  return (
                    <div key={grupo} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-stone-900 font-mono-code">{grupo}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code font-bold text-stone-800 text-xs">
                            {st.testCompletados} / {st.total}
                          </span>
                          <span className="text-[11px] font-semibold text-[#721B32] font-mono-code bg-[#721B32]/10 px-1.5 py-0.2 rounded">
                            {pct}%
                          </span>
                        </div>
                      </div>

                      {/* Visual bar */}
                      <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#721B32] rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Gráfico de Barras - Finalización de Fase Virtual por Especialidad */}
      {(activeChartMode === 'ambos' || activeChartMode === 'especialidades') && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                Gráfico de Barras 2 · Rendimiento por Carrera Técnica
              </span>
              <h4 className="text-base font-bold text-stone-900 mt-0.5">
                Finalización de la Fase Virtual por Especialidad (70% del Modelo Híbrido)
              </h4>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-stone-400 inline-block"></span>
                <span className="text-stone-700">Módulo y Cuestionario Aprobado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block"></span>
                <span className="text-stone-700">Fase Virtual 100% (Carrera Sugerida)</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Compara cuántos alumnos han acreditado el contenido académico y cuestionario diagnóstico de cada academia, frente a cuántos concluyeron la fase virtual completa (100%) y fueron orientados a esa carrera como su opción prioritaria:
          </p>

          {/* Vertical / Horizontal Multi-Bar Chart per Specialty */}
          <div className="space-y-4">
            {(['programacion', 'comercio', 'rrhh', 'cosmetologia'] as SpecialtyId[]).map(specKey => {
              const spec = metrics.especialidadesStats[specKey];
              const pctQuiz = totalMatricula > 0 ? Math.round((spec.quizAprobados / totalMatricula) * 100) : 0;
              const pctFinalizados = totalMatricula > 0 ? Math.round((spec.finalizadosConSugerida / totalMatricula) * 100) : 0;

              return (
                <div key={specKey} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: spec.color }}></span>
                      <h5 className="text-sm font-bold text-stone-900">{spec.nombre}</h5>
                    </div>
                    <div className="text-xs font-mono-code text-stone-600">
                      Demanda final: <strong className="text-stone-900 font-bold">{spec.finalizadosConSugerida} alumnos</strong> ({pctFinalizados}%)
                    </div>
                  </div>

                  {/* Dual comparative bars */}
                  <div className="space-y-2">
                    {/* Bar 1: Cuestionario Aprobado */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1">
                        <span>Aprobación de Cuestionario de Academia:</span>
                        <span className="font-mono-code font-semibold">{spec.quizAprobados} alumnos ({pctQuiz}%)</span>
                      </div>
                      <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-stone-500 rounded-full transition-all duration-500"
                          style={{ width: `${pctQuiz}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Bar 2: Concluyeron 100% con esa especialidad sugerida */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-700 font-medium mb-1">
                        <span className="text-emerald-800 font-bold">Fase Virtual 100% Concluida con esta Especialidad Sugerida:</span>
                        <span className="font-mono-code font-bold text-emerald-800">{spec.finalizadosConSugerida} alumnos ({pctFinalizados}%)</span>
                      </div>
                      <div className="h-4 w-full bg-stone-200 rounded-full overflow-hidden border border-emerald-300">
                        <div
                          className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 text-[10px] text-white font-bold font-mono-code"
                          style={{
                            width: `${pctFinalizados}%`,
                            backgroundColor: spec.color
                          }}
                        >
                          {pctFinalizados > 10 ? `${pctFinalizados}%` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparative Summary Visual Grid */}
          <div className="pt-2">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-3">
              Resumen Gráfico de Orientación Vocacional Finalizada (Pase QR Emitido)
            </span>

            {/* Vertical column visualization */}
            <div className="grid grid-cols-4 gap-3 bg-stone-50/80 p-5 rounded-xl border border-stone-200 text-center">
              {(['programacion', 'comercio', 'rrhh', 'cosmetologia'] as SpecialtyId[]).map(key => {
                const sp = metrics.especialidadesStats[key];
                const heightPct = maxBarValue > 0 ? Math.round((sp.finalizadosConSugerida / maxBarValue) * 100) : 0;
                return (
                  <div key={key} className="flex flex-col items-center justify-end h-40">
                    <span className="text-xs font-bold font-mono-code text-stone-900 mb-1">
                      {sp.finalizadosConSugerida}
                    </span>
                    <div className="w-12 sm:w-16 bg-stone-200 rounded-t-lg h-28 flex items-end overflow-hidden">
                      <div
                        className="w-full rounded-t-lg transition-all duration-500"
                        style={{
                          height: `${Math.max(8, heightPct)}%`,
                          backgroundColor: sp.color
                        }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800 mt-2 truncate w-full">
                      {sp.nombre}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2B: Estadística Diagnóstica · Cosmetología (Test de 17 Reactivos) */}
      {(activeChartMode === 'ambos' || activeChartMode === 'especialidades') && (
        <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-pink-700 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-600" />
                Instrumento Diagnóstico Oficial · Academia de Cosmetología
              </span>
              <h4 className="text-base font-bold text-stone-900 mt-0.5">
                Estadística Vocacional de 17 Reactivos (16 Puntuables + Pregunta 4 Logística)
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Distribución automática por niveles de perfil vocacional, disponibilidad semanal de modelos para prácticas y dominio por bloque.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-lg text-right">
                <div className="text-[10px] uppercase tracking-wider text-pink-700 font-bold">Evaluados</div>
                <div className="text-sm font-bold font-mono-code text-pink-900">
                  {metrics.cosmetologiaDiagnostico.evaluados} / {totalMatricula}
                </div>
              </div>
              <div className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-right">
                <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Promedio Puntaje</div>
                <div className="text-sm font-bold font-mono-code text-stone-900">
                  {metrics.cosmetologiaDiagnostico.promedioPuntos} <span className="text-xs font-normal text-stone-500">/ 16 pts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Niveles de Perfil + Bloques I-V */}
            <div className="space-y-5">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-[#721B32]" />
                  Distribución por Nivel de Perfil Vocacional (sobre 16 pts)
                </h5>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[11px] font-bold text-emerald-800">Perfil Alto</div>
                    <div className="text-[10px] text-emerald-700 font-mono-code">13–16 pts</div>
                    <div className="text-xl font-bold font-mono-code text-emerald-900 mt-1">
                      {metrics.cosmetologiaDiagnostico.niveles.ALTO}
                    </div>
                    <div className="text-[10px] text-emerald-700 mt-0.5">
                      {metrics.cosmetologiaDiagnostico.evaluados > 0
                        ? Math.round((metrics.cosmetologiaDiagnostico.niveles.ALTO / metrics.cosmetologiaDiagnostico.evaluados) * 100)
                        : 0}% evaluados
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-[11px] font-bold text-amber-800">En Desarrollo</div>
                    <div className="text-[10px] text-amber-700 font-mono-code">9–12 pts</div>
                    <div className="text-xl font-bold font-mono-code text-amber-900 mt-1">
                      {metrics.cosmetologiaDiagnostico.niveles.EN_DESARROLLO}
                    </div>
                    <div className="text-[10px] text-amber-700 mt-0.5">
                      {metrics.cosmetologiaDiagnostico.evaluados > 0
                        ? Math.round((metrics.cosmetologiaDiagnostico.niveles.EN_DESARROLLO / metrics.cosmetologiaDiagnostico.evaluados) * 100)
                        : 0}% evaluados
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <div className="text-[11px] font-bold text-rose-800">Exploratorio</div>
                    <div className="text-[10px] text-rose-700 font-mono-code">0–8 pts</div>
                    <div className="text-xl font-bold font-mono-code text-rose-900 mt-1">
                      {metrics.cosmetologiaDiagnostico.niveles.EXPLORATORIO}
                    </div>
                    <div className="text-[10px] text-rose-700 mt-0.5">
                      {metrics.cosmetologiaDiagnostico.evaluados > 0
                        ? Math.round((metrics.cosmetologiaDiagnostico.niveles.EXPLORATORIO / metrics.cosmetologiaDiagnostico.evaluados) * 100)
                        : 0}% evaluados
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque I - V performance */}
              <div className="space-y-2.5 pt-1">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Desempeño por Bloque Diagnóstico (I a V)
                </h5>
                {metrics.cosmetologiaDiagnostico.bloques.map((bloque, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-stone-700">{bloque.nombre}</span>
                      <span className="font-mono-code font-bold text-stone-900">
                        {bloque.pct}% <span className="text-[10px] font-normal text-stone-500">({bloque.correctas}/{bloque.posibles})</span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-pink-600 rounded-full transition-all duration-500"
                        style={{ width: `${bloque.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pregunta 4 Logística (0 pts - No penaliza) */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    Pregunta 4 · Disponibilidad de Modelos (0 pts)
                  </h5>
                  <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    No penaliza puntaje
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  Conteo diagnóstico para planear prácticas semanales en cabina (meta: 4 modelos/semana). Las opciones C y D no afectan la calificación del estudiante.
                </p>

                <div className="space-y-3">
                  {[
                    { idx: 0, label: 'A) 4 modelos por semana (Meta completa)', color: 'bg-emerald-600', badge: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
                    { idx: 1, label: 'B) 2 a 3 modelos por semana', color: 'bg-blue-600', badge: 'text-blue-800 bg-blue-50 border-blue-200' },
                    { idx: 2, label: 'C) Solo 1 modelo por semana', color: 'bg-amber-500', badge: 'text-amber-800 bg-amber-50 border-amber-200' },
                    { idx: 3, label: 'D) Sin posibilidad actual de modelos', color: 'bg-rose-500', badge: 'text-rose-800 bg-rose-50 border-rose-200' }
                  ].map(opt => {
                    const count = metrics.cosmetologiaDiagnostico.modelosQ4[opt.idx] || 0;
                    const total = metrics.cosmetologiaDiagnostico.modelosTotal;
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={opt.idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs gap-2">
                          <span className="font-medium text-stone-800">{opt.label}</span>
                          <span className={`text-[11px] font-mono-code font-bold px-1.5 py-0.5 rounded border ${opt.badge}`}>
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${opt.color} rounded-full transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {metrics.cosmetologiaDiagnostico.requierenApoyoModelos > 0 ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Planeación Docente Sugerida:</strong>{' '}
                    <span className="font-mono-code font-bold">{metrics.cosmetologiaDiagnostico.requierenApoyoModelos}</span>{' '}
                    estudiante(s) respondieron opción C o D en disponibilidad de modelos. Se recomienda organizar{' '}
                    <strong>prácticas cruzadas entre pares</strong> o activar el <strong>banco de modelos voluntarios del plantel</strong>.
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  La cohorte evaluada cuenta con cobertura suficiente de modelos semanales (opciones A y B).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Embudo de Conversión de la Matrícula (Pipeline de Etapas 70/30) */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-stone-700" />
              Embudo Logístico Institucional (Pipeline 70% Virtual + 30% Presencial)
            </span>
            <h4 className="text-base font-bold text-stone-900 mt-0.5">
              Tasa de Retención y Avance por Etapas del Modelo Híbrido
            </h4>
          </div>
          <span className="text-xs font-mono-code text-stone-500">
            Feria 2026 · CETis 7
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {metrics.funnel.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800">
                  {idx + 1}. {step.label}
                </span>
                <span className="font-mono-code font-bold text-stone-900">
                  {step.count} de {totalMatricula} ({step.pct}%)
                </span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                <div
                  className={`h-full ${step.color} rounded-full transition-all duration-500`}
                  style={{ width: `${step.pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
