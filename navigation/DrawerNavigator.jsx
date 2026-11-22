import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ProduitsScreen } from '../screens/ProduitsScreen';
import { ProfilScreen } from '../screens/ProfilScreen';
import { PanierScreen } from '../screens/PanierScreen';
import { couleurs } from '../screens styles/theme';

const Drawer = createDrawerNavigator();

// Le menu reçoit les props envoyées par App.js
export default function DrawerNavigator({ utilisateur, onDeconnexion }) {
  return (
    <Drawer.Navigator
      initialRouteName="Produits"
      // Couleurs du menu et de la barre du haut, reprises de theme.js
      screenOptions={{
        headerTintColor: couleurs.violetFonce,
        drawerActiveTintColor: couleurs.violet,
      }}
      // Contenu du menu : la liste des écrans, puis le bouton Déconnexion
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Déconnexion"
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            )}
            onPress={onDeconnexion}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Produits"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ProduitsScreen utilisateur={utilisateur} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="Profil"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ProfilScreen utilisateur={utilisateur} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="Mon panier"
        component={PanierScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}