import { Router } from "express";
import { authorization, login, register } from "../controllers/authController";
import { authenticateToken, authorizeRoles } from "../middlewares/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post(
  "/authorization",
  authenticateToken,
  authorizeRoles("ADMIN"),
  authorization
);

export default router;