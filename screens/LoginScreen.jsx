import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../screens styles/InscriptionStyles';
import { couleurs } from '../screens styles/theme';
import { validerFormulaireLogin } from '../utils/validation';
import { initDb, verifierConnexion } from '../database';

export const LoginScreen = ({ onConnecte, onAllerInscription }) => {
  const [form, setForm] = useState({ email: '', mdp: '' });
  const [erreurs, setErreurs] = useState({});
  const [erreurGenerale, setErreurGenerale] = useState(null);

  useEffect(() => {
    initDb().catch((e) => console.log('Erreur init base', e));
  }, []);

  const maj = (champ, valeur) => setForm((f) => ({ ...f, [champ]: valeur }));

  const seConnecter = async () => {
    setErreurGenerale(null);
    const e = validerFormulaireLogin(form);
    setErreurs(e);
    if (Object.keys(e).length > 0) return;
    try {
      const utilisateur = await verifierConnexion(form.email, form.mdp);
      if (!utilisateur) {
        setErreurGenerale('Email ou mot de passe incorrect');
        return;
      }
      onConnecte(utilisateur);
    } catch (err) {
      console.log(err);
      setErreurGenerale('Connexion impossible, veuillez réessayer');
    }
  };

  return (
    <LinearGradient
      colors={['#FAF9FC', '#FAF9FC', '#B98BE0', '#A06BD0', '#EBC4F2']}
      locations={[0, 0.3, 0.5, 0.75, 1]}
      style={styles.fond}
    >
      <SafeAreaView style={styles.safeTransparent}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.contenuLogin} keyboardShouldPersistTaps="handled">
            <View>
              <Text style={styles.titre}>Ravis de vous revoir</Text>
              <Text style={styles.sousTitre}>Votre prochaine tenue vous attend.</Text>

              <View style={styles.formulaire}>
                <View style={styles.groupe}>
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
                  <Text style={styles.label}>Mot de passe</Text>
                  <TextInput
                    style={[styles.champ, erreurs.mdp && styles.champErreur]}
                    placeholder="Votre mot de passe"
                    placeholderTextColor={couleurs.placeholder}
                    secureTextEntry
                    value={form.mdp}
                    onChangeText={(t) => maj('mdp', t)}
                  />
                  {erreurs.mdp && <Text style={styles.erreur}>{erreurs.mdp}</Text>}
                </View>

                {erreurGenerale && <Text style={styles.erreur}>{erreurGenerale}</Text>}
              </View>
            </View>

            <View style={styles.bas}>
              <Pressable
                onPress={seConnecter}
                style={({ pressed }) => [styles.boutonBlanc, pressed && styles.boutonPresse]}
              >
                <Text style={styles.boutonBlancTexte}>Se connecter</Text>
              </Pressable>

              <Text style={styles.pied}>Pas encore de compte ?</Text>
              <Pressable onPress={onAllerInscription} style={styles.boutonSecondaire}>
                <Text style={styles.boutonSecondaireTexte}>Créer un compte</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};