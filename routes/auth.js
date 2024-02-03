import express from "express";
import { register, login } from "../controllers/auth";
import { authMiddleware, registerMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/register", registerMiddleware, register);
router.post("/login", authMiddleware, login);

module.exports = router;
