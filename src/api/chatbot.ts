import { CustomChatbot } from "@/types/custom-chatbot";
import { API_ENDPOINTS } from "@/utils/api";
import axiosInstance from "./axios";

export const fetchChatbotById = async (id: number): Promise<CustomChatbot> => {
  const res = await axiosInstance.get(API_ENDPOINTS.CUSTOM_CHATBOT_DETAIL(id));
  return res.data;
};
