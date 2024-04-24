import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getModes = async () => {
    try {
        const response = await axios.get(`${API_URL}modality`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las modalidades:', error);
        throw error;
    }
};

export { getModes };
