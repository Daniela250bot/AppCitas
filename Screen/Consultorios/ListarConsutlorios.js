import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarConsultorios, eliminarConsultorio } from "../../Src/Servicios/ConsultoriosService";
import { useNavigation } from "@react-navigation/native";
import ConsultorioCard from "../../componentes/ConsultorioCard";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // 🔹 Importar íconos médicos

export default function ListarConsultorios() {
  const [consultorios, setConsultorios] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleConsultorios = async () => {
    setLoading(true);
    try {
      const result = await listarConsultorios();
      if (result.success) {
        setConsultorios(result.data || []);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los consultorios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los consultorios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleConsultorios);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (consultorio) => {
    navigation.navigate("EditarConsultorio", { consultorio });
  };

  const handleCrear = () => {
    navigation.navigate("EditarConsultorio");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarConsultorio(id);
              if (result.success) {
                handleConsultorios();
              } else {
                Alert.alert("Error", JSON.stringify(result.message) || "No se pudo eliminar el consultorio");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el consultorio");
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
        <Text style={{ color: "#0077b6", marginTop: 10 }}>Cargando consultorios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado moderno con ícono médico */}
      <View style={styles.headerContainer}>
        <Ionicons name="business-outline" size={40} color="#0284C7" style={{ marginBottom: 6 }} />
        <Text style={styles.header}>🏥 Lista de Consultorios</Text>
        <View style={styles.headerLine} />
      </View>

      {/* 🔹 Lista de consultorios */}
      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ConsultorioCard
              consultorio={item}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item.id)}
              onPress={() => navigation.navigate("DetalleConsultorio", { consultorio: item })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Consultorios Registrados.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* 🔹 Botón flotante redondeado */}
      <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Ionicons name="add-circle-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.textBotton}>Nuevo Consultorio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F9FF", // Fondo azul médico claro
    paddingHorizontal: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 45,
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0C4A6E",
    textAlign: "center",
  },
  headerLine: {
    width: 120,
    height: 3,
    backgroundColor: "#0284C7",
    borderRadius: 10,
    marginTop: 6,
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
    backgroundColor: "#0284C7",
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
