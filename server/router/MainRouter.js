import express from "express";
import { getDonation } from "../controller/MainController.js"; 

const router = express.Router();

router.get(`/donation`, getDonation); 

export default router;
