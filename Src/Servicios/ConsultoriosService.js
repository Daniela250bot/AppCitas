import api from "./Conexion";

export const listarConsultorios = async () => {
  try {
    const response = await api.get("/listarConsultorios");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const eliminarConsultorio = async (id) => {
  try {
    await api.delete(`/eliminarConsultorios/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el consultorio:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const crearConsultorio = async (data) => {
  try {
    const response = await api.post("/crearConsultorios", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear el consultorio:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};

export const editarConsultorio = async (id, data) => {
  try {
    const response = await api.put(`/actualizarConsultorios/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar el consultorio:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexion",
    };
  }
};
