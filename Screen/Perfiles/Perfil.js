import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../componentes/BottoComponent";
import api from "../../Src/Servicios/Conexion";
import * as ImagePicker from 'expo-image-picker';

export default function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [imageUri, setImageUri] = useState(null);

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

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {usuario ? (
                <>
                    <Text style={styles.title}>Perfil de usuario</Text>

                    {/* Imagen de perfil o ícono por defecto */}
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.defaultProfile}>
                            <Text style={styles.defaultIcon}>👤</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
                    </TouchableOpacity>

                    {/* Tarjeta con datos */}
                    <View style={styles.card}>
                        <Text style={styles.label}>Nombre: {usuario.user.name || "No disponible"}</Text>
                        <Text style={styles.label}>Correo: {usuario.user.email || "No disponible"}</Text>
                    </View>
                </>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.errorText}>No se encontró información del usuario</Text>
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
        backgroundColor: "#F5F9FF",
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0A74DA",
        textAlign: "center",
    },
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: "#333",
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: "#fff",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#0A74DA",
    },
    defaultProfile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#0A74DA",
    },
    defaultIcon: {
        fontSize: 50,
        color: "#666",
    },
    button: {
        backgroundColor: '#0A74DA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold",
    },
});
