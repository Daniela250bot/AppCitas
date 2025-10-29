import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { crearCita, editarCita, verificarDisponibilidad } from "../../Src/Servicios/CitasService";
import { listarPacientes } from "../../Src/Servicios/PacienteService";
import { listarMedicos } from "../../Src/Servicios/MedicosService";
import { listarRecepcionistas } from "../../Src/Servicios/RecepcionistasService";
import { useUser } from "../../Src/Contexts/UserContext";
import SearchablePicker from "../../componentes/SearchablePicker";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarCita() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, isMedico } = useUser();

  const cita = route.params?.cita;

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

  // Estados para los selectores
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [recepcionistas, setRecepcionistas] = useState([]);
  const [estadosCita] = useState([
    { label: "Pendiente", value: "Pendiente" },
    { label: "Confirmada", value: "Confirmada" },
    { label: "Cancelada", value: "Cancelada" },
    { label: "Completada", value: "Completada" },
  ]);
  const [loadingPacientes, setLoadingPacientes] = useState(false);
  const [loadingMedicos, setLoadingMedicos] = useState(false);
  const [loadingRecepcionistas, setLoadingRecepcionistas] = useState(false);
  const [errorPacientes, setErrorPacientes] = useState(null);
  const [errorMedicos, setErrorMedicos] = useState(null);
  const [errorRecepcionistas, setErrorRecepcionistas] = useState(null);

  const esEdicion = !!cita;

  useEffect(() => {
    if (!esEdicion && user) {
      if (user.role === "Recepcionista") {
        setidResepcionista(String(user.id));
      } else if (user.role === "Medico") {
        setidMedico(String(user.id));
      } else if (user.role === "Paciente") {
        setidPaciente(String(user.id));
      }
    }
  }, [user, esEdicion]);

  useEffect(() => {
    if (!esEdicion && idMedico) {
      loadDisponibilidad();
    }
  }, [idMedico, esEdicion]);

  // Cargar datos para los selectores
  useEffect(() => {
    loadPacientes();
    loadMedicos();
    loadRecepcionistas();
  }, []);

  const loadPacientes = async () => {
    setLoadingPacientes(true);
    setErrorPacientes(null);
    try {
      const result = await listarPacientes();
      if (result.success) {
        const pacientesData = result.data.map(paciente => ({
          label: `${paciente.Nombre} ${paciente.Apellido} (ID: ${paciente.id})`,
          value: paciente.id.toString()
        }));
        setPacientes(pacientesData);
      } else {
        setErrorPacientes(result.message || "Error al cargar pacientes");
      }
    } catch (error) {
      setErrorPacientes("Error de conexión al cargar pacientes");
    } finally {
      setLoadingPacientes(false);
    }
  };

  const loadMedicos = async () => {
    setLoadingMedicos(true);
    setErrorMedicos(null);
    try {
      const result = await listarMedicos();
      if (result.success) {
        const medicosData = result.data.map(medico => ({
          label: `${medico.Nombre} ${medico.Apellido} (ID: ${medico.id})`,
          value: medico.id.toString()
        }));
        setMedicos(medicosData);
      } else {
        setErrorMedicos(result.message || "Error al cargar médicos");
      }
    } catch (error) {
      setErrorMedicos("Error de conexión al cargar médicos");
    } finally {
      setLoadingMedicos(false);
    }
  };

  const loadRecepcionistas = async () => {
    setLoadingRecepcionistas(true);
    setErrorRecepcionistas(null);
    try {
      const result = await listarRecepcionistas();
      if (result.success) {
        const recepcionistasData = result.data.map(recepcionista => ({
          label: `${recepcionista.Nombre} ${recepcionista.Apellido} (ID: ${recepcionista.id})`,
          value: recepcionista.id.toString()
        }));
        setRecepcionistas(recepcionistasData);
      } else {
        setErrorRecepcionistas(result.message || "Error al cargar recepcionistas");
      }
    } catch (error) {
      setErrorRecepcionistas("Error de conexión al cargar recepcionistas");
    } finally {
      setLoadingRecepcionistas(false);
    }
  };

  const loadDisponibilidad = async () => {
    try {
      const result = await verificarDisponibilidad(idMedico);
      if (result.success) {
        const marked = {};
        result.data.forEach(item => {
          marked[item.fecha] = {
            selected: true,
            selectedColor: item.disponible ? "#34D399" : "#F87171",
          };
        });
        setMarkedDates(marked);
      }
    } catch (error) {
      console.error("Error cargando disponibilidad:", error);
    }
  };

  const programarNotificacion = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    const preferencia = await AsyncStorage.getItem('notificaciones_activas');
    if(status!=='granted' || preferencia !== 'true'){
        Alert.alert('No tienes permisos para recibir notificaciones');
        return;
    }

    const trigger = new Date(Date.now() +1000);

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Citas",
                body: "Se creó la cita exitosamente."
            },
            trigger,
        });
        Alert.alert('Notificación programada correctamente'); 
    } catch (error) {
        Alert.alert('Error al programar la notificación');
    }
  }

  const handleDayPress = (day) => {
    setFecha_cita(day.dateString);
    setShowCalendar(false);
  };

  const handleGuardar = async () => {
    if (isMedico() && !esEdicion) {
      Alert.alert("Error", "Los médicos no pueden crear citas");
      return;
    }

    if (!Fecha_cita || !Hora || !idPaciente || !idMedico || !idResepcionista || !Estado) {
      Alert.alert("Error", "Por favor, completa todos los campos obligatorios.");
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
        Alert.alert("Éxito", esEdicion ? "Cita actualizada correctamente" : "Cita creada exitosamente");
        await programarNotificacion();
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#E9FDF3" }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Cita Médica" : "Nueva Cita Médica"}
        </Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Text style={{ color: Fecha_cita ? "#111827" : "#9CA3AF" }}>
            {Fecha_cita || "Seleccionar Fecha"}
          </Text>
        </TouchableOpacity>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              minDate={new Date().toISOString().split("T")[0]}
              theme={{
                selectedDayBackgroundColor: "#10B981",
                todayTextColor: "#059669",
                arrowColor: "#059669",
                monthTextColor: "#047857",
                textSectionTitleColor: "#34D399",
              }}
            />
          </View>
        )}

        <TextInput style={styles.input} placeholder="Hora (HH:MM)" value={Hora} onChangeText={setHora} />

        <SearchablePicker
          data={pacientes}
          value={idPaciente}
          onValueChange={setidPaciente}
          placeholder="Seleccionar Paciente"
          searchPlaceholder="Buscar paciente por nombre o ID..."
          loading={loadingPacientes}
          error={errorPacientes}
        />

        <SearchablePicker
          data={medicos}
          value={idMedico}
          onValueChange={setidMedico}
          placeholder="Seleccionar Médico"
          searchPlaceholder="Buscar médico por nombre o ID..."
          loading={loadingMedicos}
          error={errorMedicos}
        />

        <SearchablePicker
          data={recepcionistas}
          value={idResepcionista}
          onValueChange={setidResepcionista}
          placeholder="Seleccionar Recepcionista"
          searchPlaceholder="Buscar recepcionista por nombre o ID..."
          loading={loadingRecepcionistas}
          error={errorRecepcionistas}
        />

        <SearchablePicker
          data={estadosCita}
          value={Estado}
          onValueChange={setEstado}
          placeholder="Seleccionar Estado de la Cita"
          searchPlaceholder="Buscar estado..."
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
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    overflow: "hidden",
    elevation: 3,
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
