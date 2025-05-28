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

// Aquí puedes agregar más funciones para interactuar con tu backend
