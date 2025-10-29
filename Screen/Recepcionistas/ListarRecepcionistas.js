import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Animated 
} from "react-native";
import { listarRecepcionistas, eliminarRecepcionista } from "../../Src/Servicios/RecepcionistasService";
import { useNavigation } from "@react-navigation/native";
import RecepcionistasCard from "../../componentes/RecepcionistasCard"; 
import { useEffect, useState, useRef } from "react";

export default function ListarRecepcionistas() {
  const [recepcionistas, setRecepcionistas] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleRecepcionistas = async () => {
    setLoading(true);
    try {
      const result = await listarRecepcionistas();
      if (result.success) {
        let sortedData = (result.data || []).sort(
          (a, b) => a.Nombre.localeCompare(b.Nombre) || a.id - b.id
        );
        setRecepcionistas(sortedData);

        // Animación al mostrar la lista
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        Alert.alert("Error", JSON.stringify(result.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los recepcionistas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleRecepcionistas);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (recepcionista) => {
    navigation.navigate("EditarRecepcionista", { recepcionista });
  };

  const handleCrear = () => {
    navigation.navigate("EditarRecepcionista");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este recepcionista?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarRecepcionista(id);
              if (result.success) {
                handleRecepcionistas();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el recepcionista");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el recepcionista");
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
      {/* Encabezado */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Gestión de Recepcionistas</Text>
      </View>

      {/* Contador */}
      <Text style={styles.countText}>
        Total de Recepcionistas: {recepcionistas.length}
      </Text>

      {/* Lista animada */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={recepcionistas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecepcionistasCard
              recepcionista={item}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item.id)}
              onPress={() =>
                navigation.navigate("DetalleRecepcionista", { recepcionista: item })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay Recepcionistas Registrados.</Text>
          }
        />
      </Animated.View>

      {/* Botón flotante */}
      <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBotton}>+ Nuevo Recepcionista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F6FB", // fondo tipo hospital
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0A18D6",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#0A18D6",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  botonCrear: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
    backgroundColor: "#0A18D6",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 6,
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
