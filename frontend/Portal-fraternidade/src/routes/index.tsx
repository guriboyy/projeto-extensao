import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/loginView";
import type { JSX } from "react";
import DashBoard from "../pages/dashboard/dashboardView";
import { ManageUsers } from "../pages/signup/signUpView";


function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>    
      <Routes>   
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<DashBoard />} />  
        <Route path="/ManageUsers" element={<ManageUsers />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;