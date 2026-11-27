import { StyleSheet } from 'react-native';
import { couleurs, polices, ombreDouce } from '../screens styles/theme';

export default StyleSheet.create({
  /* ---------- STYLES COMMUNS (utilisés par plusieurs écrans) ---------- */
  fond: { flex: 1 },                       // fond en dégradé (accueil et connexion)

  titre: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    color: couleurs.violetFonce,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sousTitre: {
    fontSize: 15,
    lineHeight: 21,
    color: couleurs.texteDoux,
    marginTop: 8,
    marginBottom: 20,
  },

  groupe: { marginBottom: 14 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: couleurs.texte,
    marginBottom: 6,
    marginLeft: 4,
  },
  champ: {
    height: 46,
    borderRadius: 23,                      // moitié de la hauteur = bords totalement arrondis
    paddingHorizontal: 18,
    fontSize: 15,
    color: couleurs.texte,
    backgroundColor: couleurs.champ,
    ...ombreDouce,                         // copie ici toutes les propriétés de l'ombre
  },
  champErreur: { borderWidth: 1.5, borderColor: couleurs.erreur },
  erreur: { color: couleurs.erreur, fontSize: 12, marginTop: 4, marginLeft: 8 },

  bas: { alignItems: 'center', marginTop: 32 },
  pied: { textAlign: 'center', marginTop: 22, fontSize: 15, color: couleurs.texte },
  lien: { color: couleurs.violet, fontWeight: '700' },
  souligne: { textDecorationLine: 'underline' },     // à combiner avec "lien" pour les CGU

  boutonPresse: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  // Bouton blanc (accueil et connexion)
  boutonBlanc: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: couleurs.blanc,
    alignItems: 'center',
    justifyContent: 'center',
    ...ombreDouce,
  },
  boutonBlancTexte: { fontFamily: polices.serif, fontSize: 24, color: couleurs.violetFonce },

  /*  Inscription */
  safe: { flex: 1, backgroundColor: couleurs.fond },
  contenu: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },

  ligneDouble: { flexDirection: 'row', gap: 12 },  // Nom et Prénom côte à côte
  moitie: { flex: 1 },

  ligneSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  libelle: { fontSize: 15, color: couleurs.texte, flexShrink: 1, paddingRight: 12 },

  bouton: {
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',                    // coupe le dégradé aux coins arrondis
    marginTop: 18,
    ...ombreDouce,
  },
  boutonDegrade: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  boutonTexte: { fontFamily: polices.serif, fontSize: 30, color: couleurs.blanc },
  separateur: { height: 1, backgroundColor: couleurs.bordure, marginTop: 24 },

  
  safeTransparent: { flex: 1 },            // transparent : on voit le dégradé derrière
  contenuLogin: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  formulaire: { marginTop: 20 },
  boutonSecondaire: {
    marginTop: 10,
    height: 44,
    paddingHorizontal: 40,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: couleurs.violet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boutonSecondaireTexte: { color: couleurs.violet, fontWeight: '700', fontSize: 16 },

  /* ACCUEIL */
  contenuAccueil: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  vagueHaut: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 520,
    height: 520,
    borderRadius: 260,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  vagueBas: {
    position: 'absolute',
    bottom: 120,
    right: -140,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: 'rgba(107,47,168,0.18)',
  },
  haut: { alignItems: 'center', marginTop: 60 },
  cercleLogo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: polices.serif,
    fontSize: 38,
    lineHeight: 42,
    color: couleurs.blanc,
    textAlign: 'center',
    letterSpacing: 1,
  },
  slogan: {
    marginTop: 32,
    fontSize: 20,
    lineHeight: 28,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '300',
  },
});