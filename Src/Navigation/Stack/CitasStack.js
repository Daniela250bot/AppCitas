import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext"; 
import ListarCitas from "../../../Screen/Citas/ListarCitas";  
import DetalleCita from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";  

const Stack = createStackNavigator();

export default function CitasStack() {
  const { user, isPaciente, isMedico } = useContext(UserContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarCitas"
        component={ListarCitas}
        options={{
          title: "Gestión de Citas",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
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

      {/* Solo usuarios que no sean pacientes pueden acceder a la pantalla de edición */}
      {/* Los médicos pueden editar pero no crear citas (validación dentro del componente) */}
      {!isPaciente() && (
        <Stack.Screen
          name="EditarCitas"
          component={EditarCitas}
          options={{
            title: "Editar Cita",
            headerStyle: { backgroundColor: "#007AFF" },
            headerTintColor: "#fff",
          }}
        />
      )}
    </Stack.Navigator>
  );
}