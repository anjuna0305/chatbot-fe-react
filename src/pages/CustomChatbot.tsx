import { Link, useParams } from "react-router";
import { API_ENDPOINTS } from "@/utils/api";
import { CustomChatbot } from "@/types/custom-chatbot";
import CustomChatShell from "@/components/CustomChatShell";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { Box, Button, Paper, Typography } from "@mui/material";
import { isAdmin } from "@/utils/auth";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

const notAllowedComponent = (errorMessage: string, children?: ReactNode) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Paper sx={{ p: 3 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
        {errorMessage}
      </Typography>
      <Box
        sx={{
          pt: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Paper>
  </Box>
);

const allowedChatbot = (chatbotData: CustomChatbot, heroImageUrl: string) => (
  <CustomChatShell chatbotData={chatbotData} heroImageUrl={heroImageUrl} />
);

export default function CustomChatbotPage() {
  const { url_path } = useParams<{ url_path: string }>();
  const { organization_id, isAuthenticated, role } = useAuth();

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

  if (isAdmin(role)) {
    return allowedChatbot(chatbotData, heroImageUrl);
  }

  if (!chatbotData.is_publish) {
    return notAllowedComponent("Chatbot is not published.");
  }

  if (chatbotData.is_public) {
    return allowedChatbot(chatbotData, heroImageUrl);
  }

  if (chatbotData.organization_id) {
    if (!organization_id) {
      return notAllowedComponent(
        "Only organization members can access this chatbot",
      );
    }

    if (chatbotData.organization_id != organization_id) {
      return notAllowedComponent(
        "Only organization does not have access to this chatbot",
      );
    }

    return allowedChatbot(chatbotData, heroImageUrl);
  }

  if (!isAuthenticated) {
    return notAllowedComponent(
      "You need to Log in sign up to access this chatbot",
      <>
        <Link to={"/login"}>
          <Button variant="contained">Log in</Button>
        </Link>
        <Link to={"/register"}>
          <Button variant="outlined">Sign up</Button>
        </Link>{" "}
      </>,
    );
  }

  return allowedChatbot(chatbotData, heroImageUrl);
}
