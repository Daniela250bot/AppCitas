import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCita from "../../../Screen/Citas/DetalleCitas";
import EditarCita from "../../../Screen/Citas/EditarCitas";

const Stack = createStackNavigator();

export default function CitasStack() {
  const { isAdmin } = useContext(UserContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarCitas"
        component={ListarCitas}
        options={{
          title: "Gestión de Citas",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" }
        }}
      />

      <Stack.Screen
        name="DetalleCita"
        component={DetalleCita}
        options={{
          title: "Detalle de Cita",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
        }}
      />

      {isAdmin() && (
        <Stack.Screen
          name="EditarCitas"
          component={EditarCita}
          options={{
            title: "Editar Cita",
            headerStyle: { backgroundColor: "#007AFF" },
            headerTintColor: "#fff",
          }}
        />
      )}
    </Stack.Navigator>
  )
}
