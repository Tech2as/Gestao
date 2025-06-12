import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/auth";

export const requireRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Acesso negado. Permissões insuficientes' 
      });
    }

    next();
  };
};

// Funções helper para verificar permissões específicas
export const canAccessAdminPanel = (role: UserRole): boolean => {
  return role === UserRole.ADMIN;
};

export const canManageUsers = (role: UserRole): boolean => {
  return [UserRole.ADMIN, UserRole.SEGURADORA].includes(role);
};

export const canViewAllSinistros = (role: UserRole): boolean => {
  return [UserRole.ADMIN, UserRole.SEGURADORA, UserRole.REGULADOR].includes(role);
};

export const canCreateSinistro = (role: UserRole): boolean => {
  return [UserRole.ADMIN, UserRole.SEGURADORA].includes(role);
};

export const canProcessSinistro = (role: UserRole): boolean => {
  return [UserRole.REGULADOR, UserRole.OFICINA].includes(role);
};
