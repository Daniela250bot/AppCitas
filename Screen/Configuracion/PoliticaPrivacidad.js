import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PoliticaPrivacidad({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E3C72" />
                </TouchableOpacity>
                <Text style={styles.title}>Política de Privacidad</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.lastUpdated}>Última actualización: 29 de octubre de 2025</Text>

                <Text style={styles.sectionTitle}>1. Información que recopilamos</Text>
                <Text style={styles.paragraph}>
                    Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono y datos médicos necesarios para el funcionamiento de nuestros servicios de citas médicas.
                </Text>

                <Text style={styles.sectionTitle}>2. Cómo utilizamos su información</Text>
                <Text style={styles.paragraph}>
                    Utilizamos su información para:
                    {'\n'}• Proporcionar servicios de citas médicas
                    {'\n'}• Comunicarnos con usted sobre sus citas
                    {'\n'}• Mejorar nuestros servicios
                    {'\n'}• Cumplir con requisitos legales y regulatorios
                </Text>

                <Text style={styles.sectionTitle}>3. Compartir información</Text>
                <Text style={styles.paragraph}>
                    No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando lo exija la ley.
                </Text>

                <Text style={styles.sectionTitle}>4. Seguridad de datos</Text>
                <Text style={styles.paragraph}>
                    Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
                </Text>

                <Text style={styles.sectionTitle}>5. Sus derechos</Text>
                <Text style={styles.paragraph}>
                    Usted tiene derecho a acceder, rectificar, eliminar o portar sus datos personales. También puede oponerse al procesamiento de sus datos en ciertas circunstancias.
                </Text>

                <Text style={styles.sectionTitle}>6. Retención de datos</Text>
                <Text style={styles.paragraph}>
                    Conservamos su información personal solo durante el tiempo necesario para cumplir con los fines para los que fue recopilada, o según lo requiera la ley aplicable.
                </Text>

                <Text style={styles.sectionTitle}>7. Cambios a esta política</Text>
                <Text style={styles.paragraph}>
                    Podemos actualizar esta política de privacidad periódicamente. Le notificaremos sobre cualquier cambio material publicando la nueva política en nuestra aplicación.
                </Text>

                <Text style={styles.sectionTitle}>8. Contacto</Text>
                <Text style={styles.paragraph}>
                    Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:
                    {'\n'}Email: privacidad@citaseps.com
                    {'\n'}Teléfono: +57 300 123 4567
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
    content: {
        padding: 20,
    },
    lastUpdated: {
        fontSize: 12,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E3C72',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 14,
        color: '#4F6FA3',
        lineHeight: 20,
        marginBottom: 15,
    },
});