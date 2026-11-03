import { Estudiante, EvaluacionVocacional, ProgresoVirtual, AsistenciaPresencial, FichaAcademiaReq, OficioCircular, SpecialtyId, DocenteAutorizado } from '../types';
import { ESTUDIANTES_INICIALES, FICHAS_ACADEMIA_DEFAULT, OFICIO_CIRCULAR_DEFAULT } from '../data/mockData';
import { cloudSaveEstudiante, cloudSaveDocente } from './firebase';

const STORAGE_KEYS = {
  ESTUDIANTES: 'cetis7_estudiantes',
  EVALUACIONES: 'cetis7_evaluaciones',
  PROGRESOS: 'cetis7_progresos_virtuales',
  ASISTENCIAS: 'cetis7_asistencias_presenciales',
  FICHAS: 'cetis7_fichas_academia',
  OFICIO: 'cetis7_oficio_circular',
  ESTUDIANTE_ACTIVO: 'cetis7_estudiante_activo_nc',
  SESION_ACTIVA: 'cetis7_sesion_activa',
  DOCENTES: 'cetis7_docentes_autorizados'
};

export const DOCENTES_INICIALES: DocenteAutorizado[] = [
  {
    id: 'DOC-2026-001',
    nombre_completo: 'Ing. Marco Antonio Estrada Ruiz',
    rfc: 'EASM780412HDF',
    correo_institucional: 'marco.estrada@cetis7.edu.mx',
    academia: 'programacion',
    rol: 'Jefe de Academia',
    clave_acceso: 'PROG2026',
    estatus_autorizacion: 'AUTORIZADO',
    fecha_alta: '2026-01-10T09:00:00.000Z',
    registrado_por: 'Administrador DGETI'
  },
  {
    id: 'DOC-2026-002',
    nombre_completo: 'Lic. Claudia Becerril Hernández',
    rfc: 'BECC820915MDF',
    correo_institucional: 'claudia.becerril@cetis7.edu.mx',
    academia: 'comercio',
    rol: 'Profesor Titular',
    clave_acceso: 'COM2026',
    estatus_autorizacion: 'AUTORIZADO',
    fecha_alta: '2026-01-12T10:30:00.000Z',
    registrado_por: 'Administrador DGETI'
  },
  {
    id: 'DOC-2026-003',
    nombre_completo: 'Mtra. Patricia Mendoza Paredes',
    rfc: 'MEMP751108HDF',
    correo_institucional: 'patricia.mendoza@cetis7.edu.mx',
    academia: 'rrhh',
    rol: 'Profesor Titular',
    clave_acceso: 'RRHH2026',
    estatus_autorizacion: 'AUTORIZADO',
    fecha_alta: '2026-01-15T11:00:00.000Z',
    registrado_por: 'Administrador DGETI'
  },
  {
    id: 'DOC-2026-004',
    nombre_completo: 'Cosmiatra Rosa Isela Romero Vargas',
    rfc: 'RORR850320MDF',
    correo_institucional: 'rosa.romero@cetis7.edu.mx',
    academia: 'cosmetologia',
    rol: 'Jefe de Academia',
    clave_acceso: 'COSM2026',
    estatus_autorizacion: 'AUTORIZADO',
    fecha_alta: '2026-01-18T14:20:00.000Z',
    registrado_por: 'Administrador DGETI'
  }
];

// Simple deterministic hash for demo token generation
export function generateHashShort(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase();
  return hex.padStart(4, '0').slice(-4);
}

export function generateClaveUnicaToken(numControl: string, timestamp: number = Date.now()): string {
  const tsSeconds = Math.floor(timestamp / 1000);
  const hash = generateHashShort(`${numControl}-${tsSeconds}-CETIS7-DGETI`);
  return `${numControl}-${tsSeconds}-${hash}`;
}

