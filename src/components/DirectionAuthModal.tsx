import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  AlertCircle, 
  X, 
  ArrowRight, 
  School,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { setSesionActiva, SesionUsuario, validarClaveAccesoDocente } from '../services/storage';

interface DirectionAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (sesion: SesionUsuario) => void;
}

export const DirectionAuthModal: React.FC<DirectionAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess
}) => {
  const [claveInput, setClaveInput] = useState('');
  const [rfcDocente, setRfcDocente] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const check = validarClaveAccesoDocente(claveInput);

    if (!check.valido) {
      setErrorMsg(check.mensajeError || 'Clave de acceso incorrecta.');
      return;
    }

    // Auth Granted
    const nombreDocente = check.docente
      ? `${check.docente.nombre_completo} (${check.docente.rol} - Academia ${check.docente.academia.toUpperCase()})`
      : rfcDocente.trim()
      ? `Dirección Académica (${rfcDocente.trim().toUpperCase()})`
      : 'Dirección & Subdirección Académica CETis 7';

    const sesionDir: SesionUsuario = {
      tipo: 'docente',
      nombre: nombreDocente
    };

    setSesionActiva(sesionDir);
    onAuthSuccess(sesionDir);
    onClose();
  };


  const handleUseDemoKey = (key: string) => {
    setClaveInput(key);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dir-auth-title"
      >
        {/* Header Bar DGETI Maroon */}
        <div className="bg-[#721B32] text-white px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#5a1527] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-2xs shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber-200 font-semibold block truncate">
                SEP · SEMS · DGETI CDMX
              </span>
              <h2 id="dir-auth-title" className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                Acceso a Dirección Académica
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          <div className="bg-stone-50 border border-stone-200 p-3 sm:p-3.5 rounded-xl text-xs text-stone-700 leading-relaxed flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-[#721B32] shrink-0 mt-0.5" />
            <div>
              <strong>Área Restringida Institucional:</strong> Módulo exclusivo para directivos, subdirectores y docentes del CETis No. 7 "Miguel Lerdo de Tejada".
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              RFC o Clave de Servidor Público (Opcional):
            </label>
            <input
              type="text"
              autoCapitalize="characters"
              placeholder="Ej. LEVM800512HDF..."
              value={rfcDocente}
              onChange={e => setRfcDocente(e.target.value)}
              className="w-full px-3.5 py-3 sm:py-2 text-base sm:text-xs font-mono-code border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Clave de Acceso Institucional / PIN Directivo <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Ingresa la clave oficial DGETI"
                value={claveInput}
                onChange={e => setClaveInput(e.target.value)}
                className="w-full pl-10 pr-14 py-3 sm:py-2 text-base sm:text-xs font-mono-code font-bold tracking-wider border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none bg-white shadow-2xs"
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-[11px] font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg cursor-pointer"
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          {/* Preset Demo Password Callout */}
          <div className="bg-amber-50/90 border border-amber-300 p-3 rounded-xl text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Claves institucionales para demostración:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => handleUseDemoKey('DGETI72026')}
                className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-md font-mono-code font-bold text-[11px] text-amber-950 transition-colors cursor-pointer"
              >
                DGETI72026
              </button>
              <button
                type="button"
                onClick={() => handleUseDemoKey('2026')}
                className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-md font-mono-code font-bold text-[11px] text-amber-950 transition-colors cursor-pointer"
              >
                PIN: 2026
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 py-2.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full sm:flex-1 py-3 sm:py-2.5 text-xs font-bold text-white bg-[#721B32] hover:bg-[#5b1528] active:bg-[#4a1020] rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Autenticar y Entrar</span>
            </button>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="bg-stone-100 px-5 py-2.5 border-t border-stone-200 text-center text-[10px] text-stone-500 font-mono-code">
          CETis No. 7 "Miguel Lerdo de Tejada" · Cuautepec, CDMX
        </div>
      </div>
    </div>
  );
};
