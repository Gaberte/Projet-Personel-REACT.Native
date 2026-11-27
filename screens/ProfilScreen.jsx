import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../screens styles/ProfilStyles';
import { couleurs } from '../screens styles/theme';
import { usePanierContext } from '../utils/PanierContext';
import { formaterPrix, formaterDate } from '../utils/Formatage';

// Petit bouton rond du haut (icône + texte dessous)
const Action = ({ icone, texte, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.action, pressed && styles.actionPresse]}
  >
    <View style={styles.actionRond}>
      <Ionicons name={icone} size={26} color={couleurs.violet} />
    </View>
    <Text style={styles.actionTexte}>{texte}</Text>
  </Pressable>
);

// Une ligne de la feuille blanche : icône, libellé, valeur facultative,
// et une flèche si la ligne est cliquable 
const Ligne = ({ icone, libelle, valeur, onPress }) => (
  <Pressable
    onPress={onPress}
    disabled={!onPress}
    style={({ pressed }) => [styles.ligne, pressed && styles.lignePresse]}
  >
    <Ionicons name={icone} size={24} color={couleurs.violet} />
    <Text style={styles.ligneLibelle}>{libelle}</Text>
    {valeur !== undefined && (
      <Text style={styles.ligneValeur} numberOfLines={1}>{valeur}</Text>
    )}
    {onPress && <Ionicons name="chevron-forward" size={20} color={couleurs.texteDoux} />}
  </Pressable>
);

export const ProfilScreen = ({ utilisateur, navigation, onDeconnexion }) => {
  // useContext (via notre hook) : on lit le panier sans qu'on nous le passe en prop
  const { nombreArticles, total } = usePanierContext();

  // Initiales pour l'avatar : première lettre du prénom + première lettre du nom
  const initiales = (utilisateur.prenom.charAt(0) + utilisateur.nom.charAt(0)).toUpperCase();

  return (
    <SafeAreaView style={styles.ecran} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenu}>
        {/*en tête violet */}
        <LinearGradient
          colors={['#6B2FA8', '#B98BE0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.entete}
        >
          <View style={styles.ligneHaut}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexte}>{initiales}</Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate('Mon panier')}
              style={({ pressed }) => [styles.pastille, pressed && styles.actionPresse]}
            >
              <Ionicons name="cart" size={18} color={couleurs.violet} />
              <Text style={styles.pastilleTexte}>{nombreArticles}</Text>
            </Pressable>
          </View>

          <Text style={styles.nom}>{utilisateur.prenom} {utilisateur.nom}</Text>
          <Text style={styles.email}>{utilisateur.email}</Text>

          <View style={styles.actions}>
            <Action
              icone="cart-outline"
              texte="Mon panier"
              onPress={() => navigation.navigate('Mon panier')}
            />
            <Action
              icone="shirt-outline"
              texte="Produits"
              onPress={() => navigation.navigate('Produits')}
            />
            <Action icone="log-out-outline" texte="Déconnexion" onPress={onDeconnexion} />
          </View>
        </LinearGradient>

        {/*FEUILLE BLANCHE*/}
        <View style={styles.feuille}>
          <View style={styles.section}>
            <Text style={styles.titreSection}>Mon panier</Text>
            <Ligne icone="bag-outline" libelle="Articles" valeur={nombreArticles} />
            <Ligne icone="cash-outline" libelle="Total" valeur={formaterPrix(total)} />
            <Ligne
              icone="cart-outline"
              libelle="Voir mon panier"
              onPress={() => navigation.navigate('Mon panier')}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.titreSection}>Mes informations</Text>
            <Ligne icone="person-outline" libelle="Nom" valeur={utilisateur.nom} />
            <Ligne icone="person-outline" libelle="Prénom" valeur={utilisateur.prenom} />
            <Ligne icone="mail-outline" libelle="Email" valeur={utilisateur.email} />
            <Ligne
              icone="call-outline"
              libelle="Téléphone"
              valeur={utilisateur.telephone || 'Non renseigné'}
            />
            <Ligne
              icone="notifications-outline"
              libelle="Newsletter"
              valeur={utilisateur.newsletter ? 'Oui' : 'Non'}
            />
            <Ligne
              icone="calendar-outline"
              libelle="Membre depuis"
              valeur={formaterDate(utilisateur.cree_le)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};