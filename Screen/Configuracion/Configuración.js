import { View, Text, Alert, StyleSheet, Switch, TouchableOpacity } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { logoutUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";
import { useTheme } from "../../Src/Contexts/ThemeContext";
import React, { useState } from "react";

export default function Configuracion({ navigation }) {
    const { updateUser } = useUser();
    const { themeName, toggleTheme } = useTheme();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleNotificationsToggle = (value) => {
        setNotificationsEnabled(value);
    };

    const handleLogout = async () => {
        Alert.alert("Cerrar Sesión", "¿Estás seguro de que quieres cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Cerrar Sesión",
                style: "destructive",
                onPress: async () => {
                    const result = await logoutUser();
                    if (result.success) {
                        updateUser(null);
                    } else {
                        Alert.alert("Error", "No se pudo cerrar sesión");
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚙️ Configuración</Text>

            {/* Card Tema */}
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Tema</Text>
                <View style={styles.themeButtons}>
                    <TouchableOpacity
                        style={[styles.themeButton, themeName === "light" && styles.activeTheme]}
                        onPress={() => toggleTheme("light")}
                    >
                        <Text style={[styles.themeText, themeName === "light" && styles.activeThemeText]}>Claro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.themeButton, themeName === "dark" && styles.activeTheme]}
                        onPress={() => toggleTheme("dark")}
                    >
                        <Text style={[styles.themeText, themeName === "dark" && styles.activeThemeText]}>Oscuro</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Card Notificaciones */}
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Notificaciones</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsToggle}
                    trackColor={{ false: "#ccc", true: "#34D399" }}
                    thumbColor={notificationsEnabled ? "#059669" : "#f4f3f4"}
                />
            </View>

            <BottonComponent
                title="Cerrar Sesión"
                onPress={handleLogout}
                style={styles.logoutButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F5F9FF",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0A74DA",
        marginBottom: 25,
        textAlign: "center",
    },
    settingCard: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    settingText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        textAlign: "center",
    },
    themeButtons: {
        flexDirection: 'row',
    },
    themeButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0A74DA',
        minWidth: 90,
        alignItems: "center",
    },
    activeTheme: {
        backgroundColor: '#0A74DA',
    },
    activeThemeText: {
        color: "#fff",
        fontWeight: "bold",
    },
    themeText: {
        color: '#0A74DA',
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#EF4444",
        width: "70%",
        borderRadius: 10,
    },
});
