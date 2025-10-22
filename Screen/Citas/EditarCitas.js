import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
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
        Alert.alert("Éxito", esEdicion ? "Cita actualizada correctamente" : "Cita creada exitosamente");
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
    <ScrollView>
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
                selectedDayBackgroundColor: "#34D399",
                todayTextColor: "#10B981",
                arrowColor: "#10B981",
              }}
            />
          </View>
        )}

        <TextInput style={styles.input} placeholder="Hora (HH:MM)" value={Hora} onChangeText={setHora} />
        <TextInput style={styles.input} placeholder="ID Paciente" value={idPaciente} onChangeText={setidPaciente} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="ID Médico" value={idMedico} onChangeText={setidMedico} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="ID Recepcionista" value={idResepcionista} onChangeText={setidResepcionista} keyboardType="numeric" editable={esEdicion || user?.role !== "idRecepcionista"} />
        <TextInput style={styles.input} placeholder="Estado de la cita" value={Estado} onChangeText={setEstado} />

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
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#10B981",
    shadowColor: "#10B981",
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    marginLeft: 8,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
