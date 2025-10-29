import { API_BASE_URL } from './Conexion';

class SupportService {
    // Obtener preguntas frecuentes desde la API
    async getFAQs() {
        try {
            const response = await fetch(`${API_BASE_URL}/support/faqs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener las preguntas frecuentes');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en getFAQs:', error);
            // Retornar FAQs por defecto si la API no está disponible
            return this.getDefaultFAQs();
        }
    }

    // Iniciar chat en tiempo real con soporte
    async startLiveChat(userId, message) {
        try {
            const response = await fetch(`${API_BASE_URL}/support/live-chat/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    initial_message: message,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al iniciar el chat en vivo');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en startLiveChat:', error);
            throw error;
        }
    }

    // Enviar mensaje en el chat
    async sendChatMessage(chatId, message, userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/support/live-chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    message: message,
                    user_id: userId,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el mensaje');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en sendChatMessage:', error);
            throw error;
        }
    }

    // Obtener mensajes del chat
    async getChatMessages(chatId) {
        try {
            const response = await fetch(`${API_BASE_URL}/support/live-chat/messages/${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los mensajes del chat');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en getChatMessages:', error);
            throw error;
        }
    }

    // FAQs por defecto cuando la API no está disponible
    getDefaultFAQs() {
        return [
            {
                id: 1,
                question: '¿Cómo programar una cita médica?',
                answer: 'Para programar una cita, ve a la sección de "Citas" en el menú principal, selecciona la especialidad médica que necesitas y elige un horario disponible.'
            },
            {
                id: 2,
                question: '¿Cómo cancelar una cita?',
                answer: 'Puedes cancelar tu cita desde la sección "Mis Citas". Selecciona la cita que deseas cancelar y presiona el botón "Cancelar". Recuerda hacerlo con al menos 24 horas de anticipación.'
            },
            {
                id: 3,
                question: '¿Qué hacer si olvido mi contraseña?',
                answer: 'En la pantalla de inicio de sesión, presiona "Olvidé mi contraseña" e ingresa tu correo electrónico. Recibirás un enlace para restablecer tu contraseña.'
            },
            {
                id: 4,
                question: '¿Cómo actualizar mi información personal?',
                answer: 'Ve a la sección "Perfil" en el menú principal. Allí podrás editar tu información personal, foto de perfil y preferencias médicas.'
            },
            {
                id: 5,
                question: '¿La app funciona sin conexión a internet?',
                answer: 'Algunas funciones requieren conexión a internet. Puedes ver tus citas programadas sin conexión, pero para programar nuevas citas o actualizar información necesitas estar conectado.'
            }
        ];
    }

    // Enviar ticket de soporte
    async submitSupportTicket(userId, subject, description, category) {
        try {
            const response = await fetch(`${API_BASE_URL}/support/ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    subject: subject,
                    description: description,
                    category: category,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el ticket de soporte');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en submitSupportTicket:', error);
            throw error;
        }
    }
}

export default new SupportService();