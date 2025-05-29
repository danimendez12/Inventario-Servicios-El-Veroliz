import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

// Función para login
export async function loginUsuario(username, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    return response.data; // { success: true/false, ... }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
}

// Función para obtener inventario (GET, no POST)
export async function obtener_inventario() {
  try {
    const response = await axios.get(`${API_URL}/inventario`);
    return response.data; // { success: true, inventario: [...] }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
}

export async function agregar_item(producto, categoria, hojas, cantidad, linea, minimo) {
  try {
    
    const response = await axios.post(`${API_URL}/agregar_item`, {
      producto,
      categoria,
      hojas,
      cantidad,
      linea,
      minimo
    });
    console.log(response.data);

    return response.data; // { success: true, inventario: [...] }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
  
}

export async function eliminar_item(id) {
  try {
    const response = await axios.delete(`${API_URL}/eliminar_item`, {
      headers: { 'Content-Type': 'application/json' },
      data: { id }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
  
}

export async function actualizar_item(objetivo,producto, categoria, hojas, cantidad, linea, minimo) {
  try {
    
    const response = await axios.put(`${API_URL}/actualizar_item`, {
      objetivo,
      producto,
      categoria,
      hojas,
      cantidad,
      linea,
      minimo
    });
    console.log(response.data);

    return response.data; // { success: true, inventario: [...] }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
  
}

export async function agregar_existencia(objetivo, cantidad) {
  try {
    const response = await axios.post(`${API_URL}/agregar_existencia`, {
      objetivo,
      cantidad
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
}

export async function restar_existencia(objetivo, cantidad) {
  try {
    const response = await axios.post(`${API_URL}/restar_existencia`, {
      objetivo,
      cantidad
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
}

export async function obtener_predicciones() {
  try {
    const response = await axios.get(`${API_URL}/obtener_predicciones`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
}


export async function obtener_ordenes() {
  try {
    const response = await axios.get(`${API_URL}/obtener_ordenes`);
    console.log("lo obtenido esss ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
}

export async function completar_orden(id) {
  try {
    const response = await axios.put(`${API_URL}/completar_orden`, {
      headers: { 'Content-Type': 'application/json' },
      data: { id }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
  
}

export async function obtener_productos_orden(id) {
  try {
    const response = await axios.get(`${API_URL}/obtener_productos_orden`, {
      headers: { 'Content-Type': 'application/json' },
      data: { id }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, message: 'Error de red o servidor' };
  }
  
}
