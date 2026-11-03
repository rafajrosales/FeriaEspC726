import React, { useRef, useState, useEffect } from 'react';
import { Estudiante } from '../types';
import { verificarYFirmarTutor } from '../services/storage';
import { ShieldCheck, Mail, Check, X, RotateCcw, Lock, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TutorSignatureModalProps {
  estudiante: Estudiante;
  isOpen: boolean;
  onClose: () => void;
  onSignatureSuccess: (updatedStudent: Estudiante) => void;
}

export const TutorSignatureModal: React.FC<TutorSignatureModalProps> = ({
  estudiante,
  isOpen,
  onClose,
  onSignatureSuccess
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [nombreTutor, setNombreTutor] = useState(estudiante.tutor?.nombre_tutor || '');
  const [correoTutor, setCorreoTutor] = useState(estudiante.tutor?.correo_tutor || '');
  const [parentesco, setParentesco] = useState(estudiante.tutor?.parentesco || 'Padre');
  const [consentAceptado, setConsentAceptado] = useState(false);
  const [metodoFirma, setMetodoFirma] = useState<'trazado' | 'codigo'>('trazado');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [simulatedCode, setSimulatedCode] = useState('721026');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (estudiante) {
      setNombreTutor(estudiante.tutor?.nombre_tutor || '');
      setCorreoTutor(estudiante.tutor?.correo_tutor || '');
      setParentesco(estudiante.tutor?.parentesco || 'Padre');
    }
  }, [estudiante]);

  // Setup drawing canvas
  useEffect(() => {
    if (isOpen && metodoFirma === 'trazado' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen, metodoFirma]);

  if (!isOpen) return null;

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSimulateSendCode = () => {
    if (!correoTutor) {
      setErrorMsg('Ingresa un correo electrónico válido para enviar el código.');
      return;
    }
    setErrorMsg(null);
    setCodigoEnviado(true);
    setCodigoIngresado(simulatedCode);
  };

  const handleConfirmSignature = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombreTutor.trim()) {
      setErrorMsg('Por favor escribe el nombre completo del padre, madre o tutor legal.');
      return;
    }

    if (!correoTutor.trim() || !correoTutor.includes('@')) {
      setErrorMsg('Por favor proporciona un correo electrónico válido del tutor.');
      return;
    }

    if (!consentAceptado) {
      setErrorMsg('Debes marcar la casilla de aceptación y consentimiento legal.');
      return;
    }

    let firmaFinal = '';
    if (metodoFirma === 'trazado') {
      if (!hasDrawn || !canvasRef.current) {
        setErrorMsg('Por favor realiza la firma manuscrita en el recuadro blanco.');
        return;
      }
      firmaFinal = canvasRef.current.toDataURL('image/png');
    } else {
      if (codigoIngresado !== simulatedCode) {
        setErrorMsg('El código de verificación no coincide con el enviado al correo.');
        return;
      }
      firmaFinal = `Firma Electrónica Verificada OTP: [${simulatedCode}] - ${correoTutor}`;
    }

    // Save signature into database
    const updated = verificarYFirmarTutor(estudiante.num_control, firmaFinal, correoTutor);
    if (updated) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe ignore
      }
      onSignatureSuccess(updated);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#721B32] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-200 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold block">
                Consentimiento Familiar DGETI
              </span>
              <h3 className="text-base font-bold text-white">
                Firma y Verificación de Papá o Tutor Legal
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirmSignature} className="p-6 space-y-4 text-xs">
          {/* Explanation Alert */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 leading-relaxed">
            <span className="font-bold block mb-1">Requisito Obligatorio de Impresión:</span>
            Para que el Pase Digital QR sea válido e imprimible para el Rally Presencial, el padre, madre o tutor debe autorizar con su correo verificado y firmar la conformidad institucional.
          </div>

          {/* Student Info Card */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-2 gap-2 text-stone-700">
            <div>
              <span className="text-[10px] uppercase text-stone-400 font-bold block">Alumno:</span>
              <span className="font-bold text-stone-900">{estudiante.nombre_completo}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 font-bold block">Núm. de Control:</span>
              <span className="font-mono-code font-bold text-stone-900">{estudiante.num_control}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 font-bold block">Grupo y Turno:</span>
              <span className="font-semibold text-stone-800">{estudiante.grupo} ({estudiante.turno})</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 font-bold block">Plantel:</span>
              <span className="font-semibold text-stone-800">CETis No. 7 Cuautepec</span>
            </div>
          </div>

          {/* Tutor Inputs */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <label className="font-bold text-stone-800 block mb-1">Nombre Completo del Papá / Mamá / Tutor:</label>
                <input
                  type="text"
                  required
                  value={nombreTutor}
                  onChange={e => setNombreTutor(e.target.value)}
                  placeholder="ej. Lic. Fernando Morales Silva"
                  className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="font-bold text-stone-800 block mb-1">Parentesco:</label>
                <select
                  value={parentesco}
                  onChange={e => setParentesco(e.target.value as any)}
                  className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50 text-xs font-medium"
                >
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Tutor Legal">Tutor Legal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">
                Correo Electrónico del Papá o Tutor (donde queda registrado en la base de datos):
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={correoTutor}
                  onChange={e => setCorreoTutor(e.target.value)}
                  placeholder="ej. tutor.familia@gmail.com"
                  className="w-full pl-8 pr-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-xs font-mono-code font-medium"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Signature Method Switcher */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800">Método de Firma Digital:</span>
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => setMetodoFirma('trazado')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                    metodoFirma === 'trazado' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  ✍️ Trazo Manuscrito
                </button>
                <button
                  type="button"
                  onClick={() => setMetodoFirma('codigo')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                    metodoFirma === 'codigo' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  🔑 Código al Correo
                </button>
              </div>
            </div>

            {/* Canvas for manual drawing */}
            {metodoFirma === 'trazado' ? (
              <div className="space-y-1.5">
                <div className="relative border-2 border-dashed border-stone-300 rounded-xl bg-white overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={460}
                    height={130}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-32 block cursor-crosshair touch-none"
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-stone-400 text-xs italic">
                      Firma aquí con tu dedo o ratón (Padre / Tutor)
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Trazo manuscrito con validez para el pase oficial.</span>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Limpiar
                  </button>
                </div>
              </div>
            ) : (
              /* OTP simulated method */
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <p className="text-stone-600 text-[11px]">
                  Enviamos un enlace y clave de 6 dígitos a <strong>{correoTutor || 'tu correo'}</strong> para verificar tu identidad:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={codigoIngresado}
                    onChange={e => setCodigoIngresado(e.target.value)}
                    placeholder="Código de 6 dígitos (ej. 721026)"
                    className="flex-1 p-2 border border-stone-300 rounded-lg bg-white font-mono-code text-center font-bold text-sm tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={handleSimulateSendCode}
                    className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-semibold text-xs whitespace-nowrap"
                  >
                    {codigoEnviado ? 'Reenviar Código' : 'Simular Envío'}
                  </button>
                </div>
                {codigoEnviado && (
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    ✓ Código simulado verificado: <code>{simulatedCode}</code>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Legal Consent Checkbox */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <label className="flex items-start gap-2 text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentAceptado}
                onChange={e => setConsentAceptado(e.target.checked)}
                className="mt-0.5 rounded text-[#721B32] focus:ring-[#721B32]"
              />
              <span className="leading-snug">
                <strong>Autorización Legal DGETI:</strong> Como {parentesco.toLowerCase()} del alumno, autorizo su participación en la Feria de Especialidades e Innovación Tecnológica 2026 del CETis No. 7 y confirmo que este correo electrónico es el medio oficial de notificación para el pase digital.
              </span>
            </label>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-medium text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#721B32] hover:bg-[#5b1528] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              Guardar Firma y Desbloquear Impresión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
