import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import InicioStack from "./Stack/InicioStack";
import PerfilesStack from "./Stack/PerfilStack";
import ConfiguracionesStack from "./Stack/ConfiguracionStack";


const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Estilos para la barra de pestañas en general
        tabBarStyle: {
          backgroundColor: "#fefefe",
          borderTopColor: "#eee",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        // colores de los iconos y texto de la pestaña
        tabBarActiveTintColor: "#0A74DA",
        tabBarInactiveTintColor: "#555",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Inicio",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: "Perfil",
        }}
      />

      <Tab.Screen
        name="Configuración"
        component={ConfiguracionesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: "Configuración",
        }}
      />
      
    </Tab.Navigator>
  );
}