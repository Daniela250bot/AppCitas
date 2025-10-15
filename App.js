
import { UserProvider } from "./Src/Contexts/UserContext";
import { ThemeProvider } from "./Src/Contexts/ThemeContext";
import AppNavigation from "./Src/Navigation/AppNavigation";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';


export default function App() {

  useEffect(() => {
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
  }, []);

  return (
    <UserProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </UserProvider>
  );
}