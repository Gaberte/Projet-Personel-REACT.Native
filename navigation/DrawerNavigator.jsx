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

export default function DrawerNavigator({ utilisateur, onDeconnexion }) {
  return (
    <Drawer.Navigator
      initialRouteName="Produits"
      screenOptions={{
        headerTintColor: couleurs.violetFonce,
        drawerActiveTintColor: couleurs.violet,
      }}
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
      {/* Produits*/}
      <Drawer.Screen
        name="Produits"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" size={size} color={color} />
          ),
        }}
      >
        {({ navigation }) => (
          <ProduitsScreen utilisateur={utilisateur} navigation={navigation} />
        )}
      </Drawer.Screen>

      {/* Profil*/}
      <Drawer.Screen
        name="Profil"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      >
        {({ navigation }) => (
          <ProfilScreen
            utilisateur={utilisateur}
            navigation={navigation}
            onDeconnexion={onDeconnexion}
          />
        )}
      </Drawer.Screen>

      {/* Panier*/}
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