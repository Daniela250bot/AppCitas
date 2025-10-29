import React, { useState } from "react";
import {View,TextInput,TouchableOpacity, Text, StyleSheet, ScrollView,KeyboardAvoidingView, Platform, Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearPaciente, editarPaciente } from "../../Src/Servicios/PacienteService";

export default function EditarPaciente() {
  const navegation = useNavigation();
  const route = useRoute();

  const paciente = route.params ?.paciente;

  const [name, setName] = useState(paciente ? paciente.Nombre : "");
  const [apellido, setApellido] = useState(paciente ? paciente.Apellido : "");
  const [documento, setDocumento] = useState(paciente ? paciente.Documento : "");
  const [telefono, setTelefono] = useState(paciente ? paciente.Telefono : "");
  const [email, setEmail] = useState(paciente ? paciente.Email : "");
  const [fechaNacimiento, setFechaNacimiento] = useState(paciente ? paciente.Fecha_nacimiento : "");
  const [genero, setGenero] = useState(paciente ? paciente.Genero : "");
  const [rh, setRH] = useState(paciente ? paciente.RH : "");
  const [nacionalidad, setNacionalidad] = useState(paciente ? paciente.Nacionalidad : "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente; 

  const handleGuardar = async () => {
    if (!name || !apellido || !documento || !telefono || !email || !fechaNacimiento || !genero || !rh || !nacionalidad) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        const data = {
          name,
          apellido,
          documento,
          telefono,
          email,
          fechaNacimiento,
          genero,
          rh,
          nacionalidad,
        };
        // No incluir Password en edición para evitar cambios de contraseña
        console.log("Datos enviados para edición:", data); // Log para depuración
        result = await editarPaciente(paciente.id, data);
      } else {
         const data = {
          name,
          apellido,
          documento,
          telefono,
          email,
          fechaNacimiento,
          genero,
          rh,
          nacionalidad,
          password,
        };
        console.log("Datos enviados para creación:", data); // Log para depuración
        result = await crearPaciente(data);
      }
      if (result.success) {
        Alert.alert("Exito", esEdicion ? "Paciente actualizado" : "Paciente creado correctamente");
        navegation.goBack(); 
      } else {
       Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar el paciente");
       }
      
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el Paciente");
    }finally {
      setLoading(false);
    }
  }

  
  return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.headerTitle}> {esEdicion ? "Editar paciente" : "Nuevo Paciente "}</Text>

          {/* Formulario */}
        
            <TextInput
              style={styles.input}
              placeholder=" Nombre"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder=" Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
            <TextInput
              style={styles.input}
              placeholder=" Documento"
              value={documento}
              onChangeText={setDocumento}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder=" Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder=" Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder=" Fecha de nacimiento (YYYY-MM-DD)"
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
            />
            <TextInput
              style={styles.input}
              placeholder=" Género"
              value={genero}
              onChangeText={setGenero}
            />
            <TextInput
              style={styles.input}
              placeholder=" Grupo RH"
              value={rh}
              onChangeText={setRH}
            />
            <TextInput
              style={styles.input}
              placeholder=" Nacionalidad"
              value={nacionalidad}
              onChangeText={setNacionalidad}

            />
                {!esEdicion && (
                  <TextInput
                      style={styles.input}
                      placeholder=" ** Contraseña"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      editable={!loading}
                    />
                )}

              <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
                <Ionicons name="save-outline" size={22} color="#fff" />
                <Text style={styles.buttonText}> {esEdicion ? "Guardar Cambios" : "Crear Paciente"} </Text>
              </TouchableOpacity> 
              </View>

            </ScrollView> 
    )
  }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    elevation: 4,
  },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#110e0eff",
    marginTop: 10,
  },
  headerSubtitle: { fontSize: 14, color: "#E5E7EB", marginTop: 5 },
  form: { padding: 20 },
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