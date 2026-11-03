import React from 'react';
import { School, Compass, BookOpen, QrCode, MapPin, Building2, LogOut, UserCheck, Sparkles } from 'lucide-react';
import { SesionUsuario } from '../services/storage';

export type MainNavTab = 'vocacional' | 'modulos' | 'pase_qr' | 'presencial' | 'direccion';

interface HeaderProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  sesionActiva?: SesionUsuario | null;
  onCerrarSesion?: () => void;
  onOpenQuickInfo?: () => void;
  onOpenTutorial?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange,
  sesionActiva,
  onCerrarSesion,
  onOpenTutorial
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      {/* Institutional Top Strip (SEP / DGETI) */}
      <div className="bg-[#721B32] text-white text-[11px] font-medium py-1 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider">GOBIERNO DE MÉXICO</span>
          <span className="opacity-50">|</span>
          <span className="opacity-90">SEP · SEMS · DGETI</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono-code text-[10px] text-stone-200">
          <span>PLANTEL 007 "MIGUEL LERDO DE TEJADA"</span>
          <span className="opacity-50">·</span>
          <span>CUAUTEPEC, CDMX</span>
        </div>
      </div>

      {/* Main Navigation Bar complying with the 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#721B32] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
            <School className="w-5 h-5 text-amber-200" />
          </div>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              onTabChange('vocacional');
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-[#721B32] transition-colors"
          >
            CETis No. 7 <span className="text-[#721B32] font-semibold text-xs sm:text-sm font-sans">Feria 2026</span>
          </a>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <button
            onClick={() => onTabChange('vocacional')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'vocacional' ? 'text-[#721B32] font-semibold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            1. Test Vocacional
          </button>
          <button
            onClick={() => onTabChange('modulos')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'modulos' ? 'text-[#721B32] font-semibold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. Especialidades
          </button>
          <button
            onClick={() => onTabChange('pase_qr')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'pase_qr' ? 'text-[#721B32] font-semibold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            3. Pase Digital QR
          </button>
          <button
            onClick={() => onTabChange('presencial')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'presencial' ? 'text-[#721B32] font-semibold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            4. Retos Presenciales (30%)
          </button>
          <button
            onClick={() => onTabChange('direccion')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'direccion' ? 'text-[#721B32] font-semibold border-b-2 border-[#721B32]' : 'hover:text-stone-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            5. Subdirección
          </button>
        </nav>

        {/* Zone 3: Session info and primary actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {sesionActiva && (
            <div className="hidden lg:flex items-center gap-2 text-xs bg-stone-100 border border-stone-200 px-2.5 py-1.5 rounded-lg">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <div className="max-w-[150px] truncate text-stone-800 font-medium">
                {sesionActiva.tipo === 'alumno' ? sesionActiva.nombre || 'Alumno' : 'Dirección DGETI'}
              </div>
            </div>
          )}

          {onOpenTutorial && (
            <button
              onClick={onOpenTutorial}
              title="Ver guía paso a paso de las 4 fases"
              className="px-2.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">Tutorial</span>
            </button>
          )}

          {onCerrarSesion && (
            <button
              onClick={onCerrarSesion}
              title="Cerrar sesión e ir a la pantalla de registro / acceso"
              className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-red-700 hover:bg-red-50 border border-stone-300 hover:border-red-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-600 hover:text-red-700" />
              <span>Cerrar Sesión</span>
            </button>
          )}

          <button
            onClick={() => onTabChange('presencial')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#721B32] hover:bg-[#5b1528] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
          >
            Filtro de Entrada QR
          </button>
        </div>
      </div>

      {/* Mobile Submenu Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 px-2 py-2 overflow-x-auto text-[11px] font-medium bg-stone-50 gap-1">
        {onOpenTutorial && (
          <button
            onClick={onOpenTutorial}
            className="px-2 py-1 rounded whitespace-nowrap bg-amber-200 text-amber-950 font-bold border border-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-800" />
            Guía
          </button>
        )}
        <button
          onClick={() => onTabChange('vocacional')}
          className={`px-2 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'vocacional' ? 'bg-[#721B32] text-white font-semibold' : 'text-stone-600'}`}
        >
          Test Vocacional
        </button>
        <button
          onClick={() => onTabChange('modulos')}
          className={`px-2 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'modulos' ? 'bg-[#721B32] text-white font-semibold' : 'text-stone-600'}`}
        >
          Especialidades
        </button>
        <button
          onClick={() => onTabChange('pase_qr')}
          className={`px-2 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'pase_qr' ? 'bg-[#721B32] text-white font-semibold' : 'text-stone-600'}`}
        >
          Pase QR
        </button>
        <button
          onClick={() => onTabChange('presencial')}
          className={`px-2 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'presencial' ? 'bg-[#721B32] text-white font-semibold' : 'text-stone-600'}`}
        >
          Rally Presencial
        </button>
        <button
          onClick={() => onTabChange('direccion')}
          className={`px-2 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'direccion' ? 'bg-[#721B32] text-white font-semibold' : 'text-stone-600'}`}
        >
          Subdirección
        </button>
        {onCerrarSesion && (
          <button
            onClick={onCerrarSesion}
            className="px-2 py-1 rounded whitespace-nowrap text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 font-bold flex items-center gap-1 cursor-pointer"
            title="Cerrar Sesión"
          >
            <LogOut className="w-3 h-3" />
            <span>Salir</span>
          </button>
        )}
      </div>
    </header>
  );
};
