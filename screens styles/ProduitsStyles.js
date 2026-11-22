import { StyleSheet } from 'react-native';
import { couleurs, polices, ombreDouce } from '../screens styles/theme';

export default StyleSheet.create({
  /* ---------- ÉCRAN ---------- */
  ecran: { flex: 1, backgroundColor: couleurs.fond },
  centre: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  messageErreur: { color: couleurs.erreur, fontSize: 16, textAlign: 'center', marginBottom: 16 },

  /* ---------- BOUTONS ---------- */
  bouton: {
    backgroundColor: couleurs.violet,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: 'center',
    ...ombreDouce,
  },
  boutonPresse: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  boutonTexte: { color: couleurs.blanc, fontSize: 16, fontWeight: '700' },
  boutonAjout: { alignSelf: 'flex-start', marginTop: 12, paddingVertical: 10 },

  /* ---------- EN-TÊTE FIXE ---------- */
  fixe: { paddingHorizontal: 16, paddingTop: 8 },
  sousTitre: { fontSize: 14, color: couleurs.texteDoux, marginTop: 4 },
  bonjour: { fontSize: 14, color: couleurs.texte, marginTop: 4 },
  champRecherche: {
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 18,
    fontSize: 15,
    color: couleurs.texte,
    backgroundColor: couleurs.blanc,
    marginTop: 12,
    ...ombreDouce,
  },

  /* ---------- PUCES DE CATÉGORIES ---------- */
  // flexShrink: 0 = cette liste n'a pas le droit d'être écrasée en hauteur
  listePuces: { flexGrow: 0, flexShrink: 0 },
  puces: { paddingHorizontal: 16, paddingVertical: 12 },
  puce: {
    backgroundColor: couleurs.blanc,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  puceActive: { backgroundColor: couleurs.violet, borderColor: couleurs.violet },
  puceTexte: { fontSize: 14, color: couleurs.texte },
  puceTexteActive: { color: couleurs.blanc, fontWeight: '600' },

  /* ---------- GRILLE ---------- */
  liste: { paddingHorizontal: 16, paddingBottom: 24 },
  entete: { paddingVertical: 12 },
  separateur: { height: 14 },                    // espace entre deux lignes de cartes
  ligneGrille: { justifyContent: 'space-between' }, // une carte à gauche, une à droite
  vide: { textAlign: 'center', color: couleurs.texteDoux, fontSize: 16, marginTop: 40 },
  pied: { paddingVertical: 16 },

  /* ---------- CARTE PRODUIT ---------- */
  carte: {
    width: '48%',                // 2 cartes = 96 % de la largeur, les 4 % restants font l'espace entre elles
    backgroundColor: couleurs.blanc,
    borderRadius: 20,
    ...ombreDouce,
  },
  imageBloc: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,     // seuls les coins du haut sont arrondis
    borderTopRightRadius: 20,
    overflow: 'hidden',          // coupe l'image aux coins arrondis
    backgroundColor: couleurs.champ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },

  infos: { padding: 12 },
  categorie: {
    fontSize: 12,
    color: couleurs.texteDoux,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nom: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: couleurs.texte,
    marginTop: 2,
    minHeight: 40,               // réserve la place de 2 lignes : toutes les cartes ont la même hauteur
  },
  prix: { fontFamily: polices.serif, fontSize: 22, color: couleurs.violetFonce, marginTop: 8 },

  // Étiquette de stock (comme le badge de ta deuxième capture)
  etiquette: {
    alignSelf: 'flex-start',     // l'étiquette prend juste la largeur de son texte
    backgroundColor: '#E6F4EC',  // vert très clair
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  etiquetteTexte: { fontSize: 12, fontWeight: '600', color: couleurs.succes },
  etiquetteRupture: { backgroundColor: '#FCE8E6' },   // rouge très clair
  etiquetteTexteRupture: { color: couleurs.erreur },
});