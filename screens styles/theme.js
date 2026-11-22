// theme.js
// Toutes les couleurs et ombres de l'app. Pour changer le violet partout,
// on ne modifie que ce fichier.

export const couleurs = {
  fond: '#FAF9FC',          // fond des écrans (blanc légèrement violet)
  violetFonce: '#3B0A5C',   // titres
  violet: '#6B2FA8',        // liens, éléments actifs
  violetClair: '#B98BE0',   // fin du dégradé, interrupteurs
  texte: '#3B2A4D',         // texte courant
  texteDoux: '#6E6280',     // sous-titres, textes secondaires
  placeholder: '#9A90A8',   // texte d'exemple dans les champs
  champ: '#F4F1F8',         // fond des champs
  bordure: '#E4DDEE',       // petits traits de séparation
  erreur: '#C0392B',
  blanc: '#FFFFFF',
    succes: '#2F7D5B',        // stock disponible (vert)
};

export const polices = {
  serif: 'PlayfairDisplay_600SemiBold', // doit être le nom chargé dans useFonts
};

// Ombre douce des champs et boutons de la maquette.
// iOS utilise les propriétés "shadow...", Android utilise "elevation" :
// il faut donc les deux pour avoir un rendu proche sur les deux systèmes.
export const ombreDouce = {
  shadowColor: '#6B2FA8',
  shadowOpacity: 0.15,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
};