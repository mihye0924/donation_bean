import express from "express";
import { insertPayment, getDonation, getUser, getPayment } from "../controller/PaymentController.js"; 

const router = express.Router();

router.post(`/`, insertPayment); 
router.get(`/all`, getPayment); 
router.get(`/donation`, getDonation); 
router.get(`/user`, getUser); 

export default router;
