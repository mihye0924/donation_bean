import { db } from "../db/database.js";

export async function insertPayment(user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer) {
    const sql = `insert into payment (user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer, payment_createAt) values
    (?, ?, ?, ?, ?, ?, ?, ?, now());`;
    return db
    .execute(sql, [user_id, donation_no, donation_support, donation_current, payment_method, payment_uid, payment_name, payment_transfer])
    .then((row) => "ok");
}

export async function getDonation(donation_no, user_id) {
    const sql = `select * from donation where donation_no = ?`;
  
    return db
    .execute(sql, [donation_no])
    .then((row) => row[0][0]);
}
export async function getUser(user_id) {
    const sql = `select user_name, user_email, user_phone from user where user_id = ?`;
  
    return db
    .execute(sql, [user_id])
    .then((row) => row[0][0]);
}

export async function getPayment(donation_no) {
    const sql = `select * from payment where donation_no = ?`;
  
    return db
    .execute(sql, [donation_no])
    .then((row) => row[0]);
}
