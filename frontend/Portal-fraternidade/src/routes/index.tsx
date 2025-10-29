import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";


function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>    
      <Routes>       
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;