export function parseTokenPayload(token: string): { numControl: string; timestamp: number } | null {
  try {
    const parts = token.split('-');
    if (parts.length >= 3) {
      return {
        numControl: parts[0],
        timestamp: parseInt(parts[1], 10) * 1000
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Initial state builder
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.DOCENTES)) {
    localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify(DOCENTES_INICIALES));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ESTUDIANTES)) {

    localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify(ESTUDIANTES_INICIALES));

    const gaelNC = ESTUDIANTES_INICIALES[0].num_control; // 26316070010042
    const valeriaNC = ESTUDIANTES_INICIALES[1].num_control; // 26316070010118
    const diegoNC = ESTUDIANTES_INICIALES[2].num_control; // 26316070010205
    const ximenaNC = ESTUDIANTES_INICIALES[3].num_control; // 26316070010312
    const mateoNC = ESTUDIANTES_INICIALES[4].num_control; // 26316070010419
    const camilaNC = ESTUDIANTES_INICIALES[5].num_control; // 26316070010523
    const leonardoNC = ESTUDIANTES_INICIALES[6].num_control; // 26316070010631
    const renataNC = ESTUDIANTES_INICIALES[7].num_control; // 26316070010744

    const gaelToken = generateClaveUnicaToken(gaelNC, Date.now() - 3600000);
    const valeriaToken = generateClaveUnicaToken(valeriaNC, Date.now() - 7200000);
    const diegoToken = generateClaveUnicaToken(diegoNC, Date.now() - 10800000);
    const ximenaToken = generateClaveUnicaToken(ximenaNC, Date.now() - 14400000);
    const leonardoToken = generateClaveUnicaToken(leonardoNC, Date.now() - 18000000);
    const renataToken = generateClaveUnicaToken(renataNC, Date.now() - 21600000);

    const defaultEvaluaciones: Record<string, EvaluacionVocacional> = {
      [gaelNC]: {
        num_control: gaelNC,
        score_aptitud_programacion: 100,
        score_gusto_programacion: 100,
        score_aptitud_comercio: 50,
        score_gusto_comercio: 25,
        score_aptitud_rrhh: 50,
        score_gusto_rrhh: 25,
        score_aptitud_cosmetologia: 25,
        score_gusto_cosmetologia: 25,
        carrera_sugerida: 'programacion',
        segunda_opcion: 'comercio',
        analisis_pedagogico: 'Excelente aptitud analítica y razonamiento lógico formal. Alta orientación vocacional congruente con desarrollo de software y computación.',
        fecha_evaluacion: new Date(Date.now() - 86400000).toISOString()
      },
      [valeriaNC]: {
        num_control: valeriaNC,
        score_aptitud_programacion: 25,
        score_gusto_programacion: 50,
        score_aptitud_comercio: 100,
        score_gusto_comercio: 100,
        score_aptitud_rrhh: 75,
        score_gusto_rrhh: 50,
        score_aptitud_cosmetologia: 25,
        score_gusto_cosmetologia: 25,
        carrera_sugerida: 'comercio',
        segunda_opcion: 'rrhh',
        analisis_pedagogico: 'Destacada visión en logística aduanera, intercambio económico global y cálculo arancelario.',
        fecha_evaluacion: new Date(Date.now() - 80000000).toISOString()
      },
      [diegoNC]: {
        num_control: diegoNC,
        score_aptitud_programacion: 25,
        score_gusto_programacion: 25,
        score_aptitud_comercio: 50,
        score_gusto_comercio: 50,
        score_aptitud_rrhh: 100,
        score_gusto_rrhh: 100,
        score_aptitud_cosmetologia: 25,
        score_gusto_cosmetologia: 50,
        carrera_sugerida: 'rrhh',
        segunda_opcion: 'comercio',
        analisis_pedagogico: 'Fuerte perfil humanista, liderazgo asertivo y aptitud para el desarrollo del talento humano y clima laboral NOM-035.',
        fecha_evaluacion: new Date(Date.now() - 75000000).toISOString()
      },
      [ximenaNC]: {
        num_control: ximenaNC,
        score_aptitud_programacion: 25,
        score_gusto_programacion: 25,
        score_aptitud_comercio: 25,
        score_gusto_comercio: 25,
        score_aptitud_rrhh: 50,
        score_gusto_rrhh: 50,
        score_aptitud_cosmetologia: 100,
        score_gusto_cosmetologia: 100,
        carrera_sugerida: 'cosmetologia',
        segunda_opcion: 'rrhh',
        analisis_pedagogico: 'Sobresaliente destreza manual fina, apreciación de biotipos cutáneos e inclinación vocacional hacia la dermocosmiatría.',
        fecha_evaluacion: new Date(Date.now() - 70000000).toISOString()
      },
      [mateoNC]: {
        num_control: mateoNC,
        score_aptitud_programacion: 75,
        score_gusto_programacion: 100,
        score_aptitud_comercio: 50,
        score_gusto_comercio: 50,
        score_aptitud_rrhh: 25,
        score_gusto_rrhh: 25,
        score_aptitud_cosmetologia: 25,
        score_gusto_cosmetologia: 25,
        carrera_sugerida: 'programacion',
        segunda_opcion: 'comercio',
        analisis_pedagogico: 'Interés activo en lógica computacional y desarrollo web.',
        fecha_evaluacion: new Date(Date.now() - 50000000).toISOString()
      },
      [camilaNC]: {
        num_control: camilaNC,
        score_aptitud_programacion: 25,
        score_gusto_programacion: 25,
        score_aptitud_comercio: 25,
        score_gusto_comercio: 25,
        score_aptitud_rrhh: 50,
        score_gusto_rrhh: 75,
        score_aptitud_cosmetologia: 75,
        score_gusto_cosmetologia: 100,
        carrera_sugerida: 'cosmetologia',
        segunda_opcion: 'rrhh',
        analisis_pedagogico: 'Sensibilidad por la química cosmética y tratamientos faciales.',
        fecha_evaluacion: new Date(Date.now() - 40000000).toISOString()
      },
      [leonardoNC]: {
        num_control: leonardoNC,
        score_aptitud_programacion: 100,
        score_gusto_programacion: 75,
        score_aptitud_comercio: 50,
        score_gusto_comercio: 50,
        score_aptitud_rrhh: 25,
        score_gusto_rrhh: 25,
        score_aptitud_cosmetologia: 25,
        score_gusto_cosmetologia: 25,
        carrera_sugerida: 'programacion',
        segunda_opcion: 'comercio',
        analisis_pedagogico: 'Capacidad lógica superior con afinidad en bases de datos.',
        fecha_evaluacion: new Date(Date.now() - 30000000).toISOString()
      },
      [renataNC]: {
        num_control: renataNC,
        score_aptitud_programacion: 25,
        score_gusto_programacion: 25,
        score_aptitud_comercio: 100,
        score_gusto_comercio: 100,
        score_aptitud_rrhh: 50,
        score_gusto_rrhh: 50,
        score_aptitud_cosmetologia: 25,
        score_gusto_cosmetologia: 25,
        carrera_sugerida: 'comercio',
        segunda_opcion: 'rrhh',
        analisis_pedagogico: 'Aptitud sobresaliente para negociación internacional y transporte multimodal.',
        fecha_evaluacion: new Date(Date.now() - 20000000).toISOString()
      }
    };

    const allFinishedSpecs = {
      programacion: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 100 },
      comercio: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 100 },
      rrhh: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 80 },
      cosmetologia: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 100 }
    };

    const defaultProgresos: Record<string, ProgresoVirtual> = {
      [gaelNC]: {
        num_control: gaelNC,
        test_vocacional_completado: true,
        progreso_especialidades: allFinishedSpecs,
        porcentaje_virtual: 100,
        promedio_cuestionarios: 95.0,
        clave_unica_token: gaelToken,
        estatus_fase_virtual: 'COMPLETADO',
        fecha_termino: new Date(Date.now() - 3600000).toISOString()
      },
      [valeriaNC]: {
        num_control: valeriaNC,
        test_vocacional_completado: true,
        progreso_especialidades: allFinishedSpecs,
        porcentaje_virtual: 100,
        promedio_cuestionarios: 98.0,
        clave_unica_token: valeriaToken,
        estatus_fase_virtual: 'COMPLETADO',
        fecha_termino: new Date(Date.now() - 7200000).toISOString()
      },
      [diegoNC]: {
        num_control: diegoNC,
        test_vocacional_completado: true,
        progreso_especialidades: allFinishedSpecs,
        porcentaje_virtual: 100,
        promedio_cuestionarios: 92.0,
        clave_unica_token: diegoToken,
        estatus_fase_virtual: 'COMPLETADO',
        fecha_termino: new Date(Date.now() - 10800000).toISOString()
      },
      [ximenaNC]: {
        num_control: ximenaNC,
        test_vocacional_completado: true,
        progreso_especialidades: allFinishedSpecs,
        porcentaje_virtual: 100,
        promedio_cuestionarios: 96.0,
        clave_unica_token: ximenaToken,
        estatus_fase_virtual: 'COMPLETADO',
        fecha_termino: new Date(Date.now() - 14400000).toISOString()
      },
      [mateoNC]: {
        num_control: mateoNC,
        test_vocacional_completado: true,
        progreso_especialidades: {
          programacion: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 80 },
          comercio: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 80 },
          rrhh: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
          cosmetologia: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 }
        },
        porcentaje_virtual: 60,
        promedio_cuestionarios: 80.0,
        clave_unica_token: '',
        estatus_fase_virtual: 'EN_PROCESO'
      },
      [camilaNC]: {
        num_control: camilaNC,
        test_vocacional_completado: true,
        progreso_especialidades: {
          programacion: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
          comercio: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
          rrhh: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
          cosmetologia: { video_visto: true, infografia_explorada: true, proyectos_revisados: true, quiz_aprobado: true, calificacion_quiz: 100 }
        },
        porcentaje_virtual: 40,
        promedio_cuestionarios: 100.0,
        clave_unica_token: '',
        estatus_fase_virtual: 'EN_PROCESO'
      },
      [leonardoNC]: {
        num_control: leonardoNC,
        test_vocacional_completado: true,
        progreso_especialidades: allFinishedSpecs,
        porcentaje_virtual: 100,
        promedio_cuestionarios: 90.0,
        clave_unica_token: leonardoToken,
        estatus_fase_virtual: 'COMPLETADO',
        fecha_termino: new Date(Date.now() - 18000000).toISOString()
      },
      [renataNC]: {
        num_control: renataNC,
        test_vocacional_completado: true,
        progreso_especialidades: allFinishedSpecs,
        porcentaje_virtual: 100,
        promedio_cuestionarios: 94.0,
        clave_unica_token: renataToken,
        estatus_fase_virtual: 'COMPLETADO',
        fecha_termino: new Date(Date.now() - 21600000).toISOString()
      }
    };

    const defaultAsistencias: Record<string, AsistenciaPresencial> = {
      [gaelToken]: {
        clave_unica_token: gaelToken,
        num_control: gaelNC,
        checkin_realizado: true,
        fecha_checkin: new Date(Date.now() - 1800000).toISOString(),
        validado_por_tutor: true,
        nombre_tutor: 'Lic. Martha Elena Solís (Tutor 1°A)',
        retos_estaciones: {
          programacion: { completado: true, hora_completado: '10:15 AM', evaluador_nombre: 'Ing. Marco Antonio Estrada', calificacion_desempeno: 'EXCELENTE' },
          comercio: { completado: true, hora_completado: '10:35 AM', evaluador_nombre: 'Lic. Claudia Becerril', calificacion_desempeno: 'SATISFACTORIO' },
          rrhh: { completado: false },
          cosmetologia: { completado: false }
        },
        estatus_final: 'EN_CIRCUITO'
      },
      [valeriaToken]: {
        clave_unica_token: valeriaToken,
        num_control: valeriaNC,
        checkin_realizado: true,
        fecha_checkin: new Date(Date.now() - 3600000).toISOString(),
        validado_por_tutor: true,
        nombre_tutor: 'Lic. Claudia Becerril (Tutor 1°B)',
        retos_estaciones: {
          programacion: { completado: true, hora_completado: '09:30 AM', evaluador_nombre: 'Ing. Marco Antonio Estrada', calificacion_desempeno: 'EXCELENTE' },
          comercio: { completado: true, hora_completado: '09:50 AM', evaluador_nombre: 'Lic. Claudia Becerril', calificacion_desempeno: 'EXCELENTE' },
          rrhh: { completado: true, hora_completado: '10:10 AM', evaluador_nombre: 'Mtra. Patricia Mendoza', calificacion_desempeno: 'EXCELENTE' },
          cosmetologia: { completado: true, hora_completado: '10:30 AM', evaluador_nombre: 'Cosmiatra Rosa Isela Romero', calificacion_desempeno: 'EXCELENTE' }
        },
        fecha_acreditacion_final: new Date(Date.now() - 1800000).toISOString(),
        subdirector_firmante: 'Mtro. José Luis Rodríguez Arredondo',
        estatus_final: 'ACREDITADO'
      }
    };

    localStorage.setItem(STORAGE_KEYS.EVALUACIONES, JSON.stringify(defaultEvaluaciones));
    localStorage.setItem(STORAGE_KEYS.PROGRESOS, JSON.stringify(defaultProgresos));
    localStorage.setItem(STORAGE_KEYS.ASISTENCIAS, JSON.stringify(defaultAsistencias));
    localStorage.setItem(STORAGE_KEYS.FICHAS, JSON.stringify(FICHAS_ACADEMIA_DEFAULT));
    localStorage.setItem(STORAGE_KEYS.OFICIO, JSON.stringify(OFICIO_CIRCULAR_DEFAULT));
    localStorage.setItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO, gaelNC);
  }
}

