import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../componentes/BottoComponent";
import api from "../../Src/Servicios/Conexion";

export default function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    Alert.alert("No se encontró el token de usuario, redirigiendo al login");
                    return;
                }

                const response = await api.get("/me");
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);

                if (error.isAuthError || error.shouldRedirectToLogin) {
                    console.log("Error de autenticación manejado por el interceptor, redirigiendo al Login");
                    return;
                }

                if (error.response) {
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data?.message || "Ocurrió un error al cargar el perfil"}`,
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                },
                            },
                        ]
                    );
                } else if (error.request) {
                    Alert.alert(
                        "Error de conexión",
                        "No se pudo conectar al servidor, verifica tu conexión a Internet.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                },
                            },
                        ]
                    );
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrió un error inesperado al cargar el perfil.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                },
                            },
                        ]
                    );
                }
            } finally {
                setCargando(false);
            }
        };

        cargarPerfil();
    }, []);

    return (
        <View style={styles.containerPerfil}>
            {/* Contenido del perfil */}
            {usuario ? (
                <>
                    <Text style={styles.title}>Perfil de usuario</Text>
                    <View style={styles.containerPerfil}>
                        <Text style={styles.label}>Nombre: {usuario.user.name || "No disponible"}</Text>
                        <Text style={styles.label}>Correo: {usuario.user.email || "No disponible"}</Text>
                    </View>
                </>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.containerPerfil}></Text>
                    <View style={styles.containerPerfil}>
                        <Text style={styles.errorText}></Text>
                    </View>
                </View>
            )}

            {/* Overlay con loader */}
            {cargando && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loaderText}>Cargando perfil...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerPerfil: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        color: "red",
        fontSize: 14,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)", // fondo negro semitransparente
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: "#fff",
    },
});
