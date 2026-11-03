import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  QrCode, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  HelpCircle, 
  Zap,
  Laptop,
  Globe2,
  Users2,
  Sparkle,
  UserPlus
} from 'lucide-react';
import { COMIC_ASSETS } from '../assets/comicAssets';
import { MainNavTab } from './Header';

interface WelcomeTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: MainNavTab) => void;
  onNavigateToRegistro?: () => void;
  isRegistered?: boolean;
  nombreEstudiante?: string;
}

export const WelcomeTutorialModal: React.FC<WelcomeTutorialModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onNavigateToRegistro,
  isRegistered = false,
  nombreEstudiante = 'Estudiante'
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [noVolverAMostrar, setNoVolverAMostrar] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (noVolverAMostrar) {
      localStorage.setItem('cetis7_tutorial_visto', 'true');
    }
    onClose();
    // Siempre asegurar llevar al registro si no está registrado
    if (!isRegistered && onNavigateToRegistro) {
      onNavigateToRegistro();
    }
  };

  const handleFinalizar = (tabDestino: MainNavTab = 'vocacional') => {
    localStorage.setItem('cetis7_tutorial_visto', 'true');
    onClose();
    // Siempre llevar al registro si no se ha registrado
    if (!isRegistered) {
      if (onNavigateToRegistro) {
        onNavigateToRegistro();
      }
    } else {
      if (onNavigateToTab) {
        onNavigateToTab(tabDestino);
      }
    }
  };

  const tutorialSteps = [
    {
      stepNumber: 1,
      badge: 'FASE 1: DESCUBRIMIENTO',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      title: 'Diagnóstico Vocacional Dual',
      subtitle: `¡Hola ${nombreEstudiante}! Descubre tus talentos y qué es lo que realmente te gusta.`,
      targetTab: 'vocacional' as MainNavTab,
      icon: Compass,
      iconBg: 'bg-amber-500 text-white',
      cardTheme: 'from-amber-500/10 via-amber-50/60 to-white',
      accentColor: '#D97706',
      image: COMIC_ASSETS.hero,
      imageAlt: 'Estudiantes del CETis 7 explorando su vocación',
      callout: '¡Solo te tomará 5 minutos! No hay respuestas malas.',
      description: 'El examen psicométrico del CETis 7 separa dos cosas muy importantes:',
      highlights: [
        {
          label: 'Perfil Aptitudinal',
          text: 'Mide tus habilidades lógicas, analíticas, manuales y sociales para resolver problemas.',
          color: 'text-amber-800 bg-amber-50 border-amber-200'
        },
        {
          label: 'Interés Personal',
          text: 'Identifica los temas, entornos y actividades que despiertan tu curiosidad y pasión.',
          color: 'text-orange-800 bg-orange-50 border-orange-200'
        }
      ],
      tip: 'Al terminar, el sistema cruzará tus resultados y te dará un porcentaje de compatibilidad con las 4 especialidades técnicas.'
    },
    {
      stepNumber: 2,
      badge: 'FASE 2: RECORRIDO VIRTUAL',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      title: 'Explora las 4 Especialidades',
      subtitle: 'Conoce los talleres, qué aprenderás en cada carrera y aprueba los mini-retos.',
      targetTab: 'modulos' as MainNavTab,
      icon: BookOpen,
      iconBg: 'bg-blue-600 text-white',
      cardTheme: 'from-blue-500/10 via-blue-50/60 to-white',
      accentColor: '#2563EB',
      image: COMIC_ASSETS.especialidades.programacion.image,
      imageAlt: 'Especialidades técnicas del CETis 7',
      callout: 'Completa las 4 carreras para acumular tu 70% de progreso virtual.',
      description: 'Entra a cada uno de los 4 stands virtuales con viñetas de cómic y material oficial de la DGETI:',
      specialtiesList: [
        { name: 'Programación', icon: Laptop, text: 'Software, bases de datos y desarrollo web.', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
        { name: 'Comercio Int.', icon: Globe2, text: 'Aduanas, logística y exportación mundial.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { name: 'Recursos Humanos', icon: Users2, text: 'Liderazgo, clima laboral y talento humano.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { name: 'Cosmetología', icon: Sparkle, text: 'Dermocosmiatría, salud de la piel y bienestar.', color: 'text-rose-600 bg-rose-50 border-rose-200' },
      ],
      tip: 'Cada especialidad tiene un cuestionario rápido de 3 preguntas de opción múltiple. ¡Puedes intentarlo las veces que necesites!'
    },
    {
      stepNumber: 3,
      badge: 'FASE 3: ACCESO OFICIAL',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      title: 'Firma de tu Tutor y Pase Digital QR',
      subtitle: 'Tu pasaporte oficial e intransferible para ingresar a la feria en el plantel.',
      targetTab: 'pase_qr' as MainNavTab,
      icon: QrCode,
      iconBg: 'bg-emerald-600 text-white',
      cardTheme: 'from-emerald-500/10 via-emerald-50/60 to-white',
      accentColor: '#059669',
      image: COMIC_ASSETS.especialidades.comercio.image,
      imageAlt: 'Pase Digital Oficial QR para acceso',
      callout: '¡Sin la firma de tu tutor no podrás imprimir tu pase digital!',
      description: 'Por seguridad escolar y normatividad de la DGETI, tu ingreso presencial requiere el aval familiar:',
      highlights: [
        {
          label: 'Verificación de Correo',
          text: 'Comprueba el correo de tu papá, mamá o tutor que registraste al inicio.',
          color: 'text-emerald-800 bg-emerald-50 border-emerald-200'
        },
        {
          label: 'Firma Digital en Pantalla',
          text: 'Tu tutor dibuja su firma electrónica con el dedo o mouse aceptando las bases.',
          color: 'text-teal-800 bg-teal-50 border-teal-200'
        }
      ],
      tip: 'Una vez firmado, se genera tu Código QR único cifrado con tu Número de Control (NC) y tu token digital de seguridad.'
    },
    {
      stepNumber: 4,
      badge: 'FASE 4: ACCIÓN EN EL PLANTEL',
      badgeColor: 'bg-[#721B32]/10 text-[#721B32] border-[#721B32]/30',
      title: '¡Rally Presencial en el CETis 7! (30%)',
      subtitle: 'Ven a los talleres de Cuautepec, supera los retos en vivo y sella tu pasaporte.',
      targetTab: 'presencial' as MainNavTab,
      icon: MapPin,
      iconBg: 'bg-[#721B32] text-white',
      cardTheme: 'from-[#721B32]/15 via-stone-50 to-white',
      accentColor: '#721B32',
      image: COMIC_ASSETS.rally,
      imageAlt: 'Rally presencial de retos en talleres de CETis 7',
      callout: '¡4 talleres reales, retos divertidos y tus profesores del CETis esperándote!',
      description: 'El 30% restante de tu acreditación se vive en el campus físico en Cuautepec, Gustavo A. Madero:',
      highlights: [
        {
          label: '1. Filtro de Entrada con Escáner QR',
          text: 'Muestras tu pase impreso o en tu celular. El filtro validará tu 70% virtual en 2 segundos.',
          color: 'text-stone-800 bg-stone-100 border-stone-200'
        },
        {
          label: '2. 4 Estaciones de Reto Práctico',
          text: 'Debugging de código, simulación de despacho aduanero, dinámica de talento y prueba sensorial de pH.',
          color: 'text-rose-950 bg-rose-50 border-rose-200'
        }
      ],
      tip: '¡Al reunir los 4 sellos presenciales, habrás alcanzado el 100% de la feria y tu constancia oficial de orientación técnica!'
    }
  ];

  const current = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border-2 border-stone-300 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh] my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-modal-title"
      >
        {/* Top Header Bar */}
        <div className="bg-[#721B32] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#5a1527]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-bold shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber-200 block font-semibold">
                Guía Rápida para Alumnos (12-15 años)
              </span>
              <h2 id="tutorial-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                ¿Cómo funciona la Feria de Especialidades 2026?
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Navigation Tracker */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
            {tutorialSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex-1 flex flex-col items-center gap-1 group transition-all py-1 px-1 rounded-lg cursor-pointer ${
                    isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full">
                    <div 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-2xs shrink-0 mx-auto ${
                        isActive 
                          ? `${step.iconBg} ring-2 ring-offset-2 ring-stone-400`
                          : isPast
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight truncate w-full ${
                    isActive ? 'text-stone-900 font-extrabold' : 'text-stone-500'
                  }`}>
                    Paso {step.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Linear Progress Indicator */}
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-amber-500 via-blue-600 to-[#721B32] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/50 space-y-4">
          {/* Main Card with Comic Vignette */}
          <div className={`p-4 sm:p-5 rounded-2xl bg-linear-to-br ${current.cardTheme} border-2 border-stone-200 shadow-xs`}>
            {/* Phase Badge & Step Count */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${current.badgeColor}`}>
                {current.badge}
              </span>
              <span className="text-xs font-mono-code font-bold text-stone-500">
                Paso {current.stepNumber} de {tutorialSteps.length}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${current.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                <current.icon className="w-4 h-4" />
              </span>
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mt-1">
              {current.subtitle}
            </p>

            {/* Comic Graphic & Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 items-center">
              {/* Comic Vignette Illustration */}
              <div className="md:col-span-5 relative group">
                <div className="overflow-hidden rounded-xl border-3 border-stone-900 shadow-md bg-black aspect-4/3 flex items-center justify-center">
                  <img 
                    src={current.image} 
                    alt={current.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Comic Speech Callout Bubble */}
                <div className="absolute -bottom-2 -right-1 sm:right-2 bg-amber-300 text-stone-950 font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg border-2 border-stone-900 shadow-md transform rotate-1 max-w-[210px] leading-tight">
                  💬 {current.callout}
                </div>
              </div>

              {/* Step Explanations & Highlights */}
              <div className="md:col-span-7 space-y-2.5">
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Highlights boxes */}
                {current.highlights && (
                  <div className="space-y-2">
                    {current.highlights.map((item, i) => (
                      <div key={i} className={`p-2.5 rounded-lg border text-xs leading-relaxed ${item.color}`}>
                        <div className="font-bold flex items-center gap-1.5 mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <p className="text-stone-700 pl-5">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specialty quick cards for step 2 */}
                {current.specialtiesList && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {current.specialtiesList.map((spec, i) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div key={i} className={`p-2 rounded-lg border text-left flex items-start gap-2 ${spec.color}`}>
                          <SpecIcon className="w-4 h-4 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-bold text-[11px] text-stone-900">{spec.name}</div>
                            <div className="text-[10px] text-stone-600 line-clamp-1">{spec.text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pro-Tip Box */}
                <div className="bg-white/90 p-2.5 rounded-lg border border-stone-300 flex items-start gap-2 text-[11px] text-stone-600">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-stone-900">Consejo clave:</strong> {current.tip}
                  </p>
                </div>

                {/* Final Step Callout to Registration for Unregistered Students */}
                {currentStep === tutorialSteps.length - 1 && !isRegistered && (
                  <div className="bg-amber-100/90 border-2 border-amber-400 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 font-medium">
                    <UserPlus className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-950 font-bold text-xs">¡Has completado el tutorial de bienvenida!</strong>
                      <span>El siguiente paso obligatorio para ingresar es tu <strong>Registro de Alumno</strong> con tu CURP oficial y el correo de tu tutor legal.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick jump to this specific phase button */}
          <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-stone-200">
            <span className="text-stone-600 font-medium">
              {!isRegistered 
                ? '⚠️ Para ingresar a cualquiera de las 4 fases debes realizar primero tu registro.'
                : '¿Quieres saltar directo a esta sección en la plataforma?'}
            </span>
            <button
              onClick={() => handleFinalizar(current.targetTab)}
              className="font-bold text-[#721B32] hover:text-[#501323] hover:underline flex items-center gap-1.5 shrink-0 ml-2 cursor-pointer"
            >
              {!isRegistered ? (
                <>
                  <span>Ir al Registro</span>
                  <UserPlus className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Ir a {current.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-white border-t border-stone-200 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Checkbox "No volver a mostrar automáticamente" */}
          <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none order-2 sm:order-1">
            <input
              type="checkbox"
              checked={noVolverAMostrar}
              onChange={(e) => setNoVolverAMostrar(e.target.checked)}
              className="w-4 h-4 rounded border-stone-300 text-[#721B32] focus:ring-[#721B32] cursor-pointer"
            />
            <span>Entendido, no volver a mostrar al iniciar</span>
          </label>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-3 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            )}

            {currentStep < tutorialSteps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Siguiente paso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : !isRegistered ? (
              <button
                type="button"
                onClick={() => handleFinalizar('vocacional')}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 border-2 border-stone-900 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
                title="Ir al Registro Obligatorio de Alumnos"
              >
                <UserPlus className="w-4 h-4 text-stone-950" />
                <span>¡Ir al Registro Obligatorio con CURP!</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleFinalizar('vocacional')}
                className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 border-2 border-stone-900 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 hover:scale-102 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
                <span>¡Comenzar con el Test Vocacional!</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