// Data access helpers
export function getEstudiantes(): Estudiante[] {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.ESTUDIANTES);
  let list: Estudiante[] = raw ? JSON.parse(raw) : ESTUDIANTES_INICIALES;
  
  // Ensure backward compatibility if stored prior to tutor fields
  let updated = false;
  list = list.map(e => {
    if (!e.tutor) {
      const match = ESTUDIANTES_INICIALES.find(i => i.num_control === e.num_control);
      e.tutor = match?.tutor || {
        nombre_tutor: 'Tutor Legal Familiar',
        parentesco: 'Padre',
        correo_tutor: `tutor.${e.num_control.slice(-4)}@gmail.com`,
        telefono_tutor: '55 1234 5678',
        verificado: false
      };
      updated = true;
    }
    return e;
  });

  if (updated) {
    localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify(list));
  }
  return list;
}

export function getEstudianteByNC(nc: string): Estudiante | null {
  const list = getEstudiantes();
  return list.find(e => e.num_control === nc) || null;
}

export function getEstudianteByCURP(curp: string): Estudiante | null {
  const list = getEstudiantes();
  const clean = curp.trim().toUpperCase();
  return list.find(e => e.curp.trim().toUpperCase() === clean) || null;
}

export function validarCURP(curp: string): { valido: boolean; mensaje?: string } {
  const clean = curp.trim().toUpperCase();
  if (!clean) {
    return { valido: false, mensaje: 'La CURP es obligatoria.' };
  }
  if (clean.length !== 18) {
    return { valido: false, mensaje: `La CURP debe tener exactamente 18 caracteres (actualmente tiene ${clean.length}).` };
  }
  // Standard Mexican CURP format: 4 letters + 6 digits (YYMMDD) + H/M + 5 letters + 1 letter/digit + 1 digit
  const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
  if (!regex.test(clean)) {
    return { valido: false, mensaje: 'El formato de la CURP es inválido (ejemplo: LOVM090412HDFRLA01).' };
  }
  return { valido: true };
}

