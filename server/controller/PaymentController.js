import * as PaymentRepository from "../repository/PaymentRepository.js";
import Dotenv from "dotenv";
Dotenv.config();

export async function insertPayment(req, res) {     
    const { user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer } = req.body; 
    
    const result = await PaymentRepository.insertPayment( user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer );
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }  
}

export async function getDonation(req, res) {   
    const { donation_no } = req.query; 
    const result = await PaymentRepository.getDonation(donation_no); 
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}
export async function getUser(req, res) {   
    const { user_id } = req.query; 
    const result = await PaymentRepository.getUser(user_id);  
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}

export async function getPayment(req, res) {   
    const { donation_no } = req.query; 
    const result = await PaymentRepository.getPayment(donation_no);   
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}