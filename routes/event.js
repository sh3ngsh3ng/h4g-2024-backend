import express from "express";
import {
  createEvent,
  getEvents,
  getEventBySlug,
  deleteEventBySlug,
  updateEvent,
  joinEvent,
  markAttendance,
  listAttendance,
  adminMarkAttendance,
  adminUnmarkAttendance,
  adminGenerateQr,
  adminCompleteEvent,
} from "../controllers/event";
import { authMiddleware, isAdminMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/create", createEvent);
router.get("/list", getEvents);
router.get("/get/:slug", getEventBySlug);
router.delete("/delete/:slug", deleteEventBySlug);
router.put("/update/:slug", updateEvent);

router.post("/joinEvent/:slug", authMiddleware, joinEvent)
router.get("/event/:slug/markAttendance/:token", authMiddleware, markAttendance)
router.get("/event/:slug/listAttendance", isAdminMiddleware, listAttendance)
router.post("/event/:slug/listAttendance/mark", isAdminMiddleware, adminMarkAttendance)
router.post("/event/:slug/listAttendance/unmark", isAdminMiddleware, adminUnmarkAttendance)
router.get("/event/:slug/listAttendance/generate", isAdminMiddleware, adminGenerateQr)
router.get("/event/:slug/listAttendance/complete", isAdminMiddleware, adminCompleteEvent)

module.exports = router;
