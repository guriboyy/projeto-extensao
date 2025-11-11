import { api } from "./api";
import type { Event } from "../types/api";


export async function getEvents():Promise<any> {
    const response = await api.get("/event-board/get-all")    
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

export async function createEvent(event:Event, token: string):Promise<any> {
    console.log(event)
    const response = await api.post("/event-board/create",
         {
            title: event.title,
            description: event.description,
            eventDate: event.eventDate
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })    
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

