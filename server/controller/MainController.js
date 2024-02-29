import * as MainRepository from "../repository/MainRepository.js";

export async function getDonation(req, res) {   
    const { user_id } = req.query;  
    const result = await MainRepository.donationData(user_id);  
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}