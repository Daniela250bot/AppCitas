import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfiles/Perfil";

const Stack = createStackNavigator();

export default function PerfilesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007AFF", // Azul iOS
          shadowColor: "transparent", // quita sombra en iOS
          elevation: 0, // quita sombra en Android
        },
        headerTintColor: "#fff", // Color de texto y botones
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          letterSpacing: 1, // espaciado entre letras
        },
        headerTitleAlign: "center", // título centrado
      }}
    >
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "👤 Mi Perfil", // puedes poner un emoji o icono
        }}
      />
    </Stack.Navigator>
  );
}
