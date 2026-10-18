// Contenu d'entraînement : exercices, séances et semaine type.
// Voir docs/recherche-entrainements.md pour les sources.

export const CATEGORIES = {
  jambes: 'Jambes',
  tronc: 'Tronc / rotation',
  haut: 'Haut du corps',
  epaule: 'Épaule (prévention)',
  footwork: 'Footwork',
  mobilite: 'Mobilité',
};

export const EXERCISES = {
  'goblet-squat': {
    name: 'Goblet squat (ou squat barre)', cat: 'jambes',
    desc: 'Haltère ou kettlebell contre la poitrine, pieds largeur d’épaules.',
    cues: ['Descente contrôlée en 3 s', 'Genoux dans l’axe des pieds', 'Remonter vite'],
    why: 'Force pour tenir la position basse pendant tout l’échange.',
  },
  'fente-laterale': {
    name: 'Fente latérale / Cossack squat', cat: 'jambes',
    desc: 'Grand pas sur le côté, fléchir la jambe d’appui, l’autre reste tendue.',
    cues: ['Talon au sol', 'Buste droit', 'Repousser fort pour revenir'],
    why: 'Reproduit le grand écart pour aller chercher une balle excentrée.',
  },
  'sdt-unilateral': {
    name: 'Soulevé de terre sur une jambe', cat: 'jambes',
    desc: 'Haltère dans la main opposée à la jambe d’appui, bascule du buste.',
    cues: ['Dos plat', 'Hanches de face', 'Genou d’appui légèrement fléchi'],
    why: 'Ischios, fessiers et équilibre sur un appui.',
  },
  'mollets': {
    name: 'Montées sur pointes, une jambe', cat: 'jambes',
    desc: 'Sur une marche, talon qui descend sous le niveau de la marche.',
    cues: ['Amplitude complète', 'Pause 1 s en haut'],
    why: 'Mollets et chevilles pour des appuis rapides.',
  },
  'skater-jumps': {
    name: 'Skater jumps (bonds latéraux)', cat: 'jambes',
    desc: 'Bond latéral d’une jambe sur l’autre, réception stabilisée.',
    cues: ['Réception silencieuse', 'Tenir 1 s avant de repartir', 'Rester bas'],
    why: 'Explosivité latérale et contrôle de la réception.',
  },
  'developpe-halteres': {
    name: 'Développé couché haltères (ou pompes)', cat: 'haut',
    desc: 'Sur banc plat. À la maison : pompes, inclinées si besoin.',
    cues: ['Omoplates serrées', 'Coudes à 45°'],
    why: 'Poussée du haut du corps, équilibre avant/arrière de l’épaule.',
  },
  'rowing-un-bras': {
    name: 'Rowing un bras haltère', cat: 'haut',
    desc: 'Un genou et une main sur le banc, tirer l’haltère vers la hanche.',
    cues: ['Dos plat', 'Tirer avec le coude', 'Ramener l’omoplate'],
    why: 'Dos et stabilité de l’omoplate.',
  },
  'woodchop': {
    name: 'Woodchop poulie (haut → bas)', cat: 'tronc',
    desc: 'Poulie haute, tirer en diagonale vers la hanche opposée en pivotant.',
    cues: ['Pivot du pied arrière', 'La rotation part des hanches', 'Bras quasi tendus'],
    why: 'Chaîne jambes → tronc → bras, comme le coup droit.',
  },
  'pallof-press': {
    name: 'Pallof press (poulie ou élastique)', cat: 'tronc',
    desc: 'De profil à la poulie, pousser les mains devant soi sans tourner.',
    cues: ['Bassin fixe', 'Expirer en poussant', '2 s bras tendus'],
    why: 'Anti-rotation : un tronc solide pour transmettre la force.',
  },
  'medball-rotatif': {
    name: 'Lancer rotatif médecine-ball contre un mur', cat: 'tronc',
    desc: 'De profil au mur, ballon de 2 à 4 kg, lancer en pivotant.',
    cues: ['Explosif', 'Transfert du poids jambe arrière → avant', 'Rattraper et repartir'],
    why: 'Puissance de rotation : c’est le geste du coup droit.',
  },
  'gainage': {
    name: 'Gainage ventral', cat: 'tronc',
    desc: 'Sur les avant-bras, corps aligné.',
    cues: ['Fessiers serrés', 'Ne pas creuser'],
    why: 'Base du tronc.',
  },
  'gainage-lateral': {
    name: 'Gainage latéral', cat: 'tronc',
    desc: 'Sur un avant-bras, hanches hautes.',
    cues: ['Épaule au-dessus du coude', 'Corps aligné'],
    why: 'Obliques : rotation et stabilité latérale.',
  },
  'dead-bug': {
    name: 'Dead bug', cat: 'tronc',
    desc: 'Sur le dos, bras et jambes en l’air, allonger bras et jambe opposés.',
    cues: ['Bas du dos collé au sol', 'Lent et contrôlé'],
    why: 'Coordination bras-jambes opposés.',
  },
  'copenhague': {
    name: 'Planche de Copenhague (genou)', cat: 'tronc',
    desc: 'Gainage latéral, genou du dessus posé sur un banc ou une chaise.',
    cues: ['Hanches hautes', 'Commencer court'],
    why: 'Adducteurs, très sollicités dans les fentes latérales.',
  },
  'rotation-externe': {
    name: 'Rotation externe épaule à l’élastique', cat: 'epaule',
    desc: 'Coude collé au corps à 90°, tourner l’avant-bras vers l’extérieur.',
    cues: ['Serviette sous le coude', 'Retour lent en 3 s'],
    why: 'Coiffe des rotateurs : la base de la prévention de l’épaule.',
  },
  'ytw': {
    name: 'Y-T-W', cat: 'epaule',
    desc: 'Allongé sur le ventre (ou penché), lever les bras en Y, en T, puis en W.',
    cues: ['Pouces vers le haut', 'Serrer les omoplates', 'Sans charge ou 0,5 à 1 kg'],
    why: 'Muscles de l’omoplate (souvent faibles chez les pongistes).',
  },
  'face-pull': {
    name: 'Face pull à l’élastique', cat: 'epaule',
    desc: 'Élastique à hauteur du visage, tirer vers le front en écartant les mains.',
    cues: ['Coudes hauts', 'Finir en rotation externe'],
    why: 'Arrière de l’épaule et posture.',
  },
  'sleeper-stretch': {
    name: 'Sleeper stretch (bras dominant)', cat: 'mobilite',
    desc: 'Couché sur le côté du bras dominant, coude à 90°, pousser doucement l’avant-bras vers le sol.',
    cues: ['Étirement doux, sans douleur', 'Respirer'],
    why: 'Corrige la perte de rotation interne (GIRD), fréquente au ping.',
  },
  'poignet': {
    name: 'Poignet : flexion, extension, pronation, supination', cat: 'haut',
    desc: 'Avant-bras posé sur la cuisse, très petite charge ou élastique.',
    cues: ['Très léger', 'Mouvement lent'],
    why: 'Avant-bras, prévention de l’épicondylite (« tennis elbow »).',
  },
  'equilibre': {
    name: 'Équilibre sur une jambe', cat: 'jambes',
    desc: 'Sur un pied, yeux fermés ou sur un coussin.',
    cues: ['Genou légèrement fléchi', 'Bassin stable'],
    why: 'Chevilles : prévention des entorses.',
  },
  'pas-chasses': {
    name: 'Pas chassés en position basse', cat: 'footwork',
    desc: 'Sur 2 à 3 m, aller-retour sans croiser les pieds.',
    cues: ['Rester bas', 'Pieds qui ne se touchent pas', 'Sur l’avant du pied'],
    why: 'Déplacement de base du ping.',
  },
  'shadow': {
    name: 'Shadow play', cat: 'footwork',
    desc: 'Gestes sans balle : coup droit, revers, pivot, avec les déplacements.',
    cues: ['Replacement après chaque geste', 'Rythme de match'],
    why: 'Automatiser gestes et appuis.',
  },
  'touche-table': {
    name: 'Drill « touche table »', cat: 'footwork',
    desc: 'Pas chassés d’un bord à l’autre (table, ou 2 repères), toucher avec la main opposée.',
    cues: ['Accélérer progressivement'],
    why: 'Couvrir toute la largeur de la table.',
  },
  'echelle': {
    name: 'Échelle de rythme / lignes au sol', cat: 'footwork',
    desc: 'In-in-out-out latéral, puis appuis croisés.',
    cues: ['Fréquence avant la vitesse', 'Bras actifs'],
    why: 'Fréquence d’appuis et coordination.',
  },
  'plots-reaction': {
    name: 'Réaction sur 4 plots', cat: 'footwork',
    desc: '4 plots en carré de 2 m ; un partenaire ou une appli annonce le plot à toucher.',
    cues: ['Retour au centre à chaque fois'],
    why: 'Lecture et réaction, comme en match.',
  },
  'mob-9090': {
    name: 'Mobilité hanches 90/90', cat: 'mobilite',
    desc: 'Assis, les deux jambes à 90°, basculer les genoux d’un côté puis de l’autre.',
    cues: ['Buste droit', 'Lent'],
    why: 'Hanches mobiles pour une position basse confortable.',
  },
  'mob-thoracique': {
    name: 'Rotation thoracique à quatre pattes', cat: 'mobilite',
    desc: 'Une main derrière la tête, ouvrir le coude vers le plafond.',
    cues: ['Bassin fixe', 'Suivre le coude des yeux'],
    why: 'Rotation du haut du dos pour les coups.',
  },
  'etirement-mollets': {
    name: 'Étirement mollets et ischios', cat: 'mobilite',
    desc: 'Contre un mur pour les mollets, jambe tendue sur un support pour les ischios.',
    cues: ['30 s par position', 'Sans à-coups'],
    why: 'Récupération après course et ping.',
  },
};

