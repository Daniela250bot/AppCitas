import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screen/Auth/Login";
import Registro from "../../Screen/Auth/Registro";
import RegistroRecepcionista from "../../Screen/Auth/RegistroRecepcionista";
import RecuperarPassword from "../../Screen/Auth/RecuperarPassword";
import RestablecerPassword from "../../Screen/Auth/RestablecerPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavegation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Iniciar Sesion'}}
           />

            <Stack.Screen
                name="Registro"
                component={Registro}
                options={{ title: 'Registro de Usuarios'}}
           />
            <Stack.Screen
                name="RecuperarPassword"
                component={RecuperarPassword}
                options={{ title: 'Recuperar Contraseña' }}
           />
            <Stack.Screen
                name="RestablecerPassword"
                component={RestablecerPassword}
                options={{ title: 'Restablecer Contraseña' }}
            />
            <Stack.Screen
                name="RegistroRecepcionista"
                component={RegistroRecepcionista}
                options={{ title: 'Registro de Recepcionista' }}
            />
        </Stack.Navigator>
    )
}