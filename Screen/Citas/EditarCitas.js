import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { crearCita, editarCita, verificarDisponibilidad } from "../../Src/Servicios/CitasService";
import { useUser } from "../../Src/Contexts/UserContext";

export default function EditarCita() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, isMedico } = useUser();

  const cita = route.params?.cita;

  // Si es médico y no hay cita (modo creación), redirigir
  useEffect(() => {
    if (isMedico() && !cita) {
      Alert.alert("Acceso denegado", "Los médicos no pueden crear citas", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }
  }, [isMedico, cita, navigation]);

  const [Fecha_cita, setFecha_cita] = useState(cita ? cita.Fecha_cita : "");
  const [Hora, setHora] = useState(cita ? cita.Hora : "");
  const [idPaciente, setidPaciente] = useState(cita ? String(cita.idPaciente) : "");
  const [idMedico, setidMedico] = useState(cita ? String(cita.idMedico) : "");
  const [idResepcionista, setidResepcionista] = useState(cita ? String(cita.idResepcionista) : "");
  const [Estado, setEstado] = useState(cita ? cita.Estado : "");
  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

  const esEdicion = !!cita;

  useEffect(() => {
    if (!esEdicion && user) {
      if (user.role === 'Recepcionista') {
        setidResepcionista(String(user.id));
      } else if (user.role === 'Medico') {
        setidMedico(String(user.id));
      } else if (user.role === 'Paciente') {
        setidPaciente(String(user.id));
      }
    }
  }, [user, esEdicion]);

  useEffect(() => {
    if (!esEdicion && idMedico) {
      loadDisponibilidad();
    }
  }, [idMedico, esEdicion]);

  const loadDisponibilidad = async () => {
    try {
      const result = await verificarDisponibilidad(idMedico);
      if (result.success) {
        const marked = {};
        result.data.forEach(item => {
          marked[item.fecha] = {
            selected: true,
            selectedColor: item.disponible ? '#10B981' : '#EF4444'
          };
        });
        setMarkedDates(marked);
      }
    } catch (error) {
      console.error('Error cargando disponibilidad:', error);
    }
  };

  const handleDayPress = (day) => {
    setFecha_cita(day.dateString);
    setShowCalendar(false);
  };

  const handleGuardar = async () => {
    // Verificar si es médico intentando crear cita
    if (isMedico() && !esEdicion) {
      Alert.alert("Error", "Los médicos no pueden crear citas");
      return;
    }

    if (!Fecha_cita || !Hora || !idPaciente || !idMedico || !idResepcionista || !Estado) {
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
          idResepcionista,
          Estado,
        });
      } else {
        result = await crearCita({
          Fecha_cita,
          Hora,
          idPaciente,
          idMedico,
          idResepcionista,
          Estado,
        });
      }
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada correctamente");
        navigation.goBack();
      } else {
        let mensaje = result.message;
        if (typeof mensaje !== "string") {
          // Manejar errores específicos del backend
          if (mensaje && typeof mensaje === 'object') {
            if (mensaje.idMedico && mensaje.idMedico.includes("The selected id medico is invalid.")) {
              Alert.alert("Error", "El ID del médico seleccionado no es válido.");
            } else if (mensaje.Fecha_cita && mensaje.Fecha_cita.includes("The fecha cita field must be a valid date.")) {
              Alert.alert("Error", "La fecha de la cita debe ser una fecha válida.");
            } else if (mensaje.idPaciente && mensaje.idPaciente.includes("The selected id paciente is invalid.")) {
              Alert.alert("Error", "El ID del paciente seleccionado no es válido.");
            } else if (mensaje.idResepcionista && mensaje.idResepcionista.includes("The selected id resepcionista is invalid.")) {
              Alert.alert("Error", "El ID del recepcionista seleccionado no es válido.");
            } else if (mensaje.Hora && mensaje.Hora.some(err => err.includes("The hora field must be a valid time.") || err.includes("invalid"))) {
              Alert.alert("Error", "La hora de la cita debe ser una hora válida en formato HH:MM.");
            } else if (mensaje.Estado && mensaje.Estado.some(err => err.includes("invalid") || err.includes("required"))) {
              Alert.alert("Error", "El estado de la cita es inválido o requerido.");
            } else if (mensaje.Fecha_cita && mensaje.Fecha_cita.some(err => err.includes("required"))) {
              Alert.alert("Error", "La fecha de la cita es requerida.");
            } else if (mensaje.Hora && mensaje.Hora.some(err => err.includes("required"))) {
              Alert.alert("Error", "La hora de la cita es requerida.");
            } else if (mensaje.idPaciente && mensaje.idPaciente.some(err => err.includes("required"))) {
              Alert.alert("Error", "El ID del paciente es requerido.");
            } else if (mensaje.idMedico && mensaje.idMedico.some(err => err.includes("required"))) {
              Alert.alert("Error", "El ID del médico es requerido.");
            } else if (mensaje.idResepcionista && mensaje.idResepcionista.some(err => err.includes("required"))) {
              Alert.alert("Error", "El ID del recepcionista es requerido.");
            } else if (mensaje.Estado && mensaje.Estado.some(err => err.includes("required"))) {
              Alert.alert("Error", "El estado de la cita es requerido.");
            } else {
              // Para otros errores no especificados (como errores de servidor o validaciones adicionales)
              Alert.alert("Error", JSON.stringify(mensaje) || "Ocurrió un error inesperado al guardar la cita.");
            }
          } else {
            Alert.alert("Error", mensaje || "No se pudo guardar la cita");
          }
        } else {
          Alert.alert("Error", mensaje || "No se pudo guardar la cita");
        }
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

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Text style={{ color: Fecha_cita ? '#000' : '#999' }}>
            {Fecha_cita || "Seleccionar Fecha"}
          </Text>
        </TouchableOpacity>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                selectedDayBackgroundColor: '#10B981',
                todayTextColor: '#10B981',
                arrowColor: '#10B981',
              }}
            />
          </View>
        )}
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
          value={idResepcionista}
          onChangeText={setidResepcionista}
          keyboardType="numeric"
          editable={esEdicion || user?.role !== 'idRecepcionista'}
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
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
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