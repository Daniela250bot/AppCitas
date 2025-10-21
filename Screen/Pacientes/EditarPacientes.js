import React, { useState } from "react";
import {View,TextInput,TouchableOpacity, Text, StyleSheet, ScrollView,KeyboardAvoidingView, Platform, Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearPaciente, editarPaciente } from "../../Src/Servicios/PacienteService";

export default function EditarPaciente() {
  const navegation = useNavigation();
  const route = useRoute();

  const paciente = route.params ?.paciente;

  const [Nombre, setNombre] = useState(paciente ? paciente.Nombre : "");
  const [Apellido, setApellido] = useState(paciente ? paciente.Apellido : "");
  const [Documento, setDocumento] = useState(paciente ? paciente.Documento : "");
  const [Telefono, setTelefono] = useState(paciente ? paciente.Telefono : "");
  const [Email, setEmail] = useState(paciente ? paciente.Email : "");
  const [Fecha_nacimiento, setFechaNacimiento] = useState(paciente ? paciente.Fecha_nacimiento : "");
  const [Genero, setGenero] = useState(paciente ? paciente.Genero : "");
  const [RH, setRH] = useState(paciente ? paciente.RH : "");
  const [Nacionalidad, setNacionalidad] = useState(paciente ? paciente.Nacionalidad : "");
  const [Password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente; 

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !Documento || !Telefono || !Email || !Fecha_nacimiento || !Genero || !RH || !Nacionalidad) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        const data = {
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Fecha_nacimiento,
          Genero,
          RH,
          Nacionalidad,
        };
        // No incluir Password en edición para evitar cambios de contraseña
        result = await editarPaciente(paciente.id, data);
      } else {
         result = await crearPaciente({
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Fecha_nacimiento,
          Genero,
          RH,
          Nacionalidad,
          Password,
        });
      }
      if (result.success) {
        Alert.alert("Exito", esEdicion ? "Paciente actualizado" : "Paciente creado correctamente");
        navegation.goBack(); 
      } else {
       Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar el médico");  
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
              value={Nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder=" Apellido"
              value={Apellido}
              onChangeText={setApellido}
            />
            <TextInput
              style={styles.input}
              placeholder=" Documento"
              value={Documento}
              onChangeText={setDocumento}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder=" Teléfono"
              value={Telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder=" Email"
              value={Email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder=" Fecha de nacimiento (YYYY-MM-DD)"
              value={Fecha_nacimiento}
              onChangeText={setFechaNacimiento}
            />
            <TextInput
              style={styles.input}
              placeholder=" Género"
              value={Genero}
              onChangeText={setGenero}
            />
            <TextInput
              style={styles.input}
              placeholder=" Grupo RH"
              value={RH}
              onChangeText={setRH}
            />
            <TextInput
              style={styles.input}
              placeholder=" Nacionalidad"
              value={Nacionalidad}
              onChangeText={setNacionalidad}

            />
                {!esEdicion && (
                  <TextInput
                      style={styles.input}
                      placeholder=" ** Contraseña"
                      secureTextEntry
                      value={Password}
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