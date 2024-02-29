import { db } from "../db/database.js";

export async function donation(
    user_id,
    donation_name, 
    donation_image, 
    donation_content, 
    donation_company, 
    donation_goal, 
    donation_period,
    donation_category, 
    donation_status
    ) {
    const sql = `insert into donation ( user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_createAt, donation_status) values (?, ?, ?, ?, ?, ?, ?, ?, now(), ?)`;
    return db
    .execute(sql, [
        user_id,
        donation_name, 
        donation_image, 
        donation_content, 
        donation_company, 
        donation_goal, 
        donation_period,
        donation_category, 
        donation_status
    ])
    .then((row) => "ok");
}
export async function getUserList() {
    const sql = `select * from user`;
    return db
    .execute(sql)
    .then((row) => row[0]);
}

export async function deleteUser(user_no) {
    const sql = `delete from user where user_no = ?`;
    return db
    .execute(sql,[user_no])
    .then((row) => "ok");
}
export async function updateUser(user_no, user_enum) {
    const sql = `update user set user_enum = ? where user_no = ?`;
    return db
    .execute(sql,[user_enum, user_no])
    .then((row) => "ok");
}