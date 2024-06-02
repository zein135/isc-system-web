import apiClient from "./apiInstance";

export const getStudents = async () => {
  const response = await apiClient.get("/student");
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await apiClient.delete(`/student/${id}`);
  return response.data;
}