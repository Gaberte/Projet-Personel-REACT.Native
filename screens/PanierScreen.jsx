import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../screens styles/PanierStyles';
import { couleurs } from '../screens styles/theme';
import { formaterPrix } from '../utils/Formatage';
import { imagePour } from '../utils/imagesProduits';

const Separateur = () => <View style={styles.separateur} />;

export const PanierScreen = ({ panier }) => {
  const { lignes, total, nombreArticles, retirer } = panier;

  return (
    <SafeAreaView style={styles.ecran} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={lignes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.liste}
        ItemSeparatorComponent={Separateur}
        renderItem={({ item }) => (
          <View style={styles.ligne}>
            <Image source={{ uri: imagePour(item) }} style={styles.image} />
            <View style={styles.infos}>
              <Text style={styles.nom} numberOfLines={2}>{item.nom}</Text>
              <Text style={styles.detail}>
                {formaterPrix(item.prix)} × {item.quantite}
              </Text>
              <Text style={styles.sousTotal}>{formaterPrix(item.prix * item.quantite)}</Text>
            </View>
            <Pressable onPress={() => retirer(item.id)} style={styles.boutonRetirer}>
              <Ionicons name="trash-outline" size={22} color={couleurs.erreur} />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vide}>
            <Ionicons name="cart-outline" size={56} color={couleurs.violetClair} />
            <Text style={styles.videTitre}>Votre panier est vide</Text>
            <Text style={styles.videTexte}>Ajoutez des produits avec le bouton + de la liste.</Text>
          </View>
        }
        ListFooterComponent={
          lignes.length > 0 ? (
            <View style={styles.recap}>
              <View style={styles.ligneTotal}>
                <Text style={styles.libelleTotal}>
                  Total ({nombreArticles} article{nombreArticles > 1 ? 's' : ''})
                </Text>
                <Text style={styles.montantTotal}>{formaterPrix(total)}</Text>
              </View>

              {/* Bouton non fonctionnel : onPress vide, mais l'effet "pressed" marche */}
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [styles.boutonPayer, pressed && styles.boutonPresse]}
              >
                <Text style={styles.boutonPayerTexte}>Payer</Text>
              </Pressable>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};