import express from "express";
import {
  getInvoices,
  createFacture,
  getInvoicesByCompany,
  getInvoicesPdf,
  getAllClients,
  validateInvoice,
  getClientInvoices,
} from "../controller/invoiceController.js";

export const router = express.Router();

router.post("/create", createFacture);
router.get("/", getInvoices);
router.get("/compagnies", getAllClients);
router.get("/:entreprise", getInvoicesByCompany);
router.get("/pdf/:id", getInvoicesPdf);
router.get("/client/:id", getClientInvoices);
router.post("/validate/:id", validateInvoice);
