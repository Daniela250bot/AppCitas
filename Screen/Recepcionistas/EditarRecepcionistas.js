import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearRecepcionista, editarRecepcionista,} from "../../Src/Servicios/RecepcionistasService";

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

  const esEdicion = !!recepcionista;

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !Turno || !Telefono || !Email || (!esEdicion && !Password)) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let data = {
        Nombre,
        Apellido,
        Telefono,
        Email,
        Turno,
      };
      if (Password) {
        data.Password = Password;
      }
      let result;
      if (esEdicion) {
        result = await editarRecepcionista(recepcionista.id, data);
      } else {
        result = await crearRecepcionista(data);
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion
            ? "Recepcionista actualizado"
            : "Recepcionista creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert(
          "Error",
          JSON.stringify(result.message) || "No se pudo guardar el recepcionista"
        );
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
          <TextInput
          style={styles.input}
          placeholder="Turno"
          value={Turno}
          onChangeText={setTurno}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#110e0eff",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 500,
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
