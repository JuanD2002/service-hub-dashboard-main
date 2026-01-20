import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!role) {
      navigate("/login", { replace: true });
      return;
    }

    navigate(role === "admin" ? "/admin" : "/prestador", { replace: true });
  }, [role, loading, navigate]);

  return null;
};

export default Index;
