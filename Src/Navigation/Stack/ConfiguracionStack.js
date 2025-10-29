import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuracion from "../../../Screen/Configuracion/Configuracion";
import AyudaSoporte from "../../../Screen/Configuracion/AyudaSoporte";
import ConfiguracionAdicional from "../../../Screen/Configuracion/ConfiguracionAdicional";
import Privacidad from "../../../Screen/Configuracion/Privacidad";
import PoliticaPrivacidad from "../../../Screen/Configuracion/PoliticaPrivacidad";
import TerminosServicio from "../../../Screen/Configuracion/TerminosServicio";

const Stack = createNativeStackNavigator() ;


    export default function ConfiguracionesStack(){
        return (
            <Stack.Navigator>
                <Stack.Screen
                name="Configuracion"
                component={Configuracion}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="AyudaSoporte"
                component={AyudaSoporte}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="ConfiguracionAdicional"
                component={ConfiguracionAdicional}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Privacidad"
                component={Privacidad}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="PoliticaPrivacidad"
                component={PoliticaPrivacidad}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="TerminosServicio"
                component={TerminosServicio}
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
}