import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { registerUser } from "../../Src/Servicios/AuthService";

export default function Registro({ navigation }) {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [rh, setRh] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRol] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const userData = {
      name,
      apellido,
      documento,
      telefono,
      email,
      fechaNacimiento,
      genero,
      rh,
      nacionalidad,
      password,
      roles,
    };

    try {
      const result = await registerUser(userData);
      if (result.success) {
        Alert.alert("✅ Éxito", "Registro exitoso", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("⚠️ Error", result.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      Alert.alert("❌ Error", "No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📝 Registro de Usuario</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Fecha de nacimiento (YYYY-MM-DD)" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
      <TextInput style={styles.input} placeholder="Género" value={genero} onChangeText={setGenero} />
      <TextInput style={styles.input} placeholder="RH" value={rh} onChangeText={setRh} />
      <TextInput style={styles.input} placeholder="Nacionalidad" value={nacionalidad} onChangeText={setNacionalidad} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Rol (ej. paciente, medico)" value={roles} onChangeText={setRol} />

      <BottonComponent title={loading ? "⏳ Registrando..." : "✅ Registrarse"} onPress={handleRegister} disabled={loading} />

      <BottonComponent
        title="🔑 ¿Ya tienes cuenta? Inicia sesión"
        onPress={() => navigation.navigate("Login")}
        style={{ backgroundColor: "#0A2647" }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F9FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0A74DA",
    marginBottom: 20,
    textAlign: "center",
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
