import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { useState, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../routes/PrivateRoute';

import { useAuth } from "../contexts/AuthContext";
import type { Role } from "../contexts/AuthContext";

// Páginas do projeto
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Sinistros from '../pages/Sinistros';
import Usuarios from '../pages/Usuarios';


//Template do projeto
import Home from '../pages/Home';
import Footer from "../components/template/Footer";
import Nav from "../components/template/Nav";
import Logo from '../components/template/Logo';


const App = () => {
     const { user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isCadastroPage = location.pathname === "/cadastro";

  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<PrivateRoute roles={["ADMIN", "OFICINA" as Role]} />}>
        <Route path="/home" element={<Home />} />
      </Route>

       <Route element={<PrivateRoute roles={["ADMIN" as Role]} />}>
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>

      <Route element={<PrivateRoute roles={["OFICINA", "ADMIN" as Role]} />}>
        <Route path="/sinistros" element={<Sinistros />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );

  if (isLoginPage || isCadastroPage) {
    return (
      <div className="login-layout">
        <div className="content">
          {routes}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Logo />
      <Nav />
      {routes}
      <Footer />
    </div>
  );
};

export default App