import React, { useState, useEffect } from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  Image 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearConsultorio, editarConsultorio } from "../../Src/Servicios/ConsultoriosService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function EditarConsultorio() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isRecepcionista } = useUser();

  const consultorio = route.params?.consultorio;

  const [Nombre, setNombre] = useState(consultorio ? consultorio.Nombre : "");
  const [Direccion, setDireccion] = useState(consultorio ? consultorio.Direccion : "");
  const [Ciudad, setCiudad] = useState(consultorio ? consultorio.Ciudad : "");
  const [Telefono, setTelefono] = useState(consultorio ? consultorio.Telefono : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isRecepcionista()) {
      Alert.alert("Acceso Denegado", "Solo los recepcionistas pueden crear o editar consultorios.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  }, [isRecepcionista, navigation]);

  const esEdicion = !!consultorio;

  const handleGuardar = async () => {
    if (!Nombre || !Telefono || !Ciudad || !Direccion) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarConsultorio(consultorio.id, {
          Nombre,
          Direccion,
          Ciudad,
          Telefono,
        });
      } else {
        result = await crearConsultorio({
          Nombre,
          Direccion,
          Ciudad,
          Telefono,
        });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Consultorio actualizado correctamente" : "Consultorio creado exitosamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el consultorio");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el consultorio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#E9FDF3" }}>
      <View style={styles.container}>
        {/* Logo médico */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* Título */}
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}
        </Text>

        {/* Campos */}
        <TextInput
          style={styles.input}
          placeholder="Nombre del Consultorio"
          value={Nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={Direccion}
          onChangeText={setDireccion}
        />
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          value={Ciudad}
          onChangeText={setCiudad}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={Telefono}
          onChangeText={setTelefono}
          keyboardType="numeric"
        />

        {/* Botón guardar */}
        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Consultorio"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    margin: 20,
    borderRadius: 20,
    shadowColor: "#10B981",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 80,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#064E3B",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#047857",
    paddingVertical: 15,
    borderRadius: 40,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 40,
    shadowColor: "#047857",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    marginLeft: 8,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
