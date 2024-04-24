import axios from 'axios';
import { Seminar } from '../models/studentProcess';
import { convertSeminarToGraduationProcess } from '../helper/process';

const API_URL = import.meta.env.VITE_API_URL;

const getProcess = async () => {
    try {
        const response = await axios.get(`${API_URL}student`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }
};

const updateProcess = async (seminar: Seminar) => {
    try {
        const graduation = convertSeminarToGraduationProcess(seminar);
        const response = await axios.put(`${API_URL}graduation/${seminar.id}`, graduation);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }
}

const getStundentById = async (studentId: number) => {
    try {
        const response = await axios.get(`${API_URL}graduation/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }
}

export {
    getProcess,
    getStundentById,
    updateProcess
};
