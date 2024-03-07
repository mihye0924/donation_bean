import { getUser } from "@/util/userinfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { useForm } from "react-hook-form";
import useMutation from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import Select, { Option } from "./Select"; 
import { Response } from "@/types/user";
interface IFormData {
  user_avatar?: FileList;
  user_id: string;
  user_pw: string;
  user_pw_check: string;
  user_phone: string;
  emailPrefix: string;
  emailDomain: string;
  user_name: string;
  user_nick: string;
}
const MyPageInfo = () => { 
  const user = getUser();
  const navigate = useNavigate();
  const [currentSelect, setCurrentSelect] = useState("init");
  const { data } = useQuery<Response>({
    queryKey: ["mypageinfo"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/user/me?id=${user.id}`)
        .then((res) => res.data),
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const { handleSubmit, register, watch, setFocus, setValue } =
    useForm<IFormData>({
      defaultValues: {
        user_nick: data?.userinfo?.user_nick,
        user_name: data?.userinfo?.user_name,
        /*         emailPrefix: data?.userinfo?.user_email.split("@")[0],
        emailDomain: data?.userinfo?.user_email.split("@")[1], */
        user_phone: data?.userinfo?.user_phone,
      },
    });
  const avatarChange = watch("user_avatar");

  useEffect(() => {
    if (avatarChange && avatarChange.length > 0) {
      const file = avatarChange[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatarChange]);

  const [editMutation, { data: editMuationData }] = useMutation(
    `http://localhost:8081/user/edit`
  );
  const onValid = async (ValidData: IFormData) => {
    const {
      user_nick,
      user_name,
      user_pw,
      user_phone,
      emailPrefix,
      emailDomain,
      user_pw_check,
    } = ValidData;
    if (user_pw !== user_pw_check) {
      alert("비밀번호가 일치하지 않습니다.");
      return setFocus("user_pw_check");
    }
    if (avatarChange && avatarChange.length > 0) {
      const file = avatarChange[0];
      const form = new FormData();
      form.append("file", file);
      const response = await axios.post(
        `http://localhost:8081/user/uploads?id=${user?.id}`,
        form
      );
      console.log(response);

      editMutation({
        user_avatar: user.id + "." + avatarChange[0].name.split(".")[1],
        user_id: user.id,
        user_nick,
        user_name,
        user_pw,
        user_phone,
        emailPrefix,
        emailDomain,
      });
    }
  };

  useEffect(() => {
    if (editMuationData && editMuationData.ok) {
      alert("회원정보 변경이 성공했습니다.");
      navigate("/mypage");
    }
  }, [editMuationData, navigate]);

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

  const onSelectChange = useCallback((e: Option) => {
    setValue("emailDomain", "");
    setCurrentSelect(e.label as string);
  }, []);

  return (
    <>
      {!data && (
        <>
          <LoadingSpinner size={10} />
          "로딩중..."
        </>
      )}
      <Center>
        <Title>나의 정보</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <Notice>개인정보를 입력해 주세요</Notice>
          <ImageBox>
            {avatarPreview ? (
              <img src={avatarPreview} alt="" />
            ) : data?.userinfo?.user_avatar ? (
              <img
                src={`http://localhost:8081/uploads/${data?.userinfo?.user_avatar}`}
                alt=""
              />
            ) : (
              <div className="noImg" />
            )}

            <label htmlFor="photo">
              사진 변경하기
              <input
                {...register("user_avatar")}
                id="photo"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
            </label>
          </ImageBox>
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
                {...register("user_nick", { maxLength: 8 })}
                defaultValue={data?.userinfo?.user_nick}
                placeholder="닉네임"
                type="text"
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
                {...register("user_name", {
                  required: true,
                  minLength: 2,
                  maxLength: 4,
                })}
                defaultValue={data?.userinfo?.user_name}
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
                defaultValue={data?.userinfo?.user_phone}
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
                defaultValue={data?.userinfo?.user_email?.split("@")[0]}
                name="emailPrefix"
                placeholder="이메일 주소"
              />
              <span>@</span>

              {currentSelect === "init" ? (
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                  defaultValue={
                    data?.userinfo?.user_email?.split("@")[1]
                      ? data?.userinfo?.user_email?.split("@")[1]
                      : ""
                  }
                />
              ) : currentSelect !== "직접입력" ? (
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                  value={currentSelect}
                />
              ) : (
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                />
              )}
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
  font-family: "NanumSquareNeo-Variable";
  font-weight: 900;
  font-size: 30px;
  margin-top: 20px;
  @media ${media.desktop} {
    display: block;
    margin-top: 0;
    font-size: 40px;
  }
  @media ${media.tablet} {
    display: block;
  }
`;

const Form = styled.form`
  padding-top: 0;
  @media ${media.tablet} {
    padding-top: 20px;
  }
`;

const Notice = styled.p`
  display: none;
  font-family: "NanumSquareNeo-Variable";
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
  font-family: "NanumSquareNeo-Variable";
  @media ${media.tablet} {
    font-size: 16px;
  }
`;

const PassCheck = styled.div`
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #aeaeae;
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
    &:disabled {
      opacity: 0.4;
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

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  .noImg {
    width: 75px;
    height: 75px;
    border-radius: 100%;
    background: gray;
    margin-right: 10px;
  }
  label {
    border: none;
    background: #f56400;
    color: white;
    padding: 4px 8px;
    border-radius: 10px;
    cursor: pointer;
  }

  img {
    width: 75px;
    height: 75px;
    border: 1px solid black;
    border-radius: 100%;
    margin-right: 10px;
  }
`;
