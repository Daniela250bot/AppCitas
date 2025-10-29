import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Notifications from 'expo-notifications';
import BottonComponent from "../../componentes/BottoComponent";
import { registerUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function Registro({ navigation }) {
  const { user, isRecepcionista } = useUser();
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [rh, setRh] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [turno, setTurno] = useState("");
  const [idConsultorio, setIdConsultorio] = useState("");
  const [idEspecialidad, setIdEspecialidad] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isRecepcionista()) {
      Alert.alert("Acceso Denegado", "Solo los recepcionistas pueden registrar usuarios.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  }, [isRecepcionista, navigation]);

  useEffect(() => {
    if (!codigoVerificacion || codigoVerificacion !== "2025vital") {
      setShowForm(false);
    }
  }, [codigoVerificacion]);

  const handleVerificarCodigo = () => {
    if (codigoVerificacion === "2025vital") {
      setShowForm(true);
    } else {
      Alert.alert("Error", "Código de verificación incorrecto");
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert("⚠️ Error", "El nombre es obligatorio");
      return;
    }
    if (!email.trim()) {
      Alert.alert("⚠️ Error", "El email es obligatorio");
      return;
    }
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
    if (!selectedRole) {
      Alert.alert("⚠️ Error", "Debes seleccionar un rol");
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
      turno,
      idConsultorio,
      idEspecialidad,
      password,
      role: selectedRole,
    };

    // Obtener FCM token
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync();
        userData.fcm_token = token.data;
        console.log('FCM token obtenido en registro:', token.data);
      } else {
        console.log('Permisos de notificaciones denegados en registro');
      }
    } catch (error) {
      console.error('Error al obtener FCM token en registro:', error);
    }

    console.log('Registro.js: Datos enviados a la API:', userData);
    try {
      const result = await registerUser(userData);
      console.log('Registro.js: Respuesta de la API:', result);
      if (result.success) {
        Alert.alert("✅ Éxito", "Registro exitoso", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        let errorMessage = "Ocurrió un error al registrar el usuario";
        if (result.message && typeof result.message === "object") {
          if (result.message.errors) {
            const errors = result.message.errors;
            const errorList = Object.keys(errors)
              .map((key) => `${key}: ${errors[key].join(", ")}`)
              .join("\n");
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

  if (!showForm) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* 🏥 Encabezado con logo */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2966/2966485.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.appTitle}>Centro Médico VitalCare</Text>
          <Text style={styles.subTitle}>Registro de Recepcionista 💙</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.titulo}>🔐 Código de Verificación</Text>
          <Text style={styles.description}>
            Ingresa el código de verificación proporcionado por la empresa para registrar un recepcionista.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Código de verificación *"
            value={codigoVerificacion}
            onChangeText={setCodigoVerificacion}
            secureTextEntry
          />

          <View style={{ marginTop: 10 }}>
            <BottonComponent
              title="✅ Verificar Código"
              onPress={handleVerificarCodigo}
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🏥 Encabezado con logo */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2966/2966485.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Centro Médico VitalCare</Text>
        <Text style={styles.subTitle}>Tu salud en buenas manos 💙</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>🩺 Registro de Usuario</Text>
        <Text style={styles.description}>
          Código verificado correctamente. Ahora puedes registrar usuarios en el sistema.
        </Text>

        <Text style={styles.label}>Selecciona el Rol a Registrar:</Text>
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "Paciente" && styles.selectedRole,
            ]}
            onPress={() => setSelectedRole("Paciente")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "Paciente" && styles.selectedRoleText,
              ]}
            >
              Paciente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "Medico" && styles.selectedRole,
            ]}
            onPress={() => setSelectedRole("Medico")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "Medico" && styles.selectedRoleText,
              ]}
            >
              Médico
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "Recepcionista" && styles.selectedRole,
            ]}
            onPress={() => setSelectedRole("Recepcionista")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "Recepcionista" && styles.selectedRoleText,
              ]}
            >
              Recepcionista
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nombre *"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña *"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña *"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {selectedRole && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            {selectedRole === "Paciente" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Documento"
                  value={documento}
                  onChangeText={setDocumento}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Fecha de nacimiento (YYYY-MM-DD)"
                  value={fechaNacimiento}
                  onChangeText={setFechaNacimiento}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Género"
                  value={genero}
                  onChangeText={setGenero}
                />
                <TextInput
                  style={styles.input}
                  placeholder="RH"
                  value={rh}
                  onChangeText={setRh}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nacionalidad"
                  value={nacionalidad}
                  onChangeText={setNacionalidad}
                />
              </>
            )}

            {selectedRole === "Medico" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Documento"
                  value={documento}
                  onChangeText={setDocumento}
                />
                <TextInput
                  style={styles.input}
                  placeholder="ID Consultorio"
                  value={idConsultorio}
                  onChangeText={setIdConsultorio}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="ID Especialidad"
                  value={idEspecialidad}
                  onChangeText={setIdEspecialidad}
                  keyboardType="numeric"
                />
              </>
            )}

            {selectedRole === "Recepcionista" && (
              <TextInput
                style={styles.input}
                placeholder="Turno"
                value={turno}
                onChangeText={setTurno}
              />
            )}
          </>
        )}

        <View style={{ marginTop: 10 }}>
          <BottonComponent
            title={loading ? "⏳ Registrando..." : "✅ Registrarse"}
            onPress={handleRegister}
            disabled={loading}
          />

          <BottonComponent
            title="🔑 ¿Ya tienes cuenta? Inicia sesión"
            onPress={() => navigation.navigate("Login")}
            style={{ backgroundColor: "#223A66" }}
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
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
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4469B0",
    marginBottom: 10,
    textAlign: "center",
  },
  roleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#F0F4FA",
    borderWidth: 1,
    borderColor: "#B8C5E0",
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: "#4469B0",
    borderColor: "#294B8C",
  },
  roleText: {
    color: "#223A66",
    fontWeight: "bold",
    fontSize: 14,
  },
  selectedRoleText: {
    color: "#fff",
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
