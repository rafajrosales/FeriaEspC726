import React, { useState } from 'react';
import { 
  getEstudiantes, 
  getProgresoVirtual, 
  getEvaluacionVocacional, 
  getAsistenciaPresencialByNC,
  getFichasAcademia,
  saveFichaAcademia,
  getOficioCircular,
  saveOficioCircular,
  resetAllDataToDefault,
  getDocentes,
  registrarNuevoDocente,
  cambiarEstatusDocente,
  eliminarDocente,
  descargarRespaldoJSON
} from '../services/storage';
import { SpecialtyId, FichaAcademiaReq, OficioCircular, DocenteAutorizado, Estudiante } from '../types';
import { BackupAndResetModal } from './BackupAndResetModal';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Download, 
  Printer, 
  Save, 
  RotateCcw, 
  Edit3,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Lock,
  Unlock,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Sparkles,
  School,
  Building2,
  X,
  Search,
  Check
} from 'lucide-react';
import { MatriculaDashboard } from './MatriculaDashboard';

export const AcademicDirection: React.FC = () => {
  const [subTab, setSubTab] = useState<'tablero' | 'ficha' | 'circular' | 'padron' | 'docentes'>('tablero');
  const [selectedAcademia, setSelectedAcademia] = useState<SpecialtyId>('programacion');
  
  // Fichas & Circular state
  const [fichas, setFichas] = useState(getFichasAcademia());
  const [oficio, setOficio] = useState<OficioCircular>(getOficioCircular());
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Filters for padrón estudiantil
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTurno, setFilterTurno] = useState<string>('TODOS');
  const [filterGrupo, setFilterGrupo] = useState<string>('TODOS');
  const [filterTutor, setFilterTutor] = useState<string>('TODOS');

  // Docentes state & management
  const [docentes, setDocentes] = useState<DocenteAutorizado[]>(() => getDocentes());
  const [mostrarModalAltaDocente, setMostrarModalAltaDocente] = useState(false);
  const [searchDocente, setSearchDocente] = useState('');
  const [filterDocenteAcademia, setFilterDocenteAcademia] = useState<string>('TODAS');
  const [filterDocenteEstatus, setFilterDocenteEstatus] = useState<string>('TODOS');
  const [docenteClaveVisibleId, setDocenteClaveVisibleId] = useState<string | null>(null);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  // Form state for new docente registration
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRfc, setNuevoRfc] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevaAcademia, setNuevaAcademia] = useState<SpecialtyId | 'general'>('programacion');
  const [nuevoRol, setNuevoRol] = useState<DocenteAutorizado['rol']>('Profesor Titular');
  const [nuevaClave, setNuevaClave] = useState('');
  const [nuevoEstatus, setNuevoEstatus] = useState<'AUTORIZADO' | 'PENDIENTE'>('AUTORIZADO');
  const [docenteFormError, setDocenteFormError] = useState<string | null>(null);
  const [docenteSuccessNotice, setDocenteSuccessNotice] = useState<string | null>(null);

  // Modal para Respaldar y Reiniciar Alumnos y Docentes
  const [mostrarModalRespaldo, setMostrarModalRespaldo] = useState(false);
  const [modoInicialRespaldo, setModoInicialRespaldo] = useState<'respaldar' | 'reiniciar' | 'restaurar'>('respaldar');

  const [estudiantesList, setEstudiantesList] = useState<Estudiante[]>(() => getEstudiantes());
  const estudiantes = estudiantesList;
  const currentFicha = fichas[selectedAcademia];

  const handleDataChanged = () => {
    setEstudiantesList(getEstudiantes());
    setDocentes(getDocentes());
    setFichas(getFichasAcademia());
    setOficio(getOficioCircular());
    setSavedNotice('¡Padrones y registros actualizados correctamente!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleReloadDocentes = () => {
    setDocentes(getDocentes());
  };

  const handleRegistrarDocenteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDocenteFormError(null);

    if (!nuevoNombre.trim() || nuevoNombre.trim().length < 4) {
      setDocenteFormError('Por favor ingresa el nombre completo con apellidos del profesor.');
      return;
    }

    if (!nuevoRfc.trim() || nuevoRfc.trim().length < 8) {
      setDocenteFormError('Ingresa un RFC o Clave de Servidor Público válido.');
      return;
    }

    if (!nuevaClave.trim() || nuevaClave.trim().length < 4) {
      setDocenteFormError('La clave de acceso o PIN personal debe tener al menos 4 caracteres.');
      return;
    }

    const cleanCorreo = nuevoCorreo.trim() || `${nuevoNombre.toLowerCase().split(' ')[0]}.${nuevoRfc.slice(-4).toLowerCase()}@cetis7.edu.mx`;

    const result = registrarNuevoDocente({
      nombre_completo: nuevoNombre.trim(),
      rfc: nuevoRfc.trim().toUpperCase(),
      correo_institucional: cleanCorreo,
      academia: nuevaAcademia,
      rol: nuevoRol,
      clave_acceso: nuevaClave.trim().toUpperCase(),
      estatus_autorizacion: nuevoEstatus,
      registrado_por: 'Administrador DGETI'
    });

    if (!result.success) {
      setDocenteFormError(result.error || 'Ocurrió un error al registrar el docente.');
      return;
    }

    setDocentes(getDocentes());
    setDocenteSuccessNotice(`¡Profesor ${result.docente?.nombre_completo} registrado exitosamente como ${result.docente?.estatus_autorizacion}!`);
    
    // Reset form
    setNuevoNombre('');
    setNuevoRfc('');
    setNuevoCorreo('');
    setNuevaClave('');
    setDocenteFormError(null);
    setMostrarModalAltaDocente(false);

    setTimeout(() => setDocenteSuccessNotice(null), 4000);
  };

  const handleCambiarEstatusDocenteClick = (id: string, nuevoEst: 'AUTORIZADO' | 'PENDIENTE' | 'REVOCADO') => {
    cambiarEstatusDocente(id, nuevoEst);
    handleReloadDocentes();
  };

  const handleEliminarDocenteClick = (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre} del padrón de profesores autorizados?`)) {
      eliminarDocente(id);
      handleReloadDocentes();
    }
  };

  const handleGenerarClaveAleatoria = () => {
    const prefixes = ['PROFE', 'ACAD', 'CETIS', 'DOC'];
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    setNuevaClave(`${p}${num}`);
  };

  const handleCopiarClave = (clave: string) => {
    navigator.clipboard.writeText(clave);
    setCopyNotice(`Clave "${clave}" copiada al portapapeles.`);
    setTimeout(() => setCopyNotice(null), 2500);
  };

  const docentesFiltrados = docentes.filter(d => {
    const matchesSearch = d.nombre_completo.toLowerCase().includes(searchDocente.toLowerCase()) ||
                          d.rfc.toLowerCase().includes(searchDocente.toLowerCase()) ||
                          d.correo_institucional.toLowerCase().includes(searchDocente.toLowerCase()) ||
                          d.clave_acceso.toLowerCase().includes(searchDocente.toLowerCase());
    const matchesAcademia = filterDocenteAcademia === 'TODAS' || d.academia === filterDocenteAcademia;
    const matchesEstatus = filterDocenteEstatus === 'TODOS' || d.estatus_autorizacion === filterDocenteEstatus;
    return matchesSearch && matchesAcademia && matchesEstatus;
  });


  // Calculate statistics
  const totalInscritos = estudiantes.length;
  let virtualCompletados = 0;
  let presencialAcreditados = 0;
  let tutoresVerificadosCount = 0;
  const distribucionVocacional: Record<string, number> = { programacion: 0, comercio: 0, rrhh: 0, cosmetologia: 0 };

  estudiantes.forEach(est => {
    if (est.tutor?.verificado) tutoresVerificadosCount++;
    const prog = getProgresoVirtual(est.num_control);
    if (prog.estatus_fase_virtual === 'COMPLETADO') virtualCompletados++;
    const asis = getAsistenciaPresencialByNC(est.num_control);
    if (asis?.estatus_final === 'ACREDITADO') presencialAcreditados++;
    const evalVoc = getEvaluacionVocacional(est.num_control);
    if (evalVoc?.carrera_sugerida) {
      distribucionVocacional[evalVoc.carrera_sugerida] = (distribucionVocacional[evalVoc.carrera_sugerida] || 0) + 1;
    }
  });

  const handleSaveFicha = () => {
    saveFichaAcademia(currentFicha);
    setSavedNotice('Ficha de Academia guardada con éxito.');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveOficio = () => {
    saveOficioCircular(oficio);
    setSavedNotice('Oficio Circular actualizado.');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleExportCSV = () => {
    const headers = [
      'Numero_Control', 
      'Nombre_Completo', 
      'Grupo', 
      'Turno', 
      'Tutor_Nombre', 
      'Tutor_Correo', 
      'Tutor_Verificado', 
      'Fase_Virtual_Pct', 
      'Promedio_Quiz', 
      'Token', 
      'Fase_Presencial_Status', 
      'Carrera_Sugerida'
    ];
    const rows = estudiantes.map(e => {
      const prog = getProgresoVirtual(e.num_control);
      const asis = getAsistenciaPresencialByNC(e.num_control);
      const evalVoc = getEvaluacionVocacional(e.num_control);
      return [
        `"${e.num_control}"`,
        `"${e.nombre_completo}"`,
        `"${e.grupo}"`,
        `"${e.turno}"`,
        `"${e.tutor?.nombre_tutor || 'No asignado'}"`,
        `"${e.tutor?.correo_tutor || 'No asignado'}"`,
        `"${e.tutor?.verificado ? 'SI (FIRMADO)' : 'NO (PENDIENTE)'}"`,
        `"${prog.porcentaje_virtual}%"`,
        `"${prog.promedio_cuestionarios}"`,
        `"${prog.clave_unica_token || 'N/A'}"`,
        `"${asis?.estatus_final || 'PENDIENTE'}"`,
        `"${evalVoc?.carrera_sugerida || 'N/A'}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CETis7_Feria2026_Reporte_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenModalReinicio = () => {
    setModoInicialRespaldo('reiniciar');
    setMostrarModalRespaldo(true);
  };

  const handleOpenModalRespaldo = () => {
    setModoInicialRespaldo('respaldar');
    setMostrarModalRespaldo(true);
  };

  // Filter students for padrón
  const filteredEstudiantes = estudiantes.filter(e => {
    const matchesSearch = e.nombre_completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.num_control.includes(searchQuery);
    const matchesTurno = filterTurno === 'TODOS' || e.turno === filterTurno;
    const matchesGrupo = filterGrupo === 'TODOS' || e.grupo === filterGrupo;
    const matchesTutor = filterTutor === 'TODOS' || 
                         (filterTutor === 'VERIFICADOS' && e.tutor?.verificado) ||
                         (filterTutor === 'PENDIENTES' && !e.tutor?.verificado);
    return matchesSearch && matchesTurno && matchesGrupo && matchesTutor;
  });

  return (
    <div className="space-y-6">
      {/* Top Navigation for Academic Subdirection */}
      <div className="no-print bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3 mb-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Dirección & Subdirección Académica</span>
            <h3 className="text-lg font-bold text-stone-900">Coordinación Técnico-Pedagógica DGETI · Ciclo 2026</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Botón para Respaldar Alumnos y Docentes */}
            <button
              onClick={handleOpenModalRespaldo}
              title="Descargar copia de seguridad en JSON de alumnos y profesores"
              className="px-3 py-1.5 text-xs font-bold text-[#721B32] bg-[#721B32]/10 hover:bg-[#721B32]/20 border border-[#721B32]/30 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#721B32]" />
              <span>Respaldar Datos (.JSON)</span>
            </button>

            {/* Botón para Reiniciar Alumnos y Docentes */}
            <button
              onClick={handleOpenModalReinicio}
              title="Reiniciar alumnos y/o docentes a valores oficiales o en blanco"
              className="px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-600" />
              <span>Reiniciar Alumnos y Docentes</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-stone-600" />
              <span>Reporte CSV</span>
            </button>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setSubTab('tablero')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'tablero' ? 'bg-[#721B32] text-white font-semibold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            1. Tablero de Matrícula (Gráficos)
          </button>
          <button
            onClick={() => setSubTab('ficha')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'ficha' ? 'bg-[#721B32] text-white font-semibold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            2. Ficha Estandarizada de Academia
          </button>
          <button
            onClick={() => setSubTab('circular')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'circular' ? 'bg-[#721B32] text-white font-semibold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            3. Circular Oficial DGETI
          </button>
          <button
            onClick={() => setSubTab('padron')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'padron' ? 'bg-[#721B32] text-white font-semibold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            4. Padrón Estudiantil & Validaciones
          </button>
          <button
            onClick={() => setSubTab('docentes')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'docentes' ? 'bg-[#721B32] text-white font-semibold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            5. Padrón de Docentes Autorizados ({docentes.filter(d => d.estatus_autorizacion === 'AUTORIZADO').length})
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {savedNotice}
        </div>
      )}

      {/* Subtab 1: Tablero de Matrícula y Gráficos de Barras */}
      {subTab === 'tablero' && (
        <MatriculaDashboard />
      )}

      {/* Subtab 2: Ficha Estandarizada de Requerimiento de Material a Academias */}
      {subTab === 'ficha' && (
        <div className="space-y-6">
          {/* Academy Picker Bar */}
          <div className="no-print bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-600">Seleccionar Academia:</span>
              <div className="flex items-center gap-1">
                {(['programacion', 'comercio', 'rrhh', 'cosmetologia'] as SpecialtyId[]).map(id => (
                  <button
                    key={id}
                    onClick={() => setSelectedAcademia(id)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                      selectedAcademia === id
                        ? 'bg-[#721B32] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {id === 'rrhh' ? 'Recursos Humanos' : id}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveFicha}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Guardar Ficha
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Formato Oficial
              </button>
            </div>
          </div>

          {/* Standardized Form Preview / Editor */}
          <div className="bg-white rounded-2xl border-2 border-stone-300 p-8 max-w-4xl mx-auto shadow-sm print-shadow-none print-border print-break-inside-avoid">
            {/* Form Header */}
            <div className="border-b-2 border-stone-800 pb-3 text-center space-y-1 font-mono-code">
              <div className="text-[11px] text-stone-600 font-bold uppercase">
                CETis No. 7 "MIGUEL LERDO DE TEJADA" | FERIA DE ESPECIALIDADES 2026
              </div>
              <h2 className="text-base font-extrabold text-stone-900 tracking-wide uppercase">
                FICHA DE REGISTRO DE CONTENIDOS Y ACTIVIDADES DE ACADEMIA
              </h2>
            </div>

            {/* Datos de la Academia */}
            <div className="py-4 border-b border-stone-300 space-y-3 text-xs">
              <div className="font-bold text-stone-900 uppercase font-mono-code text-[11px]">
                DATOS DE LA ACADEMIA
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-0.5">Nombre de la Especialidad:</label>
                  <input
                    type="text"
                    value={currentFicha.nombre_especialidad}
                    onChange={e => {
                      const updated = { ...currentFicha, nombre_especialidad: e.target.value };
                      setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                    }}
                    className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50 font-medium"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-0.5">Presidente de Academia:</label>
                  <input
                    type="text"
                    value={currentFicha.presidente_academia}
                    onChange={e => {
                      const updated = { ...currentFicha, presidente_academia: e.target.value };
                      setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                    }}
                    className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">Integrantes de la Academia:</label>
                <input
                  type="text"
                  value={currentFicha.integrantes_academia.join(', ')}
                  onChange={e => {
                    const updated = { ...currentFicha, integrantes_academia: e.target.value.split(',').map(s => s.trim()) };
                    setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                  }}
                  className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50"
                />
              </div>
            </div>

            {/* PARTE A: Componente Virtual (70%) */}
            <div className="py-4 border-b border-stone-300 space-y-4 text-xs">
              <div className="font-bold text-[#721B32] uppercase font-mono-code text-[11px]">
                PARTE A: COMPONENTE VIRTUAL (70% - Carga para Google AI Studio)
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  1. RESUMEN EJECUTIVO DE LA CARRERA (Máx. 150 palabras)
                </label>
                <textarea
                  rows={3}
                  value={currentFicha.resumen_ejecutivo}
                  onChange={e => {
                    const updated = { ...currentFicha, resumen_ejecutivo: e.target.value };
                    setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                  }}
                  className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  2. RECURSOS MULTIMEDIA (Carpeta Drive Institucional)
                </label>
                <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-2 text-[11px]">
                  <div>[ ✓ ] Video promocional/explicativo: {currentFicha.recursos_multimedia.video_url_o_estado}</div>
                  <div>[ ✓ ] Infografía digital: {currentFicha.recursos_multimedia.infografia_formato}</div>
                  <div>[ ✓ ] 3 Proyectos destacados: {currentFicha.recursos_multimedia.proyectos_registrados.join(' · ')}</div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  3. BANCO DE REACTIVOS DE COMPROBACIÓN DE LECTURA (5 Preguntas)
                </label>
                <div className="space-y-2">
                  {currentFicha.banco_reactivos.map((r, rIdx) => (
                    <div key={rIdx} className="p-2.5 bg-stone-50 rounded border border-stone-200 space-y-1">
                      <div className="font-semibold text-stone-900">
                        • Pregunta {rIdx + 1}: {r.pregunta}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-stone-600">
                        <span>a) {r.opciones[0]}</span>
                        <span>b) {r.opciones[1]}</span>
                        <span>c) {r.opciones[2]}</span>
                      </div>
                      <div className="text-[10px] text-emerald-800 font-bold">
                        Respuesta Correcta: Opción ({r.correcta.toUpperCase()})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PARTE B: Componente Presencial (30%) */}
            <div className="py-4 space-y-4 text-xs">
              <div className="font-bold text-[#047857] uppercase font-mono-code text-[11px]">
                PARTE B: COMPONENTE PRESENCIAL (30% - Reto Integrador y Lúdico)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-800 block mb-0.5">
                    4. NOMBRE DE LA ACTIVIDAD LÚDICA:
                  </label>
                  <input
                    type="text"
                    value={currentFicha.reto_ludico.nombre}
                    onChange={e => {
                      const updated = {
                        ...currentFicha,
                        reto_ludico: { ...currentFicha.reto_ludico, nombre: e.target.value }
                      };
                      setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                    }}
                    className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-0.5">
                    ESPACIO REQUERIDO EN PLANTEL:
                  </label>
                  <select
                    value={currentFicha.reto_ludico.espacio}
                    onChange={e => {
                      const updated = {
                        ...currentFicha,
                        reto_ludico: { ...currentFicha.reto_ludico, espacio: e.target.value as any }
                      };
                      setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                    }}
                    className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50 font-medium"
                  >
                    <option value="Laboratorio">Laboratorio</option>
                    <option value="Taller">Taller</option>
                    <option value="Plaza Cívica">Plaza Cívica</option>
                    <option value="Aula">Aula</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-0.5">
                  5. OBJETIVO DE LA ACTIVIDAD (Máx. 50 palabras):
                </label>
                <textarea
                  rows={2}
                  value={currentFicha.reto_ludico.objetivo}
                  onChange={e => {
                    const updated = {
                      ...currentFicha,
                      reto_ludico: { ...currentFicha.reto_ludico, objetivo: e.target.value }
                    };
                    setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                  }}
                  className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-0.5">
                  6. DINÁMICA DE LA ACTIVIDAD (Duración: 10 a 15 minutos):
                </label>
                <textarea
                  rows={2}
                  value={currentFicha.reto_ludico.dinamica}
                  onChange={e => {
                    const updated = {
                      ...currentFicha,
                      reto_ludico: { ...currentFicha.reto_ludico, dinamica: e.target.value }
                    };
                    setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                  }}
                  className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-800 block mb-0.5">
                    Mobiliario y Conexiones requeridas:
                  </label>
                  <input
                    type="text"
                    value={currentFicha.reto_ludico.mobiliario_conexiones}
                    onChange={e => {
                      const updated = {
                        ...currentFicha,
                        reto_ludico: { ...currentFicha.reto_ludico, mobiliario_conexiones: e.target.value }
                      };
                      setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                    }}
                    className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-800 block mb-0.5">
                    Materiales de insumo que aportará la academia:
                  </label>
                  <input
                    type="text"
                    value={currentFicha.reto_ludico.materiales_insumos}
                    onChange={e => {
                      const updated = {
                        ...currentFicha,
                        reto_ludico: { ...currentFicha.reto_ludico, materiales_insumos: e.target.value }
                      };
                      setFichas(prev => ({ ...prev, [selectedAcademia]: updated }));
                    }}
                    className="w-full p-2 text-xs border border-stone-300 rounded bg-stone-50"
                  />
                </div>
              </div>
            </div>

            {/* Official Signatures */}
            <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-center text-xs">
              <div className="space-y-1">
                <div className="border-b border-stone-400 w-44 mx-auto mb-2"></div>
                <div className="font-bold text-stone-900">{currentFicha.presidente_academia}</div>
                <div className="text-stone-500">Presidente(a) de Academia</div>
              </div>
              <div className="space-y-1">
                <div className="border-b border-stone-400 w-44 mx-auto mb-2"></div>
                <div className="font-bold text-stone-900">Mtro. José Luis Rodríguez Arredondo</div>
                <div className="text-stone-500">Subdirector Académico CETis 7</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Circular Oficial DGETI */}
      {subTab === 'circular' && (
        <div className="space-y-6">
          <div className="no-print bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-600 font-medium">Documento normativo emitido por la Subdirección Académica del plantel</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveOficio}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Guardar Oficio
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Circular
              </button>
            </div>
          </div>

          {/* Official Letterhead Circular */}
          <div className="bg-white rounded-2xl border-2 border-stone-300 p-10 max-w-3xl mx-auto shadow-sm print-shadow-none print-border print-break-inside-avoid">
            {/* SEP / SEMS / DGETI Letterhead */}
            <div className="border-b-2 border-[#721B32] pb-4 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <span>SECRETARÍA DE EDUCACIÓN PÚBLICA</span>
                <span>SUBSECRETARÍA DE EDUCACIÓN MEDIA SUPERIOR</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-600 mt-1">
                <span>DGETI CIUDAD DE MÉXICO</span>
                <span>PLANTEL CETis No. 7 "MIGUEL LERDO DE TEJADA"</span>
              </div>
            </div>

            {/* Clave de Oficio & Asunto */}
            <div className="space-y-2 text-xs mb-6">
              <div className="flex justify-end">
                <div className="text-right">
                  <div className="font-mono-code font-bold text-stone-900">OFICIO NÚM: {oficio.clave_oficio}</div>
                  <div className="text-stone-600">{oficio.lugar_fecha}</div>
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200 font-semibold text-stone-900">
                ASUNTO: {oficio.asunto}
              </div>
              <div className="font-bold text-stone-900 pt-2">
                {oficio.destinatarios}
                <div className="font-normal text-stone-600">P R E S E N T E S :</div>
              </div>
            </div>

            {/* Circular Body Paragraphs */}
            <div className="space-y-4 text-xs md:text-sm text-stone-800 leading-relaxed text-justify">
              {oficio.cuerpo.map((parrafo, idx) => (
                <p key={idx}>{parrafo}</p>
              ))}
            </div>

            {/* Closing & Signatures */}
            <div className="pt-10 space-y-8 text-center text-xs">
              <div className="font-serif-institutional italic font-semibold text-stone-700">
                "La Educación Técnica es Fuerza y Transformación"
              </div>

              <div className="max-w-xs mx-auto">
                <div className="border-b border-stone-400 mb-2"></div>
                <div className="font-bold text-stone-900">{oficio.firmante_nombre}</div>
                <div className="text-stone-600">{oficio.firmante_cargo}</div>
              </div>

              <div className="text-[10px] text-stone-400 font-mono-code border-t border-stone-200 pt-3">
                {oficio.sello_oficial}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Padrón Estudiantil & Validaciones */}
      {subTab === 'padron' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="no-print bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar por nombre o Núm. Control..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs border border-stone-300 rounded-lg w-full sm:w-64 bg-stone-50 focus:bg-white"
              />
              <select
                value={filterTurno}
                onChange={e => setFilterTurno(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50"
              >
                <option value="TODOS">Todos los Turnos</option>
                <option value="MATUTINO">Matutino</option>
                <option value="VESPERTINO">Vespertino</option>
              </select>
              <select
                value={filterGrupo}
                onChange={e => setFilterGrupo(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50"
              >
                <option value="TODOS">Todos los Grupos</option>
                <option value="1°A">1°A</option>
                <option value="1°B">1°B</option>
                <option value="1°C">1°C</option>
                <option value="1°D">1°D</option>
                <option value="1°E">1°E</option>
              </select>
              <select
                value={filterTutor}
                onChange={e => setFilterTutor(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50"
              >
                <option value="TODOS">Firma Tutor: Todos</option>
                <option value="VERIFICADOS">✓ Tutores Firmados</option>
                <option value="PENDIENTES">⚠️ Pendientes de Firma</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-xs text-stone-500 font-mono-code whitespace-nowrap">
                Mostrando {filteredEstudiantes.length} de {estudiantes.length} alumnos ({tutoresVerificadosCount} tutores verificados)
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setModoInicialRespaldo('respaldar');
                    setMostrarModalRespaldo(true);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title="Descargar respaldo de alumnos"
                >
                  <Download className="w-3 h-3 text-stone-600" />
                  <span>Respaldar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModoInicialRespaldo('reiniciar');
                    setMostrarModalRespaldo(true);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reiniciar padrón de alumnos"
                >
                  <RotateCcw className="w-3 h-3 text-red-600" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Núm. Control</th>
                    <th className="p-3">Estudiante</th>
                    <th className="p-3">Grupo / Turno</th>
                    <th className="p-3">Tutor Legal & Firma</th>
                    <th className="p-3">Fase Virtual (70%)</th>
                    <th className="p-3">Token Generado</th>
                    <th className="p-3">Carrera Sugerida</th>
                    <th className="p-3">Fase Presencial (30%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredEstudiantes.map(est => {
                    const prog = getProgresoVirtual(est.num_control);
                    const evalVoc = getEvaluacionVocacional(est.num_control);
                    const asis = getAsistenciaPresencialByNC(est.num_control);
                    const isVirtualDone = prog.estatus_fase_virtual === 'COMPLETADO';
                    const isPresencialDone = asis?.estatus_final === 'ACREDITADO';
                    const isTutorOk = est.tutor?.verificado;

                    return (
                      <tr key={est.num_control} className="hover:bg-stone-50/60 transition-colors">
                        <td className="p-3 font-mono-code font-bold text-stone-900">{est.num_control}</td>
                        <td className="p-3">
                          <div className="font-medium text-stone-900">{est.nombre_completo}</div>
                          {est.telefono_alumno && (
                            <div className="text-[10px] text-stone-500 font-mono-code">Tel: {est.telefono_alumno}</div>
                          )}
                        </td>
                        <td className="p-3 text-stone-600 font-mono-code">{est.grupo} · {est.turno[0]}</td>
                        <td className="p-3">
                          <div className="font-medium text-stone-900">{est.tutor?.nombre_tutor || 'No asignado'}</div>
                          <div className="font-mono-code text-[11px] text-stone-500">{est.tutor?.correo_tutor || 'Sin correo'}</div>
                          <div className="mt-1">
                            {isTutorOk ? (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                Firmado & Verificado
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                                Bloquea Impresión de Pase
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isVirtualDone ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {prog.porcentaje_virtual}% ({isVirtualDone ? 'Acreditado' : 'Pendiente'})
                          </span>
                        </td>
                        <td className="p-3 font-mono-code text-[11px] text-stone-700">
                          {prog.clave_unica_token || <span className="text-stone-400">Sin emitir</span>}
                        </td>
                        <td className="p-3 font-semibold text-stone-800 capitalize">
                          {evalVoc?.carrera_sugerida || 'En evaluación'}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isPresencialDone
                              ? 'bg-emerald-100 text-emerald-900'
                              : asis?.checkin_realizado
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-stone-100 text-stone-500'
                          }`}>
                            {isPresencialDone ? '✓ 100% Acreditado' : asis?.checkin_realizado ? 'En Circuito' : 'Sin Check-in'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredEstudiantes.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-stone-500">
                        <div className="max-w-sm mx-auto space-y-2">
                          <Users className="w-8 h-8 text-stone-300 mx-auto" />
                          <div className="font-bold text-stone-700 text-sm">No hay alumnos en el padrón</div>
                          <p className="text-xs text-stone-500">
                            Actualmente el padrón contiene 0 alumnos. Puedes registrar nuevos alumnos desde el formulario de registro o restaurar los datos en "Respaldar y Reiniciar".
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 5: Padrón de Docentes Autorizados por el Administrador */}
      {subTab === 'docentes' && (
        <div className="space-y-6">
          {/* Header & KPI Metrics Banner */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#721B32] uppercase tracking-wider mb-0.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Control Institucional de Accesos · Dirección Académica</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Padrón de Docentes & Personal Autorizado
                </h3>
                <p className="text-xs text-stone-600">
                  Gestión y registro de profesores autorizados por el Administrador para acceder al módulo de Dirección Académica del CETis No. 7.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModoInicialRespaldo('respaldar');
                    setMostrarModalRespaldo(true);
                  }}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Descargar padrón de docentes en JSON o CSV"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Respaldar Docentes</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModoInicialRespaldo('reiniciar');
                    setMostrarModalRespaldo(true);
                  }}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Reiniciar catálogo de profesores autorizados"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Reiniciar Docentes</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDocenteFormError(null);
                    setMostrarModalAltaDocente(true);
                  }}
                  className="px-4 py-2 bg-[#721B32] hover:bg-[#5b1528] text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <UserPlus className="w-4 h-4 text-amber-300" />
                  <span>+ Dar de Alta Nuevo Profesor</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Total Docentes</span>
                <span className="text-xl font-black text-stone-900 font-mono-code">{docentes.length}</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Registrados en padrón</span>
              </div>
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Autorizados Activos</span>
                <span className="text-xl font-black text-emerald-950 font-mono-code">
                  {docentes.filter(d => d.estatus_autorizacion === 'AUTORIZADO').length}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">Pueden ver Dirección</span>
              </div>
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-900 block">Pendientes</span>
                <span className="text-xl font-black text-amber-950 font-mono-code">
                  {docentes.filter(d => d.estatus_autorizacion === 'PENDIENTE').length}
                </span>
                <span className="text-[10px] text-amber-800 block mt-0.5">Por validar por Admin</span>
              </div>
              <div className="p-3.5 bg-stone-100 rounded-xl border border-stone-300">
                <span className="text-[10px] uppercase font-bold text-stone-700 block">Jefes de Academia</span>
                <span className="text-xl font-black text-stone-900 font-mono-code">
                  {docentes.filter(d => d.rol === 'Jefe de Academia').length}
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Titulares por especialidad</span>
              </div>
            </div>
          </div>

          {/* Feedback Notices */}
          {copyNotice && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-blue-600" />
              <span>{copyNotice}</span>
            </div>
          )}

          {docenteSuccessNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{docenteSuccessNotice}</span>
            </div>
          )}

          {/* Modal / Form para Dar de Alta Nuevo Profesor */}
          {mostrarModalAltaDocente && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/75 backdrop-blur-xs animate-in fade-in">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-lg w-full overflow-hidden flex flex-col">
                <div className="bg-[#721B32] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#5a1527]">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-amber-300" />
                    <h3 className="font-bold text-sm">Dar de Alta Nuevo Profesor / Docente Autorizado</h3>
                  </div>
                  <button
                    onClick={() => setMostrarModalAltaDocente(false)}
                    className="p-1 rounded-lg text-stone-200 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleRegistrarDocenteSubmit} className="p-5 space-y-3.5 text-xs">
                  {docenteFormError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>{docenteFormError}</div>
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-stone-800 mb-1">
                      Nombre Completo del Profesor <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Marco Antonio Estrada Ruiz"
                      value={nuevoNombre}
                      onChange={e => setNuevoNombre(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">
                        RFC o Clave Servidor Público <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. EASM780412HDF"
                        value={nuevoRfc}
                        onChange={e => setNuevoRfc(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 font-mono-code border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">
                        Correo Institucional
                      </label>
                      <input
                        type="email"
                        placeholder="Ej. marco.estrada@cetis7.edu.mx"
                        value={nuevoCorreo}
                        onChange={e => setNuevoCorreo(e.target.value)}
                        className="w-full px-3 py-2 font-mono-code border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">
                        Academia / Especialidad <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={nuevaAcademia}
                        onChange={e => setNuevaAcademia(e.target.value as any)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                      >
                        <option value="programacion">Programación</option>
                        <option value="comercio">Comercio Internacional</option>
                        <option value="rrhh">Recursos Humanos</option>
                        <option value="cosmetologia">Cosmetología</option>
                        <option value="general">Formación General / Dirección</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">
                        Rol Académico <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={nuevoRol}
                        onChange={e => setNuevoRol(e.target.value as any)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                      >
                        <option value="Profesor Titular">Profesor Titular</option>
                        <option value="Jefe de Academia">Jefe de Academia</option>
                        <option value="Tutor Escolar">Tutor Escolar</option>
                        <option value="Subdirector">Subdirector</option>
                        <option value="Coordinador de Rally">Coordinador de Rally</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-stone-800">
                        Clave de Acceso / PIN Personal <span className="text-red-600">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerarClaveAleatoria}
                        className="text-[11px] font-bold text-[#721B32] hover:text-[#501323] flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Generar clave
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ej. PROG2026 o DOC9812"
                      value={nuevaClave}
                      onChange={e => setNuevaClave(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 font-mono-code font-bold tracking-wider border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#721B32] focus:outline-none"
                    />
                    <span className="text-[10px] text-stone-400 mt-0.5 block">
                      Clave única que usará el profesor para ingresar al módulo de Dirección.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-800 mb-1">
                      Estatus Inicial de Autorización <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="estatus_inicial"
                          checked={nuevoEstatus === 'AUTORIZADO'}
                          onChange={() => setNuevoEstatus('AUTORIZADO')}
                          className="text-[#721B32]"
                        />
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[11px]">
                          ✓ AUTORIZADO (Acceso Inmediato)
                        </span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="estatus_inicial"
                          checked={nuevoEstatus === 'PENDIENTE'}
                          onChange={() => setNuevoEstatus('PENDIENTE')}
                          className="text-[#721B32]"
                        />
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[11px]">
                          ⚠️ PENDIENTE (Requiere Validación)
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setMostrarModalAltaDocente(false)}
                      className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#721B32] hover:bg-[#5b1528] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Check className="w-4 h-4" />
                      Registrar Profesor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar docente por nombre, RFC o PIN..."
                  value={searchDocente}
                  onChange={e => setSearchDocente(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>

              <select
                value={filterDocenteAcademia}
                onChange={e => setFilterDocenteAcademia(e.target.value)}
                className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50"
              >
                <option value="TODAS">Todas las Academias</option>
                <option value="programacion">Programación</option>
                <option value="comercio">Comercio Internacional</option>
                <option value="rrhh">Recursos Humanos</option>
                <option value="cosmetologia">Cosmetología</option>
                <option value="general">Formación General / Dir.</option>
              </select>

              <select
                value={filterDocenteEstatus}
                onChange={e => setFilterDocenteEstatus(e.target.value)}
                className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50"
              >
                <option value="TODOS">Todos los Estatus</option>
                <option value="AUTORIZADO">✓ AUTORIZADOS</option>
                <option value="PENDIENTE">⚠️ PENDIENTES</option>
                <option value="REVOCADO">⛔ REVOCADOS</option>
              </select>
            </div>

            <span className="text-stone-500 font-mono-code">
              Mostrando {docentesFiltrados.length} de {docentes.length} profesores
            </span>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">RFC / ID</th>
                    <th className="p-3">Nombre del Profesor</th>
                    <th className="p-3">Academia & Rol</th>
                    <th className="p-3">Clave / PIN de Acceso</th>
                    <th className="p-3">Estatus Autorización</th>
                    <th className="p-3 text-right">Acciones de Administrador</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {docentesFiltrados.map(doc => {
                    const isVisible = docenteClaveVisibleId === doc.id;
                    const isAutorizado = doc.estatus_autorizacion === 'AUTORIZADO';
                    const isPendiente = doc.estatus_autorizacion === 'PENDIENTE';
                    const isRevocado = doc.estatus_autorizacion === 'REVOCADO';

                    return (
                      <tr key={doc.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="p-3">
                          <div className="font-mono-code font-bold text-stone-900">{doc.rfc}</div>
                          <div className="text-[10px] text-stone-400 font-mono-code">{doc.id}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-stone-900">{doc.nombre_completo}</div>
                          <div className="text-[11px] font-mono-code text-stone-500">{doc.correo_institucional}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-stone-800 capitalize">
                            {doc.academia === 'rrhh' ? 'Recursos Humanos' : doc.academia}
                          </div>
                          <div className="text-[10px] text-stone-500">{doc.rol}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-code font-bold bg-stone-100 px-2 py-1 rounded border border-stone-200 text-stone-900">
                              {isVisible ? doc.clave_acceso : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setDocenteClaveVisibleId(isVisible ? null : doc.id)}
                              className="p-1 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
                              title={isVisible ? 'Ocultar clave' : 'Ver clave'}
                            >
                              {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopiarClave(doc.clave_acceso)}
                              className="p-1 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
                              title="Copiar clave"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          {isAutorizado && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              AUTORIZADO
                            </span>
                          )}
                          {isPendiente && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              PENDIENTE
                            </span>
                          )}
                          {isRevocado && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-900 border border-red-300">
                              <Lock className="w-3 h-3 text-red-600" />
                              REVOCADO
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {!isAutorizado && (
                              <button
                                type="button"
                                onClick={() => handleCambiarEstatusDocenteClick(doc.id, 'AUTORIZADO')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                                title="Aprobar acceso a Dirección"
                              >
                                <Check className="w-3 h-3" />
                                Autorizar
                              </button>
                            )}
                            {!isPendiente && (
                              <button
                                type="button"
                                onClick={() => handleCambiarEstatusDocenteClick(doc.id, 'PENDIENTE')}
                                className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded text-[10px] font-bold transition-colors cursor-pointer"
                                title="Marcar como pendiente"
                              >
                                Pendiente
                              </button>
                            )}
                            {!isRevocado && (
                              <button
                                type="button"
                                onClick={() => handleCambiarEstatusDocenteClick(doc.id, 'REVOCADO')}
                                className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 rounded text-[10px] font-bold transition-colors cursor-pointer"
                                title="Revocar acceso"
                              >
                                Revocar
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleEliminarDocenteClick(doc.id, doc.nombre_completo)}
                              className="p-1 text-stone-400 hover:text-red-700 rounded transition-colors cursor-pointer ml-1"
                              title="Eliminar de padrón"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {docentesFiltrados.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-500">
                        <div className="max-w-sm mx-auto space-y-2">
                          <ShieldCheck className="w-8 h-8 text-stone-300 mx-auto" />
                          <div className="font-bold text-stone-700 text-sm">No hay profesores registrados en el padrón</div>
                          <p className="text-xs text-stone-500">
                            Usa el botón "+ Dar de Alta Nuevo Profesor" para registrar personal o restaura el catálogo oficial con los 4 profesores de academia.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Institucional para Respaldar, Reiniciar y Restaurar Alumnos y Docentes */}
      <BackupAndResetModal
        isOpen={mostrarModalRespaldo}
        onClose={() => setMostrarModalRespaldo(false)}
        onDataChanged={handleDataChanged}
        initialMode={modoInicialRespaldo}
      />
    </div>
  );
};
