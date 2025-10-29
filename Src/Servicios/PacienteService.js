import api from "./Conexion";

export const listarPacientes= async () => {
    try {
    const response = await api.get("/listarPacientes");
    return {success: true, data: response.data};

    } catch (error) {
        console.error("Error al listar pacientes:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }  
}

export const eliminarPaciente = async (id) => {
    try {
        await api.delete(`/eliminarPaciente/${id}`);
        return {success: true };
    } catch (error) {
        console.error("Error al eliminar el  pacientes:", error.response ? error.response.data : error.message);
        return {
        success: false, 
        message: error.response ? error.response.data : "Error de conexion ",
        };
    }
}

export const crearPaciente = async (data) => {
    try {
         console.log("Enviando datos al backend:", data); // Log para ver datos enviados
         const response = await api.post("/crearPaciente", data );
         return { success: true, data: response.data };
     } catch (error) {
         console.error("Error al crear el paciente:", error.response ? error.response.data : error.message);
         console.error("Detalles del error:", error); // Log detallado del error
         return {
             success: false,
             message: error.response ? error.response.data : "Error de conexion ",
         };
     }
 };
export const editarPaciente = async (id, data) => {
    try {
        const response = await api.put(`/actualizarPaciente/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el paciente:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion ",
        };
    }           
};