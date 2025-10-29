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

    // Especialidades: Admin, Médico, Recepcionista
    if (isAdmin() || isMedico() || isRecepcionista()) {
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

    // Recepcionistas: Admin, Recepcionista
    if (isAdmin() || isRecepcionista()) {
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
      {/* ============ ENCABEZADO ============ */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏥 Clinica </Text>
         <Text style={styles.headerTitle}>  SALUDVITAL</Text>
        <Text style={styles.headerSubtitle}> Elige una categoría</Text>
      </View>

      {/* ============ LISTA DE OPCIONES ============ */}
      <View style={styles.listContainer}>{getAvailableCards()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF0F9",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0,
    alignItems: "center",
    borderBottomColor: "#bae6fd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#1d4ed8",
    marginTop: 6,
    textAlign: "center",
    fontStyle: "italic",
  },
  listContainer: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 14,
    gap: 12,
  },
});
