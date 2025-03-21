import { Router } from "express";

import { loginUser, logout, registerUser } from "../controllers/authController";
import { registerUserValidator } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", ...registerUserValidator, registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

export { router as authRoutes };
