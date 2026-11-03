import React, { useState } from 'react';
import { BANCO_PREGUNTAS_VOCACIONALES } from '../data/mockData';
import { EvaluacionVocacional, SpecialtyId } from '../types';
import { VocationalRadar } from './VocationalRadar';
import { CheckCircle2, Compass, ArrowRight, RotateCcw, Zap, Sparkles } from 'lucide-react';
import { COMIC_ASSETS } from '../assets/comicAssets';

interface VocationalDiagnosticProps {
  numControl: string;
  evaluacionExistente: EvaluacionVocacional | null;
  onCompletar: (evaluacion: EvaluacionVocacional) => void;
}

export const VocationalDiagnostic: React.FC<VocationalDiagnosticProps> = ({
  numControl,
  evaluacionExistente,
  onCompletar
}) => {
  const [respuestasAptitudes, setRespuestasAptitudes] = useState<Record<number, SpecialtyId>>({});
  const [respuestasIntereses, setRespuestasIntereses] = useState<Record<number, SpecialtyId>>({});
  const [seccionActiva, setSeccionActiva] = useState<'intro' | 'aptitudes' | 'intereses' | 'resultado'>(
    evaluacionExistente ? 'resultado' : 'intro'
  );
  const [evaluacionActual, setEvaluacionActual] = useState<EvaluacionVocacional | null>(evaluacionExistente);

  const aptitudQuestions = BANCO_PREGUNTAS_VOCACIONALES.aptitudes;
  const interesQuestions = BANCO_PREGUNTAS_VOCACIONALES.intereses;

  const totalAptitudRespondidas = Object.keys(respuestasAptitudes).length;
  const totalInteresRespondidas = Object.keys(respuestasIntereses).length;

  const calcularResultados = () => {
    // Each career starts with base 0 points
    const aptitudesCount: Record<SpecialtyId, number> = { programacion: 0, comercio: 0, rrhh: 0, cosmetologia: 0 };
    const interesesCount: Record<SpecialtyId, number> = { programacion: 0, comercio: 0, rrhh: 0, cosmetologia: 0 };

    // 4 questions per section, each counts 25 pts
    Object.values(respuestasAptitudes).forEach(spec => {
      aptitudesCount[spec] += 25;
    });

    Object.values(respuestasIntereses).forEach(spec => {
      interesesCount[spec] += 25;
    });

    // Weighted composite score (50% Aptitud, 50% Interés)
    const careers: SpecialtyId[] = ['programacion', 'comercio', 'rrhh', 'cosmetologia'];
    const scores = careers.map(c => ({
      id: c,
      composite: aptitudesCount[c] * 0.5 + interesesCount[c] * 0.5,
      aptitud: aptitudesCount[c],
      gusto: interesesCount[c]
    }));

    // Sort descending
    scores.sort((a, b) => b.composite - a.composite);

    const primaria = scores[0].id;
    const secundaria = scores[1].id;

    // Build pedagogical narrative
    let narrativa = '';
    if (primaria === 'programacion') {
      narrativa = 'Tu perfil evidencia una destacada capacidad analítica, gusto por la solución sistemática de problemas complejos y alta compatibilidad con el modelado algorítmico y tecnológico.';
    } else if (primaria === 'comercio') {
      narrativa = 'Presentas una inclinación marcada hacia la visión estratégica, comprensión de dinámicas de intercambio comercial, geografía económica y negociación logística.';
    } else if (primaria === 'rrhh') {
      narrativa = 'Demuestras sólidas habilidades socioemocionales, sensibilidad hacia las relaciones humanas, sentido ético y vocación hacia la gestión y bienestar del talento laboral.';
    } else {
      narrativa = 'Tu perfil sobresale en precisión manual, observación sensorial fina, empatía con la salud cutánea de las personas y vocación hacia la dermocosmiatría y bienestar.';
    }

    const evaluacionFinal: EvaluacionVocacional = {
      num_control: numControl,
      score_aptitud_programacion: aptitudesCount.programacion,
      score_gusto_programacion: interesesCount.programacion,
      score_aptitud_comercio: aptitudesCount.comercio,
      score_gusto_comercio: interesesCount.comercio,
      score_aptitud_rrhh: aptitudesCount.rrhh,
      score_gusto_rrhh: interesesCount.rrhh,
      score_aptitud_cosmetologia: aptitudesCount.cosmetologia,
      score_gusto_cosmetologia: interesesCount.cosmetologia,
      carrera_sugerida: primaria,
      segunda_opcion: secundaria,
      analisis_pedagogico: narrativa,
      fecha_evaluacion: new Date().toISOString()
    };

    setEvaluacionActual(evaluacionFinal);
    setSeccionActiva('resultado');
    onCompletar(evaluacionFinal);
  };

  const nombreEspecialidad = (id: SpecialtyId) => {
    switch (id) {
      case 'programacion': return 'Programación';
      case 'comercio': return 'Comercio Internacional';
      case 'rrhh': return 'Administración de Recursos Humanos';
      case 'cosmetologia': return 'Cosmetología';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Header of Test Component */}
      <div className="p-5 border-b border-stone-200 bg-stone-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#721B32]/10 text-[#721B32] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Instrumento Psicopedagógico</span>
              <h3 className="text-lg font-bold text-stone-900">Reactivo Dual: Perfil Aptitudinal vs. Interés Personal</h3>
            </div>
          </div>
          {evaluacionActual && seccionActiva === 'resultado' && (
            <button
              onClick={() => {
                setRespuestasAptitudes({});
                setRespuestasIntereses({});
                setSeccionActiva('aptitudes');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reintentar Evaluación
            </button>
          )}
        </div>
      </div>

      {/* Screen 1: Introduction */}
      {seccionActiva === 'intro' && (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
          <div className="border border-stone-200 rounded-xl p-5 bg-stone-50/50 space-y-3">
            <h4 className="text-base font-semibold text-stone-900">¿Por qué es crucial diferenciar Aptitudes de Intereses?</h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              En el modelo formativo de la DGETI y el CETis No. 7, la elección de carrera técnica define tus submódulos profesionales de 2.° a 6.° semestre. A menudo existe confusión entre lo que a un estudiante <strong className="text-stone-900">le apasiona o gusta</strong> (Interés) y las destrezas operativas y lógicas para las cuales <strong className="text-stone-900">demuestra aptitud innata o desarrollada</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-xs font-bold text-[#721B32] block mb-1">1. PERFIL APTITUDINAL ("Para qué eres apto")</span>
                <span className="text-xs text-stone-600">Evalúa tu razonamiento lógico, destreza analítica, precisión manual y resolución de dilemas estructurados.</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-xs font-bold text-[#047857] block mb-1">2. INTERÉS PERSONAL ("Qué es lo que te gusta")</span>
                <span className="text-xs text-stone-600">Identifica tu ambiente ideal, temas que despiertan tu curiosidad cotidiana y proyección hacia el futuro laboral.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500">8 reactivos breves de elección múltiple · Duración aprox: 4 minutos</span>
            <button
              onClick={() => setSeccionActiva('aptitudes')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors flex items-center gap-2"
            >
              Iniciar Evaluación
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Aptitudes Section */}
      {seccionActiva === 'aptitudes' && (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs font-semibold text-[#721B32] uppercase tracking-wider">Fase 1 de 2: Perfil Aptitudinal</span>
              <h4 className="text-base font-semibold text-stone-900">Habilidades Prácticas y Resolución de Problemas</h4>
            </div>
            <span className="text-xs font-mono-code text-stone-500 font-medium">
              {totalAptitudRespondidas} de {aptitudQuestions.length} respondidas
            </span>
          </div>

          <div className="space-y-6">
            {aptitudQuestions.map((q, idx) => (
              <div key={q.id} className="space-y-3">
                <p className="text-sm font-medium text-stone-900">
                  <span className="font-semibold text-[#721B32] mr-1.5">{idx + 1}.</span>
                  {q.enunciado}
                </p>
                <div className="space-y-2">
                  {q.opciones.map((op, opIdx) => {
                    const isSelected = respuestasAptitudes[q.id] === op.specialty;
                    return (
                      <button
                        key={opIdx}
                        type="button"
                        onClick={() => setRespuestasAptitudes(prev => ({ ...prev, [q.id]: op.specialty as SpecialtyId }))}
                        className={`w-full text-left p-3 rounded-lg text-xs md:text-sm transition-all border ${
                          isSelected
                            ? 'bg-[#721B32]/5 border-[#721B32] text-stone-900 font-medium shadow-xs'
                            : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                            isSelected ? 'border-[#721B32] bg-[#721B32] text-white' : 'border-stone-400 bg-white'
                          }`}>
                            {isSelected ? '✓' : String.fromCharCode(65 + opIdx)}
                          </span>
                          <span>{op.texto}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-stone-200">
            <button
              disabled={totalAptitudRespondidas < aptitudQuestions.length}
              onClick={() => setSeccionActiva('intereses')}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors ${
                totalAptitudRespondidas === aptitudQuestions.length
                  ? 'bg-[#721B32] text-white hover:bg-[#5b1528]'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Continuar a Intereses Personales
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 3: Intereses Section */}
      {seccionActiva === 'intereses' && (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs font-semibold text-[#047857] uppercase tracking-wider">Fase 2 de 2: Interés Personal</span>
              <h4 className="text-base font-semibold text-stone-900">Preferencias, Ambientes y Proyección de Vida</h4>
            </div>
            <span className="text-xs font-mono-code text-stone-500 font-medium">
              {totalInteresRespondidas} de {interesQuestions.length} respondidas
            </span>
          </div>

          <div className="space-y-6">
            {interesQuestions.map((q, idx) => (
              <div key={q.id} className="space-y-3">
                <p className="text-sm font-medium text-stone-900">
                  <span className="font-semibold text-[#047857] mr-1.5">{idx + 5}.</span>
                  {q.enunciado}
                </p>
                <div className="space-y-2">
                  {q.opciones.map((op, opIdx) => {
                    const isSelected = respuestasIntereses[q.id] === op.specialty;
                    return (
                      <button
                        key={opIdx}
                        type="button"
                        onClick={() => setRespuestasIntereses(prev => ({ ...prev, [q.id]: op.specialty as SpecialtyId }))}
                        className={`w-full text-left p-3 rounded-lg text-xs md:text-sm transition-all border ${
                          isSelected
                            ? 'bg-[#047857]/5 border-[#047857] text-stone-900 font-medium shadow-xs'
                            : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                            isSelected ? 'border-[#047857] bg-[#047857] text-white' : 'border-stone-400 bg-white'
                          }`}>
                            {isSelected ? '✓' : String.fromCharCode(65 + opIdx)}
                          </span>
                          <span>{op.texto}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={() => setSeccionActiva('aptitudes')}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50"
            >
              Regresar a Aptitudes
            </button>
            <button
              disabled={totalInteresRespondidas < interesQuestions.length}
              onClick={calcularResultados}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors ${
                totalInteresRespondidas === interesQuestions.length
                  ? 'bg-[#047857] text-white hover:bg-[#03543d]'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Calcular Diagnóstico y Generar Radar
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 4: Results Display with Radar and Comic Spotlight */}
      {seccionActiva === 'resultado' && evaluacionActual && (
        <div className="p-6 space-y-6">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">Diagnóstico Vocacional Completado</span>
                <h4 className="text-base font-bold text-emerald-950">
                  Especialidad Sugerida: {nombreEspecialidad(evaluacionActual.carrera_sugerida)}
                </h4>
                {evaluacionActual.segunda_opcion && (
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Segunda alternativa por afinidad: <strong className="font-semibold">{nombreEspecialidad(evaluacionActual.segunda_opcion)}</strong>
                  </p>
                )}
              </div>
            </div>
            <div className="text-xs text-emerald-700 bg-white px-3 py-1.5 rounded-md border border-emerald-200 shadow-2xs">
              Registrado para el Número de Control: <span className="font-mono-code font-semibold">{numControl}</span>
            </div>
          </div>

          {/* Teen Comic Recommendation Spotlight */}
          {COMIC_ASSETS.especialidades[evaluacionActual.carrera_sugerida] && (
            <div className="rounded-2xl border-2 border-stone-800 bg-stone-900 text-white overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative h-56 md:h-auto overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-stone-800">
                <img
                  src={COMIC_ASSETS.especialidades[evaluacionActual.carrera_sugerida].image}
                  alt={nombreEspecialidad(evaluacionActual.carrera_sugerida)}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded shadow-sm uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  ¡TU CARRERA IDEAL!
                </div>
              </div>
              <div className="md:col-span-7 p-5 flex flex-col justify-between space-y-3 bg-gradient-to-br from-stone-900 to-stone-950">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Afinidad Psicopedagógica Detectada
                  </div>
                  <h3 className="text-lg font-black text-white">
                    {nombreEspecialidad(evaluacionActual.carrera_sugerida)}
                  </h3>
                  <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-stone-200 leading-relaxed font-medium">
                    "{COMIC_ASSETS.especialidades[evaluacionActual.carrera_sugerida].callout}"
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {evaluacionActual.analisis_pedagogico}
                  </p>
                </div>
                <div className="text-[11px] text-amber-200 font-mono-code">
                  Lema: {COMIC_ASSETS.especialidades[evaluacionActual.carrera_sugerida].motto}
                </div>
              </div>
            </div>
          )}

          <VocationalRadar evaluacion={evaluacionActual} />

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <span>Para validar tu 70% de la fase virtual, ahora explora los 4 módulos de carrera y responde sus cuestionarios de lectura.</span>
            <span className="font-medium text-stone-800 underline">Continúa abajo</span>
          </div>
        </div>
      )}
    </div>
  );
};
