import { api } from "./api";
import type { SignInResponse } from "../types/api";


export async function loginUser(email:string, password:string):Promise<any> {
    const response:SignInResponse = await api.post("/auth/sign-in", {email, password})    
    .then(function(response) {
        console.log(response.data)
        return response.data
    })
    .catch(function (error){
        console.log(error)
        return response
    })
    
    return response;
}

