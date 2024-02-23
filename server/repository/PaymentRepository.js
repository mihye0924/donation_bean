import { db } from "../db/database.js";

export async function paymentInfo( 
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
    payment_company_code) {
    const sql = `insert into my_db.payment (user_id, donation_no, donation_support, donation_current, payment_division, payment_method, payment_card_name, payment_card_company, payment_card_expiry, 
    payment_card_num, payment_account_name, payment_account_company, payment_account_transfer, payment_account_num, payment_birth, payment_company_code, payment_createAt) values
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`;
    return db
    .execute(sql, [
        user_id, donation_no, donation_support, donation_current, payment_division, payment_method, 
        payment_card_name, payment_card_company, payment_card_expiry, payment_card_num,
        payment_account_name, payment_account_company, payment_account_transfer, payment_account_num,
        payment_birth, payment_company_code
    ])
    .then((row) => "ok");
}