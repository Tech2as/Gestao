import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Cadastro() {

  // validação do form, recebendo os valores
const handleSubmit = async (values: { name: string; email: string; password: string }) => {
  try {
    const response = await Axios.post(`${API_URL}/api/auth/register`, {
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("Cadastro realizado, aguarde sua ativação");
    } else {
      toast.error("Erro ao tentar cadastrar!");
    }
  } catch (error: any) {
    console.error("Erro ao fazer registro:", error);

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("E-mail já existente!");
    }
  }
};

const validationSchema = yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
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
        <h2 className="text-center mb-4">Sistema de Cadastro</h2>
         <Formik
          initialValues={{ name: "",email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="mb-3">

              <label htmlFor="email">Nome</label>
               <Field
                type="text"
                name="name"
                placeholder="Insira um nome"
                className="form-control rounded-0"
              />
                <ErrorMessage
                component="div"
                className="text-danger"
                name="name"
              />
              </div>

              <div className="mb-3">
            <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Insira um email"
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
                placeholder="Insira uma senha"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-2">
              Cadastrar
            </button>
            <Link
              to="/login"
              className="btn btn-outline-primary w-100 text-decoration-none"
            >
              Login
            </Link>
          </Form>
        </Formik>
        </div>
        </div>
)
}