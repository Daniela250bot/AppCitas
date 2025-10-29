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
                Alert.alert("Error", "Ocurrió un error al cargar el perfil. Intenta nuevamente.");
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
            const uri = result.assets[0].uri;
            setImageUri(uri);
            await uploadImage(uri);
        }
    };

    const uploadImage = async (uri) => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                Alert.alert("Error", "No se encontró el token de usuario");
                return;
            }

            const formData = new FormData();
            const fileName = uri.split('/').pop();
            const fileType = fileName.split('.').pop();

            formData.append('foto_perfil', {
                uri: uri,
                name: fileName,
                type: `image/${fileType}`,
            });

            const response = await api.post('/usuario/foto-perfil', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                Alert.alert("Éxito", "Foto de perfil actualizada correctamente");
                // Recargar perfil para mostrar la nueva imagen
                const perfilResponse = await api.get("/me");
                setUsuario(perfilResponse.data);
            } else {
                Alert.alert("Error", response.data.message || "Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error al subir imagen:", error);
            Alert.alert("Error", "Ocurrió un error al subir la imagen. Intenta nuevamente.");
        }
    };

    return (
        <View style={styles.container}>
            {usuario ? (
                <>
                    <Text style={styles.title}>Mi Perfil</Text>

                    {/* Imagen de perfil o ícono por defecto */}
                    {usuario?.user?.foto_perfil ? (
                        <Image source={{ uri: `https://dinkly-uncompulsory-ma.ngrok-free.dev/storage/fotos-perfil/${usuario.user.foto_perfil}` }} style={styles.profileImage} />
                    ) : imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.defaultProfile}>
                            <Text style={styles.defaultIcon}>👤</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Cambiar foto</Text>
                    </TouchableOpacity>

                    {/* Tarjeta con datos */}
                    <View style={styles.card}>
                        <Text style={styles.label}>
                            <Text style={styles.labelBold}>Nombre: </Text>
                            {usuario.user.name || "No disponible"}
                        </Text>
                        <Text style={styles.label}>
                            <Text style={styles.labelBold}>Correo: </Text>
                            {usuario.user.email || "No disponible"}
                        </Text>
                        <Text style={styles.roleLabel}>
                            {usuario.user.role || "Rol no disponible"}
                        </Text>
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
        backgroundColor: "#ECF3FF",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 20,
        color: "#1E3A8A",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    card: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 25,
        marginTop: 20,
        shadowColor: "#1E3A8A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        alignItems: "center",
    },
    label: {
        fontSize: 17,
        color: "#374151",
        marginBottom: 8,
        textAlign: "center",
    },
    labelBold: {
        fontWeight: "bold",
        color: "#1E40AF",
    },
    roleLabel: {
        fontSize: 16,
        marginTop: 12,
        color: "#1E3A8A",
        textAlign: "center",
        fontWeight: "700",
        backgroundColor: "#DBEAFE",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    errorText: {
        color: "#DC2626",
        fontSize: 15,
        marginTop: 10,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        marginBottom: 15,
        borderWidth: 4,
        borderColor: "#3B82F6",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    defaultProfile: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#3B82F6",
    },
    defaultIcon: {
        fontSize: 55,
        color: "#6B7280",
    },
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 0.5,
    },
});
