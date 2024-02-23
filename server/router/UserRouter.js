import express from "express";
import { getId, insertUser, login } from "../controller/UserController.js"; 

const router = express.Router();

router.post(`/signin`, insertUser);
router.get(`/signin`, getId);
router.post(`/login`, login); 

export default router;
