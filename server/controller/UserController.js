import * as UserRepository from "../repository/UserRepository.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

export async function getId(req, res) {
  const { id } = req.query;

  if (!id) return res.json({ join: "중복체크전" });
  const result = await UserRepository.getId(id);
  if (result.cnt === 1) {
    return res.json({ join: false });
  }
  if (result.cnt === 0) {
    return res.json({ join: true });
  }
}

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
  if (result === "ok") {
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
}

export async function login(req, res) {
  const { id, pass } = req.body;
  const result = await UserRepository.login(id);
  result.message = "";
  if (result.cnt === 1) {
    if (await bcryptjs.compare(pass, result.pass)) {
      result.message = "로그인 성공";
      const token = jwt.sign({ id: id }, `pB2(?uq0{.9)`);
      result.token = token;
      res.json({ ok: true, result });
    } //아이디 비밀번호 모두 맞을때
    else {
      result.message = "비밀번호가 올바르지 않습니다.";
      res.json({ ok: false, result });
    } //아이디는 있는데 비밀번호 틀렸을때
  } //아이디 있을때
  else {
    result.message = "존재하지 않는 아이디입니다.";
    res.json({ ok: false, result });
  } //아이디 없을때
}

export async function getUserInfo(req, res) {
  const { id } = req.query;
  const result = await UserRepository.getUserInfo(id);
  res.json({ ok: true, userinfo: result });
}

export async function updateUser(req, res) {
  const {
    user_nick,
    user_name,
    user_phone,
    user_pw,
    emailPrefix,
    emailDomain,
    user_id,
    user_avatar,
  } = req.body;

  const user_email = emailPrefix + "@" + emailDomain;
  const hashPass = bcryptjs.hashSync(user_pw, 8);
  const result = await UserRepository.updateUser(
    user_email,
    user_phone,
    hashPass,
    user_name,
    user_nick,
    user_avatar,
    user_id
  );
  if (result === "ok") {
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
}

export async function getFevList(req, res) {
  const { id } = req.query;
  const result = await UserRepository.getFevList(id);
  if (result) {
    res.json({ ok: true, favList: result });
  } else {
    res.json({ ok: false });
  }
}

export async function kakaologin(req, res) {
  const { id, user_nick, user_avatar } = req.body;
  const checkExist = await UserRepository.socialCheck(id);

  if (checkExist.cnt === 1) {
    return res.json({ ok: true });
  }
  if (checkExist.cnt === 0) {
    const createKakaoAccount = await UserRepository.kakaologin(
      id,
      user_nick,
      user_avatar
    );
    if (createKakaoAccount === "ok") {
      res.json({ ok: true });
    }
  }
}

export async function naverlogin(req, res) {
  const CLIENT_ID = `QocupXFUwSvjcgU9M9pE`;
  const CLIENT_PASS = `Iu8PzM8U2t`;
  const { code } = req.query;
  const URL = "https://nid.naver.com/oauth2.0/token";
  const getToken = await fetch(
    `${URL}?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_PASS}&code=${code}&state=9kgsGTfH4j7IyAkg`
  );
  const result = await getToken.json();
  const { access_token } = result;
  const response = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.response)
    .catch((err) => console.log(err))
    .finally();

  const checkExist = await UserRepository.socialCheck(response.id);
   if (checkExist.cnt === 1) {
    return res.json({ ok: true,id:response.id,token:access_token });
  }
  if (checkExist.cnt === 0) {
    const createKakaoAccount = await UserRepository.kakaologin(
      response.id,
      response.name,
      response.profile_image
    );
    if (createKakaoAccount === "ok") {
      res.json({ ok: true,id:response.id,token:access_token });
    }
  }  
}
