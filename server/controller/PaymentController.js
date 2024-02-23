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