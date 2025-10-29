  import React, { createContext, useContext, useState, useEffect } from 'react';
  import { getUserData } from '../../Src/Servicios/AuthService';
  import * as Notifications from 'expo-notifications';

  export const UserContext = createContext();

  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };

  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadUser = async () => {
        try {
          const userData = await getUserData();
          setUser(userData);
          setLoading(false);

          // Actualizar Expo push token si el usuario está logueado
          if (userData) {
            await updateExpoToken();
          }
        } catch (error) {
          console.error('Error loading user:', error);
          setLoading(false);
        }
      };
      loadUser();
    }, []);

    const updateUser = (newUser) => {
      setUser(newUser);
    };

    const updateExpoToken = async () => {
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log('Expo Push Token obtenido en UserContext:', token.data, 'Timestamp:', new Date().toISOString());

        if (user && user.token) {
          console.log('Enviando Expo push token al backend:', token.data, 'Timestamp:', new Date().toISOString());
          const response = await fetch('http://10.2.234.63:8000/api/update-fcm-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ fcm_token: token.data }),
          });
          if (response.ok) {
            const responseData = await response.json();
            console.log('Expo push token actualizado en el backend exitosamente:', responseData, 'Timestamp:', new Date().toISOString());
          } else {
            const errorText = await response.text();
            console.error('Error al actualizar Expo push token:', response.status, errorText, 'Timestamp:', new Date().toISOString());
          }
        } else {
          console.log('Usuario no logueado, no se envía Expo push token', 'Timestamp:', new Date().toISOString());
        }
      } catch (error) {
        console.error('Error al actualizar Expo push token:', error);
      }
    };

    const getRole = () => {
      return user?.role || null;
    };

    const hasRole = (role) => {
      return user?.role === role;
    };

    const isAdmin = () => {
      return user?.role === 'Administrador';
    };

    const isMedico = () => {
      return user?.role === 'Medico';
    };

    const isRecepcionista = () => {
      return user?.role === 'Recepcionista';
    };

    const isPaciente = () => {
      return user?.role === 'Paciente';
    };

    return (
      <UserContext.Provider
        value={{
          user,
          loading,
          updateUser,
          updateExpoToken,
          getRole,
          hasRole,
          isAdmin,
          isMedico,
          isRecepcionista,
          isPaciente,
        }}
      >
        {children}
      </UserContext.Provider>
    );
   };