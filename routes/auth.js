import express from "express";
import { register, login, getUserById, updateUser } from "../controllers/auth";
import { authMiddleware, registerMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/register", registerMiddleware, register);
router.post("/login", authMiddleware, login);
router.get("/user", authMiddleware, getUserById);
router.put("/userUpdate/:uid", updateUser);

module.exports = router;
