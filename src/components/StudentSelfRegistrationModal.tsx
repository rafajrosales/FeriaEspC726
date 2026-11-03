import React, { useState } from 'react';
import { Estudiante, TutorLegal } from '../types';
import { registrarNuevoEstudiante, validarCURP, getEstudianteByCURP } from '../services/storage';
import { UserPlus, Sparkles, Mail, Phone, School, Check, X, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentSelfRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentRegistered: (newStudent: Estudiante) => void;
}

export const StudentSelfRegistrationModal: React.FC<StudentSelfRegistrationModalProps> = ({
  isOpen,
  onClose,
  onStudentRegistered
}) => {
  const [paso, setPaso] = useState<1 | 2>(1);

  // Paso 1: Estudiante
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [numControl, setNumControl] = useState('');
  const [curp, setCurp] = useState('');
  const [grupo, setGrupo] = useState('1°A');
  const [turno, setTurno] = useState<'MATUTINO' | 'VESPERTINO'>('MATUTINO');
  const [telefonoAlumno, setTelefonoAlumno] = useState('');

  // Paso 2: Papá o Tutor
  const [nombreTutor, setNombreTutor] = useState('');
  const [parentesco, setParentesco] = useState<'Padre' | 'Madre' | 'Tutor Legal'>('Padre');
  const [correoTutor, setCorreoTutor] = useState('');
  const [telefonoTutor, setTelefonoTutor] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAutocompletarPrueba = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setNombreCompleto('Mariana Guadalupe Sánchez Cruz');
    setNumControl(`2631607001${randomSuffix}`);
    setCurp(`SACM090714HDFRLA${randomSuffix.toString().slice(0, 2)}`);
    setGrupo('1°B');
    setTurno('MATUTINO');
    setTelefonoAlumno('55 4321 8765');
    setNombreTutor('Lic. Roberto Sánchez Morales');
    setParentesco('Padre');
    setCorreoTutor('roberto.sanchez.tutor@gmail.com');
    setTelefonoTutor('55 9876 5432');
  };

  const handleNextPaso = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombreCompleto.trim() || nombreCompleto.trim().length < 5) {
      setErrorMsg('Por favor escribe tu nombre completo (nombre y apellidos).');
      return;
    }

    const curpValid = validarCURP(curp);
    if (!curpValid.valido) {
      setErrorMsg(curpValid.mensaje || 'La CURP no es válida.');
      return;
    }

    const existingByCurp = getEstudianteByCURP(curp.trim().toUpperCase());
    if (existingByCurp) {
      setErrorMsg(`Esta CURP ya se encuentra registrada a nombre de ${existingByCurp.nombre_completo}. Solo se permite un registro por alumno.`);
      return;
    }

    if (!numControl.trim() || numControl.trim().length < 8) {
      setErrorMsg('El número de control debe contener al menos 8 a 14 dígitos.');
      return;
    }

    setPaso(2);
  };

  const handleFinalizarRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombreTutor.trim()) {
      setErrorMsg('Por favor escribe el nombre de tu papá, mamá o tutor.');
      return;
    }

    if (!correoTutor.trim() || !correoTutor.includes('@')) {
      setErrorMsg('El correo electrónico de tu papá o tutor es obligatorio y debe ser válido.');
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
      correo_institucional: `${nombreCompleto.trim().toLowerCase().split(' ')[0]}.${numControl.slice(-4)}@cetis7.edu.mx`,
      telefono_alumno: telefonoAlumno.trim(),
      tutor: tutorObj
    };

    const result = registrarNuevoEstudiante(nuevoEstudiante);
    if (!result.success) {
      setErrorMsg(result.error || 'Error al registrar alumno.');
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Safe ignore
    }

    onStudentRegistered(result.estudiante || nuevoEstudiante);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white sm:rounded-2xl border-0 sm:border border-stone-200 max-w-lg w-full shadow-2xl overflow-hidden min-h-full sm:min-h-0 sm:my-6 flex flex-col">
        {/* Header */}
        <div className="bg-[#721B32] p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-200 shrink-0">
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-200 font-semibold block truncate">
                CETis No. 7 "Miguel Lerdo de Tejada"
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Registro de Alumno (1.er Semestre)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-semibold shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
              paso === 1 ? 'bg-[#721B32] text-white' : 'bg-emerald-600 text-white'
            }`}>
              {paso > 1 ? '✓' : '1'}
            </span>
            <span className={`text-[11px] sm:text-xs truncate ${paso === 1 ? 'text-[#721B32] font-bold' : 'text-stone-600'}`}>
              <span className="sm:hidden">Paso 1: Alumno</span>
              <span className="hidden sm:inline">Tus Datos de Estudiante</span>
            </span>
          </div>

          <div className="w-6 sm:w-8 h-px bg-stone-300 mx-2 shrink-0"></div>

          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
              paso === 2 ? 'bg-[#721B32] text-white' : 'bg-stone-300 text-stone-700'
            }`}>
              2
            </span>
            <span className={`text-[11px] sm:text-xs truncate ${paso === 2 ? 'text-[#721B32] font-bold' : 'text-stone-400'}`}>
              <span className="sm:hidden">Paso 2: Tutor</span>
              <span className="hidden sm:inline">Datos de tu Papá o Tutor</span>
            </span>
          </div>
        </div>

        {/* Form Body */}
        {/* Form Body */}
        <div className="p-3.5 sm:p-6 flex-1 overflow-y-auto">
          {paso === 1 ? (
            <form onSubmit={handleNextPaso} className="space-y-3.5 sm:space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-1">
                <span>Ingresa tus datos escolares oficiales:</span>
                <button
                  type="button"
                  onClick={handleAutocompletarPrueba}
                  className="text-[#721B32] font-semibold hover:underline cursor-pointer"
                >
                  ⚡ Autocompletar ejemplo
                </button>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Nombre Completo del Estudiante:</label>
                <input
                  type="text"
                  required
                  value={nombreCompleto}
                  onChange={e => setNombreCompleto(e.target.value)}
                  placeholder="ej. Gael Emiliano Morales Sánchez"
                  className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Número de Control:</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={numControl}
                    onChange={e => setNumControl(e.target.value)}
                    placeholder="ej. 26316070010042"
                    className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-mono-code font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">CURP Oficial:</label>
                  <input
                    type="text"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    value={curp}
                    onChange={e => setCurp(e.target.value.toUpperCase())}
                    placeholder="ej. MOSG090314HDFRLA01"
                    className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-mono-code font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Grupo (1.° Semestre):</label>
                  <select
                    value={grupo}
                    onChange={e => setGrupo(e.target.value)}
                    className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white text-sm sm:text-xs font-semibold"
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
                  <label className="font-bold text-stone-800 block mb-1">Turno Asignado:</label>
                  <select
                    value={turno}
                    onChange={e => setTurno(e.target.value as any)}
                    className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white text-sm sm:text-xs font-semibold"
                  >
                    <option value="MATUTINO">Turno Matutino</option>
                    <option value="VESPERTINO">Turno Vespertino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Teléfono o WhatsApp del Alumno (Opcional):</label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={telefonoAlumno}
                  onChange={e => setTelefonoAlumno(e.target.value)}
                  placeholder="ej. 55 1234 5678"
                  className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-mono-code"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-900 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 text-stone-600 hover:bg-stone-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#721B32] hover:bg-[#5b1528] active:bg-[#4a1020] text-white rounded-lg font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Siguiente: Datos de Papá o Tutor</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleFinalizarRegistro} className="space-y-3.5 sm:space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed space-y-1">
                <span className="font-bold flex items-center gap-1 text-xs">
                  <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>¿Por qué necesitamos el correo de tu papá o tutor?</span>
                </span>
                <p className="text-[11px] text-amber-950">
                  El sistema del CETis 7 enviará a este correo la confirmación de tu perfil vocacional. <strong>Tu Pase Digital QR solo podrá imprimirse cuando tu papá o tutor confirme y firme digitalmente con su correo en la base de datos.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-2">
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-800 block mb-1">Nombre Completo del Papá, Mamá o Tutor:</label>
                  <input
                    type="text"
                    required
                    value={nombreTutor}
                    onChange={e => setNombreTutor(e.target.value)}
                    placeholder="ej. Lic. Roberto Sánchez Morales"
                    className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">Parentesco:</label>
                  <select
                    value={parentesco}
                    onChange={e => setParentesco(e.target.value as any)}
                    className="w-full p-2.5 sm:p-2 border border-stone-300 rounded-lg bg-white text-sm sm:text-xs font-semibold"
                  >
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Tutor Legal">Tutor Legal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Correo Electrónico de tu Papá o Tutor (Requisito Obligatorio):
                </label>
                <div className="relative">
                  <input
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    required
                    value={correoTutor}
                    onChange={e => setCorreoTutor(e.target.value)}
                    placeholder="ej. papa.tutor@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 sm:py-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-mono-code font-medium"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Teléfono de Contacto del Papá o Tutor:</label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="tel"
                    value={telefonoTutor}
                    onChange={e => setTelefonoTutor(e.target.value)}
                    placeholder="ej. 55 9876 5432"
                    className="w-full pl-9 pr-3 py-2.5 sm:py-2 border border-stone-300 rounded-lg bg-white focus:bg-white text-sm sm:text-xs font-mono-code"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-900 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setPaso(1)}
                  className="w-full sm:w-auto px-4 py-2.5 text-stone-600 hover:bg-stone-100 rounded-lg font-medium flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Regresar</span>
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#721B32] hover:bg-[#5b1528] active:bg-[#4a1020] text-white rounded-lg font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Completar Registro e Iniciar Recorrido</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
