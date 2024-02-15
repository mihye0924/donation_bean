import { db } from "../db/database.js";

export async function insertUser(
  user_name,
  user_id,
  user_pw,
  user_email,
  user_phone
) {
  const sql = `  insert into user (user_name,user_id,user_pw,user_email,user_nick,user_phone,user_enum,user_createAt)values (?,?,?,?,'기본이름',?,0,now())`;
  return db
    .execute(sql, [user_name, user_id, user_pw, user_email, user_phone])
    .then((row) => "ok");
}

/* export async function insertReview(id, isbn, title, content, point) {
    const sql = `INSERT review (id,isbn,title,content,point,rdate)value(?,?,?,?,?,curdate())`;
    return db.execute(sql, [id, isbn, title, content, point]).then((row) => "ok");
  } */
