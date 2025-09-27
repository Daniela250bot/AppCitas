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

      {/* Información del paciente */}
      <View style={styles.card}>
        <Text style={styles.label}>👤 Nombre:</Text>
        <Text style={styles.value}>{paciente.Nombre}</Text>

        <Text style={styles.label}>👤 Apellido:</Text>
        <Text style={styles.value}>{paciente.Apellido}</Text>

        <Text style={styles.label}>🆔 Documento:</Text>
        <Text style={styles.value}>{paciente.Documento}</Text>

        <Text style={styles.label}>📞 Teléfono:</Text>
        <Text style={styles.value}>{paciente.Telefono}</Text>

        <Text style={styles.label}>✉️ Correo:</Text>
        <Text style={styles.value}>{paciente.Email}</Text>

        <Text style={styles.label}>🎂 Fecha de Nacimiento:</Text>
        <Text style={styles.value}>{paciente.FechaNacimiento}</Text>

        <Text style={styles.label}>⚧ Género:</Text>
        <Text style={styles.value}>{paciente.Genero}</Text>

        <Text style={styles.label}>🩸 RH:</Text>
        <Text style={styles.value}>{paciente.Rh}</Text>

        <Text style={styles.label}>🌍 Nacionalidad:</Text>
        <Text style={styles.value}>{paciente.Nacionalidad}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditarPaciente", { paciente })}
      >
        <Ionicons name="create-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Editar Paciente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF4444" }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 20 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#110e0eff",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 500,
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 40,
  },
});
