import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_fallback";
export const JWT_EXPIRES_IN = "1d";