export function registrarNuevoEstudiante(estudiante: Estudiante): { 
  success: boolean; 
  error?: string; 
  estudiante?: Estudiante 
} {
  initializeStorage();
  const cleanCurp = estudiante.curp.trim().toUpperCase();
  const cleanNC = estudiante.num_control.trim();

  // Validate format
  const curpCheck = validarCURP(cleanCurp);
  if (!curpCheck.valido) {
    return { success: false, error: curpCheck.mensaje };
  }

  // 1. Strict Uniqueness Check by CURP
  const existingByCurp = getEstudianteByCURP(cleanCurp);
  if (existingByCurp) {
    return { 
      success: false, 
      error: `La CURP "${cleanCurp}" ya está registrada en el padrón del CETis No. 7 a nombre de ${existingByCurp.nombre_completo} (Núm. Control: ${existingByCurp.num_control}). Por normatividad de la DGETI y control de matrícula, solo se permite un único registro por alumno. Si eres este alumno, ingresa directamente con tu CURP.` 
    };
  }

  // 2. Strict Uniqueness Check by Num. Control
  const existingByNC = getEstudianteByNC(cleanNC);
  if (existingByNC) {
    return { 
      success: false, 
      error: `El Número de Control "${cleanNC}" ya se encuentra asignado a ${existingByNC.nombre_completo}. Verifica tu número escolar o solicita apoyo a Control Escolar.` 
    };
  }

  // Normalize student data
  const normalized: Estudiante = {
    ...estudiante,
    curp: cleanCurp,
    num_control: cleanNC,
    correo_institucional: estudiante.correo_institucional || `${estudiante.nombre_completo.split(' ')[0].toLowerCase()}.${cleanNC.slice(-4)}@cetis7.edu.mx`
  };

  saveEstudiante(normalized);
  setEstudianteActivoNC(normalized.num_control);
  setSesionActiva({
    tipo: 'alumno',
    num_control: normalized.num_control,
    nombre: normalized.nombre_completo
  });

  return { success: true, estudiante: normalized };
}

