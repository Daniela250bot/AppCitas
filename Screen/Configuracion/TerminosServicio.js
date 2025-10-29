import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TerminosServicio({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E3C72" />
                </TouchableOpacity>
                <Text style={styles.title}>Términos del Servicio</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.lastUpdated}>Última actualización: 29 de octubre de 2025</Text>

                <Text style={styles.sectionTitle}>1. Aceptación de los términos</Text>
                <Text style={styles.paragraph}>
                    Al acceder y utilizar la aplicación Citas EPS, usted acepta estar sujeto a estos términos y condiciones de servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.
                </Text>

                <Text style={styles.sectionTitle}>2. Descripción del servicio</Text>
                <Text style={styles.paragraph}>
                    Citas EPS es una aplicación móvil que facilita la programación y gestión de citas médicas con profesionales de la salud en entidades prestadoras de servicios de salud (EPS) en Colombia.
                </Text>

                <Text style={styles.sectionTitle}>3. Uso del servicio</Text>
                <Text style={styles.paragraph}>
                    Usted se compromete a utilizar el servicio únicamente para fines legales y de acuerdo con estos términos. No podrá utilizar el servicio para actividades fraudulentas, ilegales o que violen los derechos de terceros.
                </Text>

                <Text style={styles.sectionTitle}>4. Registro y cuenta</Text>
                <Text style={styles.paragraph}>
                    Para utilizar ciertos servicios, debe registrarse y mantener su cuenta actualizada. Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.
                </Text>

                <Text style={styles.sectionTitle}>5. Información médica</Text>
                <Text style={styles.paragraph}>
                    La información médica proporcionada en la aplicación es confidencial y está protegida por las leyes de protección de datos. Solo se utilizará para fines médicos legítimos y con su consentimiento expreso.
                </Text>

                <Text style={styles.sectionTitle}>6. Cancelaciones y modificaciones</Text>
                <Text style={styles.paragraph}>
                    Las citas pueden ser canceladas o modificadas según las políticas de cada centro médico. Se recomienda hacerlo con al menos 24 horas de anticipación cuando sea posible.
                </Text>

                <Text style={styles.sectionTitle}>7. Limitación de responsabilidad</Text>
                <Text style={styles.paragraph}>
                    La aplicación se proporciona "tal cual" sin garantías de ningún tipo. No somos responsables de interrupciones del servicio, inexactitudes en la información o cualquier daño indirecto.
                </Text>

                <Text style={styles.sectionTitle}>8. Modificaciones del servicio</Text>
                <Text style={styles.paragraph}>
                    Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento, con o sin previo aviso. No seremos responsables ante usted o terceros por cualquier modificación.
                </Text>

                <Text style={styles.sectionTitle}>9. Ley aplicable</Text>
                <Text style={styles.paragraph}>
                    Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta en los tribunales competentes de Colombia.
                </Text>

                <Text style={styles.sectionTitle}>10. Contacto</Text>
                <Text style={styles.paragraph}>
                    Para preguntas sobre estos términos, puede contactarnos en:
                    {'\n'}Email: legal@citaseps.com
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