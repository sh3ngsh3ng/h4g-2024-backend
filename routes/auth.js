import express from "express";
import { register, login, getUserById, updateUser } from "../controllers/auth";
import { authMiddleware, isAdminMiddleware, registerMiddleware } from "../middleware/auth-middleware";
import { viewCerts } from "../controllers/event";

const router = express.Router();

router.post("/register", registerMiddleware, register);
router.post("/login", authMiddleware, login);
router.get("/user", authMiddleware, getUserById);
router.put("/userUpdate", authMiddleware, updateUser);


module.exports = router;
