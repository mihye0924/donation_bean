import * as UserRepository from "../repository/UserRepository.js";
import bcryptjs from "bcrypt";
export async function insertUser(req, res) {
  const { user_id, user_pw, user_phone, user_name, user_email } = req.body;

  const hashPass = bcryptjs.hashSync(user_pw, 8);
  let result = await UserRepository.insertUser(
    user_name,
    user_id,
    hashPass,
    user_email,
    user_phone
  );
  if (result === "ok") res.json({ ok: true });
}

/* user_name,user_id,user_pw,user_email,user_nick,user_phone */
