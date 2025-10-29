import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  Animated,
  Easing,
  Pressable,
  ActivityIndicator,
} from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 2,
        tension: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        updateUser(result.user);
        Alert.alert("Éxito", "Inicio de sesión exitoso");
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
      Alert.alert("Error", "Ocurrió un error inesperado al intentar iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          alignItems: "center",
          width: "100%",
        }}
      >
        <Animated.Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
          }}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}
        />

        <Text style={styles.titulo}>Citas Médicas</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="📧 Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="🔒 Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => [
            styles.botonLogin,
            pressed && styles.botonPressed,
          ]}
        >
          <Text style={styles.botonTexto}>
            {loading ? "⏳ Iniciando..." : "✅ Iniciar Sesión"}
          </Text>
        </Pressable>

        {loading && (
          <ActivityIndicator size="large" color="#1d4ed8" style={{ marginTop: 20 }} />
        )}

        <Pressable
          onPress={() => navigation.navigate("RecuperarPassword")}
          disabled={loading}
          style={({ pressed }) => [
            styles.botonRecuperar,
            pressed && styles.botonPressed,
          ]}
        >
          <Text style={styles.botonTexto}>🔑 ¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("RegistroRecepcionista")}
          disabled={loading}
          style={({ pressed }) => [
            styles.botonRegistroRecepcionista,
            pressed && styles.botonPressed,
          ]}
        >
          <Text style={styles.botonTexto}>👨‍💼 Recepcionistas </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 25,
    tintColor: "#1d4ed8",
    backgroundColor: "#fff",
    borderRadius: 60,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  formContainer: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffffcc",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    marginBottom: 15,
    backgroundColor: "#f8fafc",
    fontSize: 16,
  },
  botonLogin: {
    marginTop: 18,
    width: "85%",
    backgroundColor: "#1d4ed8",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#1d4ed8",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  botonRecuperar: {
    marginTop: 14,
    width: "85%",
    backgroundColor: "#f59e0b",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#f59e0b",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  botonRegistroRecepcionista: {
    marginTop: 14,
    width: "85%",
    backgroundColor: "#059669",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#059669",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  botonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
});
