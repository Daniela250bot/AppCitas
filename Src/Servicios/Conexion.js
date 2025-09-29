import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost/Reserbas_eps/public";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
});

const RutasPublicas = ['/api/login', '/api/registrar']; 

api.interceptors.request.use(
    async (config) => {
        const EsRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));
        let userToken = null;

        if (!EsRutaPublica) {
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
    async (error) => {
        const originalRequest = error.config;
        const EsRutaPublica = RutasPublicas.some(ruta => originalRequest.url.includes(ruta));

        if (error.response && error.response.status === 401 && !originalRequest._retry && !EsRutaPublica) {
            originalRequest._retry = true;
            await AsyncStorage.removeItem("userToken");
            console.log("Token expirado o no autorizado, Redirigiendo al login");
        }
        return Promise.reject(error);
    }
);

export default api;
