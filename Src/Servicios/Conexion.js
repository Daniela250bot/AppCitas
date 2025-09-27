import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.2.234.27/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
});

const RutasPublicas = ['/login', '/registrar']; //rutas del api que no requieren autenticación

api.interceptors.request.use(

    async (config) => {
        const EsRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));
        let userToken = null;

        if(!EsRutaPublica){
            userToken = await AsyncStorage.getItem("userToken");
        }
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config; 
        const IsRutaPublica = RutasPublicas.some(ruta => originalRequest.url.includes(ruta));
        if(error.response && error.response.status === 401 && !originalRequest._retry && !IsRutaPublica){
            originalRequest._retry = true; 
            await AsyncStorage.removeItem("userToken"); //elimina el token guardado 
            console.log("Token expirado o no autorizado, Redirigiendo al loging")
        }
        return Promise.reject(error);
    }
);

export default api;
