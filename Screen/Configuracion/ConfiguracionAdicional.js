import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../Src/Contexts/ThemeContext';

export default function ConfiguracionAdicional({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const [autoSave, setAutoSave] = useState(true);
    const [language, setLanguage] = useState('es');
    const [fontSize, setFontSize] = useState('medium');
    const [notificationsFrequency, setNotificationsFrequency] = useState('normal');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem('additionalSettings');
            if (settings) {
                const parsedSettings = JSON.parse(settings);
                setAutoSave(parsedSettings.autoSave !== false);
                setLanguage(parsedSettings.language || 'es');
                setFontSize(parsedSettings.fontSize || 'medium');
                setNotificationsFrequency(parsedSettings.notificationsFrequency || 'normal');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const saveSettings = async (newSettings) => {
        try {
            await AsyncStorage.setItem('additionalSettings', JSON.stringify(newSettings));
            Alert.alert('Configuración guardada', 'Los cambios han sido aplicados.');
        } catch (error) {
            console.error('Error saving settings:', error);
            Alert.alert('Error', 'No se pudieron guardar los cambios.');
        }
    };

    const handleSettingChange = (key, value) => {
        const newSettings = {
            autoSave,
            language,
            fontSize,
            notificationsFrequency,
            [key]: value
        };

        // Update local state
        switch (key) {
            case 'autoSave':
                setAutoSave(value);
                break;
            case 'language':
                setLanguage(value);
                break;
            case 'fontSize':
                setFontSize(value);
                break;
            case 'notificationsFrequency':
                setNotificationsFrequency(value);
                break;
        }

        saveSettings(newSettings);
    };

    const handleDarkModeToggle = (value) => {
        toggleTheme();
        // No necesitamos guardar en AsyncStorage aquí porque el ThemeContext ya lo maneja
    };

    const resetToDefaults = () => {
        Alert.alert(
            'Restablecer configuración',
            '¿Estás seguro de que quieres restablecer todas las configuraciones a sus valores predeterminados?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Restablecer',
                    style: 'destructive',
                    onPress: () => {
                        const defaultSettings = {
                            autoSave: true,
                            language: 'es',
                            fontSize: 'medium',
                            notificationsFrequency: 'normal'
                        };
                        setAutoSave(true);
                        setLanguage('es');
                        setFontSize('medium');
                        setNotificationsFrequency('normal');
                        saveSettings(defaultSettings);
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E3C72" />
                </TouchableOpacity>
                <Text style={styles.title}>Configuración Adicional</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Apariencia</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="moon" size={24} color="#0A74DA" />
                        <View style={styles.settingText}>
                            <Text style={styles.settingTitle}>Modo Oscuro</Text>
                            <Text style={styles.settingDescription}>Cambia el tema de la aplicación</Text>
                        </View>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={handleDarkModeToggle}
                        thumbColor={isDarkMode ? "#0A74DA" : "#ccc"}
                        trackColor={{ false: "#dcdcdc", true: "#A7F3D0" }}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="text" size={24} color="#0A74DA" />
                        <Text style={styles.settingTitle}>Tamaño de Fuente</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        {['small', 'medium', 'large'].map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[styles.sizeOption, fontSize === size && styles.sizeOptionSelected]}
                                onPress={() => handleSettingChange('fontSize', size)}
                            >
                                <Text style={[styles.sizeOptionText, fontSize === size && styles.sizeOptionTextSelected]}>
                                    {size === 'small' ? 'Pequeño' : size === 'medium' ? 'Mediano' : 'Grande'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Comportamiento</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="save" size={24} color="#0A74DA" />
                        <View style={styles.settingText}>
                            <Text style={styles.settingTitle}>Guardado Automático</Text>
                            <Text style={styles.settingDescription}>Guarda automáticamente los cambios</Text>
                        </View>
                    </View>
                    <Switch
                        value={autoSave}
                        onValueChange={(value) => handleSettingChange('autoSave', value)}
                        thumbColor={autoSave ? "#0A74DA" : "#ccc"}
                        trackColor={{ false: "#dcdcdc", true: "#A7F3D0" }}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="language" size={24} color="#0A74DA" />
                        <Text style={styles.settingTitle}>Idioma</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        {[
                            { value: 'es', label: 'Español' },
                            { value: 'en', label: 'English' }
                        ].map((lang) => (
                            <TouchableOpacity
                                key={lang.value}
                                style={[styles.sizeOption, language === lang.value && styles.sizeOptionSelected]}
                                onPress={() => handleSettingChange('language', lang.value)}
                            >
                                <Text style={[styles.sizeOptionText, language === lang.value && styles.sizeOptionTextSelected]}>
                                    {lang.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notificaciones</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Ionicons name="notifications" size={24} color="#0A74DA" />
                        <Text style={styles.settingTitle}>Frecuencia de Notificaciones</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        {[
                            { value: 'low', label: 'Baja' },
                            { value: 'normal', label: 'Normal' },
                            { value: 'high', label: 'Alta' }
                        ].map((freq) => (
                            <TouchableOpacity
                                key={freq.value}
                                style={[styles.sizeOption, notificationsFrequency === freq.value && styles.sizeOptionSelected]}
                                onPress={() => handleSettingChange('notificationsFrequency', freq.value)}
                            >
                                <Text style={[styles.sizeOptionText, notificationsFrequency === freq.value && styles.sizeOptionTextSelected]}>
                                    {freq.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.resetButton} onPress={resetToDefaults}>
                    <Ionicons name="refresh" size={20} color="#DC2626" />
                    <Text style={styles.resetButtonText}>Restablecer a valores predeterminados</Text>
                </TouchableOpacity>
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
    pickerContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 2,
    },
    sizeOption: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    sizeOptionSelected: {
        backgroundColor: '#0A74DA',
    },
    sizeOptionText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    sizeOptionTextSelected: {
        color: '#FFFFFF',
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DC2626',
    },
    resetButtonText: {
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});