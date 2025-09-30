  import React, { createContext, useContext, useState, useEffect } from 'react';
  import { getUserData } from '../Servicios/AuthService';

  const UserContext = createContext();

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
        const userData = await getUserData();
        setUser(userData);
        setLoading(false);
      };
      loadUser();
    }, []);

    const updateUser = (newUser) => {
      setUser(newUser);
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