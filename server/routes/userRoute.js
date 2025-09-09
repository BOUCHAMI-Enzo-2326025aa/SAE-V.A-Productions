import express from "express";
import {
  createUser,
  getAllUser,
  loginUser,
  verifyUser,
} from "../controller/userController.js";
import { authorize } from "../middleware/auth.js";
import { Roles } from "../utils/Roles.js";

export const router = express.Router();

router.get("/", authorize(Roles.Commercial), getAllUser);

router.post("/create", authorize(Roles.Commercial), createUser);

router.post("/login", loginUser);

router.post("/verify", verifyUser);

