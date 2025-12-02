import type { Activity } from "../types/api";
import { api } from "./api";



export function createActivity(token: string, act:Activity) {
    console.log(act)
    const response = api.post("/meeting/create",{
            titleMeeting: act.title,
            meetingDate: act.date + " "+ act.hour,
            leaderAccountId: act.leader,
            gospelUserAccountId: act.gospel, 
            vibrationUserAccountId: act.vibration,
            frontDeskUserAccountId: act.frontDesk,
            readingUserAccountId: act.reading,
            passManagerUserAccountId: act.passManager,
            soundAndImageUserAccountId: act.soundAndImage,
            themeGospel: act.themeGospel
    }, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function(response) {
        return response.data
    })
    .catch(function(error) {
        throw error
    })

    return response
}

export function getAllActivity(month: number, token: string) {
    const response = api.get(`/meeting/get-all-calendar/${month}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
    .then(function(response) {        
        return response.data
    })  
    .catch(function(error) {
        throw error
    })

    return response
}

export function getActivityById(id: string | undefined, token: string) {    
    const response = api.get(`/meeting/get/${id}`, {
         headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function(response) {
        console.log(response.data)
        return response.data
    })
    .catch(function(error) {
        throw error
    })

    return response
}