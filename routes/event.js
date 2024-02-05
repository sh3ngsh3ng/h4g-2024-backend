import express from "express";
import {
  createEvent,
  getEvents,
  getEventBySlug,
  deleteEventBySlug,
  updateEvent,
  joinEvent,
  markAttendance,
} from "../controllers/event";
import { authMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/create", createEvent);
router.get("/list", getEvents);
router.get("/get/:slug", getEventBySlug);
router.delete("/delete/:slug", deleteEventBySlug);
router.put("/update/:slug", updateEvent);

router.get("/joinEvent/:slug", authMiddleware, joinEvent)
router.get("/joinEvent/:slug/markAttendance/:token", authMiddleware, markAttendance)

module.exports = router;
