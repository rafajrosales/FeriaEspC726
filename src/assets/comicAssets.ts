// Comic style vignettes and teen-appealing illustrations for CETis No. 7
import heroImg from './images/cetis_teen_hero_1793583310788.jpg';
import programacionImg from './images/comic_programacion_1793583328498.jpg';
import comercioImg from './images/comic_comercio_1793583328928.jpg';
import rrhhImg from './images/comic_rrhh_1793583343202.jpg';
import cosmetologiaImg from './images/comic_cosmetologia_1793583342391.jpg';
import rallyImg from './images/comic_rally_presencial_1793583360108.jpg';
import { SpecialtyId } from '../types';

export const COMIC_ASSETS = {
  hero: heroImg,
  rally: rallyImg,
  especialidades: {
    programacion: {
      image: programacionImg,
      badge: 'CÓDIGO & DEV',
      callout: '¡Crea apps, videojuegos y domina la Inteligencia Artificial!',
      motto: 'Lógica · Software · Algoritmos'
    },
    comercio: {
      image: comercioImg,
      badge: 'COMERCIO GLOBAL',
      callout: '¡Conecta a México con aduanas, puertos y mercados mundiales!',
      motto: 'Logística · Aranceles · Exportación'
    },
    rrhh: {
      image: rrhhImg,
      badge: 'LIDERAZGO & TALENTO',
      callout: '¡Lidera equipos triunfadores y transforma la cultura laboral!',
      motto: 'Gestión · Comunicación · Clima Humano'
    },
    cosmetologia: {
      image: cosmetologiaImg,
      badge: 'CIENCIA & BIENESTAR',
      callout: '¡Aprende dermocosmiatría científica, cuidado integral y estética!',
      motto: 'Dermatología · Bienestar · Fórmulas'
    }
  } as Record<SpecialtyId, { image: string; badge: string; callout: string; motto: string }>
};