// ---------- Séances ----------
// Cycle de 4 semaines : 0, 1, 2 = progression, 3 = semaine allégée.

const ROUTINE_PING = {
  title: 'Mini-routine avant le ping (10 min)',
  items: [
    { ex: 'rotation-externe', dose: '1 x 15 / bras' },
    { ex: 'ytw', dose: '1 x 8 de chaque lettre' },
    { ex: 'fente-laterale', dose: '1 x 8 / côté, sans charge' },
    { ex: 'pas-chasses', dose: '2 x 15 s' },
    { ex: 'shadow', dose: '1 min' },
  ],
};

function renfoA(w) {
  const s = w === 3 ? 2 : (w === 2 ? 4 : 3);
  return {
    id: 'renfoA', type: 'renfo', title: 'Renfo A : force et puissance', place: 'Salle', duration: 50,
    intro: w === 3
      ? 'Semaine allégée : 2 séries, même charge, pas d’échec.'
      : 'Charges modérées, exécution rapide. Garde 1 à 2 reps en réserve.',
    blocks: [
      { title: 'Échauffement (8 min)', text: '3 min de vélo ou rameur, cercles de bras, fentes marchées avec rotation du buste, 5 squats au poids du corps.' },
      { title: 'Puissance (en premier, quand tu es frais)', items: [
        { ex: 'medball-rotatif', dose: `${s} x 6 / côté`, rest: '60 s' },
        { ex: 'skater-jumps', dose: `${s} x 6 / côté`, rest: '60 s' },
      ] },
      { title: 'Force', items: [
        { ex: 'goblet-squat', dose: `${s} x 8–10`, rest: '90 s', load: true },
        { ex: 'fente-laterale', dose: `${s} x 6–8 / côté`, rest: '60 s', load: true },
        { ex: 'sdt-unilateral', dose: `${s} x 8 / côté`, rest: '60 s', load: true },
        { ex: 'developpe-halteres', dose: `${s} x 8–10`, rest: '60 s', load: true },
        { ex: 'rowing-un-bras', dose: `${s} x 10 / côté`, rest: '60 s', load: true },
      ] },
      { title: 'Tronc', items: [
        { ex: 'woodchop', dose: `${s} x 8 / côté`, rest: '45 s', load: true },
        { ex: 'pallof-press', dose: `${s} x 10 / côté`, rest: '45 s', load: true },
        { ex: 'mollets', dose: '2 x 15 / côté', rest: '30 s' },
      ] },
    ],
  };
}

