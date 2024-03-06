import { getUser } from "@/util/userinfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Select, { Option } from "./Select";
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
  const [currentSelect, setCurrentSelect] = useState("");
  const user = getUser();
  const { data } = useQuery<Response>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/user/me?id=${user?.id}`)
        .then((res) => res.data),
  });
  
  const emailSort = useMemo(()=>{
    return[
      {
        "value": "0",
        "label": "직접입력"
      },
      {
          "value": "1",
          "label": "gmail.com"
      },
      {
          "value": "2",
          "label": "naver.com"
      },
      {
          "value": "3",
          "label": "daum.net"
      },
      {
          "value": "4",
          "label": "nate.com"
      }
    ]
  },[])

  const onSelectChange = useCallback((e: Option) => {
    // setValue("emailDomain", "");
    setCurrentSelect(e.label as string);
  },[]);

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
            <Constraint>- 이름을 입력해 주세요</Constraint>
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
            <Constraint>- 닉네임을 입력해 주세요</Constraint>
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
            <Constraint>- 이름을 입력해 주세요</Constraint>
          </FormBox>

          <FormBox>
            <Label>비밀번호</Label>
            <PassCheck>
              <input placeholder="비밀번호" type="password" />
            </PassCheck>
            <Constraint>
              - 영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
            </Constraint>
          </FormBox>
          <FormBox>
            <Label>비밀번호 확인</Label>
            <PassCheck>
              <input placeholder="비밀번호 확인" type="password" />
            </PassCheck>
            <Constraint>
              - 영문, 대소문자, 숫자, 특수기호 조합 ~ 8자리 이상
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
            <Constraint>- '-' 기호 없이 전화번호 11자리 입력해 주세요</Constraint>
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
              <input type="text" value={currentSelect}/>
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
  desktop: "1200px",
  mobile: "375px",
};

const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
  mobile: `(min-width: ${sizes.mobile})`,
};

const Center = styled.div`
  width: 100%;
  margin: 0 auto; 
`;
const Title = styled.h1`
  display: none;
  color: #f56400;
  font-family: 'NanumSquareNeo-Variable';
  font-weight: 900;
  font-size: 30px;  
  margin-top: 20px;
  @media ${media.desktop}{ 
    display: block;
    margin-top: 0;
    font-size: 40px;
  }
  @media ${media.tablet}{ 
    display: block;
  } 
`;

const Form = styled.form`
  padding-top: 0; 
  @media ${media.tablet}{ 
  padding-top: 20px; 
  } 
`;

const Notice = styled.p` 
  display: none;
  font-family: 'NanumSquareNeo-Variable';
  font-size: 18px;
  margin-bottom: 30px;
  @media ${media.tablet} {
    display: block;
    margin-bottom: 80px;
    margin-bottom: 60px;
  }
`;

const Label = styled.div`
  width: 100%;
  text-align: start;
  font-weight: 900;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: 'NanumSquareNeo-Variable';
  @media ${media.tablet} {
    font-size: 16px;
  }
`;

const PassCheck = styled.div`
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #aeaeae;;
    padding: 15px 0;
    font-size: 14px;
    outline: none;
    &:focus {
      border-bottom: 1px solid #f56400;
    }
    &::placeholder {
      font-size: 16px;
      color: #aeaeae;
    } 
    &:disabled {
      opacity: 0.4;
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
    &:disabled {
      opacity: 0.4;
    }
    @media ${media.tablet} {  
      width: 27%;
    } 
  }
  .select { 
    flex:1;
    @media ${media.tablet} {  
        flex:auto;
    } 
    &>div {
      &>div {
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
