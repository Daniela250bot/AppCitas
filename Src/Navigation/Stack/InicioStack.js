import { createNativeStackNavigator }   from "@react-navigation/native-stack";
import Inicio from "../../../Screen/Inicio/Inicio";
import CitasStack from "./CitasStack";
import ConfiguracionesStack from "./ConfiguracionStack";
import ConsultoriosStack from "./ConsultoriosStack";
import EspecialidadesStack from "./EspecialidadesStack";
import MedicosStack from "./MedicosStack";
import PacientesStack from "./PacientesStack";
import PerfilesStack from "./PerfilStack"
import RecepcionistasStack from "./RecepcionistasStack"

const Stack = createNativeStackNavigator();
export default function InicioStack() {
    return (
         <Stack.Navigator> 
                    <Stack.Screen
                    name="InicioPantalla"
                    component= {Inicio}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="CitasFlow"
                    component= {CitasStack}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="ConfiguracionFlow"
                    component= {ConfiguracionesStack}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="ConsultoriosFlow"
                    component= {ConsultoriosStack}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="EspecialidadesFlow"
                    component= {EspecialidadesStack}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="MedicosFlow"
                    component= {MedicosStack}
                    options={{ headerShown: false }}
                    />
                     <Stack.Screen
                    name="PacientesFlow"
                    component= {PacientesStack}
                    options={{ headerShown: false }}
                    />
                     <Stack.Screen
                    name="PerfilesFlow"
                    component= {PerfilesStack}
                    options={{ headerShown: false }}
                    />
                     <Stack.Screen
                    name="RecepcionistasFlow"
                    component= {RecepcionistasStack}
                    options={{ headerShown: false }}
                    />
                </Stack.Navigator>
    )
}