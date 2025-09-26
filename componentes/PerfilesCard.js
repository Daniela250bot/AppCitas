// PerfilesCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PerfilesCard() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Card - Editar Perfil */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("EditarPerfil")}
            >
                <Text style={styles.cardTitle}>Editar Perfil</Text>
                <Text style={styles.cardText}>Modifica tu nombre, correo, etc.</Text>
            </TouchableOpacity>

            {/* Card - Cambiar Contraseña */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("CambiarContraseña")}
            >
                <Text style={styles.cardTitle}>Cambiar Contraseña</Text>
                <Text style={styles.cardText}>Actualiza tu contraseña de acceso.</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#1E90FF",
    },
    cardText: {
        fontSize: 14,
        color: "#555",
    },
});
