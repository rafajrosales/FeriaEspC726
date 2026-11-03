import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Estudiante, EvaluacionVocacional, ProgresoVirtual } from '../types';
import { TutorSignatureModal } from './TutorSignatureModal';
import { 
  QrCode, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  PenTool, 
  AlertTriangle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DigitalPassQRProps {
  estudiante: Estudiante;
  evaluacion: EvaluacionVocacional | null;
  progreso: ProgresoVirtual;
  onNavigateToPresencial: () => void;
  onStudentUpdated?: (updatedStudent: Estudiante) => void;
}

export const DigitalPassQR: React.FC<DigitalPassQRProps> = ({
  estudiante,
  evaluacion,
  progreso,
  onNavigateToPresencial,
  onStudentUpdated
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState<boolean>(false);

  const isVirtualCompleted = progreso.estatus_fase_virtual === 'COMPLETADO' && progreso.porcentaje_virtual >= 100;
  const isTutorVerificado = Boolean(estudiante.tutor?.verificado);

  useEffect(() => {
    if (isVirtualCompleted && progreso.clave_unica_token && canvasRef.current) {
      const qrData = JSON.stringify({
        plantel: 'CETIS_007',
        nc: estudiante.num_control,
        nom: estudiante.nombre_completo,
        grp: estudiante.grupo,
        tur: estudiante.turno,
        sug: evaluacion?.carrera_sugerida || 'programacion',
        tok: progreso.clave_unica_token,
        prom: progreso.promedio_cuestionarios,
        v: '70%_COMPLETO',
        tutor_verificado: isTutorVerificado,
        correo_tutor: estudiante.tutor?.correo_tutor || 'sin_correo'
      });

      QRCode.toCanvas(canvasRef.current, qrData, {
        width: 180,
        margin: 1,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
    }
  }, [isVirtualCompleted, progreso.clave_unica_token, estudiante, evaluacion, progreso.promedio_cuestionarios, isTutorVerificado]);

  const handleCopyToken = () => {
    if (progreso.clave_unica_token) {
      navigator.clipboard.writeText(progreso.clave_unica_token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (!isTutorVerificado) {
      setIsTutorModalOpen(true);
      return;
    }
    window.print();
  };

  const handleTutorSignatureSuccess = (updatedStudent: Estudiante) => {
    if (onStudentUpdated) {
      onStudentUpdated(updatedStudent);
    }
  };

  if (!isVirtualCompleted) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs text-center max-w-2xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Acreditación Virtual Incompleta</span>
          <h3 className="text-lg font-bold text-stone-900 mt-1">Pase Digital QR Aún Bloqueado</h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
            Para desbloquear tu Clave Única Token y tu Pase de Acceso al 30% Presencial, debes completar al 100% la Fase Virtual (70% del modelo híbrido).
          </p>
        </div>

        {/* Missing items checklist */}
        <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="font-semibold text-stone-800 border-b border-stone-200 pb-1.5">Requisitos pendientes:</div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">1. Evaluación Diagnóstica Vocacional (Aptitud vs Interés)</span>
            <span className={progreso.test_vocacional_completado ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
              {progreso.test_vocacional_completado ? '✓ Completado' : 'Pendiente'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">2. Cuestionario de Programación</span>
            <span className={progreso.progreso_especialidades.programacion.quiz_aprobado ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
              {progreso.progreso_especialidades.programacion.quiz_aprobado ? '✓ Aprobado' : 'Pendiente'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">3. Cuestionario de Comercio Internacional</span>
            <span className={progreso.progreso_especialidades.comercio.quiz_aprobado ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
              {progreso.progreso_especialidades.comercio.quiz_aprobado ? '✓ Aprobado' : 'Pendiente'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">4. Cuestionario de Recursos Humanos</span>
            <span className={progreso.progreso_especialidades.rrhh.quiz_aprobado ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
              {progreso.progreso_especialidades.rrhh.quiz_aprobado ? '✓ Aprobado' : 'Pendiente'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">5. Cuestionario de Cosmetología</span>
            <span className={progreso.progreso_especialidades.cosmetologia.quiz_aprobado ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
              {progreso.progreso_especialidades.cosmetologia.quiz_aprobado ? '✓ Aprobado' : 'Pendiente'}
            </span>
          </div>
        </div>

        <div className="text-xs text-stone-500 font-mono-code pt-1">
          Avance Virtual Actual: {progreso.porcentaje_virtual}% / 100%
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions Bar above credential */}
      <div className="no-print bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                70% Virtual Acreditado
              </span>
              <span className="text-stone-300">·</span>
              <span className={`text-xs font-semibold ${isTutorVerificado ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isTutorVerificado ? '✓ Tutor Firmado' : '⚠️ Pendiente Firma de Tutor'}
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              Pase Digital QR Oficial (Feria 2026)
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Print Button - conditionally styled */}
            <button
              onClick={handlePrint}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-2xs ${
                isTutorVerificado
                  ? 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 cursor-pointer'
                  : 'bg-stone-200 text-stone-500 border border-stone-300 cursor-not-allowed'
              }`}
              title={isTutorVerificado ? 'Imprimir credencial' : 'Bloqueado hasta verificar correo del tutor'}
            >
              {isTutorVerificado ? <Printer className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-stone-500" />}
              {isTutorVerificado ? 'Imprimir Credencial DGETI' : 'Impresión Bloqueada (Falta Firma)'}
            </button>

            <button
              onClick={onNavigateToPresencial}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors flex items-center gap-1.5"
            >
              Validar en Filtro Presencial
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Warning banner if tutor email is NOT verified */}
        {!isTutorVerificado && (
          <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 block">
                  Requisito de Validez Oficial DGETI:
                </span>
                El pase oficial solo se puede imprimir con la cuenta de correo de tu papá o tutor legal (
                <code className="font-mono-code font-bold bg-white px-1.5 py-0.2 rounded border border-amber-200">
                  {estudiante.tutor?.correo_tutor || 'correo pendiente'}
                </code>
                ) verificada y firmada en la base de datos escolar.
              </div>
            </div>

            <button
              onClick={() => setIsTutorModalOpen(true)}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs shrink-0"
            >
              <PenTool className="w-3.5 h-3.5" />
              Firmar y Verificar Tutor Ahora
            </button>
          </div>
        )}

        {/* Success confirmation if verified */}
        {isTutorVerificado && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-950">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Tutor Verificado:</strong> {estudiante.tutor?.nombre_tutor} ({estudiante.tutor?.parentesco}) · Correo: <code className="font-mono-code">{estudiante.tutor?.correo_tutor}</code>
              </span>
            </div>
            <button
              onClick={() => setIsTutorModalOpen(true)}
              className="text-emerald-800 hover:underline text-[11px] font-semibold"
            >
              Ver / Editar Firma
            </button>
          </div>
        )}
      </div>

      {/* Credential Printable Card */}
      <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 max-w-xl mx-auto shadow-md print-shadow-none print-border print-break-inside-avoid">
        {/* Header Institution */}
        <div className="border-b-2 border-[#721B32] pb-3 text-center space-y-1">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">SEP · SEMS · DGETI</span>
            <span className="text-[10px] font-semibold text-[#721B32] font-mono-code">CICLO ESCOLAR 2026</span>
          </div>
          <h2 className="text-sm md:text-base font-extrabold text-stone-900 tracking-tight uppercase">
            Centro de Estudios Tecnológicos industrial y de servicios No. 7
          </h2>
          <div className="text-xs font-serif-institutional italic text-stone-700">
            "Miguel Lerdo de Tejada" · Cuautepec, GAM, CDMX
          </div>
          <div className="text-[11px] font-bold text-stone-800 uppercase tracking-wide pt-1">
            PASE DIGITAL DE ACCESO AL RALLY PRESENCIAL (30%)
          </div>
        </div>

        {/* Content body */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Left Column: QR Code & Token */}
          <div className="flex flex-col items-center justify-center p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="p-1 bg-white rounded-lg border border-stone-300 shadow-2xs">
              <canvas ref={canvasRef} className="block w-[170px] h-[170px]" />
            </div>
            <div className="mt-2 text-center w-full">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Clave Única Token:</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <code className="text-xs font-mono-code font-bold text-[#721B32] bg-white px-2 py-0.5 rounded border border-stone-200">
                  {progreso.clave_unica_token}
                </code>
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="no-print p-1 text-stone-500 hover:text-stone-900 rounded"
                  title="Copiar token"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Student Details */}
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[10px] uppercase text-stone-500 font-semibold block">Nombre del Alumno:</span>
              <span className="font-bold text-stone-900 text-sm block">{estudiante.nombre_completo}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-[10px] uppercase text-stone-500 font-semibold block">Núm. Control:</span>
                <span className="font-mono-code font-bold text-stone-800">{estudiante.num_control}</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-[10px] uppercase text-stone-500 font-semibold block">Grupo / Turno:</span>
                <span className="font-bold text-stone-800">{estudiante.grupo} · {estudiante.turno[0]}</span>
              </div>
            </div>

            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-[10px] uppercase text-amber-900 font-semibold block">Especialidad Recomendada:</span>
              <span className="font-bold text-amber-950 uppercase">
                {evaluacion?.carrera_sugerida ? evaluacion.carrera_sugerida.toUpperCase() : 'PROGRAMACIÓN'}
              </span>
            </div>

            <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-[11px]">
              <span className="text-stone-600">Promedio Cuestionarios:</span>
              <span className="font-mono-code font-bold text-emerald-700">{progreso.promedio_cuestionarios} / 100</span>
            </div>
          </div>
        </div>

        {/* Official Parent/Tutor Legal Signature Block */}
        <div className="my-3 p-3.5 bg-stone-50 rounded-xl border border-stone-300 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
            <span className="font-bold text-[#721B32] uppercase tracking-wider text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#721B32]" />
              Autorización y Firma del Padre, Madre o Tutor Legal
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.2 rounded font-mono-code ${
              isTutorVerificado ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
            }`}>
              {isTutorVerificado ? '✓ VERIFICADO EN BD' : 'PENDIENTE DE FIRMA'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="text-stone-500 block text-[10px]">Tutor Legal Registrado:</span>
              <strong className="text-stone-900 block truncate">{estudiante.tutor?.nombre_tutor}</strong>
              <span className="text-stone-500">Parentesco: {estudiante.tutor?.parentesco}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">Correo Electrónico Verificado:</span>
              <strong className="text-stone-900 font-mono-code block truncate">{estudiante.tutor?.correo_tutor}</strong>
              <span className="text-stone-500">Tel: {estudiante.tutor?.telefono_tutor}</span>
            </div>
          </div>

          {/* Render digital signature trace or text stamp */}
          <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
            <div className="flex-1">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold block">
                Firma Digital del Tutor:
              </span>
              {estudiante.tutor?.firma_digital?.startsWith('data:image') ? (
                <img
                  src={estudiante.tutor.firma_digital}
                  alt="Firma del Tutor"
                  className="h-9 max-w-[180px] object-contain my-0.5"
                />
              ) : (
                <div className="text-[11px] font-serif-institutional italic text-stone-800 font-semibold">
                  {estudiante.tutor?.firma_digital || (isTutorVerificado ? `Fdo. ${estudiante.tutor?.nombre_tutor}` : '[Pendiente de firma manuscrita]')}
                </div>
              )}
            </div>

            <div className="text-right text-[10px] text-stone-500 font-mono-code">
              {estudiante.tutor?.fecha_verificacion ? (
                <div>FECHA: {new Date(estudiante.tutor.fecha_verificacion).toLocaleDateString()}</div>
              ) : (
                <div className="text-amber-700">SIN VERIFICAR</div>
              )}
              <div className="text-[9px] text-stone-400">EXPEDIENTE CETIS 7</div>
            </div>
          </div>
        </div>

        {/* Footer of Card */}
        <div className="border-t border-stone-200 pt-3 text-center space-y-2">
          <p className="text-[10px] text-stone-500 leading-tight">
            Este pase valida el cumplimiento del 70% virtual en la plataforma oficial del CETis No. 7 y la debida autorización del padre/tutor. Presentar este comprobante en el filtro de acceso del plantel para ingresar al Rally Presencial (30%).
          </p>
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono-code pt-1">
            <span>FOLIO: {progreso.clave_unica_token.split('-').slice(1).join('-')}</span>
            <span>SUBDIRECCIÓN ACADÉMICA CETis 7</span>
          </div>
        </div>
      </div>

      {/* Tutor Signature Modal */}
      <TutorSignatureModal
        estudiante={estudiante}
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
        onSignatureSuccess={handleTutorSignatureSuccess}
      />
    </div>
  );
};
