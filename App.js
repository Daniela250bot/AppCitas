
import { UserProvider } from "./Src/Contexts/UserContext";
import { ThemeProvider } from "./Src/Contexts/ThemeContext";
import AppNavigation from "./Src/Navigation/AppNavigation";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';


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
        // shouldShowAlert: true, // muestra notificacion como alerta
        shouldShowBanner: true, //muestra notoficación como banner en la parte superior

        shouldPlaySound: true, // reproduce sonido
        shouldSetBadge: false, // NO cambia el icono de la notificación
      }),
    });

    //funcion para solicitar permiso a el usuario
    const getPermisos = async () =>{
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para recibir notificaciones')
      }
    }
    getPermisos();

    return () => {
      subscription?.remove();
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