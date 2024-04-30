import axios from "axios";
import { GraduationProcess, Seminar } from "../models/studentProcess";
import { convertSeminarToGraduationProcess } from "../helper/process";
import { GraduationProcess as InitGraduationProcess } from "../services/models/GraduationProcess";
import apiClient from "./apiInstance";

const API_URL = import.meta.env.VITE_API_URL;

const getProcess = async () => {
  try {
    const response = await axios.get(`${API_URL}student`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los procesos:", error);
    throw error;
  }
};

const updateProcess = async (seminar: Seminar) => {
  try {
    const graduation = convertSeminarToGraduationProcess(seminar);
    const response = await axios.put(
      `${API_URL}graduation/${seminar.id}`,
      graduation
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los procesos:", error);
    throw error;
  }
};

const getStundentById = async (studentId: number) => {
  try {
    const response = await axios.get(`${API_URL}graduation/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los procesos:", error);
    throw error;
  }
};

const createGraduationProcess = async (seminar: InitGraduationProcess) => {
  try {
    // const graduation = convertSeminarToGraduationProcess(seminar);
    const response = await apiClient.post(`graduation`, seminar);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response from the server");
    }
  } catch (error) {
    console.error("Error creating graduation process:", error);
    throw new Error(
      "Failed to create graduation process due to an error in the request"
    );
  }
};

export { getProcess, getStundentById, updateProcess, createGraduationProcess };