function renfoB(w) {
  const s = w === 3 ? 2 : 3;
  const blocks = [
    { title: 'Épaule', items: [
      { ex: 'rotation-externe', dose: `${s} x 15 / bras`, rest: '30 s' },
      { ex: 'ytw', dose: '2 x 8 de chaque lettre', rest: '30 s' },
      { ex: 'face-pull', dose: `${s} x 15`, rest: '30 s' },
      { ex: 'poignet', dose: '2 x 15 chaque mouvement' },
      { ex: 'sleeper-stretch', dose: '3 x 30 s' },
    ] },
    { title: 'Gainage', items: [
      { ex: 'gainage', dose: `${s} x 40 s`, rest: '20 s' },
      { ex: 'gainage-lateral', dose: `${s} x 30 s / côté`, rest: '20 s' },
      { ex: 'dead-bug', dose: `${s} x 8 / côté` },
      { ex: 'copenhague', dose: '2 x 15–20 s / côté' },
      { ex: 'equilibre', dose: '2 x 30 s / jambe' },
    ] },
  ];
  blocks.push({ title: 'Footwork hors table (10 min)', items: [
    { ex: 'pas-chasses', dose: '6 x 15 s, récup 30 s' },
    { ex: 'touche-table', dose: '4 x 20 s' },
    { ex: 'echelle', dose: '4 passages' },
    { ex: 'shadow', dose: '3 x 30 s' },
    { ex: 'plots-reaction', dose: '4 x 20 s (si partenaire)' },
  ] });
  return {
    id: 'renfoB', type: 'renfo', title: 'Renfo B : prévention et footwork',
    place: 'Maison (élastiques)', duration: 35,
    intro: 'Séance légère : elle protège l’épaule et prépare les appuis du vendredi.',
    blocks,
  };
}

