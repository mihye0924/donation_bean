import { db } from "../db/database.js";

export async function donationData(user_id) {
    const sql = `select * from donation where user_id = ?`;
  
    return db
    .execute(sql, [user_id])
    .then((row) => row[0]);
}