import { useState } from "react";
import './Nav.css';
import { Link, useNavigate  } from "react-router-dom";
import  { useAuth } from "../../contexts/AuthContext";

const Nav = ({
}: any) => {
  const { user,logout } = useAuth();
  
    return (
        <aside className="menu-area">
            <nav className="menu">

                <Link to="/home">
                    <i className="fa fa-home"></i> Início
                </Link>
                
                {(user?.role === "ADMIN") && (
                <Link to="/usuarios">
                    <i className="fa fa-users"></i> Usuários
                </Link>
                )}
                
                   {(user?.role === "ADMIN" || user?.role === "REGULADOR") && (
               <div className="menu-item">
               <button
                   className="menu-link sinistros-button"
               >
                  <i className="fa fa-paperclip" aria-hidden="true"></i> Sinistros
               </button>
                   <div className="submenu">
                   <Link to="/sinistros" className="submenu-link">
                     <i className="fa fa-car" aria-hidden="true"></i>Sinistros
                   </Link>
                 
                   <Link to="/cobrancas" className="submenu-link">
                     <i className="fa fa-calendar" aria-hidden="true"></i>Cobranças
                   </Link>
                 </div>
           </div>
            )}

                    <Link to="/conta">
                        <i className="fa fa-users"></i> Minha Conta
                    </Link>

                <button className="btn btn-link deslogar" onClick={logout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Deslogar
                </button>
            </nav>
        </aside>
    );
};

export default Nav;