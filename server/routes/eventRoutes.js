import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";

const router = express.Router();

// Définir les routes pour les événements
router.post("/events", createEvent);
router.get("/events", getEvents);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
