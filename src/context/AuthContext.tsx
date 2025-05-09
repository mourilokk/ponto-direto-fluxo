import { createContext, useContext, useEffect, useState} from "react";
import api from "@/services/api";

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    const login = async (username: string, password: string) => {
        const response= await api.post("/token/", { username, password});
        const access = response.data.access;
        setToken(access);
        localStorage.setItem("token", access);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value = {{ token, login ,logout, isAuthenticated: !!token}}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;