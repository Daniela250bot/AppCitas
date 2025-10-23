import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

export const loginUser= async(email, password) => {
    try {
          const response = await api.post('/login', {email, password});
          const token = response.data.token;
          const user = response.data.user;
          console.log("Respuesta del servidro:", response.data);
          console.log("Token recibido:", token);
          console.log("Usuario recibido:", user);
          if (token) {
             await AsyncStorage.setItem("userToken", token);
             if (user) {
                 await AsyncStorage.setItem("userData", JSON.stringify(user));
             }
         }else{
             console.log("No se recibio el token en la respuesta");
         }
         return { success: true, token, user};
    }catch(error){
        console.error("Error al iniciar sesion:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data :"Error de Conexion",
        };
    }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/registrar', userData); //  endpoint de el backend
    console.log("Respuesta del servidor (registro):", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al registrar usuario:", error.response ? error.response.data : error.message);

    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};


export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userToken"); //  elimina el token guardado
    await AsyncStorage.removeItem("userData"); // elimina los datos del usuario
    console.log("Sesión cerrada correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, message: "Error al cerrar sesión" };
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
};

export const recuperarPassword = async (email) => {
  try {
    console.log("AuthService: Enviando email para recuperación:", email);
    const response = await api.post('/recuperar-password', { email });
    console.log("AuthService: Respuesta exitosa:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("AuthService: Error al recuperar contraseña:", error);
    console.error("AuthService: Error response data:", error.response?.data);
    console.error("AuthService: Error status:", error.response?.status);
    return {
      success: false,
      message: error.response?.data?.message || error.response?.data || "Error de conexión",
    };
  }
};

export const verificarCodigo = async (email, codigo) => {
  try {
    const response = await api.post('/verificar-codigo', { email, codigo });
    return { success: true, data: response.data, token: response.data.token };
  } catch (error) {
    console.error("Error al verificar código:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.response?.data || "Error de conexión",
    };
  }
};

export const registerRecepcionista = async (recepcionistaData) => {
  try {
    console.log("AuthService: Enviando datos para registro de recepcionista:", recepcionistaData);
    const response = await api.post('/registrar-recepcionista', {
      ...recepcionistaData,
      role: 'Recepcionista'
    });
    console.log("AuthService: Respuesta exitosa del registro:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al registrar recepcionista:", error.response ? error.response.data : error.message);
    console.error("AuthService: Status del error:", error.response?.status);
    console.error("AuthService: Headers del error:", error.response?.headers);
    return {
      success: false,
      message: error.response?.data?.message || error.response?.data || "Error de conexión",
    };
  }
};

export const restablecerPassword = async (token, password) => {
  try {
    const response = await api.post('/restablecer-password', { token, password });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al restablecer contraseña:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};