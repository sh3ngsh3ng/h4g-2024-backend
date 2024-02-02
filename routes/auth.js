import express from "express";
import { register, login } from "../controllers/auth";
import { registerMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/register", registerMiddleware, register);
router.post("/login", login);

module.exports = router;
