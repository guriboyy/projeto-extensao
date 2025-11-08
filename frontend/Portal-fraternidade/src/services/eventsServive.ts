import { api } from "./api";
import type {  } from "../types/api";


export async function getEvents():Promise<any> {
    const response = await api.get("/auth/sign-in")    
    .then(function(response) {
        console.log(response.data)
        return response.data
    })
    .catch(function (error){
        console.log(error)
        throw error
    })
    
    return response;
}

export async function createEvent(email:string, password:string):Promise<any> {
    const response: = await api.post("/auth/sign-in", {email, password})    
    .then(function(response) {
        console.log(response.data)
        return response.data
    })
    .catch(function (error){
        console.log(error)
        throw error
    })
    
    return response;
}

