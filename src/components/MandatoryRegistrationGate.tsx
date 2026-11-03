import React, { useState } from 'react';
import { Estudiante, TutorLegal } from '../types';
import { 
  getEstudiantes, 
  getEstudianteByCURP, 
  getEstudianteByNC, 
  validarCURP, 
  registrarNuevoEstudiante,
  setSesionActiva,
  setEstudianteActivoNC,
  SesionUsuario,
  validarClaveAccesoDocente
} from '../services/storage';
import { 
  ShieldAlert, 
  UserCheck, 
  UserPlus, 
  Lock, 
  School, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Search, 
  Building2, 
  Mail, 
  Phone, 
  Fingerprint, 
  Check, 
  KeyRound,
  Rocket,
  RotateCcw,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMIC_ASSETS } from '../assets/comicAssets';
import { BackupAndResetModal } from './BackupAndResetModal';

interface MandatoryRegistrationGateProps {
  onAccessGranted: (estudiante?: Estudiante, sesion?: SesionUsuario) => void;
  onOpenTutorial?: () => void;
}

export const MandatoryRegistrationGate: React.FC<MandatoryRegistrationGateProps> = ({ 
  onAccessGranted,
  onOpenTutorial
}) => {
  const [activeTab, setActiveTab] = useState<'registro' | 'login' | 'docente'>('registro');
  const [paso, setPaso] = useState<1 | 2>(1);

  // Registro: Paso 1
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [curp, setCurp] = useState('');
  const [numControl, setNumControl] = useState('');
  const [grupo, setGrupo] = useState('1°A');
  const [turno, setTurno] = useState<'MATUTINO' | 'VESPERTINO'>('MATUTINO');
  const [telefonoAlumno, setTelefonoAlumno] = useState('');

  // Registro: Paso 2 (Tutor Legal)
  const [nombreTutor, setNombreTutor] = useState('');
  const [parentesco, setParentesco] = useState<'Padre' | 'Madre' | 'Tutor Legal'>('Padre');
  const [correoTutor, setCorreoTutor] = useState('');
  const [telefonoTutor, setTelefonoTutor] = useState('');

  // Feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Login state
  const [loginQuery, setLoginQuery] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Docente / Dirección Auth state
  const [docentePass, setDocentePass] = useState('');
  const [docenteError, setDocenteError] = useState<string | null>(null);

  // Modal para Respaldar y Reiniciar Alumnos y Docentes
  const [mostrarModalRespaldo, setMostrarModalRespaldo] = useState(false);
  const [modoInicialRespaldo, setModoInicialRespaldo] = useState<'respaldar' | 'reiniciar' | 'restaurar'>('respaldar');

  // All existing registered students for quick login / duplicate checks
  const estudiantesRegistrados = getEstudiantes();

  // Real-time check if CURP is already registered
  const cleanCurp = curp.trim().toUpperCase();
  const estudianteExistenteConCurp = cleanCurp.length >= 10 ? getEstudianteByCURP(cleanCurp) : null;

  // Handle auto-complete test student
  const handleAutocompletarPrueba = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const nombres = ['Mariana Lizbeth Soto García', 'Alan Fernando Morales Ríos', 'Jimena Paulina Castro Delgado', 'José Ángel Mendoza Ortiz'];
    const selectedNombre = nombres[Math.floor(Math.random() * nombres.length)];
    const initials = selectedNombre.split(' ').map(n => n[0]).join('').slice(0, 4).toUpperCase();
    
    setNombreCompleto(selectedNombre);
    setCurp(`${initials}090815HDFRLA${randomSuffix.toString().slice(0, 2)}`);
    setNumControl(`2631607001${randomSuffix}`);
    setGrupo('1°C');
    setTurno('MATUTINO');
    setTelefonoAlumno('55 3456 7890');
    setNombreTutor('Lic. Juan Manuel Soto');
    setParentesco('Padre');
    setCorreoTutor(`tutor.${selectedNombre.split(' ')[0].toLowerCase()}@gmail.com`);
    setTelefonoTutor('55 8765 4321');
    setErrorMsg(null);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombreCompleto.trim() || nombreCompleto.trim().length < 5) {
      setErrorMsg('Por favor escribe tu nombre completo con apellidos.');
      return;
    }

    const curpValid = validarCURP(curp);
    if (!curpValid.valido) {
      setErrorMsg(curpValid.mensaje || 'La CURP ingresada no es válida.');
      return;
    }

    // Check duplicate CURP
    const existing = getEstudianteByCURP(curp.trim().toUpperCase());
    if (existing) {
      setErrorMsg(`Esta CURP ya está registrada a nombre de ${existing.nombre_completo}. Cada alumno tiene permitido un único registro. Si eres este alumno, ingresa en la pestaña "Ya estoy Registrado".`);
      return;
    }

    if (!numControl.trim() || numControl.trim().length < 8) {
      setErrorMsg('El número de control escolar debe contener al menos 8 dígitos.');
      return;
    }

    const existingNC = getEstudianteByNC(numControl.trim());
    if (existingNC) {
      setErrorMsg(`El Número de Control ${numControl.trim()} ya se encuentra asignado a ${existingNC.nombre_completo}.`);
      return;
    }

    setPaso(2);
  };

  const handleFinalizarRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombreTutor.trim()) {
      setErrorMsg('El nombre de tu padre, madre o tutor legal es obligatorio.');
      return;
    }

    if (!correoTutor.trim() || !correoTutor.includes('@')) {
      setErrorMsg('El correo electrónico del tutor es obligatorio para vincular la firma de autorización.');
      return;
    }

    const tutorObj: TutorLegal = {
      nombre_tutor: nombreTutor.trim(),
      parentesco,
      correo_tutor: correoTutor.trim().toLowerCase(),
      telefono_tutor: telefonoTutor.trim() || 'No proporcionado',
      verificado: false
    };

    const nuevoEstudiante: Estudiante = {
      num_control: numControl.trim(),
      nombre_completo: nombreCompleto.trim(),
      grupo,
      turno,
      curp: curp.trim().toUpperCase(),
      correo_institucional: `${nombreCompleto.trim().toLowerCase().split(' ')[0]}.${numControl.trim().slice(-4)}@cetis7.edu.mx`,
      telefono_alumno: telefonoAlumno.trim(),
      tutor: tutorObj
    };

    const result = registrarNuevoEstudiante(nuevoEstudiante);

    if (!result.success) {
      setErrorMsg(result.error || 'Ocurrió un error al registrar el alumno.');
      return;
    }

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // safe ignore
    }

    setSuccessNotice(`¡Registro completado exitosamente! Bienvenido al CETis No. 7, ${nuevoEstudiante.nombre_completo}.`);
    
    setTimeout(() => {
      onAccessGranted(result.estudiante);
    }, 1200);
  };

  const handleLoginExisting = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const q = loginQuery.trim().toUpperCase();
    if (!q) {
      setLoginError('Por favor ingresa tu CURP o Número de Control.');
      return;
    }

    // Try finding by CURP first
    let student = getEstudianteByCURP(q);
    if (!student) {
      student = getEstudianteByNC(q);
    }

    if (!student) {
      setLoginError(`No se encontró ningún estudiante registrado con la CURP o Número de Control "${q}". Por favor regístrate como nuevo alumno.`);
      return;
    }

    // Successful login
    setEstudianteActivoNC(student.num_control);
    setSesionActiva({
      tipo: 'alumno',
      num_control: student.num_control,
      nombre: student.nombre_completo
    });

    onAccessGranted(student, { tipo: 'alumno', num_control: student.num_control, nombre: student.nombre_completo });
  };

  const handleSelectQuickStudent = (student: Estudiante) => {
    setEstudianteActivoNC(student.num_control);
    setSesionActiva({
      tipo: 'alumno',
      num_control: student.num_control,
      nombre: student.nombre_completo
    });
    onAccessGranted(student, { tipo: 'alumno', num_control: student.num_control, nombre: student.nombre_completo });
  };

  const handleAccesoDocente = (e: React.FormEvent) => {
    e.preventDefault();
    setDocenteError(null);

    const check = validarClaveAccesoDocente(docentePass);

    if (!check.valido) {
      setDocenteError(check.mensajeError || 'Clave de acceso incorrecta.');
      return;
    }

    const nombreDocente = check.docente
      ? `${check.docente.nombre_completo} (${check.docente.rol})`
      : 'Dirección & Subdirección Académica CETis 7';

    const sesionDir: SesionUsuario = {
      tipo: 'docente',
      nombre: nombreDocente
    };
    setSesionActiva(sesionDir);
    onAccessGranted(undefined, sesionDir);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/90 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-0 sm:p-4 md:p-6">
      <div className="w-full max-w-2xl bg-white sm:rounded-2xl shadow-2xl border-0 sm:border border-stone-200 overflow-hidden min-h-full sm:min-h-0 sm:my-auto animate-in fade-in duration-300 flex flex-col">
        
        {/* Visual Hero Banner with Comic Aesthetic for Teens */}
        <div className="relative h-28 sm:h-44 md:h-52 w-full overflow-hidden bg-stone-900 border-b-2 border-[#721B32] shrink-0">
          <img
            src={COMIC_ASSETS.hero}
            alt="Comunidad Estudiantil CETis No. 7"
            className="w-full h-full object-cover object-center"
          />
          {/* Comic vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#721B32] via-[#721B32]/75 to-black/40 flex flex-col justify-between p-3 sm:p-5 text-white">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-code gap-2">
              <span className="font-bold tracking-wider bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs truncate">
                SEP · DGETI CDMX
              </span>
              <span className="bg-amber-400 text-stone-950 px-2 py-0.5 rounded font-black text-[9px] sm:text-[10px] uppercase tracking-wider shadow-xs shrink-0">
                FERIA 2026
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase bg-white/20 text-white backdrop-blur-xs mb-0.5 sm:mb-1">
                <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                <span>Acceso Obligatorio con CURP</span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight drop-shadow-sm font-serif-institutional leading-tight">
                CETis No. 7 "Miguel Lerdo de Tejada"
              </h2>
              <p className="hidden sm:block text-xs text-amber-100 max-w-xl font-medium drop-shadow-xs mt-0.5">
                ¡Bienvenido a tu elección de carrera! Registra tus datos y vincula a tu padre o tutor legal para comenzar el 70% virtual y tu Pase Digital QR.
              </p>
              <p className="sm:hidden text-[11px] text-amber-100 font-medium truncate mt-0.5">
                Registro oficial para el 70% virtual y Pase Digital QR
              </p>
            </div>
          </div>
        </div>

        {/* Tutorial Banner for 12-15 year olds */}
        {onOpenTutorial && (
          <div className="bg-amber-100/95 border-b-2 border-amber-300 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 text-xs text-amber-950 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-amber-400 text-stone-900 flex items-center justify-center shrink-0 font-bold shadow-2xs">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
              <span className="font-semibold text-[11px] sm:text-xs truncate sm:whitespace-normal">
                ¿Primer día? Conoce las 4 fases de la Feria antes de comenzar.
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenTutorial}
              className="shrink-0 px-2.5 py-1.5 bg-white hover:bg-amber-50 active:bg-amber-100 text-stone-900 font-bold rounded-lg border border-amber-400 shadow-2xs transition-all flex items-center gap-1 text-[11px] sm:text-xs cursor-pointer"
            >
              <span>Ver Tutorial</span>
              <ArrowRight className="w-3 h-3 text-amber-700" />
            </button>
          </div>
        )}

        {/* Navigation Tabs - Responsive for small smartphone screens */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-semibold shrink-0">
          <button
            onClick={() => { setActiveTab('registro'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-center transition-colors flex items-center justify-center gap-1 sm:gap-2 border-b-2 cursor-pointer ${
              activeTab === 'registro'
                ? 'border-[#721B32] text-[#721B32] bg-white font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold leading-tight">
              <span className="sm:hidden">1. Registro</span>
              <span className="hidden sm:inline">1. Registro (Nuevo Alumno)</span>
            </span>
          </button>
          <button
            onClick={() => { setActiveTab('login'); setLoginError(null); }}
            className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-center transition-colors flex items-center justify-center gap-1 sm:gap-2 border-b-2 cursor-pointer ${
              activeTab === 'login'
                ? 'border-[#721B32] text-[#721B32] bg-white font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold leading-tight">
              <span className="sm:hidden">2. Ingresar</span>
              <span className="hidden sm:inline">2. Ya Registrado (Ingresar)</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('docente')}
            className={`py-2.5 sm:py-3 px-2.5 sm:px-3.5 text-center transition-colors flex items-center justify-center gap-1 border-b-2 cursor-pointer ${
              activeTab === 'docente'
                ? 'border-[#721B32] text-[#721B32] bg-white font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
            title="Acceso para personal académico"
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold">
              <span className="sm:hidden">Docente</span>
              <span className="hidden sm:inline">Dirección</span>
            </span>
          </button>
        </div>

        {/* Tab 1 Content: Registro Obligatorio */}
        {activeTab === 'registro' && (
          <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-5 flex-1">
            {/* Steps indicator */}
            <div className="flex items-center justify-between text-xs font-medium text-stone-600 bg-stone-50 p-2 sm:p-2.5 rounded-xl border border-stone-200">
              <div className={`flex items-center gap-1.5 sm:gap-2 min-w-0 ${paso === 1 ? 'text-[#721B32] font-bold' : 'text-stone-700'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 ${paso === 1 ? 'bg-[#721B32]' : 'bg-emerald-600'}`}>
                  {paso > 1 ? '✓' : '1'}
                </span>
                <span className="text-[11px] sm:text-xs truncate">
                  <span className="sm:hidden">Paso 1: Alumno</span>
                  <span className="hidden sm:inline">Paso 1: Alumno (CURP Única y Grupo)</span>
                </span>
              </div>
              <span className="text-stone-300 px-1 shrink-0">➔</span>
              <div className={`flex items-center gap-1.5 sm:gap-2 min-w-0 ${paso === 2 ? 'text-[#721B32] font-bold' : 'text-stone-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 ${paso === 2 ? 'bg-[#721B32]' : 'bg-stone-300'}`}>
                  2
                </span>
                <span className="text-[11px] sm:text-xs truncate">
                  <span className="sm:hidden">Paso 2: Tutor Legal</span>
                  <span className="hidden sm:inline">Paso 2: Papá o Tutor (Correo Obligatorio)</span>
                </span>
              </div>
            </div>

            {/* Notification alert */}
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{errorMsg}</div>
              </div>
            )}

            {successNotice && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed font-semibold">{successNotice}</div>
              </div>
            )}

            {/* PASO 1: Formulario Estudiante */}
            {paso === 1 && (
              <form onSubmit={handleNextStep} className="space-y-3.5 sm:space-y-4">
                {/* 4 Illustrated Careers Preview for 12-15 year olds - Compact horizontal scroll on mobile */}
                <div className="bg-stone-50 p-2.5 sm:p-3 rounded-xl border border-stone-200">
                  <div className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center justify-between">
                    <span>4 Carreras Técnicas del Plantel:</span>
                    <span className="text-stone-400 font-normal text-[10px] hidden sm:inline">Toca para explorar después</span>
                    <span className="text-stone-400 font-normal text-[9px] sm:hidden">Desliza para ver ➔</span>
                  </div>
                  <div className="flex sm:grid sm:grid-cols-4 gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {(['programacion', 'comercio', 'rrhh', 'cosmetologia'] as const).map(specId => {
                      const item = COMIC_ASSETS.especialidades[specId];
                      return (
                        <div key={specId} className="w-28 sm:w-auto shrink-0 group relative rounded-lg border border-stone-200 bg-white overflow-hidden shadow-2xs hover:border-[#721B32] transition-colors">
                          <div className="h-12 sm:h-16 w-full overflow-hidden bg-stone-100">
                            <img 
                              src={item.image} 
                              alt={item.badge} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <div className="p-1 sm:p-1.5 text-center">
                            <span className="text-[10px] font-black text-stone-900 block truncate">
                              {specId === 'programacion' ? 'Programación' : specId === 'comercio' ? 'Comercio Int.' : specId === 'rrhh' ? 'Recursos Hum.' : 'Cosmetología'}
                            </span>
                            <span className="text-[9px] text-[#721B32] font-bold block truncate">
                              {item.badge}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5">
                  <span className="text-[11px] sm:text-xs text-stone-500 font-semibold uppercase tracking-wider">
                    Datos Escolares del Alumno
                  </span>
                  <button
                    type="button"
                    onClick={handleAutocompletarPrueba}
                    className="text-[11px] font-semibold text-[#721B32] hover:text-[#501323] flex items-center gap-1 underline underline-offset-2 py-0.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>⚡ Ejemplo rápido</span>
                  </button>
                </div>

                {/* Nombre Completo */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nombre Completo del Estudiante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mariana Guadalupe Sánchez Cruz"
                    value={nombreCompleto}
                    onChange={e => setNombreCompleto(e.target.value)}
                    className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white font-medium"
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    Tal como aparece en tu credencial o acta.
                  </span>
                </div>

                {/* CURP con validación única */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-stone-800 flex items-center gap-1">
                      <Fingerprint className="w-3.5 h-3.5 text-[#721B32] shrink-0" />
                      <span>CURP Oficial (18 Caracteres) *</span>
                    </label>
                    <span className={`text-[10px] font-mono-code font-bold ${
                      cleanCurp.length === 18 ? 'text-emerald-700' : 'text-stone-400'
                    }`}>
                      {cleanCurp.length}/18
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={18}
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="Ej. SACM090714HDFRLA01"
                    value={curp}
                    onChange={e => setCurp(e.target.value.toUpperCase())}
                    className={`w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-mono-code font-bold tracking-wider border rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white ${
                      estudianteExistenteConCurp 
                        ? 'border-red-400 bg-red-50/50 text-red-900' 
                        : cleanCurp.length === 18 
                        ? 'border-emerald-500 bg-emerald-50/30 text-stone-900' 
                        : 'border-stone-300 text-stone-900'
                    }`}
                  />
                  
                  {/* Warning if duplicate CURP */}
                  {estudianteExistenteConCurp && (
                    <div className="mt-1.5 p-2 bg-red-50 border border-red-200 rounded-lg text-[11px] text-red-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
                      <span>
                        ⚠️ La CURP ya está asignada a <strong>{estudianteExistenteConCurp.nombre_completo}</strong>.
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectQuickStudent(estudianteExistenteConCurp)}
                        className="px-2 py-1 bg-red-800 text-white rounded text-[10px] font-bold whitespace-nowrap hover:bg-red-900 cursor-pointer"
                      >
                        Ingresar con esta cuenta
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Garantiza un solo registro por alumno conforme a normatividad DGETI.
                  </span>
                </div>

                {/* Número de Control & Teléfono Alumno */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Número de Control Escolar *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="Ej. 26316070010042"
                      value={numControl}
                      onChange={e => setNumControl(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-mono-code border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Teléfono Celular del Alumno
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="Ej. 55 1234 5678"
                      value={telefonoAlumno}
                      onChange={e => setTelefonoAlumno(e.target.value)}
                      className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Grupo y Turno */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Grupo Asignado
                    </label>
                    <select
                      value={grupo}
                      onChange={e => setGrupo(e.target.value)}
                      className="w-full px-2.5 sm:px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-mono-code border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="1°A">Grupo 1°A</option>
                      <option value="1°B">Grupo 1°B</option>
                      <option value="1°C">Grupo 1°C</option>
                      <option value="1°D">Grupo 1°D</option>
                      <option value="1°E">Grupo 1°E</option>
                      <option value="1°F">Grupo 1°F</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Turno
                    </label>
                    <select
                      value={turno}
                      onChange={e => setTurno(e.target.value as any)}
                      className="w-full px-2.5 sm:px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="MATUTINO">Matutino</option>
                      <option value="VESPERTINO">Vespertino</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-stone-200 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-[#721B32] hover:bg-[#5b1528] active:bg-[#4a1020] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Continuar al Paso 2: Datos del Tutor</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </form>
            )}

            {/* PASO 2: Formulario Tutor */}
            {paso === 2 && (
              <form onSubmit={handleFinalizarRegistro} className="space-y-3.5 sm:space-y-4">
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950 mb-0.5">
                    <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Vinculación Obligatoria del Tutor Legal</span>
                  </div>
                  El correo de tu papá, mamá o tutor legal es estrictamente obligatorio. Se registrará en la base de datos para validar su firma digital y autorizar la impresión de tu <strong>Pase Digital QR</strong>.
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nombre Completo del Padre, Madre o Tutor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roberto Sánchez Morales"
                    value={nombreTutor}
                    onChange={e => setNombreTutor(e.target.value)}
                    className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Parentesco *
                    </label>
                    <select
                      value={parentesco}
                      onChange={e => setParentesco(e.target.value as any)}
                      className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="Padre">Padre</option>
                      <option value="Madre">Madre</option>
                      <option value="Tutor Legal">Tutor Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Teléfono del Tutor *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      placeholder="Ej. 55 9876 5432"
                      value={telefonoTutor}
                      onChange={e => setTelefonoTutor(e.target.value)}
                      className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Correo Electrónico del Tutor (Indispensable para Pase QR) *
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    required
                    placeholder="Ej. tutor.alumno@gmail.com"
                    value={correoTutor}
                    onChange={e => setCorreoTutor(e.target.value)}
                    className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs font-mono-code border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white"
                  />
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    Asegúrate de que sea una cuenta activa donde tu tutor pueda autorizar tu credencial.
                  </span>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-stone-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaso(1)}
                    className="w-full sm:w-auto px-4 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Regresar a datos del alumno</span>
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Completar Registro y Entrar</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2 Content: Ya estoy Registrado */}
        {activeTab === 'login' && (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-base font-bold text-stone-900">
                Ingreso de Alumnos Previamente Registrados
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Ingresa con tu <strong>CURP</strong> de 18 caracteres o tu <strong>Número de Control</strong> escolar para continuar tu recorrido virtual del 70%.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{loginError}</div>
              </div>
            )}

            <form onSubmit={handleLoginExisting} className="max-w-md mx-auto space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  CURP o Número de Control:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoCapitalize="characters"
                    autoCorrect="off"
                    placeholder="Ej. SACM090714HDFRLA01 o 26316070010042"
                    value={loginQuery}
                    onChange={e => setLoginQuery(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2.5 text-sm sm:text-xs font-mono-code font-bold tracking-wider border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-2.5 bg-[#721B32] hover:bg-[#5b1528] active:bg-[#4a1020] text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Acceder a mi Cuenta de Alumno</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick switcher of existing cohort for testing */}
            <div className="border-t border-stone-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Alumnos Demo en el Padrón ({estudiantesRegistrados.length})
                </span>
                <span className="text-[10px] text-stone-400">Clic para entrar</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {estudiantesRegistrados.map(est => (
                  <button
                    key={est.num_control}
                    type="button"
                    onClick={() => handleSelectQuickStudent(est)}
                    className="p-2.5 text-left rounded-lg border border-stone-200 hover:border-[#721B32] hover:bg-stone-50 transition-colors flex items-center justify-between text-xs cursor-pointer gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-stone-900 truncate">{est.nombre_completo}</div>
                      <div className="text-[10px] text-stone-500 font-mono-code truncate">
                        {est.curp} · {est.grupo}
                      </div>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                      est.tutor?.verificado ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {est.tutor?.verificado ? '✓ Tutor OK' : '⚠️ Sin Firma'}
                    </span>
                  </button>
                ))}
                {estudiantesRegistrados.length === 0 && (
                  <div className="col-span-1 sm:col-span-2 text-center p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 space-y-1">
                    <p className="font-semibold text-stone-700">No hay alumnos registrados actualmente</p>
                    <p className="text-[11px]">Por favor regístrate como nuevo estudiante en la pestaña <strong>"1. Registro"</strong>.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 Content: Acceso Personal Docente / Dirección */}
        {activeTab === 'docente' && (
          <div className="p-4 sm:p-6 space-y-4 max-w-md mx-auto flex-1">
            <div className="text-center space-y-1">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#721B32] text-white flex items-center justify-center mx-auto shadow-xs">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 pt-1">
                Autenticación de Dirección Académica
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Módulo reservado para directivos, docentes tutores y personal de control escolar del CETis No. 7. Ingresa la clave o PIN institucional.
              </p>
            </div>

            {docenteError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{docenteError}</div>
              </div>
            )}

            <form onSubmit={handleAccesoDocente} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Clave Institucional / PIN Directivo:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Ingresa clave o PIN directivo"
                    value={docentePass}
                    onChange={e => setDocentePass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm sm:text-xs font-mono-code font-bold tracking-wider border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white"
                  />
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Demo password pill triggers */}
              <div className="bg-amber-50/90 border border-amber-300 p-2.5 sm:p-3 rounded-xl text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Claves oficiales para prueba de acceso:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => { setDocentePass('DGETI72026'); setDocenteError(null); }}
                    className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 border border-amber-400 rounded-md font-mono-code font-bold text-[11px] text-amber-950 transition-colors cursor-pointer"
                  >
                    DGETI72026
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDocentePass('2026'); setDocenteError(null); }}
                    className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 border border-amber-400 rounded-md font-mono-code font-bold text-[11px] text-amber-950 transition-colors cursor-pointer"
                  >
                    PIN: 2026
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-2.5 bg-[#721B32] hover:bg-[#5b1528] active:bg-[#4a1020] text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <School className="w-4 h-4 text-amber-300" />
                <span>Autenticar e Ingresar a Dirección</span>
              </button>

              {/* Botón rápido para Respaldar o Reiniciar Alumnos y Docentes */}
              <div className="pt-2 border-t border-stone-200 text-center flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModoInicialRespaldo('respaldar');
                    setMostrarModalRespaldo(true);
                  }}
                  className="text-[11px] text-[#721B32] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#721B32]" />
                  <span>Respaldar Datos</span>
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => {
                    setModoInicialRespaldo('reiniciar');
                    setMostrarModalRespaldo(true);
                  }}
                  className="text-[11px] text-red-700 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-red-600" />
                  <span>Reiniciar Alumnos y Docentes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer info note with quick backup/reset trigger */}
        <div className="bg-stone-100 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-stone-200 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 font-mono-code shrink-0">
          <span>Plantel Cuautepec, GAM, CDMX</span>
          <button
            type="button"
            onClick={() => {
              setModoInicialRespaldo('respaldar');
              setMostrarModalRespaldo(true);
            }}
            className="text-stone-600 hover:text-[#721B32] hover:underline font-sans font-semibold flex items-center gap-1 cursor-pointer"
            title="Centro de Respaldo y Reinicio de Datos"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Respaldar / Reiniciar</span>
          </button>
          <span>DGETI · Ciclo 2026</span>
        </div>
      </div>

      {/* Modal Institucional para Respaldar, Reiniciar y Restaurar */}
      <BackupAndResetModal
        isOpen={mostrarModalRespaldo}
        onClose={() => setMostrarModalRespaldo(false)}
        onDataChanged={() => {
          // Refresh page or gate state to reflect updated students/teachers
          window.location.reload();
        }}
        initialMode={modoInicialRespaldo}
      />
    </div>
  );
};
