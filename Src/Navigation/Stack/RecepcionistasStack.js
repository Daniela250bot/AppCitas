import { createStackNavigator } from "@react-navigation/stack";
import ListarRecepcionistas from "../../../Screen/Recepcionistas/ListarRecepcionistas";
import DetalleRecepcionista from "../../../Screen/Recepcionistas/DetalleRecepcionista";
import EditarRecepcionista from "../../../Screen/Recepcionistas/EditarRecepcionista";
import CrearRecepcionista from "../../../Screen/Recepcionistas/CrearRecepcionista";

const Stack = createStackNavigator();

export default function RecepcionistasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarRecepcionistas"
        component={ListarRecepcionistas}
        options={{
          title: "Gestión de Recepcionistas",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="DetalleRecepcionista"
        component={DetalleRecepcionista}
        options={{
          title: "Detalle de Recepcionista",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditarRecepcionista"
        component={EditarRecepcionista}
        options={{
          title: "Editar Recepcionista",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CrearRecepcionista"
        component={CrearRecepcionista}
        options={{
          title: "Nuevo Recepcionista",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
