import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarCitas, eliminarCita } from "../../Src/Servicios/CitasService";
import { useNavigation } from "@react-navigation/native";
import CitasCard from "../../componentes/CitasCard";
import { useEffect, useState } from "react";

export default function ListarCitas() {
  const [citas, setCitas] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCitas = async () => {
    setLoading(true);
    try {
      const result = await listarCitas();
      if (result.success) {
        setCitas(result.data || []);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las citas");
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
               Alert.alert("Error", JSON.stringify(result.message));
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CitasCard
            cita={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate("DetalleCita", { cita: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Citas Registradas.</Text>}
      />

      <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBotton}>+ Nueva Cita</Text>
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
