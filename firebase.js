import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Verificar si la configuración es válida (no placeholders)
const isConfigValid = firebaseConfig.apiKey !== "your-api-key" &&
                      firebaseConfig.authDomain !== "your-project.firebaseapp.com" &&
                      firebaseConfig.projectId !== "your-project-id";

let messaging = null;

if (isConfigValid) {
  try {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  } catch (error) {
    console.warn('Error inicializando Firebase Messaging:', error);
    messaging = null;
  }
} else {
  console.log('Firebase no configurado, usando solo notificaciones de Expo.');
}

export { messaging };