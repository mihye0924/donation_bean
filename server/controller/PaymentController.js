import * as PaymentRepository from "../repository/PaymentRepository.js";
export async function insertPayment(req, res) {    
    const { user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name } = req.body; 

    try {
        const getToken = await axios({
            url: "https://api.iamport.kr/subscribe/payments/schedule/",
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
                imp_key: process.env.IMP_API_KEY, // REST API 키
                imp_secret: process.env.IMP_API_SECRET_KEY // REST API Secret
            }
        });
        const { access_token } = getToken.data.response; // 인증 토큰

        console.log(access_token, "access_token")

    } catch (Err) {
        console.log("err : ", Err)
        res.send({ success: false })
    }


    const result = await PaymentRepository.insertPayment( user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name );
    if(result === "ok") { 
        res.json({ ok: true });
    }else{
        res.json({ ok: false }); 
    }  
}

export async function getDonation(req, res) {   
    const { user_id, donation_no } = req.query; 
    const result = await PaymentRepository.getDonation(user_id, donation_no); 
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
    const { user_id, donation_no } = req.query; 
    const result = await PaymentRepository.getPayment(user_id, donation_no);   
    if(result) { 
        res.json({ ok: true, result });
    }else{
        res.json({ ok: false, result }); 
    }  
}