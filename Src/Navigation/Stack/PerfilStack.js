import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfiles/Perfil";

const Stack = createStackNavigator();

export default function PerfilesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007AFF", 
          shadowColor: "transparent", 
          elevation: 0,
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          letterSpacing: 1,
        },
        headerTitleAlign: "center", 
      }}
    >
      <Stack.Screen
        name="MiPerfil"
        component={Perfil}
        options={{
          title: "👤 Mi Perfil", 
        }}
      />
    </Stack.Navigator>
  );
}
