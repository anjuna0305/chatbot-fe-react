import { useParams } from "react-router";
import { API_ENDPOINTS } from "@/utils/api";
import { CustomChatbot } from "@/types/custom-chatbot";
import CustomChatShell from "@/components/CustomChatShell";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";

export default function CustomChatbotPage() {
  const { url_path } = useParams<{ url_path: string }>();

  console.log("this component is getting called");
  const {
    data: chatbotData,
    isLoading,
    isError,
  } = useQuery<CustomChatbot>({
    queryKey: ["chatbot", url_path],
    queryFn: async () => {
      const res = await axiosInstance.get(
        API_ENDPOINTS.CUSTOM_CHATBOT_BY_URL(url_path ?? ""),
      );
      return res.data;
    },
    enabled: !!url_path,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !chatbotData) return <div>Chatbot not found</div>;

  const heroImageUrl = API_ENDPOINTS.CUSTOM_CHATBOT_IMAGE(
    chatbotData.hero_image,
  );

  return (
    <CustomChatShell chatbotData={chatbotData} heroImageUrl={heroImageUrl} />
  );
}
