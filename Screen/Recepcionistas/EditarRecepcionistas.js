import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  crearRecepcionista,
  editarRecepcionista,
} from "../../Src/Servicios/RecepcionistasService";
import SearchablePicker from "../../componentes/SearchablePicker";

export default function EditarRecepcionista() {
  const navigation = useNavigation();
  const route = useRoute();

  const recepcionista = route.params?.recepcionista;

  const [Nombre, setNombre] = useState(recepcionista ? recepcionista.Nombre : "");
  const [Apellido, setApellido] = useState(recepcionista ? recepcionista.Apellido : "");
  const [Telefono, setTelefono] = useState(recepcionista ? recepcionista.Telefono : "");
  const [Email, setEmail] = useState(recepcionista ? recepcionista.Email : "");
  const [Password, setPassword] = useState("");
  const [Turno, setTurno] = useState(recepcionista ? recepcionista.Turno : "");
  const [loading, setLoading] = useState(false);

  // Lista de turnos disponibles
  const turnosDisponibles = [
    { label: "Mañana", value: "Mañana" },
    { label: "Tarde", value: "Tarde" },
    { label: "Noche", value: "Noche" },
    { label: "24 Horas", value: "24 Horas" },
  ];

  const esEdicion = !!recepcionista;

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !Turno || !Telefono || !Email || (!esEdicion && !Password)) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let data = { Nombre, Apellido, Telefono, Email, Turno };
      if (Password) data.Password = Password;

      let result = esEdicion
        ? await editarRecepcionista(recepcionista.id, data)
        : await crearRecepcionista(data);

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Recepcionista actualizado" : "Recepcionista creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar el recepcionista");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el recepcionista");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Recepcionista" : "Nuevo Recepcionista"}
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={Nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={Apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={Telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={Email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder={esEdicion ? "Nueva Contraseña (opcional)" : "Contraseña"}
            value={Password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <SearchablePicker
            data={turnosDisponibles}
            value={Turno}
            onValueChange={setTurno}
            placeholder="Seleccionar Turno"
            searchPlaceholder="Buscar turno..."
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Recepcionista"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F0F2",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 15,
    color: "#111827",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: "#10B981",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    marginLeft: 8,
    fontWeight: "bold",
  },
});
