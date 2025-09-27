import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidades from "../../../Screen/Especialidades/ListarEspecialidades";
import DetalleEspecialidad from "../../../Screen/Especialidades/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidades/EditarEspecialidad";
import CrearEspecialidad from "../../../Screen/Especialidades/CrearEspecialidad";

const Stack = createStackNavigator();

export default function EspecialidadesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarEspecialidades"
        component={ListarEspecialidades}
        options={{
          title: "Gestión de Especialidades",
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
        name="DetalleEspecialidad"
        component={DetalleEspecialidad}
        options={{
          title: "Detalle de Especialidad",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditarEspecialidad"
        component={EditarEspecialidad}
        options={{
          title: "Editar Especialidad",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CrearEspecialidad"
        component={CrearEspecialidad}
        options={{
          title: "Nueva Especialidad",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
