import express from "express";
import { insertUser } from "../controller/UserController.js";

const router = express.Router();

router.post(`/signin`, insertUser);

export default router;
