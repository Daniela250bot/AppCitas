import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarMedicos, eliminarMedico } from "../../Src/Servicios/MedicosService";
import { useNavigation } from "@react-navigation/native";
import MedicosCard from "../../componentes/MedicosCard";
import { useEffect, useState } from "react";

export default function ListarMedicos() {
  const [medicos, setMedicos] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleMedicos = async () => {
    setLoading(true);
    try {
      const result = await listarMedicos();
      if (result.success) {
        setMedicos(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los médicos");
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
    navigation.navigate("EditarMedico", { medico });
  };

  const handleCrear = () => {
    navigation.navigate("CrearMedico");
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicosCard
            medico={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate("DetalleMedico", { medico: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Médicos Registrados.</Text>}
      />

      <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBotton}>+ Nuevo Médico</Text>
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
