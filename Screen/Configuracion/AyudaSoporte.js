import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../Src/Contexts/UserContext';

export default function AyudaSoporte({ navigation }) {
    const { user } = useUser();

    const handleContactSupport = () => {
        const email = 'soporte@citaseps.com';
        const subject = 'Soporte Técnico - App Citas EPS';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'No se pudo abrir la aplicación de correo');
        });
    };

    const handleCallSupport = () => {
        const phoneNumber = '+573001234567'; // Número de ejemplo
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'No se pudo realizar la llamada');
        });
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E3C72" />
                </TouchableOpacity>
                <Text style={styles.title}>Ayuda y Soporte Técnico</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>¿Necesitas ayuda?</Text>
                <Text style={styles.description}>
                    Estamos aquí para ayudarte. Elige la opción que mejor se adapte a tu consulta.
                </Text>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionCard} onPress={handleContactSupport}>
                    <Ionicons name="mail" size={30} color="#0A74DA" />
                    <Text style={styles.optionTitle}>Correo Electrónico</Text>
                    <Text style={styles.optionDescription}>Envíanos un email y te responderemos en 24 horas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionCard} onPress={handleCallSupport}>
                    <Ionicons name="call" size={30} color="#0A74DA" />
                    <Text style={styles.optionTitle}>Llamada Telefónica</Text>
                    <Text style={styles.optionDescription}>Habla directamente con nuestro equipo de soporte</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Información de Contacto</Text>
                <Text style={styles.contactText}>Email: soporte@citaseps.com</Text>
                <Text style={styles.contactText}>Teléfono: +57 300 123 4567</Text>
                <Text style={styles.contactText}>Horario: Lunes a Viernes, 8:00 AM - 6:00 PM</Text>
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
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3C72',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#4F6FA3',
        lineHeight: 20,
    },
    optionsContainer: {
        paddingHorizontal: 20,
    },
    optionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A2A2A',
        marginTop: 10,
        marginBottom: 5,
    },
    optionDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
    },
    contactInfo: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E3C72',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 14,
        color: '#4F6FA3',
        marginBottom: 5,
    },
});