import { db } from "../db/database.js";

export async function donationData() {
  const sql = `select * from donation`;

  return db.execute(sql).then((row) => row[0]);
}

export async function getLike(user_id, donation_no) {
  const sql = `select * from fav user_id = ? and donation_no = ?`;

  return db
  .execute(sql, [user_id, donation_no])
  .then((row) => "ok");
}

export async function insertLike(user_id, donation_no) {
  const sql = `insert into fav (user_id, donation_no) values (?,?)`;

  return db
  .execute(sql, [user_id, donation_no])
  .then((row) => row[0][0]);
}
