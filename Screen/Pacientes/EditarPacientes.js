import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearPaciente, editarPaciente } from "../../Src/Servicios/PacienteService";

export default function EditarPaciente() {
  const navegation = useNavigation();
  const route = useRoute();

  const paciente = route.params?.paciente;

  const [name, setName] = useState(paciente ? paciente.Nombre : "");
  const [apellido, setApellido] = useState(paciente ? paciente.Apellido : "");
  const [documento, setDocumento] = useState(paciente ? paciente.Documento : "");
  const [telefono, setTelefono] = useState(paciente ? paciente.Telefono : "");
  const [email, setEmail] = useState(paciente ? paciente.Email : "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    paciente ? paciente.Fecha_nacimiento : ""
  );
  const [genero, setGenero] = useState(paciente ? paciente.Genero : "");
  const [rh, setRH] = useState(paciente ? paciente.RH : "");
  const [nacionalidad, setNacionalidad] = useState(
    paciente ? paciente.Nacionalidad : ""
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  const handleGuardar = async () => {
    if (
      !name ||
      !apellido ||
      !documento ||
      !telefono ||
      !email ||
      !fechaNacimiento ||
      !genero ||
      !rh ||
      !nacionalidad
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        const data = {
          name,
          apellido,
          documento,
          telefono,
          email,
          fechaNacimiento,
          genero,
          rh,
          nacionalidad,
        };
        result = await editarPaciente(paciente.id, data);
      } else {
        const data = {
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
        };
        result = await crearPaciente(data);
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Paciente actualizado" : "Paciente creado correctamente"
        );
        navegation.goBack();
      } else {
        Alert.alert(
          "Error",
          JSON.stringify(result.message) || "No se pudo guardar el paciente"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el paciente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {/* Encabezado con logo */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>
            {esEdicion ? "Editar Paciente" : "Nuevo Paciente"}
          </Text>
        </View>

        {/* Tarjeta del formulario */}
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Documento"
            value={documento}
            onChangeText={setDocumento}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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
            placeholder="Grupo RH"
            value={rh}
            onChangeText={setRH}
          />
          <TextInput
            style={styles.input}
            placeholder="Nacionalidad"
            value={nacionalidad}
            onChangeText={setNacionalidad}
          />
          {!esEdicion && (
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          )}

          {/* Botón */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Paciente"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#F0FDF4",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    width: 85,
    height: 85,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065F46",
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#059669",
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