export interface SesionUsuario {
  tipo: 'alumno' | 'docente';
  num_control?: string;
  nombre?: string;
  timestamp?: number;
}

export function getSesionActiva(): SesionUsuario | null {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.SESION_ACTIVA);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSesionActiva(sesion: SesionUsuario | null): void {
  initializeStorage();
  if (!sesion) {
    localStorage.removeItem(STORAGE_KEYS.SESION_ACTIVA);
  } else {
    localStorage.setItem(STORAGE_KEYS.SESION_ACTIVA, JSON.stringify({
      ...sesion,
      timestamp: Date.now()
    }));
  }
}

export function cerrarSesion(): void {
  setSesionActiva(null);
}

export function verificarYFirmarTutor(numControl: string, firmaDigital: string, correoConfirmado?: string): Estudiante | null {
  const current = getEstudiantes();
  const idx = current.findIndex(e => e.num_control === numControl);
  if (idx >= 0) {
    const est = { ...current[idx] };
    est.tutor = {
      ...est.tutor,
      verificado: true,
      fecha_verificacion: new Date().toISOString(),
      firma_digital: firmaDigital,
      ...(correoConfirmado ? { correo_tutor: correoConfirmado } : {})
    };
    current[idx] = est;
    localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify(current));
    return est;
  }
  return null;
}

export function saveEstudiante(estudiante: Estudiante): void {
  const current = getEstudiantes();
  const idx = current.findIndex(e => e.num_control === estudiante.num_control);
  if (idx >= 0) {
    current[idx] = estudiante;
  } else {
    current.push(estudiante);
  }
  localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify(current));
  cloudSaveEstudiante(estudiante);
}

export function getEstudianteActivoNC(): string {
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO);
  if (stored) return stored;
  const list = getEstudiantes();
  if (list.length > 0) return list[0].num_control;
  return '';
}

export function setEstudianteActivoNC(nc: string): void {
  if (!nc) {
    localStorage.removeItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO);
  } else {
    localStorage.setItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO, nc);
  }
}

export function getEvaluacionVocacional(nc: string): EvaluacionVocacional | null {
  if (!nc) return null;
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.EVALUACIONES);
  const dict: Record<string, EvaluacionVocacional> = raw ? JSON.parse(raw) : {};
  return dict[nc] || null;
}

export function saveEvaluacionVocacional(evaluacion: EvaluacionVocacional): void {
  if (!evaluacion || !evaluacion.num_control) return;
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.EVALUACIONES);
  const dict: Record<string, EvaluacionVocacional> = raw ? JSON.parse(raw) : {};
  dict[evaluacion.num_control] = evaluacion;
  localStorage.setItem(STORAGE_KEYS.EVALUACIONES, JSON.stringify(dict));
}

export function getProgresoVirtual(nc: string): ProgresoVirtual {
  initializeStorage();
  if (nc) {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESOS);
    const dict: Record<string, ProgresoVirtual> = raw ? JSON.parse(raw) : {};
    if (dict[nc]) {
      return dict[nc];
    }
  }

  // Return empty progress structure safely
  const empty: ProgresoVirtual = {
    num_control: nc || '',
    test_vocacional_completado: false,
    progreso_especialidades: {
      programacion: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
      comercio: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
      rrhh: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 },
      cosmetologia: { video_visto: false, infografia_explorada: false, proyectos_revisados: false, quiz_aprobado: false, calificacion_quiz: 0 }
    },
    porcentaje_virtual: 0,
    promedio_cuestionarios: 0,
    clave_unica_token: '',
    estatus_fase_virtual: 'PENDIENTE'
  };
  return empty;
}

