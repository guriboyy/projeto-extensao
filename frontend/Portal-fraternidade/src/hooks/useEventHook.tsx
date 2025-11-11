import { useEffect, useState } from "react";
import { useAuthContext } from "../context/testeContext";
import type { EventsReponse, Event } from "../types/api";
import { createEvent, getEvents } from "../services/eventsServive";
import { useNavigate, useParams } from "react-router-dom";


export function useEvent() {

    const navigate = useNavigate();
    const {id} = useParams();
    const {token} = useAuthContext();
    const [event, setEvent] = useState<Event>({
        title: "",
        eventDate: "",
        description: "",
        time: ""
    });

    const [eventsList, setEventsList] = useState<EventsReponse>()

    const [date, setDate] = useState(
        new Date()
    )

    useEffect(() => {
        
        async function postNewEvent() {            
            const response = await getEvents();
            console.log(response)
            setEventsList(response)
        }
       
        postNewEvent();  
    },[])

    const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
          const { name, value } = e.target;
          setEvent(prev => ({
            ...prev,
            [name]: name === "status" ? value === "true" : value
          }));
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
                // response = await updateUser(token, editUsers, id)
            } else {
                event.eventDate = event.eventDate +" "+ event.time
                response = await createEvent(event,token)
            }
          } catch (err){
            console.log(err)
          }
    }

    const handleNavigate = () => {    
      navigate(`/Events/`)  

    }

    return{
        handleChange,
        handleSubmit,
        handleNavigate,
        handleChangeDate,
        setDate,
        eventsList,
        event
    }
}