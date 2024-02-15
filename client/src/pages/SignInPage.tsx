import useMutation from "@/hooks/useMutation";
import { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
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

const SignInPage = () => {
  const [currentSelect, setCurrentSelect] = useState("");
  const [mutation, { loading, data, error }] = useMutation(
    `http://localhost:8081/user/signin`
  );
  const { register, handleSubmit, setValue, setFocus, reset } =
    useForm<IFormData>();
  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue("emailDomain", "");
      setCurrentSelect(e.target.value);
    },
    []
  );

  const onValid = (data: IFormData) => {
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

    mutation({
      user_id,
      user_pw,
      user_phone,
      user_name,
      user_email: emailPrefix + "@" + emailDomain,
    });
    /*       reset();   */
  };

  return (
    <>
      <Wrapper>
        <Center>
          <Title>회원가입</Title>
          <Form onSubmit={handleSubmit(onValid)} action="">
            <Notice>개인 정보를 입력 해주세요.</Notice>
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
                <div>중복확인</div>
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
              <Constraint>이름을 입력해주세요</Constraint>
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
                '-' 기호 없이 전화번호 11자리 입력해주세요
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
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                  value={currentSelect === "" ? undefined : currentSelect}
                />
                <select onChange={onSelectChange} name="domain">
                  <option value="">직접입력</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="nate.com">nate.com</option>
                </select>
              </EmailCheck>
              <Constraint>이메일 주소를 입력해 주세요</Constraint>
            </FormBox>
            <ButtonArea>
              <button type="button">취소</button>
              <button type="submit">가입</button>
            </ButtonArea>
          </Form>
        </Center>
      </Wrapper>
    </>
  );
};

export default SignInPage;

const sizes = {
  tablet: "768px",
  desktop: "1024px",
};

// 미디어 쿼리를 위한 도우미 함수
const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const Wrapper = styled.div`
  margin-top: 10vh;

  border-radius: 10px;
  padding-top: 50px;
  padding-bottom: 40px;
  font-weight: bold;

  @media ${media.tablet} {
    border: 1px solid black;
    width: 640px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  font-size: 18px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const Form = styled.form`
  padding-top: 20px;
  border-top: 2px solid lightgray;
`;

const Notice = styled.p`
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
