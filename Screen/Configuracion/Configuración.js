import { View, Text, Alert, StyleSheet, Switch, TouchableOpacity, Button } from "react-native";
import BottonComponent from "../../componentes/BottoComponent";
import { logoutUser } from "../../Src/Servicios/AuthService";
import { useUser } from "../../Src/Contexts/UserContext";
import { useTheme } from "../../Src/Contexts/ThemeContext";
import React, { useState, useEffect, useCallback } from "react";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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

    //cons notificaciones 
    const [permisosNotificaciones, setPermisoNotificaciones] = useState(false); // estado inicial falso 
    const [Loading, setLoading] = useState(true);

    const checkPermisos = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        const preferencia = await AsyncStorage.getItem('notificaciones_activas');
        setPermisoNotificaciones(status === 'granted' && preferencia === 'true'); //si se dan permisos y esta activa se muestra la notificación
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
        if(valor){
            const { status } =await Notifications.requestPermissionsAsync();
            if(status === 'granted'){
                await AsyncStorage.setItem('notificaciones_activas', 'true');
                setPermisoNotificaciones(true);
                Alert.alert('Permiso concedido');
            }else{
                await AsyncStorage.setItem('notificaciones_activas', 'false');
                setPermisoNotificaciones(false);
                Alert.alert('Permiso denegado');
            }
        }else{
            await AsyncStorage.setItem('notificaciones_activas', 'false');
                setPermisoNotificaciones(false);
                Alert.alert('Notificaciones desactivadas'); 
        }
    }

    const programarNotificacion = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        const preferencia = await AsyncStorage.getItem('notificaciones_activas');
        if(status!=='granted' || preferencia !== 'true'){
            Alert.alert('No tienes permisos para recibir notificaciones');
            return;
        }

        const trigger = new Date(Date.now() + 2 * 60 * 1000); //2 minutos apartir de ahora 

        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Notificaciónn programada ",
                    body: 'Esta es una notificacion programada para dos minutos despue.  '
                },
                trigger,
            });
            Alert.alert('notificación programada para 2 minutos despues'); 
        } catch (error) {
            Alert.alert('Error al programar la notificación');
        }
    }


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

            {/*Notificaciones */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{ fontSize: 18, marginBottom: 10}}> 
                    Notificaciones: {permisosNotificaciones ?'Activadas' : 'Desactivadas'} 
                    </Text>
                <Switch 
                value={permisosNotificaciones} 
                onValueChange={toggleSwitch} 
                />
                <Button title="Programar Notificación en 2 minuntos"onPress={programarNotificacion}/>
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
    programarButton: {
        marginTop: 15,
        backgroundColor: "#0A74DA",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    programarText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});








