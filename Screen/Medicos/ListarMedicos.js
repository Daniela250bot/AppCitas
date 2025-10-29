import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarMedicos, eliminarMedico } from "../../Src/Servicios/MedicosService";
import { useNavigation } from "@react-navigation/native";
import MedicosCard from "../../componentes/MedicosCard";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Src/Contexts/UserContext";
import { Ionicons } from "@expo/vector-icons"; // 🔹 Íconos médicos

export default function ListarMedicos() {
  const [medicos, setMedicos] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { isMedico, isRecepcionista, isAdmin } = useContext(UserContext);

  const handleMedicos = async () => {
    setLoading(true);
    try {
      const result = await listarMedicos();
      if (result.success) {
        setMedicos(result.data || []);
      } else {
        Alert.alert("Error", JSON.stringify(result.message) || "No se pudieron cargar los médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleMedicos);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (medico) => {
    navigation.navigate("EditarMedicos", { medico });
  };

  const handleCrear = () => {
    navigation.navigate("EditarMedicos");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarMedico(id);
              if (result.success) {
                handleMedicos();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el médico");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el médico");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0077b6" />
        <Text style={{ color: "#0077b6", marginTop: 10 }}>Cargando médicos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👨‍⚕️ Lista de Médicos</Text>

      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <MedicosCard
              medico={item}
              onEdit={(isRecepcionista() || isAdmin()) ? () => handleEditar(item) : null}
              onDelete={(isRecepcionista() || isAdmin()) ? () => handleEliminar(item.id) : null}
              onPress={() => navigation.navigate("DetalleMedico", { medico: item })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Médicos Registrados.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {(isRecepcionista() || isAdmin()) && (
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Ionicons name="person-add-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.textBotton}>Nuevo Médico</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F9FF", // fondo azul médico
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 45,
    marginBottom: 10,
    color: "#0C4A6E",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#64748B",
    fontStyle: "italic",
  },
  cardWrapper: {
    backgroundColor: "#FFFFFF",
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  botonCrear: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
    backgroundColor: "#0284C7", // azul profesional
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
