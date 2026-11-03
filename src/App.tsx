import React, { useState, useEffect } from 'react';
import { 
  getEstudiantes, 
  getEstudianteActivoNC, 
  setEstudianteActivoNC, 
  getProgresoVirtual, 
  saveProgresoVirtual, 
  getEvaluacionVocacional, 
  saveEvaluacionVocacional,
  getAsistenciaPresencialByNC,
  getSesionActiva,
  setSesionActiva,
  cerrarSesion,
  SesionUsuario
} from './services/storage';
import { Estudiante, ProgresoVirtual, EvaluacionVocacional, AsistenciaPresencial } from './types';
import { Header, MainNavTab } from './components/Header';
import { StudentProfileBanner } from './components/StudentProfileBanner';
import { VocationalDiagnostic } from './components/VocationalDiagnostic';
import { SpecialtyModules } from './components/SpecialtyModules';
import { DigitalPassQR } from './components/DigitalPassQR';
import { PresencialScanner } from './components/PresencialScanner';
import { AcademicDirection } from './components/AcademicDirection';
import { MandatoryRegistrationGate } from './components/MandatoryRegistrationGate';
import { WelcomeTutorialModal } from './components/WelcomeTutorialModal';
import { DirectionAuthModal } from './components/DirectionAuthModal';
import { HelpFaqModal } from './components/HelpFaqModal';
import { Compass, BookOpen, QrCode, MapPin, Building2, CheckCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('vocacional');
  const [sesionActiva, setSesionActivaState] = useState<SesionUsuario | null>(() => getSesionActiva());
  const [estudianteActivoNC, setEstudianteActivoNCState] = useState<string>(getEstudianteActivoNC());
  const [mostrarTutorial, setMostrarTutorial] = useState<boolean>(() => {
    // Si el usuario no ha iniciado sesión, el sitio SIEMPRE inicia con el tutorial de bienvenida primero
    const session = getSesionActiva();
    if (!session) return true;
    return !localStorage.getItem('cetis7_tutorial_visto');
  });
  const [mostrarModalDirAuth, setMostrarModalDirAuth] = useState<boolean>(false);
  const [mostrarHelpModal, setMostrarHelpModal] = useState<boolean>(false);
  const [helpDefaultTab, setHelpDefaultTab] = useState<'fundamentacion' | 'docentes' | 'alumnos'>('docentes');

  const handleOpenHelp = (tab: 'fundamentacion' | 'docentes' | 'alumnos' = 'docentes') => {
    setHelpDefaultTab(tab);
    setMostrarHelpModal(true);
  };
  
  // Dynamic student state
  const estudiantes = getEstudiantes();
  const estudianteActual = estudiantes.length > 0 
    ? (estudiantes.find(e => e.num_control === estudianteActivoNC) || estudiantes[0])
    : null;
  
  const [progresoActual, setProgresoActual] = useState<ProgresoVirtual>(() =>
    estudianteActual ? getProgresoVirtual(estudianteActual.num_control) : getProgresoVirtual('')
  );
  const [evaluacionActual, setEvaluacionActual] = useState<EvaluacionVocacional | null>(() =>
    estudianteActual ? getEvaluacionVocacional(estudianteActual.num_control) : null
  );
  const [asistenciaActual, setAsistenciaActual] = useState<AsistenciaPresencial | null>(() =>
    estudianteActual ? getAsistenciaPresencialByNC(estudianteActual.num_control) : null
  );

  // Sync state when cohort is reset or student switches
  useEffect(() => {
    if (estudianteActual) {
      setProgresoActual(getProgresoVirtual(estudianteActual.num_control));
      setEvaluacionActual(getEvaluacionVocacional(estudianteActual.num_control));
      setAsistenciaActual(getAsistenciaPresencialByNC(estudianteActual.num_control));
    } else {
      setProgresoActual(getProgresoVirtual(''));
      setEvaluacionActual(null);
      setAsistenciaActual(null);
    }
  }, [estudianteActivoNC, estudianteActual?.num_control]);

  // If active session belongs to an alumno but padron is at zero, clear session and return to gate
  useEffect(() => {
    if (sesionActiva?.tipo === 'alumno' && estudiantes.length === 0) {
      cerrarSesion();
      setSesionActivaState(null);
    }
  }, [sesionActiva?.tipo, estudiantes.length]);

  // Sync state when student switches
  const handleCambiarEstudiante = (nc: string) => {
    if (!nc) return;
    setEstudianteActivoNC(nc);
    setEstudianteActivoNCState(nc);
    setProgresoActual(getProgresoVirtual(nc));
    setEvaluacionActual(getEvaluacionVocacional(nc));
    setAsistenciaActual(getAsistenciaPresencialByNC(nc));
  };

  const handleUpdateProgreso = (nuevoProgreso: ProgresoVirtual) => {
    saveProgresoVirtual(nuevoProgreso);
    setProgresoActual({ ...nuevoProgreso });
  };

  const handleCompletarEvaluacionVocacional = (evaluacion: EvaluacionVocacional) => {
    saveEvaluacionVocacional(evaluacion);
    setEvaluacionActual(evaluacion);
    
    // update virtual progress
    const updated = { ...progresoActual, test_vocacional_completado: true };
    handleUpdateProgreso(updated);
  };

  const handleAccessGranted = (estudiante?: Estudiante, sesion?: SesionUsuario) => {
    if (estudiante) {
      handleCambiarEstudiante(estudiante.num_control);
      const ses: SesionUsuario = {
        tipo: 'alumno',
        num_control: estudiante.num_control,
        nombre: estudiante.nombre_completo
      };
      setSesionActiva(ses);
      setSesionActivaState(ses);
      setActiveTab('vocacional');
      setMostrarTutorial(false);
    } else if (sesion) {
      setSesionActiva(sesion);
      setSesionActivaState(sesion);
      if (sesion.tipo === 'docente') {
        setActiveTab('direccion');
      }
      setMostrarTutorial(false);
    }
  };

  const handleCerrarSesion = () => {
    cerrarSesion();
    setSesionActivaState(null);
  };

  const handleNavTabChange = (tab: MainNavTab) => {
    if (tab === 'direccion' && sesionActiva?.tipo !== 'docente') {
      setMostrarModalDirAuth(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleAuthDirSuccess = (sesion: SesionUsuario) => {
    setSesionActivaState(sesion);
    setActiveTab('direccion');
    setMostrarModalDirAuth(false);
  };

  // IF NO ACTIVE SESSION: Strictly block all content and show Mandatory Registration Gate
  if (!sesionActiva) {
    return (
      <>
        <MandatoryRegistrationGate 
          onAccessGranted={handleAccessGranted} 
          onOpenTutorial={() => setMostrarTutorial(true)}
        />
        <WelcomeTutorialModal
          isOpen={mostrarTutorial}
          onClose={() => setMostrarTutorial(false)}
          onNavigateToRegistro={() => {
            setMostrarTutorial(false);
          }}
          isRegistered={false}
          nombreEstudiante="Nuevo Alumno"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans">
      {/* Header with Top Bar Contract */}
      <Header 
        activeTab={activeTab} 
        onTabChange={handleNavTabChange} 
        sesionActiva={sesionActiva}
        onCerrarSesion={handleCerrarSesion}
        onOpenTutorial={() => setMostrarTutorial(true)}
        onOpenHelpFaq={(tab) => handleOpenHelp(tab)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
        {/* Institutional Welcome & Hero kicker */}
        <div className="no-print mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-[#721B32] uppercase tracking-wider mb-1">
                <span>Feria de Especialidades 2026</span>
                <span className="text-stone-300">·</span>
                <span>Modelo Híbrido DGETI (70/30)</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight font-serif-institutional">
                CETis No. 7 "Miguel Lerdo de Tejada"
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
                Plataforma oficial para la elección informada de trayectoria técnica: 70% Virtual (Test Dual + 4 Academias + Cuestionarios) y 30% Presencial (Rally de Retos Lúdicos en Plantel).
              </p>
            </div>

            {/* Quick Flow Pills / Breadcrumbs & Tutorial & Ayuda Triggers */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleOpenHelp('fundamentacion')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#721B32] hover:bg-[#5b1528] text-white font-bold text-xs border border-[#5b1528] shadow-2xs transition-all cursor-pointer hover:scale-102"
                title="Fundamentación y FAQs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Ayuda & FAQ</span>
              </button>

              <button
                onClick={() => setMostrarTutorial(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs border border-amber-500 shadow-2xs transition-all cursor-pointer hover:scale-102"
                title="Abrir la guía ilustrada de las 4 fases"
              >
                <Sparkles className="w-3.5 h-3.5 fill-stone-950 text-stone-950" />
                <span>¿Cómo funciona? (Tutorial)</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-mono-code text-stone-500 bg-white p-2 rounded-lg border border-stone-200 flex-wrap">
                <span className={activeTab === 'vocacional' ? 'text-[#721B32] font-bold' : ''}>1. Test</span>
                <span>→</span>
                <span className={activeTab === 'modulos' ? 'text-[#721B32] font-bold' : ''}>2. Módulos</span>
                <span>→</span>
                <span className={activeTab === 'pase_qr' ? 'text-[#721B32] font-bold' : ''}>3. Pase QR</span>
                <span>→</span>
                <span className={activeTab === 'presencial' ? 'text-[#721B32] font-bold' : ''}>4. Rally</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Profile & Live Hybrid Progress Bar (Only shown in student workflows) */}
        {activeTab !== 'direccion' && (
          estudianteActual ? (
            <div className="no-print">
              <StudentProfileBanner
                estudiante={estudianteActual}
                progreso={progresoActual}
                evaluacion={evaluacionActual}
                asistencia={asistenciaActual}
                onCambiarEstudiante={handleCambiarEstudiante}
                onVerPaseQR={() => setActiveTab('pase_qr')}
                onStudentUpdated={(updated) => handleCambiarEstudiante(updated.num_control)}
                onCerrarSesion={handleCerrarSesion}
              />
            </div>
          ) : (
            <div className="no-print bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Padrón de Alumnos Actualmente en Cero</h4>
                  <p className="text-xs text-amber-900/80">
                    Se reinició el sistema a cero estudiantes. Puedes acudir a Dirección para dar de alta alumnos o restaurar el padrón del plantel.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('direccion')}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              >
                Ir a Dirección Académica
              </button>
            </div>
          )
        )}

        {/* TAB 1: Test Vocacional Dual (Aptitud vs Interés) */}
        {activeTab === 'vocacional' && (
          estudianteActual ? (
            <div className="space-y-6">
              <VocationalDiagnostic
                numControl={estudianteActual.num_control}
                evaluacionExistente={evaluacionActual}
                onCompletar={handleCompletarEvaluacionVocacional}
              />

              {evaluacionActual && (
                <div className="no-print bg-white p-5 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">¿Listo para explorar la oferta académica?</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Conoce a fondo las 4 especialidades del CETis 7 y responde sus cuestionarios de lectura para avanzar hacia tu Pase Digital QR.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('modulos')}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shadow-2xs"
                  >
                    Continuar a Especialidades (Paso 2)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">No hay alumno seleccionado</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                El test vocacional dual requiere un alumno registrado para guardar sus aptitudes e intereses.
              </p>
              <button
                onClick={() => setActiveTab('direccion')}
                className="px-4 py-2 text-xs font-bold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-xl cursor-pointer"
              >
                Abrir Dirección Académica
              </button>
            </div>
          )
        )}

        {/* TAB 2: Módulos de Especialidad (4 Carreras) */}
        {activeTab === 'modulos' && (
          <div className="space-y-6">
            <SpecialtyModules
              progreso={progresoActual}
              onUpdateProgreso={handleUpdateProgreso}
              sugeridaId={evaluacionActual?.carrera_sugerida}
              onNavigateToDirection={() => handleNavTabChange('direccion')}
              sesionActiva={sesionActiva}
            />

            {progresoActual.porcentaje_virtual >= 100 && (
              <div className="no-print bg-emerald-50 border border-emerald-200 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold">100% de la Fase Virtual Concluida</span>
                    <h4 className="text-base font-bold text-emerald-950">Tu Pase Digital QR ya está generado</h4>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('pase_qr')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  Obtener Pase Digital QR Oficial
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Pase Digital QR */}
        {activeTab === 'pase_qr' && (
          <DigitalPassQR
            estudiante={estudianteActual}
            evaluacion={evaluacionActual}
            progreso={progresoActual}
            onNavigateToPresencial={() => setActiveTab('presencial')}
            onStudentUpdated={(updated) => handleCambiarEstudiante(updated.num_control)}
          />
        )}

        {/* TAB 4: Fase Presencial (30% - Scanner & Rally) */}
        {activeTab === 'presencial' && (
          <PresencialScanner estudianteActivo={estudianteActual} />
        )}

        {/* TAB 5: Dirección & Subdirección Académica */}
        {activeTab === 'direccion' && (
          <AcademicDirection />
        )}
      </main>

      {/* Official Institutional Footer */}
      <footer className="no-print bg-white border-t border-stone-200 py-6 mt-12 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-stone-900">
              Centro de Estudios Tecnológicos industrial y de servicios No. 7 "Miguel Lerdo de Tejada"
            </div>
            <div className="text-stone-500">
              DGETI · SEMS · Secretaría de Educación Pública · Av. Puerto Mazatlán No. 185, Col. La Pastora, Cuautepec, Gustavo A. Madero, C.P. 07290, CDMX.
            </div>
          </div>
          <div className="font-mono-code text-[11px] text-stone-500">
            Feria de Especialidades e Innovación Tecnológica 2026
          </div>
        </div>
      </footer>

      {/* Welcome Tutorial Modal (4 Phases interactive guide for 12-15 year olds) */}
      <WelcomeTutorialModal
        isOpen={mostrarTutorial}
        onClose={() => setMostrarTutorial(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setMostrarTutorial(false);
        }}
        onNavigateToRegistro={() => {
          handleCerrarSesion();
          setMostrarTutorial(false);
        }}
        isRegistered={Boolean(sesionActiva && sesionActiva.tipo === 'alumno')}
        nombreEstudiante={estudianteActual?.nombre_completo ? estudianteActual.nombre_completo.split(' ')[0] : 'Estudiante'}
      />

      {/* Direction & Subdirection Password Authentication Modal */}
      <DirectionAuthModal
        isOpen={mostrarModalDirAuth}
        onClose={() => setMostrarModalDirAuth(false)}
        onAuthSuccess={handleAuthDirSuccess}
      />

      {/* Help & FAQ Center Modal */}
      <HelpFaqModal
        isOpen={mostrarHelpModal}
        onClose={() => setMostrarHelpModal(false)}
        defaultTab={helpDefaultTab}
      />
    </div>
  );
}
