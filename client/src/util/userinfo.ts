import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getUser = () => {
  const GetCookie = cookies.get("auth_donation");
  let userinfo = null;

  const userInfoFromLocal = localStorage.getItem("info");
  const userInfoFromSession = sessionStorage.getItem("info");

  if (GetCookie && userInfoFromLocal) {
    userinfo = JSON.parse(userInfoFromLocal);
  }

  if (GetCookie && userInfoFromSession) {
    userinfo = JSON.parse(userInfoFromSession);
  }

  return userinfo;
};

export const removeUser = () => {
  cookies.remove("auth_donation");
  localStorage.removeItem("info");
  sessionStorage.removeItem("info");
};

/* 
/// 회원정보 조회, 로그아웃 방법

- 회원 아이디 조회
import { getUser } from "@/util/userinfo";
const user = getUser()
console.log(user.id)   //로그인한 유저 아이디 조회가능

- 회원만 볼 수 있는 페이지로 지정
import { getUser } from "@/util/userinfo";
import { useNavigate } from "react-router-dom";
const user = getUser()
const navigate = useNavigate()
    useEffect(() => {
    if(!user){
        navigate('/login')
        }
    }, [user,navigate]);

- 로그아웃
import { removeUser } from "@/util/userinfo";
removeUser()  // 해당 이벤트에 함수 호출하시면 됩니다.

*/
