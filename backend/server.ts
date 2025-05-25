import * as dotenv from "dotenv";
import mysql from "mysql";
import express from "express";
import cors from "cors";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do banco de dados usando variáveis do .env
declare namespace NodeJS {
    export interface ProcessEnv {
      SECRET_KEY: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      PORT: string;
    }
  }

  const db: mysql.Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});