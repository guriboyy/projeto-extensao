import FullCalendar from "@fullcalendar/react";
import { useEffect, useRef, useState } from "react";
import { getAllActivity } from "../services/activityService";
import { useAuthContext } from "../context/testeContext";
import type { Activity, ActivityCalendar, MonthActivity, SelectedActivity } from "../types/api";

export function useCalendar() {

    const calendarRef = useRef<FullCalendar | null>(null);
    const [month, setMonth] = useState("");
    const [activityList, setActivityList] = useState();
    const {token} = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState<SelectedActivity>();
    const [monthNumber, setMonthNumber] = useState(0);

    const updateTitle = () => {
        const api = calendarRef.current?.getApi();        
        if (!api) return;
        
        const date = api.getDate();
        setMonthNumber(date.getMonth() + 1);
        setMonth(
        date.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric"
        })
        );
    };

    useEffect(() => {
        
        updateTitle(); 
               
        async function fetchActivitys() {
            try{
                const response = await getAllActivity(monthNumber,token);                
                const filtrado = response.data.map((item: ActivityCalendar) => ({
                    title: item.titleMeeting,
                    date: item.meetingDate.split("T")[0],
                    hour: item.meetingDate.split("T")[1],
                    frontDesk:item.frontDesk,
                    gospel:item.gospel ,
                    leader:item.leader ,
                    meetingId: item.meetingId,
                    passManager:item.passManager ,
                    reading:item.reading ,
                    soundAndImage: item.soundAndImage,
                    themeGospel: item.themeGospel,
                    vibration: item.vibration
                }));
                console.log(filtrado)
                setActivityList(filtrado)
            } catch {

            }
        }

        fetchActivitys();
    }, [monthNumber]);

    
    useEffect(() => {
          console.log(eventoSelecionado)
    }, [eventoSelecionado])

    const handlePrev = () => {
        const api = calendarRef.current?.getApi();
        if (!api) return;
        api.prev();        
        updateTitle();
    };

    const handleNext = () => {
        const api = calendarRef.current?.getApi();
        if (!api) return;
        api.next();        
        updateTitle();
    };

    return {
        month,
        handleNext,
        handlePrev,
        updateTitle,
        calendarRef,
        activityList,
        setShowModal,
        setEventoSelecionado,
        showModal,
        eventoSelecionado
    }
    
}