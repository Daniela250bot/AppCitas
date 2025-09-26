import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BottonComponent({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4d7295ffff", // Azul moderno
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 25, // 👈 Más redondeado
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#554386de",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});