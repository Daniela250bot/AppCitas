import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarConsultorios, eliminarConsultorio } from "../../Src/Servicios/ConsultoriosService";
import { useNavigation } from "@react-navigation/native";
import ConsultorioCard from "../../componentes/ConsultorioCard";
import { useEffect, useState } from "react";

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
        Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar el consultorio");
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConsultorioCard
            consultorio={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate("DetalleConsultorio", { consultorio: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Consultorios Registrados.</Text>}
      />

      <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBotton}>+ Nuevo Consultorio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#0a18d6ff",
    padding: 16,
    borderRadius: 30,
    margin: 16,
    alignItems: "center",
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
