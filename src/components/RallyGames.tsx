import React, { useState } from 'react';
import { SpecialtyId } from '../types';
import { Code2, Globe2, Users2, Sparkles, CheckCircle2, Lock, Unlock, AlertCircle } from 'lucide-react';

interface RallyGamesProps {
  specialtyId: SpecialtyId;
  onCompletarReto: (calificacion: 'EXCELENTE' | 'SATISFACTORIO' | 'COMPETENTE') => void;
  yaCompletado?: boolean;
}

export const RallyGames: React.FC<RallyGamesProps> = ({
  specialtyId,
  onCompletarReto,
  yaCompletado = false
}) => {
  // Game 1: Programación - Flowchart / Algorithm puzzle
  const [algoSteps, setAlgoSteps] = useState<number[]>([3, 1, 4, 2]); // scrambled
  const [algoSolved, setAlgoSolved] = useState<boolean>(false);
  const correctOrder = [1, 2, 3, 4];

  // Game 2: Comercio - Customs Dispatch
  const [pedimentoSeleccionado, setPedimentoSeleccionado] = useState<number | null>(null);
  const [semaforoFiscal, setSemaforoFiscal] = useState<'verde' | 'rojo' | null>(null);
  const [aduaneroSolved, setAduaneroSolved] = useState<boolean>(false);

  // Game 3: RRHH - Match Laboral
  const [candidatoElegido, setCandidatoElegido] = useState<number | null>(null);
  const [rrhhSolved, setRrhhSolved] = useState<boolean>(false);

  // Game 4: Cosmetología - Skin Analysis & Tonic formulation
  const [biotipoElegido, setBiotipoElegido] = useState<string | null>(null);
  const [ingredienteElegido, setIngredienteElegido] = useState<string | null>(null);
  const [cosmetoSolved, setCosmetoSolved] = useState<boolean>(false);

  // Swap algorithm step
  const moveStep = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= algoSteps.length) return;
    const newSteps = [...algoSteps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setAlgoSteps(newSteps);

    // check if solved
    if (JSON.stringify(newSteps) === JSON.stringify(correctOrder)) {
      setAlgoSolved(true);
    }
  };

  const algoLabels: Record<number, string> = {
    1: '1. INICIO: Recibir credencial del alumno en puerta',
    2: '2. PROCESO: Consultar base de datos del CETis 7',
    3: '3. DECISIÓN: ¿Completó el 70% virtual? (Si/No)',
    4: '4. FIN: Emitir Pase de Acceso al Rally Presencial'
  };

  // Render Programación Game
  if (specialtyId === 'programacion') {
    return (
      <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-bold text-stone-900">Escape Room: El Algoritmo Perdido</h4>
          </div>
          <span className="text-xs font-mono-code text-stone-500">Tiempo estimado: 10 min</span>
        </div>

        <p className="text-xs text-stone-600">
          La caja de premios de la academia está bloqueada por un algoritmo desordenado. Ordena los 4 bloques lógicos del diagrama de flujo para descifrar la clave criptográfica:
        </p>

        <div className="space-y-2">
          {algoSteps.map((stepNum, idx) => (
            <div
              key={stepNum}
              className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                algoSolved ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-stone-200 text-stone-800'
              }`}
            >
              <div className="font-mono-code font-semibold">
                {algoLabels[stepNum]}
              </div>
              {!algoSolved && !yaCompletado && (
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, 'up')}
                    className="p-1 text-xs border rounded bg-stone-100 disabled:opacity-30 hover:bg-stone-200"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === algoSteps.length - 1}
                    onClick={() => moveStep(idx, 'down')}
                    className="p-1 text-xs border rounded bg-stone-100 disabled:opacity-30 hover:bg-stone-200"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {algoSolved && !yaCompletado && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Unlock className="w-4 h-4 text-emerald-600" />
              <span><strong>¡Caja Desbloqueada!</strong> Secuencia lógica correcta. Clave obtenida: <code>ALG-2026-OK</code></span>
            </div>
            <button
              onClick={() => onCompletarReto('EXCELENTE')}
              className="px-3 py-1.5 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded text-xs"
            >
              Registrar Acreditación
            </button>
          </div>
        )}

        {yaCompletado && (
          <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Reto Presencial Acreditado en Taller de Programación.
          </div>
        )}
      </div>
    );
  }

  // Render Comercio Game
  if (specialtyId === 'comercio') {
    return (
      <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-bold text-stone-900">Rally Aduanero: Despacho Express</h4>
          </div>
          <span className="text-xs font-mono-code text-stone-500">Tiempo estimado: 12 min</span>
        </div>

        <p className="text-xs text-stone-600">
          Simula la inspección física de un pedimento de exportación en aduana. Revisa el lote de mercancía, confirma la fracción arancelaria y activa el mecanismo del semáforo fiscal:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setPedimentoSeleccionado(1)}
            className={`p-3 rounded-lg border text-left transition-all ${
              pedimentoSeleccionado === 1 ? 'border-emerald-600 bg-white shadow-xs' : 'border-stone-200 bg-stone-100/60'
            }`}
          >
            <div className="font-bold text-stone-800 mb-1">Lote A: Jarabe de Agave Orgánico</div>
            <div className="text-stone-600">Fracción: 1702.90.99 · Destino: Puerto de Hamburgo (Alemania)</div>
            <div className="text-emerald-700 font-semibold mt-1">Cumple Certificado Fitosanitario y NOM-002</div>
          </button>

          <button
            type="button"
            onClick={() => setPedimentoSeleccionado(2)}
            className={`p-3 rounded-lg border text-left transition-all ${
              pedimentoSeleccionado === 2 ? 'border-emerald-600 bg-white shadow-xs' : 'border-stone-200 bg-stone-100/60'
            }`}
          >
            <div className="font-bold text-stone-800 mb-1">Lote B: Conectores de Fibra Óptica</div>
            <div className="text-stone-600">Fracción: 8536.70.01 · Origen: Corea del Sur</div>
            <div className="text-amber-700 font-semibold mt-1">Requiere verificación de padrón de importadores</div>
          </button>
        </div>

        {pedimentoSeleccionado && !aduaneroSolved && !yaCompletado && (
          <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
            <span className="text-xs font-bold text-stone-800 block">Accionar Mecanismo de Selección Automatizada (Semáforo Fiscal):</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSemaforoFiscal('verde');
                  setAduaneroSolved(true);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center gap-2"
              >
                <span className="w-3 h-3 rounded-full bg-emerald-300 animate-pulse"></span>
                Luz Verde: Desaduanamiento Libre
              </button>
              <button
                onClick={() => {
                  setSemaforoFiscal('rojo');
                  setAduaneroSolved(true);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs flex items-center gap-2"
              >
                <span className="w-3 h-3 rounded-full bg-red-300 animate-pulse"></span>
                Luz Roja: Reconocimiento Aduanero
              </button>
            </div>
          </div>
        )}

        {aduaneroSolved && !yaCompletado && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div>
              <strong>¡Despacho Validado!</strong> Semáforo fiscal asignado ({semaforoFiscal?.toUpperCase()}) conforme a la normatividad aduanera de la ANAM.
            </div>
            <button
              onClick={() => onCompletarReto('SATISFACTORIO')}
              className="px-3 py-1.5 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded text-xs"
            >
              Registrar Sello de Aduana
            </button>
          </div>
        )}

        {yaCompletado && (
          <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Reto Presencial Acreditado en Estación de Comercio Internacional.
          </div>
        )}
      </div>
    );
  }

  // Render RRHH Game
  if (specialtyId === 'rrhh') {
    return (
      <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-purple-600" />
            <h4 className="text-sm font-bold text-stone-900">Match Laboral & Dinámica de Integración</h4>
          </div>
          <span className="text-xs font-mono-code text-stone-500">Tiempo estimado: 10 min</span>
        </div>

        <p className="text-xs text-stone-600">
          Como responsable de Capital Humano, analiza las dos ternas para el puesto de "Coordinador de Clima Laboral y NOM-035". ¿Cuál candidato cumple mejor con el perfil ético y de liderazgo colaborativo?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              setCandidatoElegido(1);
              setRrhhSolved(true);
            }}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              candidatoElegido === 1 ? 'border-purple-600 bg-white shadow-xs' : 'border-stone-200 bg-stone-100/60'
            }`}
          >
            <div className="font-bold text-stone-900 mb-1">Candidata A: Lic. Elena Morales</div>
            <p className="text-stone-600 text-[11px] mb-2">
              "Enfocada en escucha activa, dinámicas de pausas laborales y empatía. Propone talleres contra el estrés y buzón anónimo confidencial."
            </p>
            <span className="text-purple-700 font-semibold text-[11px]">Alta afinidad con la NOM-035 y cultura DGETI</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCandidatoElegido(2);
              setRrhhSolved(true);
            }}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              candidatoElegido === 2 ? 'border-purple-600 bg-white shadow-xs' : 'border-stone-200 bg-stone-100/60'
            }`}
          >
            <div className="font-bold text-stone-900 mb-1">Candidato B: Lic. Arturo Vega</div>
            <p className="text-stone-600 text-[11px] mb-2">
              "Prioriza la presión por metas numéricas sin considerar jornadas extraordinarias ni descansos compensatorios."
            </p>
            <span className="text-amber-700 font-semibold text-[11px]">Riesgo de sanciones por Ley Federal del Trabajo</span>
          </button>
        </div>

        {rrhhSolved && !yaCompletado && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div>
              <strong>¡Selección Asertiva!</strong> {candidatoElegido === 1 ? 'Has elegido el perfil idóneo con ética y apego a la NOM-035.' : 'Revisión con retroalimentación correctiva.'}
            </div>
            <button
              onClick={() => onCompletarReto('EXCELENTE')}
              className="px-3 py-1.5 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded text-xs"
            >
              Registrar Firma de RRHH
            </button>
          </div>
        )}

        {yaCompletado && (
          <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Reto Presencial Acreditado en Aula de Recursos Humanos.
          </div>
        )}
      </div>
    );
  }

  // Render Cosmetología Game
  return (
    <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-600" />
          <h4 className="text-sm font-bold text-stone-900">Taller Sensorial de Biotipos Cutáneos</h4>
        </div>
        <span className="text-xs font-mono-code text-stone-500">Tiempo estimado: 10 min</span>
      </div>

      <p className="text-xs text-stone-600">
        En la cabina didáctica, diagnostica la muestra cutánea bajo lupa con luz LED y selecciona el hidrolato botánico equilibrante con pH fisiológico (5.5):
      </p>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-stone-800 block mb-1.5">Paso 1: Diagnóstico de Biotipo Cutáneo</span>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {['Piel Grasa (Seborreica)', 'Piel Seca (Alípica)', 'Piel Sensible'].map(tipo => (
              <button
                key={tipo}
                type="button"
                onClick={() => setBiotipoElegido(tipo)}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  biotipoElegido === tipo ? 'border-pink-600 bg-white font-bold text-pink-950 shadow-xs' : 'border-stone-200 bg-stone-100 text-stone-700'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {biotipoElegido && (
          <div>
            <span className="text-xs font-semibold text-stone-800 block mb-1.5">Paso 2: Formulación del Tónico Botánico</span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { name: 'Hidrolato de Manzanilla (Calmante)', ph: '5.4' },
                { name: 'Extracto de Nopal y Aloe (Hidratante)', ph: '5.5' },
                { name: 'Agua de Rosas con Hamamelis (Astringente)', ph: '5.2' }
              ].map(item => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setIngredienteElegido(item.name);
                    setCosmetoSolved(true);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    ingredienteElegido === item.name ? 'border-pink-600 bg-white font-semibold text-pink-950 shadow-xs' : 'border-stone-200 bg-stone-100 text-stone-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">{item.name}</div>
                  <div className="text-[10px] text-stone-500 font-mono-code">pH controlado: {item.ph}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {cosmetoSolved && !yaCompletado && (
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div>
            <strong>¡Formulación Exitosa!</strong> Mezcla botánica con pH fisiológico equilibrado para biotipo diagnosticado.
          </div>
          <button
            onClick={() => onCompletarReto('EXCELENTE')}
            className="px-3 py-1.5 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded text-xs"
          >
            Registrar Sello de Cabina
          </button>
        </div>
      )}

      {yaCompletado && (
        <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          Reto Presencial Acreditado en Cabina Didáctica de Cosmetología.
        </div>
      )}
    </div>
  );
};
