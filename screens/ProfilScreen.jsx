import { View, Text } from 'react-native';
import styles from '../screens styles/InscriptionStyles';

export const ProfilScreen = ({ utilisateur }) => {
  return (
    <View style={styles.pageVide}>
      <Text style={styles.pageVideTexte}>
        {utilisateur.prenom} {utilisateur.nom}
      </Text>
      <Text style={styles.pageVideTexte}>{utilisateur.email}</Text>
    </View>
  );
};