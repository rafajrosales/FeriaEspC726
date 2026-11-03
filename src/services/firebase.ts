import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Estudiante, EvaluacionVocacional, ProgresoVirtual, AsistenciaPresencial, DocenteAutorizado, CuestionarioEspecialidad } from '../types';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

// Cloud Firestore Sync Helpers (Free Tier Firebase Cloud DB)
const COLLECTIONS = {
  ESTUDIANTES: 'estudiantes',
  DOCENTES: 'docentes',
  EVALUACIONES: 'evaluaciones',
  PROGRESOS: 'progresos',
  ASISTENCIAS: 'asistencias',
  CUESTIONARIOS: 'cuestionarios_especialidades'
};

export async function cloudGetEstudiantes(): Promise<Estudiante[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.ESTUDIANTES));
    return snap.docs.map(d => d.data() as Estudiante);
  } catch (err) {
    console.warn('Firestore offline or read error, using localStorage fallback:', err);
    return [];
  }
}

export async function cloudSaveEstudiante(estudiante: Estudiante): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.ESTUDIANTES, estudiante.num_control), estudiante);
  } catch (err) {
    console.warn('Firestore write error:', err);
  }
}

export async function cloudGetDocentes(): Promise<DocenteAutorizado[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.DOCENTES));
    return snap.docs.map(d => d.data() as DocenteAutorizado);
  } catch (err) {
    console.warn('Firestore offline read error for docentes:', err);
    return [];
  }
}

export async function cloudSaveDocente(docente: DocenteAutorizado): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.DOCENTES, docente.id), docente);
  } catch (err) {
    console.warn('Firestore write error for docente:', err);
  }
}

export async function cloudGetCuestionarios(): Promise<CuestionarioEspecialidad[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.CUESTIONARIOS));
    return snap.docs.map(d => d.data() as CuestionarioEspecialidad);
  } catch (err) {
    console.warn('Firestore offline read error for cuestionarios:', err);
    return [];
  }
}

export async function cloudSaveCuestionario(cuestionario: CuestionarioEspecialidad): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.CUESTIONARIOS, cuestionario.id), cuestionario);
  } catch (err) {
    console.warn('Firestore write error for cuestionario:', err);
  }
}

export async function cloudDeleteCuestionario(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.CUESTIONARIOS, id));
  } catch (err) {
    console.warn('Firestore delete error for cuestionario:', err);
  }
}
