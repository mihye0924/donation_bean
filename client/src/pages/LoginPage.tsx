import LoadingSpinner from "@/components/LoadingSpinner";
import useMutation from "@/hooks/useMutation";
import { getUser } from "@/util/userinfo";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
interface IFrom {
  id: string;
  pass: string;
}

const LoginPage = () => {
  const onKakaoLoginClick = () => {
    const REST_API_KEY = "b35378defa1b862c0f8fc59bf0292c25";
    const REDIRECT_URI = "http://localhost:5173/kakao/oauth";
    const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = link;
  };
  const onNaverLoginClick = () => {
    const CLIENT_ID = `QocupXFUwSvjcgU9M9pE`;
    const CALLBACK_URL = `http://localhost:5173/naver/oauth`;
    const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=test&redirect_uri=${CALLBACK_URL}`;
    window.location.href = link;
  };
  const [svgCheck, setSvgCheck] = useState(false);
  const [session, setSession] = useState(true);

  const navigate = useNavigate();
  const onSVGClick = useCallback(() => {
    setSvgCheck((prev) => !prev);
    setSession((prev) => !prev);
  }, []);
  const { handleSubmit, register } = useForm<IFrom>();
  const [loginMutate, { loading: LoginLoading, data: LoginData }] = useMutation(
    `${import.meta.env.VITE_SERVER_URL}/user/login`
  );

  useEffect(() => {
    if (LoginData && LoginData.ok === false) {
      alert(LoginData?.result?.message);
    }
    if (LoginData && LoginData.ok === true) {
      const cookie = new Cookies();
      cookie.set("auth_donation", LoginData?.result?.token);
      const userId = jwtDecode(LoginData.result.token);
      if (session) {
        sessionStorage.setItem("info", JSON.stringify(userId));
      }
      if (session === false) {
        localStorage.setItem("info", JSON.stringify(userId));
        sessionStorage.setItem("info", JSON.stringify(userId));
      }
      navigate("/");
    }
  }, [LoginData, navigate]);

  const onValid = useCallback((formData: IFrom) => {
    loginMutate(formData);
  }, []);

  const user = getUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <HeaderPadding>
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <Center>
          <Title>로그인</Title>
          <InputBox>
            <Input
              {...register("id", { required: true })}
              type="text"
              placeholder="아이디"
            />
            <Input
              {...register("pass", { required: true })}
              type="password"
              placeholder="비밀번호"
            />
          </InputBox>
          <IDSaveArea>
            <SVG
              onClick={onSVGClick}
              style={{ fill: svgCheck ? "#f56400" : undefined }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </SVG>
            <span>아이디저장</span>
          </IDSaveArea>
          <Button>
            {LoginLoading ? <LoadingSpinner size={10} /> : "로그인"}
          </Button>
          <FindInfo>
            <li>아이디찾기·비밀번호찾기</li>
            <li>
              <Link to={`/signin`}>회원가입</Link>
            </li>
          </FindInfo>
          <SNSLine>
            <div></div>
            <span>SNS 로그인</span>
            <div></div>
          </SNSLine>
          <SNSBox>
            <div onClick={onKakaoLoginClick}>
              <RiKakaoTalkFill />
            </div>
            <div id="naver" onClick={onNaverLoginClick}>
              <SiNaver />
            </div>
          </SNSBox>
        </Center>
      </Wrapper>
    </HeaderPadding>
  );
};

export default LoginPage;

const sizes = {
  tablet: "768px",
  desktop: "1200px",
};
const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const HeaderPadding = styled.div`
  margin-top: 120px;
  /* margin-bottom: 80px; */
  background-color: #fbfbfb;
  @media ${media.tablet} {
    margin-top: 80px;
    padding: 120px 0;
  }
`;

const Wrapper = styled.form`
  padding: 20px;
  border: none;
  margin: 0 auto;
  background-color: #fff;
  @media ${media.tablet} {
    padding: 115px;
    border-radius: 16px;
    width: 700px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.03);
    border: solid 1px #d9d9d9;
  }
`;
const Center = styled.div`
  width: 100%;
  margin: 0 auto;

  @media ${media.tablet} {
    width: 65%;
  }
`;
const Title = styled.h1`
  @media ${media.tablet} {
    font-size: 36px;
    margin-bottom: 40px;
    font-weight: 600;
  }
  font-family: "NanumSquareNeo-Variable";
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const InputBox = styled.div`
  margin-top: 25px;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #aeaeae;
  padding: 15px;
  outline: none;
  &:focus {
    border-bottom: 1px solid #f56400;
  }
  &::placeholder {
    font-size: 14px;
    color: lightgray;
  }
`;

const IDSaveArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  font-size: 14px;
`;

const SVG = styled.svg`
  fill: #aeaeae;
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin-right: 4px;
  @media ${media.tablet} {
    width: 20px;
    height: 20px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  color: white;
  border: none;
  background: #f56400;
  border-radius: 5px;
  outline: none;
  font-weight: bold;
`;

const FindInfo = styled.ul`
  font-size: 14px;
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  li {
    color: #aeaeae;
    margin-left: 15px;
  }
  li:first-child {
    margin-left: 0;
    display: flex;
    align-items: center;
    &::after {
      margin-left: 15px;
      color: #d9d9d9;
      content: "|";
    }
  }
`;
const SNSLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  font-size: 14px;
  color: #555555;
  position: relative;
  span {
    padding: 0 15px;
    z-index: 20;
    position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    font-weight: lighter;
  }
  div {
    flex: 1;
    border-top: 1px solid #d9d9d9;
    width: 100%;
  }
`;

const SNSBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  div {
    width: 50px;
    height: 50px;
    background: lightgray;
    margin: 0 20px;
    border-radius: 100%;
  }
  div:first-child {
    background: #fae100;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      fill: #3c1e1e;
      width: 25px;
      height: 25px;
    }
  }
  #naver {
    background: #03c75a;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      fill: white;
      width: 20px;
      height: 20px;
    }
  }
`;
