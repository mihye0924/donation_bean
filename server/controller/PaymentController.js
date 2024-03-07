import * as PaymentRepository from "../repository/PaymentRepository.js";
import Dotenv from "dotenv";
Dotenv.config();

export async function insertPayment(req, res) {    
    console.log(req.body,"테스트!")
    const { user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer } = req.body; 
    try {
        const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post", // POST method
        headers: { "Content-Type": "application/json" }, 
        data: {
          imp_key: process.env.IMP_API_KEY, // REST API 키
          imp_secret: process.env.IMP_API_SECRET_KEY // REST API Secret
        }
        });
        const { access_token } = getToken.data; // 인증 토큰
        const paymentResult = await axios({
            url: `https://api.iamport.kr/subscribe/payments/again`,
            method: "post",
            // 인증 토큰을 Authorization header에 추가
            headers: { "Authorization": access_token }, 
            data: {
            customer_uid,
            merchant_uid: "order_monthly_0001", // 새로 생성한 결제(재결제)용 주문 번호
            amount: 100,
            name: "월간 이용권 정기결제"
            }
        });
        const { code, message } = paymentResult;
        if (code === 0) { // 카드사 통신에 성공(실제 승인 성공 여부는 추가 판단이 필요함)
            if ( paymentResult.status === "paid" ) { //카드 정상 승인
            res.send();
            } else { //카드 승인 실패 (예: 고객 카드 한도초과, 거래정지카드, 잔액부족 등)
            //paymentResult.status : failed 로 수신됨
            res.send();
            }
            res.send();
        } else { // 카드사 요청에 실패 (paymentResult is null)
            res.send();
        } 
    } catch (e) {
        res.status(400).send(e);
    }

    const result = await PaymentRepository.insertPayment( user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer );
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