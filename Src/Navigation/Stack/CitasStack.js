import { createStackNavigator } from "@react-navigation/stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCita from "../../../Screen/Citas/DetalleCitas";
import EditarCita from "../../../Screen/Citas/EditarCitas";
import CrearCita from "../../../Screen/Citas/CearCitas";

const Stack = createStackNavigator()

export default function CitasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListarCitas" 
        component={ListarCitas} 
        options={{ 
          title: "Gestión de Citas",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          }
        }} 
      />
      <Stack.Screen 
        name="DetalleCita" 
        component={DetalleCita} 
        options={{ 
          title: "Detalle de Cita",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }} 
      />
      <Stack.Screen 
        name="EditarCita" 
        component={EditarCita} 
        options={{ 
          title: "Editar Cita",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }} 
      />
      <Stack.Screen 
        name="CrearCita" 
        component={CrearCita} 
        options={{ 
          title: "Nueva Cita",
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#fff",
        }} 
      />
    </Stack.Navigator>
  )
}