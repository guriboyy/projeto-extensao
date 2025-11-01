import { api } from "./api";
import type { SignInResponse } from "../types/api";


export async function loginUser(email:string, password:string) {
    const response:SignInResponse = await api.post("/auth/sign-in", {email, password})
    .then(function(response) {
        console.log(response)
        return response.data
    })
    .catch(function (error){
        console.log(error)
        return response
    })
    
    
}

