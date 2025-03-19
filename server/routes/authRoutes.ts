import { Router } from "express";

import { loginUser, registerUser } from "../controllers/authController";
import { registerUserValidator } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", ...registerUserValidator, registerUser);
router.post("/login", loginUser);

export { router as authRoutes };
