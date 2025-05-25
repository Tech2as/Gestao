import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Footer from "../components/template/Footer";
import Nav from "../components/template/Nav";
import Logo from '../components/template/Logo';

const App = () => {
return (
    <div className="app">
          <Logo />
          <Nav/>
           <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </div>
)

};

export default App