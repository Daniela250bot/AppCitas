import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// Stacks
import AuthStack from "./src/Navigation/Stack/AuthStack";
import NavigationPrincipal from "./src/Navigation/NavigationPrincipal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Verificamos si ya hay sesión activa
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.error("❌ Error obteniendo token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Pantalla de carga
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0A74DA" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <NavigationPrincipal /> : <AuthStack />}
    </NavigationContainer>
  );
}
