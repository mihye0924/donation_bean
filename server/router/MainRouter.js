import express from "express";
import { getDonation, getLike, insertLike } from "../controller/MainController.js"; 

const router = express.Router();

router.get(`/donation`, getDonation); 
router.get(`/like`, insertLike); 
router.post(`/like`, getLike); 

export default router;
