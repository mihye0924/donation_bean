import Select, { Option } from "@/components/Select";
import useMutation from "@/hooks/useMutation";
import { getUser } from "@/util/userinfo";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
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
      .get(
        `${import.meta.env.VITE_SERVER_URL}/user/signin?id=${watch("user_id")}`
      )
      .then((res) => setQueryData(res.data));
  }, []);

  const { register, handleSubmit, setValue, setFocus, reset, watch } =
    useForm<IFormData>();

  const emailSort = useMemo(() => {
    return [
      {
        value: "0",
        label: "직접입력",
      },
      {
        value: "1",
        label: "gmail.com",
      },
      {
        value: "2",
        label: "naver.com",
      },
      {
        value: "3",
        label: "daum.net",
      },
      {
        value: "4",
        label: "nate.com",
      },
    ];
  }, []);

  const onSelectChange = useCallback(
    (e: Option) => {
      setValue("emailDomain", "");
      setCurrentSelect(e.label as string);
    },
    [setValue]
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
                <div style={{ background: "#fbfbfb" }} onClick={onIdExistClick}>
                  중복확인
                </div>
              </DoubleCheck>
              <Constraint>- 영문, 숫자, 영문+숫자로 6~15자 이내</Constraint>
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
              <Constraint>- 이름을 입력해 주세요</Constraint>
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
                - 영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
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
                - 영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
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
                - '-' 기호 없이 전화번호 11자리 입력해 주세요
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
                {currentSelect !== "직접입력" ? (
                  <input
                    {...register("emailDomain", { required: true })}
                    type="text"
                    value={currentSelect !== "직접입력" ? currentSelect : ""}
                  />
                ) : (
                  <input
                    {...register("emailDomain", { required: true })}
                    type="text"
                  />
                )}

                {/*  <select
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
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                  value={currentSelect === "" ? undefined : currentSelect}
                />  */}
                <Select
                  selectOptions={emailSort}
                  value={emailSort[0]}
                  size={120}
                  onChange={(e) => onSelectChange(e as Option)}
                />
              </EmailCheck>
              <Constraint>- 이메일 주소를 입력해 주세요</Constraint>
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
const sizes = {
  tablet: "768px",
  desktop: "1200px",
  mobile: "375px",
};

// 미디어 쿼리를 위한 도우미 함수
const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
  mobile: `(min-width: ${sizes.mobile})`,
};

const HeaderPadding = styled.div`
  margin-top: 80px;
  padding: 0;
  background-color: #fbfbfb;
  @media ${media.tablet} {
    padding: 120px 0;
  }
`;

const Wrapper = styled.div`
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
`;
const Title = styled.h1`
  @media ${media.tablet} {
    font-size: 36px;
    margin-bottom: 40px;
    font-weight: 600;
  }
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: "NanumSquareNeo-Variable";
`;

const Form = styled.form`
  padding-top: 20px;
  border-top: 1px solid #aeaeae;
  @media ${media.tablet} {
    padding-top: 30px;
  }
`;

const Notice = styled.p`
  text-align: center;
  font-size: 16px;
  margin-bottom: 30px;
  @media ${media.tablet} {
    margin-bottom: 60px;
  }
`;

const Label = styled.div`
  width: 100%;
  text-align: start;
  font-weight: 900;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: "NanumSquareNeo-Variable";
  @media ${media.tablet} {
    font-size: 16px;
  }
`;

const DoubleCheck = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  input {
    outline: none;
    grid-column: span 2;
    width: 100%;
    padding: 15px 0;
    height: 44px;
    border-bottom: 1px solid #aeaeae;
    border-radius: 0;
    font-size: 14px;
    outline: none;
    &:focus {
      border-bottom: 1px solid #f56400;
    }
    &::placeholder {
      font-size: 14px;
      color: #aeaeae;
    }
    @media ${media.tablet} {
      font-size: 16px;
    }
  }
  div {
    border: 1px solid #aeaeae;
    background: #fbfbfb;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const PassCheck = styled.div`
  input {
    outline: none;
    width: 100%;
    padding: 15px 0;
    height: 44px;
    font-size: 14px;
    border-bottom: 1px solid #aeaeae;
    border-radius: 0;
    outline: none;
    &:focus {
      border-bottom: 1px solid #f56400;
    }
    &::placeholder {
      font-size: 14px;
      color: #aeaeae;
    }
    @media ${media.tablet} {
      font-size: 16px;
    }
  }
  div {
    border: 1px solid #aeaeae;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const EmailCheck = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  input {
    width: calc(50% - 18px);
    border: none;
    border-bottom: 1px solid #aeaeae;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 14px;
    outline: none;
    &:focus {
      border-bottom: 1px solid #f56400;
    }
    &::placeholder {
      font-size: 14px;
      color: #aeaeae;
    }
    @media ${media.tablet} {
      width: 27%;
    }
    @media ${media.tablet} {
      width: 27%;
    }
  }
  .select {
    flex: 1;
    @media ${media.tablet} {
      flex: auto;
    }
    & > div {
      & > div {
        width: 100%;
      }
    }
  }
`;

const Constraint = styled.div`
  color: #aeaeae;
  font-size: 14px;
  text-align: start;
  padding-top: 15px;
  @media ${media.tablet} {
    font-size: 16px;
  }
`;

const FormBox = styled.div`
  margin-top: 25px;
`;

const ButtonArea = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  @media ${media.tablet} {
    flex-direction: row;
    margin-top: 70px;
  }
  button {
    cursor: pointer;
    @media ${media.tablet} {
      font-weight: 900;
      color: white;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      margin: 0 15px;
      padding: 15px;
      width: 170px;
    }
    font-weight: 900;
    color: white;
    font-size: 14px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin: 8px 0px;
    padding: 15px;
    &:first-child {
      background: #aeaeae;
    }
    &:last-child {
      background: #f56400;
    }
  }
`;