export function saveProgresoVirtual(progreso: ProgresoVirtual): void {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.PROGRESOS);
  const dict: Record<string, ProgresoVirtual> = raw ? JSON.parse(raw) : {};

  // Recalculate percentage:
  // Test vocacional = 20%
  // Each career (4 careers) = 20% each (video: 4%, info: 4%, proyectos: 4%, quiz: 8%)
  let pct = 0;
  if (progreso.test_vocacional_completado) pct += 20;

  let totalQuizScores = 0;
  let quizesCompleted = 0;

  const careers: SpecialtyId[] = ['programacion', 'comercio', 'rrhh', 'cosmetologia'];
  careers.forEach(c => {
    const sp = progreso.progreso_especialidades[c];
    if (sp.video_visto) pct += 4;
    if (sp.infografia_explorada) pct += 4;
    if (sp.proyectos_revisados) pct += 4;
    if (sp.quiz_aprobado) {
      pct += 8;
      totalQuizScores += sp.calificacion_quiz;
      quizesCompleted++;
    }
  });

  progreso.porcentaje_virtual = Math.min(100, Math.round(pct));
  progreso.promedio_cuestionarios = quizesCompleted > 0 ? Math.round((totalQuizScores / quizesCompleted) * 10) / 10 : 0;

  if (progreso.porcentaje_virtual >= 100) {
    progreso.estatus_fase_virtual = 'COMPLETADO';
    if (!progreso.clave_unica_token) {
      progreso.clave_unica_token = generateClaveUnicaToken(progreso.num_control);
    }
    if (!progreso.fecha_termino) {
      progreso.fecha_termino = new Date().toISOString();
    }
  } else if (progreso.porcentaje_virtual > 0) {
    progreso.estatus_fase_virtual = 'EN_PROCESO';
  } else {
    progreso.estatus_fase_virtual = 'PENDIENTE';
  }

  dict[progreso.num_control] = progreso;
  localStorage.setItem(STORAGE_KEYS.PROGRESOS, JSON.stringify(dict));
}

export function getAsistenciaPresencial(token: string): AsistenciaPresencial | null {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.ASISTENCIAS);
  const dict: Record<string, AsistenciaPresencial> = raw ? JSON.parse(raw) : {};
  return dict[token] || null;
}

export function getAsistenciaPresencialByNC(nc: string): AsistenciaPresencial | null {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.ASISTENCIAS);
  const dict: Record<string, AsistenciaPresencial> = raw ? JSON.parse(raw) : {};
  for (const token in dict) {
    if (dict[token].num_control === nc) {
      return dict[token];
    }
  }
  return null;
}

export function saveAsistenciaPresencial(asistencia: AsistenciaPresencial): void {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.ASISTENCIAS);
  const dict: Record<string, AsistenciaPresencial> = raw ? JSON.parse(raw) : {};
  dict[asistencia.clave_unica_token] = asistencia;
  localStorage.setItem(STORAGE_KEYS.ASISTENCIAS, JSON.stringify(dict));
}

export function getFichasAcademia(): Record<string, FichaAcademiaReq> {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.FICHAS);
  return raw ? JSON.parse(raw) : FICHAS_ACADEMIA_DEFAULT;
}

export function saveFichaAcademia(ficha: FichaAcademiaReq): void {
  initializeStorage();
  const fichas = getFichasAcademia();
  fichas[ficha.especialidad_id] = ficha;
  localStorage.setItem(STORAGE_KEYS.FICHAS, JSON.stringify(fichas));
}

export function getOficioCircular(): OficioCircular {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.OFICIO);
  return raw ? JSON.parse(raw) : OFICIO_CIRCULAR_DEFAULT;
}

export function saveOficioCircular(oficio: OficioCircular): void {
  localStorage.setItem(STORAGE_KEYS.OFICIO, JSON.stringify(oficio));
}

// ---------------------------------------------------------------------
// Docentes Autorizados (Dirección & Subdirección Académica CETis 7)
// ---------------------------------------------------------------------

export function getDocentes(): DocenteAutorizado[] {
  initializeStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.DOCENTES);
  return raw ? JSON.parse(raw) : DOCENTES_INICIALES;
}

export function saveDocentes(docentes: DocenteAutorizado[]): void {
  initializeStorage();
  localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify(docentes));
  docentes.forEach(d => cloudSaveDocente(d));
}

