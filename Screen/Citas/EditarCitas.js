import React, { useState } from "react";
import {View,TextInput,TouchableOpacity,Text,StyleSheet,ScrollView,Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearCita, editarCita } from "../../Src/Servicios/CitasService";

export default function EditarCita() {
  const navigation = useNavigation();
  const route = useRoute();

  const cita = route.params?.cita;

  const [Fecha_cita, setFecha_cita] = useState(cita ? cita.Fecha_cita : "");
  const [Hora, setHora] = useState(cita ? cita.Hora : "");
  const [idPaciente, setidPaciente] = useState(cita ? String (cita.idPaciente) : "");
  const [idMedico, setidMedico] = useState(cita ? String (cita.idMedico) : "");
  const [idRecepcionista, setidRecepcionista] = useState(cita ? String(cita.idRecepcionista) : "");
  const [Estado, setEstado] = useState(cita ? cita.Estado : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!cita; // true si estamos editando

  const handleGuardar = async () => {
    if (!Fecha_cita || !Hora || !idPaciente || !idMedico || !idRecepcionista || !Estado) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarCita(cita.id, {
          Fecha_cita,
          Hora,
          idPaciente,
          idMedico,
          idRecepcionista,
          Estado,
        });
      } else {
        result = await crearCita({
          Fecha_cita,
          Hora,
          idPaciente,
          idMedico,
          idRecepcionista,
          Estado,
        });
      }
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Cita Médica" : "Nueva Cita Médica"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Fecha (YYYY-MM-DD)"
          value={Fecha_cita}
          onChangeText={setFecha_cita}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM)"
          value={Hora}
          onChangeText={setHora}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Paciente"
          value={idPaciente}
          onChangeText={setidPaciente}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="ID Médico"
          value={idMedico}
          onChangeText={setidMedico}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="ID Recepcionista"
          value={idRecepcionista}
          onChangeText={setidRecepcionista}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Estado de la cita"
          value={Estado}
          onChangeText={setEstado}
        />

        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Cita"}
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
