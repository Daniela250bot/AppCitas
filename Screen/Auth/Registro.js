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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRol] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validación básica
    if (!name.trim()) {
      Alert.alert("⚠️ Error", "El nombre es obligatorio");
      return;
    }
    if (!email.trim()) {
      Alert.alert("⚠️ Error", "El email es obligatorio");
      return;
    }
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("⚠️ Error", "El formato del email no es válido");
      return;
    }
    if (!password) {
      Alert.alert("⚠️ Error", "La contraseña es obligatoria");
      return;
    }
    if (password.length < 8) {
      Alert.alert("⚠️ Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("⚠️ Error", "Las contraseñas no coinciden");
      return;
    }
    if (!role.trim()) {
      Alert.alert("⚠️ Error", "El rol es obligatorio");
      return;
    }
    const validRoles = ['Recepcionista', 'Paciente', 'Medico'];
    if (!validRoles.includes(role)) {
      Alert.alert("⚠️ Error", "El rol debe ser Recepcionista, Paciente o Medico");
      return;
    }

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
      role
    };

    try {
      const result = await registerUser(userData);
      if (result.success) {
        Alert.alert("✅ Éxito", "Registro exitoso", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        let errorMessage = "Ocurrió un error al registrar el usuario";
        if (result.message && typeof result.message === "object") {
          if (result.message.errors) {
            const errors = result.message.errors;
            const errorList = Object.keys(errors).map(key => `${key}: ${errors[key].join(', ')}`).join('\n');
            errorMessage = errorList;
          } else if (result.message.message) {
            errorMessage = result.message.message;
          }
        } else if (typeof result.message === "string") {
          errorMessage = result.message;
        }
        Alert.alert("❌ Error de Registro", errorMessage);
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

      <TextInput style={styles.input} placeholder="Nombre *" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo *" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Fecha de nacimiento (YYYY-MM-DD)" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
      <TextInput style={styles.input} placeholder="Género" value={genero} onChangeText={setGenero} />
      <TextInput style={styles.input} placeholder="RH" value={rh} onChangeText={setRh} />
      <TextInput style={styles.input} placeholder="Nacionalidad" value={nacionalidad} onChangeText={setNacionalidad} />
      <TextInput style={styles.input} placeholder="Contraseña *" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar Contraseña *" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="Rol (Recepcionista, paciente, medico)" value={role} onChangeText={setRol}/>

      <BottonComponent 
        title={loading ? "⏳ Registrando..." : "✅ Registrarse"} 
        
        onPress={handleRegister} 
        disabled={loading} 
      />

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