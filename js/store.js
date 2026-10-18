// Persistance locale (localStorage) : réglages, semaines avec match, journal.

const KEY = 'trainning-app:v1';

const DEFAULT = {
  startDate: null,   // lundi ISO (YYYY-MM-DD) de la semaine 1 du cycle
  matchWeeks: {},    // { '2026-10-19': true }
  pingTuesdayWeeks: {}, // semaines avec ping exceptionnel le mardi
  logs: {},          // { 'YYYY-MM-DD': { sessionId: { done, rpe, notes, duration, distance, loads: {exId: '20 kg'}, checks: {exId: true} } } }
};

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : structuredClone(DEFAULT);
  } catch {
    return structuredClone(DEFAULT);
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Stockage indisponible (navigation privée) : on reste en mémoire.
  }
}

export function getState() {
  return state;
}

export function update(fn) {
  fn(state);
  save();
}

export function getLog(date, sessionId) {
  return state.logs[date]?.[sessionId] ?? {};
}

export function setLog(date, sessionId, patch) {
  update((s) => {
    s.logs[date] ??= {};
    s.logs[date][sessionId] = { ...(s.logs[date][sessionId] ?? {}), ...patch };
  });
}

export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const data = JSON.parse(text);
  if (typeof data !== 'object' || !data.logs) throw new Error('Fichier invalide');
  state = { ...DEFAULT, ...data };
  save();
}

export function reset() {
  state = structuredClone(DEFAULT);
  save();
}