export function registrarNuevoDocente(
  datos: Omit<DocenteAutorizado, 'id' | 'fecha_alta'>
): { success: boolean; error?: string; docente?: DocenteAutorizado } {
  const docentes = getDocentes();

  const cleanRfc = datos.rfc.trim().toUpperCase();
  const cleanClave = datos.clave_acceso.trim().toUpperCase();

  if (!cleanRfc) {
    return { success: false, error: 'El RFC del docente es obligatorio.' };
  }

  if (!cleanClave || cleanClave.length < 4) {
    return { success: false, error: 'La clave de acceso o PIN debe tener al menos 4 caracteres.' };
  }

  // Check unique RFC
  const existingRfc = docentes.find(d => d.rfc.trim().toUpperCase() === cleanRfc);
  if (existingRfc) {
    return { 
      success: false, 
      error: `El RFC "${cleanRfc}" ya está registrado a nombre de ${existingRfc.nombre_completo} (${existingRfc.rol}).` 
    };
  }

  // Check unique Clave
  const existingClave = docentes.find(d => d.clave_acceso.trim().toUpperCase() === cleanClave);
  if (existingClave) {
    return { 
      success: false, 
      error: `La clave de acceso "${cleanClave}" ya fue asignada al docente ${existingClave.nombre_completo}. Por favor elige un PIN o clave diferente.` 
    };
  }

  const nuevoDocente: DocenteAutorizado = {
    ...datos,
    id: `DOC-2026-${String(docentes.length + 1).padStart(3, '0')}`,
    rfc: cleanRfc,
    clave_acceso: cleanClave,
    fecha_alta: new Date().toISOString()
  };

  docentes.push(nuevoDocente);
  saveDocentes(docentes);

  return { success: true, docente: nuevoDocente };
}

export function cambiarEstatusDocente(id: string, nuevoEstatus: 'AUTORIZADO' | 'PENDIENTE' | 'REVOCADO'): void {
  const docentes = getDocentes();
  const idx = docentes.findIndex(d => d.id === id);
  if (idx >= 0) {
    docentes[idx].estatus_autorizacion = nuevoEstatus;
    saveDocentes(docentes);
  }
}

export function eliminarDocente(id: string): void {
  const docentes = getDocentes();
  const actualizados = docentes.filter(d => d.id !== id);
  saveDocentes(actualizados);
}

export function validarClaveAccesoDocente(inputClave: string): {
  valido: boolean;
  docente?: DocenteAutorizado;
  esMaster?: boolean;
  mensajeError?: string;
} {
  const cleanInput = inputClave.trim().toUpperCase();
  if (!cleanInput) {
    return { valido: false, mensajeError: 'Por favor ingresa la clave de acceso institucional o PIN.' };
  }

  // Master admin keys
  const CLAVES_MASTER = ['DGETI72026', 'CETIS7DIR', '2026', 'DGETI2026', 'DIR2026'];
  if (CLAVES_MASTER.includes(cleanInput)) {
    return { valido: true, esMaster: true };
  }

  // Check individual authorized teacher PINs or RFC
  const docentes = getDocentes();
  const docenteEncontrado = docentes.find(
    d => d.clave_acceso.trim().toUpperCase() === cleanInput || d.rfc.trim().toUpperCase() === cleanInput
  );

  if (!docenteEncontrado) {
    return { 
      valido: false, 
      mensajeError: 'Clave de acceso o PIN no reconocido en el padrón de la Dirección Académica. Contacta al Administrador.' 
    };
  }

  if (docenteEncontrado.estatus_autorizacion === 'REVOCADO') {
    return { 
      valido: false, 
      mensajeError: `El acceso para el docente ${docenteEncontrado.nombre_completo} fue REVOCADO por la Dirección del plantel.` 
    };
  }

  if (docenteEncontrado.estatus_autorizacion === 'PENDIENTE') {
    return { 
      valido: false, 
      mensajeError: `El registro de ${docenteEncontrado.nombre_completo} se encuentra PENDIENTE de aprobación por el Administrador.` 
    };
  }

  return { valido: true, docente: docenteEncontrado };
}

export function resetAllDataToDefault(): void {
  localStorage.clear();
  initializeStorage();
}

export interface RespaldoCompletoCETis7 {
  version: string;
  fecha_generacion: string;
  plantel: string;
  ciclo: string;
  total_alumnos: number;
  total_docentes: number;
  datos: {
    alumnos: Estudiante[];
    docentes: DocenteAutorizado[];
    evaluaciones: Record<string, EvaluacionVocacional>;
    progresos: Record<string, ProgresoVirtual>;
    asistencias: Record<string, AsistenciaPresencial>;
    fichas?: any;
    oficio?: any;
  };
}

export function generarRespaldoCompleto(): RespaldoCompletoCETis7 {
  const alumnos = getEstudiantes();
  const docentes = getDocentes();
  
  const rawEval = localStorage.getItem(STORAGE_KEYS.EVALUACIONES);
  const rawProg = localStorage.getItem(STORAGE_KEYS.PROGRESOS);
  const rawAsis = localStorage.getItem(STORAGE_KEYS.ASISTENCIAS);
  const rawFichas = localStorage.getItem(STORAGE_KEYS.FICHAS);
  const rawOficio = localStorage.getItem(STORAGE_KEYS.OFICIO);

  return {
    version: '1.0.0',
    fecha_generacion: new Date().toISOString(),
    plantel: 'CETis No. 7 "Miguel Lerdo de Tejada"',
    ciclo: 'Feria de Especialidades 2026',
    total_alumnos: alumnos.length,
    total_docentes: docentes.length,
    datos: {
      alumnos,
      docentes,
      evaluaciones: rawEval ? JSON.parse(rawEval) : {},
      progresos: rawProg ? JSON.parse(rawProg) : {},
      asistencias: rawAsis ? JSON.parse(rawAsis) : {},
      fichas: rawFichas ? JSON.parse(rawFichas) : null,
      oficio: rawOficio ? JSON.parse(rawOficio) : null
    }
  };
}

