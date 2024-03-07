import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import useMutation from "@/hooks/useMutation";

const KaKaoLogin = () => {
  const REST_API_KEY = "b35378defa1b862c0f8fc59bf0292c25";
  const REDIRECT_URI = "http://localhost:5173/kakao/oauth";
  const location = useLocation();
  const CODE = location.search.split("=")[1];
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [loginMutation, { data }] = useMutation(
    `http://localhost:8081/user/kakaologin`
  );
  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
      });
      const res = await response.json();

      fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${res.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          sessionStorage.setItem("info", JSON.stringify({ id: res?.id })); //setitem
          sessionStorage.setItem(
            "login_type",
            JSON.stringify({ type: "kakao" })
          ); //setitem
          loginMutation({
            id: res.id,
            user_nick: res.properties.nickname,
            user_avatar: res.properties.profile_image,
          });
        });
    };

    fetchToken()
      .catch(console.error)
      .finally(() => {
        cookie.set("auth_donation", "kakaoGuest", { path: "/" });
      });
  }, []);

  useEffect(() => {
    if (data && data.ok) {
      navigate("/");
    }
  }, [navigate, data]);
  return (
    <div>
      <LoadingSpinner size={10} />
    </div>
  );
};

export default KaKaoLogin;

/*  fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              sessionStorage.setItem(
                "info",
                JSON.stringify({ id: res.properties.nickname })
              ); //setitem
              sessionStorage.setItem(
                "img",
                JSON.stringify(res.properties.profile_image)
              ); //setitem
            }); */
