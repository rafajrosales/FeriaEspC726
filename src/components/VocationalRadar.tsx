import React from 'react';
import { EvaluacionVocacional } from '../types';

interface VocationalRadarProps {
  evaluacion: EvaluacionVocacional;
}

export const VocationalRadar: React.FC<VocationalRadarProps> = ({ evaluacion }) => {
  const size = 320;
  const center = size / 2;
  const radius = 110;

  // 4 axes: Top = Programación, Right = Comercio, Bottom = Recursos Humanos, Left = Cosmetología
  const axes = [
    { key: 'programacion', label: 'Programación', aptitud: evaluacion.score_aptitud_programacion, gusto: evaluacion.score_gusto_programacion, angle: -Math.PI / 2 },
    { key: 'comercio', label: 'Comercio Int.', aptitud: evaluacion.score_aptitud_comercio, gusto: evaluacion.score_gusto_comercio, angle: 0 },
    { key: 'rrhh', label: 'Recursos Humanos', aptitud: evaluacion.score_aptitud_rrhh, gusto: evaluacion.score_gusto_rrhh, angle: Math.PI / 2 },
    { key: 'cosmetologia', label: 'Cosmetología', aptitud: evaluacion.score_aptitud_cosmetologia, gusto: evaluacion.score_gusto_cosmetologia, angle: Math.PI }
  ];

  // Helper to get coordinates given value (0 to 100) and angle
  const getCoordinates = (value: number, angle: number) => {
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const aptitudPoints = axes.map(a => {
    const { x, y } = getCoordinates(a.aptitud, a.angle);
    return `${x},${y}`;
  }).join(' ');

  const gustoPoints = axes.map(a => {
    const { x, y } = getCoordinates(a.gusto, a.angle);
    return `${x},${y}`;
  }).join(' ');

  // Grid levels 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Diagnóstico Dual DGETI</span>
          <h4 className="text-base font-semibold text-stone-900">Radar Vocacional: Aptitud vs. Interés</h4>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#721B32] inline-block"></span>
            <span className="text-stone-700">Aptitud (Destrezas)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#047857] inline-block"></span>
            <span className="text-stone-700">Interés (Gustos)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 justify-center">
        {/* SVG Radar */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Concentric diamond grid rings */}
            {levels.map((lvl, idx) => {
              const r = radius * lvl;
              const points = [
                `${center},${center - r}`,
                `${center + r},${center}`,
                `${center},${center + r}`,
                `${center - r},${center}`
              ].join(' ');
              return (
                <polygon
                  key={idx}
                  points={points}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray={lvl === 1 ? 'none' : '3 3'}
                />
              );
            })}

            {/* Axis lines */}
            <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#d1d5db" strokeWidth="1" />
            <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="#d1d5db" strokeWidth="1" />

            {/* Aptitud Polygon (Wine) */}
            <polygon
              points={aptitudPoints}
              fill="#721B32"
              fillOpacity="0.25"
              stroke="#721B32"
              strokeWidth="2.5"
            />
            {axes.map((a, i) => {
              const { x, y } = getCoordinates(a.aptitud, a.angle);
              return <circle key={`apt-${i}`} cx={x} cy={y} r="4" fill="#721B32" stroke="#fff" strokeWidth="1.5" />;
            })}

            {/* Gusto / Interes Polygon (Green) */}
            <polygon
              points={gustoPoints}
              fill="#047857"
              fillOpacity="0.25"
              stroke="#047857"
              strokeWidth="2.5"
            />
            {axes.map((a, i) => {
              const { x, y } = getCoordinates(a.gusto, a.angle);
              return <circle key={`gus-${i}`} cx={x} cy={y} r="4" fill="#047857" stroke="#fff" strokeWidth="1.5" />;
            })}

            {/* Axis Labels */}
            {/* Top: Programacion */}
            <text x={center} y={center - radius - 14} textAnchor="middle" className="text-xs font-semibold fill-stone-800">
              Programación
            </text>
            {/* Right: Comercio */}
            <text x={center + radius + 10} y={center + 4} textAnchor="start" className="text-xs font-semibold fill-stone-800">
              Comercio Int.
            </text>
            {/* Bottom: RRHH */}
            <text x={center} y={center + radius + 20} textAnchor="middle" className="text-xs font-semibold fill-stone-800">
              Recursos Humanos
            </text>
            {/* Left: Cosmetologia */}
            <text x={center - radius - 10} y={center + 4} textAnchor="end" className="text-xs font-semibold fill-stone-800">
              Cosmetología
            </text>
          </svg>
        </div>

        {/* Tabular Analysis breakdown */}
        <div className="w-full max-w-sm space-y-3">
          <div className="text-xs font-medium text-stone-500 uppercase tracking-wide">
            Cotejo Cuantitativo por Especialidad
          </div>

          <div className="space-y-2">
            {axes.map(axis => {
              const avg = Math.round((axis.aptitud + axis.gusto) / 2);
              const isMatch = Math.abs(axis.aptitud - axis.gusto) <= 25 && avg >= 50;
              return (
                <div key={axis.key} className="bg-stone-50 rounded-lg p-2.5 border border-stone-200">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-stone-800">{axis.label}</span>
                    <span className="font-mono-code text-stone-600 font-medium">Afinidad: {avg}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                    <div className="flex items-center justify-between">
                      <span className="text-[#721B32] font-medium">Aptitud:</span>
                      <span className="font-mono-code font-semibold">{axis.aptitud} pts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#047857] font-medium">Gusto:</span>
                      <span className="font-mono-code font-semibold">{axis.gusto} pts</span>
                    </div>
                  </div>
                  {isMatch && (
                    <div className="mt-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Alta congruencia diagnóstica (Aptitud + Interés alineados)
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-amber-900">
            <span className="font-semibold block mb-0.5">Dictamen de Orientación:</span>
            {evaluacion.analisis_pedagogico}
          </div>
        </div>
      </div>
    </div>
  );
};
