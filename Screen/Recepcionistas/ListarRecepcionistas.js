import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarRecepcionistas, eliminarRecepcionista } from "../../Src/Servicios/RecepcionistasService";
import { useNavigation } from "@react-navigation/native";
import RecepcionistasCard from "../../componentes/RecepcionistasCard"; 
import { useEffect, useState } from "react";


export default function ListarRecepcionistas() {
  const [recepcionistas, setRecepcionistas] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRecepcionistas = async () => {
    setLoading(true);
    try {
      const result = await listarRecepcionistas();
      if (result.success) {
        let sortedData = (result.data || []).sort((a, b) => a.Nombre.localeCompare(b.Nombre) || a.id - b.id);
        setRecepcionistas(sortedData);
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
       <Text style={styles.countText}>Total de Recepcionistas: {recepcionistas.length}</Text>
       <FlatList
         data={recepcionistas}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
           <RecepcionistasCard
             recepcionista={item}
             onEdit={() => handleEditar(item)}
             onDelete={() => handleEliminar(item.id)}
             onPress={() => navigation.navigate("DetalleRecepcionista", { recepcionista: item })}
           />
         )}
         ListEmptyComponent={<Text style={styles.empty}>No hay Recepcionistas Registrados.</Text>}
       />

       <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
         <Text style={styles.textBotton}>+ Nuevo Recepcionista</Text>
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
   countText: {
     textAlign: "center",
     fontSize: 18,
     fontWeight: "bold",
     color: "#333",
     margin: 10,
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
