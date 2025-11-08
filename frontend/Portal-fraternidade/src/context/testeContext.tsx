import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps{
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default function AuthProvider({children}: {children: React.ReactNode}){
    const [token, setToken] = useState('');

     // Carrega token salvo (se houver)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    // Atualiza o localStorage sempre que o token mudar
    useEffect(() => {
        if (token) localStorage.setItem("token", token);
    }, [token]);
    return(
        <AuthContext.Provider value={{
        token, setToken
    }}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuthContext = () => {
    return useContext(AuthContext);
}