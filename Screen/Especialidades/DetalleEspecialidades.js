import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
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
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/foto-gratis/fondo-difuminado-clinica-hospital-interior-vacio_103324-627.jpg",
      }}
      style={styles.container}
      blurRadius={3}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo médico */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2966/2966487.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>🩺 Detalle de la Especialidad</Text>
        </View>

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

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.label}>👨‍⚕️ Médicos</Text>
            {especialidad.medicos && especialidad.medicos.length > 0 ? (
              especialidad.medicos.map((medico) => (
                <View key={medico.id} style={styles.medicoItem}>
                  <Ionicons
                    name="person-circle-outline"
                    size={20}
                    color="#0284C7"
                  />
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0369A1",
    textAlign: "center",
    marginBottom: 10,
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
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0369A1",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
  },
  multiLine: {
    lineHeight: 22,
    textAlign: "justify",
  },
  section: {
    marginTop: 10,
  },
  medicoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  medicoText: {
    fontSize: 15,
    color: "#1E3A8A",
    marginLeft: 6,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
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
