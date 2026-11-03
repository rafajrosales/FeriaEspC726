import React, { useState } from 'react';
import { Estudiante, ProgresoVirtual, EvaluacionVocacional, AsistenciaPresencial } from '../types';
import { getEstudiantes } from '../services/storage';
import { StudentSelfRegistrationModal } from './StudentSelfRegistrationModal';
import { TutorSignatureModal } from './TutorSignatureModal';
import { 
  User, 
  QrCode, 
  ShieldCheck, 
  ChevronDown, 
  UserPlus, 
  Check, 
  Mail, 
  PenTool, 
  AlertTriangle,
  LogOut 
} from 'lucide-react';

interface StudentProfileBannerProps {
  estudiante: Estudiante;
  progreso: ProgresoVirtual;
  evaluacion: EvaluacionVocacional | null;
  asistencia: AsistenciaPresencial | null;
  onCambiarEstudiante: (nc: string) => void;
  onVerPaseQR: () => void;
  onStudentUpdated?: (updated: Estudiante) => void;
  onCerrarSesion?: () => void;
}

export const StudentProfileBanner: React.FC<StudentProfileBannerProps> = ({
  estudiante,
  progreso,
  evaluacion,
  asistencia,
  onCambiarEstudiante,
  onVerPaseQR,
  onStudentUpdated,
  onCerrarSesion
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalSelfRegOpen, setModalSelfRegOpen] = useState(false);
  const [modalTutorSignOpen, setModalTutorSignOpen] = useState(false);

  const todosEstudiantes = getEstudiantes();
  const isTutorVerificado = Boolean(estudiante.tutor?.verificado);

  // Compute total hybrid completion:
  // Virtual portion is worth up to 70% of total
  // Presencial portion is worth up to 30% of total (7.5% per station)
  const virtualWeighted = (progreso.porcentaje_virtual / 100) * 70;
  
  let presencialCount = 0;
  if (asistencia) {
    if (asistencia.retos_estaciones.programacion.completado) presencialCount++;
    if (asistencia.retos_estaciones.comercio.completado) presencialCount++;
    if (asistencia.retos_estaciones.rrhh.completado) presencialCount++;
    if (asistencia.retos_estaciones.cosmetologia.completado) presencialCount++;
  }
  const presencialWeighted = (presencialCount / 4) * 30;
  const totalHibrido = Math.round(virtualWeighted + presencialWeighted);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Student Identity */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#721B32] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              {estudiante.nombre_completo.charAt(0)}
            </div>
            {progreso.estatus_fase_virtual === 'COMPLETADO' && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]" title="70% Virtual Concluido">
                ✓
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Alumno de 1.er Semestre</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-mono-code text-stone-600">{estudiante.num_control}</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-semibold text-stone-700">{estudiante.grupo} ({estudiante.turno})</span>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                {estudiante.nombre_completo}
              </h2>

              {/* Student Switcher dropdown button */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors flex items-center gap-0.5 text-xs font-medium"
                  title="Cambiar de alumno o registrar nuevo"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl border border-stone-200 shadow-xl z-30 p-1.5 text-xs">
                    <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-stone-400">
                      Seleccionar Alumno en Sesión
                    </div>
                    <div className="max-h-52 overflow-y-auto space-y-0.5">
                      {todosEstudiantes.map(est => {
                        const isCurrent = est.num_control === estudiante.num_control;
                        const tutorOk = est.tutor?.verificado;
                        return (
                          <button
                            key={est.num_control}
                            onClick={() => {
                              onCambiarEstudiante(est.num_control);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                              isCurrent ? 'bg-[#721B32] text-white font-semibold' : 'hover:bg-stone-100 text-stone-800'
                            }`}
                          >
                            <div className="truncate">
                              <div className="font-medium truncate">{est.nombre_completo}</div>
                              <div className={`text-[10px] font-mono-code ${isCurrent ? 'text-white/80' : 'text-stone-500'}`}>
                                {est.num_control} · {est.grupo} · {tutorOk ? 'Tutor ✓' : 'Tutor ⚠️'}
                              </div>
                            </div>
                            {isCurrent && <Check className="w-3.5 h-3.5 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="border-t border-stone-200 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setModalSelfRegOpen(true);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg text-[#721B32] hover:bg-[#721B32]/10 font-bold flex items-center gap-1.5"
                      >
                        <UserPlus className="w-4 h-4" />
                        Registrarme como Nuevo Alumno (1.er Semestre)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick status line */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-1 font-mono-code flex-wrap">
              <span>Correo: {estudiante.correo_institucional}</span>
              {evaluacion?.carrera_sugerida && (
                <>
                  <span>·</span>
                  <span className="text-[#721B32] font-semibold">Sugerencia: {evaluacion.carrera_sugerida.toUpperCase()}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Hybrid Progress Gauge & Fast QR Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:border-l lg:border-stone-200 lg:pl-6">
          <div className="space-y-1.5 min-w-[210px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-700">Modelo Híbrido (70/30)</span>
              <span className="font-mono-code font-bold text-stone-900">{totalHibrido}% / 100%</span>
            </div>

            {/* Split segmented bar */}
            <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex p-0.5 border border-stone-200">
              <div
                className="h-full bg-[#721B32] rounded-l-full transition-all duration-300"
                style={{ width: `${(virtualWeighted / 100) * 100}%` }}
                title={`Fase Virtual: ${progreso.porcentaje_virtual}% (${Math.round(virtualWeighted)}% del total)`}
              ></div>
              <div
                className="h-full bg-emerald-600 rounded-r-full transition-all duration-300"
                style={{ width: `${(presencialWeighted / 100) * 100}%` }}
                title={`Fase Presencial: ${presencialCount}/4 estaciones (${Math.round(presencialWeighted)}% del total)`}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-500">
              <span className="text-[#721B32] font-medium">Virtual: {progreso.porcentaje_virtual}% ({Math.round(virtualWeighted)}/70 pts)</span>
              <span className="text-emerald-700 font-medium">Presencial: {presencialCount}/4 ({Math.round(presencialWeighted)}/30 pts)</span>
            </div>
          </div>

          {/* Quick Actions Group */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModalSelfRegOpen(true)}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              title="Registrar a otro compañero o nuevo alumno"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#721B32]" />
              <span>Nuevo Alumno</span>
            </button>

            <button
              onClick={onVerPaseQR}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shadow-2xs cursor-pointer ${
                progreso.estatus_fase_virtual === 'COMPLETADO'
                  ? 'bg-[#721B32] text-white hover:bg-[#5b1528]'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{progreso.estatus_fase_virtual === 'COMPLETADO' ? 'Pase QR' : 'Estatus QR'}</span>
            </button>

            {onCerrarSesion && (
              <button
                onClick={onCerrarSesion}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                title="Cerrar la sesión actual"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Linked Father/Tutor Legal Verification Bar */}
      <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
        isTutorVerificado 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
          : 'bg-amber-50/80 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isTutorVerificado ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
          }`}>
            {isTutorVerificado ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">
                Tutor Legal Vinculado: {estudiante.tutor?.nombre_tutor || 'No registrado'} ({estudiante.tutor?.parentesco || 'Tutor'})
              </span>
              <span className="text-stone-300">·</span>
              <span className="font-mono-code text-[11px] flex items-center gap-1">
                <Mail className="w-3 h-3 opacity-60" />
                {estudiante.tutor?.correo_tutor || 'Sin correo registrado'}
              </span>
            </div>
            <div className="text-[11px] opacity-80 mt-0.5">
              {isTutorVerificado ? (
                <span className="text-emerald-800 font-semibold">
                  ✓ Correo verificado y consentimiento firmado en la base de datos escolar. (Pase QR habilitado para imprimir).
                </span>
              ) : (
                <span className="text-amber-800 font-semibold">
                  ⚠️ Correo sin firmar en la base de datos. Se requiere la firma de tu tutor para autorizar la impresión del pase oficial.
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setModalTutorSignOpen(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap shadow-2xs ${
            isTutorVerificado
              ? 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-amber-700 hover:bg-amber-800 text-white'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>{isTutorVerificado ? 'Ver Firma del Tutor' : 'Firmar y Validar Tutor Ahora'}</span>
        </button>
      </div>

      {/* Self-Registration Modal */}
      <StudentSelfRegistrationModal
        isOpen={modalSelfRegOpen}
        onClose={() => setModalSelfRegOpen(false)}
        onStudentRegistered={(newEst) => {
          onCambiarEstudiante(newEst.num_control);
          if (onStudentUpdated) onStudentUpdated(newEst);
        }}
      />

      {/* Tutor Signature Modal */}
      <TutorSignatureModal
        estudiante={estudiante}
        isOpen={modalTutorSignOpen}
        onClose={() => setModalTutorSignOpen(false)}
        onSignatureSuccess={(updated) => {
          onCambiarEstudiante(updated.num_control);
          if (onStudentUpdated) onStudentUpdated(updated);
        }}
      />
    </div>
  );
};
