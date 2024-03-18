import express from "express";
import { naverlogin } from "../controller/UserController.js";
const router = express.Router();

router.get("/", naverlogin);

export default router;
