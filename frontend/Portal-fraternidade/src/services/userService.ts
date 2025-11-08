import { api } from "./api";
import type { UserPermissionResponse } from "../types/api";


export async function getPermissionByUserId(token:string) {
    const response:UserPermissionResponse = await api.post("/role/get-all-permissions-by-user",{}, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function(response) {
        console.log(response)
        return response.data
    })
    .catch(function (error){
        console.log(error)
        return response
    })
    return response
    
}




