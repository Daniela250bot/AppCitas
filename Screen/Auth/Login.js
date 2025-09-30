import { TextInput, Text, View, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // 🔹 Guardamos al usuario en el contexto
        updateUser(result.user);

        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          { text: "Ok", onPress: () => navigation.replace("Inicio") },
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          typeof result.message === "string"
            ? result.message
            : result.message?.message ||
                JSON.stringify(result.message) ||
                "Ocurrió un error al iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado al intentar iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título y subtítulo */}
      <Text style={styles.titulo}>🏥 Citas Médicas</Text>
      <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder=" @ Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder=" ** Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      {/* Botones */}
      <BottonComponent
        title={loading ? "⏳ Iniciando..." : "✅ Iniciar Sesión"}
        onPress={handleLogin}
        disabled={loading}
      />

      <BottonComponent
        title="📝 ¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate("Registro")}
        style={{ backgroundColor: "#0A2647" }} // azul oscuro secundario
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF", // Fondo claro suave
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A74DA",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#d0d7e2",
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 15,

    // Sombra ligera
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
