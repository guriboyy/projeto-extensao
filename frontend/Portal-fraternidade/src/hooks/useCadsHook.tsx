import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/testeContext";
import { getSchedule } from "../services/dashboardService";



export function useScheduleHook() {

    // const {id} = useParams();
    const {token} = useAuthContext();

    useEffect(() => {
        async function fetchSchedule() {
      
      
        try {
            const response = await getSchedule(token);     
            console.log(response)
            const responseData = {
            
            };    
            
            // setEditUsers(userData); 
            
        } catch (error) {
        
        }
        }

        if (token) {      
            fetchSchedule();
        } else {
        
    }
  }, [token])

  return{
    
  }
}