function runEasy(w) {
  const min = [35, 40, 45, 30][w];
  const strides = w === 1 || w === 2;
  return {
    id: 'runEasy', type: 'run', title: `Footing endurance : ${min} min`, place: 'Extérieur', duration: min + (strides ? 5 : 0),
    intro: 'Allure conversation : tu dois pouvoir parler en phrases complètes.',
    blocks: [
      { title: 'Séance', steps: [
        `${min} min en endurance fondamentale`,
        ...(strides ? ['4 à 6 lignes droites de 20 s en accélération progressive, retour en marchant'] : []),
        '5 min d’étirements (mollets, ischios)',
      ] },
    ],
  };
}

function runQuality(w) {
  const variants = [
    { title: 'Fractionné 30/30', steps: [
      '15 min d’échauffement en footing',
      '2 séries de 8 x (30 s vite / 30 s trot)',
      '3 min de trot entre les deux séries',
      '10 min de retour au calme',
    ], note: '30 s « vite » = rapide mais relâché, environ 8/10. C’est l’effort le plus proche du ping.' },
    { title: 'Tempo 2 x 8 min', steps: [
      '15 min d’échauffement en footing',
      '2 x 8 min « confortablement difficile », 2 min de trot entre les deux',
      '10 min de retour au calme',
    ], note: 'Tempo : tu ne peux dire que quelques mots, environ 7/10.' },
    { title: 'Fractionné 6 x 2 min', steps: [
      '15 min d’échauffement en footing',
      '6 x 2 min soutenu, 1 min 30 de trot entre chaque',
      '10 min de retour au calme',
    ], note: 'Soutenu : environ 8/10, le même rythme du 1er au 6e.' },
    { title: 'Fartlek léger (semaine allégée)', steps: [
      '30 min de footing',
      'Dedans : 6 accélérations de 20 s quand tu veux',
    ], note: 'Semaine allégée : on garde du rythme sans se fatiguer.' },
  ];
  const v = variants[w];
  return {
    id: 'runQuality', type: 'run', title: v.title, place: 'Extérieur', duration: w === 3 ? 30 : 45,
    intro: v.note,
    blocks: [{ title: 'Séance', steps: v.steps }],
  };
}

