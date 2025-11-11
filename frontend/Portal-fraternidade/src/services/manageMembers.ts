
import type { User, UserForm } from "../types/api"
import { api } from "./api"

export async function createUser(token: string, user:UserForm ) {
    console.log(user)
    const response = await api.post("/user/create", 
        {
            firstName: user.name,
            lastName: user.lastName,
            email: user.email,
            password: "1234",
            phoneNumber: user.phoneNumber,
            roleId: user.role,
            isActive: user.status,
    }
    , {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function(response) {
        return response
    })
    .catch(function(error){
        throw error
    })

    return response;
}

export async function updateUser(token: string, user:UserForm, id:string ) {
    console.log(user)
    const response = await api.put(`/user/update/${id}`, 
        {
            firstName: user.name,
            lastName: user.lastName,
            email: user.email,            
            phoneNumber: user.phoneNumber,
            roleId: user.role,
            isActive: user.status,
    }
    , {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function(response) {
        return response
    })
    .catch(function(error){
        throw error
    })

    return response;
}

export async function getAllUsers(token: string):Promise<any> {
    const response:User[] = await api.get("/user/get-all", {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })    
    .then(function(response) {        
        return response.data
    })
    .catch(function (error){        
        throw error
    })
    
    return response;
}

export async function getUserById(id:string | undefined, token:string) {
    const response = await api.get(`/user/get/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function(response) {        
        return response.data
    })
    .catch(function(error){
        throw error
    })

    return response
}
