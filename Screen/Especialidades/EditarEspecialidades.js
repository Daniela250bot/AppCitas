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
  crearEspecialidad,
  editarEspecialidad,
} from "../../Src/Services/EspecialidadesService";

export default function EditarEspecialidad() {
  const navigation = useNavigation();
  const route = useRoute();

  const especialidad = route.params?.especialidad;

  const [Nombre, setNombre] = useState(especialidad ? especialidad.Nombre : "");
  const [Descripcion, setDescripcion] = useState(
    especialidad ? especialidad.Descripcion : ""
  );
  const [loading, setLoading] = useState(false);

  const esEdicion = !!especialidad; // true si estamos editando

  const handleGuardar = async () => {
    if (!Nombre || !Descripcion) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarEspecialidad(especialidad.id, {
          Nombre,
          Descripcion,
        });
      } else {
        result = await crearEspecialidad({
          Nombre,
          Descripcion,
        });
      }
      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Especialidad actualizada" : "Especialidad creada correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert(
          "Error",
          JSON.stringify(result.message) || "No se pudo guardar la especialidad"
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la especialidad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Especialidad" : "Nueva Especialidad"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de la especialidad"
          value={Nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={Descripcion}
          onChangeText={setDescripcion}
        />

        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Especialidad"}
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
