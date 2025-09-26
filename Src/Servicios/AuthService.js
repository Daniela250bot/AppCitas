import AsyncStorage from "@react-native-async-storage/async-storage";
import api from './api';


export const loginUser = async (email, password) => {
    try{
        const response = await api.post('/login', { email, password });  
        const token = response.data.token;

        if(token){
            await AsyncStorage.setItem("userToken", token);
        }else {
            console.error("No se escribio token en la respuesta");
        }
        return { success: true, token};
    }catch(error){
        console.error("Error al iniciar sesión:", error.response ? error.response.data : error.message);

        return { 
            success : false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};