import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_ENDPOINTS } from "@/utils/api";
import { CustomChatbot } from "@/types/custom-chatbot";
import CustomChatShell from "@/components/CustomChatShell";

export default function CustomChatbotPage() {
  const { url_path } = useParams<{ url_path: string }>();
  const [chatbotData, setChatbotData] = useState<CustomChatbot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url_path) return;
    setLoading(true);
    fetch(API_ENDPOINTS.CUSTOM_CHATBOT_BY_URL(url_path))
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setChatbotData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [url_path]);

  if (loading) return <div>Loading...</div>;
  if (error || !chatbotData) return <div>Chatbot not found</div>;

  const heroImageUrl = API_ENDPOINTS.CUSTOM_CHATBOT_IMAGE(chatbotData.hero_image);

  return <CustomChatShell chatbotData={chatbotData} heroImageUrl={heroImageUrl} />;
}