import LoadingSpinner from "@/components/LoadingSpinner";
import useMutation from "@/hooks/useMutation";
import { getUser } from "@/util/userinfo";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IFrom {
  id: string;
  pass: string;
}

const LoginPage = () => {
  const [svgCheck, setSvgCheck] = useState(false);
  const [session, setSession] = useState(true);
  console.log(session);

  const navigate = useNavigate();
  const onSVGClick = useCallback(() => {
    setSvgCheck((prev) => !prev);
    setSession((prev) => !prev);
  }, []);
  const { handleSubmit, register } = useForm<IFrom>();
  const [loginMutate, { loading: LoginLoading, data: LoginData }] = useMutation(
    `http://localhost:8081/user/login`
  );

  useEffect(() => {
    if (LoginData && LoginData.ok === false) {
      alert(LoginData?.result?.message);
    }
    if (LoginData && LoginData.ok === true) {
      let cookie = new Cookies();
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
            <div />
            <div />
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
  padding-top: 200px;
  padding-bottom: 50px;
  margin: 0 auto;
`;

const Wrapper = styled.form`
  padding: 50px 10px 40px 10px;
  font-weight: bold;
  border: none;
  margin: 0 auto;
  @media ${media.tablet} {
    border: 1px solid #ececec;
    border-radius: 10px;
    width: 640px;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
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
  text-align: center;
  font-size: 18px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const InputBox = styled.div`
  margin-top: 25px;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  padding-top: 15px;
  padding-bottom: 10px;
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
    margin-left: 15px;
  }
  li:first-child {
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
`;
