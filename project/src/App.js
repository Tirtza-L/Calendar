import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from "react"
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import Calendar from './Calendar';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;

//https://mui.com/material-ui/react-alert