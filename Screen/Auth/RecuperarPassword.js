import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { recuperarPassword } from "../../Src/Servicios/AuthService";

export default function RecuperarPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecuperar = async () => {
    console.log("RecuperarPassword: Email ingresado:", email);
    console.log("RecuperarPassword: Email trimmed:", email.trim());

    if (!email.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido");
      return;
    }

    setLoading(true);
    try {
      console.log("RecuperarPassword: Enviando solicitud de recuperación para:", email);
      const result = await recuperarPassword(email);
      console.log("RecuperarPassword: Respuesta del servicio:", result);

      if (result.success) {
        Alert.alert(
          "Éxito",
          "Se ha enviado un enlace de recuperación a tu correo electrónico",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        console.log("RecuperarPassword: Error en respuesta:", result.message);
        Alert.alert("Error", result.message || "No se pudo enviar el correo de recuperación");
      }
    } catch (error) {
      console.error("RecuperarPassword: Error en catch:", error);
      Alert.alert("Error", "Ocurrió un error al procesar tu solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Centro Médico VitalCare</Text>
        <Text style={styles.subTitle}>Recupera tu contraseña 💙</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>🔑 Recuperar Contraseña</Text>
        <Text style={styles.description}>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={{ marginTop: 10 }}>
          <BottonComponent
            title={loading ? "⏳ Enviando..." : "📧 Enviar Enlace"}
            onPress={handleRecuperar}
            disabled={loading}
          />

          <BottonComponent
            title="⬅️ Volver al Login"
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#6B7280" }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EAF0F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3C72",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: "#4F6FA3",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#223A66",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#D2DAE6",
    borderRadius: 10,
    backgroundColor: "#F9FBFF",
    marginBottom: 15,
    fontSize: 15,
    color: "#2A2A2A",
  },
});