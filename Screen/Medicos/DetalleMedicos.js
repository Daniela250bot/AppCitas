import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleMedico() {
  const navigation = useNavigation();
  const route = useRoute();

  const { medico } = route.params || {};

  if (!medico) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontró la información del médico.</Text>
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
          <Text style={styles.headerTitle}>🩺 Detalle del Médico</Text>
        </View>

        {/* Información del médico */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>👤 Nombre</Text>
            <Text style={styles.value}>{medico.Nombre ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>👤 Apellido</Text>
            <Text style={styles.value}>{medico.Apellido ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🆔 Documento</Text>
            <Text style={styles.value}>{medico.Documento ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>📞 Teléfono</Text>
            <Text style={styles.value}>{medico.Telefono ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>✉️ Correo</Text>
            <Text style={styles.value}>{medico.Email ?? "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🎓 Especialidad</Text>
            <Text style={styles.value}>
              {medico.especialidad ? medico.especialidad.Nombre : medico.idEspecialidad}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🏥 Consultorio</Text>
            <Text style={styles.value}>
              {medico.consultorio ? medico.consultorio.Nombre : medico.idConsultorio}
            </Text>
          </View>
        </View>

        {/* Botones centrados al final */}
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("EditarMedicos", { medico })}
        >
          <Ionicons name="create-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Editar Médico</Text>
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
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 85,
    height: 85,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0369A1",
    textAlign: "center",
    marginBottom: 15,
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
    textAlign: "right",
    maxWidth: "60%",
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
