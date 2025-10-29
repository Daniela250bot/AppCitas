import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet,
  Image 
} from "react-native";
import { listarPacientes, eliminarPaciente } from "../../Src/Servicios/PacienteService";
import { useNavigation } from "@react-navigation/native";
import PacientesCard from "../../componentes/PacientesCard";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Src/Contexts/UserContext";

export default function ListarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { isMedico } = useContext(UserContext);

  const handlePacientes = async () => {
    setLoading(true);
    try {
      const result = await listarPacientes();
      if (result.success) {
        setPacientes(result.data || []);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handlePacientes);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (paciente) => {
    navigation.navigate("EditarPaciente", { paciente });
  };

  const handleCrear = () => {
    navigation.navigate("EditarPaciente");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPaciente(id);
              if (result.success) {
                handlePacientes();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el paciente");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el paciente");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con logo médico */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Gestión de Pacientes</Text>
      </View>

      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PacientesCard
            paciente={item}
            onEdit={() => handleEditar(item)}
            onDelete={isMedico() ? null : () => handleEliminar(item.id)}
            onPress={() => navigation.navigate("DetallePaciente", { paciente: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Pacientes Registrados.</Text>}
      />

      {!isMedico() && (
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textBotton}>+ Nuevo Paciente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FA",
  },
  header: {
    alignItems: "center",
    marginVertical: 25,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A18D6",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  botonCrear: {
    backgroundColor: "#0A18D6",
    paddingVertical: 14,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
