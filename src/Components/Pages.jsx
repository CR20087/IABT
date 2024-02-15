import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';

import Login from '../Pages/Login'
import Register from '../Pages/Register';
import Home from '../Pages/Home';

//Importing all pages of application

function Pages() {
  const location = useLocation();
  return (
    //Routes with ':___' are values which can be used by the apps
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Home" element={<Home/>} />
    </Routes>
  );
}


export default Pages