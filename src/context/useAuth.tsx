import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  accessToken: string | null;
  login: (token: string) => void;
  register: (token: string) => void;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: () => {},
  register: () => {},
  logout: async () => {},
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (token: string) => {
    setAccessToken(token);
  };

  const logout = async () => {
    setAccessToken(null);

    await fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      credentials: "include",
    });
  };

  const register = (token: string) => {
    setAccessToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        register,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
