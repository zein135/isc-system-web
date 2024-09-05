import axios from "axios";
import apiClient from "./apiInstance";

export const getEventsService = async () => {
  try {
    const response = await apiClient.get("/events");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get events");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Network error");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
