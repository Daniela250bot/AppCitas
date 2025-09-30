import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegation";
import NavegacionPrincipal from "./NavegationPrincipal";
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../Contexts/UserContext";

export default function AppNavegacion() {
  const { user, loading } = useUser(); 

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <Ionicons name="medkit-outline" size={64} color="#FFFFFF" />
        <Text style={styles.title}>Clínica Salud+</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />
        <Text style={styles.subtitle}>Cargando tu sesión...</Text>
      </View>
    );
  }

  console.log("AppNavigation: user is:", user);

  return (
    <NavigationContainer>
      {user ? <NavegacionPrincipal /> : <AuthNavegacion />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#E5E7EB",
    marginTop: 10,
  },
});
