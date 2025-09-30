import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuracion from "../../../Screen/Configuracion/Configuración";

const Stack = createNativeStackNavigator() ;


    export default function ConfiguracionesStack(){
        return (
            <Stack.Navigator>
                <Stack.Screen
                name="Configuracion"
                component={Configuracion}
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
}