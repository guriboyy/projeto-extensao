import { useEffect, useState } from "react";
import { useAuthContext } from "../context/testeContext";
import type { UserManagerResponse, Activity, ActivityCalendar, ActivityRole } from "../types/api";

import { useParams } from "react-router-dom";
import { getAllUsers } from "../services/manageMembers";
import { createActivity, getActivityById } from "../services/activityService";
import { handleNavigate } from "./useUtilHook";


export function useActivityHook() {

    const {id} = useParams();
    const {token} = useAuthContext();
    const {goingAhead} = handleNavigate();
    const [usersList, setUsersList] = useState<UserManagerResponse>();

    const [activity, setActivity] = useState<Activity>({
      title : "",
      date : "",
      hour: "",
      frontDesk : 1,
      gospel : 1,
      leader : 1, 
      passManager : 1,
      reading : 1,
      soundAndImage : 1,
      vibration : 1,
      themeGospel : ""
    })

  const defaultActivityRole: ActivityRole = {
    userAccountId: 0,
    name: ""
  };

    const [editActivity, setEditActivity] = useState<ActivityCalendar>({
      frontDesk: { ...defaultActivityRole },
      gospel: { ...defaultActivityRole },
      leader: { ...defaultActivityRole },
      meetingDate: "",
      hour: "",
      meetingId: 0,
      passManager: { ...defaultActivityRole },
      reading: { ...defaultActivityRole },
      soundAndImage: { ...defaultActivityRole },
      themeGospel: "",
      titleMeeting: "",
      vibration: { ...defaultActivityRole }
    })

    const [date, setDate] = useState(
        new Date()
    )

    useEffect(() => { 
      
        async function getAllUsersActivity() {            
            const response = await getAllUsers(token);
            console.log(response)
            setUsersList(response)
        }
        
        async function getActivity() {
            try{
                const response = await getActivityById(id, token)                
                setEditActivity(response.data.map((item : ActivityCalendar) => ({
                    frontDesk: { userAccountId: item.frontDesk.userAccountId,
                                  name: "" },
                    gospel: {userAccountId: 0,
                              name: "" },
                    leader: { userAccountId: 0,
                                name: "" },
                    meetingDate: "",
                    hour: "",
                    meetingId: 0,
                    passManager: { userAccountId: 0,
                                    name: "" },
                    reading: { userAccountId: 0,
                                 name: ""},
                    soundAndImage: { userAccountId: 0,
                                        name: "" },
                    themeGospel: "",
                    titleMeeting: "",
                    vibration: { userAccountId: 0,
                                  name: "" }
                })))
            } catch (ex) {

            }
        }
        
        if(id){
          getActivity()       
        } 

        getAllUsersActivity(); 
        
    },[])

    useEffect(() => {
          console.log(activity)
    }, [activity])

    const handleChange = ( id: string | undefined,
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
          if(id){
            const { name, value } = e.target;
            setEditActivity(prev => ({
            ...prev,
            [name]: name === "status" ? value === "true" : value
          }));
          } else {
            const { name, value } = e.target;
          setActivity(prev => ({
            ...prev,
            [name]: name === "status" ? value === "true" : value
          }));
          }
          
    };

    const handleChangeDate = (date: Date | null) => {
      setDate(prev => ({
          ...prev,
          date: date
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          try{
            let response:any = ""
            if(id){
                response = await getActivityById(token,id)
            } else {                
                response = await createActivity(token,activity)
            }
          } catch (err){
            console.log(err)
          }
    }
   

    return{
        handleChange,
        handleSubmit,
        handleNavigate,
        handleChangeDate,
        setDate,
        usersList,
        activity,
        editActivity,
        id
    }
}