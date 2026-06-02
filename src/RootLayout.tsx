import ThemeRegistry from "./components/ThemeRegistry";
import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import GlobalAlert from "./components/GlobalAlert";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <ThemeRegistry>
      <AlertProvider>
        <AuthProvider>
          <Outlet />
          <GlobalAlert />
        </AuthProvider>
      </AlertProvider>
    </ThemeRegistry>
  );
}