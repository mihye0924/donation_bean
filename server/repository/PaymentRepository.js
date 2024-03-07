import { db } from "../db/database.js";

export async function insertPayment( 
    user_id, donation_no, donation_support, donation_current, payment_division, payment_method, payment_card_name, payment_card_company, payment_card_expiry, 
    payment_card_num, payment_account_name, payment_account_company, payment_account_transfer, payment_account_num, payment_birth, payment_company_code) {
    const sql = `insert into payment (user_id, donation_no, donation_support, donation_current, payment_division, payment_method, payment_card_name, payment_card_company, payment_card_expiry, 
    payment_card_num, payment_account_name, payment_account_company, payment_account_transfer, payment_account_num, payment_birth, payment_company_code, payment_createAt) values
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`;
    return db
    .execute(sql, [
        user_id, donation_no, donation_support, donation_current, payment_division, payment_method, payment_card_name, payment_card_company, payment_card_expiry, 
        payment_card_num, payment_account_name, payment_account_company, payment_account_transfer, payment_account_num, payment_birth, payment_company_code
    ])
    .then((row) => "ok");
}

export async function getDonation(donation_no, user_id) {
    const sql = `select * from donation where donation_no = ? and user_id = ?`;
  
    return db
    .execute(sql, [user_id, donation_no])
    .then((row) => row[0][0]);
}
export async function getUser(user_id) {
    const sql = `select user_name, user_email from user where user_id = ?`;
  
    return db
    .execute(sql, [user_id])
    .then((row) => row[0][0]);
}

export async function getPayment(donation_no, user_id) {
    const sql = `select * from payment where donation_no = ? and user_id = ?`;
  
    return db
    .execute(sql, [user_id, donation_no])
    .then((row) => row[0]);
}
