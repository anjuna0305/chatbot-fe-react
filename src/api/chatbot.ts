import { CustomChatbot } from "@/types/custom-chatbot";
import { API_ENDPOINTS } from "@/utils/api";
import axiosInstance from "./axios";

export const fetchChatbotById = async (id: number): Promise<CustomChatbot> => {
  const res = await axiosInstance.get(API_ENDPOINTS.CUSTOM_CHATBOT_DETAIL(id));
  return res.data;
};

export const fetchChatbotByUrlPath = async (urlPath: string): Promise<CustomChatbot> => {
  const res = await axiosInstance.get(API_ENDPOINTS.CUSTOM_CHATBOT_BY_URL(urlPath));
  return res.data;
};

export const fetchChatbots = async (): Promise<CustomChatbot[]> => {
  const response = await axiosInstance.get<CustomChatbot[]>(
    API_ENDPOINTS.CUSTOM_CHATBOT_LIST,
  );
  return response.data;
};

export const createCustomChatbot = async (payload: {
  chatbot_name: string;
  description: string;
  url_path: string;
  organization_id: number | null;
  is_public: boolean;
}): Promise<CustomChatbot> => {
  const res = await axiosInstance.post(API_ENDPOINTS.CUSTOM_CHATBOT_LIST, {
    ...payload,
    is_public: payload.is_public ? "true" : "false",
  });
  return res.data;
};