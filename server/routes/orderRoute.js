import express from "express";
import {
  createOrder,
  getOrders,
  getOrderPdf,
  getOrdersByEntreprise,
  generateOrder,
  validateOrder,
  cancelOrder,
} from "../controller/orderController.js";

export const router = express.Router();

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:entreprise", getOrdersByEntreprise);
router.post("/generate-order", generateOrder);
router.get("/pdf/:id", getOrderPdf);
router.post("/validate", validateOrder);
router.post("/cancel", cancelOrder);
