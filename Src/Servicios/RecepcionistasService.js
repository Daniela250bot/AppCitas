// Src/Services/RecepcionistasService.js
import api from "./Conexion";

export const listarRecepcionistas = async () => {
  try {
    const response = await api.get("/listarRecepcionistas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar recepcionistas:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const eliminarRecepcionista = async (id) => {
  try {
    await api.delete(`/eliminarRecepcionistas/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar recepcionista:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearRecepcionista = async (data) => {
  try {
    const response = await api.post("/crearRecepcionistas", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear recepcionista:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const editarRecepcionista = async (id, data) => {
  try {
    const response = await api.put(`/actualizarRecepcionistas/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar recepcionista:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
