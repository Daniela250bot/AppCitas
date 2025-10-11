import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarEspecialidades, eliminarEspecialidad } from "../../Src/Servicios/EspecialidadesService";
import { useNavigation } from "@react-navigation/native";
import EspecialidadesCard from "../../componentes/EspecialidadesCard";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Src/Contexts/UserContext";

export default function ListarEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { isMedico, isRecepcionista, isAdmin } = useContext(UserContext);

  const handleEspecialidades = async () => {
    setLoading(true);
    try {
      const result = await listarEspecialidades();
      if (result.success) {
        setEspecialidades(result.data || []);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleEspecialidades);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (especialidad) => {
    navigation.navigate("EditarEspecialidad", { especialidad });
  };

  const handleCrear = () => {
    navigation.navigate("EditarEspecialidad");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta especialidad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarEspecialidad(id);
              if (result.success) {
                handleEspecialidades();
              } else {
               Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar el consultorio");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la especialidad");
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
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EspecialidadesCard
            especialidad={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate("DetalleEspecialidad", { especialidad: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Especialidades Registradas.</Text>}
      />

      {(isRecepcionista() || isAdmin()) && (
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textBotton}>+ Nueva Especialidad</Text>
        </TouchableOpacity>
      )}
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
