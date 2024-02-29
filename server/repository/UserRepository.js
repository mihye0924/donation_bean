import { db } from "../db/database.js";

export async function getId(id) {
  const sql = `select count(user_id) as cnt from user where user_id =?`;
  return db.execute(sql, [id]).then((row) => row[0][0]);
}

export async function insertUser(
  user_name,
  user_id,
  user_pw,
  user_email,
  user_phone
) {
  const sql = `insert into user (user_name,user_id,user_pw,user_email,user_nick,user_phone,user_enum,user_createAt)values (?,?,?,?,'기본이름',?,0,now())`;
  return db
    .execute(sql, [user_name, user_id, user_pw, user_email, user_phone])
    .then((row) => "ok");
}

export async function login(id) {
  const sql = `SELECT count(user_pw) AS cnt,any_value(user_pw) AS pass  FROM user where user_id =?`;
  return db.execute(sql, [id]).then((row) => row[0][0]);
}

export async function getUserInfo(id) {
  const sql = `select  user_name, user_avatar,user_id,user_email,user_nick,user_phone,DATEDIFF(NOW(), user_createAt) as user_createAt from user where user_id = ? `;
  return db.execute(sql, [id]).then((row) => row[0][0]);
}

export async function updateUser(
  user_email,
  user_phone,
  user_pw,
  user_name,
  user_nick,
  user_avatar,
  user_id
) {
  const sql = `update user  set user_email=? ,user_phone=?, user_pw=?,  user_name=?, user_nick=?, user_avatar=? where user_id = ?`;
  return db
    .execute(sql, [
      user_email,
      user_phone,
      user_pw,
      user_name,
      user_nick,
      user_avatar,
      user_id,
    ])
    .then((row) => "ok");
}

export async function getFevList(id) {
  const sql = `select  * from donation inner join fav on donation.donation_no = fav.donation_no where fav.user_id  = ?`;
  return db.execute(sql, [id]).then((row) => row[0][0]);
}
