import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => Promise<void>;
    setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    login: () => {},
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

        try {
            await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Logout request failed', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout,
                setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
