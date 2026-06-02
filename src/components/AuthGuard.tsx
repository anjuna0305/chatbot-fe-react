import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  roleValidators?: [(role: string) => boolean];
  children: ReactNode;
}

export default function AuthGuard({ children, roleValidators }: Props) {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const redirected = useRef(false);

  let roleAuth = true;

  if (roleValidators && role) {
    let tempAuth = false;
    roleValidators.map((authFunc) => {
      tempAuth = tempAuth || authFunc(role);
    });
    if (!tempAuth) roleAuth = false;
  }

  useEffect(() => {
    if (!roleAuth || (!isAuthenticated && !redirected.current)) {
      redirected.current = true;
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, roleAuth]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}