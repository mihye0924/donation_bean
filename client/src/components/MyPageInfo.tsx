import { getUser } from "@/util/userinfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { useForm } from "react-hook-form";
import useMutation from "@/hooks/useMutation";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [currentSelect, setCurrentSelect] = useState("custom");
  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === "custom") {
        setValue("emailDomain", "");
        setCurrentSelect(e.currentTarget.value);
      }

      setCurrentSelect(e.currentTarget.value);
    },
    [currentSelect]
  );
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
            <Constraint>이름을 입력해 주세요</Constraint>
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
            <Constraint>8자 이내 닉네임을 입력해 주세요</Constraint>
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
                defaultValue={data?.userinfo?.user_phone}
                placeholder="전화번호"
                type="tel"
              />
            </PassCheck>
            <Constraint>'-' 기호 없이 전화번호 11자리 입력해 주세요</Constraint>
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

              {currentSelect === "custom" && (
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                  defaultValue={
                    data?.userinfo?.user_email?.split("@")[1]
                      ? data?.userinfo?.user_email?.split("@")[1]
                      : ""
                  }
                />
              )}

              {currentSelect !== "custom" && (
                <input
                  {...register("emailDomain", { required: true })}
                  type="text"
                  value={currentSelect || ""}
                />
              )}

              <select
                onChange={onSelectChange}
                value={currentSelect}
                name="domain"
              >
                <option key={"custom"} value="custom">
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
