import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: any | null;
  role: "admin" | "prestador" | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<"admin" | "prestador" | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para cargar datos del usuario + perfil
  const loadUserWithProfile = async (sessionUser: any) => {
    if (!sessionUser) {
      setUser(null);
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      // Obtén el perfil desde la tabla profiles
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name, position, organization, status")
        .eq("id", sessionUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      }

      // Combina datos de auth + perfil
      const fullUser = {
        ...sessionUser,
        name: profile?.name || sessionUser.email,
        position: profile?.position || "Usuario",
        organization: profile?.organization || "Sin entidad",
        status: profile?.status || "inactive",
      };

      setUser(fullUser);

      // Determina el rol basado en el email (como lo tienes ahora)
      if (sessionUser.email === "admin@tecnovig.com") {
        setRole("admin");
      } else {
        setRole("prestador");
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(sessionUser);
      setRole("prestador");
    }

    setLoading(false);
  };

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      await loadUserWithProfile(sessionUser);
    };

    loadSession();

    // Escuchar cambios en autenticación
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null;
        loadUserWithProfile(u);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return !error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
