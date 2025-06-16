import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const { login, user } = useAuth();

  // validação do form, recebendo os valores
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await Axios.post(`${API_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        login(response.data.token);

      } else {
        
        alert("Login falhou. Verifique suas credenciais.");
        
      }
    } catch (error: any) {
    if (Axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error;

      if (status === 401 && message === "Aguarde seu login ser efetivado") {
        toast.warning("Seu cadastro ainda não foi ativado. Aguarde a aprovação!");
      } else if (message) {
        toast.error(message);
      } else {
        toast.error("Erro ao fazer login.");
      }
    } else {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado ao se conectar com o servidor.");
    }
  }
  };


  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(5, "A senha deve ter pelo menos 5 caracteres")
      .required("Campo obrigatório"),
  });

  return (
    <div className="login-layout">
      <div className="content">
        <ToastContainer />
        <h2 className="text-center mb-4">Sistema de Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Insira seu email"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Senha</label>
              <Field
                type="password"
                name="password"
                placeholder="Insira sua senha"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-2">
              Entrar
            </button>
            <Link
              to="/cadastro"
              className="btn btn-outline-primary w-100 text-decoration-none"
            >
              Cadastre-se
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
