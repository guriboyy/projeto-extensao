import { createContext, useContext } from "react";

interface AuthContextProps{
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default function AuthProvider({children}: {children: React.ReactNode}){
    return(
        <AuthContext.Provider value={{
        // dados e funções que quero reutilizar
    }}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuthContext = () => {
    return useContext(AuthContext);
}