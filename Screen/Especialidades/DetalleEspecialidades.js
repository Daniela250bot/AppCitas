import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleEspecialidad() {
  const navigation = useNavigation();
  const route = useRoute();

  const { especialidad } = route.params || {};

  if (!especialidad) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontró la información de la especialidad.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>🎓 Detalle de la Especialidad</Text>

      {/* Información de la especialidad */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>🏷️ Nombre</Text>
          <Text style={styles.value}>{especialidad.Nombre ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📝 Descripción</Text>
          <Text style={[styles.value, styles.multiLine]}>
            {especialidad.Descripcion ?? "N/A"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>👨‍⚕️ Médicos</Text>
          {especialidad.medicos && especialidad.medicos.length > 0 ? (
            especialidad.medicos.map((medico) => (
              <View key={medico.id} style={styles.medicoItem}>
                <Ionicons name="person-circle-outline" size={18} color="#2563EB" />
                <Text style={styles.medicoText}>
                  {medico.Nombre} {medico.Apellido} (ID: {medico.id})
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.value, { marginTop: 5 }]}>
              No hay médicos asignados a esta especialidad.
            </Text>
          )}
        </View>
      </View>

      {/* Botón de volver */}
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
    marginBottom: 12,
  },
  section: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#0F172A",
  },
  multiLine: {
    lineHeight: 22,
    textAlign: "justify",
  },
  medicoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  medicoText: {
    fontSize: 15,
    color: "#1E3A8A",
    marginLeft: 6,
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
