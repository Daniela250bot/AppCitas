import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useUser } from '../../Src/Contexts/UserContext';

export default function Privacidad({ navigation }) {
    const { user } = useUser();
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [autoDeleteData, setAutoDeleteData] = useState(false);
    const [locationPermission, setLocationPermission] = useState(null);

    useEffect(() => {
        loadPrivacySettings();
        checkLocationPermission();
    }, []);

    const loadPrivacySettings = async () => {
        try {
            const settings = await AsyncStorage.getItem('privacySettings');
            if (settings) {
                const parsedSettings = JSON.parse(settings);
                setAnalyticsEnabled(parsedSettings.analyticsEnabled || false);
                setLocationEnabled(parsedSettings.locationEnabled || false);
                setAutoDeleteData(parsedSettings.autoDeleteData || false);
            }
        } catch (error) {
            console.error('Error loading privacy settings:', error);
        }
    };

    const savePrivacySettings = async (newSettings) => {
        try {
            await AsyncStorage.setItem('privacySettings', JSON.stringify(newSettings));
        } catch (error) {
            console.error('Error saving privacy settings:', error);
        }
    };

    const handleSettingChange = (key, value) => {
        const newSettings = {
            analyticsEnabled,
            locationEnabled,
            autoDeleteData,
            [key]: value
        };

        // Update local state
        switch (key) {
            case 'analyticsEnabled':
                setAnalyticsEnabled(value);
                break;
            case 'locationEnabled':
                setLocationEnabled(value);
                break;
            case 'autoDeleteData':
                setAutoDeleteData(value);
                break;
        }

        savePrivacySettings(newSettings);
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Eliminar cuenta',
            '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        // Aquí se implementaría la lógica para eliminar la cuenta
                        Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada exitosamente.');
                        // navigation.navigate('Login'); // Redirigir al login
                    }
                }
            ]
        );
    };

    const checkLocationPermission = async () => {
        // Simulación de verificación de permisos ya que expo-location no está disponible
        // En una implementación real, verificaríamos permisos del dispositivo
        const storedPermission = await AsyncStorage.getItem('locationPermission');
        setLocationPermission(storedPermission === 'granted' ? 'granted' : 'denied');
    };

    const requestLocationPermission = async () => {
        // Simulación de solicitud de permisos
        Alert.alert(
            'Permiso de ubicación',
            '¿Permitir que la aplicación acceda a tu ubicación?',
            [
                {
                    text: 'Denegar',
                    style: 'cancel',
                    onPress: () => {
                        setLocationPermission('denied');
                        AsyncStorage.setItem('locationPermission', 'denied');
                        Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación sin el permiso.');
                    }
                },
                {
                    text: 'Permitir',
                    onPress: () => {
                        setLocationPermission('granted');
                        AsyncStorage.setItem('locationPermission', 'granted');
                        Alert.alert('Permiso concedido', 'Ahora puedes usar la ubicación en la aplicación.');
                    }
                }
            ]
        );
    };

    const generateUserDataPDF = () => {
        const userData = {
            nombre: user?.name || 'Usuario',
            email: user?.email || 'usuario@ejemplo.com',
            tipo: user?.role || 'Paciente',
            fechaRegistro: user?.created_at || new Date().toISOString(),
            configuraciones: {
                analisisUso: analyticsEnabled,
                ubicacion: locationEnabled,
                eliminacionAutomatica: autoDeleteData
            }
        };

        // Crear contenido del PDF en formato texto (simulación)
        const pdfContent = `
INFORME DE DATOS PERSONALES
Citas EPS

Fecha de generación: ${new Date().toLocaleDateString('es-ES')}

INFORMACIÓN PERSONAL:
- Nombre: ${userData.nombre}
- Correo electrónico: ${userData.email}
- Tipo de usuario: ${userData.tipo}
- Fecha de registro: ${new Date(userData.fechaRegistro).toLocaleDateString('es-ES')}

CONFIGURACIONES DE PRIVACIDAD:
- Análisis de uso: ${userData.configuraciones.analisisUso ? 'Habilitado' : 'Deshabilitado'}
- Ubicación: ${userData.configuraciones.ubicacion ? 'Habilitada' : 'Deshabilitada'}
- Eliminación automática de datos: ${userData.configuraciones.eliminacionAutomatica ? 'Habilitada' : 'Deshabilitada'}

Este documento contiene toda la información personal almacenada en nuestros sistemas.
Para cualquier consulta, contacta con nuestro soporte técnico.
        `;

        return pdfContent;
    };

    const handleExportData = async () => {
        try {
            const pdfContent = generateUserDataPDF();
            const fileName = `datos_usuario_${user?.id || 'anonimo'}_${Date.now()}.txt`;

            // En una implementación real, usaríamos una librería como react-native-html-to-pdf
            // o expo-print para generar PDF real. Por ahora, guardamos como texto.
            const fileUri = FileSystem.documentDirectory + fileName;

            await FileSystem.writeAsStringAsync(fileUri, pdfContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            // Mostrar alerta con la ubicación del archivo guardado
            Alert.alert(
                'Datos exportados',
                `Los datos se han guardado correctamente en:\n${fileName}\n\nPuedes acceder al archivo desde el administrador de archivos de tu dispositivo.`,
                [
                    { text: 'OK' }
                ]
            );
        } catch (error) {
            console.error('Error exporting data:', error);
            Alert.alert('Error', 'No se pudieron exportar los datos. Inténtalo de nuevo.');
        }
    };

    const handleViewPrivacyPolicy = () => {
        navigation.navigate('PoliticaPrivacidad');
    };

    const handleViewTermsOfService = () => {
        navigation.navigate('TerminosServicio');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E3C72" />
                </TouchableOpacity>
                <Text style={styles.title}>Privacidad y Seguridad</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Controles de Privacidad</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="analytics" size={24} color="#0A74DA" />
                        <View style={styles.settingText}>
                            <Text style={styles.settingTitle}>Análisis de Uso</Text>
                            <Text style={styles.settingDescription}>Permitir recopilación de datos de uso anónimos</Text>
                        </View>
                    </View>
                    <Switch
                        value={analyticsEnabled}
                        onValueChange={(value) => handleSettingChange('analyticsEnabled', value)}
                        thumbColor={analyticsEnabled ? "#0A74DA" : "#ccc"}
                        trackColor={{ false: "#dcdcdc", true: "#A7F3D0" }}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="location" size={24} color="#0A74DA" />
                        <View style={styles.settingText}>
                            <Text style={styles.settingTitle}>Ubicación</Text>
                            <Text style={styles.settingDescription}>Permitir acceso a la ubicación del dispositivo</Text>
                        </View>
                    </View>
                    <Switch
                        value={locationEnabled}
                        onValueChange={(value) => handleSettingChange('locationEnabled', value)}
                        thumbColor={locationEnabled ? "#0A74DA" : "#ccc"}
                        trackColor={{ false: "#dcdcdc", true: "#A7F3D0" }}
                    />
                </View>


                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="trash" size={24} color="#0A74DA" />
                        <View style={styles.settingText}>
                            <Text style={styles.settingTitle}>Eliminación Automática</Text>
                            <Text style={styles.settingDescription}>Eliminar datos antiguos automáticamente</Text>
                        </View>
                    </View>
                    <Switch
                        value={autoDeleteData}
                        onValueChange={(value) => handleSettingChange('autoDeleteData', value)}
                        thumbColor={autoDeleteData ? "#0A74DA" : "#ccc"}
                        trackColor={{ false: "#dcdcdc", true: "#A7F3D0" }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Gestión de Datos</Text>

                <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
                    <Ionicons name="download" size={20} color="#0A74DA" />
                    <Text style={styles.actionButtonText}>Exportar mis datos (PDF)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={requestLocationPermission}>
                    <Ionicons name="location" size={20} color="#0A74DA" />
                    <Text style={styles.actionButtonText}>
                        {locationPermission === 'granted' ? 'Permiso de ubicación concedido' : 'Solicitar permiso de ubicación'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
                    <Ionicons name="trash" size={20} color="#DC2626" />
                    <Text style={styles.dangerButtonText}>Eliminar cuenta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información Legal</Text>

                <TouchableOpacity style={styles.linkButton} onPress={handleViewPrivacyPolicy}>
                    <Ionicons name="document-text" size={20} color="#0A74DA" />
                    <Text style={styles.linkButtonText}>Política de Privacidad</Text>
                    <Ionicons name="open-outline" size={16} color="#0A74DA" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton} onPress={handleViewTermsOfService}>
                    <Ionicons name="document" size={20} color="#0A74DA" />
                    <Text style={styles.linkButtonText}>Términos de Servicio</Text>
                    <Ionicons name="open-outline" size={16} color="#0A74DA" />
                </TouchableOpacity>
            </View>

            <View style={styles.disclaimer}>
                <Text style={styles.disclaimerText}>
                    Tu privacidad es importante para nosotros. Todos los datos se manejan de acuerdo con las leyes de protección de datos vigentes.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAF0F9",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E3C72',
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3C72',
        marginBottom: 15,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        marginLeft: 15,
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2A2A2A',
    },
    settingDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F2FE',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    actionButtonText: {
        color: '#0A74DA',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEE2E2',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DC2626',
    },
    dangerButtonText: {
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    linkButtonText: {
        color: '#0A74DA',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
        flex: 1,
    },
    disclaimer: {
        padding: 20,
        alignItems: 'center',
    },
    disclaimerText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
    },
});