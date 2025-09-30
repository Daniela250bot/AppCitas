import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedico from "../../../Screen/Medicos/DetalleMedicos";
import EditarMedico from "../../../Screen/Medicos/EditarMedicos";

const Stack = createStackNavigator();

export default function MedicosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarMedicos"
        component={ListarMedicos}
        options={{
          title: "Gestión de Médicos",
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
        name="DetalleMedico"
        component={DetalleMedico}
        options={{
          title: "Detalle de Médico",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditarMedicos"
        component={EditarMedico}
        options={{
          title: "Editar Médico",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
     
    </Stack.Navigator>
  );
}
