import api from "./Conexion";

export const listarCitas = async () => {
  try {
    const response = await api.get("/listarCitas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar citas:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const eliminarCita = async (id) => {
  try {
    await api.delete(`/eliminarCita/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la cita:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const crearCita = async (data) => {
  try {
    const response = await api.post("/crearCita", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear la cita:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const editarCita = async (id, data) => {
  try {
    const response = await api.put(`/actualizarCita/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar la cita:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const verificarDisponibilidad = async (idMedico) => {
  try {
    const response = await api.get(`/verificarDisponibilidad/${idMedico}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};
