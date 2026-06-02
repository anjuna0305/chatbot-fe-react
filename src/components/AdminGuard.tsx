import { isAdmin, useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const redirected = useRef(false);

  useEffect(() => {
    console.log("user role is: ", role);
    if (!role || !isAdmin(role)) {
      redirected.current = true;
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  if (!role || !isAdmin(role)) return null;
  return <>{children}</>;
}