import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/loginView";
import type { JSX } from "react";
import DashBoard from "../pages/dashboard/dashboardView";


function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>    
      <Routes>   
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<DashBoard />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;