export function descargarRespaldoJSON(): { 
  success: boolean; 
  nombreArchivo: string; 
  totalAlumnos: number; 
  totalDocentes: number; 
} {
  const respaldo = generarRespaldoCompleto();
  const jsonStr = JSON.stringify(respaldo, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const now = new Date();
  const fechaStr = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `Respaldo_CETis7_Alumnos_Docentes_${fechaStr}.json`;
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return {
    success: true,
    nombreArchivo: fileName,
    totalAlumnos: respaldo.total_alumnos,
    totalDocentes: respaldo.total_docentes
  };
}

export function restaurarDesdeRespaldoJSON(jsonString: string): {
  success: boolean;
  mensaje: string;
  totalAlumnos?: number;
  totalDocentes?: number;
} {
  try {
    const data = JSON.parse(jsonString);
    if (!data.datos || (!data.datos.alumnos && !data.datos.docentes)) {
      return { success: false, mensaje: 'El archivo JSON no contiene una estructura válida de respaldo de CETis 7.' };
    }

    if (Array.isArray(data.datos.alumnos)) {
      localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify(data.datos.alumnos));
      if (data.datos.alumnos.length > 0) {
        localStorage.setItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO, data.datos.alumnos[0].num_control);
      }
    }

    if (Array.isArray(data.datos.docentes)) {
      localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify(data.datos.docentes));
    }

    if (data.datos.evaluaciones) {
      localStorage.setItem(STORAGE_KEYS.EVALUACIONES, JSON.stringify(data.datos.evaluaciones));
    }
    if (data.datos.progresos) {
      localStorage.setItem(STORAGE_KEYS.PROGRESOS, JSON.stringify(data.datos.progresos));
    }
    if (data.datos.asistencias) {
      localStorage.setItem(STORAGE_KEYS.ASISTENCIAS, JSON.stringify(data.datos.asistencias));
    }
    if (data.datos.fichas) {
      localStorage.setItem(STORAGE_KEYS.FICHAS, JSON.stringify(data.datos.fichas));
    }
    if (data.datos.oficio) {
      localStorage.setItem(STORAGE_KEYS.OFICIO, JSON.stringify(data.datos.oficio));
    }

    return {
      success: true,
      mensaje: '¡Respaldo restaurado con éxito en el sistema!',
      totalAlumnos: data.datos.alumnos?.length || 0,
      totalDocentes: data.datos.docentes?.length || 0
    };
  } catch (err: any) {
    return { success: false, mensaje: `Error al leer el archivo JSON: ${err.message || 'Formato inválido'}` };
  }
}

export function reiniciarSoloAlumnos(modo: 'iniciales' | 'limpiar'): void {
  if (modo === 'iniciales') {
    localStorage.removeItem(STORAGE_KEYS.ESTUDIANTES);
    localStorage.removeItem(STORAGE_KEYS.EVALUACIONES);
    localStorage.removeItem(STORAGE_KEYS.PROGRESOS);
    localStorage.removeItem(STORAGE_KEYS.ASISTENCIAS);
    localStorage.removeItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO);
    initializeStorage();
  } else {
    localStorage.setItem(STORAGE_KEYS.ESTUDIANTES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.EVALUACIONES, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.PROGRESOS, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.ASISTENCIAS, JSON.stringify({}));
    localStorage.removeItem(STORAGE_KEYS.ESTUDIANTE_ACTIVO);

    // Si la sesión activa era de un alumno, cerrarla inmediatamente
    const ses = getSesionActiva();
    if (ses && ses.tipo === 'alumno') {
      cerrarSesion();
    }
  }
}

export function reiniciarSoloDocentes(modo: 'iniciales' | 'limpiar'): void {
  if (modo === 'iniciales') {
    localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify(DOCENTES_INICIALES));
  } else {
    localStorage.setItem(STORAGE_KEYS.DOCENTES, JSON.stringify([]));
    // Mantener la sesión de administración disponible para no bloquear al directivo
    const ses = getSesionActiva();
    if (ses && ses.tipo === 'docente') {
      setSesionActiva({
        tipo: 'docente',
        nombre: 'Dirección Académica (Administrador DGETI)'
      });
    }
  }
}

export function reiniciarAlumnosYDocentes(modo: 'iniciales' | 'limpiar'): void {
  reiniciarSoloAlumnos(modo);
  reiniciarSoloDocentes(modo);
}

