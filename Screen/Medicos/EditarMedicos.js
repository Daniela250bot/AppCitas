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
import { crearMedico, editarMedico } from "../../Src/Services/MedicosService";

export default function EditarMedico() {
  const navigation = useNavigation();
  const route = useRoute();

  const medico = route.params?.medico;

  const [Nombre, setNombre] = useState(medico ? medico.Nombre : "");
  const [Apellido, setApellido] = useState(medico ? medico.Apellido : "");
  const [EspecialidadId, setEspecialidadId] = useState(
    medico ? medico.EspecialidadId.toString() : ""
  );
  const [Telefono, setTelefono] = useState(medico ? medico.Telefono : "");
  const [Email, setEmail] = useState(medico ? medico.Email : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!medico;

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !EspecialidadId || !Telefono || !Email) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarMedico(medico.id, {
          Nombre,
          Apellido,
          EspecialidadId,
          Telefono,
          Email,
        });
      } else {
        result = await crearMedico({
          Nombre,
          Apellido,
          EspecialidadId,
          Telefono,
          Email,
        });
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Médico actualizado" : "Médico creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert(
          "Error",
          JSON.stringify(result.message) || "No se pudo guardar el médico"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el médico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Médico" : "Nuevo Médico"}
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
          placeholder="ID Especialidad"
          value={EspecialidadId}
          onChangeText={setEspecialidadId}
          keyboardType="numeric"
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

        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Médico"}
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
