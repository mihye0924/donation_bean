import express from "express";
import multer from "multer";
import {
  getFevList,
  getId,
  getUserInfo,
  insertUser,
  kakaologin,
  login,
  updateUser,
} from "../controller/UserController.js";

const router = express.Router();

router.post(`/signin`, insertUser);
router.get(`/signin`, getId);
router.post(`/login`, login);
router.get(`/me`, getUserInfo);
router.post(`/edit`, updateUser);
router.get("/fav", getFevList);
router.post("/kakaologin", kakaologin);
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const { id } = req.query;
      cb(null, id + "." + file.originalname.split(".")[1]);
    },
  }),
});
router.post("/uploads", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({ ok: true });
});

export default router;
