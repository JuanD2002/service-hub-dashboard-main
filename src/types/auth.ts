export type UserRole = "admin" | "prestador";

export interface Profile {
  id: string;
  name: string | null;
  role: UserRole;
  organization: string | null;
}

export interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

