import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarCitas, eliminarCita } from "../../Src/Servicios/CitasService";
import { useNavigation } from "@react-navigation/native";
import CitasCard from "../../componentes/CitasCard";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Src/Contexts/UserContext";
import { Ionicons } from "@expo/vector-icons"; // 🔹 Importar íconos

export default function ListarCitas() {
  const [citas, setCitas] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { isPaciente, isMedico } = useContext(UserContext);

  const handleCitas = async () => {
    setLoading(true);
    try {
      const result = await listarCitas();
      if (result.success) {
        setCitas(result.data || []);
      } else {
        let mensaje = result.message;
        if (typeof mensaje !== "string") {
          mensaje = JSON.stringify(mensaje);
        }
        Alert.alert("Error", mensaje || "No se pudieron cargar las citas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCitas);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (cita) => {
    navigation.navigate("EditarCitas", { cita });
  };

  const handleCrear = () => {
    navigation.navigate("EditarCitas");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarCita(id);
              if (result.success) {
                handleCitas();
              } else {
                let mensaje = result.message;
                if (typeof mensaje !== "string") {
                  mensaje = JSON.stringify(mensaje);
                }
                Alert.alert("Error", mensaje);
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la cita");
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
        <Text style={{ color: "#0077b6", marginTop: 10 }}>Cargando citas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🩺 Lista de Citas</Text>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CitasCard
              cita={item}
              onEdit={isPaciente() ? null : () => handleEditar(item)}
              onDelete={isPaciente() ? null : () => handleEliminar(item.id)}
              onPress={() => navigation.navigate("DetalleCita", { cita: item })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Citas Registradas.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {!isPaciente() && !isMedico() && (
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Ionicons name="medical-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.textBotton}>Nueva Cita</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F9FF", // azul claro médico
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
    backgroundColor: "#0284C7", // azul médico
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 40,
    flexDirection: "row", // 🔹 Ícono + texto
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
