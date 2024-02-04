import express from "express";
import {
  createEvent,
  getEvents,
  getEventBySlug,
  deleteEventBySlug,
  updateEvent,
} from "../controllers/event";

const router = express.Router();

router.post("/create", createEvent);
router.get("/list", getEvents);
router.get("/get/:slug", getEventBySlug);
router.delete("/delete/:slug", deleteEventBySlug);
router.put("/update/:slug", updateEvent);
module.exports = router;
