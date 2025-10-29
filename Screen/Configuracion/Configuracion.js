import { View, Text, Alert, StyleSheet, Switch, TouchableOpacity, Button, Image } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { logoutUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";
import React, { useState, useEffect, useCallback } from "react";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function Configuracion({ navigation }) {
    const { updateUser } = useUser();
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

    const [permisosNotificaciones, setPermisoNotificaciones] = useState(false);
    const [Loading, setLoading] = useState(true);

    const checkPermisos = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        const preferencia = await AsyncStorage.getItem('notificaciones_activas');
        setPermisoNotificaciones(status === 'granted' && preferencia === 'true');
        setLoading(false);
    };

    useEffect(() => {
        checkPermisos();
    }, []);

    useFocusEffect(
        useCallback(() => {
            checkPermisos();
        }, [])
    );

    const toggleSwitch = async (valor) => {
        if (valor) {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                await AsyncStorage.setItem('notificaciones_activas', 'true');
                setPermisoNotificaciones(true);
                Alert.alert('Permiso concedido');
            } else {
                await AsyncStorage.setItem('notificaciones_activas', 'false');
                setPermisoNotificaciones(false);
                Alert.alert('Permiso denegado');
            }
        } else {
            await AsyncStorage.setItem('notificaciones_activas', 'false');
            setPermisoNotificaciones(false);
            Alert.alert('Notificaciones desactivadas');
        }
    };

    const programarNotificacion = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        const preferencia = await AsyncStorage.getItem('notificaciones_activas');
        if (status !== 'granted' || preferencia !== 'true') {
            Alert.alert('No tienes permisos para recibir notificaciones');
            return;
        }

        const trigger = new Date(Date.now() + 2 * 60 * 1000);

        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Notificación programada 🩺",
                    body: 'Esta es una notificación programada para dos minutos después.',
                },
                trigger,
            });
            Alert.alert('Notificación programada para 2 minutos después');
        } catch (error) {
            Alert.alert('Error al programar la notificación');
        }
    };

    return (
        <View style={styles.container}>
            {/* Encabezado con ícono médico */}
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png" }}
                    style={styles.logo}
                />
                <Text style={styles.title}>Configuración General</Text>
                <Text style={styles.subtitle}>Personaliza tu experiencia en la app médica</Text>
            </View>


            {/* Notificaciones */}
            <View style={styles.notificationCard}>
                <Text style={styles.notificationText}>
                    Notificaciones: {permisosNotificaciones ? 'Activadas ✅' : 'Desactivadas ❌'}
                </Text>
                <Switch
                    value={permisosNotificaciones}
                    onValueChange={toggleSwitch}
                    thumbColor={permisosNotificaciones ? "#0A74DA" : "#ccc"}
                    trackColor={{ false: "#dcdcdc", true: "#A7F3D0" }}
                />
                <TouchableOpacity style={styles.programarButton} onPress={programarNotificacion}>
                    <Text style={styles.programarText}>Programar notificación en 2 minutos</Text>
                </TouchableOpacity>
            </View>

            {/* Opciones adicionales de configuración */}
            <View style={styles.additionalOptions}>
                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => navigation.navigate('AyudaSoporte')}
                >
                    <Ionicons name="help-circle" size={30} color="#0A74DA" />
                    <Text style={styles.optionTitle}>Ayuda y Soporte</Text>
                    <Text style={styles.optionDescription}>Obtén ayuda y contacta con soporte técnico</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => navigation.navigate('ConfiguracionAdicional')}
                >
                    <Ionicons name="settings" size={30} color="#0A74DA" />
                    <Text style={styles.optionTitle}>Configuración Adicional</Text>
                    <Text style={styles.optionDescription}>Personaliza tu experiencia en la app</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => navigation.navigate('Privacidad')}
                >
                    <Ionicons name="shield-checkmark" size={30} color="#0A74DA" />
                    <Text style={styles.optionTitle}>Privacidad y Seguridad</Text>
                    <Text style={styles.optionDescription}>Gestiona tu privacidad y datos personales</Text>
                </TouchableOpacity>
            </View>

            {/* Botón Cerrar Sesión (centrado y abajo) */}
            <View style={styles.logoutContainer}>
                <BottonComponent
                    title="Cerrar Sesión"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAF0F9",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    header: {
        alignItems: "center",
        marginTop: 50,
        marginBottom: 30,
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1E3C72",
    },
    subtitle: {
        fontSize: 14,
        color: "#4F6FA3",
        textAlign: "center",
        marginTop: 4,
    },
    notificationCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationText: {
        fontSize: 18,
        color: "#2A2A2A",
        marginBottom: 10,
    },
    programarButton: {
        marginTop: 15,
        backgroundColor: "#0A74DA",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    programarText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    logoutContainer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#DC2626",
        width: "70%",
        borderRadius: 10,
    },
    additionalOptions: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    optionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2A2A2A",
        marginTop: 10,
        marginBottom: 5,
    },
    optionDescription: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        lineHeight: 18,
    },
});
