import styled from "styled-components";
import { BsClipboard2Heart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUser } from "@/util/userinfo";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

const MyPage = () => {
  const user = getUser();
  const { data } = useQuery<Response>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/user/me?id=${user?.id}`)
        .then((res) => res.data),
  });

  const indexMatch = useMatch("/mypage");
  const infoMatch = useMatch("/mypage/info");
  const favMatch = useMatch("/mypage/fav");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <HeaderPadding>
      <Center>
        <SidBar>
          <UserNameBox>
            <p>{data?.userinfo?.user_nick}님,</p>
            <p>반갑습니다</p>
            <span>
              기부콩과 만난지{" "}
              {data?.userinfo?.user_createAt &&
                data?.userinfo?.user_createAt + 1}
              일째
            </span>
          </UserNameBox>
          <ul>
            <li>
              <Link
                to={`/mypage`}
                style={{ color: indexMatch ? "#f56400" : "" }}
              >
                <span>
                  <BsClipboard2Heart />
                </span>
                <span>나의 후원</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mypage/info"
                style={{ color: infoMatch ? "#f56400" : "" }}
              >
                <span>
                  <FaRegUser />
                </span>
                <span>나의 정보</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mypage/fav"
                style={{ color: favMatch ? "#f56400" : "" }}
              >
                <span>
                  <FaRegHeart />
                </span>
                <span>관심 후원</span>
              </Link>
            </li>
          </ul>
        </SidBar>
        <Main>
          <Outlet />
        </Main>
      </Center>
    </HeaderPadding>
  );
};

export default MyPage;

const sizes = {
  tablet: "768px",
  desktop: "1024px",
};

const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const HeaderPadding = styled.div`
  padding-top: 200px;
  padding-bottom: 50px;
`;

const Center = styled.div`
  margin: 0 auto;
  width: 85%;
  display: flex;
  flex-direction: column;
  @media ${media.tablet} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SidBar = styled.div`
  width: 100%;
  li {
    padding: 16px 0px 16px 20px;
    border-bottom: 1px solid #ececec;
    span {
      font-weight: bolder;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;
const UserNameBox = styled.div`
  background: #f56400;
  padding: 30px 15px 20px 15px;
  color: white;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  p {
    font-weight: bold;

    font-size: 18px;

    margin-top: 10px;
  }
  span {
    display: block;
    margin-top: 10px;
    font-size: 12px;
  }
`;

const Main = styled.div`
  grid-column: span 2;
  li {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    svg {
      color: #dedede;
    }
    span {
      &:first-child {
        display: flex;
        align-items: center;
      }

      &:last-child {
        font-weight: 500;
      }
    }
  }
`;