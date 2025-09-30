import { ScrollView, StyleSheet, View, Text } from "react-native";
import CardComponents from "../../componentes/CardComponent";
import { useUser } from "../../Src/Contexts/UserContext";

export default function Inicio({ navigation }) {
  const { user, isAdmin, isMedico, isRecepcionista, isPaciente } = useUser();

  const getAvailableCards = () => {
    const cards = [];

    // Citas: Todos los roles
    cards.push(
      <CardComponents
        key="citas"
        tittle="Citas"
        description="Agendamiento de citas"
        icon="calendar-outline"
        color="#DBEAFE"
        onPress={() => navigation.navigate("CitasFlow")}
      />
    );

    // Médicos: Admin, Recepcionista
    if (isAdmin() || isRecepcionista()) {
      cards.push(
        <CardComponents
          key="medicos"
          tittle="Médicos"
          description="Control de médicos"
          icon="bandage-outline"
          color="#DCFCE7"
          onPress={() => navigation.navigate("MedicosFlow")}
        />
      );
    }

    // Pacientes: Admin, Recepcionista, Médico
    if (isAdmin() || isRecepcionista() || isMedico()) {
      cards.push(
        <CardComponents
          key="pacientes"
          tittle="Pacientes"
          description="Registro de pacientes"
          icon="people-circle-outline"
          color="#FEF9C3"
          onPress={() => navigation.navigate("PacientesFlow")}
        />
      );
    }

    // Consultorios: Admin, Recepcionista
    if (isAdmin() || isRecepcionista()) {
      cards.push(
        <CardComponents
          key="consultorios"
          tittle="Consultorios"
          description="Espacios médicos"
          icon="home-outline"
          color="#EDE9FE"
          onPress={() => navigation.navigate("ConsultoriosFlow")}
        />
      );
    }

    // Especialidades: Admin, Médico
    if (isAdmin() || isMedico()) {
      cards.push(
        <CardComponents
          key="especialidades"
          tittle="Especialidades"
          description="Áreas médicas"
          icon="fitness-outline"
          color="#FCE7F3"
          onPress={() => navigation.navigate("EspecialidadesFlow")}
        />
      );
    }

    // Recepcionistas: Admin
    if (isAdmin()) {
      cards.push(
        <CardComponents
          key="recepcionistas"
          tittle="Recepcionistas"
          description="Gestión del personal"
          icon="id-card-outline"
          color="#CFFAFE"
          onPress={() => navigation.navigate("RecepcionistasFlow")}
        />
      );
    }

    return cards;
  };

  return (
    <ScrollView style={styles.container}>
      {/* ============ ENCABEZADO CON COLOR CLARO ============ */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Salud+ Clínica</Text>
        <Text style={styles.headerSubtitle}>Elige una categoría</Text>
      </View>

      {/* ============ LISTA DE OPCIONES ============ */}
      <View style={styles.listContainer}>
        {getAvailableCards()}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 50,   // 🔹 más espacio arriba para que no quede pegado
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#E0F2FE", // color claro
    borderBottomWidth: 1,
    borderBottomColor: "#BAE6FD",
    alignItems: "center", // centra el contenido
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0C4A6E",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#0369A1",
    marginTop: 6,
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "column",
    paddingVertical: 10,
  },
});