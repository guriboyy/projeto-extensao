import { useState } from "react";
import {loginUser} from "../services/loginService"
import { useNavigate } from "react-router-dom";

export function useForm(){

    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  
        setLoading(true);
        setError(null);
            
        try {
            const data = await loginUser(email, passwd);
            console.log("Usuário logado:", data);
        
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao logar");
        } finally {
            setLoading(false);
        }
               
    }  

    return {        
        setEmail,        
        setPasswd,
        handleForm,
        error
    };
}

