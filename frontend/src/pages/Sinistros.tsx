import React, { useEffect, useState } from 'react';
import Main from '../components/template/Main';
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import Axios from "axios"

const Sinistros = () => {
return (
    <Main icon="car" title="Sinistros">
      <div className="p-3">
        
        <div className="d-flex justify-content-between pb-3">
          <button className="btn btn-success">
            <i className="fa fa-plus-square px-2"></i>
              Novo Sinistro
          </button>
        </div>
        
        </div>
    </Main>
  );
};
export default Sinistros;