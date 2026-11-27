export const formaterPrix = (prix) => prix.toFixed(2).replace('.', ',') + ' €';

// SQLite renvoie la date sous la forme '2026-11-24 15:31:21' : transformer en '24/11/2026'
export const formaterDate = (texte) => {
  if (!texte) return 'Non disponible';
  const [annee, mois, jour] = texte.slice(0, 10).split('-');
  return `${jour}/${mois}/${annee}`;
};