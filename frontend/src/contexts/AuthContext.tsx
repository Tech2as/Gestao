import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Role = "ADMIN" | "REGULADOR" | "OFICINA" | "SEGURADORA";

interface User {
  id: number;
  name: string,
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
    }
    return null;
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUser({ id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;