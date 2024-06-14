import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { LoginRequest, LoginResponse, MeResponse } from "../types/auth";
import { AuthService } from "../services/auth.service";
import SideBar from "../components/side-bar";

interface AuthContextData {
  user: MeResponse | null;
  setUser: (user: MeResponse | null) => void;
  login: (form: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (form: LoginRequest): Promise<LoginResponse> => {
    const response = await AuthService.login(form);
    localStorage.setItem("token", response.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
    const user = await AuthService.me();
    setUser(user);
    navigate("/dashboard"); 
    return response;
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Navegar para a página de login após logout
  };

  useEffect(() => {
    const loadUser = async () => {
      ("loadUser");
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const user = await AuthService.me().catch(() => {
          localStorage.removeItem("token");
          navigate("/");
        });
        setUser(user ?? null);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
