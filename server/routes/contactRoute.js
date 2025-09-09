import express from "express";
import {
  getAllContacts,
  createContact,
  getContactById,
  deleteContact,
  updateContact,
} from "../controller/contactController.js";

export const router = express.Router();

router.get("/", getAllContacts);

router.post("/create", createContact);

router.get("/:id", getContactById);

router.delete("/:id", deleteContact);

router.put("/:id", updateContact);
