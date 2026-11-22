import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Switch, Pressable, ScrollView,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../screens styles/InscriptionStyles';
import { couleurs } from '../screens styles/theme';
import { validerFormulaire } from '../utils/validation';
import { initDb, insererUtilisateur, listerUtilisateurs } from '../database';

const FORMULAIRE_VIDE = {
  nom: '', prenom: '', email: '', telephone: '', mdp: '', confirmation: '',
};

export const InscriptionScreen = ({ onAllerConnexion }) => {
  const [form, setForm] = useState(FORMULAIRE_VIDE);
  const [newsletter, setNewsletter] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    initDb().catch((e) => console.log('Erreur init base', e));
  }, []);

  const maj = (champ, valeur) => setForm((f) => ({ ...f, [champ]: valeur }));

  const valider = () => {
    const e = validerFormulaire(form, cgu);
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const envoyer = async () => {
    if (!valider()) return;
    try {
      await insererUtilisateur({ ...form, newsletter, cgu });
      Alert.alert('Inscription réussie', `Bienvenue ${form.prenom} ${form.nom} !`);
      // Vérification dans le terminal
      console.log(await listerUtilisateurs());
      // Remise à zéro du formulaire
      setForm(FORMULAIRE_VIDE);
      setNewsletter(false);
      setCgu(false);
      setErreurs({});
    } catch (e) {
      if (String(e.message).includes('UNIQUE')) {
        setErreurs({ email: 'Cet email est déjà utilisé' });
      } else {
        Alert.alert('Erreur', "Impossible d'enregistrer l'utilisateur");
      }
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
          <Text style={styles.titre}>Inscription</Text>
          <Text style={styles.sousTitre}>
            Découvrez nos collections et suivez vos commandes.
          </Text>

          {/* Nom et Prénom côte à côte */}
          <View style={styles.ligneDouble}>
            <View style={styles.moitie}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={[styles.champ, erreurs.nom && styles.champErreur]}
                placeholder="Dupont"
                placeholderTextColor={couleurs.placeholder}
                autoCapitalize="words"
                autoCorrect={true}
                value={form.nom}
                onChangeText={(t) => maj('nom', t)}
              />
              {erreurs.nom && <Text style={styles.erreur}>{erreurs.nom}</Text>}
            </View>

            <View style={styles.moitie}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={[styles.champ, erreurs.prenom && styles.champErreur]}
                placeholder="Gabi"
                placeholderTextColor={couleurs.placeholder}
                autoCapitalize="words"
                autoCorrect={true}
                value={form.prenom}
                onChangeText={(t) => maj('prenom', t)}
              />
              {erreurs.prenom && <Text style={styles.erreur}>{erreurs.prenom}</Text>}
            </View>
          </View>

          <View style={[styles.groupe, { marginTop: 14 }]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.champ, erreurs.email && styles.champErreur]}
              placeholder="test@gmail.com"
              placeholderTextColor={couleurs.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={form.email}
              onChangeText={(t) => maj('email', t)}
            />
            {erreurs.email && <Text style={styles.erreur}>{erreurs.email}</Text>}
          </View>

          <View style={styles.groupe}>
            <Text style={styles.label}>Téléphone (facultatif)</Text>
            <TextInput
              style={[styles.champ, erreurs.telephone && styles.champErreur]}
              placeholder="06 12 34 56 78"
              placeholderTextColor={couleurs.placeholder}
              keyboardType="phone-pad"
              value={form.telephone}
              onChangeText={(t) => maj('telephone', t)}
            />
            {erreurs.telephone && <Text style={styles.erreur}>{erreurs.telephone}</Text>}
          </View>

          <View style={styles.groupe}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={[styles.champ, erreurs.mdp && styles.champErreur]}
              placeholder="Créez votre mot de passe"
              placeholderTextColor={couleurs.placeholder}
              secureTextEntry
              value={form.mdp}
              onChangeText={(t) => maj('mdp', t)}
            />
            {erreurs.mdp && <Text style={styles.erreur}>{erreurs.mdp}</Text>}
          </View>

          <View style={styles.groupe}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <TextInput
              style={[styles.champ, erreurs.confirmation && styles.champErreur]}
              placeholder="Répétez votre mot de passe"
              placeholderTextColor={couleurs.placeholder}
              secureTextEntry
              value={form.confirmation}
              onChangeText={(t) => maj('confirmation', t)}
            />
            {erreurs.confirmation && <Text style={styles.erreur}>{erreurs.confirmation}</Text>}
          </View>

          <View style={styles.ligneSwitch}>
            <Text style={styles.libelle}>Recevoir les nouveautés mode</Text>
            <Switch
              value={newsletter}
              onValueChange={setNewsletter}
              trackColor={{ false: '#D9D3E3', true: couleurs.violetClair }}
              thumbColor={couleurs.blanc}
            />
          </View>

          <View style={styles.ligneSwitch}>
            <Text style={styles.libelle}>
              J'accepte les <Text style={styles.lien}>CGU</Text>
            </Text>
            <Switch
              value={cgu}
              onValueChange={setCgu}
              trackColor={{ false: '#D9D3E3', true: couleurs.violetClair }}
              thumbColor={couleurs.blanc}
            />
          </View>
          {erreurs.cgu && <Text style={styles.erreur}>{erreurs.cgu}</Text>}

          <Pressable
            onPress={envoyer}
            style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
          >
            <LinearGradient
              colors={['#6B2FA8', '#C79BEA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.boutonDegrade}
            >
              <Text style={styles.boutonTexte}>S'inscrire</Text>
            </LinearGradient>
          </Pressable>

          <View style={styles.separateur} />
          <Text style={styles.pied}>
            Déjà un compte ?{' '}
            <Text style={styles.lien} onPress={onAllerConnexion}>Se connecter</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};