function runLong(w) {
  const min = [45, 50, 55, 40][w];
  return {
    id: 'runLong', type: 'run', title: `Sortie longue facile : ${min} min`, place: 'Extérieur', duration: min, optional: true,
    intro: 'Optionnelle. Très tranquille, juste pour le plaisir et l’endurance.',
    blocks: [{ title: 'Séance', steps: [`${min} min en endurance fondamentale, nature si possible`] }],
  };
}

const PING = {
  id: 'ping', type: 'ping', title: 'Entraînement ping', place: 'Club', duration: 120,
  intro: 'Fais la mini-routine avant l’échauffement du club.',
  blocks: [ROUTINE_PING, { title: 'Après', text: 'Sleeper stretch 2 x 30 s et étirement des avant-bras.' }],
};

const MATCH = {
  id: 'match', type: 'match', title: 'Match', place: 'Club', duration: 180,
  intro: 'Bon match ! Hydrate-toi et fais l’échauffement complet.',
  blocks: [
    ROUTINE_PING,
    { title: 'Échauffement match', text: '5 min de trot ou de corde, 2 x 10 s d’accélérations sur place, puis échange à la table en montant progressivement.' },
    { title: 'Après', text: 'Retour au calme, étirements, et repos ou footing de 20 min très facile le lendemain.' },
  ],
};

const MOBILITE = {
  id: 'mobilite', type: 'rest', title: 'Repos et mobilité (optionnel)', place: 'Maison', duration: 15, optional: true,
  intro: 'Repos. Si tu as envie de bouger, 15 min de mobilité.',
  blocks: [{ title: 'Mobilité (15 min)', items: [
    { ex: 'mob-9090', dose: '2 x 8 / côté' },
    { ex: 'mob-thoracique', dose: '2 x 8 / côté' },
    { ex: 'sleeper-stretch', dose: '2 x 30 s' },
    { ex: 'etirement-mollets', dose: '30 s par position' },
  ] }],
};

// Lundi et mardi en déplacement : séances faisables sans salle.
function away(session) {
  return {
    ...session,
    place: 'En déplacement',
    intro: `${session.intro} Faisable en déplacement${session.type === 'renfo' ? ' : emporte tes élastiques' : ''}.`,
  };
}

// Semaine type. Index 0 = lundi.
// Ping fixe le vendredi ; le ping du mardi est exceptionnel (option de la semaine).
export function weekPlan(cycleWeek, hasMatch, pingTuesday = false) {
  const w = cycleWeek;
  const tuesday = pingTuesday ? PING : away(renfoB(w));
  if (hasMatch) {
    return [
      [away(runEasy(w))],
      [tuesday],
      [renfoA(w)],
      [pingTuesday ? renfoB(w) : runEasy(w)],
      [PING],
      [MOBILITE],
      [MATCH],
    ];
  }
  return [
    [away(runEasy(w))],
    [tuesday],
    [renfoA(w)],
    [pingTuesday ? renfoB(w) : MOBILITE],
    [PING],
    [runQuality(w)],
    [runLong(w), MOBILITE],
  ];
}

export const CYCLE_LABELS = [
  'Semaine 1 : mise en route',
  'Semaine 2 : progression',
  'Semaine 3 : semaine la plus chargée',
  'Semaine 4 : semaine allégée',
];
