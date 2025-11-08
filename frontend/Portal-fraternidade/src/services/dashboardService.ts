// ---Minhas escalas --- Meeting/my-schedules

import { api } from "./api";
import type {  } from "../types/api";


export async function getSchedule(token: string):Promise<any> {
    const response = await api.get("/meeting/my-schedules", {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })    
    .then(function(response) {
        console.log("Schedule :"+ response.data)
        return response.data
    })
    .catch(function (error){
        console.log(error)
        throw error
    })
    
    return response;
}

// ---Avisos rapidos === noticeBoard/getall