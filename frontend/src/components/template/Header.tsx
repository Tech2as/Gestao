import './Header.css'
import React, { use, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


const MyComponent = (props: any) => {
  
    const { user } = useAuth();

    return (
        <header className="header d-none d-sm-flex justify-content-center">
            <h1 className="mt-3 d-flex">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>

            <div id="propsname">
                <h3 id="name-header">Olá, {user?.name}!</h3>
            </div>
        </header>
    );
};

export default MyComponent;