import { StyleSheet } from 'react-native';
import { couleurs, polices, ombreDouce } from '../screens styles/theme';

export default StyleSheet.create({
  ecran: { flex: 1, backgroundColor: couleurs.fond },
  contenu: { flexGrow: 1 },          // le contenu peut remplir toute la hauteur de l'écran

  /*  EN-TÊTE VIOLET  */
  // paddingBottom important : la feuille blanche va "monter" sur cet espace
  entete: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 52 },
  ligneHaut: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,                // moitié de la taille : cercle
    backgroundColor: couleurs.blanc,
    alignItems: 'center',
    justifyContent: 'center',
    ...ombreDouce,
  },
  avatarTexte: { fontFamily: polices.serif, fontSize: 24, color: couleurs.violet },
  pastille: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: couleurs.blanc,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pastilleTexte: { marginLeft: 6, fontSize: 16, fontWeight: '700', color: couleurs.violetFonce },
  nom: { fontFamily: polices.serif, fontSize: 30, color: couleurs.blanc, marginTop: 16 },
  email: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 2 },

  /* BOUTONS RONDS  */
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 },
  action: { alignItems: 'center', width: 90 },
  actionRond: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: couleurs.blanc,
    alignItems: 'center',
    justifyContent: 'center',
    ...ombreDouce,
  },
  actionTexte: { color: couleurs.blanc, fontSize: 13, fontWeight: '600', marginTop: 8, textAlign: 'center' },
  actionPresse: { opacity: 0.7 },    // effet quand on appuie

  /* FEUILLE BLANCHE */
  // marginTop négatif : la feuille "remonte" sur l'en-tête, ce qui crée l'effet de coins arrondis qui se chevauchent
  feuille: {
    flex: 1,
    marginTop: -28,
    backgroundColor: couleurs.fond,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  section: { marginBottom: 24 },
  titreSection: { fontFamily: polices.serif, fontSize: 22, color: couleurs.violetFonce, marginBottom: 4 },

  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,            // trait fin sous chaque ligne
    borderBottomColor: couleurs.bordure,
  },
  lignePresse: { opacity: 0.6 },
  ligneLibelle: { flex: 1, marginLeft: 14, fontSize: 16, fontWeight: '600', color: couleurs.texte },
  ligneValeur: { maxWidth: '55%', marginLeft: 8, fontSize: 15, color: couleurs.texteDoux, textAlign: 'right' },
});