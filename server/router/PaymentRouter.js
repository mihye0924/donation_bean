import express from "express";
import { insertPayment } from "../controller/PaymentController";

const router = express.Router();

router.post("/payment", insertPayment);

export default router;