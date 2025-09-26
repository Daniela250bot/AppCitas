import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../Screens/Perfil/Perfil";
import EditarPerfil from "../Screens/Perfil/EditarPerfil";
import CambiarContraseña from "../Screens/Perfil/CambiarContraseña";

const Stack = createStackNavigator();

export default function PerfilesStack() {
    return (
        <Stack.Navigator
            initialRouteName="Perfil"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1E90FF",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ title: "Mi Perfil" }}
            />

            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{ title: "Editar Perfil" }}
            />

            <Stack.Screen
                name="CambiarContraseña"
                component={CambiarContraseña}
                options={{ title: "Cambiar Contraseña" }}
            />
        </Stack.Navigator>
    );
}
