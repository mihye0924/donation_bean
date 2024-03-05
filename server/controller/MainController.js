import * as MainRepository from "../repository/MainRepository.js";

export async function getDonation(req, res) {    
    const result = await MainRepository.donationData();  
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}