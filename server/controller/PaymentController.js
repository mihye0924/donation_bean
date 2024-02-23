import * as PaymentRepository from "../repository/PaymentRepository.js";
export async function insertPayment(req, res) { 
    const { 
        user_id, 
        donation_no, 
        donation_support, 
        donation_current, 
        payment_division,
        payment_method, 
        payment_card_name, 
        payment_card_company,
        payment_card_expiry, 
        payment_card_num, 
        payment_account_name,
        payment_account_company, 
        payment_account_transfer, 
        payment_account_num,
        payment_birth, 
        payment_company_code } = req.body; 

    let result = await PaymentRepository.paymentInfo(
        user_id, 
        donation_no, 
        donation_support, 
        donation_current, 
        payment_division,
        payment_method, 
        payment_card_name, 
        payment_card_company,
        payment_card_expiry, 
        payment_card_num, 
        payment_account_name,
        payment_account_company, 
        payment_account_transfer, 
        payment_account_num,
        payment_birth, 
        payment_company_code
    );
    if(result === "ok") {
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }  
}

export async function getDonation(req, res) {   
    const { user_id, donation_no } = req.query; 
    const result = await PaymentRepository.donationData(user_id, donation_no); 
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}
export async function getUser(req, res) {   
    const { user_id } = req.query; 
    const result = await PaymentRepository.userData(user_id);  
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}

export async function getPayment(req, res) {   
    const { user_id, donation_no } = req.query; 
    const result = await PaymentRepository.paymentData(user_id, donation_no);  
    // console.log(result,"result")
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}