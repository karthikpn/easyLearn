import express from "express";
import { login, register, logout, currentUser } from "../controllers/auth.js";
import { requireSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
export default router;
