import { EXERCISES, CATEGORIES, CYCLE_LABELS, weekPlan } from './data.js';
import * as store from './store.js';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const TYPE_LABEL = { renfo: 'Renfo', run: 'Course', ping: 'Ping', match: 'Match', rest: 'Repos' };

const $app = document.getElementById('app');

// ---------- Dates (heure locale) ----------

function iso(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function parse(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(s, n) {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return iso(d);
}

function mondayOf(s) {
  const d = parse(s);
  const shift = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - shift);
  return iso(d);
}

const today = () => iso(new Date());

function fmt(s, opts = { day: 'numeric', month: 'short' }) {
  return parse(s).toLocaleDateString('fr-FR', opts);
}

function cycleWeek(monday) {
  const start = store.getState().startDate ?? mondayOf(today());
  const weeks = Math.round((parse(monday) - parse(start)) / (7 * 864e5));
  return ((weeks % 4) + 4) % 4;
}

function planFor(monday) {
  const { matchWeeks, pingTuesdayWeeks } = store.getState();
  return weekPlan(cycleWeek(monday), !!matchWeeks[monday], !!pingTuesdayWeeks[monday]);
}

function sessionAt(date, id) {
  const monday = mondayOf(date);
  const idx = Math.round((parse(date) - parse(monday)) / 864e5);
  return planFor(monday)[idx]?.find((s) => s.id === id);
}

// ---------- Utilitaires ----------

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function setActiveTab(name) {
  document.querySelectorAll('.tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.tab === name));
}

// ---------- Vue semaine ----------

function renderWeek(monday) {
  const state = store.getState();
  const plan = planFor(monday);
  const cw = cycleWeek(monday);
  const hasMatch = !!state.matchWeeks[monday];
  const hasPingTuesday = !!state.pingTuesdayWeeks[monday];
  const t = today();

  let planned = 0;
  let done = 0;
  plan.forEach((sessions, i) => sessions.forEach((s) => {
    if (s.type === 'rest' || s.optional) return;
    planned++;
    if (store.getLog(addDays(monday, i), s.id).done) done++;
  }));

  $app.innerHTML = `
    <header class="week-head">
      <button class="icon-btn" data-nav="${addDays(monday, -7)}" aria-label="Semaine précédente">‹</button>
      <div>
        <h1>Semaine du ${fmt(monday)}</h1>
        <p class="muted">${CYCLE_LABELS[cw]}</p>
      </div>
      <button class="icon-btn" data-nav="${addDays(monday, 7)}" aria-label="Semaine suivante">›</button>
    </header>

    <section class="summary">
      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${planned}" aria-valuenow="${done}">
        <span style="width:${planned ? (done / planned) * 100 : 0}%"></span>
      </div>
      <p><strong>${done}/${planned}</strong> séances faites</p>
      <label class="switch">
        <input type="checkbox" id="match-toggle" ${hasMatch ? 'checked' : ''}>
        <span>Match ce dimanche</span>
      </label>
      <label class="switch ping">
        <input type="checkbox" id="ping-tuesday-toggle" ${hasPingTuesday ? 'checked' : ''}>
        <span>Ping exceptionnel mardi</span>
      </label>
      ${monday !== mondayOf(t) ? `<button class="link" data-nav="${mondayOf(t)}">Revenir à cette semaine</button>` : ''}
    </section>

    <ol class="days">
      ${plan.map((sessions, i) => {
        const date = addDays(monday, i);
        return `
          <li class="day ${date === t ? 'today' : ''}">
            <div class="day-label">
              <span>${DAYS[i]}</span>
              <span class="muted">${fmt(date, { day: 'numeric' })}</span>
            </div>
            <div class="day-sessions">
              ${sessions.map((s) => {
                const log = store.getLog(date, s.id);
                return `
                  <a class="card type-${s.type} ${log.done ? 'done' : ''}" href="#/seance/${date}/${s.id}">
                    <span class="badge">${TYPE_LABEL[s.type]}</span>
                    <span class="card-title">${esc(s.title)}</span>
                    <span class="card-meta">
                      ${s.place ? esc(s.place) : ''}${s.duration ? ` · ${s.duration} min` : ''}${s.optional ? ' · optionnel' : ''}
                    </span>
                    ${log.done ? '<span class="check" aria-label="Fait">✓</span>' : ''}
                  </a>`;
              }).join('')}
            </div>
          </li>`;
      }).join('')}
    </ol>
  `;

  $app.querySelectorAll('[data-nav]').forEach((b) =>
    b.addEventListener('click', () => { location.hash = `#/semaine/${b.dataset.nav}`; }));
  const bindToggle = (selector, key) => $app.querySelector(selector).addEventListener('change', (e) => {
    store.update((s) => {
      if (e.target.checked) s[key][monday] = true;
      else delete s[key][monday];
    });
    renderWeek(monday);
  });
  bindToggle('#match-toggle', 'matchWeeks');
  bindToggle('#ping-tuesday-toggle', 'pingTuesdayWeeks');
}

// ---------- Vue séance ----------

function renderSession(date, id) {
  const s = sessionAt(date, id);
  if (!s) {
    $app.innerHTML = `<p class="empty">Séance introuvable. <a href="#/semaine">Retour</a></p>`;
    return;
  }
  const log = store.getLog(date, id);
  const monday = mondayOf(date);

  const blockHtml = (b) => `
    <section class="block">
      <h3>${esc(b.title)}</h3>
      ${b.text ? `<p>${esc(b.text)}</p>` : ''}
      ${b.steps ? `<ol class="steps">${b.steps.map((st) => `<li>${esc(st)}</li>`).join('')}</ol>` : ''}
      ${b.items ? `<ul class="exercises">${b.items.map((it) => exerciseRow(it, log)).join('')}</ul>` : ''}
    </section>`;

  const showRunFields = s.type === 'run';

  $app.innerHTML = `
    <header class="session-head type-${s.type}">
      <a class="back" href="#/semaine/${monday}">‹ Semaine</a>
      <span class="badge">${TYPE_LABEL[s.type]}</span>
      <h1>${esc(s.title)}</h1>
      <p class="muted">${esc(fmt(date, { weekday: 'long', day: 'numeric', month: 'long' }))}${s.place ? ` · ${esc(s.place)}` : ''}${s.duration ? ` · ~${s.duration} min` : ''}</p>
      ${s.intro ? `<p class="intro">${esc(s.intro)}</p>` : ''}
    </header>

    ${s.blocks.map(blockHtml).join('')}

    <section class="block log">
      <h3>Mon suivi</h3>
      ${showRunFields ? `
        <div class="row">
          <label>Durée (min)<input type="number" inputmode="numeric" min="0" name="duration" value="${esc(log.duration)}"></label>
          <label>Distance (km)<input type="number" inputmode="decimal" min="0" step="0.1" name="distance" value="${esc(log.distance)}"></label>
        </div>` : ''}
      <label>Ressenti (RPE) : <output id="rpe-out">${log.rpe ?? '–'}</output>/10
        <input type="range" min="1" max="10" name="rpe" value="${log.rpe ?? 5}">
      </label>
      <p class="hint">1 = très facile · 5 = moyen · 8 = dur · 10 = maximum</p>
      <label>Notes<textarea name="notes" rows="3" placeholder="Sensations, douleurs, charges…">${esc(log.notes)}</textarea></label>
      <button class="primary ${log.done ? 'is-done' : ''}" id="done-btn">${log.done ? '✓ Séance faite (annuler)' : 'Marquer comme faite'}</button>
    </section>
  `;

  const save = (patch) => store.setLog(date, id, patch);

  $app.querySelectorAll('input[name], textarea[name]').forEach((el) => {
    el.addEventListener('input', () => {
      const v = el.type === 'range' || el.type === 'number' ? (el.value === '' ? undefined : Number(el.value)) : el.value;
      save({ [el.name]: v });
      if (el.name === 'rpe') $app.querySelector('#rpe-out').textContent = el.value;
    });
  });

  $app.querySelectorAll('[data-check]').forEach((el) => {
    el.addEventListener('change', () => {
      const checks = { ...(store.getLog(date, id).checks ?? {}), [el.dataset.check]: el.checked };
      save({ checks });
    });
  });

  $app.querySelectorAll('[data-load]').forEach((el) => {
    el.addEventListener('input', () => {
      const loads = { ...(store.getLog(date, id).loads ?? {}), [el.dataset.load]: el.value };
      save({ loads });
    });
  });

  $app.querySelector('#done-btn').addEventListener('click', () => {
    const cur = store.getLog(date, id);
    save({ done: !cur.done, rpe: cur.rpe ?? Number($app.querySelector('input[name=rpe]').value) });
    renderSession(date, id);
  });

  $app.querySelectorAll('.ex-info').forEach((b) =>
    b.addEventListener('click', () => b.closest('li').classList.toggle('open')));
}

function exerciseRow(it, log) {
  const ex = EXERCISES[it.ex];
  const checked = log.checks?.[it.ex];
  const prevLoad = lastLoad(it.ex);
  return `
    <li class="${checked ? 'checked' : ''}">
      <div class="ex-main">
        <label class="ex-check">
          <input type="checkbox" data-check="${it.ex}" ${checked ? 'checked' : ''}>
          <span>
            <strong>${esc(ex.name)}</strong>
            <span class="dose">${esc(it.dose)}${it.rest ? ` · repos ${esc(it.rest)}` : ''}</span>
          </span>
        </label>
        <button class="ex-info" aria-label="Détails">i</button>
      </div>
      ${it.load ? `
        <input class="load" data-load="${it.ex}" placeholder="${prevLoad ? `Dernière fois : ${esc(prevLoad)}` : 'Charge (ex. 12 kg)'}" value="${esc(log.loads?.[it.ex])}">` : ''}
      <div class="ex-details">
        <p>${esc(ex.desc)}</p>
        <ul>${ex.cues.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        <p class="why">${esc(ex.why)}</p>
      </div>
    </li>`;
}

function lastLoad(exId) {
  const logs = store.getState().logs;
  const dates = Object.keys(logs).sort().reverse();
  for (const d of dates) {
    for (const entry of Object.values(logs[d])) {
      if (entry.loads?.[exId]) return entry.loads[exId];
    }
  }
  return null;
}

// ---------- Exercices ----------

function renderExercises() {
  const byCat = {};
  Object.entries(EXERCISES).forEach(([id, ex]) => (byCat[ex.cat] ??= []).push({ id, ...ex }));
  $app.innerHTML = `
    <header class="page-head"><h1>Exercices</h1><p class="muted">Touche un exercice pour voir les consignes.</p></header>
    ${Object.entries(CATEGORIES).map(([cat, label]) => `
      <section class="block">
        <h3>${label}</h3>
        <ul class="exercises library">
          ${(byCat[cat] ?? []).map((ex) => `
            <li>
              <button class="ex-toggle">${esc(ex.name)}</button>
              <div class="ex-details">
                <p>${esc(ex.desc)}</p>
                <ul>${ex.cues.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
                <p class="why">${esc(ex.why)}</p>
              </div>
            </li>`).join('')}
        </ul>
      </section>`).join('')}
  `;
  $app.querySelectorAll('.ex-toggle').forEach((b) =>
    b.addEventListener('click', () => b.closest('li').classList.toggle('open')));
}

// ---------- Historique ----------

function renderHistory() {
  const logs = store.getState().logs;
  const entries = [];
  Object.keys(logs).sort().reverse().forEach((date) => {
    Object.entries(logs[date]).forEach(([id, log]) => {
      if (!log.done) return;
      const s = sessionAt(date, id);
      entries.push({ date, id, log, s });
    });
  });

  // 4 dernières semaines
  const thisMonday = mondayOf(today());
  const weeks = [3, 2, 1, 0].map((k) => addDays(thisMonday, -7 * k));
  const counts = weeks.map((m) => {
    const c = { renfo: 0, run: 0, ping: 0, match: 0, km: 0 };
    for (let i = 0; i < 7; i++) {
      const d = addDays(m, i);
      Object.entries(logs[d] ?? {}).forEach(([id, log]) => {
        if (!log.done) return;
        const s = sessionAt(d, id);
        if (s && c[s.type] !== undefined) c[s.type]++;
        if (log.distance) c.km += log.distance;
      });
    }
    return c;
  });

  $app.innerHTML = `
    <header class="page-head"><h1>Historique</h1></header>
    <section class="block">
      <h3>4 dernières semaines</h3>
      <table class="stats">
        <thead><tr><th></th>${weeks.map((m) => `<th>${fmt(m)}</th>`).join('')}</tr></thead>
        <tbody>
          <tr><th>Ping + match</th>${counts.map((c) => `<td>${c.ping + c.match}</td>`).join('')}</tr>
          <tr><th>Renfo</th>${counts.map((c) => `<td>${c.renfo}</td>`).join('')}</tr>
          <tr><th>Course</th>${counts.map((c) => `<td>${c.run}</td>`).join('')}</tr>
          <tr><th>Km</th>${counts.map((c) => `<td>${c.km ? c.km.toFixed(1) : '–'}</td>`).join('')}</tr>
        </tbody>
      </table>
    </section>
    <section class="block">
      <h3>Séances faites</h3>
      ${entries.length ? `<ul class="history">${entries.map(({ date, id, log, s }) => `
        <li>
          <a href="#/seance/${date}/${id}" class="type-${s?.type ?? 'rest'}">
            <span class="muted">${esc(fmt(date, { weekday: 'short', day: 'numeric', month: 'short' }))}</span>
            <strong>${esc(s?.title ?? id)}</strong>
            <span class="muted">${[log.rpe && `RPE ${log.rpe}`, log.duration && `${log.duration} min`, log.distance && `${log.distance} km`].filter(Boolean).join(' · ')}</span>
            ${log.notes ? `<em>${esc(log.notes)}</em>` : ''}
          </a>
        </li>`).join('')}</ul>` : '<p class="empty">Aucune séance enregistrée pour l’instant.</p>'}
    </section>
  `;
}

// ---------- Réglages ----------

function renderSettings() {
  const state = store.getState();
  $app.innerHTML = `
    <header class="page-head"><h1>Réglages</h1></header>
    <section class="block">
      <h3>Cycle d’entraînement</h3>
      <p>Le programme tourne sur 4 semaines (3 de progression, 1 allégée). Choisis le lundi de ta semaine 1.</p>
      <label>Début du cycle<input type="date" id="start" value="${esc(state.startDate ?? mondayOf(today()))}"></label>
    </section>
    <section class="block">
      <h3>Sauvegarde</h3>
      <p>Les données restent sur ce téléphone. Exporte-les de temps en temps.</p>
      <div class="row">
        <button id="export">Exporter</button>
        <label class="button">Importer<input type="file" id="import" accept="application/json" hidden></label>
      </div>
      <button class="danger" id="reset">Tout effacer</button>
    </section>
  `;
  $app.querySelector('#start').addEventListener('change', (e) => {
    if (!e.target.value) return;
    const monday = mondayOf(e.target.value);
    e.target.value = monday;
    store.update((s) => { s.startDate = monday; });
  });
  $app.querySelector('#export').addEventListener('click', () => {
    const blob = new Blob([store.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `entrainement-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $app.querySelector('#import').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      store.importJSON(await file.text());
      alert('Données importées.');
    } catch (err) {
      alert(`Import impossible : ${err.message}`);
    }
  });
  $app.querySelector('#reset').addEventListener('click', () => {
    if (confirm('Effacer tout l’historique et les réglages ?')) {
      store.reset();
      renderSettings();
    }
  });
}

// ---------- Routeur ----------

function route() {
  const [, view, a, b] = location.hash.split('/');
  window.scrollTo(0, 0);
  switch (view) {
    case 'seance':
      setActiveTab('semaine');
      return renderSession(a, b);
    case 'exercices':
      setActiveTab('exercices');
      return renderExercises();
    case 'historique':
      setActiveTab('historique');
      return renderHistory();
    case 'reglages':
      setActiveTab('reglages');
      return renderSettings();
    default:
      setActiveTab('semaine');
      return renderWeek(a && /^\d{4}-\d{2}-\d{2}$/.test(a) ? mondayOf(a) : mondayOf(today()));
  }
}

if (!store.getState().startDate) store.update((s) => { s.startDate = mondayOf(today()); });

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
