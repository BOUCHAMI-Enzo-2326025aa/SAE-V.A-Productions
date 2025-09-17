import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";
import { router as userRouter } from "./routes/userRoute.js";
import { router as invoiceRouter } from "./routes/invoiceRoute.js";
import { router as contactRouter } from "./routes/contactRoute.js";
import { router as orderRouter } from "./routes/orderRoute.js";
import eventRoutes from "./routes/eventRoutes.js";
//import nodemailer from "nodemailer";

const app = express();

app.get("/invoices/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "invoices", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Erreur lors de l'envoi du fichier:", err);
      res.status(500).send("Erreur lors du téléchargement du fichier");
    }
  });
});

function setCorsHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_LINK);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Auth-Token"
  );
  next();
}

app.use(setCorsHeaders);

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api", eventRoutes);
app.use("/api/invoice", invoiceRouter);
app.use("/api/order", orderRouter);


app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});


mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
