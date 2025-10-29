import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DetallePaciente() {
  const navigation = useNavigation();
  const route = useRoute();

  const { paciente } = route.params || {};

  if (!paciente) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontró la información del paciente.
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/foto-gratis/fondo-difuminado-clinica-hospital-interior-vacio_103324-627.jpg",
      }}
      style={styles.container}
      blurRadius={3}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>🧑‍⚕️ Detalle del Paciente</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>👤 Nombre</Text>
            <Text style={styles.value}>{paciente.Nombre ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>👤 Apellido</Text>
            <Text style={styles.value}>{paciente.Apellido ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🆔 Documento</Text>
            <Text style={styles.value}>{paciente.Documento ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>📞 Teléfono</Text>
            <Text style={styles.value}>{paciente.Telefono ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>✉️ Correo</Text>
            <Text style={styles.value}>{paciente.Email ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🎂 Fecha de Nacimiento</Text>
            <Text style={styles.value}>{paciente.Fecha_nacimiento ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>⚧ Género</Text>
            <Text style={styles.value}>{paciente.Genero ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🩸 RH</Text>
            <Text style={styles.value}>{paciente.Rh ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🌍 Nacionalidad</Text>
            <Text style={styles.value}>{paciente.Nacionalidad ?? "N/A"}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("EditarPaciente", { paciente })}
        >
          <Ionicons name="create-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Editar Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0369A1",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 0.5,
    textShadowColor: "#E0F2FE",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0369A1",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
    maxWidth: "60%",
    textAlign: "right",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  editButton: {
    backgroundColor: "#0284C7",
  },
  backButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "#DC2626",
    marginTop: 50,
    fontWeight: "600",
  },
});
