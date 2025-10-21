import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../Src/Contexts/UserContext";

export default function DetalleCita() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isPaciente } = useContext(UserContext);

  const { cita } = route.params || {};

  if (!cita) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontró la información de la cita médica.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>🩺 Detalle de la Cita Médica</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>📅 Fecha</Text>
          <Text style={styles.value}>{cita?.Fecha_cita ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>⏰ Hora</Text>
          <Text style={styles.value}>{cita?.Hora ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📌 Estado</Text>
          <Text style={[styles.value, cita?.Estado === "Pendiente" ? styles.pending : styles.done]}>
            {cita?.Estado ?? "N/A"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>👤 Paciente</Text>
          <Text style={styles.value}>{cita?.paciente ? `${cita.paciente.Nombre} ${cita.paciente.Apellido}` : cita?.idPaciente ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>👨‍⚕️ Médico</Text>
          <Text style={styles.value}>{cita?.medico ? `${cita.medico.Nombre} ${cita.medico.Apellido}` : cita?.idMedico ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>💼 Recepcionista</Text>
          <Text style={styles.value}>{cita?.recepcionista ? `${cita.recepcionista.Nombre} ${cita.recepcionista.Apellido}` : cita?.idRecepcionista ?? "N/A"}</Text>
        </View>
      </View>

      {!isPaciente() && (
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("EditarCitas", { cita })}
        >
          <Ionicons name="create-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Editar Cita</Text>
        </TouchableOpacity>
      )}

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
  },
  pending: {
    color: "#EAB308",
  },
  done: {
    color: "#10B981",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
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
