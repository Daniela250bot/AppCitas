import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import * as Notifications from 'expo-notifications';
import BottonComponent from "../../componentes/BottoComponent";
import { registerRecepcionista } from "../../Src/Servicios/AuthService";

export default function RegistroRecepcionista({ navigation }) {
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Turno: "Mañana",
    Telefono: "",
    Email: "",
    Password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleVerificarCodigo = () => {
    if (codigoVerificacion === "2025vital") {
      setShowForm(true);
    } else {
      Alert.alert("Error", "Código de verificación incorrecto");
    }
  };

  const handleRegistro = async () => {
    if (!formData.Nombre || !formData.Apellido || !formData.Email || !formData.Password) {
      Alert.alert("Error", "Por favor, completa todos los campos obligatorios");
      return;
    }

    if (formData.Password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (formData.Password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido");
      return;
    }

    setLoading(true);
    try {
      // Obtener FCM token
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          const token = await Notifications.getExpoPushTokenAsync();
          formData.fcm_token = token.data;
          console.log('FCM token obtenido:', token.data);
        } else {
          console.log('Permisos de notificaciones denegados');
        }
      } catch (error) {
        console.error('Error al obtener FCM token:', error);
      }

      const data = {
        name: formData.Nombre,
        apellido: formData.Apellido,
        telefono: formData.Telefono,
        email: formData.Email,
        password: formData.Password,
        Turno: formData.Turno,
        fcm_token: formData.fcm_token
      };

      const result = await registerRecepcionista(data);
      if (result.success) {
        Alert.alert("Éxito", "Recepcionista registrado correctamente");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", result.message || "No se pudo registrar el recepcionista");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "Ocurrió un error al registrar el recepcionista");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!showForm) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Centro Médico VitalCare</Text>
          <Text style={styles.subTitle}>Registro de Recepcionista 💙</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.titulo}>🔐 Código de Verificación</Text>
          <Text style={styles.description}>
            Ingresa el código de verificación proporcionado por la empresa para continuar con el registro.
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
      <View style={styles.header}>
        <Text style={styles.appTitle}>Centro Médico VitalCare</Text>
        <Text style={styles.subTitle}>Registro de Recepcionista 💙</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>👨‍💼 Nuevo Recepcionista</Text>
        <Text style={styles.description}>
          Completa los datos para registrar un nuevo recepcionista en el sistema.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre *"
          value={formData.Nombre}
          onChangeText={(value) => updateFormData('Nombre', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido *"
          value={formData.Apellido}
          onChangeText={(value) => updateFormData('Apellido', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={formData.Telefono}
          onChangeText={(value) => updateFormData('Telefono', value)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico *"
          value={formData.Email}
          onChangeText={(value) => updateFormData('Email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña *"
          secureTextEntry
          value={formData.Password}
          onChangeText={(value) => updateFormData('Password', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña *"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
        />

        <View style={{ marginTop: 10 }}>
          <BottonComponent
            title={loading ? "⏳ Registrando..." : "✅ Registrar Recepcionista"}
            onPress={handleRegistro}
            disabled={loading}
          />

          <BottonComponent
            title="⬅️ Volver"
            onPress={() => setShowForm(false)}
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