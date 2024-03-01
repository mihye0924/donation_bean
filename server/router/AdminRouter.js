import express from "express";
import { insertDonation, getDonation, updateDonation, upLoadFile, getUserList, deleteUser, updateUser, deleteDonation } from "../controller/AdminController.js"; 

import path from 'path';  
import multer from 'multer';
const router = express.Router(); 
const __dirname = path.resolve();  

const upload = multer({
    storage: multer.diskStorage({ 
        destination(req, file, cb) { // 저장 위치
            cb(null, path.join(__dirname, "/public/uploads/donation")); 
        },
        filename: (req, file, cb) => {	 
            cb(null, file.originalname) 
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
}); 


router.get(`/donation`, getDonation); 
router.post(`/donation`, insertDonation); 
router.put(`/donation`, updateDonation); 
router.delete(`/donation`, deleteDonation); 
router.post(`/upload`, upload.single('file'), upLoadFile); 
router.get(`/user`, getUserList); 
router.delete(`/user`, deleteUser); 
router.put(`/user`, updateUser); 

export default router;