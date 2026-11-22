import { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, FlatList, Pressable, ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../screens styles/ProduitsStyles';
import { couleurs } from '../screens styles/theme';
import { imagePour } from '../utils/imagesProduits';
import {
  initDb, listerProduits, compterProduits, listerCategories, insererProduit,
} from '../database';

const formaterPrix = (prix) => prix.toFixed(2).replace('.', ',') + ' €';
/*const CarteProduit = ({ produit }) => (
 <View style={styles.carte}>
    <View style={styles.carteGauche}>
        <Text style={styles.nom}>{produit.nom}</Text>
        <Text style={styles.categorie}>{produit.categorie}</Text>
    </View>
    <View>
        <Text style={styles.prix}>{formaterPrix(produit.prix)}</Text>
        <Text style={[styles.stock, produit.stock === 0 && styles.rupture]}>
        {produit.stock === 0 ? 'En rupture' : `Stock : ${produit.stock}`}
        </Text>   
    </View>
 </View>
);*/
const CarteProduit = ({ produit }) => {
  // true si l'image n'a pas pu être chargée (pas d'internet, lien cassé...)
  const [imageEnErreur, setImageEnErreur] = useState(false);
  const uri = imagePour(produit);

  return (
    <View style={styles.carte}>
      <View style={styles.imageBloc}>
        {uri && !imageEnErreur ? (
          <Image
            source={{ uri }}
            style={styles.image}
            onError={() => setImageEnErreur(true)}
          />
        ) : (
          <Ionicons name="shirt-outline" size={30} color={couleurs.violetClair} />
        )}
      </View>

      <View style={styles.carteGauche}>
        <Text style={styles.nom}>{produit.nom}</Text>
        <Text style={styles.categorie}>{produit.categorie}</Text>
      </View>

      <View style={styles.carteDroite}>
        <Text style={styles.prix}>{formaterPrix(produit.prix)}</Text>
        <Text style={[styles.stock, produit.stock === 0 && styles.rupture]}>
          {produit.stock === 0 ? 'En rupture' : `Stock : ${produit.stock}`}
        </Text>
      </View>
    </View>
  );
};
const TAILLE_PAGE = 5
const Separateur = () => <View style={styles.separateur} />;

export const ProduitsScreen = ({ utilisateur, onDeconnexion }) => {

    const [produits, setProduits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [categorie, setCategorie] = useState(null);
    const [version, setVersion] = useState(0);
    const [chargement, setChargement] = useState(true);
    const [rafraichissement, setRafraichissement] = useState(false);
    const [erreur, setErreur] = useState(null);
    const [total, setTotal] = useState(0);
    const [chargementPlus, setChargementPlus] = useState(false);
    const generation = useRef(0);

    const chargerPlus = async () => 
     {
        if (chargementPlus || produits.length >= total) return;
        const lecture = generation.current;
        setChargementPlus(true);
        try {
        const suite = await listerProduits({
        recherche, categorie, limite: TAILLE_PAGE, decalage: produits.length,
        });
        // Un rechargement a eu lieu pendant la lecture : cette page est périmée
        if (lecture !== generation.current) return;
        setProduits((actuels) => [...actuels, ...suite]);
        } catch (e) {
        console.log(e);
        } finally {
        setChargementPlus(false);
        }
      };


 useEffect(() => {
    initDb()
    .then(listerCategories)
    .then((liste) => setCategories([null, ...liste]))
    .catch(console.log);
 }, []);
 //dernière mise à jour
 /*
 useEffect(() => {
 let actuel = true;
 const lire = async () => {
 try {
 await initDb();
 const lignes = await listerProduits({ recherche, categorie });
 if (actuel) {
 setProduits(lignes);
 setErreur(null);
 }
 } catch (e) {
 console.log(e);
 if (actuel) setErreur('Impossible de charger les produits');

 } finally {
 if (actuel) {
 setChargement(false);
 setRafraichissement(false);
 }
 }
 };
 lire();
 return () => {
 actuel = false;
 };
 }, [recherche, categorie, version]);*/

useEffect(() => {
 let actuel = true;
 generation.current += 1;
 const lire = async () => {
    try {
        await initDb();
        const [lignes, nombre] = await Promise.all([
        listerProduits({ recherche, categorie, limite: TAILLE_PAGE, decalage: 0 }),
        compterProduits({ recherche, categorie }),
        ]);
        if (actuel) {
        setProduits(lignes);
        setTotal(nombre);
        setErreur(null);
    }
    } catch (e) {
    console.log(e);
    if (actuel) setErreur('Impossible de charger les produits');
    } finally {
    if (actuel) {
        setChargement(false);
        setRafraichissement(false);
        }
    }
    };
    lire();
    return () => {
    actuel = false;
    };
}, [recherche, categorie, version]);

 const recharger = () => setVersion((v) => v + 1);
 const reessayer = () => {
    setChargement(true);
    recharger();
 };
 const rafraichir = () => {
    setRafraichissement(true);
    recharger();
 };
 const ajouter = async () => {
    try {
        await insererProduit(`Nouveau produit ${Date.now() % 1000}`, 'Maison', 9.9, 5);
        recharger();
        } catch (e) {
        console.log(e);
        setErreur("Impossible d'ajouter le produit");
        }
 };
 if (chargement) {
    return (
    <SafeAreaView style={[styles.ecran, styles.centre]}>
    <ActivityIndicator size="large" color="#2563EB" />
    </SafeAreaView>
    );
 }
 if (erreur) {
    return (
    <SafeAreaView style={[styles.ecran, styles.centre]}>
    <Text style={styles.messageErreur}>{erreur}</Text>
    <Pressable
    onPress={reessayer}
    style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
    >
    <Text style={styles.boutonTexte}>Réessayer</Text>
    </Pressable>
    </SafeAreaView>
    );
 }
 const filtreActif = recherche.trim() !== '' || categorie !== null;
 return (
    <SafeAreaView style={styles.ecran}>
    <View style={styles.fixe}>
        <Text style={styles.sousTitre}>{produits.length} / {total} produit(s)</Text>
        <Text style={styles.bonjour}>Connecté : {utilisateur.prenom} {utilisateur.nom}</Text>
        <TextInput
            style={styles.champRecherche}
            placeholder="Rechercher un produit"
            placeholderTextColor={couleurs.placeholder}
            autoCorrect={false}
            value={recherche}
            onChangeText={setRecherche}
    />
    </View>

      <FlatList
         horizontal
         showsHorizontalScrollIndicator={false}
         data={categories}
         extraData={categorie}
         keyExtractor={(c) => c ?? 'toutes'}
         style={styles.listePuces}
         contentContainerStyle={styles.puces}
         keyboardShouldPersistTaps="handled"
         renderItem={({ item: c }) => (
         <Pressable
            onPress={() => setCategorie(c)}
            style={[styles.puce, categorie === c && styles.puceActive]}
            >
            <Text style={[styles.puceTexte, categorie === c && styles.puceTexteActive]}>
            {c ?? 'Toutes'}
            </Text>
         </Pressable>
         )}
         />
      <FlatList
         data={produits}
         numColumns={2}
        columnWrapperStyle={styles.ligneGrille}
         onEndReached={chargerPlus}
         onEndReachedThreshold={0.5}
         ListFooterComponent={
         chargementPlus ? <ActivityIndicator style={styles.pied} color="#2563EB" /> : null
         }
         keyExtractor={(item) => String(item.id)}
         renderItem={({ item }) => <CarteProduit produit={item} />}
         ItemSeparatorComponent={Separateur}
         ListHeaderComponent={
         <View style={styles.entete}>
         <Pressable
         onPress={ajouter}
         style={({ pressed }) => [
         styles.bouton, styles.boutonAjout, pressed && styles.boutonPresse,
         ]}
         >
         <Text style={styles.boutonTexte}>+ Ajouter un produit</Text>
         </Pressable>
         </View>
         }
         ListEmptyComponent={
         <Text style={styles.vide}>
         {filtreActif ? 'Aucun produit ne correspond' : 'Aucun produit à afficher'}
         </Text>
         }
         refreshing={rafraichissement}
         onRefresh={rafraichir}
         keyboardShouldPersistTaps="handled"
         contentContainerStyle={styles.liste}
      />
      <Text style={styles.sousTitre}>{produits.length} / {total} produit(s)</Text>
    </SafeAreaView>
 );
};