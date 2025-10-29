import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../Contexts/UserContext";
import InicioStack from "./Stack/InicioStack";
import PerfilesStack from "./Stack/PerfilStack";
import ConfiguracionesStack from "./Stack/ConfiguracionStack";
import CitasStack from "./Stack/CitasStack";
import PacientesStack from "./Stack/PacientesStack";
import MedicosStack from "./Stack/MedicosStack";
import RecepcionistasStack from "./Stack/RecepcionistasStack";
import EspecialidadesStack from "./Stack/EspecialidadesStack";
import ConsultoriosStack from "./Stack/ConsultoriosStack";


const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  const { user } = useUser();

  const getTabsForRole = (role) => {
    const baseTabs = [
      {
        name: "Inicio",
        component: InicioStack,
        icon: "home",
        label: "Inicio",
      },
      {
        name: "Perfil",
        component: PerfilesStack,
        icon: "person-circle-outline",
        label: "Perfil",
      },
      {
        name: "Configuración",
        component: ConfiguracionesStack,
        icon: "settings-outline",
        label: "Configuración",
      },
    ];

    if (role === "Administrador") {
      return [
        ...baseTabs,
        {
          name: "Citas",
          component: CitasStack,
          icon: "calendar-outline",
          label: "Citas",
        },
        {
          name: "Pacientes",
          component: PacientesStack,
          icon: "people-outline",
          label: "Pacientes",
        },
        {
          name: "Médicos",
          component: MedicosStack,
          icon: "medkit-outline",
          label: "Médicos",
        },
        {
          name: "Consultorios",
          component: ConsultoriosStack,
          icon: "business-outline",
          label: "Consultorios",
        },
      ];
    } else if (role === "Recepcionista") {
      return [
        ...baseTabs,
        {
          name: "Citas",
          component: CitasStack,
          icon: "calendar-outline",
          label: "Citas",
        },
        {
          name: "Pacientes",
          component: PacientesStack,
          icon: "people-outline",
          label: "Pacientes",
        },
        {
          name: "Médicos",
          component: MedicosStack,
          icon: "medkit-outline",
          label: "Médicos",
        },
        {
          name: "Consultorios",
          component: ConsultoriosStack,
          icon: "business-outline",
          label: "Consultorios",
        },
      ];
    } else {
      // Médico, Paciente y otros
      return [
        ...baseTabs,
        {
          name: "Citas",
          component: CitasStack,
          icon: "calendar-outline",
          label: "Citas",
        },
      ];
    }
  };

  const tabs = getTabsForRole(user?.role);
  console.log('NavegationPrincipal: User role:', user?.role);
  console.log('NavegationPrincipal: Tabs for role:', tabs.map(tab => tab.name));
  return (
    <Tab.Navigator
      screenOptions={{
        
        tabBarStyle: {
          backgroundColor: "#fefefe",
          borderTopColor: "#eee",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
   
        tabBarActiveTintColor: "#0A74DA",
        tabBarInactiveTintColor: "#555",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginTop: 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}