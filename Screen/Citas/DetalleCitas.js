import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../Src/Contexts/UserContext";

export default function DetalleCita() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isPaciente, isMedico } = useContext(UserContext);

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
      <Text style={styles.headerTitle}>Detalle de la Cita Médica</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Fecha:</Text>
        <Text style={styles.value}>{cita?.Fecha_cita ?? "N/A"}</Text>

        <Text style={styles.label}>⏰ Hora:</Text>
        <Text style={styles.value}>{cita?.Hora ?? "N/A"}</Text>

        <Text style={styles.label}>📌 Estado:</Text>
        <Text style={styles.value}>{cita?.Estado ?? "N/A"}</Text>

        <Text style={styles.label}>👤 ID Paciente:</Text>
        <Text style={styles.value}>{cita?.idPaciente ?? "N/A"}</Text>

        <Text style={styles.label}>🩺 ID Médico:</Text>
        <Text style={styles.value}>{cita?.idMedico ?? "N/A"}</Text>

        <Text style={styles.label}>👨‍⚕️ ID Recepcionista:</Text>
        <Text style={styles.value}>{cita?.idRecepcionista ?? "N/A"}</Text>

      </View>

      {/* Solo mostrar botón de editar si no es paciente (médicos y otros roles pueden editar) */}
      {!isPaciente() && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditarCitas", { cita })}
        >
          <Ionicons name="create-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Editar Cita</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.button, { backgroundColor: "#EF4444" }]} onPress={() => navigation.goBack()}>
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