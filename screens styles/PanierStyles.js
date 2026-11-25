import { StyleSheet } from 'react-native';
import { couleurs, polices, ombreDouce } from '../screens styles/theme';

export default StyleSheet.create({
  ecran: { flex: 1, backgroundColor: couleurs.fond },
  liste: { flexGrow: 1, padding: 16 },       // flexGrow: 1 : le contenu peut remplir l'écran (message vide centré)
  separateur: { height: 12 },

  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: couleurs.blanc,
    borderRadius: 20,
    padding: 10,
    ...ombreDouce,
  },
  image: { width: 72, height: 72, borderRadius: 14, backgroundColor: couleurs.champ },
  infos: { flex: 1, marginLeft: 12 },        // prend la place entre l'image et la corbeille
  nom: { fontSize: 15, fontWeight: '600', color: couleurs.texte },
  detail: { fontSize: 13, color: couleurs.texteDoux, marginTop: 2 },
  sousTotal: { fontFamily: polices.serif, fontSize: 17, color: couleurs.violetFonce, marginTop: 4 },
  boutonRetirer: { padding: 10 },            // zone d'appui plus grande que l'icône

  vide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  videTitre: { fontFamily: polices.serif, fontSize: 22, color: couleurs.violetFonce, marginTop: 12 },
  videTexte: { fontSize: 15, color: couleurs.texteDoux, textAlign: 'center', marginTop: 6 },

  recap: {
    marginTop: 20,
    backgroundColor: couleurs.blanc,
    borderRadius: 20,
    padding: 16,
    ...ombreDouce,
  },
  ligneTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  libelleTotal: { fontSize: 15, color: couleurs.texteDoux },
  montantTotal: { fontFamily: polices.serif, fontSize: 26, color: couleurs.violetFonce },

  boutonPayer: {
    marginTop: 16,
    height: 52,
    borderRadius: 26,
    backgroundColor: couleurs.violet,
    alignItems: 'center',
    justifyContent: 'center',
    ...ombreDouce,
  },
  boutonPayerTexte: { fontFamily: polices.serif, fontSize: 22, color: couleurs.blanc },
  boutonPresse: { opacity: 0.85, transform: [{ scale: 0.98 }] },   // effet quand on appuie
});