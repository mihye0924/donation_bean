import express from "express";
import {
  getId,
  getUserInfo,
  insertUser,
  login,
} from "../controller/UserController.js";

const router = express.Router();

router.post(`/signin`, insertUser);
router.get(`/signin`, getId);
router.post(`/login`, login);
router.get(`/me`, getUserInfo);

export default router;
