import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../screens styles/InscriptionStyles';

export const AccueilScreen = ({ onCreerCompte, onSeConnecter }) => {
  return (
    // Le dégradé est le fond de tout l'écran. "locations" indique à quelle
    // hauteur (0 = haut, 1 = bas) chaque couleur doit être atteinte.
    <LinearGradient
      colors={['#F7F3FB', '#A77BD4', '#8A52C0', '#D9A8EA', '#FBF6FD']}
      locations={[0, 0.3, 0.55, 0.8, 1]}
      style={styles.fond}
    >
      <View style={styles.vagueHaut} />
      <View style={styles.vagueBas} />

      <SafeAreaView style={styles.contenu}>
        {/* Partie haute : logo + slogan */}
        <View style={styles.haut}>
          <View style={styles.cercleLogo}>
            <Text style={styles.logo}>HOUSE{'\n'}OF{'\n'}CLOTHES</Text>
          </View>
          <Text style={styles.slogan}>
            Affirmez votre style,{'\n'}trouvez vos coups de cœur.
          </Text>
        </View>

        {/* Partie basse : bouton + lien */}
        <View style={styles.bas}>
          <Pressable
            onPress={onCreerCompte}
            style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
          >
            <Text style={styles.boutonTexte}>Créer un compte</Text>
          </Pressable>

          <Text style={styles.pied}>
            Déjà un compte ?{' '}
            <Text style={styles.lien} onPress={onSeConnecter}>Se connecter</Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};