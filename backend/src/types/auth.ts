export enum UserRole {
  OFICINA = 'OFICINA',
  REGULADOR = 'REGULADOR',
  SEGURADORA = 'SEGURADORA',
  ADMIN = 'ADMIN'
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}