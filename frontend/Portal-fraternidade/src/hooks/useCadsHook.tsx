import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/testeContext";
import { getSchedule } from "../services/dashboardService";
import { TemplateDate } from "../utils/utils";
import type { ScheduleResponse } from "../types/api";


export function useScheduleHook() {

    // const {id} = useParams();
    const {token} = useAuthContext();
    const [schedule, setSchedule] = useState<ScheduleResponse>();
    // const {convertDate} = TemplateDate("");
    useEffect(() => {
        async function fetchSchedule() {     
      
        try {
            const response = await getSchedule(token);  
            setSchedule(response); 
            
        } catch (error) {
        
        }
        }

        if (token) {      
            fetchSchedule();
        } else {
        
    }
  }, [token])

  useEffect(() => {
    console.log(schedule?.data)
  },[schedule])
  return{
    schedule
  }
}