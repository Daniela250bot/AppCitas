import React, { useState, useEffect } from "react";
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
} from "../../Src/Servicios/EspecialidadesService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function EditarEspecialidad() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isRecepcionista } = useUser();

  const especialidad = route.params?.especialidad;
  const [Nombre, setNombre] = useState(especialidad ? especialidad.Nombre : "");
  const [Descripcion, setDescripcion] = useState(
    especialidad ? especialidad.Descripcion : ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isRecepcionista()) {
      Alert.alert(
        "Acceso Denegado",
        "Solo los recepcionistas pueden crear o editar especialidades.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }, [isRecepcionista, navigation]);

  const esEdicion = !!especialidad;

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
          esEdicion
            ? "Especialidad actualizada correctamente"
            : "Especialidad creada correctamente"
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
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Especialidad" : "Nueva Especialidad"}
        </Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la especialidad"
            value={Nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Descripción"
            multiline
            numberOfLines={4}
            value={Descripcion}
            onChangeText={setDescripcion}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Especialidad"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
