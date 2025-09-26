import { createStackNavigator } from "@react-navigation/stack";
import ListarPacientes from "../../../Screen/Pacientes/ListarPacientes";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/EditarPaciente";
import CrearPaciente from "../../../Screen/Pacientes/CrearPaciente";

const Stack = createStackNavigator();

export default function PacientesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarPacientes"
        component={ListarPacientes}
        options={{
          title: "Gestión de Pacientes",
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
        name="DetallePaciente"
        component={DetallePaciente}
        options={{
          title: "Detalle de Paciente",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditarPaciente"
        component={EditarPaciente}
        options={{
          title: "Editar Paciente",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CrearPaciente"
        component={CrearPaciente}
        options={{
          title: "Nuevo Paciente",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
