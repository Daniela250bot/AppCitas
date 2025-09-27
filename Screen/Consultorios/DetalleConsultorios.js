import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleConsultorio() {
  const navigation = useNavigation();
  const route = useRoute();

  const { consultorio } = route.params || {};

  if (!consultorio) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontró la información del consultorio.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>🏥 Detalle del Consultorio</Text>

      {/* Información del consultorio */}
      <View style={styles.card}>
        <Text style={styles.label}>🏷️ Nombre:</Text>
        <Text style={styles.value}>{consultorio.Nombre}</Text>

        <Text style={styles.label}>📍 Ubicación:</Text>
        <Text style={styles.value}>{consultorio.Ubicacion}</Text>

        <Text style={styles.label}>🏢 Piso:</Text>
        <Text style={styles.value}>{consultorio.Piso}</Text>

        <Text style={styles.label}>☎️ Teléfono:</Text>
        <Text style={styles.value}>{consultorio.Telefono}</Text>

        <Text style={styles.label}>🔢 Capacidad:</Text>
        <Text style={styles.value}>{consultorio.Capacidad}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("EditarConsultorio", { consultorio })
        }
      >
        <Ionicons name="create-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Editar Consultorio</Text>
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
