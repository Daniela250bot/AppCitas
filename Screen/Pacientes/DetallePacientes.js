import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
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
    <ScrollView style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F1F5F9", 
    padding: 20 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
    textAlign: "right",
    maxWidth: "60%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  editButton: {
    backgroundColor: "#2563EB",
  },
  backButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "#DC2626",
    marginTop: 40,
  },
});
