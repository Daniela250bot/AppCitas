import React, { useState, useEffect } from "react";
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
import { crearMedico, editarMedico } from "../../Src/Servicios/MedicosService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadesService";
import { listarConsultorios } from "../../Src/Servicios/ConsultoriosService";
import SearchablePicker from "../../componentes/SearchablePicker";

export default function EditarMedico() {
  const navigation = useNavigation();
  const route = useRoute();

  const medico = route.params?.medico;

  const [Nombre, setNombre] = useState(medico ? medico.Nombre : "");
  const [Apellido, setApellido] = useState(medico ? medico.Apellido : "");
  const [Documento, setDocumento] = useState(medico ? medico.Documento : "");
  const [idEspecialidad, setidEspecialidad] = useState(
    medico ? String(medico.idEspecialidad) : ""
  );
  const [Telefono, setTelefono] = useState(medico ? medico.Telefono : "");
  const [Email, setEmail] = useState(medico ? medico.Email : "");
  const [Password, setPassword] = useState("");
  const [idConsultorio, setidConsultorio] = useState(
    medico ? String(medico.idConsultorio) : ""
  );
  const [loading, setLoading] = useState(false);

  // Estados para los selectores
  const [especialidades, setEspecialidades] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [loadingEspecialidades, setLoadingEspecialidades] = useState(false);
  const [loadingConsultorios, setLoadingConsultorios] = useState(false);
  const [errorEspecialidades, setErrorEspecialidades] = useState(null);
  const [errorConsultorios, setErrorConsultorios] = useState(null);

  const esEdicion = !!medico;

  // Cargar datos para los selectores
  useEffect(() => {
    loadEspecialidades();
    loadConsultorios();
  }, []);

  const loadEspecialidades = async () => {
    setLoadingEspecialidades(true);
    setErrorEspecialidades(null);
    try {
      const result = await listarEspecialidades();
      if (result.success) {
        const especialidadesData = result.data.map(especialidad => ({
          label: `${especialidad.Nombre} (ID: ${especialidad.id})`,
          value: especialidad.id.toString()
        }));
        setEspecialidades(especialidadesData);
      } else {
        setErrorEspecialidades(result.message || "Error al cargar especialidades");
      }
    } catch (error) {
      setErrorEspecialidades("Error de conexión al cargar especialidades");
    } finally {
      setLoadingEspecialidades(false);
    }
  };

  const loadConsultorios = async () => {
    setLoadingConsultorios(true);
    setErrorConsultorios(null);
    try {
      const result = await listarConsultorios();
      if (result.success) {
        const consultoriosData = result.data.map(consultorio => ({
          label: `${consultorio.Nombre} - ${consultorio.Ubicacion} (ID: ${consultorio.id})`,
          value: consultorio.id.toString()
        }));
        setConsultorios(consultoriosData);
      } else {
        setErrorConsultorios(result.message || "Error al cargar consultorios");
      }
    } catch (error) {
      setErrorConsultorios("Error de conexión al cargar consultorios");
    } finally {
      setLoadingConsultorios(false);
    }
  };

  const handleGuardar = async () => {
    if (
      !Nombre ||
      !Apellido ||
      !idEspecialidad ||
      !Telefono ||
      !Email ||
      !idConsultorio ||
      !Documento
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    if (!esEdicion && !Password) {
      Alert.alert("Error", "La contraseña es obligatoria para nuevos médicos.");
      return;
    }

    setLoading(true);
    try {
      let data = {
        name: Nombre,
        apellido: Apellido,
        documento: Documento,
        idEspecialidad,
        telefono: Telefono,
        email: Email,
        idConsultorio,
      };
      if (Password) data.password = Password;

      let result;
      if (esEdicion) {
        result = await editarMedico(medico.id, data);
      } else {
        result = await crearMedico(data);
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Médico actualizado correctamente" : "Médico creado correctamente"
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
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4320/4320357.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>
            {esEdicion ? "Editar Médico" : "Nuevo Médico"}
          </Text>
        </View>

        <View style={styles.card}>
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
            placeholder="Documento"
            value={Documento}
            onChangeText={setDocumento}
          />
          <SearchablePicker
            data={especialidades}
            value={idEspecialidad}
            onValueChange={setidEspecialidad}
            placeholder="Seleccionar Especialidad"
            searchPlaceholder="Buscar especialidad por nombre o ID..."
            loading={loadingEspecialidades}
            error={errorEspecialidades}
            style={styles.input}
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
          {!esEdicion && (
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={Password}
              onChangeText={setPassword}
              secureTextEntry
            />
          )}
          <SearchablePicker
            data={consultorios}
            value={idConsultorio}
            onValueChange={setidConsultorio}
            placeholder="Seleccionar Consultorio"
            searchPlaceholder="Buscar consultorio por nombre, ubicación o ID..."
            loading={loadingConsultorios}
            error={errorConsultorios}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>
              {esEdicion ? "Guardar Cambios" : "Crear Médico"}
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
    justifyContent: "center",
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
