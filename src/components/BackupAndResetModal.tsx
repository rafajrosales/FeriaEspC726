import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  RotateCcw, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Users, 
  GraduationCap, 
  School, 
  FileJson,
  Sparkles,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  getEstudiantes, 
  getDocentes, 
  descargarRespaldoJSON, 
  restaurarDesdeRespaldoJSON, 
  reiniciarAlumnosYDocentes, 
  reiniciarSoloAlumnos, 
  reiniciarSoloDocentes,
  RespaldoCompletoCETis7,
  generarRespaldoCompleto
} from '../services/storage';

interface BackupAndResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
  initialMode?: 'respaldar' | 'reiniciar' | 'restaurar';
}

export const BackupAndResetModal: React.FC<BackupAndResetModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
  initialMode = 'respaldar'
}) => {
  const [activeTab, setActiveTab] = useState<'respaldar' | 'reiniciar' | 'restaurar'>(initialMode);
  
  // Reiniciar options
  const [resetScope, setResetScope] = useState<'todo' | 'alumnos' | 'docentes' | 'limpiar_todo'>('todo');
  const [autoBackupBeforeReset, setAutoBackupBeforeReset] = useState<boolean>(true);
  const [confirmInput, setConfirmInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // File upload for restore
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [previewRespaldo, setPreviewRespaldo] = useState<RespaldoCompletoCETis7 | null>(null);

  if (!isOpen) return null;

  const totalAlumnos = getEstudiantes().length;
  const totalDocentes = getDocentes().length;

  const handleDescargarRespaldoClick = () => {
    try {
      const res = descargarRespaldoJSON();
      setStatusMessage({
        type: 'success',
        text: `¡Respaldo descargado con éxito! Se guardaron ${res.totalAlumnos} alumnos y ${res.totalDocentes} docentes en el archivo "${res.nombreArchivo}".`
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Ocurrió un error al generar la descarga del respaldo.'
      });
    }
  };

  const handleExportCSVAlumnos = () => {
    const estudiantes = getEstudiantes();
    const headers = ['Numero_Control', 'Nombre_Completo', 'CURP', 'Grupo', 'Turno', 'Telefono', 'Tutor_Nombre', 'Tutor_Correo', 'Tutor_Telefono', 'Tutor_Verificado'];
    const rows = estudiantes.map(e => [
      `"${e.num_control}"`,
      `"${e.nombre_completo}"`,
      `"${e.curp}"`,
      `"${e.grupo}"`,
      `"${e.turno}"`,
      `"${e.telefono_alumno || ''}"`,
      `"${e.tutor?.nombre_tutor || ''}"`,
      `"${e.tutor?.correo_tutor || ''}"`,
      `"${e.tutor?.telefono_tutor || ''}"`,
      `"${e.tutor?.verificado ? 'SI' : 'NO'}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `CETis7_Padron_Alumnos_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSVDocentes = () => {
    const docentes = getDocentes();
    const headers = ['ID', 'Nombre_Completo', 'RFC', 'Correo_Institucional', 'Academia', 'Rol', 'Clave_Acceso', 'Estatus', 'Fecha_Alta'];
    const rows = docentes.map(d => [
      `"${d.id}"`,
      `"${d.nombre_completo}"`,
      `"${d.rfc}"`,
      `"${d.correo_institucional}"`,
      `"${d.academia}"`,
      `"${d.rol}"`,
      `"${d.clave_acceso}"`,
      `"${d.estatus_autorizacion}"`,
      `"${d.fecha_alta}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `CETis7_Padron_Docentes_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArchivoSeleccionado(file);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.datos && (parsed.datos.alumnos || parsed.datos.docentes)) {
          setPreviewRespaldo(parsed);
          setStatusMessage({
            type: 'info',
            text: `Archivo válido cargado. Contiene ${parsed.datos.alumnos?.length || 0} alumnos y ${parsed.datos.docentes?.length || 0} docentes generados el ${new Date(parsed.fecha_generacion || Date.now()).toLocaleDateString('es-MX')}.`
          });
        } else {
          setPreviewRespaldo(null);
          setStatusMessage({
            type: 'error',
            text: 'El archivo seleccionado no tiene la estructura de respaldo oficial del CETis 7.'
          });
        }
      } catch {
        setPreviewRespaldo(null);
        setStatusMessage({
          type: 'error',
          text: 'No se pudo leer el archivo JSON. Asegúrate de que no esté dañado.'
        });
      }
    };
    reader.readAsText(file);
  };

  const handleRestaurarConfirmar = () => {
    if (!archivoSeleccionado) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = restaurarDesdeRespaldoJSON(text);

      setIsProcessing(false);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: `¡Restauración exitosa! Se restauraron ${res.totalAlumnos} alumnos y ${res.totalDocentes} docentes.`
        });
        onDataChanged();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          text: res.mensaje
        });
      }
    };
    reader.readAsText(archivoSeleccionado);
  };

  const handleEjecutarReinicio = () => {
    setIsProcessing(true);

    try {
      // Step 1: Automatic backup if checked
      if (autoBackupBeforeReset) {
        try {
          descargarRespaldoJSON();
        } catch {
          // Safe ignore if popup blocker prevents download during reset
        }
      }

      // Step 2: Execute requested scope
      if (resetScope === 'todo') {
        reiniciarAlumnosYDocentes('iniciales');
      } else if (resetScope === 'alumnos') {
        reiniciarSoloAlumnos('iniciales');
      } else if (resetScope === 'docentes') {
        reiniciarSoloDocentes('iniciales');
      } else if (resetScope === 'limpiar_todo') {
        reiniciarAlumnosYDocentes('limpiar');
      }

      setIsProcessing(false);
      setStatusMessage({
        type: 'success',
        text: '¡El reinicio se ha completado correctamente! Los padrones han sido actualizados.'
      });
      onDataChanged();

      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMessage({
        type: 'error',
        text: `Ocurrió un error al procesar el reinicio: ${err?.message || 'Error desconocido'}`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-stone-200 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh] my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="backup-modal-title"
      >
        {/* Institutional Top Header */}
        <div className="bg-[#721B32] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#5a1527] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-bold shadow-xs">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber-200 block font-semibold">
                Centro de Datos · Dirección & Subdirección
              </span>
              <h2 id="backup-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                Respaldar y Reiniciar Alumnos y Docentes
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Counters Ribbon */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-stone-700 gap-2 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-[#721B32]" />
              <strong>{totalAlumnos}</strong> Alumnos en padrón
            </span>
            <span className="text-stone-300">|</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-emerald-700" />
              <strong>{totalDocentes}</strong> Profesores autorizados
            </span>
          </div>
          <span className="text-[11px] font-mono-code text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
            CETis 7 · Feria 2026
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 pt-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('respaldar'); setStatusMessage(null); }}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'respaldar'
                  ? 'border-[#721B32] text-[#721B32]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>1. Descargar Respaldo</span>
            </button>
            <button
              onClick={() => { setActiveTab('reiniciar'); setStatusMessage(null); }}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reiniciar'
                  ? 'border-red-600 text-red-700'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>2. Reiniciar Datos</span>
            </button>
            <button
              onClick={() => { setActiveTab('restaurar'); setStatusMessage(null); }}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'restaurar'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>3. Restaurar Respaldo</span>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Status Alert Banner if any */}
          {statusMessage && (
            <div className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : statusMessage.type === 'error'
                  ? 'bg-red-50 border-red-300 text-red-900'
                  : 'bg-blue-50 border-blue-300 text-blue-900'
            }`}>
              {statusMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
              {statusMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
              {statusMessage.type === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}
              <div className="font-medium">{statusMessage.text}</div>
            </div>
          )}

          {/* TAB 1: DESCARGAR RESPALDO */}
          {activeTab === 'respaldar' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Respaldo Integral Oficial</strong>
                  <span>
                    El archivo JSON almacena todos los datos: padrón de estudiantes, diagnósticos vocacionales, progreso de especialidades, firmas de tutores, asistencias al rally y catálogo de docentes con sus claves autorizadas.
                  </span>
                </div>
              </div>

              {/* Main JSON Backup Card */}
              <div className="p-4 rounded-xl border-2 border-[#721B32]/20 bg-linear-to-br from-white to-[#721B32]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#721B32] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileJson className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900">
                      Respaldo Maestro Completo (.JSON)
                    </h3>
                    <p className="text-xs text-stone-600">
                      Incluye {totalAlumnos} alumnos + {totalDocentes} docentes + calificaciones y firmas
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDescargarRespaldoClick}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Archivo JSON</span>
                </button>
              </div>

              {/* CSV Export Options for Excel */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
                  Opciones Adicionales de Exportación en Formato Tabla (CSV / Excel):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                    <div>
                      <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#721B32]" />
                        <span>Padrón de Alumnos (.CSV)</span>
                      </div>
                      <div className="text-[11px] text-stone-500">Con CURP, grupo y tutor legal</div>
                    </div>
                    <button
                      onClick={handleExportCSVAlumnos}
                      className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                    <div>
                      <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-700" />
                        <span>Padrón de Docentes (.CSV)</span>
                      </div>
                      <div className="text-[11px] text-stone-500">Con RFC, academia, rol y PIN</div>
                    </div>
                    <button
                      onClick={handleExportCSVDocentes}
                      className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REINICIAR DATOS */}
          {activeTab === 'reiniciar' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-950 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Atención: Acción de Reinicio Administrativo</strong>
                  <span>
                    Selecciona el alcance del reinicio. Para tu tranquilidad, la opción de respaldo automático descargará una copia de seguridad antes de aplicar cualquier modificación.
                  </span>
                </div>
              </div>

              {/* Scope Selector Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
                  Selecciona qué deseas reiniciar:
                </label>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* Option 1: Todo a valores oficiales de inicio */}
                  <label className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    resetScope === 'todo' ? 'border-[#721B32] bg-[#721B32]/5' : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="resetScope"
                      checked={resetScope === 'todo'}
                      onChange={() => setResetScope('todo')}
                      className="w-4 h-4 text-[#721B32] focus:ring-[#721B32] mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <School className="w-4 h-4 text-[#721B32]" />
                        <span>Reiniciar Alumnos y Docentes (Configuración Oficial CETis 7)</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">
                        Restaura los 8 alumnos modelo con diagnósticos completos y los 4 profesores titulares de las academias de Programación, Comercio, RRHH y Cosmetología.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Solo Alumnos */}
                  <label className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    resetScope === 'alumnos' ? 'border-amber-600 bg-amber-500/5' : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="resetScope"
                      checked={resetScope === 'alumnos'}
                      onChange={() => setResetScope('alumnos')}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-600 mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        <span>Reiniciar Solo Alumnos (Conserva Docentes Registrados)</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">
                        Restablece el padrón de alumnos a la lista oficial inicial y limpia los nuevos registros de prueba, manteniendo intactos todos los profesores dados de alta.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Solo Docentes */}
                  <label className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    resetScope === 'docentes' ? 'border-emerald-600 bg-emerald-500/5' : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="resetScope"
                      checked={resetScope === 'docentes'}
                      onChange={() => setResetScope('docentes')}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-600 mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-700" />
                        <span>Reiniciar Solo Docentes (Conserva Alumnos Registrados)</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">
                        Restablece el catálogo de profesores a los 4 jefes de academia base (PROG2026, COM2026, RRHH2026, COSM2026), manteniendo los estudiantes y sus evaluaciones.
                      </p>
                    </div>
                  </label>

                  {/* Option 4: Limpiar Todo en Blanco */}
                  <label className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    resetScope === 'limpiar_todo' ? 'border-red-600 bg-red-500/5' : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="resetScope"
                      checked={resetScope === 'limpiar_todo'}
                      onChange={() => setResetScope('limpiar_todo')}
                      className="w-4 h-4 text-red-600 focus:ring-red-600 mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <RotateCcw className="w-4 h-4 text-red-600" />
                        <span>Padrón en Blanco (Nueva Convocatoria / Cero Alumnos)</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">
                        Vacía las bases de datos para iniciar una jornada de registro en tiempo real sin alumnos ni registros previos.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Auto backup check safety */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-stone-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoBackupBeforeReset}
                    onChange={(e) => setAutoBackupBeforeReset(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-[#721B32] focus:ring-[#721B32] cursor-pointer"
                  />
                  <span className="font-semibold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-stone-600" />
                    Descargar automáticamente copia de seguridad (.JSON) antes de reiniciar (Recomendado)
                  </span>
                </label>
              </div>

              {/* Confirmation execution button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleEjecutarReinicio}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-red-700 hover:bg-red-800 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Procesando reinicio...' : 'Confirmar y Ejecutar Reinicio'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RESTAURAR RESPALDO */}
          {activeTab === 'restaurar' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Restauración desde Archivo JSON</strong>
                  <span>
                    Selecciona un archivo descargado previamente desde esta plataforma para recuperar el padrón de alumnos, diagnósticos y profesores autorizados.
                  </span>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-blue-500 bg-stone-50 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-800">
                  {archivoSeleccionado ? archivoSeleccionado.name : 'Haz clic para seleccionar el archivo de respaldo (.json)'}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Archivos compatibles: Respaldo_CETis7_Alumnos_Docentes_*.json
                </p>
              </div>

              {/* File Preview */}
              {previewRespaldo && (
                <div className="p-3.5 bg-stone-100 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <div className="font-bold text-stone-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Respaldo reconocido:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-stone-700 pt-1">
                    <div>
                      <span className="text-stone-500">Plantel:</span> {previewRespaldo.plantel}
                    </div>
                    <div>
                      <span className="text-stone-500">Fecha:</span> {new Date(previewRespaldo.fecha_generacion).toLocaleString('es-MX')}
                    </div>
                    <div>
                      <span className="text-stone-500">Alumnos a restaurar:</span> {previewRespaldo.datos.alumnos?.length || 0}
                    </div>
                    <div>
                      <span className="text-stone-500">Docentes a restaurar:</span> {previewRespaldo.datos.docentes?.length || 0}
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleRestaurarConfirmar}
                      className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isProcessing ? 'Restaurando...' : 'Aplicar Restauración Ahora'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span className="hidden sm:inline">DGETI · CETis No. 7 Cuautepec</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
