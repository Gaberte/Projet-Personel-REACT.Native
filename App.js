import 'react-native-gesture-handler';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { AccueilScreen } from './screens/AccueilScreen';
import { LoginScreen } from './screens/LoginScreen';
import { InscriptionScreen } from './screens/InscriptionScreen';
import DrawerNavigator from './navigation/DrawerNavigator';
import { usePanier } from './hooksPersonnalisés/Panier';

export default function App() {
  const [ecran, setEcran] = useState('accueil');
  const [utilisateur, setUtilisateur] = useState(null);
  const panier = usePanier(); // le panier vit ici, tant que l'app est ouverte

  // Les hooks (dont usePanier) doivent tous être appelés AVANT ce return conditionnel
  const [policesChargees] = useFonts({ PlayfairDisplay_600SemiBold });
  if (!policesChargees) return null;

  // À la déconnexion : on vide le panier, puis on oublie l'utilisateur
  const deconnecter = () => {
    panier.vider();
    setUtilisateur(null);
  };

  if (utilisateur) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <DrawerNavigator
            utilisateur={utilisateur}
            onDeconnexion={deconnecter}
            panier={panier}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

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