import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";
import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password} = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ error: "Email já existe" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, active: false},
    });

    res.status(201).json({ 
      message: "Usuário criado com sucesso", 
      user: { id: user.id, name: user.name } 
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Credenciais inválidas" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(400).json({ error: "Credenciais inválidas" });
      return;
    }

    if(user.active === false){
       res.status(401).json({ error: "Aguarde seu login ser efetivado" })
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role?.toUpperCase(), name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function authorization(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "pong" });
}