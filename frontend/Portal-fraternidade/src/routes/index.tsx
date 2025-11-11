import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/loginView";
import type { JSX } from "react";
import DashBoard from "../pages/dashboard/dashboardView";
import { ManageUsers } from "../pages/signup/signUpView";
import AuthProvider from "../context/testeContext";
import EditUsers from "../pages/signup/editUsersView";
import Events from "../pages/event/eventView";
import { CreateEvent } from "../pages/event/createEventView";
import  Calendario  from "../pages/calendar/calendarView";


function AppRoutes(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>    
        <Routes>   
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<DashBoard />} />  
          <Route path="/ManageUsers" element={<ManageUsers />} />   
          <Route path="/Agenda" element={<Calendario />} />    
          <Route path="/EditUsers" element={<EditUsers />} />  
          <Route path="/EditUsers/:id" element={<EditUsers />} />   
          <Route path="/Events" element={<Events />} />   
          <Route path="/CreateEvent" element={<CreateEvent />} />  
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;