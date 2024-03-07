import useMutation from "@/hooks/useMutation";
import { getUser } from "@/util/userinfo";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IFormData {
  user_id: string;
  user_pw: string;
  user_pw_check: string;
  user_phone: string;
  emailPrefix: string;
  emailDomain: string;
  user_name: string;
}

interface IResponse {
  join: string | boolean;
}

const SignInPage = () => {
  const [currentSelect, setCurrentSelect] = useState("");
  const [idExist, setIdExist] = useState(true);
  const [queryData, setQueryData] = useState<IResponse>();
  const [singInMutation, { loading: mutationLoading, data: mutationData }] =
    useMutation(`${import.meta.env.VITE_SERVER_URL}/user/signin`);

  const onIdExistClick = useCallback(() => {
    axios
      .get(`http://localhost:8081/user/signin?id=${watch("user_id")}`)
      .then((res) => {
        return setQueryData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { register, handleSubmit, setValue, setFocus, reset, watch } =
    useForm<IFormData>();

  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue("emailDomain", "");
      setCurrentSelect(e.target.value);
    },
    []
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (mutationData && mutationData.ok) {
      navigate("/login");
    }
  }, [mutationData]);

  const user = getUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    setIdExist(true);
  }, [watch("user_id")]);

  const onValid = (data: IFormData) => {
    if (!idExist) {
      const {
        user_id,
        user_pw,
        user_pw_check,
        user_phone,
        emailPrefix,
        emailDomain,
        user_name,
      } = data;

      if (user_pw !== user_pw_check) {
        alert("비밀번호가 일치하지 않습니다.");
        return setFocus("user_pw_check");
      }

      singInMutation({
        user_id,
        user_pw,
        user_phone,
        user_name,
        user_email: emailPrefix + "@" + emailDomain,
      });
      reset();
    } else if (idExist) {
      alert("중복 확인을 해주세요");
    }
  };

  useEffect(() => {
    if (queryData && queryData.join) {
      setIdExist(false);

      return alert("사용 가능한 아이디입니다.");
    }
    if (queryData && !queryData.join) {
      setIdExist(true);
      return alert("이미 존재하는 아이디입니다.");
    }
  }, [queryData]);

  return (
    <HeaderPadding>
      <Wrapper>
        <Center>
          <Title>회원가입</Title>
          <Form onSubmit={handleSubmit(onValid)} action="">
            <Notice>개인정보를 입력해 주세요</Notice>
            <div>
              <Label>아이디</Label>
              <DoubleCheck>
                <input
                  {...register("user_id", {
                    required: true,
                    pattern: /^[A-Za-z0-9]{6,15}$/,
                  })}
                  placeholder="아이디"
                  type="text"
                />
                <div
                  style={{ background: "lightgray" }}
                  onClick={onIdExistClick}
                >
                  중복확인
                </div>
              </DoubleCheck>
              <Constraint>영문, 숫자, 영문+숫자로 6~15자 이내</Constraint>
            </div>
            <FormBox>
              <Label>이름</Label>
              <PassCheck>
                <input
                  {...register("user_name", {
                    required: true,
                    minLength: 2,
                    maxLength: 4,
                  })}
                  placeholder="이름"
                  type="text"
                />
              </PassCheck>
              <Constraint>이름을 입력해 주세요</Constraint>
            </FormBox>
            <FormBox>
              <Label>비밀번호</Label>
              <PassCheck>
                <input
                  {...register("user_pw", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=\[\]{}|;:'",.<>\/?]).{8,}$/,
                      message:
                        "영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상 입력하세요",
                    },
                  })}
                  placeholder="비밀번호"
                  type="password"
                />
              </PassCheck>
              <Constraint>
                영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
              </Constraint>
            </FormBox>
            <FormBox>
              <Label>비밀번호 확인</Label>
              <PassCheck>
                <input
                  {...register("user_pw_check")}
                  placeholder="비밀번호 확인"
                  type="password"
                />
              </PassCheck>
              <Constraint>
                영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
              </Constraint>
            </FormBox>
            <FormBox>
              <Label>전화번호</Label>
              <PassCheck>
                <input
                  {...register("user_phone", {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                  placeholder="전화번호"
                  type="tel"
                />
              </PassCheck>
              <Constraint>
                '-' 기호 없이 전화번호 11자리 입력해 주세요
              </Constraint>
            </FormBox>
            <FormBox>
              <Label>이메일</Label>
              <EmailCheck>
                <input
                  {...register("emailPrefix", { required: true })}
                  name="emailPrefix"
                  placeholder="이메일 주소"
                />
                <span>@</span>
                {currentSelect !== "" ? (
                  <input
                    {...register("emailDomain", { required: true })}
                    type="text"
                    value={currentSelect !== "" ? currentSelect : ""}
                  />
                ) : (
                  <input
                    {...register("emailDomain", { required: true })}
                    type="text"
                  />
                )}

                <select
                  onChange={onSelectChange}
                  value={currentSelect || ""}
                  name="domain"
                >
                  <option key={""} value="">
                    직접입력
                  </option>
                  <option key={"gmail.com"} value="gmail.com">
                    gmail.com
                  </option>
                  <option key={"naver.com"} value="naver.com">
                    naver.com
                  </option>
                  <option key={"daum.net"} value="daum.net">
                    daum.net
                  </option>
                  <option key={"nate.com"} value="nate.com">
                    nate.com
                  </option>
                </select>
              </EmailCheck>
              <Constraint>이메일 주소를 입력해 주세요</Constraint>
            </FormBox>
            <ButtonArea>
              <button type="button">취소</button>
              <button type="submit">{mutationLoading ? "로딩" : "가입"}</button>
            </ButtonArea>
          </Form>
        </Center>
      </Wrapper>
    </HeaderPadding>
  );
};

export default SignInPage;

const HeaderPadding = styled.div`
  padding-top: 200px;
  padding-bottom: 50px;
`;

const sizes = {
  tablet: "768px",
  desktop: "1200px",
};

// 미디어 쿼리를 위한 도우미 함수
const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const Wrapper = styled.div`
  padding: 50px 10px 40px 10px;
  font-weight: bold;
  border: none;
  margin: 0 auto;
  @media ${media.tablet} {
    border: 1px solid black;
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
    margin: 0 auto;
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

const Form = styled.form`
  padding-top: 20px;
  border-top: 2px solid lightgray;
`;

const Notice = styled.p`
  text-align: center;
  font-size: 16px;
  margin-bottom: 40px;
`;

const Label = styled.div`
  width: 100%;
  text-align: start;
`;

const DoubleCheck = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  input {
    grid-column: span 2;
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
  }
  div {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const PassCheck = styled.div`
  input {
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
  }
  div {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const EmailCheck = styled.div`
  select {
    width: 30%;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 14px;
    margin-left: 10px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
  }
  span {
    width: 10%;
  }
  input {
    width: 30%;
    border: none;
    border-bottom: 1px solid black;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 14px;
    outline: none;
    &:focus {
      border-bottom: 1px solid #f56400;
    }
    &::placeholder {
      font-size: 14px;
      color: lightgray;
    }
  }
  div {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const Constraint = styled.div`
  color: lightgray;
  font-size: 12px;
  text-align: start;
  padding-top: 3px;
`;

const FormBox = styled.div`
  margin-top: 25px;
`;

const ButtonArea = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  @media ${media.tablet} {
    flex-direction: row;
  }
  button {
    cursor: pointer;
    @media ${media.tablet} {
      font-weight: 600;
      color: white;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      margin: 0 15px;
      padding: 20px 65px;
    }
    font-weight: 600;
    color: white;
    font-size: 14px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin: 8px 0px;
    padding: 20px 65px;
    &:first-child {
      background: #aeaeae;
    }
    &:last-child {
      background: #f56400;
    }
  }
`;
