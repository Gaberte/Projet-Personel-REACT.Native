import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { AccueilScreen } from './screens/AccueilScreen';
import { LoginScreen } from './screens/LoginScreen';
import { InscriptionScreen } from './screens/InscriptionScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  // L'écran de départ est maintenant 'accueil' (avant : 'login').
  const [ecran, setEcran] = useState('accueil');
  const [utilisateur, setUtilisateur] = useState(null);

  // Chargement de la police. IMPORTANT : ce hook doit être appelé AVANT tout
  // "return" conditionnel. React exige que les hooks soient appelés dans le même
  // ordre à chaque affichage ; si on les place après un "if (...) return", ils ne
  // seraient pas toujours exécutés et React afficherait une erreur.
  const [policesChargees] = useFonts({ PlayfairDisplay_600SemiBold });
  if (!policesChargees) return null; // on attend que la police soit prête

  // Utilisateur connecté : liste des produits (inchangé)
  
  if (utilisateur) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <DrawerNavigator
            utilisateur={utilisateur}
            onDeconnexion={() => setUtilisateur(null)}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  // Personne n'est connecté : accueil, connexion ou inscription.
  // Chaque écran reçoit des fonctions (props) pour demander à App de changer d'écran.
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        {ecran === 'accueil' && (
          <AccueilScreen
            onCreerCompte={() => setEcran('inscription')}
            onSeConnecter={() => setEcran('login')}
          />
        )}
        {ecran === 'login' && (
          <LoginScreen
            onConnecte={setUtilisateur}
            onAllerInscription={() => setEcran('inscription')}
          />
        )}
        {ecran === 'inscription' && (
          <InscriptionScreen onAllerConnexion={() => setEcran('login')} />
        )}
      </View>
    </SafeAreaProvider>
  );
}