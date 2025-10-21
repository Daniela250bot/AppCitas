import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { restablecerPassword } from "../../Src/Servicios/AuthService";
import { useRoute } from "@react-navigation/native";

export default function RestablecerPassword({ navigation }) {
  const route = useRoute();
  const { token } = route.params || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      Alert.alert("Error", "Token de recuperación inválido", [
        { text: "OK", onPress: () => navigation.navigate("Login") }
      ]);
    }
  }, [token, navigation]);

  const handleRestablecer = async () => {
    if (!password) {
      Alert.alert("Error", "La contraseña es obligatoria");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const result = await restablecerPassword(token, password);
      if (result.success) {
        Alert.alert(
          "Éxito",
          "Tu contraseña ha sido restablecida correctamente",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      } else {
        Alert.alert("Error", result.message || "No se pudo restablecer la contraseña");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al restablecer tu contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Centro Médico VitalCare</Text>
        <Text style={styles.subTitle}>Restablece tu contraseña 💙</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>🔐 Nueva Contraseña</Text>
        <Text style={styles.description}>
          Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña *"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña *"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={{ marginTop: 10 }}>
          <BottonComponent
            title={loading ? "⏳ Restableciendo..." : "✅ Restablecer Contraseña"}
            onPress={handleRestablecer}
            disabled={loading}
          />

          <BottonComponent
            title="⬅️ Volver al Login"
            onPress={() => navigation.navigate("Login")}
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