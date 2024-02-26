import { getUser } from "@/util/userinfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
interface Response {
  ok: boolean;
  userinfo: {
    user_name: string;
    user_avatar: string | null;
    user_id: string;
    user_email: string;
    user_nick: string;
    user_phone: string;
    user_createAt: number;
  };
}
const MyPageInfo = () => {
  const user = getUser();
  const { data } = useQuery<Response>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/user/me?id=${user?.id}`)
        .then((res) => res.data),
  });
  return (
    <>
      {!data && "로딩중"}
      <Center>
        <Title>나의 정보</Title>
        <Form>
          <Notice>개인정보를 입력해 주세요</Notice>
          <FormBox>
            <Label>아이디</Label>
            <PassCheck>
              <input
                placeholder="아이디"
                type="text"
                value={`${data?.userinfo?.user_id}`}
                disabled
              />
            </PassCheck>
            <Constraint>이름을 입력해 주세요</Constraint>
          </FormBox>
          <FormBox>
            <Label>닉네임</Label>
            <PassCheck>
              <input
                placeholder="닉네임"
                type="text"
                defaultValue={`${data?.userinfo?.user_nick}`}
              />
            </PassCheck>
            <Constraint>닉네임을 입력해 주세요</Constraint>
          </FormBox>
          <FormBox>
            <Label>이름</Label>
            <PassCheck>
              <input
                placeholder="이름"
                type="text"
                defaultValue={`${data?.userinfo?.user_name}`}
              />
            </PassCheck>
            <Constraint>이름을 입력해 주세요</Constraint>
          </FormBox>

          <FormBox>
            <Label>비밀번호</Label>
            <PassCheck>
              <input placeholder="비밀번호" type="password" />
            </PassCheck>
            <Constraint>
              영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
            </Constraint>
          </FormBox>
          <FormBox>
            <Label>비밀번호 확인</Label>
            <PassCheck>
              <input placeholder="비밀번호 확인" type="password" />
            </PassCheck>
            <Constraint>
              영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
            </Constraint>
          </FormBox>
          <FormBox>
            <Label>전화번호</Label>
            <PassCheck>
              <input
                placeholder="전화번호"
                type="tel"
                defaultValue={`${data?.userinfo?.user_phone}`}
              />
            </PassCheck>
            <Constraint>'-' 기호 없이 전화번호 11자리 입력해 주세요</Constraint>
          </FormBox>
          <FormBox>
            <Label>이메일</Label>
            <EmailCheck>
              <input
                name="emailPrefix"
                placeholder="이메일 주소"
                defaultValue={`${data?.userinfo?.user_email.split("@")[0]}`}
              />
              <span>@</span>
              <input type="text" />
              <select name="domain">
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
            <button type="button">리셋</button>
            <button type="submit">수정</button>
          </ButtonArea>
        </Form>
      </Center>
    </>
  );
};

export default MyPageInfo;

const sizes = {
  tablet: "768px",
  desktop: "1024px",
};

const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const Center = styled.div`
  width: 100%;
  margin: 0 auto;
  @media ${media.tablet} {
    width: 90%;
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
