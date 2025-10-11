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
        <Text style={styles.label}>🏷️ Nombre:</Text>
        <Text style={styles.value}>{especialidad.Nombre}</Text>

        <Text style={styles.label}>📝 Descripción:</Text>
        <Text style={styles.value}>{especialidad.Descripcion}</Text>

        <Text style={styles.label}>👨‍⚕️ Médicos:</Text>
        {especialidad.medicos && especialidad.medicos.length > 0 ? (
          especialidad.medicos.map((medico) => (
            <View key={medico.id} style={styles.medicoItem}>
              <Text style={styles.medicoText}>ID: {medico.id} - Nombre: {medico.Nombre} {medico.Apellido}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.value}>No hay médicos asignados a esta especialidad.</Text>
        )}
      </View>

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
    color: "#11182",
  },
  medicoItem: {
    marginTop: 5,
    paddingLeft: 10,
  },
  medicoText: {
    fontSize: 14,
    color: "#374151",
  }
});