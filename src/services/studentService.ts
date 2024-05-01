import apiClient from "./apiInstance";

export const getStudents = async () => {
  const response = await apiClient.get("/student");
  return response.data;
};