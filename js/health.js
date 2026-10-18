// Import des entraînements copiés depuis Santé (iPhone) par un Raccourci.
// Format attendu, une ligne par entraînement (séparateur ; | ou tabulation) :
//   Type ; Début ; Fin ; Distance (optionnelle)
// Les dates sont idéalement en ISO 8601. Garmin Connect peut alimenter Santé,
// donc les activités de la Forerunner arrivent par le même chemin.

const TYPE_RULES = [
  { type: 'ping', re: /tennis de table|table tennis|ping/i },
  { type: 'run', re: /course|running|run\b|jogging|trail/i },
  { type: 'renfo', re: /muscu|strength|fonctionnel|functional|renfo|core|tronc|hiit|cross|fractionné haute|haute intensité|yoga|pilates|flexibilit|souplesse/i },
];

export function classify(label) {
  return TYPE_RULES.find((r) => r.re.test(label))?.type ?? null;
}

function parseDate(raw) {
  const s = raw.trim();
  // ISO 8601, avec fuseau +0200 normalisé en +02:00 (Safari).
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const d = new Date(s.replace(' ', 'T').replace(/([+-]\d{2})(\d{2})$/, '$1:$2'));
    return isNaN(d) ? null : d;
  }
  // 18/10/2026 10:05 ou 18/10/2026 à 10:05
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\D+(\d{1,2})[:h](\d{2}))?/);
  if (m) {
    const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
    return new Date(year, m[2] - 1, m[1], Number(m[4] ?? 12), Number(m[5] ?? 0));
  }
  return null;
}

// « 45 min », « 1:02:30 », « 3600 s », « 1 h 5 min » → minutes
function parseDurationMinutes(raw) {
  const s = raw.trim().toLowerCase();
  const hms = s.match(/^(\d+):(\d{2})(?::(\d{2}))?$/);
  if (hms) {
    return hms[3] !== undefined
      ? Number(hms[1]) * 60 + Number(hms[2]) + Number(hms[3]) / 60
      : Number(hms[1]) + Number(hms[2]) / 60;
  }
  let total = 0;
  let found = false;
  for (const [, n, unit] of s.matchAll(/(\d+(?:[.,]\d+)?)\s*(h|min|m(?!i)|s)/g)) {
    const v = Number(n.replace(',', '.'));
    total += unit === 'h' ? v * 60 : unit === 's' ? v / 60 : v;
    found = true;
  }
  return found ? total : null;
}

// « 8,2 km », « 8200 m », « 5.1 mi » → km
function parseDistanceKm(raw) {
  const m = raw.trim().toLowerCase().match(/(\d+(?:[.,]\d+)?)\s*(km|mi|m)?\b/);
  if (!m) return null;
  const v = Number(m[1].replace(',', '.'));
  if (m[2] === 'm') return v / 1000;
  if (m[2] === 'mi') return v * 1.609;
  return v;
}

export function parseWorkouts(text) {
  const workouts = [];
  const skipped = [];
  text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).forEach((line) => {
    const parts = line.split(/\s*[;|\t]\s*/);
    const [label = '', startRaw = '', endOrDuration = '', distanceRaw = ''] = parts;
    const type = classify(label);
    const start = parseDate(startRaw);
    if (!type || !start) {
      skipped.push({ line, reason: !start ? 'date illisible' : 'type non suivi' });
      return;
    }
    const end = parseDate(endOrDuration);
    const minutes = end ? (end - start) / 60000 : parseDurationMinutes(endOrDuration);
    const km = distanceRaw ? parseDistanceKm(distanceRaw) : null;
    workouts.push({
      label,
      type,
      start,
      minutes: minutes && minutes > 0 ? Math.round(minutes) : null,
      km: km && km > 0 ? Math.round(km * 100) / 100 : null,
    });
  });
  return { workouts: dedupe(workouts), skipped };
}

// Apple Watch et Garmin peuvent enregistrer la même séance : on garde
// une seule version des entraînements du même type qui se chevauchent
// (celle qui a une distance, sinon la plus longue).
function dedupe(list) {
  const sorted = [...list].sort((a, b) => a.start - b.start);
  const kept = [];
  for (const w of sorted) {
    const end = +w.start + (w.minutes ?? 0) * 60000;
    const twin = kept.find((k) => k.type === w.type
      && w.start < +k.start + (k.minutes ?? 0) * 60000 + 60000
      && +k.start < end + 60000);
    if (!twin) {
      kept.push(w);
    } else if ((w.km && !twin.km) || (!!w.km === !!twin.km && (w.minutes ?? 0) > (twin.minutes ?? 0))) {
      kept[kept.indexOf(twin)] = w;
    }
  }
  return kept;
}
