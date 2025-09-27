import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleEspecialista() {
  const navigation = useNavigation();
  const route = useRoute();

  const { especialista } = route.params || {};

  if (!especialista) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontró la información del especialista.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>🩺 Detalle del Especialista</Text>

      {/* Información del especialista */}
      <View style={styles.card}>
        <Text style={styles.label}>👤 Nombre:</Text>
        <Text style={styles.value}>{especialista.Nombre}</Text>

        <Text style={styles.label}>👤 Apellido:</Text>
        <Text style={styles.value}>{especialista.Apellido}</Text>

        <Text style={styles.label}>🆔 Documento:</Text>
        <Text style={styles.value}>{especialista.Documento}</Text>

        <Text style={styles.label}>📞 Teléfono:</Text>
        <Text style={styles.value}>{especialista.Telefono}</Text>

        <Text style={styles.label}>✉️ Correo:</Text>
        <Text style={styles.value}>{especialista.Email}</Text>

        <Text style={styles.label}>🎓 Especialidad:</Text>
        <Text style={styles.value}>{especialista.Especialidad}</Text>

        <Text style={styles.label}>🏥 Consultorio:</Text>
        <Text style={styles.value}>{especialista.Id_consultorio}</Text>
      </View>

      {/* Botones de acción */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("EditarEspecialista", { especialista })
        }
      >
        <Ionicons name="create-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Editar Especialista</Text>
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
    color: "#11182
