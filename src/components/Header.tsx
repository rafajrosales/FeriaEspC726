import React, { useState } from 'react';
import { 
  School, 
  Compass, 
  BookOpen, 
  QrCode, 
  MapPin, 
  Building2, 
  LogOut, 
  UserCheck, 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { SesionUsuario } from '../services/storage';

export type MainNavTab = 'vocacional' | 'modulos' | 'pase_qr' | 'presencial' | 'direccion';

interface HeaderProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  sesionActiva?: SesionUsuario | null;
  onCerrarSesion?: () => void;
  onOpenQuickInfo?: () => void;
  onOpenTutorial?: () => void;
  onOpenHelpFaq?: (tab?: 'fundamentacion' | 'docentes' | 'alumnos') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange,
  sesionActiva,
  onCerrarSesion,
  onOpenTutorial,
  onOpenHelpFaq
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tab: MainNavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const getTabLabel = (tab: MainNavTab) => {
    switch (tab) {
      case 'vocacional': return '1. Test Vocacional';
      case 'modulos': return '2. Especialidades';
      case 'pase_qr': return '3. Pase Digital QR';
      case 'presencial': return '4. Rally Presencial';
      case 'direccion': return '5. Subdirección';
    }
  };

  const getTabIcon = (tab: MainNavTab, className = "w-4 h-4") => {
    switch (tab) {
      case 'vocacional': return <Compass className={className} />;
      case 'modulos': return <BookOpen className={className} />;
      case 'pase_qr': return <QrCode className={className} />;
      case 'presencial': return <MapPin className={className} />;
      case 'direccion': return <Building2 className={className} />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-2xs">
        {/* Institutional Top Strip (SEP / DGETI) */}
        <div className="bg-[#721B32] text-white text-[10px] sm:text-[11px] font-medium py-1 px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="font-bold tracking-wider shrink-0">GOBIERNO DE MÉXICO</span>
            <span className="opacity-50">|</span>
            <span className="opacity-90 truncate">SEP · SEMS · DGETI</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono-code text-[10px] text-stone-200 shrink-0">
            <span className="bg-emerald-600 text-emerald-100 px-2 py-0.5 rounded font-bold shadow-2xs">☁️ Cloud Firestore</span>
            <span className="opacity-50">·</span>
            <span>PLANTEL 007</span>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#721B32] text-white flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <School className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            </div>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleSelectTab('vocacional');
              }}
              className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap hover:text-[#721B32] transition-colors"
            >
              CETis No. 7 <span className="text-[#721B32] font-semibold text-xs sm:text-sm">Feria 2026</span>
            </a>
          </div>

          {/* Zone 2: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm font-medium text-stone-600">
            <button
              onClick={() => handleSelectTab('vocacional')}
              className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
                activeTab === 'vocacional' ? 'text-[#721B32] font-bold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              1. Test Vocacional
            </button>
            <button
              onClick={() => handleSelectTab('modulos')}
              className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
                activeTab === 'modulos' ? 'text-[#721B32] font-bold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              2. Especialidades
            </button>
            <button
              onClick={() => handleSelectTab('pase_qr')}
              className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
                activeTab === 'pase_qr' ? 'text-[#721B32] font-bold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              3. Pase Digital QR
            </button>
            <button
              onClick={() => handleSelectTab('presencial')}
              className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
                activeTab === 'presencial' ? 'text-[#721B32] font-bold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              4. Retos Presenciales
            </button>
            <button
              onClick={() => handleSelectTab('direccion')}
              className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
                activeTab === 'direccion' ? 'text-[#721B32] font-bold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              5. Subdirección
            </button>
          </nav>

          {/* Zone 3: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {sesionActiva && (
              <div className="hidden lg:flex items-center gap-1.5 text-xs bg-stone-100 border border-stone-200 px-2.5 py-1.5 rounded-lg">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <div className="max-w-[120px] truncate text-stone-800 font-medium">
                  {sesionActiva.tipo === 'alumno' ? sesionActiva.nombre || 'Alumno' : 'Dirección DGETI'}
                </div>
              </div>
            )}

            {onOpenHelpFaq && (
              <button
                onClick={() => onOpenHelpFaq()}
                title="Centro de Ayuda y Preguntas Frecuentes"
                className="hidden sm:flex px-2.5 py-1.5 text-xs font-bold text-white bg-[#721B32] hover:bg-[#5b1528] border border-[#5b1528] rounded-lg transition-all items-center gap-1 shadow-2xs cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Ayuda & FAQ</span>
              </button>
            )}

            {onOpenTutorial && (
              <button
                onClick={onOpenTutorial}
                title="Ver tutorial guiado"
                className="hidden sm:flex px-2.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-lg transition-all items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Tutorial</span>
              </button>
            )}

            {onCerrarSesion && (
              <button
                onClick={onCerrarSesion}
                title="Cerrar sesión"
                className="hidden sm:flex px-2 py-1.5 text-xs font-semibold text-stone-700 hover:text-red-700 hover:bg-red-50 border border-stone-300 hover:border-red-300 rounded-lg transition-colors items-center gap-1 cursor-pointer shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5 text-stone-600" />
                <span>Salir</span>
              </button>
            )}

            <button
              onClick={() => handleSelectTab('presencial')}
              className="hidden md:flex px-3 py-1.5 text-xs font-bold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
            >
              Filtro QR
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 text-xs font-bold transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-[#721B32]" />
                  <span>Cerrar</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#721B32]" />
                  <span>Menú</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Header: Clean Active Stage Pill (Fits 100% width, No horizontal overflow) */}
        <div className="md:hidden bg-stone-50 border-t border-stone-200 px-3 py-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider shrink-0">Etapa:</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-stone-300 text-xs font-bold text-[#721B32] shadow-2xs truncate text-left"
            >
              {getTabIcon(activeTab, "w-3.5 h-3.5 shrink-0")}
              <span className="truncate">{getTabLabel(activeTab)}</span>
              <ChevronDown className="w-3 h-3 text-stone-400 shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onOpenTutorial && (
              <button
                onClick={onOpenTutorial}
                className="px-2 py-1 text-[11px] font-bold text-amber-950 bg-amber-200 border border-amber-300 rounded-md flex items-center gap-1"
                title="Tutorial"
              >
                <Sparkles className="w-3 h-3 text-amber-800" />
                <span>Guía</span>
              </button>
            )}

            {onCerrarSesion && (
              <button
                onClick={onCerrarSesion}
                className="p-1 text-stone-600 hover:text-red-700 bg-white border border-stone-300 rounded-md"
                title="Cerrar Sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Full Dropdown Menu (Vertical cards with full text, fits screen cleanly) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 px-3 py-3 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
            {/* Active Session Info */}
            {sesionActiva && (
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Sesión Activa</span>
                    <span className="font-bold text-stone-900 truncate">{sesionActiva.nombre || 'Usuario'}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono-code text-[10px] font-bold rounded shrink-0">
                  {sesionActiva.tipo === 'alumno' ? 'Alumno' : 'Docente'}
                </span>
              </div>
            )}

            {/* Mobile Navigation List */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase text-stone-400 px-1 tracking-wider">
                Etapas de la Feria 2026
              </div>

              <button
                onClick={() => handleSelectTab('vocacional')}
                className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors ${
                  activeTab === 'vocacional'
                    ? 'bg-[#721B32] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>1. Test Vocacional Dual</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
              </button>

              <button
                onClick={() => handleSelectTab('modulos')}
                className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors ${
                  activeTab === 'modulos'
                    ? 'bg-[#721B32] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>2. Especialidades y Videos</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
              </button>

              <button
                onClick={() => handleSelectTab('pase_qr')}
                className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors ${
                  activeTab === 'pase_qr'
                    ? 'bg-[#721B32] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 shrink-0" />
                  <span>3. Pase Digital QR (Clave Única)</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
              </button>

              <button
                onClick={() => handleSelectTab('presencial')}
                className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors ${
                  activeTab === 'presencial'
                    ? 'bg-[#721B32] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>4. Retos Presenciales (30% Plantel)</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
              </button>

              <button
                onClick={() => handleSelectTab('direccion')}
                className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors ${
                  activeTab === 'direccion'
                    ? 'bg-[#721B32] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>5. Subdirección Académica</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
              </button>
            </div>

            {/* Quick Actions at bottom of mobile menu */}
            <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2">
              {onOpenHelpFaq && (
                <button
                  onClick={() => {
                    onOpenHelpFaq();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 bg-[#721B32] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 border border-[#5b1528]"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ayuda & FAQ</span>
                </button>
              )}

              {onOpenTutorial && (
                <button
                  onClick={() => {
                    onOpenTutorial();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 bg-amber-200 text-amber-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 border border-amber-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Tutorial</span>
                </button>
              )}

              {onCerrarSesion && (
                <button
                  onClick={() => {
                    onCerrarSesion();
                    setMobileMenuOpen(false);
                  }}
                  className="col-span-2 p-2 bg-red-50 text-red-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1 border border-red-200 hover:bg-red-100"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-600" />
                  <span>Cerrar Sesión</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Fixed Bottom Navigation Bar for Mobile (100% responsive, 5 equal columns, 0 overflow, always visible) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg">
        <div className="grid grid-cols-5 w-full py-1">
          <button
            onClick={() => handleSelectTab('vocacional')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'vocacional' ? 'text-[#721B32] font-bold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Compass className={`w-4 h-4 ${activeTab === 'vocacional' ? 'text-[#721B32]' : ''}`} />
            <span className="text-[10px] mt-0.5 leading-tight">Test</span>
          </button>

          <button
            onClick={() => handleSelectTab('modulos')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'modulos' ? 'text-[#721B32] font-bold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'modulos' ? 'text-[#721B32]' : ''}`} />
            <span className="text-[10px] mt-0.5 leading-tight">Carreras</span>
          </button>

          <button
            onClick={() => handleSelectTab('pase_qr')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'pase_qr' ? 'text-[#721B32] font-bold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <QrCode className={`w-4 h-4 ${activeTab === 'pase_qr' ? 'text-[#721B32]' : ''}`} />
            <span className="text-[10px] mt-0.5 leading-tight">Pase QR</span>
          </button>

          <button
            onClick={() => handleSelectTab('presencial')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'presencial' ? 'text-[#721B32] font-bold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MapPin className={`w-4 h-4 ${activeTab === 'presencial' ? 'text-[#721B32]' : ''}`} />
            <span className="text-[10px] mt-0.5 leading-tight">Rally</span>
          </button>

          <button
            onClick={() => handleSelectTab('direccion')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'direccion' ? 'text-[#721B32] font-bold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === 'direccion' ? 'text-[#721B32]' : ''}`} />
            <span className="text-[10px] mt-0.5 leading-tight">Plantel</span>
          </button>
        </div>
      </nav>
    </>
  );
};
