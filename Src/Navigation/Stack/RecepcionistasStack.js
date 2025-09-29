import { createStackNavigator } from "@react-navigation/stack";
import ListarRecepcionistas from "../../../Screen/Recepcionistas/ListarRecepcionistas";
import DetalleRecepcionistas from "../../../Screen/Recepcionistas/DetalleRecepcionistas";
import EditarRecepcionistas from "../../../Screen/Recepcionistas/EditarRecepcionistas";

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
        component={DetalleRecepcionistas}
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
        component={EditarRecepcionistas}
        options={{
          title: "Editar Recepcionista",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
