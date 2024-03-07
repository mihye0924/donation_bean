import * as AdminReopository from "../repository/AdminReopository.js";   
 
export function upLoadFile(req, res) {
    if (!req.file) {
        return res.status(400).send({ error: '이미지를 업로드해주세요.' });
    }   
        return res.send({ ok: true });
}
  
export async function insertDonation(req, res) {    
    const {  
        user_id,
        donation_name, 
        donation_image, 
        donation_content, 
        donation_company, 
        donation_goal, 
        donation_period,
        donation_category, 
        donation_status
     } = req.body;  
    const result = await AdminReopository.donation(
        user_id,
        donation_name, 
        donation_image, 
        donation_content, 
        donation_company, 
        donation_goal, 
        donation_period,
        donation_category, 
        donation_status
    );  
    
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }   
}

export async function getDonation(req, res) {  
    const { donation_no } = req.query;    
    const result = await AdminReopository.getDonation(donation_no); 
    res.json({ ok: true, result: result });
} 

export async function updateDonation(req, res) {  
    const { 
        donation_name,  
        donation_image, 
        donation_content, 
        donation_company, 
        donation_goal, 
        donation_period,
        donation_category, 
        donation_status, 
        donation_no,
    } = req.body;      
    const result = await AdminReopository.updateDonation( 
        donation_name,  
        donation_image, 
        donation_content, 
        donation_company, 
        donation_goal, 
        donation_period,
        donation_category, 
        donation_status, 
        donation_no,
    ); 
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }   
} 

export async function deleteDonation(req, res) {  
    const { donation_no } = req.query;   
    const result = await AdminReopository.deleteDonation(donation_no); 
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }   
} 

export async function getUserList(req, res) { 
    const result = await AdminReopository.getUserList(); 
    res.json({ ok: true, result: result });
}

export async function deleteUser(req, res) {  
    const { user_no } = req.query;    
    const result = await AdminReopository.deleteUser(user_no); 
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }   
}
  
export async function updateUser(req, res) {  
    const { user_no, user_enum } = req.query;   
    const result = await AdminReopository.updateUser(user_no, user_enum); 
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }   
}
  