export type SpecialtyId = 'programacion' | 'comercio' | 'rrhh' | 'cosmetologia';

export interface TutorLegal {
  nombre_tutor: string;
  parentesco: 'Padre' | 'Madre' | 'Tutor Legal';
  correo_tutor: string;
  telefono_tutor: string;
  verificado: boolean;
  fecha_verificacion?: string;
  firma_digital?: string; // Base64 data URL or digital signature trace
  token_verificacion?: string;
}

export interface Estudiante {
  num_control: string;
  nombre_completo: string;
  grupo: string;
  turno: 'MATUTINO' | 'VESPERTINO';
  correo_institucional: string;
  curp: string;
  avatar_url?: string;
  telefono_alumno?: string;
  tutor: TutorLegal;
}

export interface EvaluacionVocacional {
  num_control: string;
  score_aptitud_programacion: number;
  score_gusto_programacion: number;
  score_aptitud_comercio: number;
  score_gusto_comercio: number;
  score_aptitud_rrhh: number;
  score_gusto_rrhh: number;
  score_aptitud_cosmetologia: number;
  score_gusto_cosmetologia: number;
  carrera_sugerida: SpecialtyId;
  segunda_opcion?: SpecialtyId;
  analisis_pedagogico: string;
  fecha_evaluacion: string;
}

export interface QuizRespuesta {
  pregunta_id: number;
  opcion_seleccionada: number;
  es_correcta: boolean;
}

export interface ProgresoEspecialidad {
  video_visto: boolean;
  infografia_explorada: boolean;
  proyectos_revisados: boolean;
  quiz_aprobado: boolean;
  calificacion_quiz: number; // 0 to 100
}

export interface ProgresoVirtual {
  num_control: string;
  test_vocacional_completado: boolean;
  progreso_especialidades: {
    programacion: ProgresoEspecialidad;
    comercio: ProgresoEspecialidad;
    rrhh: ProgresoEspecialidad;
    cosmetologia: ProgresoEspecialidad;
  };
  porcentaje_virtual: number; // 0 to 100 (represents 70% of total)
  promedio_cuestionarios: number;
  clave_unica_token: string;
  estatus_fase_virtual: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO';
  fecha_termino?: string;
}

export interface RetoPresencialStatus {
  completado: boolean;
  hora_completado?: string;
  evaluador_nombre?: string;
  calificacion_desempeno?: 'EXCELENTE' | 'SATISFACTORIO' | 'COMPETENTE';
}

export interface AsistenciaPresencial {
  clave_unica_token: string;
  num_control: string;
  fecha_checkin?: string;
  checkin_realizado: boolean;
  validado_por_tutor: boolean;
  nombre_tutor?: string;
  retos_estaciones: {
    programacion: RetoPresencialStatus;
    comercio: RetoPresencialStatus;
    rrhh: RetoPresencialStatus;
    cosmetologia: RetoPresencialStatus;
  };
  fecha_acreditacion_final?: string;
  subdirector_firmante?: string;
  estatus_final: 'PENDIENTE' | 'EN_CIRCUITO' | 'ACREDITADO';
}

export interface SpecialtyInfo {
  id: SpecialtyId;
  nombre: string;
  titulo_corto: string;
  area: string;
  color_acento: string;
  color_badge: string;
  icono: string;
  resumen_ejecutivo: string;
  perfil_ingreso: string[];
  perfil_egreso: string[];
  campo_laboral: string[];
  submodulos: {
    semestre: string;
    nombre: string;
    competencia: string;
  }[];
  proyectos_destacados: {
    titulo: string;
    alumnos: string;
    semestre: string;
    descripcion: string;
    impacto: string;
  }[];
  video_demo: {
    titulo: string;
    duracion: string;
    presentador: string;
    descripcion: string;
  };
  preguntas_quiz: {
    id: number;
    pregunta: string;
    opciones: string[];
    respuesta_correcta: number;
    explicacion: string;
  }[];
  reto_presencial: {
    nombre: string;
    objetivo: string;
    duracion_min: number;
    dinamica: string;
    espacio: string;
    materiales: string;
  };
}

export interface FichaAcademiaReq {
  especialidad_id: SpecialtyId;
  nombre_especialidad: string;
  presidente_academia: string;
  integrantes_academia: string[];
  fecha_entrega: string;
  resumen_ejecutivo: string;
  recursos_multimedia: {
    video_url_o_estado: string;
    infografia_formato: string;
    proyectos_registrados: string[];
  };
  banco_reactivos: {
    pregunta: string;
    opciones: [string, string, string];
    correcta: string;
  }[];
  reto_ludico: {
    nombre: string;
    objetivo: string;
    dinamica: string;
    espacio: 'Laboratorio' | 'Taller' | 'Plaza Cívica' | 'Aula';
    mobiliario_conexiones: string;
    materiales_insumos: string;
  };
}

export interface OficioCircular {
  clave_oficio: string;
  asunto: string;
  lugar_fecha: string;
  destinatarios: string;
  cuerpo: string[];
  firmante_cargo: string;
  firmante_nombre: string;
  sello_oficial: string;
}

export interface DocenteAutorizado {
  id: string;
  nombre_completo: string;
  rfc: string;
  correo_institucional: string;
  academia: SpecialtyId | 'general';
  rol: 'Profesor Titular' | 'Jefe de Academia' | 'Tutor Escolar' | 'Subdirector' | 'Coordinador de Rally';
  clave_acceso: string;
  estatus_autorizacion: 'AUTORIZADO' | 'PENDIENTE' | 'REVOCADO';
  fecha_alta: string;
  registrado_por?: string;
}

