import { useState } from "react";
import {loginUser} from "../services/loginService"
import {getPermissionByUserId} from "../services/userService"
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
            const permissions = await getPermissionByUserId(data.accessToken)     
            console.log(data.accessToken)       
            localStorage.setItem("token", data.accessToken);
            navigate("/Dashboard");
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

