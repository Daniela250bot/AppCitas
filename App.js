
import { UserProvider } from "./Src/Contexts/UserContext";
import { ThemeProvider } from "./Src/Contexts/ThemeContext";
import AppNavigation from "./Src/Navigation/AppNavigation";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';


export default function App() {
  useEffect(() => {
    // Manejar deep links para recuperación de contraseña
    const handleDeepLink = (event) => {
      const url = event.url;
      console.log('Deep link recibido:', url);

      // Extraer token del URL
      const tokenMatch = url.match(/token=([^&]+)/);
      if (tokenMatch) {
        const token = tokenMatch[1];
        console.log('Token extraído:', token);
        // Navegar a la pantalla de restablecer contraseña con el token
        // Nota: Esto requiere acceso a navigation, por ahora logueamos
        console.log('Navegando a RestablecerPassword con token:', token);
      }
    };

    // Escuchar deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Verificar si la app se abrió con un deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Función para solicitar permisos y obtener token
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para recibir notificaciones');
        return;
      }

      // Obtener el push token (FCM token para Firebase)
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Expo Push Token obtenido en App.js:', token.data, 'Timestamp:', new Date().toISOString());

      // El token se enviará al backend cuando el usuario inicie sesión
      // Esto se maneja en el UserContext o en las pantallas de login
    };

    setupNotifications();

    // Escuchar mensajes en foreground
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      const { title, body, data } = notification.request.content;
      console.log('Notificación recibida en foreground:', { title, body, data }, 'Timestamp:', new Date().toISOString());

      // Mostrar alerta basada en el tipo de notificación
      if (data && data.cita_id) {
        console.log('Mostrando alerta para nueva cita en foreground:', { title, body, data });
        Alert.alert(
          title || 'Nueva Cita',
          body || 'Se ha creado una nueva cita.',
          [
            { text: 'OK' },
            { text: 'Ver Detalles', onPress: () => {
              // Aquí podrías navegar a la pantalla de detalles de la cita
              // Por ejemplo, usando navigation.navigate('DetalleCitas', { id: data.cita_id });
              console.log('Navegando a detalles de cita:', data.cita_id);
            }}
          ]
        );
      } else if (data && data.type === 'registration') {
        console.log('Mostrando alerta para registro exitoso en foreground:', { title, body, data });
        Alert.alert(
          title || 'Registro Exitoso',
          body || 'Tu registro ha sido exitoso.',
          [{ text: 'OK' }]
        );
      } else {
        console.log('Mostrando alerta general en foreground:', { title, body, data });
        Alert.alert(
          title || 'Notificación',
          body || 'Has recibido una notificación.',
          [{ text: 'OK' }]
        );
      }
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación recibida:', response, 'Timestamp:', new Date().toISOString());
      const { data } = response.notification.request.content;

      // Manejar respuesta (cuando el usuario toca la notificación)
      if (data && data.cita_id) {
        // Navegar a detalles de cita
        console.log('Navegando a detalles de cita desde respuesta:', data.cita_id);
        // Aquí podrías navegar: navigation.navigate('DetalleCitas', { id: data.cita_id });
      } else if (data && data.type === 'registration') {
        // Navegar a login o perfil
        console.log('Navegando a login desde respuesta de registro');
        // navigation.navigate('Login');
      }
    });

    return () => {
      subscription?.remove();
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <UserProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </UserProvider>
  );
}