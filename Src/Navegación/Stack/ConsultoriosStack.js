import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorios from "../../../Screen/Consultorios/ListarConsultorios";
import DetalleConsultorio from "../../../Screen/Consultorios/DetalleConsultorio";
import EditarConsultorio from "../../../Screen/Consultorios/EditarConsultorio";
import CrearConsultorio from "../../../Screen/Consultorios/CrearConsultorio";

const Stack = createStackNavigator();

export default function ConsultoriosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarConsultorios"
        component={ListarConsultorios}
        options={{
          title: "Gestión de Consultorios",
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
        name="DetalleConsultorio"
        component={DetalleConsultorio}
        options={{
          title: "Detalle de Consultorio",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditarConsultorio"
        component={EditarConsultorio}
        options={{
          title: "Editar Consultorio",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CrearConsultorio"
        component={CrearConsultorio}
        options={{
          title: "Nuevo Consultorio",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
