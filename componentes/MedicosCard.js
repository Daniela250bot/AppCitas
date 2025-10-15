import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MedicosCard({ medico, onEdit, onDelete, onPress }) {
   if (!medico) return null;

   const inicial = medico.Nombre ? medico.Nombre.charAt(0).toUpperCase() : "?";

  return (
    <Pressable
      style={styles.card}
      onPress={onPress} // 👉 al presionar abre DetalleMedico
    >
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.nombre}>
          {medico?.Nombre ?? "Sin nombre"} {medico?.Apellido ?? ""}
        </Text>

        <View style={styles.row}>
          <Ionicons name="card-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {medico?.Documento ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {medico?.Telefono ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={16} color="#555" />
          <Text style={styles.detalle}> {medico?.Email ?? "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="medkit-outline" size={16} color="#555" />
          <Text style={styles.detalle}> Especialidad: {medico?.especialidad?.Nombre ?? "N/A"}</Text>
        </View>


        <View style={styles.row}>
          <Ionicons name="business-outline" size={16} color="#555" />
          <Text style={styles.detalle}> Consultorio: {medico?.consultorio?.Nombre ?? "N/A"}</Text>
        </View>
      </View>

      {/* Botones Editar / Eliminar */}
      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <Pressable
              onPress={onEdit}
              style={({ pressed }) => [
                styles.button,
                styles.editBtn,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
            </Pressable>
          )}

          {onDelete && (
            <Pressable
              onPress={onDelete}
              style={({ pressed }) => [
                styles.button,
                styles.deleteBtn,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </Pressable>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9fbff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0a74da",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detalle: {
    fontSize: 14,
    color: "#444",
    marginLeft: 4,
  },
  actions: {
    flexDirection: "column",
    marginLeft: 8,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  editBtn: {
    backgroundColor: "#0a18d6",
  },
  deleteBtn: {
    backgroundColor: "#f20c0c",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
