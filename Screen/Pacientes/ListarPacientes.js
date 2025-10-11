import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet} from "react-native";
import { listarPacientes, eliminarPaciente } from "../../Src/Servicios/PacienteService";
import { useNavigation } from "@react-navigation/native";
import PacientesCard from "../../componentes/PacientesCard";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Src/Contexts/UserContext";

export default function ListarPacientes (){
    const [pacientes, setPacientes] = useState([]);
    const navegation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { isMedico } = useContext(UserContext);


    const handlePacientes = async () =>{
      setLoading(true);
      try {
        const result = await listarPacientes();
        if (result.success) {
          setPacientes(result.data || []);
        }else{
          Alert.alert("Error ", result.message || "NO se pudieron cargar los pacientes");
        }
      } catch (error) {
        Alert.alert("Error ", "NO se pudieron cargar los pacientes");
      } finally{
        setLoading(false);
      }
    }

    useEffect(() => {
      const unsubscribe = navegation.addListener ('focus', handlePacientes);
      return unsubscribe;
    },[navegation]);


    const handleEditar = (paciente) =>{
      navegation.navigate("EditarPaciente", { paciente });
    }
    const handleCrear = () =>{
      navegation.navigate("EditarPaciente");
    }

    const handleEliminar = (id) =>{
      
      Alert.alert(
        "Confirmar Eliminacion",    
        "¿Estas seguro de eliminar este paciente?",
        [
          {text: "Cancelar", style: "cancel"},
          {text: "Eliminar", style: "destructive",
            onPress: async () =>{
              try {
                const result = await eliminarPaciente(id);
                if (result.success) {

                  handlePacientes();
                } else {
               Alert.alert("Error", JSON.stringify(result.message));
                }                 
              } catch (error) {
                Alert.alert("Error ", "No se pudo eliminar el paciente"); 
              }
            },
          },
        ]
      );
    }


    if (loading) {
      return (
        <View style={styles.centered}>  
        <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }


    return (
      <View style={{flex: 1 }}>
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <PacientesCard
              paciente={item}
              onEdit={isMedico() ? null : () => handleEditar(item)}
              onDelete={isMedico() ? null : () => handleEliminar(item.id)}
              onPress={() => navegation.navigate("DetallePaciente", { paciente: item })} // abre detalle
            />

          )}
          ListEmptyComponent={<Text style={styles.empty}> No hay Pacientes Registrados.</Text>}
        />

        {!isMedico() && (
          <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
            <Text style={styles.textBotton}>+Nuevo Paciente</Text>
          </TouchableOpacity>
        )}
      </View>

    );
    
} 


const styles = StyleSheet.create({
  centered:{
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
  },
  empty:{
    textAlign: "center",  
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  botonCrear:{
    backgroundColor: "#0a18d6ff",
    padding: 16,
    borderRadius: 30,
    margin: 16,
    alignItems: "center",
  },
  textBotton:{
    color: "#fff",
    fontSize: 18, 
    fontWeight: "bold",
  },
});