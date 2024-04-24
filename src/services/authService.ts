import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "auth/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los tutores:", error);
    throw error;
  }
};

export { authenticateUser };
