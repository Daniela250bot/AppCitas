import api from './Conexion'; 

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/registrar', userData);
        return response.data;
    } catch (error) {
        console.error('Error en registro:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/login', credentials);
        
        // Guardar token si el login es exitoso
        if (response.data.success && response.data.token) {
            await AsyncStorage.setItem("userToken", response.data.token);
        }
        
        return response.data;
    } catch (error) {
        console.error('Error en login:', error.response?.data || error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await api.post('/api/logout');
        await AsyncStorage.removeItem("userToken");
        return { success: true };
    } catch (error) {
        console.error('Error en logout:', error);
        await AsyncStorage.removeItem("userToken"); // Limpiar token igualmente
        throw error;
    }
};