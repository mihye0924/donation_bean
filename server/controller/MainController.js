import * as MainRepository from "../repository/MainRepository.js";

export async function getDonation(req, res) {   
    const { user_id } = req.query; 
    console.log(user_id);
    const result = await MainRepository.donationData(user_id); 
    console.log(result);
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}