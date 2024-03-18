import express from "express";
import { getDonation, getLike, insertLike } from "../controller/MainController.js"; 

const router = express.Router();

router.get(`/donation`, getDonation); 
router.post(`/like`, insertLike); 
router.get(`/like`, getLike); 

export default router;
