import { TextInput,Text,View, StyleSheet, Alert, Image, Animated, Easing, Pressable, ActivityIndicator,} from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser, user } = useUser();

  // 🔹 Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Efecto de entrada y rebote
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
        {/* Imagen decorativa con rebote */}
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
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Título */}
        <Text style={styles.titulo}>Citas Médicas</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

        {/* Inputs */}
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

        {/* Botones con efecto de brillo */}
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
          <ActivityIndicator
            size="large"
            color="#0077b6"
            style={{ marginTop: 20 }}
          />
        )}

        {user?.role === "Recepcionista" && (
          <Pressable
            onPress={() => navigation.navigate("Registro")}
            disabled={loading}
            style={({ pressed }) => [
              styles.botonRegistro,
              pressed && styles.botonPressed,
            ]}
          >
            <Text style={styles.botonTexto}>📝 ¿No tienes cuenta? Regístrate</Text>
          </Pressable>
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
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F5FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 20,
    tintColor: "#0077b6",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#023E8A",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  formContainer: {
    width: "100%",
    maxWidth: 380,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#b0c4de",
    borderRadius: 14,
    marginBottom: 18,
    backgroundColor: "#fff",
    fontSize: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  botonLogin: {
    marginTop: 15,
    width: "85%",
    backgroundColor: "#0077b6",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#0077b6",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  botonRegistro: {
    marginTop: 12,
    width: "85%",
    backgroundColor: "#023E8A",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#023E8A",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  botonRecuperar: {
    marginTop: 12,
    width: "85%",
    backgroundColor: "#F59E0B",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#F59E0B",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  botonPressed: {
    backgroundColor: "#00b4d8",
    transform: [{ scale: 0.97 }],
  },
});
