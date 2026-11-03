import React, { useState, useEffect } from 'react';
import { 
  Estudiante, 
  AsistenciaPresencial, 
  ProgresoVirtual, 
  EvaluacionVocacional, 
  SpecialtyId 
} from '../types';
import { 
  getEstudiantes, 
  getAsistenciaPresencial, 
  saveAsistenciaPresencial, 
  getProgresoVirtual, 
  getEvaluacionVocacional, 
  parseTokenPayload 
} from '../services/storage';
import { RallyGames } from './RallyGames';
import { 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  MapPin, 
  Award, 
  Printer, 
  ShieldCheck, 
  Search,
  School,
  Zap,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMIC_ASSETS } from '../assets/comicAssets';

interface PresencialScannerProps {
  estudianteActivo?: Estudiante | null;
  onNavigateToDirection?: () => void;
}

export const PresencialScanner: React.FC<PresencialScannerProps> = ({ estudianteActivo, onNavigateToDirection }) => {
  const [tokenInput, setTokenInput] = useState<string>('');
  const [estudianteEscaneado, setEstudianteEscaneado] = useState<Estudiante | null>(null);
  const [progresoEscaneado, setProgresoEscaneado] = useState<ProgresoVirtual | null>(null);
  const [evaluacionEscaneada, setEvaluacionEscaneada] = useState<EvaluacionVocacional | null>(null);
  const [asistenciaActual, setAsistenciaActual] = useState<AsistenciaPresencial | null>(null);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
  const [activeStationTab, setActiveStationTab] = useState<SpecialtyId>('programacion');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const todosEstudiantes = getEstudiantes();

  // Load active student by default if they have a token
  useEffect(() => {
    if (!estudianteActivo?.num_control) return;
    const prog = getProgresoVirtual(estudianteActivo.num_control);
    if (prog.clave_unica_token) {
      setTokenInput(prog.clave_unica_token);
      validarToken(prog.clave_unica_token);
    }
  }, [estudianteActivo?.num_control]);

  const validarToken = (tokenToVerify: string) => {
    setErrorValidacion(null);
    const cleanToken = tokenToVerify.trim();
    if (!cleanToken) {
      setErrorValidacion('Por favor ingresa un token o número de control.');
      return;
    }

    // Try finding by token or NC directly
    let targetStudent: Estudiante | undefined;
    let targetProgreso: ProgresoVirtual | null = null;

    // Check if user entered a token
    const parsed = parseTokenPayload(cleanToken);
    if (parsed) {
      targetStudent = todosEstudiantes.find(e => e.num_control === parsed.numControl);
    }

    if (!targetStudent) {
      // maybe entered raw NC
      targetStudent = todosEstudiantes.find(e => e.num_control === cleanToken);
    }

    if (!targetStudent) {
      setErrorValidacion(`No se encontró ningún estudiante registrado con la clave o número de control: "${cleanToken}".`);
      return;
    }

    targetProgreso = getProgresoVirtual(targetStudent.num_control);

    // Verify 70% virtual completion requirement
    if (targetProgreso.estatus_fase_virtual !== 'COMPLETADO' || targetProgreso.porcentaje_virtual < 100) {
      setErrorValidacion(`ACCESO DENEGADO: El alumno ${targetStudent.nombre_completo} aún no concluye el 70% de la fase virtual (Avance: ${targetProgreso.porcentaje_virtual}%).`);
      setEstudianteEscaneado(targetStudent);
      setProgresoEscaneado(targetProgreso);
      setAsistenciaActual(null);
      return;
    }

    // Student is valid! Load or create AsistenciaPresencial
    const token = targetProgreso.clave_unica_token || cleanToken;
    let asistencia = getAsistenciaPresencial(token);

    if (!asistencia) {
      asistencia = {
        clave_unica_token: token,
        num_control: targetStudent.num_control,
        checkin_realizado: true,
        fecha_checkin: new Date().toISOString(),
        validado_por_tutor: true,
        nombre_tutor: 'Lic. Claudia Becerril (Mesa de Filtro DGETI)',
        retos_estaciones: {
          programacion: { completado: false },
          comercio: { completado: false },
          rrhh: { completado: false },
          cosmetologia: { completado: false }
        },
        estatus_final: 'EN_CIRCUITO'
      };
      saveAsistenciaPresencial(asistencia);
    }

    setEstudianteEscaneado(targetStudent);
    setProgresoEscaneado(targetProgreso);
    setEvaluacionEscaneada(getEvaluacionVocacional(targetStudent.num_control));
    setAsistenciaActual(asistencia);
  };

  const handleCompletarEstacion = (specialty: SpecialtyId, calificacion: 'EXCELENTE' | 'SATISFACTORIO' | 'COMPETENTE') => {
    if (!asistenciaActual) return;

    const evaluadores: Record<SpecialtyId, string> = {
      programacion: 'Ing. Marco Antonio Estrada',
      comercio: 'Lic. Claudia Becerril',
      rrhh: 'Mtra. Patricia Mendoza',
      cosmetologia: 'Cosmiatra Rosa Isela Romero'
    };

    const updatedAsistencia: AsistenciaPresencial = {
      ...asistenciaActual,
      retos_estaciones: {
        ...asistenciaActual.retos_estaciones,
        [specialty]: {
          completado: true,
          hora_completado: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          evaluador_nombre: evaluadores[specialty],
          calificacion_desempeno: calificacion
        }
      }
    };

    // Check if all 4 are completed
    const st = updatedAsistencia.retos_estaciones;
    const allDone = st.programacion.completado && st.comercio.completado && st.rrhh.completado && st.cosmetologia.completado;

    if (allDone) {
      updatedAsistencia.estatus_final = 'ACREDITADO';
      updatedAsistencia.fecha_acreditacion_final = new Date().toISOString();
      updatedAsistencia.subdirector_firmante = 'Mtro. José Luis Rodríguez Arredondo (Subdirector Académico)';
      
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe ignore
      }
    }

    saveAsistenciaPresencial(updatedAsistencia);
    setAsistenciaActual(updatedAsistencia);
  };

  const estacionesCompletadasCount = asistenciaActual ? [
    asistenciaActual.retos_estaciones.programacion.completado,
    asistenciaActual.retos_estaciones.comercio.completado,
    asistenciaActual.retos_estaciones.rrhh.completado,
    asistenciaActual.retos_estaciones.cosmetologia.completado
  ].filter(Boolean).length : 0;

  const isTotalmenteAcreditado = asistenciaActual?.estatus_final === 'ACREDITADO' || estacionesCompletadasCount === 4;

  return (
    <div className="space-y-6">
      {/* Comic Action Rally Banner for Teenagers */}
      <div className="relative rounded-2xl border-2 border-stone-800 bg-stone-900 text-white overflow-hidden shadow-lg">
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={COMIC_ASSETS.rally}
            alt="Rally Tecnológico CETis 7"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent flex flex-col justify-end p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Zap className="w-3.5 h-3.5 fill-current" />
                FASE PRESENCIAL (30%)
              </span>
              <span className="text-amber-200 text-xs font-mono-code font-bold">
                TALLERES Y LABORATORIOS CETis 7
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm font-serif-institutional">
              Rally de Retos Prácticos & Vivenciales
            </h2>
            <p className="text-xs text-stone-200 mt-1 max-w-2xl leading-relaxed">
              ¡Bienvenido al campus! Presenta tu Pase Digital QR en el módulo de entrada, recorre las 4 estaciones prácticas y sella tu acreditación técnica integral.
            </p>
          </div>
        </div>
      </div>

      {/* Scanner & Input Bar */}
      <div className="no-print bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#721B32] text-white flex items-center justify-center">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Filtro de Entrada y Registro Presencial</span>
              <h3 className="text-base font-bold text-stone-900">Validación de Token QR y Check-in en Plantel</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onNavigateToDirection && (
              <button
                onClick={onNavigateToDirection}
                className="px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Abrir editor de retos presenciales en Subdirección"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>⚙️ Editar Retos Presenciales</span>
              </button>
            )}
            <span className="text-xs text-stone-500 hidden sm:inline">
              Mesa de Aplicadores y Docentes Tutores · Edificio Central
            </span>
          </div>
        </div>

        {/* Input & Quick Selectors */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                placeholder="Escanea el código QR o ingresa la Clave Única Token / Núm. de Control..."
                className="w-full pl-9 pr-4 py-2.5 text-xs md:text-sm font-mono-code bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#721B32] focus:bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
            <button
              onClick={() => validarToken(tokenInput)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4" />
              Validar Acceso
            </button>
            <button
              onClick={() => setIsCameraActive(!isCameraActive)}
              className="px-3.5 py-2.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Scan className="w-4 h-4" />
              {isCameraActive ? 'Cerrar Cámara' : 'Escanear QR'}
            </button>
          </div>

          {/* Camera Simulated Viewfinder */}
          {isCameraActive && (
            <div className="p-4 bg-stone-900 rounded-xl text-center text-white space-y-3">
              <div className="relative w-64 h-48 mx-auto border-2 border-dashed border-emerald-400 rounded-lg flex items-center justify-center bg-stone-800">
                <div className="absolute inset-x-4 top-1/2 h-0.5 bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-stone-300">Enfoca el Pase QR del Alumno</span>
              </div>
              <p className="text-xs text-stone-400">
                Cámara lista. Selecciona un alumno de prueba abajo para simular lectura instantánea de su código QR:
              </p>
            </div>
          )}

          {/* Quick tester pills for demo */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] text-stone-500 font-medium">Probar rápido con alumno:</span>
            {todosEstudiantes.map(est => {
              const prog = getProgresoVirtual(est.num_control);
              const isVirtualDone = prog.estatus_fase_virtual === 'COMPLETADO';
              return (
                <button
                  key={est.num_control}
                  type="button"
                  onClick={() => {
                    const tok = prog.clave_unica_token || est.num_control;
                    setTokenInput(tok);
                    validarToken(tok);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                    estudianteEscaneado?.num_control === est.num_control
                      ? 'bg-[#721B32] text-white border-[#721B32] font-semibold'
                      : isVirtualDone
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  {est.nombre_completo.split(' ')[0]} ({est.grupo}) · {isVirtualDone ? '✓ 70% Listo' : 'Pendiente'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation Error Message */}
        {errorValidacion && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Aviso del Filtro de Acceso:</span> {errorValidacion}
            </div>
          </div>
        )}
      </div>

      {/* Validated Student Summary & Circuit */}
      {estudianteEscaneado && asistenciaActual && (
        <div className="space-y-6">
          {/* Header Card of the verified student */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#721B32]/10 text-[#721B32] font-bold flex items-center justify-center text-base border border-[#721B32]/20 shrink-0">
                  {estudianteEscaneado.nombre_completo.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Check-in Confirmado
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs text-stone-500 font-mono-code">Fase Virtual 70% Validada</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{estudianteEscaneado.nombre_completo}</h3>
                  <div className="text-xs text-stone-600 flex items-center gap-3 mt-0.5 font-mono-code flex-wrap">
                    <span>NC: {estudianteEscaneado.num_control}</span>
                    <span>·</span>
                    <span>Grupo: {estudianteEscaneado.grupo}</span>
                    <span>·</span>
                    <span>Turno: {estudianteEscaneado.turno}</span>
                  </div>
                  <div className="text-[11px] text-stone-600 mt-1 flex items-center gap-2">
                    <span className="font-semibold text-stone-800">Tutor:</span>
                    <span>{estudianteEscaneado.tutor?.nombre_tutor || 'No asignado'} ({estudianteEscaneado.tutor?.parentesco})</span>
                    <span className="text-stone-300">·</span>
                    <span className={`px-1.5 py-0.2 rounded font-mono-code text-[10px] font-bold ${
                      estudianteEscaneado.tutor?.verificado ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {estudianteEscaneado.tutor?.verificado ? '✓ Correo Verificado & Firmado' : '⚠️ Sin Firma de Tutor'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress in presencial challenges */}
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-right">
                <span className="text-stone-500 text-[11px] block">Retos Lúdicos Presenciales:</span>
                <span className="font-bold text-stone-900 text-sm">
                  {estacionesCompletadasCount} de 4 Estaciones Selladas
                </span>
                <div className="w-36 h-2 bg-stone-200 rounded-full mt-1.5 overflow-hidden ml-auto">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${(estacionesCompletadasCount / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Circuit of the 4 Presencial Stations */}
          <div className="no-print bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Circuito de Retos en Plantel (30%)</span>
                <h4 className="text-base font-bold text-stone-900">Hoja de Ruta de Estaciones Lúdicas</h4>
              </div>
              <span className="text-xs text-stone-500">
                15 minutos por academia en taller/laboratorio
              </span>
            </div>

            {/* Station Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 p-2 gap-2 bg-stone-100/50 border-b border-stone-200">
              {[
                { id: 'programacion', name: '1. Programación', label: 'Escape Room Algoritmo', status: asistenciaActual.retos_estaciones.programacion },
                { id: 'comercio', name: '2. Comercio Int.', label: 'Rally Aduanero', status: asistenciaActual.retos_estaciones.comercio },
                { id: 'rrhh', name: '3. Recursos Humanos', label: 'Match Laboral', status: asistenciaActual.retos_estaciones.rrhh },
                { id: 'cosmetologia', name: '4. Cosmetología', label: 'Taller Sensorial', status: asistenciaActual.retos_estaciones.cosmetologia }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setActiveStationTab(st.id as SpecialtyId)}
                  className={`p-2.5 rounded-lg text-left transition-all border ${
                    activeStationTab === st.id
                      ? 'bg-white border-[#721B32] shadow-xs'
                      : 'bg-white/50 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-stone-800">{st.name}</span>
                    {st.status.completado ? (
                      <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 font-bold text-[10px]">
                        ✓ Sellado
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[10px]">Pendiente</span>
                    )}
                  </div>
                  <div className="text-[10px] text-stone-500 truncate">{st.label}</div>
                </button>
              ))}
            </div>

            {/* Active Station Interactive Game */}
            <div className="p-6">
              <RallyGames
                specialtyId={activeStationTab}
                onCompletarReto={calif => handleCompletarEstacion(activeStationTab, calif)}
                yaCompletado={asistenciaActual.retos_estaciones[activeStationTab].completado}
              />
            </div>
          </div>

          {/* Printable Official Accreditation (100% Virtual + Presencial) */}
          {isTotalmenteAcreditado && (
            <div className="space-y-4">
              <div className="no-print flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold">Acreditación Integral Concluida</span>
                    <h4 className="text-base font-bold text-emerald-950">
                      Cédula Oficial 100% (70% Virtual + 30% Presencial) Lista para Firma
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir Cédula Oficial DGETI
                </button>
              </div>

              {/* Official Credential for Printing */}
              <div className="bg-white rounded-2xl border-2 border-stone-400 p-8 max-w-2xl mx-auto shadow-md print-shadow-none print-border print-break-inside-avoid">
                {/* Official Institutional Header */}
                <div className="text-center border-b-2 border-[#721B32] pb-4 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                    <span>SECRETARÍA DE EDUCACIÓN PÚBLICA</span>
                    <span>SEMS · DGETI CDMX</span>
                  </div>
                  <h2 className="text-base md:text-lg font-extrabold text-stone-900 tracking-tight uppercase">
                    Centro de Estudios Tecnológicos industrial y de servicios No. 7
                  </h2>
                  <div className="text-xs font-serif-institutional italic text-stone-700">
                    "Miguel Lerdo de Tejada" · Cuautepec, Gustavo A. Madero, CDMX
                  </div>
                  <div className="text-xs font-bold text-[#721B32] tracking-wider uppercase pt-1">
                    CÉDULA DE ACREDITACIÓN INTEGRAL Y ELECCIÓN VOCACIONAL
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono-code">
                    FERIA DE ESPECIALIDADES E INNOVACIÓN TECNOLÓGICA 2026
                  </div>
                </div>

                {/* Body Content */}
                <div className="py-6 space-y-5 text-xs text-stone-800 leading-relaxed">
                  <p>
                    La Subdirección Académica y el Comité de Orientación Vocacional del <strong>CETis No. 7</strong> hacen constar que el (la) estudiante:
                  </p>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 text-center space-y-1">
                    <h3 className="text-base font-bold text-stone-950 uppercase">{estudianteEscaneado.nombre_completo}</h3>
                    <div className="flex items-center justify-center gap-4 text-xs font-mono-code text-stone-600">
                      <span>NÚMERO DE CONTROL: <strong>{estudianteEscaneado.num_control}</strong></span>
                      <span>·</span>
                      <span>GRUPO: <strong>{estudianteEscaneado.grupo}</strong></span>
                      <span>·</span>
                      <span>TURNO: <strong>{estudianteEscaneado.turno}</strong></span>
                    </div>
                  </div>

                  <p>
                    Ha cumplido satisfactoriamente con la totalidad de los requerimientos técnico-pedagógicos del <strong>Modelo Híbrido 2026</strong>:
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <span className="font-bold text-[#721B32] block mb-1">FASE VIRTUAL (70%):</span>
                      <div>• Test Diagnóstico Aptitud vs. Interés: <strong>100%</strong></div>
                      <div>• 4 Módulos Académicos Aprobados</div>
                      <div>• Promedio de Cuestionarios: <strong>{progresoEscaneado?.promedio_cuestionarios || 95} pts</strong></div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <span className="font-bold text-[#047857] block mb-1">FASE PRESENCIAL (30%):</span>
                      <div>• 4 Retos Lúdicos Concluidos en Taller</div>
                      <div>• Escape Room Algoritmo: Acreditado</div>
                      <div>• Rally Aduanero y Match Laboral: Acreditado</div>
                      <div>• Taller Sensorial Cutáneo: Acreditado</div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                    <span className="text-[11px] uppercase tracking-wider text-amber-900 font-semibold block">
                      Dictamen Vocacional Sugerido:
                    </span>
                    <span className="text-sm font-bold text-amber-950 uppercase">
                      TÉCNICO EN {evaluacionEscaneada?.carrera_sugerida.toUpperCase() || 'PROGRAMACIÓN'}
                    </span>
                  </div>

                  {/* Official Signatures & Seal */}
                  <div className="pt-8 grid grid-cols-2 gap-8 text-center text-[11px]">
                    <div className="space-y-1">
                      <div className="border-b border-stone-400 w-44 mx-auto mb-2"></div>
                      <div className="font-bold text-stone-900">Lic. Claudia Becerril Morales</div>
                      <div className="text-stone-500">Docente Tutor / Verificador de Acceso</div>
                    </div>

                    <div className="space-y-1">
                      <div className="border-b border-stone-400 w-44 mx-auto mb-2"></div>
                      <div className="font-bold text-stone-900">Mtro. José Luis Rodríguez Arredondo</div>
                      <div className="text-stone-500">Subdirector Académico CETis 7</div>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-stone-400 font-mono-code pt-4 border-t border-stone-200">
                    SELLO DIGITAL DGETI: {asistenciaActual.clave_unica_token} · VALIDACIÓN PRESENCIAL REGISTRADA
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
